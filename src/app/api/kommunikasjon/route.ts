import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const mottatte = await prisma.meldingMottaker.findMany({
    where: { brukerId: session.user.id },
    include: {
      melding: {
        include: {
          avsender: { select: { id: true, navn: true, epost: true } },
          arrangement: { select: { id: true, tittel: true, slug: true } },
        },
      },
    },
    orderBy: { melding: { sendtAt: 'desc' } },
  })

  await prisma.meldingMottaker.updateMany({
    where: { brukerId: session.user.id, lest: false },
    data: { lest: true, lestAt: new Date() },
  })

  return NextResponse.json(mottatte)
}
