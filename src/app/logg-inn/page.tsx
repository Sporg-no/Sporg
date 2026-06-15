'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

export default function LoggInnSide() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  const [isPending, setIsPending] = useState(false)
  const [feil, setFeil] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFeil(null)
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      epost: formData.get('epost'),
      passord: formData.get('passord'),
      redirect: false,
    })

    setIsPending(false)

    if (res?.error) {
      setFeil('Ugyldig e-post eller passord')
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
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
            Logg inn
          </h1>
          <p className="mt-2 text-sm text-sporg-text-2">Hei igjen! Logg inn på kontoen din.</p>
        </div>

        {/* Skjema */}
        <div className="rounded-2xl border border-sporg-border bg-sporg-surface-2 p-7 shadow-elevated">
          {feil && <Alert type="error" className="mb-5">{feil}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="current-password"
              placeholder="••••••••"
            />
            <Button type="submit" loading={isPending} size="lg" className="w-full mt-2">
              Logg inn
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-sporg-text-3">
          Har du ikke konto?{' '}
          <Link href="/registrer-bruker" className="font-semibold text-sporg-accent hover:text-green-300 transition-colors">
            Registrer deg gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
