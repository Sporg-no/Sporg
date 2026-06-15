import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge, statusTilFarge } from '@/components/ui/Badge'
import { formatDato, formatPris, statusEtikett } from '@/lib/utils'

export default async function DashboardSide() {
  const session = await getServerSession(authOptions)!
  if (!session) return null

  const [mineArrangementer, minePameldinjer, ulesteMeldinger] = await Promise.all([
    prisma.arrangement.findMany({
      where: { organisatorId: session!.user.id },
      include: { _count: { select: { pameldingerFor: true } } },
      orderBy: { startDato: 'asc' },
      take: 5,
    }),
    prisma.pamelding.findMany({
      where: { brukerId: session!.user.id },
      include: {
        arrangement: { select: { id: true, tittel: true, startDato: true, sted: true } },
      },
      orderBy: { opprettetAt: 'desc' },
      take: 5,
    }),
    prisma.meldingMottaker.count({
      where: { brukerId: session!.user.id, lest: false },
    }),
  ])

  const stats = [
    {
      label: 'Mine arrangementer',
      verdi: mineArrangementer.length,
      ikon: '🏟️',
      href: '/arrangementer',
    },
    {
      label: 'Mine påmeldinger',
      verdi: minePameldinjer.length,
      ikon: '✅',
      href: '/meldinger',
    },
    {
      label: 'Uleste meldinger',
      verdi: ulesteMeldinger,
      ikon: '📬',
      href: '/meldinger',
    },
  ]

  return (
    <div>
      <PageHeader
        title={`God dag, ${session!.user.name?.split(' ')[0]} 👋`}
        description="Her er en oversikt over din aktivitet"
        actions={
          <Link href="/arrangementer/ny">
            <Button>+ Nytt arrangement</Button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-sporg-border bg-sporg-surface-2 p-6 shadow-card hover:shadow-card-hover transition-all duration-200 hover:border-sporg-accent/25 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sporg-text-3">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-sporg-text">{stat.verdi}</p>
              </div>
              <span className="text-3xl">{stat.ikon}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Mine arrangementer */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sporg-text">Mine arrangementer</h2>
            <Link href="/arrangementer" className="text-sm text-sporg-accent hover:text-green-300">
              Se alle →
            </Link>
          </div>

          {mineArrangementer.length === 0 ? (
            <div className="rounded-xl border border-dashed border-sporg-border bg-sporg-surface-2 p-8 text-center">
              <p className="text-sm text-sporg-text-3 mb-3">Du har ingen arrangementer ennå</p>
              <Link href="/arrangementer/ny">
                <Button size="sm">Opprett ditt første arrangement</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {mineArrangementer.map((arr) => (
                <Link
                  key={arr.id}
                  href={`/arrangementer/${arr.id}`}
                  className="flex items-center justify-between rounded-xl border border-sporg-border bg-sporg-surface-2 p-4 shadow-card transition-all duration-200 hover:border-sporg-accent/25 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div>
                    <p className="font-medium text-sporg-text">{arr.tittel}</p>
                    <p className="text-xs text-sporg-text-3">{formatDato(arr.startDato)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-sporg-text-3">{arr._count.pameldingerFor} påmeldte</span>
                    <Badge variant={statusTilFarge(arr.status)}>
                      {statusEtikett(arr.status)}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mine påmeldinger */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sporg-text">Mine påmeldinger</h2>
          </div>

          {minePameldinjer.length === 0 ? (
            <div className="rounded-xl border border-dashed border-sporg-border bg-sporg-surface-2 p-8 text-center">
              <p className="text-sm text-sporg-text-3">Du er ikke påmeldt noen arrangementer ennå</p>
            </div>
          ) : (
            <div className="space-y-3">
              {minePameldinjer.map((p) => (
                <Link
                  key={p.id}
                  href={`/p/${p.arrangement.id}`}
                  className="flex items-center justify-between rounded-xl border border-sporg-border bg-sporg-surface-2 p-4 shadow-card transition-all duration-200 hover:border-sporg-accent/25 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div>
                    <p className="font-medium text-sporg-text">{p.arrangement.tittel}</p>
                    <p className="text-xs text-sporg-text-3">
                      {formatDato(p.arrangement.startDato)} · {p.arrangement.sted}
                    </p>
                  </div>
                  <Badge variant={statusTilFarge(p.status)}>
                    {statusEtikett(p.status)}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
