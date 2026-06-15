'use client'

import { useState, useTransition } from 'react'
import { Badge, statusTilFarge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { sjekkInnDeltaker } from '@/actions/deltaker'
import { formatDatoTid, statusEtikett } from '@/lib/utils'
import type { PameldingMedDetaljer } from '@/types'

interface DeltakerTabellProps {
  pameldinjer: PameldingMedDetaljer[]
  arrangementId: string
  erOrganisator: boolean
}

export function DeltakerTabell({ pameldinjer, arrangementId, erOrganisator }: DeltakerTabellProps) {
  const [isPending, startTransition] = useTransition()
  const [sjekkInnId, setSjekkInnId] = useState<string | null>(null)
  const [sok, setSok] = useState('')

  const filtrert = pameldinjer.filter((p) =>
    p.bruker.navn.toLowerCase().includes(sok.toLowerCase()) ||
    p.bruker.epost.toLowerCase().includes(sok.toLowerCase()) ||
    (p.startnummer?.toString() ?? '').includes(sok)
  )

  function handleSjekkInn(pameldingId: string) {
    setSjekkInnId(pameldingId)
    startTransition(async () => {
      await sjekkInnDeltaker(pameldingId, arrangementId)
      setSjekkInnId(null)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Søk etter navn, e-post eller startnummer..."
          value={sok}
          onChange={(e) => setSok(e.target.value)}
          className="flex-1 rounded-lg border border-sporg-border bg-sporg-surface-3 px-3 py-2 text-sm text-sporg-text focus:border-sporg-accent focus:outline-none focus:ring-2 focus:ring-sporg-accent/20"
        />
        <span className="text-sm text-sporg-text-3">{filtrert.length} deltaker(e)</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-sporg-border">
        <table className="min-w-full divide-y divide-sporg-border">
          <thead className="bg-sporg-surface">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Deltaker</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Klasse</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Betaling</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Innsjekk</th>
              {erOrganisator && (
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Handling</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-sporg-border bg-sporg-surface-2">
            {filtrert.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-sporg-text-3">
                  Ingen deltakere funnet
                </td>
              </tr>
            )}
            {filtrert.map((pamelding) => (
              <tr key={pamelding.id} className="hover:bg-sporg-surface-3">
                <td className="px-4 py-3 text-sm font-mono text-sporg-text-3">
                  {pamelding.startnummer ?? '–'}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-sm text-sporg-text">{pamelding.bruker.navn}</div>
                  <div className="text-xs text-sporg-text-3">{pamelding.bruker.epost}</div>
                </td>
                <td className="px-4 py-3 text-sm text-sporg-text-2">{pamelding.klasse ?? '–'}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusTilFarge(pamelding.status)}>
                    {statusEtikett(pamelding.status)}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {pamelding.betaling ? (
                    <Badge variant={statusTilFarge(pamelding.betaling.status)}>
                      {statusEtikett(pamelding.betaling.status)}
                    </Badge>
                  ) : (
                    <Badge variant="green">Gratis</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-sporg-text-2">
                  {pamelding.sjekkInn ? (
                    <span className="text-green-400 text-xs">
                      ✓ {formatDatoTid(pamelding.sjekkInn.tidspunkt)}
                    </span>
                  ) : (
                    <span className="text-sporg-text-3 text-xs">–</span>
                  )}
                </td>
                {erOrganisator && (
                  <td className="px-4 py-3">
                    {!pamelding.sjekkInn && pamelding.status === 'BEKREFTET' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        loading={isPending && sjekkInnId === pamelding.id}
                        onClick={() => handleSjekkInn(pamelding.id)}
                      >
                        Sjekk inn
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
