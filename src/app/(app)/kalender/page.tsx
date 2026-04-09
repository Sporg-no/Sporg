import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { KalenderVisning } from '@/components/kalender/KalenderVisning'

export default async function KalenderSide() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  // Vis alle arrangementer brukeren er involvert i
  const arrangementer = await prisma.arrangement.findMany({
    where: {
      OR: [
        { organisatorId: session.user.id },
        { pameldingerFor: { some: { brukerId: session.user.id } } },
        { status: 'PUBLISERT' },
      ],
    },
    select: {
      id: true,
      tittel: true,
      startDato: true,
      status: true,
      sted: true,
    },
    orderBy: { startDato: 'asc' },
  })

  return (
    <div>
      <PageHeader
        title="Kalender"
        description="Oversikt over alle arrangementer"
      />
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <KalenderVisning arrangementer={arrangementer} />
      </div>
    </div>
  )
}
