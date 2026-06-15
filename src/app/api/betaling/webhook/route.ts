import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendBetalingsbekreftelse } from '@/lib/betaling-epost'

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ mottatt: true })

  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ feil: 'Ugyldig signatur' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { metadata?: { pameldingId?: string }; payment_intent?: string }
    const pameldingId = session.metadata?.pameldingId

    if (pameldingId) {
      await prisma.$transaction([
        prisma.betaling.update({
          where: { pameldingId },
          data: {
            status: 'FULLFORT',
            stripeBetalingId: session.payment_intent as string,
          },
        }),
        prisma.pamelding.update({
          where: { id: pameldingId },
          data: { status: 'BEKREFTET' },
        }),
      ])

      await sendBetalingsbekreftelse(pameldingId)
    }
  }

  return NextResponse.json({ mottatt: true })
}
