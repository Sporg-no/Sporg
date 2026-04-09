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
      const data = await res.json()
      setFeil(data.feil ?? 'Noe gikk galt')
      setIsPending(false)
      return
    }

    // Auto-logg inn
    await signIn('credentials', {
      epost: formData.get('epost'),
      passord: formData.get('passord'),
      redirect: false,
    })

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <span className="text-lg font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sporg</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Opprett konto</h1>
          <p className="mt-2 text-sm text-gray-500">Gratis å komme i gang.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {feil && <Alert type="error" className="mb-4">{feil}</Alert>}

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
            <Button type="submit" loading={isPending} className="w-full">
              Opprett konto
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Har du allerede konto?{' '}
          <Link href="/logg-inn" className="font-medium text-indigo-600 hover:text-indigo-500">
            Logg inn
          </Link>
        </p>
      </div>
    </div>
  )
}
