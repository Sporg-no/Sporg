import Link from 'next/link'
import { Badge, statusTilFarge } from '@/components/ui/Badge'
import { formatDato, formatPris, kategorietikett, statusEtikett } from '@/lib/utils'
import type { ArrangementMedOrganisator } from '@/types'

interface ArrangementKortProps {
  arrangement: ArrangementMedOrganisator
  visOrganisator?: boolean
}

export function ArrangementKort({ arrangement, visOrganisator }: ArrangementKortProps) {
  return (
    <Link
      href={`/arrangementer/${arrangement.id}`}
      className="block rounded-xl border border-sporg-border bg-sporg-surface-2 p-5 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-sporg-accent/25"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={statusTilFarge(arrangement.status)}>
              {statusEtikett(arrangement.status)}
            </Badge>
            <span className="text-xs text-sporg-text-3">{kategorietikett(arrangement.kategori)}</span>
          </div>
          <h3 className="font-semibold text-sporg-text truncate">{arrangement.tittel}</h3>
          <p className="mt-1 text-sm text-sporg-text-3 line-clamp-2">{arrangement.beskrivelse}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-medium text-sporg-accent">{formatPris(arrangement.pris)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-sporg-text-3">
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDato(arrangement.startDato)}
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {arrangement.sted}
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {arrangement._count.pameldingerFor}
          {arrangement.maksAntall ? ` / ${arrangement.maksAntall}` : ''} påmeldte
        </span>
        {visOrganisator && (
          <span className="text-xs">{arrangement.organisator.navn}</span>
        )}
      </div>
    </Link>
  )
}
