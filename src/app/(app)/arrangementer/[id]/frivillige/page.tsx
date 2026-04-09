import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { FrivilligTabell } from '@/components/frivillige/FrivilligTabell'
import type { FrivilligMedBruker } from '@/types'

interface Props {
  params: { id: string }
}

export default async function FrivilligeSide({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const arr = await prisma.arrangement.findUnique({ where: { id: params.id } })
  if (!arr) notFound()

  const erOrganisator =
    arr.organisatorId === session.user.id || session.user.rolle === 'ADMIN'

  const frivillige = (await prisma.frivilligPamelding.findMany({
    where: { arrangementId: params.id },
    include: {
      bruker: { select: { id: true, navn: true, epost: true, telefon: true } },
    },
    orderBy: { opprettetAt: 'asc' },
  })) as FrivilligMedBruker[]

  const antallGodkjent = frivillige.filter((f) => f.status === 'GODKJENT').length

  return (
    <div>
      <PageHeader
        title="Frivillige"
        description={`${arr.tittel} · ${frivillige.length} søknader · ${antallGodkjent} godkjent`}
      />
      <FrivilligTabell
        frivillige={frivillige}
        arrangementId={params.id}
        erOrganisator={erOrganisator}
      />
    </div>
  )
}
