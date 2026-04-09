import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PameldingSkjema } from '@/components/pamelding/PameldingSkjema'
import { formatDatoTid, formatPris } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export default async function PameldingSide({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/logg-inn?callbackUrl=/p/${params.slug}/pamelding`)
  }

  const arr = await prisma.arrangement.findUnique({
    where: { slug: params.slug },
    include: { _count: { select: { pameldingerFor: true } } },
  })

  if (!arr || arr.status !== 'PUBLISERT') notFound()

  const erPameldt = await prisma.pamelding.findUnique({
    where: { arrangementId_brukerId: { arrangementId: arr.id, brukerId: session.user.id } },
  })

  const pameldingAapen =
    (!arr.pameldingsFrist || new Date() < arr.pameldingsFrist) &&
    (!arr.maksAntall || arr._count.pameldingerFor < arr.maksAntall)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link href={`/p/${params.slug}`} className="text-sm text-gray-600 hover:text-gray-900">
            ← Tilbake til {arr.tittel}
          </Link>
          <Link href="/" className="font-bold text-indigo-600">Sporg</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{arr.tittel}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <span>📅 {formatDatoTid(arr.startDato)}</span>
            <span>📍 {arr.sted}</span>
            <span className="font-medium text-gray-900">{formatPris(arr.pris)}</span>
          </div>
        </div>

        {erPameldt ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-lg font-semibold text-green-800">Du er allerede påmeldt!</h2>
            <p className="mt-2 text-sm text-green-700">
              Sjekk <Link href="/meldinger" className="underline">meldingene dine</Link> for mer informasjon.
            </p>
            <Link
              href={`/p/${params.slug}`}
              className="mt-4 inline-block text-sm text-green-700 hover:underline"
            >
              ← Tilbake til arrangementet
            </Link>
          </div>
        ) : !pameldingAapen ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="font-semibold text-gray-900">Påmelding er stengt</h2>
            <p className="mt-2 text-sm text-gray-500">
              {arr.pameldingsFrist && new Date() > arr.pameldingsFrist
                ? 'Påmeldingsfristen er utløpt.'
                : 'Arrangementet er fullt.'}
            </p>
          </div>
        ) : (
          <PameldingSkjema
            arrangementId={arr.id}
            pris={arr.pris}
            slug={params.slug}
          />
        )}
      </div>
    </div>
  )
}
