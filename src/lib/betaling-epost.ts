// Sender bekreftelse + kvittering etter fullført betaling. Brukes av både
// mock-betaling (utvikling) og Stripe-webhook (produksjon). Henter selv all
// nødvendig data ut fra påmeldings-ID-en. Kaster aldri – feil logges og svelges.

import { prisma } from '@/lib/prisma'
import { sendEpost } from '@/lib/epost'
import { paameldingBekreftet, betalingKvittering } from '@/lib/epost-maler'

export async function sendBetalingsbekreftelse(pameldingId: string): Promise<void> {
  try {
    const pamelding = await prisma.pamelding.findUnique({
      where: { id: pameldingId },
      include: {
        bruker: { select: { navn: true, epost: true } },
        arrangement: { select: { tittel: true, slug: true, startDato: true, sted: true } },
        betaling: { select: { belop: true } },
      },
    })

    if (!pamelding?.bruker.epost) return

    const { bruker, arrangement, betaling } = pamelding

    const bekreftelse = paameldingBekreftet({
      deltakerNavn: bruker.navn,
      arrangementTittel: arrangement.tittel,
      arrangementSlug: arrangement.slug,
      startDato: arrangement.startDato,
      sted: arrangement.sted,
    })
    await sendEpost({ til: bruker.epost, ...bekreftelse })

    if (betaling) {
      const kvittering = betalingKvittering({
        deltakerNavn: bruker.navn,
        arrangementTittel: arrangement.tittel,
        arrangementSlug: arrangement.slug,
        belop: betaling.belop,
      })
      await sendEpost({ til: bruker.epost, ...kvittering })
    }
  } catch (e) {
    console.error('Kunne ikke sende betalingsbekreftelse:', e)
  }
}
