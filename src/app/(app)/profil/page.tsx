import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDato } from '@/lib/utils'

const rolleEtikett: Record<string, string> = {
  ADMIN: 'Administrator',
  ORGANISATOR: 'Organisator',
  DELTAKER: 'Deltaker',
}

export default async function ProfilSide() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const bruker = await prisma.bruker.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: {
          arrangementerOrganisert: true,
          pameldingerSom: true,
          frivilligePameldingerSom: true,
        },
      },
    },
  })

  if (!bruker) return null

  return (
    <div>
      <PageHeader title="Min profil" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
                {bruker.navn.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{bruker.navn}</h2>
                <p className="text-sm text-gray-500">{bruker.epost}</p>
              </div>
              <Badge variant="indigo" className="ml-auto">
                {rolleEtikett[bruker.rolle] ?? bruker.rolle}
              </Badge>
            </div>

            <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">E-postadresse</p>
                <p className="text-sm font-medium">{bruker.epost}</p>
              </div>
              {bruker.telefon && (
                <div>
                  <p className="text-xs text-gray-500">Telefon</p>
                  <p className="text-sm font-medium">{bruker.telefon}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">Medlem siden</p>
                <p className="text-sm font-medium">{formatDato(bruker.opprettetAt)}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <h3 className="font-semibold text-gray-900">Aktivitetsoversikt</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Arrangementer organisert</span>
                <span className="font-bold text-gray-900">{bruker._count.arrangementerOrganisert}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Påmeldinger</span>
                <span className="font-bold text-gray-900">{bruker._count.pameldingerSom}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Frivillig-søknader</span>
                <span className="font-bold text-gray-900">{bruker._count.frivilligePameldingerSom}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
