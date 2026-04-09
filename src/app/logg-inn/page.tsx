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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <span className="text-lg font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sporg</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Logg inn</h1>
          <p className="mt-2 text-sm text-gray-500">Hei igjen! Logg inn på kontoen din.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {feil && <Alert type="error" className="mb-4">{feil}</Alert>}

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
            <Button type="submit" loading={isPending} className="w-full">
              Logg inn
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Har du ikke konto?{' '}
          <Link href="/registrer-bruker" className="font-medium text-indigo-600 hover:text-indigo-500">
            Registrer deg
          </Link>
        </p>
      </div>
    </div>
  )
}
