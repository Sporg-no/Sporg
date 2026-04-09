import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SesjonSkjemaSchema } from '@/lib/validering'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = SesjonSkjemaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ feil: parsed.error.errors[0].message }, { status: 400 })
    }

    const data = parsed.data
    const arrangement = await prisma.arrangement.findUnique({ where: { id: data.arrangementId } })

    if (!arrangement) return NextResponse.json({ feil: 'Arrangement ikke funnet' }, { status: 404 })

    if (session.user.rolle !== 'ADMIN' && arrangement.organisatorId !== session.user.id) {
      return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
    }

    const sesjon = await prisma.sesjon.create({
      data: {
        arrangementId: data.arrangementId,
        tittel: data.tittel,
        beskrivelse: data.beskrivelse || null,
        startTid: new Date(data.startTid),
        sluttTid: new Date(data.sluttTid),
        sted: data.sted || null,
        type: data.type,
      },
    })

    return NextResponse.json(sesjon, { status: 201 })
  } catch {
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}
