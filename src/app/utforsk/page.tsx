import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDato, formatPris, kategorietikett } from '@/lib/utils'
import { UtforskKlient } from '@/components/utforsk/UtforskKlient'

export const metadata = {
  title: 'Utforsk arrangementer – Sporg',
  description: 'Finn og meld deg på sportsarrangementer i ditt område',
}

export default async function UtforskSide() {
  const session = await getServerSession(authOptions)

  const arrangementer = await prisma.arrangement.findMany({
    where: { status: 'PUBLISERT' },
    include: {
      organisator: { select: { navn: true } },
      _count: { select: { pameldingerFor: true } },
    },
    orderBy: { startDato: 'asc' },
  })

  const serialized = arrangementer.map((a) => ({
    id: a.id,
    slug: a.slug,
    tittel: a.tittel,
    beskrivelse: a.beskrivelse,
    sted: a.sted,
    startDato: a.startDato.toISOString(),
    sluttDato: a.sluttDato.toISOString(),
    pameldingsFrist: a.pameldingsFrist?.toISOString() ?? null,
    maksAntall: a.maksAntall,
    pris: a.pris,
    kategori: a.kategori,
    organisatorNavn: a.organisator.navn,
    antallPameldt: a._count.pameldingerFor,
  }))

  return (
    <div className="min-h-screen bg-sporg-bg text-sporg-text">
      <nav className="sticky top-0 z-50 border-b border-sporg-border bg-sporg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sporg-accent shadow-glow-sm">
              <svg className="h-4 w-4 text-sporg-bg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-[17px] font-bold tracking-tight">Sporg</span>
          </Link>
          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-xl bg-sporg-accent px-5 py-2 text-sm font-semibold text-sporg-bg shadow-glow-sm hover:bg-green-300 transition-all duration-150"
              >
                Min side
              </Link>
            ) : (
              <>
                <Link href="/logg-inn" className="px-4 py-2 text-sm font-medium text-sporg-text-2 hover:text-sporg-text transition-colors">
                  Logg inn
                </Link>
                <Link
                  href="/registrer-bruker"
                  className="rounded-xl bg-sporg-accent px-5 py-2 text-sm font-semibold text-sporg-bg shadow-glow-sm hover:bg-green-300 transition-all duration-150"
                >
                  Kom i gang
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-sporg-text" style={{ letterSpacing: '-0.025em' }}>
            Utforsk arrangementer
          </h1>
          <p className="mt-2 text-sporg-text-3">
            {serialized.length} publiserte arrangementer — finn ditt neste eventyr
          </p>
        </div>

        <UtforskKlient arrangementer={serialized} />
      </div>
    </div>
  )
}
