import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const pamelding = await prisma.pamelding.findUnique({
    where: { id: params.id },
    include: { arrangement: { select: { organisatorId: true } }, sjekkInn: true },
  })

  if (!pamelding) return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })

  const erEier = pamelding.arrangement.organisatorId === session.user.id
  if (!erEier && session.user.rolle !== 'ADMIN') {
    return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
  }

  if (pamelding.sjekkInn) {
    return NextResponse.json({ feil: 'Allerede sjekket inn' }, { status: 409 })
  }

  const body = await req.json().catch(() => ({}))

  const sjekkInn = await prisma.sjekkInn.create({
    data: {
      pameldingId: params.id,
      sjekkInnAv: body.sjekkInnAv ?? session.user.name ?? 'Ukjent',
    },
  })

  return NextResponse.json(sjekkInn, { status: 201 })
}
