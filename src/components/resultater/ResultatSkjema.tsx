'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { leggTilResultat } from '@/actions/resultat'

interface ResultatSkjemaProps {
  arrangementId: string
}

export function ResultatSkjema({ arrangementId }: ResultatSkjemaProps) {
  const [isPending, startTransition] = useTransition()
  const [vis, setVis] = useState(false)
  const [melding, setMelding] = useState<{ type: 'success' | 'error'; tekst: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await leggTilResultat(arrangementId, formData)
      if (res.success) {
        setMelding({ type: 'success', tekst: res.melding ?? 'Resultat lagt til' })
        setVis(false)
      } else {
        setMelding({ type: 'error', tekst: res.feil })
      }
    })
  }

  if (!vis) {
    return (
      <div className="space-y-3">
        {melding && <Alert type={melding.type}>{melding.tekst}</Alert>}
        <Button onClick={() => { setVis(true); setMelding(null) }}>
          + Legg til resultat
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4">
      <h3 className="font-semibold text-sporg-text">Legg til resultat</h3>
      <form action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Deltakernavn" name="deltakerNavn" required placeholder="Fornavn Etternavn" />
          <Input label="Startnummer" name="startnummer" type="number" min={1} placeholder="F.eks. 42" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Klasse" name="klasse" placeholder="F.eks. Menn 30-39" />
          <Input label="Plassering" name="plassering" type="number" min={1} placeholder="1, 2, 3..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Tid (HH:MM:SS)" name="tid" placeholder="01:23:45" pattern="\d{2}:\d{2}:\d{2}" />
          <Input label="Poeng" name="poeng" type="number" step="0.01" placeholder="F.eks. 95.5" />
        </div>
        <Input label="Merknad" name="merknad" placeholder="Valgfri merknad" />
        <div className="flex gap-3">
          <Button type="submit" loading={isPending}>Lagre resultat</Button>
          <Button type="button" variant="outline" onClick={() => setVis(false)}>Avbryt</Button>
        </div>
      </form>
    </div>
  )
}
