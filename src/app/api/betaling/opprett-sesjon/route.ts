import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe, erMockModus } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ feil: 'Ikke autentisert' }, { status: 401 })

  const { pameldingId } = await req.json()

  const pamelding = await prisma.pamelding.findUnique({
    where: { id: pameldingId },
    include: { betaling: true, arrangement: true },
  })

  if (!pamelding || pamelding.brukerId !== session.user.id) {
    return NextResponse.json({ feil: 'Ikke funnet' }, { status: 404 })
  }

  if (!pamelding.betaling || pamelding.betaling.status === 'FULLFORT') {
    return NextResponse.json({ feil: 'Betaling ikke tilgjengelig' }, { status: 400 })
  }

  if (erMockModus || !stripe) {
    return NextResponse.json({ mockModus: true, pameldingId })
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'nok',
          product_data: { name: pamelding.arrangement.tittel },
          unit_amount: pamelding.betaling.belop,
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/p/${pamelding.arrangement.slug}/pamelding/bekreftelse?pameldingId=${pameldingId}`,
    cancel_url: `${baseUrl}/p/${pamelding.arrangement.slug}/pamelding`,
    metadata: { pameldingId },
  })

  await prisma.betaling.update({
    where: { pameldingId },
    data: { stripeSessionId: stripeSession.id },
  })

  return NextResponse.json({ url: stripeSession.url })
}
