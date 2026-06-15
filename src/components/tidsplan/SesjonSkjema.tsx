'use client'

import { useState, useTransition } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { leggTilSesjon } from '@/actions/sesjon'

const typeOptions = [
  { value: 'AKTIVITET', label: 'Aktivitet' },
  { value: 'SEREMONI', label: 'Seremoni' },
  { value: 'PAUSE', label: 'Pause' },
  { value: 'ANNET', label: 'Annet' },
]

interface SesjonSkjemaProps {
  arrangementId: string
}

export function SesjonSkjema({ arrangementId }: SesjonSkjemaProps) {
  const [vis, setVis] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [melding, setMelding] = useState<{ type: 'success' | 'error'; tekst: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await leggTilSesjon(arrangementId, formData)
      if (res.success) {
        setMelding({ type: 'success', tekst: res.melding ?? 'Sesjon lagt til' })
        setVis(false)
      } else {
        setMelding({ type: 'error', tekst: res.feil })
      }
    })
  }

  if (!vis) {
    return (
      <div className="space-y-2">
        {melding && <Alert type={melding.type}>{melding.tekst}</Alert>}
        <Button onClick={() => { setVis(true); setMelding(null) }}>
          + Legg til sesjon
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4">
      <h3 className="font-semibold text-sporg-text">Legg til sesjon i tidsplan</h3>
      <form action={handleSubmit} className="space-y-4">
        <Input label="Tittel" name="tittel" required placeholder="F.eks. Startseremoni" />
        <Textarea label="Beskrivelse" name="beskrivelse" rows={2} placeholder="Valgfri beskrivelse" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Starttid" name="startTid" type="datetime-local" required />
          <Input label="Sluttid" name="sluttTid" type="datetime-local" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Sted" name="sted" placeholder="Valgfritt stedsnavn" />
          <Select label="Type" name="type" options={typeOptions} />
        </div>
        <div className="flex gap-3">
          <Button type="submit" loading={isPending}>Legg til</Button>
          <Button type="button" variant="outline" onClick={() => setVis(false)}>Avbryt</Button>
        </div>
      </form>
    </div>
  )
}
