'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ResultatSkjemaSchema } from '@/lib/validering'
import type { ServerActionResult } from '@/types'

export async function leggTilResultat(
  arrangementId: string,
  formData: FormData
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const arrangement = await prisma.arrangement.findUnique({ where: { id: arrangementId } })
  if (!arrangement) return { success: false, feil: 'Arrangement ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && arrangement.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  const raw = {
    arrangementId,
    deltakerNavn: formData.get('deltakerNavn'),
    startnummer: formData.get('startnummer') ? Number(formData.get('startnummer')) : undefined,
    klasse: formData.get('klasse') || undefined,
    plassering: formData.get('plassering') ? Number(formData.get('plassering')) : undefined,
    tid: formData.get('tid') || undefined,
    poeng: formData.get('poeng') ? Number(formData.get('poeng')) : undefined,
    merknad: formData.get('merknad') || undefined,
  }

  const parsed = ResultatSkjemaSchema.safeParse(raw)
  if (!parsed.success) return { success: false, feil: parsed.error.errors[0].message }

  const data = parsed.data
  await prisma.resultat.create({
    data: {
      arrangementId: data.arrangementId,
      deltakerNavn: data.deltakerNavn,
      startnummer: data.startnummer ?? null,
      klasse: data.klasse || null,
      plassering: data.plassering ?? null,
      tid: data.tid || null,
      poeng: data.poeng ?? null,
      merknad: data.merknad || null,
    },
  })

  revalidatePath(`/arrangementer/${arrangementId}/resultater`)
  return { success: true, melding: 'Resultat lagt til' }
}

export async function publiserResultat(
  resultatId: string,
  arrangementId: string
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const resultat = await prisma.resultat.findUnique({
    where: { id: resultatId },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!resultat) return { success: false, feil: 'Ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && resultat.arrangement.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  await prisma.resultat.update({
    where: { id: resultatId },
    data: { publisert: !resultat.publisert },
  })

  revalidatePath(`/arrangementer/${arrangementId}/resultater`)
  return { success: true }
}

export async function slettResultat(
  resultatId: string,
  arrangementId: string
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const resultat = await prisma.resultat.findUnique({
    where: { id: resultatId },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!resultat) return { success: false, feil: 'Ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && resultat.arrangement.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  await prisma.resultat.delete({ where: { id: resultatId } })
  revalidatePath(`/arrangementer/${arrangementId}/resultater`)
  return { success: true, melding: 'Resultat slettet' }
}
