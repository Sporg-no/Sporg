'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/Button'
import { slettSesjon } from '@/actions/sesjon'
import { formatDatoTid } from '@/lib/utils'
import type { Sesjon } from '@/types'

const typeEtikett: Record<string, { label: string; klasse: string }> = {
  AKTIVITET: { label: 'Aktivitet', klasse: 'bg-blue-500/10 text-blue-400' },
  SEREMONI: { label: 'Seremoni', klasse: 'bg-purple-500/10 text-purple-400' },
  PAUSE: { label: 'Pause', klasse: 'bg-sporg-surface-3 text-sporg-text-2' },
  ANNET: { label: 'Annet', klasse: 'bg-amber-500/10 text-amber-400' },
}

interface SesjonListeProps {
  sesjoner: Sesjon[]
  arrangementId: string
  erOrganisator: boolean
}

export function SesjonListe({ sesjoner, arrangementId, erOrganisator }: SesjonListeProps) {
  const [isPending, startTransition] = useTransition()

  function handleSlett(sesjonId: string) {
    if (!confirm('Slett denne sesjonen?')) return
    startTransition(() => { void slettSesjon(sesjonId, arrangementId) })
  }

  if (sesjoner.length === 0) {
    return (
      <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-8 text-center">
        <p className="text-sm text-sporg-text-3">Ingen sesjoner i tidsplanen ennå</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sesjoner.map((sesjon) => {
        const typeInfo = typeEtikett[sesjon.type] ?? typeEtikett.ANNET
        return (
          <div key={sesjon.id} className="flex items-start gap-4 rounded-xl border border-sporg-border bg-sporg-surface-2 p-4">
            <div className="flex-shrink-0 text-center min-w-[80px]">
              <p className="text-xs text-sporg-text-3">{formatDatoTid(sesjon.startTid)}</p>
              <p className="text-xs text-sporg-text-3">↓</p>
              <p className="text-xs text-sporg-text-3">{formatDatoTid(sesjon.sluttTid)}</p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${typeInfo.klasse}`}>
                  {typeInfo.label}
                </span>
                {sesjon.sted && (
                  <span className="text-xs text-sporg-text-3">📍 {sesjon.sted}</span>
                )}
              </div>
              <h4 className="font-medium text-sporg-text">{sesjon.tittel}</h4>
              {sesjon.beskrivelse && (
                <p className="mt-0.5 text-sm text-sporg-text-3">{sesjon.beskrivelse}</p>
              )}
            </div>
            {erOrganisator && (
              <Button
                size="sm"
                variant="ghost"
                loading={isPending}
                onClick={() => handleSlett(sesjon.id)}
                className="text-red-400 hover:bg-red-500/10"
              >
                Slett
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
