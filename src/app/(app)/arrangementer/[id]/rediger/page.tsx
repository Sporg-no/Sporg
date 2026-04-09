import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { ArrangementSkjema } from '@/components/arrangementer/ArrangementSkjema'

interface Props {
  params: { id: string }
}

export default async function RedigerArrangementSide({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arr = await prisma.arrangement.findUnique({ where: { id: params.id } })
  if (!arr) notFound()

  if (session.user.rolle !== 'ADMIN' && arr.organisatorId !== session.user.id) {
    notFound()
  }

  return (
    <div>
      <PageHeader
        title="Rediger arrangement"
        description={arr.tittel}
      />
      <ArrangementSkjema arrangement={arr} />
    </div>
  )
}
