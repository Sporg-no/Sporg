import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import './globals.css'
import { SessionProvider } from './providers'

export const metadata: Metadata = {
  title: 'Sporg – Idrettsarrangementer',
  description: 'Den komplette plattformen for organisering av idrettsarrangementer i Norge',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="nb">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
