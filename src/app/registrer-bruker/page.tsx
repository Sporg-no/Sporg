'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

export default function RegistrerBrukerSide() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [feil, setFeil] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFeil(null)
    setIsPending(true)

    const formData = new FormData(e.currentTarget)

    if (formData.get('passord') !== formData.get('passordBekreft')) {
      setFeil('Passordene stemmer ikke overens')
      setIsPending(false)
      return
    }

    const res = await fetch('/api/brukere', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        navn: formData.get('navn'),
        epost: formData.get('epost'),
        passord: formData.get('passord'),
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      setFeil(data?.feil ?? 'Noe gikk galt. Prøv igjen senere.')
      setIsPending(false)
      return
    }

    await signIn('credentials', {
      epost: formData.get('epost'),
      passord: formData.get('passord'),
      redirect: false,
    })

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(74,222,128,0.12) 0%, transparent 65%), ' +
          '#09090b',
      }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-6 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sporg-accent shadow-glow-sm">
              <svg className="h-5 w-5 text-sporg-bg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-sporg-text">Sporg</span>
          </Link>
          <h1 className="text-2xl font-bold text-sporg-text" style={{ letterSpacing: '-0.025em' }}>
            Opprett konto
          </h1>
          <p className="mt-2 text-sm text-sporg-text-2">Gratis å komme i gang.</p>
        </div>

        {/* Skjema */}
        <div className="rounded-2xl border border-sporg-border bg-sporg-surface-2 p-7 shadow-elevated">
          {feil && <Alert type="error" className="mb-5">{feil}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Fullt navn"
              name="navn"
              type="text"
              required
              autoComplete="name"
              placeholder="Fornavn Etternavn"
            />
            <Input
              label="E-postadresse"
              name="epost"
              type="email"
              required
              autoComplete="email"
              placeholder="din@epost.no"
            />
            <Input
              label="Passord"
              name="passord"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Minst 8 tegn"
              minLength={8}
            />
            <Input
              label="Bekreft passord"
              name="passordBekreft"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Gjenta passord"
            />
            <Button type="submit" loading={isPending} size="lg" className="w-full mt-2">
              Opprett konto
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-sporg-text-3">
          Har du allerede konto?{' '}
          <Link href="/logg-inn" className="font-semibold text-sporg-accent hover:text-green-300 transition-colors">
            Logg inn
          </Link>
        </p>
      </div>
    </div>
  )
}
