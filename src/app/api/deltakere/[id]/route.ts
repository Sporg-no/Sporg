import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const pamelding = await prisma.pamelding.findUnique({
    where: { id: params.id },
    include: {
      bruker: { select: { id: true, navn: true, epost: true, telefon: true } },
      betaling: true,
      sjekkInn: true,
      arrangement: { select: { id: true, tittel: true, organisatorId: true } },
    },
  })

  if (!pamelding) return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })

  const erEier = pamelding.arrangement.organisatorId === session.user.id
  const erAdmin = session.user.rolle === 'ADMIN'
  const erSelvPåmeldt = pamelding.brukerId === session.user.id

  if (!erEier && !erAdmin && !erSelvPåmeldt) {
    return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
  }

  return NextResponse.json(pamelding)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const pamelding = await prisma.pamelding.findUnique({
    where: { id: params.id },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!pamelding) return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })

  const erEier = pamelding.arrangement.organisatorId === session.user.id
  if (!erEier && session.user.rolle !== 'ADMIN') {
    return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
  }

  const body = await req.json()
  const oppdatert = await prisma.pamelding.update({
    where: { id: params.id },
    data: {
      startnummer: body.startnummer ?? undefined,
      klasse: body.klasse ?? undefined,
      status: body.status ?? undefined,
      merknader: body.merknader ?? undefined,
    },
  })

  return NextResponse.json(oppdatert)
}
