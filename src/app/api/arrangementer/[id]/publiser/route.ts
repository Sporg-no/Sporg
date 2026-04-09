import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const arr = await prisma.arrangement.findUnique({ where: { id: params.id } })
  if (!arr) return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })

  if (session.user.rolle !== 'ADMIN' && arr.organisatorId !== session.user.id) {
    return NextResponse.json({ feil: 'Ikke tilgang' }, { status: 403 })
  }

  const nyStatus = arr.status === 'PUBLISERT' ? 'UTKAST' : 'PUBLISERT'
  const oppdatert = await prisma.arrangement.update({
    where: { id: params.id },
    data: { status: nyStatus },
  })

  return NextResponse.json(oppdatert)
}
