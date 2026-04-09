'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { MeldingSkjemaSchema } from '@/lib/validering'
import type { ServerActionResult } from '@/types'

export async function sendMelding(
  arrangementId: string,
  formData: FormData
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const raw = {
    arrangementId,
    emne: formData.get('emne'),
    innhold: formData.get('innhold'),
    type: formData.get('type') || 'ALLE_DELTAKERE',
  }

  const parsed = MeldingSkjemaSchema.safeParse(raw)
  if (!parsed.success) return { success: false, feil: parsed.error.errors[0].message }

  const { emne, innhold, type } = parsed.data

  const arrangement = await prisma.arrangement.findUnique({
    where: { id: arrangementId },
    include: {
      pameldingerFor: {
        where: { status: { in: ['BEKREFTET', 'VENTENDE'] } },
        select: { brukerId: true },
      },
      frivilligePameldingerFor: {
        where: { status: 'GODKJENT' },
        select: { brukerId: true },
      },
    },
  })

  if (!arrangement) return { success: false, feil: 'Arrangement ikke funnet' }

  if (session.user.rolle !== 'ADMIN' && arrangement.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  let mottakerIds: string[] = []

  if (type === 'ALLE_DELTAKERE' || type === 'KUNNGJORING') {
    mottakerIds = arrangement.pameldingerFor.map((p) => p.brukerId)
  } else if (type === 'ALLE_FRIVILLIGE') {
    mottakerIds = arrangement.frivilligePameldingerFor.map((f) => f.brukerId)
  }

  mottakerIds = Array.from(new Set(mottakerIds)).filter((id) => id !== session.user.id)

  await prisma.melding.create({
    data: {
      arrangementId,
      avsenderId: session.user.id,
      emne,
      innhold,
      type,
      mottakere: {
        create: mottakerIds.map((brukerId) => ({ brukerId })),
      },
    },
  })

  revalidatePath(`/arrangementer/${arrangementId}/kommunikasjon`)
  return { success: true, melding: `Melding sendt til ${mottakerIds.length} mottaker(e)` }
}
