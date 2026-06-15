import { formatDatoTid } from '@/lib/utils'
import type { MeldingMedDetaljer } from '@/types'

const typeEtikett: Record<string, string> = {
  DIREKTE: 'Direkte',
  ALLE_DELTAKERE: 'Alle deltakere',
  ALLE_FRIVILLIGE: 'Alle frivillige',
  KUNNGJORING: 'Kunngjøring',
}

interface MeldingListeProps {
  meldinger: MeldingMedDetaljer[]
}

export function MeldingListe({ meldinger }: MeldingListeProps) {
  if (meldinger.length === 0) {
    return (
      <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-8 text-center">
        <p className="text-sm text-sporg-text-3">Ingen meldinger sendt ennå</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {meldinger.map((m) => (
        <div key={m.id} className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-sporg-accent/10 text-sporg-accent border border-sporg-accent/20 rounded-full px-2 py-0.5">
                  {typeEtikett[m.type] ?? m.type}
                </span>
                <span className="text-xs text-sporg-text-3">{m.mottakere.length} mottaker(e)</span>
              </div>
              <h4 className="font-medium text-sporg-text">{m.emne}</h4>
              <p className="mt-1 text-sm text-sporg-text-2 whitespace-pre-wrap line-clamp-3">{m.innhold}</p>
            </div>
            <div className="text-right flex-shrink-0 text-xs text-sporg-text-3">
              <p>{formatDatoTid(m.sendtAt)}</p>
              <p className="mt-0.5">{m.avsender.navn}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
