'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { formatDato, formatPris, kategorietikett } from '@/lib/utils'

const KATEGORIER = [
  { verdi: 'ALLE', etikett: 'Alle' },
  { verdi: 'LOPING', etikett: 'Løping' },
  { verdi: 'SYKLING', etikett: 'Sykling' },
  { verdi: 'SVOMMING', etikett: 'Svømming' },
  { verdi: 'TRIATHLON', etikett: 'Triathlon' },
  { verdi: 'SKIIDRETT', etikett: 'Skiidrett' },
  { verdi: 'LAGIDRETT', etikett: 'Lagidrett' },
  { verdi: 'KAMPSPORT', etikett: 'Kampsport' },
  { verdi: 'ANNET', etikett: 'Annet' },
]

interface Arrangement {
  id: string
  slug: string
  tittel: string
  beskrivelse: string
  sted: string
  startDato: string
  sluttDato: string
  pameldingsFrist: string | null
  maksAntall: number | null
  pris: number
  kategori: string
  organisatorNavn: string
  antallPameldt: number
}

interface Props {
  arrangementer: Arrangement[]
}

export function UtforskKlient({ arrangementer }: Props) {
  const [sok, setSok] = useState('')
  const [valgtKategori, setValgtKategori] = useState('ALLE')

  const filtrert = useMemo(() => {
    return arrangementer.filter((a) => {
      const sokMatch =
        !sok ||
        a.tittel.toLowerCase().includes(sok.toLowerCase()) ||
        a.sted.toLowerCase().includes(sok.toLowerCase()) ||
        a.organisatorNavn.toLowerCase().includes(sok.toLowerCase())

      const kategoriMatch = valgtKategori === 'ALLE' || a.kategori === valgtKategori

      return sokMatch && kategoriMatch
    })
  }, [arrangementer, sok, valgtKategori])

  const pameldingAapen = (a: Arrangement) =>
    !a.pameldingsFrist || new Date() < new Date(a.pameldingsFrist)
      ? !a.maksAntall || a.antallPameldt < a.maksAntall
      : false

  return (
    <div className="space-y-6">
      {/* Søk og filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sporg-text-3"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Søk etter tittel, sted eller arrangør..."
            value={sok}
            onChange={(e) => setSok(e.target.value)}
            className="w-full rounded-xl border border-sporg-border bg-sporg-surface-2 py-2.5 pl-10 pr-4 text-sm text-sporg-text placeholder:text-sporg-text-3 focus:border-sporg-accent/50 focus:outline-none focus:ring-2 focus:ring-sporg-accent/20"
          />
        </div>
        <span className="text-sm text-sporg-text-3 sm:whitespace-nowrap">
          {filtrert.length} treff
        </span>
      </div>

      {/* Kategorifiltere */}
      <div className="flex flex-wrap gap-2">
        {KATEGORIER.map((k) => (
          <button
            key={k.verdi}
            onClick={() => setValgtKategori(k.verdi)}
            className={[
              'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150',
              valgtKategori === k.verdi
                ? 'border-sporg-accent/40 bg-sporg-accent/15 text-sporg-accent'
                : 'border-sporg-border bg-sporg-surface-2 text-sporg-text-3 hover:border-sporg-accent/20 hover:text-sporg-text-2',
            ].join(' ')}
          >
            {k.etikett}
          </button>
        ))}
      </div>

      {/* Resultater */}
      {filtrert.length === 0 ? (
        <div className="rounded-2xl border border-sporg-border bg-sporg-surface-2 py-20 text-center">
          <p className="text-sporg-text-3">Ingen arrangementer matchet søket ditt</p>
          <button
            onClick={() => { setSok(''); setValgtKategori('ALLE') }}
            className="mt-3 text-sm text-sporg-accent hover:underline"
          >
            Nullstill filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrert.map((a) => {
            const aapen = pameldingAapen(a)
            const plasserIgjen = a.maksAntall ? a.maksAntall - a.antallPameldt : null

            return (
              <Link
                key={a.id}
                href={`/p/${a.slug}`}
                className="group flex flex-col rounded-2xl border border-sporg-border bg-sporg-surface-2 p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-sporg-accent/20 hover:shadow-elevated"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full border border-sporg-accent/20 bg-sporg-accent/10 px-2.5 py-0.5 text-xs font-medium text-sporg-accent">
                    {kategorietikett(a.kategori)}
                  </span>
                  <span className="text-xs font-semibold text-sporg-text-2">
                    {formatPris(a.pris)}
                  </span>
                </div>

                <h2 className="mb-1 font-semibold text-sporg-text group-hover:text-sporg-accent transition-colors line-clamp-2">
                  {a.tittel}
                </h2>
                <p className="mb-4 text-xs text-sporg-text-3 line-clamp-2 leading-relaxed flex-1">
                  {a.beskrivelse}
                </p>

                <div className="space-y-1.5 text-xs text-sporg-text-3">
                  <div className="flex items-center gap-1.5">
                    <span>📅</span>
                    <span>{formatDato(a.startDato)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{a.sted}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>👥</span>
                    <span>
                      {a.antallPameldt} påmeldt
                      {a.maksAntall ? ` av ${a.maksAntall}` : ''}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-sporg-border flex items-center justify-between">
                  <span className="text-xs text-sporg-text-3">av {a.organisatorNavn}</span>
                  {aapen ? (
                    <span className="text-xs font-medium text-sporg-accent">Påmelding åpen →</span>
                  ) : (
                    <span className="text-xs text-sporg-text-3">
                      {plasserIgjen === 0 ? 'Fullt' : 'Stengt'}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
