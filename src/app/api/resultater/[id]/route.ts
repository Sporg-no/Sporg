import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function sjekkTilgang(resultatId: string, userId: string, rolle: string) {
  const resultat = await prisma.resultat.findUnique({
    where: { id: resultatId },
    include: { arrangement: { select: { organisatorId: true } } },
  })
  if (!resultat) return null
  if (rolle !== 'ADMIN' && resultat.arrangement.organisatorId !== userId) return null
  return resultat
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const resultat = await sjekkTilgang(params.id, session.user.id, session.user.rolle)
  if (!resultat) return NextResponse.json({ feil: 'Ikke funnet eller tilgang nektet' }, { status: 403 })

  const body = await req.json()
  const oppdatert = await prisma.resultat.update({
    where: { id: params.id },
    data: {
      deltakerNavn: body.deltakerNavn ?? undefined,
      startnummer: body.startnummer ?? undefined,
      klasse: body.klasse ?? undefined,
      plassering: body.plassering ?? undefined,
      tid: body.tid ?? undefined,
      poeng: body.poeng ?? undefined,
      merknad: body.merknad ?? undefined,
      publisert: body.publisert ?? undefined,
    },
  })

  return NextResponse.json(oppdatert)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const resultat = await sjekkTilgang(params.id, session.user.id, session.user.rolle)
  if (!resultat) return NextResponse.json({ feil: 'Ikke funnet eller tilgang nektet' }, { status: 403 })

  await prisma.resultat.delete({ where: { id: params.id } })
  return NextResponse.json({ melding: 'Slettet' })
}
