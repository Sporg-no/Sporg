import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Expecta – Er det trygt? Skann produktet og få svar | For gravide og ammende',
  description:
    'Expecta leser strekkoden eller ingredienslisten med kameraet og gir deg en tydelig vurdering for graviditet og amming – bygget på medisinske kilder og norske retningslinjer.',
  openGraph: {
    title: 'Expecta – Er det trygt? Skann og få svar.',
    description:
      'Tydelige trygghetssvar for gravide og ammende – bygget på medisinske kilder og norske retningslinjer, ikke forumtråder.',
    locale: 'nb_NO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  )
}
