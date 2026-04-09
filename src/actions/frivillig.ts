'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { ServerActionResult } from '@/types'

export async function oppdaterFrivilligStatus(
  frivilligId: string,
  arrangementId: string,
  status: 'SOKT' | 'GODKJENT' | 'AVVIST',
  rolle?: string
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const frivillig = await prisma.frivilligPamelding.findUnique({
    where: { id: frivilligId },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!frivillig) return { success: false, feil: 'Ikke funnet' }

  const erEier = frivillig.arrangement.organisatorId === session.user.id
  if (!erEier && session.user.rolle !== 'ADMIN') {
    return { success: false, feil: 'Ikke tilgang' }
  }

  await prisma.frivilligPamelding.update({
    where: { id: frivilligId },
    data: { status, rolle: rolle ?? undefined },
  })

  revalidatePath(`/arrangementer/${arrangementId}/frivillige`)
  return { success: true, melding: `Status oppdatert til ${status}` }
}

export async function meldPaaFrivillig(
  arrangementId: string,
  rolle?: string,
  merknader?: string
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const finnes = await prisma.frivilligPamelding.findUnique({
    where: { arrangementId_brukerId: { arrangementId, brukerId: session.user.id } },
  })

  if (finnes) return { success: false, feil: 'Du har allerede søkt som frivillig' }

  await prisma.frivilligPamelding.create({
    data: {
      arrangementId,
      brukerId: session.user.id,
      rolle: rolle || null,
      merknader: merknader || null,
      status: 'SOKT',
    },
  })

  revalidatePath(`/arrangementer/${arrangementId}/frivillige`)
  return { success: true, melding: 'Søknad sendt!' }
}
