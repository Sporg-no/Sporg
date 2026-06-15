'use client'

import { useState, useTransition } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { erMockModus } from '@/lib/stripe'

interface PameldingSkjemaProps {
  arrangementId: string
  pris: number // øre
  slug: string
}

export function PameldingSkjema({ arrangementId, pris, slug }: PameldingSkjemaProps) {
  const [isPending, startTransition] = useTransition()
  const [steg, setSteg] = useState<'skjema' | 'betaling' | 'bekreftet'>('skjema')
  const [pameldingId, setPameldingId] = useState<string | null>(null)
  const [feil, setFeil] = useState<string | null>(null)

  async function meldPaa(formData: FormData) {
    startTransition(async () => {
      setFeil(null)
      const res = await fetch('/api/pamelding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          arrangementId,
          klasse: formData.get('klasse') || undefined,
          merknader: formData.get('merknader') || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setFeil(data.feil ?? 'Noe gikk galt')
        return
      }

      setPameldingId(data.id)

      if (pris === 0) {
        setSteg('bekreftet')
      } else {
        setSteg('betaling')
      }
    })
  }

  async function betalMock() {
    if (!pameldingId) return
    startTransition(async () => {
      setFeil(null)
      const res = await fetch('/api/betaling/bekreft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pameldingId }),
      })

      if (res.ok) {
        setSteg('bekreftet')
      } else {
        const data = await res.json()
        setFeil(data.feil ?? 'Betaling mislyktes')
      }
    })
  }

  async function betalStripe() {
    if (!pameldingId) return
    startTransition(async () => {
      setFeil(null)
      const res = await fetch('/api/betaling/opprett-sesjon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pameldingId }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setFeil('Kunne ikke opprette betalingssesjon')
      }
    })
  }

  if (steg === 'bekreftet') {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-6 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h3 className="text-lg font-semibold text-green-400">Påmelding bekreftet!</h3>
        <p className="mt-2 text-sm text-green-400">
          Du er nå påmeldt. Sjekk meldingene dine for mer informasjon.
        </p>
      </div>
    )
  }

  if (steg === 'betaling') {
    return (
      <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4">
        <h3 className="font-semibold text-sporg-text">Betaling</h3>
        <p className="text-sm text-sporg-text-2">
          Påmeldingsavgift: <strong>{(pris / 100).toFixed(0)} NOK</strong>
        </p>

        {feil && <Alert type="error">{feil}</Alert>}

        {erMockModus ? (
          <div className="space-y-3">
            <Alert type="info">
              Testmodus: Klikk under for å simulere betaling uten ekte Stripe.
            </Alert>
            <Button onClick={betalMock} loading={isPending} className="w-full">
              Simuler betaling (testmodus)
            </Button>
          </div>
        ) : (
          <Button onClick={betalStripe} loading={isPending} className="w-full">
            Betal med kort via Stripe
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-sporg-border bg-sporg-surface-2 p-6 space-y-4">
      <h3 className="font-semibold text-sporg-text">Påmeldingsdetaljer</h3>

      {feil && <Alert type="error">{feil}</Alert>}

      <form action={meldPaa} className="space-y-4">
        <Input
          label="Klasse / Kategori"
          name="klasse"
          placeholder="F.eks. Menn 30-39, Senior, Open"
          hint="Valgfritt – spesifiser hvilken klasse du konkurrerer i"
        />
        <Textarea
          label="Merknader"
          name="merknader"
          rows={3}
          placeholder="Allergier, spesielle behov eller annen informasjon til arrangøren"
        />
        <Button type="submit" loading={isPending} className="w-full">
          {pris === 0 ? 'Meld deg på gratis' : `Meld deg på (${(pris / 100).toFixed(0)} NOK)`}
        </Button>
      </form>
    </div>
  )
}
