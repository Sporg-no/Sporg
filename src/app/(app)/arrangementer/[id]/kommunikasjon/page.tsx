import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { SendMelding } from '@/components/kommunikasjon/SendMelding'
import { MeldingListe } from '@/components/kommunikasjon/MeldingListe'
import type { MeldingMedDetaljer } from '@/types'

interface Props {
  params: { id: string }
}

export default async function KommunikasjonSide({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arr = await prisma.arrangement.findUnique({ where: { id: params.id } })
  if (!arr) notFound()

  const erOrganisator =
    arr.organisatorId === session.user.id || session.user.rolle === 'ADMIN'

  if (!erOrganisator) notFound()

  const meldinger = (await prisma.melding.findMany({
    where: { arrangementId: params.id },
    include: {
      avsender: { select: { id: true, navn: true, epost: true } },
      mottakere: {
        include: { bruker: { select: { id: true, navn: true, epost: true } } },
      },
      arrangement: { select: { id: true, tittel: true, slug: true } },
    },
    orderBy: { sendtAt: 'desc' },
  })) as MeldingMedDetaljer[]

  return (
    <div>
      <PageHeader
        title="Kommunikasjon"
        description={`${arr.tittel} · ${meldinger.length} meldinger sendt`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <SendMelding arrangementId={params.id} />
        </div>
        <div>
          <h3 className="font-semibold text-sporg-text mb-4">Sendte meldinger</h3>
          <MeldingListe meldinger={meldinger} />
        </div>
      </div>
    </div>
  )
}
