import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ArrangementSkjemaSchema } from '@/lib/validering'
import { genererSlug } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const where = session.user.rolle === 'ADMIN'
    ? status ? { status } : {}
    : { organisatorId: session.user.id, ...(status ? { status } : {}) }

  const arrangementer = await prisma.arrangement.findMany({
    where,
    include: {
      organisator: { select: { id: true, navn: true, epost: true } },
      _count: {
        select: { pameldingerFor: true, frivilligePameldingerFor: true },
      },
    },
    orderBy: { startDato: 'asc' },
  })

  return NextResponse.json(arrangementer)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = ArrangementSkjemaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { feil: parsed.error.errors[0].message },
        { status: 400 }
      )
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

    return NextResponse.json(arrangement, { status: 201 })
  } catch {
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}
