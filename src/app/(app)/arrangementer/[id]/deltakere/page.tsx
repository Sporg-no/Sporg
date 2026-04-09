import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { DeltakerTabell } from '@/components/deltakere/DeltakerTabell'
import type { PameldingMedDetaljer } from '@/types'

interface Props {
  params: { id: string }
}

export default async function DeltakereSide({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arr = await prisma.arrangement.findUnique({ where: { id: params.id } })
  if (!arr) notFound()

  const erOrganisator =
    arr.organisatorId === session.user.id || session.user.rolle === 'ADMIN'

  const pameldinjer = (await prisma.pamelding.findMany({
    where: { arrangementId: params.id },
    include: {
      bruker: { select: { id: true, navn: true, epost: true, telefon: true } },
      betaling: true,
      sjekkInn: true,
    },
    orderBy: { opprettetAt: 'asc' },
  })) as PameldingMedDetaljer[]

  const antallBekreftet = pameldinjer.filter((p) => p.status === 'BEKREFTET').length
  const antallSjekkInn = pameldinjer.filter((p) => p.sjekkInn).length

  return (
    <div>
      <PageHeader
        title="Deltakere"
        description={`${arr.tittel} · ${pameldinjer.length} påmeldte · ${antallBekreftet} bekreftet · ${antallSjekkInn} sjekket inn`}
      />
      <DeltakerTabell
        pameldinjer={pameldinjer}
        arrangementId={params.id}
        erOrganisator={erOrganisator}
      />
    </div>
  )
}
