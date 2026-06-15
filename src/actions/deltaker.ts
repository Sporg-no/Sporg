'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { ServerActionResult } from '@/types'

export async function sjekkInnDeltaker(
  pameldingId: string,
  arrangementId: string
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const pamelding = await prisma.pamelding.findUnique({
    where: { id: pameldingId },
    include: {
      arrangement: { select: { organisatorId: true } },
      sjekkInn: true,
    },
  })

  if (!pamelding) return { success: false, feil: 'Påmelding ikke funnet' }

  const erEier = pamelding.arrangement.organisatorId === session.user.id
  if (!erEier && session.user.rolle !== 'ADMIN') {
    return { success: false, feil: 'Ikke tilgang' }
  }

  if (pamelding.sjekkInn) {
    return { success: false, feil: 'Allerede sjekket inn' }
  }

  await prisma.sjekkInn.create({
    data: {
      pameldingId,
      sjekkInnAv: session.user.name ?? 'Ukjent',
    },
  })

  revalidatePath(`/arrangementer/${arrangementId}/deltakere`)
  return { success: true, melding: 'Deltaker sjekket inn' }
}

export async function leggTilDeltaker(
  arrangementId: string,
  epost: string,
  klasse?: string
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const arr = await prisma.arrangement.findUnique({ where: { id: arrangementId } })
  if (!arr) return { success: false, feil: 'Arrangement ikke funnet' }

  const erEier = arr.organisatorId === session.user.id
  if (!erEier && session.user.rolle !== 'ADMIN') {
    return { success: false, feil: 'Ikke tilgang' }
  }

  const bruker = await prisma.bruker.findUnique({ where: { epost: epost.toLowerCase().trim() } })
  if (!bruker) {
    return { success: false, feil: 'Ingen bruker med denne e-postadressen er registrert på Sporg' }
  }

  const eksisterende = await prisma.pamelding.findUnique({
    where: { arrangementId_brukerId: { arrangementId, brukerId: bruker.id } },
  })
  if (eksisterende) {
    return { success: false, feil: `${bruker.navn} er allerede påmeldt dette arrangementet` }
  }

  await prisma.pamelding.create({
    data: {
      arrangementId,
      brukerId: bruker.id,
      status: 'BEKREFTET',
      klasse: klasse?.trim() || null,
    },
  })

  revalidatePath(`/arrangementer/${arrangementId}/deltakere`)
  return { success: true, melding: `${bruker.navn} er lagt til som deltaker` }
}

export async function oppdaterStartnummer(
  pameldingId: string,
  arrangementId: string,
  startnummer: number
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const pamelding = await prisma.pamelding.findUnique({
    where: { id: pameldingId },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!pamelding) return { success: false, feil: 'Ikke funnet' }

  const erEier = pamelding.arrangement.organisatorId === session.user.id
  if (!erEier && session.user.rolle !== 'ADMIN') {
    return { success: false, feil: 'Ikke tilgang' }
  }

  await prisma.pamelding.update({
    where: { id: pameldingId },
    data: { startnummer },
  })

  revalidatePath(`/arrangementer/${arrangementId}/deltakere`)
  return { success: true }
}
