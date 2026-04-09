import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PameldingSkjemaSchema } from '@/lib/validering'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = PameldingSkjemaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ feil: parsed.error.errors[0].message }, { status: 400 })
    }

    const { arrangementId, klasse, merknader } = parsed.data

    const arrangement = await prisma.arrangement.findUnique({
      where: { id: arrangementId },
      include: { _count: { select: { pameldingerFor: true } } },
    })

    if (!arrangement) return NextResponse.json({ feil: 'Arrangement ikke funnet' }, { status: 404 })
    if (arrangement.status !== 'PUBLISERT') {
      return NextResponse.json({ feil: 'Arrangement er ikke åpent for påmelding' }, { status: 400 })
    }
    if (arrangement.pameldingsFrist && new Date() > arrangement.pameldingsFrist) {
      return NextResponse.json({ feil: 'Påmeldingsfristen er utløpt' }, { status: 400 })
    }

    const eksisterende = await prisma.pamelding.findUnique({
      where: { arrangementId_brukerId: { arrangementId, brukerId: session.user.id } },
    })
    if (eksisterende) {
      return NextResponse.json({ feil: 'Du er allerede påmeldt dette arrangementet' }, { status: 409 })
    }

    let status = 'VENTENDE'
    if (arrangement.maksAntall && arrangement._count.pameldingerFor >= arrangement.maksAntall) {
      status = 'VENTELISTE'
    } else if (arrangement.pris === 0) {
      status = 'BEKREFTET'
    }

    const pamelding = await prisma.pamelding.create({
      data: {
        arrangementId,
        brukerId: session.user.id,
        status,
        klasse: klasse || null,
        merknader: merknader || null,
      },
    })

    if (arrangement.pris > 0 && status === 'VENTENDE') {
      await prisma.betaling.create({
        data: {
          pameldingId: pamelding.id,
          belop: arrangement.pris,
          status: 'VENTENDE',
        },
      })
    }

    return NextResponse.json(pamelding, { status: 201 })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err?.code === 'P2002') {
      return NextResponse.json({ feil: 'Du er allerede påmeldt' }, { status: 409 })
    }
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}
