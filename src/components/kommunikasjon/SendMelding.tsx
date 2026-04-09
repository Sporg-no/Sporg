'use client'

import { useState, useTransition } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { sendMelding } from '@/actions/kommunikasjon'

const meldingTyper = [
  { value: 'ALLE_DELTAKERE', label: 'Alle deltakere' },
  { value: 'ALLE_FRIVILLIGE', label: 'Alle frivillige (godkjente)' },
  { value: 'KUNNGJORING', label: 'Kunngjøring (alle deltakere)' },
]

interface SendMeldingProps {
  arrangementId: string
}

export function SendMelding({ arrangementId }: SendMeldingProps) {
  const [isPending, startTransition] = useTransition()
  const [melding, setMelding] = useState<{ type: 'success' | 'error'; tekst: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await sendMelding(arrangementId, formData)
      setMelding({ type: res.success ? 'success' : 'error', tekst: res.success ? (res.melding ?? 'Sendt') : res.feil })
    })
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
      <h3 className="font-semibold text-gray-900">Send melding til deltakere</h3>

      {melding && <Alert type={melding.type}>{melding.tekst}</Alert>}

      <form action={handleSubmit} className="space-y-4">
        <Select
          label="Send til"
          name="type"
          options={meldingTyper}
        />
        <Input label="Emne" name="emne" required placeholder="Emne for meldingen" />
        <Textarea
          label="Innhold"
          name="innhold"
          required
          rows={5}
          placeholder="Skriv meldingen her..."
        />
        <Button type="submit" loading={isPending}>
          Send melding
        </Button>
      </form>
    </div>
  )
}
