// E-posttjeneste. Sender via Resend (https://resend.com) når RESEND_API_KEY
// er satt, ellers logges e-posten til konsollen (utviklingsmodus). Bruker
// Resend sitt REST-API via fetch, så ingen ekstra avhengighet kreves.
//
// Sending skal aldri kaste eller blokkere hovedflyten – feil logges og svelges.

const apiKey = process.env.RESEND_API_KEY ?? ''
const fraAdresse = process.env.EPOST_FRA ?? 'Sporg <onboarding@resend.dev>'

export const erEpostMockModus = !apiKey

export type Epost = {
  til: string
  emne: string
  html: string
}

export async function sendEpost({ til, emne, html }: Epost): Promise<void> {
  if (erEpostMockModus) {
    console.log('📧 [DEV] E-post (ikke sendt – RESEND_API_KEY mangler)')
    console.log(`        Til:  ${til}`)
    console.log(`        Emne: ${emne}`)
    return
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: fraAdresse, to: til, subject: emne, html }),
    })

    if (!res.ok) {
      const tekst = await res.text().catch(() => '')
      console.error(`E-post feilet (${res.status}): ${tekst}`)
    }
  } catch (e) {
    console.error('E-post kunne ikke sendes:', e)
  }
}

// Sender samme e-post til flere mottakere, hver for seg (de ser ikke hverandre).
export async function sendEpostTilFlere(eposter: Epost[]): Promise<void> {
  await Promise.allSettled(eposter.map(sendEpost))
}
