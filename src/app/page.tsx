import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDato, formatPris, kategorietikett } from '@/lib/utils'

export default async function Hjemmeside() {
  const session = await getServerSession(authOptions)

  const arrangementer = await prisma.arrangement.findMany({
    where: { status: 'PUBLISERT' },
    include: {
      organisator: { select: { navn: true } },
      _count: { select: { pameldingerFor: true } },
    },
    orderBy: { startDato: 'asc' },
    take: 6,
  })

  const totalt = await prisma.arrangement.count({ where: { status: 'PUBLISERT' } })

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigasjon */}
      <nav className="border-b border-indigo-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-lg font-bold text-gray-900">Sporg</span>
          </Link>
          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Gå til oversikten
              </Link>
            ) : (
              <>
                <Link
                  href="/logg-inn"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Logg inn
                </Link>
                <Link
                  href="/registrer-bruker"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Kom i gang
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
          🏆 Norsk idrettsarrangementplatform
        </div>
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6">
          Organiser idrettsarrangementer
          <br />
          <span className="text-indigo-600">enkelt og profesjonelt</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Sporg samler alt du trenger for å arrangere idrettskonkurranser –
          påmelding, betaling, deltakerstyring, tidsplan, resultater og frivillige
          på ett sted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={session ? '/arrangementer/ny' : '/registrer-bruker'}
            className="rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
          >
            Opprett et arrangement
          </Link>
          <Link
            href="#arrangementer"
            className="rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            Se alle arrangementer
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { ikon: '📋', tittel: 'Påmelding', tekst: 'Enkel online påmelding' },
            { ikon: '💳', tittel: 'Betaling', tekst: 'Sikker kortbetaling via Stripe' },
            { ikon: '👥', tittel: 'Deltakere', tekst: 'Full deltakeroversikt og innsjekk' },
            { ikon: '🏅', tittel: 'Resultater', tekst: 'Publiser resultater live' },
          ].map((f) => (
            <div key={f.tittel} className="rounded-xl border border-gray-200 bg-white p-5 text-center">
              <div className="text-3xl mb-2">{f.ikon}</div>
              <h3 className="font-semibold text-gray-900">{f.tittel}</h3>
              <p className="mt-1 text-sm text-gray-500">{f.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Arrangementer */}
      <section id="arrangementer" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Kommende arrangementer
            <span className="ml-2 text-sm font-normal text-gray-400">({totalt} totalt)</span>
          </h2>
        </div>

        {arrangementer.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">Ingen arrangementer publisert ennå.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {arrangementer.map((arr) => (
              <Link
                key={arr.id}
                href={`/p/${arr.slug}`}
                className="block rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5">
                    {kategorietikett(arr.kategori)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{arr.tittel}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{arr.beskrivelse}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">📅 {formatDato(arr.startDato)}</span>
                  <span className="font-medium text-indigo-600">{formatPris(arr.pris)}</span>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  📍 {arr.sted} · {arr._count.pameldingerFor} påmeldte
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Sporg – Idrettsarrangementer i Norge</p>
        </div>
      </footer>
    </div>
  )
}
