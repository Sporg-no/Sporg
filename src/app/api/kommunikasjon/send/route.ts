import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { MeldingSkjemaSchema } from '@/lib/validering'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = MeldingSkjemaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ feil: parsed.error.errors[0].message }, { status: 400 })
    }

    const { arrangementId, emne, innhold, type } = parsed.data

    const arrangement = await prisma.arrangement.findUnique({
      where: { id: arrangementId },
      include: {
        pameldingerFor: {
          where: { status: { in: ['BEKREFTET', 'VENTENDE'] } },
          select: { brukerId: true },
        },
        frivilligePameldingerFor: {
          where: { status: 'GODKJENT' },
          select: { brukerId: true },
        },
      },
    })

    if (!arrangement) return NextResponse.json({ feil: 'Arrangement ikke funnet' }, { status: 404 })

    if (session.user.rolle !== 'ADMIN' && arrangement.organisatorId !== session.user.id) {
      return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
    }

    let mottakerIds: string[] = []

    if (type === 'ALLE_DELTAKERE' || type === 'KUNNGJORING') {
      mottakerIds = arrangement.pameldingerFor.map((p) => p.brukerId)
    } else if (type === 'ALLE_FRIVILLIGE') {
      mottakerIds = arrangement.frivilligePameldingerFor.map((f) => f.brukerId)
    }

    // Unike mottakere, ekskluder avsender
    mottakerIds = Array.from(new Set(mottakerIds)).filter((id) => id !== session.user.id)

    const melding = await prisma.melding.create({
      data: {
        arrangementId,
        avsenderId: session.user.id,
        emne,
        innhold,
        type,
        mottakere: {
          create: mottakerIds.map((brukerId) => ({ brukerId })),
        },
      },
      include: {
        mottakere: { select: { brukerId: true } },
      },
    })

    return NextResponse.json(melding, { status: 201 })
  } catch {
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}
