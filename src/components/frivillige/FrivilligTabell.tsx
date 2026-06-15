'use client'

import { useTransition } from 'react'
import { Badge, statusTilFarge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { oppdaterFrivilligStatus } from '@/actions/frivillig'
import { statusEtikett } from '@/lib/utils'
import type { FrivilligMedBruker } from '@/types'

interface FrivilligTabellProps {
  frivillige: FrivilligMedBruker[]
  arrangementId: string
  erOrganisator: boolean
}

export function FrivilligTabell({ frivillige, arrangementId, erOrganisator }: FrivilligTabellProps) {
  const [isPending, startTransition] = useTransition()

  function handleOppdater(id: string, status: 'SOKT' | 'GODKJENT' | 'AVVIST') {
    startTransition(() => { void oppdaterFrivilligStatus(id, arrangementId, status) })
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-sporg-border">
      <table className="min-w-full divide-y divide-sporg-border">
        <thead className="bg-sporg-surface">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Navn</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">E-post</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Rolle</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Merknader</th>
            {erOrganisator && (
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-sporg-text-3">Handlinger</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-sporg-border bg-sporg-surface-2">
          {frivillige.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-sporg-text-3">
                Ingen frivillige søknader ennå
              </td>
            </tr>
          )}
          {frivillige.map((f) => (
            <tr key={f.id} className="hover:bg-sporg-surface-3">
              <td className="px-4 py-3 text-sm font-medium text-sporg-text">{f.bruker.navn}</td>
              <td className="px-4 py-3 text-sm text-sporg-text-3">{f.bruker.epost}</td>
              <td className="px-4 py-3 text-sm text-sporg-text-2">{f.rolle ?? '–'}</td>
              <td className="px-4 py-3">
                <Badge variant={statusTilFarge(f.status)}>
                  {statusEtikett(f.status)}
                </Badge>
              </td>
              <td className="px-4 py-3 text-sm text-sporg-text-2">{f.merknader ?? '–'}</td>
              {erOrganisator && (
                <td className="px-4 py-3 flex items-center gap-2">
                  {f.status !== 'GODKJENT' && (
                    <Button
                      size="sm"
                      variant="primary"
                      loading={isPending}
                      onClick={() => handleOppdater(f.id, 'GODKJENT')}
                    >
                      Godkjenn
                    </Button>
                  )}
                  {f.status !== 'AVVIST' && (
                    <Button
                      size="sm"
                      variant="danger"
                      loading={isPending}
                      onClick={() => handleOppdater(f.id, 'AVVIST')}
                    >
                      Avvis
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
