import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ResultatSkjemaSchema } from '@/lib/validering'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = ResultatSkjemaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ feil: parsed.error.errors[0].message }, { status: 400 })
    }

    const data = parsed.data
    const arrangement = await prisma.arrangement.findUnique({
      where: { id: data.arrangementId },
    })

    if (!arrangement) return NextResponse.json({ feil: 'Arrangement ikke funnet' }, { status: 404 })

    if (session.user.rolle !== 'ADMIN' && arrangement.organisatorId !== session.user.id) {
      return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
    }

    const resultat = await prisma.resultat.create({
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

    return NextResponse.json(resultat, { status: 201 })
  } catch {
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}
