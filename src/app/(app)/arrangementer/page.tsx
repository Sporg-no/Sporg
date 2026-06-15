import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { ArrangementKort } from '@/components/arrangementer/ArrangementKort'
import type { ArrangementMedOrganisator } from '@/types'

export default async function ArrangementerSide() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arrangementer = (await prisma.arrangement.findMany({
    where:
      session.user.rolle === 'ADMIN'
        ? {}
        : { organisatorId: session.user.id },
    include: {
      organisator: { select: { id: true, navn: true, epost: true } },
      _count: { select: { pameldingerFor: true, frivilligePameldingerFor: true } },
    },
    orderBy: { startDato: 'asc' },
  })) as ArrangementMedOrganisator[]

  return (
    <div>
      <PageHeader
        title="Arrangementer"
        description={`${arrangementer.length} arrangement(er) totalt`}
        actions={
          <Link href="/arrangementer/ny">
            <Button>+ Nytt arrangement</Button>
          </Link>
        }
      />

      {arrangementer.length === 0 ? (
        <div className="rounded-xl border border-dashed border-sporg-border bg-sporg-surface-2 p-16 text-center">
          <h3 className="font-semibold text-sporg-text mb-2">Ingen arrangementer ennå</h3>
          <p className="text-sm text-sporg-text-3 mb-6">
            Kom i gang ved å opprette ditt første arrangement.
          </p>
          <Link href="/arrangementer/ny">
            <Button>Opprett arrangement</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {arrangementer.map((arr) => (
            <ArrangementKort
              key={arr.id}
              arrangement={arr}
              visOrganisator={session.user.rolle === 'ADMIN'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
