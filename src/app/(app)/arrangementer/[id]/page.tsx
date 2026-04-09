import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge, statusTilFarge } from '@/components/ui/Badge'
import { Card, CardBody } from '@/components/ui/Card'
import { formatDatoTid, formatPris, kategorietikett, statusEtikett } from '@/lib/utils'
import { publiserArrangement, slettArrangement } from '@/actions/arrangement'

interface Props {
  params: { id: string }
}

export default async function ArrangementDetaljerSide({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arr = await prisma.arrangement.findUnique({
    where: { id: params.id },
    include: {
      organisator: { select: { id: true, navn: true, epost: true } },
      _count: {
        select: { pameldingerFor: true, frivilligePameldingerFor: true },
      },
    },
  })

  if (!arr) notFound()

  const erOrganisator = arr.organisatorId === session.user.id || session.user.rolle === 'ADMIN'

  const faner = [
    { href: `/arrangementer/${arr.id}/deltakere`, label: '👥 Deltakere', antall: arr._count.pameldingerFor },
    { href: `/arrangementer/${arr.id}/tidsplan`, label: '📅 Tidsplan' },
    { href: `/arrangementer/${arr.id}/resultater`, label: '🏅 Resultater' },
    { href: `/arrangementer/${arr.id}/frivillige`, label: '🙋 Frivillige', antall: arr._count.frivilligePameldingerFor },
    { href: `/arrangementer/${arr.id}/kommunikasjon`, label: '📬 Kommunikasjon' },
  ]

  return (
    <div>
      <PageHeader
        title={arr.tittel}
        actions={
          erOrganisator ? (
            <div className="flex items-center gap-2">
              <Link href={`/arrangementer/${arr.id}/rediger`}>
                <Button variant="outline" size="sm">Rediger</Button>
              </Link>
              <form action={async () => { await publiserArrangement(arr.id) }}>
                <Button
                  type="submit"
                  variant={arr.status === 'PUBLISERT' ? 'secondary' : 'primary'}
                  size="sm"
                >
                  {arr.status === 'PUBLISERT' ? 'Avpubliser' : 'Publiser'}
                </Button>
              </form>
              {arr.status === 'UTKAST' && (
                <form action={async () => { await slettArrangement(arr.id) }}>
                  <Button type="submit" variant="danger" size="sm">Slett</Button>
                </form>
              )}
            </div>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={statusTilFarge(arr.status)}>{statusEtikett(arr.status)}</Badge>
                <span className="text-sm text-gray-500">{kategorietikett(arr.kategori)}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{arr.beskrivelse}</p>
            </CardBody>
          </Card>

          {/* Navigasjonsfaner */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {faner.map((fane) => (
                <Link
                  key={fane.href}
                  href={fane.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-300"
                >
                  {fane.label}
                  {fane.antall !== undefined && (
                    <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-700">
                      {fane.antall}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardBody className="space-y-3">
              <h3 className="font-semibold text-gray-900">Detaljer</h3>

              <div>
                <p className="text-xs text-gray-500 mb-0.5">Dato</p>
                <p className="text-sm font-medium">{formatDatoTid(arr.startDato)}</p>
                <p className="text-xs text-gray-400">til {formatDatoTid(arr.sluttDato)}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-0.5">Sted</p>
                <p className="text-sm font-medium">{arr.sted}</p>
                {arr.adresse && <p className="text-xs text-gray-400">{arr.adresse}</p>}
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-0.5">Påmeldingsavgift</p>
                <p className="text-sm font-medium">{formatPris(arr.pris)}</p>
              </div>

              {arr.maksAntall && (
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Kapasitet</p>
                  <p className="text-sm font-medium">
                    {arr._count.pameldingerFor} / {arr.maksAntall} plasser
                  </p>
                </div>
              )}

              {arr.pameldingsFrist && (
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Påmeldingsfrist</p>
                  <p className="text-sm font-medium">{formatDatoTid(arr.pameldingsFrist)}</p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500 mb-0.5">Organisator</p>
                <p className="text-sm font-medium">{arr.organisator.navn}</p>
              </div>

              {arr.status === 'PUBLISERT' && (
                <Link
                  href={`/p/${arr.slug}`}
                  target="_blank"
                  className="block text-center rounded-lg border border-indigo-200 bg-indigo-50 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                >
                  Se offentlig side ↗
                </Link>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
