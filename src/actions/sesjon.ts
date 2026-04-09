'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SesjonSkjemaSchema } from '@/lib/validering'
import type { ServerActionResult } from '@/types'

export async function leggTilSesjon(
  arrangementId: string,
  formData: FormData
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const arrangement = await prisma.arrangement.findUnique({ where: { id: arrangementId } })
  if (!arrangement) return { success: false, feil: 'Ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && arrangement.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  const raw = {
    arrangementId,
    tittel: formData.get('tittel'),
    beskrivelse: formData.get('beskrivelse') || undefined,
    startTid: formData.get('startTid'),
    sluttTid: formData.get('sluttTid'),
    sted: formData.get('sted') || undefined,
    type: formData.get('type') || 'AKTIVITET',
  }

  const parsed = SesjonSkjemaSchema.safeParse(raw)
  if (!parsed.success) return { success: false, feil: parsed.error.errors[0].message }

  const data = parsed.data
  await prisma.sesjon.create({
    data: {
      arrangementId,
      tittel: data.tittel,
      beskrivelse: data.beskrivelse || null,
      startTid: new Date(data.startTid),
      sluttTid: new Date(data.sluttTid),
      sted: data.sted || null,
      type: data.type,
    },
  })

  revalidatePath(`/arrangementer/${arrangementId}/tidsplan`)
  return { success: true, melding: 'Sesjon lagt til' }
}

export async function slettSesjon(
  sesjonId: string,
  arrangementId: string
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const sesjon = await prisma.sesjon.findUnique({
    where: { id: sesjonId },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!sesjon) return { success: false, feil: 'Ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && sesjon.arrangement.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  await prisma.sesjon.delete({ where: { id: sesjonId } })
  revalidatePath(`/arrangementer/${arrangementId}/tidsplan`)
  return { success: true, melding: 'Sesjon slettet' }
}
