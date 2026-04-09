'use client'

import { useTransition } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { publiserResultat, slettResultat } from '@/actions/resultat'
import type { Resultat } from '@/types'

interface ResultatTabellProps {
  resultater: Resultat[]
  arrangementId: string
  erOrganisator: boolean
}

export function ResultatTabell({ resultater, arrangementId, erOrganisator }: ResultatTabellProps) {
  const [isPending, startTransition] = useTransition()

  function handlePubliser(resultatId: string) {
    startTransition(() => { void publiserResultat(resultatId, arrangementId) })
  }

  function handleSlett(resultatId: string) {
    if (!confirm('Er du sikker på at du vil slette dette resultatet?')) return
    startTransition(() => { void slettResultat(resultatId, arrangementId) })
  }

  const sortert = [...resultater].sort((a, b) => {
    if (a.plassering && b.plassering) return a.plassering - b.plassering
    if (a.plassering) return -1
    if (b.plassering) return 1
    return 0
  })

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Pl.</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">#</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Navn</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Klasse</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Tid</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Poeng</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Status</th>
            {erOrganisator && (
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Handlinger</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {sortert.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500">
                Ingen resultater registrert ennå
              </td>
            </tr>
          )}
          {sortert.map((res) => (
            <tr key={res.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-bold text-gray-900">
                {res.plassering ? (
                  <span className={res.plassering <= 3 ? 'text-indigo-600' : ''}>
                    {res.plassering}.
                  </span>
                ) : '–'}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-500">{res.startnummer ?? '–'}</td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{res.deltakerNavn}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{res.klasse ?? '–'}</td>
              <td className="px-4 py-3 text-sm font-mono text-gray-900">{res.tid ?? '–'}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{res.poeng ?? '–'}</td>
              <td className="px-4 py-3">
                <Badge variant={res.publisert ? 'green' : 'gray'}>
                  {res.publisert ? 'Publisert' : 'Skjult'}
                </Badge>
              </td>
              {erOrganisator && (
                <td className="px-4 py-3 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    loading={isPending}
                    onClick={() => handlePubliser(res.id)}
                  >
                    {res.publisert ? 'Skjul' : 'Publiser'}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    loading={isPending}
                    onClick={() => handleSlett(res.id)}
                  >
                    Slett
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
