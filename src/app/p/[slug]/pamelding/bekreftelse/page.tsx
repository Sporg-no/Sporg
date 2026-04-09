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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Påmelding bekreftet!</h1>
        {pamelding && (
          <p className="text-gray-600 mb-6">
            Du er nå bekreftet påmeldt til{' '}
            <strong>{pamelding.arrangement.tittel}</strong>.
          </p>
        )}
        <p className="text-sm text-gray-500 mb-8">
          Du vil motta meldinger fra arrangøren. Sjekk innboksen din for mer informasjon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/p/${params.slug}`}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Tilbake til arrangementet
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Gå til min oversikt
          </Link>
        </div>
      </div>
    </div>
  )
}
