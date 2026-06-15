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
    <div className="min-h-screen bg-sporg-bg text-sporg-text">

      {/* ── Navigasjon ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-sporg-border bg-sporg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sporg-accent shadow-glow-sm">
              <svg className="h-4 w-4 text-sporg-bg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-[17px] font-bold tracking-tight">Sporg</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/utforsk"
              className="px-4 py-2 text-sm font-medium text-sporg-text-2 hover:text-sporg-text transition-colors"
            >
              Utforsk
            </Link>
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-xl bg-sporg-accent px-5 py-2 text-sm font-semibold text-sporg-bg shadow-glow-sm hover:bg-green-300 transition-all duration-150 active:scale-95"
              >
                Gå til oversikten
              </Link>
            ) : (
              <>
                <Link
                  href="/logg-inn"
                  className="px-4 py-2 text-sm font-medium text-sporg-text-2 hover:text-sporg-text transition-colors"
                >
                  Logg inn
                </Link>
                <Link
                  href="/registrer-bruker"
                  className="rounded-xl bg-sporg-accent px-5 py-2 text-sm font-semibold text-sporg-bg shadow-glow-sm hover:bg-green-300 transition-all duration-150 active:scale-95"
                >
                  Kom i gang
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Gradient mesh bakgrunn */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% -5%, rgba(74,222,128,0.18) 0%, transparent 65%), ' +
              'radial-gradient(ellipse 60% 50% at 85% 40%, rgba(129,140,248,0.1) 0%, transparent 60%), ' +
              'radial-gradient(ellipse 50% 40% at 10% 70%, rgba(74,222,128,0.06) 0%, transparent 60%)',
          }}
        />

        {/* Dekorative sirkler */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full border border-sporg-accent/5" />
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full border border-sporg-accent/8" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sporg-accent/20 bg-sporg-accent/8 px-4 py-1.5 text-sm font-medium text-sporg-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-sporg-accent shadow-glow-sm animate-pulse" />
            Norges ledende idrettsplattform
          </div>

          {/* Overskrift */}
          <h1
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.06' }}
          >
            Organiser
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              idrettsarrangementer
            </span>
            <br />
            som en proff.
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-sporg-text-2 leading-relaxed">
            Alt du trenger – påmelding, betaling, deltakerstyring,
            tidsplan, resultater og frivillige – på ett sted.
          </p>

          {/* CTAer */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={session ? '/arrangementer/ny' : '/registrer-bruker'}
              className="flex items-center gap-2 rounded-2xl bg-sporg-accent px-8 py-3.5 text-base font-semibold text-sporg-bg shadow-glow-green hover:bg-green-300 transition-all duration-200 active:scale-95"
            >
              Opprett gratis arrangement
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#arrangementer"
              className="flex items-center gap-2 rounded-2xl border border-sporg-border-strong bg-sporg-surface-2 px-8 py-3.5 text-base font-semibold text-sporg-text-2 hover:bg-sporg-surface-3 hover:text-sporg-text transition-all duration-200 active:scale-95"
            >
              Se arrangementer
            </Link>
          </div>

          {/* Tillit-stats */}
          <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:divide-x sm:divide-sporg-border">
            {[
              { tall: totalt.toString(), etikett: 'arrangementer' },
              { tall: '100%', etikett: 'gratis å starte' },
              { tall: 'Norsk', etikett: 'support' },
            ].map((s) => (
              <div key={s.etikett} className="flex flex-col items-center px-8">
                <span className="text-2xl font-bold text-sporg-text">{s.tall}</span>
                <span className="mt-0.5 text-sm text-sporg-text-3">{s.etikett}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Alt på ett sted</h2>
          <p className="mt-3 text-sporg-text-2">
            Vi tok den beste praksisen fra verdens største idrettsarrangementer
            og pakket det inn i et enkelt verktøy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              ikon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              ),
              tittel: 'Smart påmelding',
              tekst: 'Venteliste, klasser og frister håndteres automatisk.',
            },
            {
              ikon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              ),
              tittel: 'Sikker betaling',
              tekst: 'Kortbetaling via Stripe. Pengene er trygge.',
            },
            {
              ikon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              tittel: 'Deltakerstyring',
              tekst: 'Innsjekk, startnummer og full oversikt på sekunder.',
            },
            {
              ikon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              tittel: 'Live resultater',
              tekst: 'Publiser plasseringer og tider i sanntid.',
            },
          ].map((f) => (
            <div
              key={f.tittel}
              className="group rounded-2xl border border-sporg-border bg-sporg-surface-2 p-6 transition-all duration-200 hover:border-sporg-accent/25 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sporg-accent/10 text-sporg-accent group-hover:bg-sporg-accent/15 transition-colors">
                {f.ikon}
              </div>
              <h3 className="mb-1.5 font-semibold text-sporg-text">{f.tittel}</h3>
              <p className="text-sm leading-relaxed text-sporg-text-3">{f.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Arrangementer ── */}
      <section id="arrangementer" className="mx-auto max-w-6xl px-6 pb-24 pt-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Kommende arrangementer</h2>
            <p className="mt-1 text-sm text-sporg-text-3">
              {totalt === 0 ? 'Ingen ennå' : `${totalt} publiserte`}
            </p>
          </div>
          {totalt > 6 && (
            <Link
              href="/utforsk"
              className="text-sm font-medium text-sporg-accent hover:text-green-300 transition-colors"
            >
              Se alle {totalt} →
            </Link>
          )}
        </div>

        {arrangementer.length === 0 ? (
          <div className="rounded-2xl border border-sporg-border bg-sporg-surface-2 p-16 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sporg-surface-3">
              <svg className="h-7 w-7 text-sporg-text-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-medium text-sporg-text-2">Ingen arrangementer publisert ennå.</p>
            <p className="mt-1 text-sm text-sporg-text-3">Bli den første til å opprette et arrangement!</p>
            <Link
              href={session ? '/arrangementer/ny' : '/registrer-bruker'}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sporg-accent px-6 py-2.5 text-sm font-semibold text-sporg-bg hover:bg-green-300 transition-colors"
            >
              Opprett arrangement
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {arrangementer.map((arr) => (
              <Link
                key={arr.id}
                href={`/p/${arr.slug}`}
                className="group block rounded-2xl border border-sporg-border bg-sporg-surface-2 p-6 transition-all duration-200 hover:border-sporg-accent/25 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                {/* Kategori-pill */}
                <div className="mb-4 inline-flex items-center rounded-full border border-sporg-accent/20 bg-sporg-accent/8 px-2.5 py-0.5 text-xs font-medium text-sporg-accent">
                  {kategorietikett(arr.kategori)}
                </div>

                <h3 className="mb-2 text-base font-semibold text-sporg-text group-hover:text-sporg-accent transition-colors line-clamp-2">
                  {arr.tittel}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-sporg-text-3 line-clamp-2">
                  {arr.beskrivelse}
                </p>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-sporg-text-2">
                    <svg className="h-3.5 w-3.5 text-sporg-text-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDato(arr.startDato)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-sporg-text-2">
                    <svg className="h-3.5 w-3.5 text-sporg-text-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {arr.sted}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-sporg-border pt-4">
                  <span className="text-xs text-sporg-text-3">
                    {arr._count.pameldingerFor} påmeldte
                  </span>
                  <span className={`text-sm font-bold ${arr.pris === 0 ? 'text-sporg-accent' : 'text-sporg-text'}`}>
                    {formatPris(arr.pris)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA banner ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(74,222,128,0.15) 0%, transparent 70%), ' +
              'linear-gradient(to bottom, #1c1c20, #111114)',
            border: '1px solid rgba(74,222,128,0.15)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
          />
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Klar til å ta arrangementet ditt til neste nivå?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sporg-text-2">
            Registrer deg gratis og ha ditt første arrangement oppe på under 5 minutter.
          </p>
          <Link
            href={session ? '/arrangementer/ny' : '/registrer-bruker'}
            className="inline-flex items-center gap-2 rounded-2xl bg-sporg-accent px-8 py-3.5 text-base font-semibold text-sporg-bg shadow-glow-green hover:bg-green-300 transition-all duration-200 active:scale-95"
          >
            Start nå – helt gratis
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-sporg-border">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sporg-accent/20">
              <svg className="h-3.5 w-3.5 text-sporg-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-sporg-text-2">Sporg</span>
          </div>
          <p className="text-sm text-sporg-text-3">
            © {new Date().getFullYear()} Sporg – Idrettsarrangementer i Norge
          </p>
        </div>
      </footer>
    </div>
  )
}
