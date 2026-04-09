import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Mock betaling – brukes i utviklingsmodus uten ekte Stripe
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const { pameldingId } = await req.json()

  const pamelding = await prisma.pamelding.findUnique({
    where: { id: pameldingId },
    include: { betaling: true },
  })

  if (!pamelding || pamelding.brukerId !== session.user.id) {
    return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })
  }

  if (!pamelding.betaling) {
    return NextResponse.json({ feil: 'Ingen betaling tilknyttet' }, { status: 400 })
  }

  // Simuler betaling
  await prisma.$transaction([
    prisma.betaling.update({
      where: { pameldingId },
      data: { status: 'FULLFORT', stripeBetalingId: `pi_mock_${Date.now()}` },
    }),
    prisma.pamelding.update({
      where: { id: pameldingId },
      data: { status: 'BEKREFTET' },
    }),
  ])

  return NextResponse.json({ melding: 'Betaling bekreftet' })
}
