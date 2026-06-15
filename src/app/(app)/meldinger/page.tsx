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
        <div className="rounded-xl border border-dashed border-sporg-border bg-sporg-surface-2 p-16 text-center">
          <p className="text-sm text-sporg-text-3">Ingen meldinger ennå</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mottatte.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border p-5 ${
                m.lest ? 'border-sporg-border bg-sporg-surface-2' : 'border-sporg-accent/20 bg-sporg-accent/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {!m.lest && (
                    <span className="inline-block w-2 h-2 rounded-full bg-sporg-accent mb-2" />
                  )}
                  <h4 className="font-medium text-sporg-text">{m.melding.emne}</h4>
                  <p className="mt-1 text-sm text-sporg-text-2 whitespace-pre-wrap line-clamp-3">
                    {m.melding.innhold}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-sporg-text-3">
                    <span>Fra: {m.melding.avsender.navn}</span>
                    {m.melding.arrangement && (
                      <span>· {m.melding.arrangement.tittel}</span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-sporg-text-3">
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
