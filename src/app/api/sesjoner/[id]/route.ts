import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const sesjon = await prisma.sesjon.findUnique({
    where: { id: params.id },
    include: { arrangement: { select: { organisatorId: true } } },
  })

  if (!sesjon) return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })

  if (session.user.rolle !== 'ADMIN' && sesjon.arrangement.organisatorId !== session.user.id) {
    return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
  }

  await prisma.sesjon.delete({ where: { id: params.id } })
  return NextResponse.json({ melding: 'Slettet' })
}
