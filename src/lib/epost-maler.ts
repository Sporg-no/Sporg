// E-postmaler. Hver funksjon returnerer { emne, html } klart for sendEpost().
// HTML bruker innebygde stiler (inline) fordi e-postklienter ikke laster CSS.

const BASE_URL = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

function kroner(ore: number): string {
  return `${(ore / 100).toLocaleString('nb-NO')} kr`
}

// Felles ramme rundt alt innhold.
function layout(innhold: string): string {
  return `<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0; padding:0; background-color:#f9fafb; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; background-color:#ffffff; border-radius:16px; border:1px solid #e5e7eb; overflow:hidden;">
        <tr><td style="background-color:#4f46e5; padding:24px 32px;">
          <span style="font-size:20px; font-weight:700; color:#ffffff;">Sporg</span>
        </td></tr>
        <tr><td style="padding:32px;">
          ${innhold}
        </td></tr>
        <tr><td style="padding:0 32px 32px;">
          <p style="margin:0; font-size:12px; color:#9ca3af;">Du mottar denne e-posten fordi du er bruker på Sporg.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function knapp(tekst: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background-color:#4f46e5; border-radius:8px;">
    <a href="${url}" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">${tekst}</a>
  </td></tr></table>`
}

function avsnitt(tekst: string): string {
  return `<p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#374151;">${tekst}</p>`
}

// ─── Maler ──────────────────────────────────────────────────────────────────

export function paameldingBekreftet(args: {
  deltakerNavn: string
  arrangementTittel: string
  arrangementSlug: string
  startDato: Date
  sted: string
}): { emne: string; html: string } {
  const dato = args.startDato.toLocaleDateString('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const html = layout(`
    <h1 style="margin:0 0 16px; font-size:22px; color:#111827;">Påmelding bekreftet 🎉</h1>
    ${avsnitt(`Hei ${args.deltakerNavn},`)}
    ${avsnitt(`Du er nå påmeldt <strong>${args.arrangementTittel}</strong>.`)}
    ${avsnitt(`📅 ${dato}<br>📍 ${args.sted}`)}
    ${knapp('Se arrangementet', `${BASE_URL}/p/${args.arrangementSlug}`)}
  `)
  return { emne: `Påmelding bekreftet: ${args.arrangementTittel}`, html }
}

export function betalingKvittering(args: {
  deltakerNavn: string
  arrangementTittel: string
  arrangementSlug: string
  belop: number
}): { emne: string; html: string } {
  const html = layout(`
    <h1 style="margin:0 0 16px; font-size:22px; color:#111827;">Kvittering</h1>
    ${avsnitt(`Hei ${args.deltakerNavn},`)}
    ${avsnitt(`Vi har mottatt betalingen din for <strong>${args.arrangementTittel}</strong>.`)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px; border-top:1px solid #e5e7eb; border-bottom:1px solid #e5e7eb;">
      <tr>
        <td style="padding:16px 0; font-size:15px; color:#374151;">Betalt beløp</td>
        <td style="padding:16px 0; font-size:18px; font-weight:700; color:#111827; text-align:right;">${kroner(args.belop)}</td>
      </tr>
    </table>
    ${knapp('Se arrangementet', `${BASE_URL}/p/${args.arrangementSlug}`)}
  `)
  return { emne: `Kvittering: ${args.arrangementTittel}`, html }
}

export function nyMelding(args: {
  emne: string
  innhold: string
  avsenderNavn: string
  arrangementTittel: string | null
}): { emne: string; html: string } {
  const fra = args.arrangementTittel
    ? `${args.avsenderNavn} (${args.arrangementTittel})`
    : args.avsenderNavn
  const html = layout(`
    <p style="margin:0 0 8px; font-size:13px; color:#6b7280;">Ny melding fra ${fra}</p>
    <h1 style="margin:0 0 16px; font-size:22px; color:#111827;">${args.emne}</h1>
    ${avsnitt(args.innhold.replace(/\n/g, '<br>'))}
    ${knapp('Åpne i Sporg', `${BASE_URL}/meldinger`)}
  `)
  return { emne: args.emne, html }
}

export function frivilligStatus(args: {
  navn: string
  arrangementTittel: string
  godkjent: boolean
}): { emne: string; html: string } {
  const html = args.godkjent
    ? layout(`
        <h1 style="margin:0 0 16px; font-size:22px; color:#111827;">Du er godkjent som frivillig 🙌</h1>
        ${avsnitt(`Hei ${args.navn},`)}
        ${avsnitt(`Søknaden din om å være frivillig på <strong>${args.arrangementTittel}</strong> er godkjent. Tusen takk for at du stiller opp!`)}
        ${knapp('Se detaljer', `${BASE_URL}/dashboard`)}
      `)
    : layout(`
        <h1 style="margin:0 0 16px; font-size:22px; color:#111827;">Om din frivilligsøknad</h1>
        ${avsnitt(`Hei ${args.navn},`)}
        ${avsnitt(`Vi har dessverre ikke mulighet til å ta deg med som frivillig på <strong>${args.arrangementTittel}</strong> denne gangen. Tusen takk for interessen!`)}
      `)
  const status = args.godkjent ? 'godkjent' : 'oppdatert'
  return { emne: `Frivilligsøknad ${status}: ${args.arrangementTittel}`, html }
}
