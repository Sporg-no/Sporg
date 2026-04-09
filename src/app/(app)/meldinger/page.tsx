import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/layout/PageHeader'
import { formatDatoTid } from '@/lib/utils'

export default async function MeldingerSide() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const mottatte = await prisma.meldingMottaker.findMany({
    where: { brukerId: session.user.id },
    include: {
      melding: {
        include: {
          avsender: { select: { id: true, navn: true } },
          arrangement: { select: { id: true, tittel: true, slug: true } },
        },
      },
    },
    orderBy: { melding: { sendtAt: 'desc' } },
  })

  // Merk alle som lest
  await prisma.meldingMottaker.updateMany({
    where: { brukerId: session.user.id, lest: false },
    data: { lest: true, lestAt: new Date() },
  })

  return (
    <div>
      <PageHeader
        title="Meldinger"
        description={`${mottatte.length} melding(er) totalt`}
      />

      {mottatte.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-16 text-center">
          <p className="text-sm text-gray-500">Ingen meldinger ennå</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mottatte.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border p-5 ${
                m.lest ? 'border-gray-200 bg-white' : 'border-indigo-200 bg-indigo-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {!m.lest && (
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mb-2" />
                  )}
                  <h4 className="font-medium text-gray-900">{m.melding.emne}</h4>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">
                    {m.melding.innhold}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                    <span>Fra: {m.melding.avsender.navn}</span>
                    {m.melding.arrangement && (
                      <span>· {m.melding.arrangement.tittel}</span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-400">
                  {formatDatoTid(m.melding.sendtAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
