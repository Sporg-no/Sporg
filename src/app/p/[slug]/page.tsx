import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Badge, statusTilFarge } from '@/components/ui/Badge'
import { formatDatoTid, formatPris, kategorietikett, statusEtikett } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const arr = await prisma.arrangement.findUnique({ where: { slug: params.slug } })
  if (!arr) return {}
  return {
    title: `${arr.tittel} – Sporg`,
    description: arr.beskrivelse.slice(0, 160),
  }
}

export default async function OffentligArrangementSide({ params }: Props) {
  const session = await getServerSession(authOptions)

  const arr = await prisma.arrangement.findUnique({
    where: { slug: params.slug },
    include: {
      organisator: { select: { navn: true } },
      sesjoner: { orderBy: { startTid: 'asc' } },
      resultaterFor: { where: { publisert: true }, orderBy: { plassering: 'asc' } },
      _count: { select: { pameldingerFor: true } },
    },
  })

  if (!arr || arr.status === 'UTKAST') notFound()

  // Sjekk om brukeren er påmeldt
  let erPameldt = false
  if (session) {
    const p = await prisma.pamelding.findUnique({
      where: { arrangementId_brukerId: { arrangementId: arr.id, brukerId: session.user.id } },
    })
    erPameldt = !!p
  }

  const pameldingAapen =
    arr.status === 'PUBLISERT' &&
    (!arr.pameldingsFrist || new Date() < arr.pameldingsFrist) &&
    (!arr.maksAntall || arr._count.pameldingerFor < arr.maksAntall)

  const plasserIgjen = arr.maksAntall
    ? arr.maksAntall - arr._count.pameldingerFor
    : null

  return (
    <div
      className="min-h-screen bg-sporg-bg text-sporg-text"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(74,222,128,0.1) 0%, transparent 65%), #09090b' }}
    >
      {/* Toppnavigasjon */}
      <nav className="border-b border-sporg-border bg-sporg-surface-2">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sporg-accent">
              <span className="text-xs font-bold text-sporg-bg">S</span>
            </div>
            <span className="font-bold text-sporg-text">Sporg</span>
          </Link>
          {session ? (
            <Link href="/dashboard" className="text-sm text-sporg-text-2 hover:text-sporg-text">
              Til oversikten →
            </Link>
          ) : (
            <Link href="/logg-inn" className="text-sm text-sporg-accent hover:text-green-300 font-medium">
              Logg inn
            </Link>
          )}
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Hovedinnhold */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={statusTilFarge(arr.status)}>{statusEtikett(arr.status)}</Badge>
                <span className="text-sm text-sporg-text-3">{kategorietikett(arr.kategori)}</span>
              </div>
              <h1 className="text-3xl font-bold text-sporg-text">{arr.tittel}</h1>
              <p className="mt-1 text-sm text-sporg-text-3">
                Arrangert av {arr.organisator.navn}
              </p>
            </div>

            <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 shadow-card">
              <h2 className="font-semibold text-sporg-text mb-3">Om arrangementet</h2>
              <p className="text-sporg-text-2 whitespace-pre-wrap leading-relaxed">{arr.beskrivelse}</p>
            </div>

            {/* Tidsplan */}
            {arr.sesjoner.length > 0 && (
              <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 shadow-card">
                <h2 className="font-semibold text-sporg-text mb-4">Tidsplan</h2>
                <div className="space-y-3">
                  {arr.sesjoner.map((s) => (
                    <div key={s.id} className="flex gap-4">
                      <div className="text-right text-xs text-sporg-text-3 w-28 flex-shrink-0 pt-0.5">
                        {formatDatoTid(s.startTid)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-sporg-text">{s.tittel}</p>
                        {s.sted && <p className="text-xs text-sporg-text-3">📍 {s.sted}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resultater */}
            {arr.resultaterFor.length > 0 && (
              <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 shadow-card">
                <h2 className="font-semibold text-sporg-text mb-4">Resultater</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-sporg-text-3 border-b border-sporg-border">
                        <th className="pb-2 pr-4">Pl.</th>
                        <th className="pb-2 pr-4">#</th>
                        <th className="pb-2 pr-4">Navn</th>
                        <th className="pb-2 pr-4">Klasse</th>
                        <th className="pb-2">Tid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sporg-border">
                      {arr.resultaterFor.map((r) => (
                        <tr key={r.id} className="py-2">
                          <td className="py-2 pr-4 font-bold">{r.plassering ?? '–'}</td>
                          <td className="py-2 pr-4 font-mono text-sporg-text-3">{r.startnummer ?? '–'}</td>
                          <td className="py-2 pr-4 font-medium">{r.deltakerNavn}</td>
                          <td className="py-2 pr-4 text-sporg-text-3">{r.klasse ?? '–'}</td>
                          <td className="py-2 font-mono">{r.tid ?? '–'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar – påmelding */}
          <div>
            <div className="sticky top-6 rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4 shadow-card">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-sporg-text-2">
                  <span>📅</span>
                  <span>{formatDatoTid(arr.startDato)}</span>
                </div>
                <div className="flex items-center gap-2 text-sporg-text-2">
                  <span>📍</span>
                  <span>{arr.sted}{arr.adresse ? `, ${arr.adresse}` : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sporg-text-2">
                  <span>👥</span>
                  <span>
                    {arr._count.pameldingerFor} påmeldte
                    {arr.maksAntall ? ` av ${arr.maksAntall}` : ''}
                  </span>
                </div>
                {arr.pameldingsFrist && (
                  <div className="flex items-center gap-2 text-sporg-text-2">
                    <span>⏰</span>
                    <span>Frist: {formatDatoTid(arr.pameldingsFrist)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-sporg-border pt-4">
                <p className="text-2xl font-bold text-sporg-text">{formatPris(arr.pris)}</p>
                {plasserIgjen !== null && plasserIgjen <= 20 && (
                  <p className="text-xs text-amber-400 mt-0.5">
                    {plasserIgjen} plasser igjen!
                  </p>
                )}
              </div>

              {erPameldt ? (
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-center text-sm text-green-400">
                  ✅ Du er påmeldt!
                </div>
              ) : pameldingAapen ? (
                <Link
                  href={`/p/${arr.slug}/pamelding`}
                  className="block w-full rounded-lg bg-sporg-accent py-3 text-center text-sm font-semibold text-sporg-bg hover:bg-green-300 shadow-glow-sm"
                >
                  Meld deg på
                </Link>
              ) : (
                <div className="rounded-lg bg-sporg-surface p-3 text-center text-sm text-sporg-text-3">
                  {arr.status === 'AVSLUTTET'
                    ? 'Arrangementet er avsluttet'
                    : 'Påmelding er stengt'}
                </div>
              )}

              {!session && pameldingAapen && (
                <p className="text-xs text-center text-sporg-text-3">
                  <Link href="/logg-inn" className="text-sporg-accent hover:underline">Logg inn</Link>
                  {' '}for å melde deg på
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
