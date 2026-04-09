import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const frivillig = await prisma.frivilligPamelding.findUnique({
    where: { id: params.id },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!frivillig) return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })

  const erEier = frivillig.arrangement.organisatorId === session.user.id
  if (!erEier && session.user.rolle !== 'ADMIN') {
    return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
  }

  const body = await req.json()
  const oppdatert = await prisma.frivilligPamelding.update({
    where: { id: params.id },
    data: {
      status: body.status ?? undefined,
      rolle: body.rolle ?? undefined,
    },
    include: {
      bruker: { select: { id: true, navn: true, epost: true } },
    },
  })

  return NextResponse.json(oppdatert)
}
