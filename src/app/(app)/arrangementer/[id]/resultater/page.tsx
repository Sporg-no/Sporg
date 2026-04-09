import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResultatTabell } from '@/components/resultater/ResultatTabell'
import { ResultatSkjema } from '@/components/resultater/ResultatSkjema'

interface Props {
  params: { id: string }
}

export default async function ResultaterSide({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arr = await prisma.arrangement.findUnique({
    where: { id: params.id },
    include: { resultaterFor: { orderBy: { plassering: 'asc' } } },
  })
  if (!arr) notFound()

  const erOrganisator =
    arr.organisatorId === session.user.id || session.user.rolle === 'ADMIN'

  return (
    <div>
      <PageHeader
        title="Resultater"
        description={`${arr.tittel} · ${arr.resultaterFor.length} resultater`}
      />

      <div className="space-y-6">
        {erOrganisator && <ResultatSkjema arrangementId={params.id} />}
        <ResultatTabell
          resultater={arr.resultaterFor}
          arrangementId={params.id}
          erOrganisator={erOrganisator}
        />
      </div>
    </div>
  )
}
