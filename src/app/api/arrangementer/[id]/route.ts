import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ArrangementSkjemaSchema } from '@/lib/validering'

async function sjekkEier(arrangementId: string, userId: string, rolle: string) {
  const arr = await prisma.arrangement.findUnique({ where: { id: arrangementId } })
  if (!arr) return null
  if (rolle !== 'ADMIN' && arr.organisatorId !== userId) return null
  return arr
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const arrangement = await prisma.arrangement.findUnique({
    where: { id: params.id },
    include: {
      organisator: { select: { id: true, navn: true, epost: true } },
      sesjoner: { orderBy: { startTid: 'asc' } },
      _count: {
        select: { pameldingerFor: true, frivilligePameldingerFor: true },
      },
    },
  })

  if (!arrangement) {
    return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })
  }

  return NextResponse.json(arrangement)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const arr = await sjekkEier(params.id, session.user.id, session.user.rolle)
  if (!arr) return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })

  try {
    const body = await req.json()
    const parsed = ArrangementSkjemaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ feil: parsed.error.errors[0].message }, { status: 400 })
    }

    const data = parsed.data
    const oppdatert = await prisma.arrangement.update({
      where: { id: params.id },
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

    return NextResponse.json(oppdatert)
  } catch {
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const arr = await sjekkEier(params.id, session.user.id, session.user.rolle)
  if (!arr) return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })

  if (arr.status !== 'UTKAST') {
    return NextResponse.json(
      { feil: 'Kan kun slette arrangementer med status Utkast' },
      { status: 400 }
    )
  }

  await prisma.arrangement.delete({ where: { id: params.id } })
  return NextResponse.json({ melding: 'Slettet' })
}
