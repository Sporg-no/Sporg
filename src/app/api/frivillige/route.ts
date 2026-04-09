import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FrivilligSkjemaSchema } from '@/lib/validering'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = FrivilligSkjemaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ feil: parsed.error.errors[0].message }, { status: 400 })
    }

    const { arrangementId, rolle, merknader } = parsed.data

    const arrangement = await prisma.arrangement.findUnique({ where: { id: arrangementId } })
    if (!arrangement) return NextResponse.json({ feil: 'Arrangement ikke funnet' }, { status: 404 })

    const frivillig = await prisma.frivilligPamelding.create({
      data: {
        arrangementId,
        brukerId: session.user.id,
        rolle: rolle || null,
        merknader: merknader || null,
        status: 'SOKT',
      },
    })

    return NextResponse.json(frivillig, { status: 201 })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err?.code === 'P2002') {
      return NextResponse.json({ feil: 'Du har allerede søkt som frivillig' }, { status: 409 })
    }
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}
