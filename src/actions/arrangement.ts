'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ArrangementSkjemaSchema } from '@/lib/validering'
import { genererSlug } from '@/lib/utils'
import type { ServerActionResult } from '@/types'

export async function opprettArrangement(
  formData: FormData
): Promise<ServerActionResult<{ id: string; slug: string }>> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const raw = {
    tittel: formData.get('tittel'),
    beskrivelse: formData.get('beskrivelse'),
    sted: formData.get('sted'),
    adresse: formData.get('adresse') || undefined,
    startDato: formData.get('startDato'),
    sluttDato: formData.get('sluttDato'),
    pameldingsFrist: formData.get('pameldingsFrist') || undefined,
    maksAntall: formData.get('maksAntall') ? Number(formData.get('maksAntall')) : undefined,
    pris: formData.get('pris') ? Number(formData.get('pris')) : 0,
    kategori: formData.get('kategori'),
  }

  const parsed = ArrangementSkjemaSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, feil: parsed.error.errors[0].message }
  }

  const data = parsed.data
  const slug = genererSlug(data.tittel)

  const arrangement = await prisma.arrangement.create({
    data: {
      slug,
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      sted: data.sted,
      adresse: data.adresse,
      startDato: new Date(data.startDato),
      sluttDato: new Date(data.sluttDato),
      pameldingsFrist: data.pameldingsFrist ? new Date(data.pameldingsFrist) : null,
      maksAntall: data.maksAntall ?? null,
      pris: data.pris,
      kategori: data.kategori,
      status: 'UTKAST',
      organisatorId: session.user.id,
    },
  })

  revalidatePath('/arrangementer')
  redirect(`/arrangementer/${arrangement.id}`)
}

export async function oppdaterArrangement(
  id: string,
  formData: FormData
): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const arr = await prisma.arrangement.findUnique({ where: { id } })
  if (!arr) return { success: false, feil: 'Arrangement ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && arr.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  const raw = {
    tittel: formData.get('tittel'),
    beskrivelse: formData.get('beskrivelse'),
    sted: formData.get('sted'),
    adresse: formData.get('adresse') || undefined,
    startDato: formData.get('startDato'),
    sluttDato: formData.get('sluttDato'),
    pameldingsFrist: formData.get('pameldingsFrist') || undefined,
    maksAntall: formData.get('maksAntall') ? Number(formData.get('maksAntall')) : undefined,
    pris: formData.get('pris') ? Number(formData.get('pris')) : 0,
    kategori: formData.get('kategori'),
  }

  const parsed = ArrangementSkjemaSchema.safeParse(raw)
  if (!parsed.success) return { success: false, feil: parsed.error.errors[0].message }

  const data = parsed.data
  await prisma.arrangement.update({
    where: { id },
    data: {
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      sted: data.sted,
      adresse: data.adresse,
      startDato: new Date(data.startDato),
      sluttDato: new Date(data.sluttDato),
      pameldingsFrist: data.pameldingsFrist ? new Date(data.pameldingsFrist) : null,
      maksAntall: data.maksAntall ?? null,
      pris: data.pris,
      kategori: data.kategori,
    },
  })

  revalidatePath(`/arrangementer/${id}`)
  revalidatePath(`/arrangementer/${id}/rediger`)
  return { success: true, melding: 'Arrangementet er oppdatert' }
}

export async function publiserArrangement(id: string): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const arr = await prisma.arrangement.findUnique({ where: { id } })
  if (!arr) return { success: false, feil: 'Ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && arr.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }

  const nyStatus = arr.status === 'PUBLISERT' ? 'UTKAST' : 'PUBLISERT'
  await prisma.arrangement.update({ where: { id }, data: { status: nyStatus } })

  revalidatePath(`/arrangementer/${id}`)
  revalidatePath('/arrangementer')
  return { success: true, melding: nyStatus === 'PUBLISERT' ? 'Arrangementet er publisert' : 'Arrangementet er satt til utkast' }
}

export async function slettArrangement(id: string): Promise<ServerActionResult> {
  const session = await getServerSession(authOptions)
  if (!session) return { success: false, feil: 'Ikke autentisert' }

  const arr = await prisma.arrangement.findUnique({ where: { id } })
  if (!arr) return { success: false, feil: 'Ikke funnet' }
  if (session.user.rolle !== 'ADMIN' && arr.organisatorId !== session.user.id) {
    return { success: false, feil: 'Ikke tilgang' }
  }
  if (arr.status !== 'UTKAST') {
    return { success: false, feil: 'Kun utkast kan slettes' }
  }

  await prisma.arrangement.delete({ where: { id } })
  revalidatePath('/arrangementer')
  redirect('/arrangementer')
}
