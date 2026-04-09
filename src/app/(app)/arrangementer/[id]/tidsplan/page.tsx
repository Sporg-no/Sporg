import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { SesjonListe } from '@/components/tidsplan/SesjonListe'
import { SesjonSkjema } from '@/components/tidsplan/SesjonSkjema'

interface Props {
  params: { id: string }
}

export default async function TidsplanSide({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arr = await prisma.arrangement.findUnique({
    where: { id: params.id },
    include: { sesjoner: { orderBy: { startTid: 'asc' } } },
  })
  if (!arr) notFound()

  const erOrganisator =
    arr.organisatorId === session.user.id || session.user.rolle === 'ADMIN'

  return (
    <div>
      <PageHeader
        title="Tidsplan"
        description={`${arr.tittel} · ${arr.sesjoner.length} sesjoner`}
      />

      <div className="space-y-6">
        {erOrganisator && <SesjonSkjema arrangementId={params.id} />}
        <SesjonListe
          sesjoner={arr.sesjoner}
          arrangementId={params.id}
          erOrganisator={erOrganisator}
        />
      </div>
    </div>
  )
}
