'use client'

import { useTransition } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { opprettArrangement, oppdaterArrangement } from '@/actions/arrangement'
import type { Arrangement } from '@/types'

const kategorier = [
  { value: 'LOPING', label: 'Løping' },
  { value: 'SYKLING', label: 'Sykling' },
  { value: 'SVOMMING', label: 'Svømming' },
  { value: 'TRIATHLON', label: 'Triathlon' },
  { value: 'SKIIDRETT', label: 'Skiidrett' },
  { value: 'LAGIDRETT', label: 'Lagidrett' },
  { value: 'KAMPSPORT', label: 'Kampsport' },
  { value: 'ANNET', label: 'Annet' },
]

function toDatetimeLocal(date: Date | null | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

interface ArrangementSkjemaProps {
  arrangement?: Arrangement
}

export function ArrangementSkjema({ arrangement }: ArrangementSkjemaProps) {
  const [isPending, startTransition] = useTransition()
  const erRedigering = !!arrangement

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (erRedigering) {
        await oppdaterArrangement(arrangement.id, formData)
      } else {
        await opprettArrangement(formData)
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4">
        <h2 className="font-semibold text-sporg-text">Grunnleggende informasjon</h2>

        <Input
          label="Tittel"
          name="tittel"
          defaultValue={arrangement?.tittel}
          required
          placeholder="F.eks. Oslo Maraton 2025"
        />

        <Textarea
          label="Beskrivelse"
          name="beskrivelse"
          defaultValue={arrangement?.beskrivelse}
          required
          rows={4}
          placeholder="Beskriv arrangementet..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Sted"
            name="sted"
            defaultValue={arrangement?.sted}
            required
            placeholder="F.eks. Oslo"
          />
          <Input
            label="Adresse"
            name="adresse"
            defaultValue={arrangement?.adresse ?? ''}
            placeholder="Gateadresse (valgfritt)"
          />
        </div>

        <Select
          label="Kategori"
          name="kategori"
          defaultValue={arrangement?.kategori ?? 'ANNET'}
          options={kategorier}
          required
        />
      </div>

      <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4">
        <h2 className="font-semibold text-sporg-text">Datoer</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Startdato og -tid"
            name="startDato"
            type="datetime-local"
            defaultValue={toDatetimeLocal(arrangement?.startDato)}
            required
          />
          <Input
            label="Sluttdato og -tid"
            name="sluttDato"
            type="datetime-local"
            defaultValue={toDatetimeLocal(arrangement?.sluttDato)}
            required
          />
        </div>

        <Input
          label="Påmeldingsfrist"
          name="pameldingsFrist"
          type="datetime-local"
          defaultValue={toDatetimeLocal(arrangement?.pameldingsFrist)}
          hint="Valgfritt – sett en frist for påmelding"
        />
      </div>

      <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4">
        <h2 className="font-semibold text-sporg-text">Kapasitet og pris</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Maks antall deltakere"
            name="maksAntall"
            type="number"
            min={1}
            defaultValue={arrangement?.maksAntall ?? ''}
            placeholder="La stå tomt for ubegrenset"
          />
          <Input
            label="Påmeldingsavgift (NOK)"
            name="pris"
            type="number"
            min={0}
            defaultValue={arrangement ? Math.round(arrangement.pris / 100) : 0}
            hint="Sett til 0 for gratis arrangement"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Avbryt
        </Button>
        <Button type="submit" loading={isPending}>
          {erRedigering ? 'Lagre endringer' : 'Opprett arrangement'}
        </Button>
      </div>
    </form>
  )
}
