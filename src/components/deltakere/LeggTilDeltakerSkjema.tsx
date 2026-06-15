'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { leggTilDeltaker } from '@/actions/deltaker'

interface Props {
  arrangementId: string
}

export function LeggTilDeltakerSkjema({ arrangementId }: Props) {
  const [apen, setApen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [melding, setMelding] = useState<{ type: 'suksess' | 'feil'; tekst: string } | null>(null)
  const [epost, setEpost] = useState('')
  const [klasse, setKlasse] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMelding(null)
    startTransition(async () => {
      const res = await leggTilDeltaker(arrangementId, epost, klasse || undefined)
      if (res.success) {
        setMelding({ type: 'suksess', tekst: res.melding ?? 'Deltaker lagt til' })
        setEpost('')
        setKlasse('')
      } else {
        setMelding({ type: 'feil', tekst: res.feil ?? 'Noe gikk galt' })
      }
    })
  }

  if (!apen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setApen(true)}>
        + Legg til deltaker
      </Button>
    )
  }

  return (
    <div className="rounded-xl border border-sporg-accent/20 bg-sporg-accent/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-sporg-text">Legg til deltaker manuelt</h3>
        <button
          onClick={() => { setApen(false); setMelding(null) }}
          className="text-sporg-text-3 hover:text-sporg-text text-lg leading-none"
        >
          ×
        </button>
      </div>

      {melding && (
        <div
          className={[
            'mb-3 rounded-lg border px-3 py-2 text-xs',
            melding.type === 'suksess'
              ? 'border-green-500/20 bg-green-500/10 text-green-400'
              : 'border-red-500/20 bg-red-500/10 text-red-400',
          ].join(' ')}
        >
          {melding.tekst}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="E-postadresse"
            type="email"
            value={epost}
            onChange={(e) => setEpost(e.target.value)}
            placeholder="bruker@epost.no"
            required
          />
        </div>
        <div className="w-40">
          <Input
            label="Klasse (valgfri)"
            type="text"
            value={klasse}
            onChange={(e) => setKlasse(e.target.value)}
            placeholder="f.eks. Elite"
          />
        </div>
        <Button type="submit" loading={isPending} size="sm" className="self-end h-[42px]">
          Legg til
        </Button>
      </form>
      <p className="mt-2 text-xs text-sporg-text-3">
        Brukeren må ha en konto på Sporg. Du kan sende dem en lenke til{' '}
        <span className="text-sporg-accent">/registrer-bruker</span>.
      </p>
    </div>
  )
}
