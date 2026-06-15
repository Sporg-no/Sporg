import Link from 'next/link'
import { prisma } from '@/lib/prisma'

interface Props {
  params: { slug: string }
  searchParams: { pameldingId?: string }
}

export default async function BekreftelsesSide({ params, searchParams }: Props) {
  const pamelding = searchParams.pameldingId
    ? await prisma.pamelding.findUnique({
        where: { id: searchParams.pameldingId },
        include: { arrangement: { select: { tittel: true } } },
      })
    : null

  return (
    <div className="min-h-screen bg-sporg-bg text-sporg-text flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sporg-accent/10 text-sporg-accent">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-sporg-text mb-3">Påmelding bekreftet!</h1>
        {pamelding && (
          <p className="text-sporg-text-2 mb-6">
            Du er nå bekreftet påmeldt til{' '}
            <strong>{pamelding.arrangement.tittel}</strong>.
          </p>
        )}
        <p className="text-sm text-sporg-text-3 mb-8">
          Du vil motta meldinger fra arrangøren. Sjekk innboksen din for mer informasjon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/p/${params.slug}`}
            className="rounded-lg border border-sporg-border bg-sporg-surface-2 px-5 py-2.5 text-sm font-medium text-sporg-text-2 hover:bg-sporg-surface-3"
          >
            Tilbake til arrangementet
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-sporg-accent px-5 py-2.5 text-sm font-medium text-sporg-bg hover:bg-green-300 shadow-glow-sm"
          >
            Gå til min oversikt
          </Link>
        </div>
      </div>
    </div>
  )
}
