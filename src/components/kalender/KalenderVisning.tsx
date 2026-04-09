'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { Arrangement } from '@/types'

const DAGER = ['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø']
const MANEDER = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
]

interface KalenderVisningProps {
  arrangementer: Pick<Arrangement, 'id' | 'tittel' | 'startDato' | 'status' | 'sted'>[]
}

export function KalenderVisning({ arrangementer }: KalenderVisningProps) {
  const [dato, setDato] = useState(new Date())

  const ar = dato.getFullYear()
  const maaned = dato.getMonth()
  const forsteDag = new Date(ar, maaned, 1)
  const forsteDagUkedag = (forsteDag.getDay() + 6) % 7 // 0=Ma
  const dagerIMaaned = new Date(ar, maaned + 1, 0).getDate()

  const dagerListe = Array.from({ length: dagerIMaaned }, (_, i) => i + 1)
  const tomCeller = Array.from({ length: forsteDagUkedag })

  function arrForDag(dag: number) {
    return arrangementer.filter((a) => {
      const d = new Date(a.startDato)
      return d.getFullYear() === ar && d.getMonth() === maaned && d.getDate() === dag
    })
  }

  function forrigeMaaned() {
    setDato(new Date(ar, maaned - 1, 1))
  }

  function nesteMaaned() {
    setDato(new Date(ar, maaned + 1, 1))
  }

  const iDag = new Date()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={forrigeMaaned}>← Forrige</Button>
        <h2 className="text-lg font-semibold text-gray-900">
          {MANEDER[maaned]} {ar}
        </h2>
        <Button variant="outline" size="sm" onClick={nesteMaaned}>Neste →</Button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
        {DAGER.map((dag) => (
          <div key={dag} className="py-2">{dag}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-xl overflow-hidden">
        {tomCeller.map((_, i) => (
          <div key={`tom-${i}`} className="bg-gray-50 min-h-[80px]" />
        ))}
        {dagerListe.map((dag) => {
          const erIDag =
            iDag.getFullYear() === ar &&
            iDag.getMonth() === maaned &&
            iDag.getDate() === dag
          const arr = arrForDag(dag)

          return (
            <div
              key={dag}
              className={`bg-white min-h-[80px] p-1.5 ${erIDag ? 'ring-2 ring-indigo-400 ring-inset' : ''}`}
            >
              <div className={`text-xs font-medium mb-1 ${erIDag ? 'text-indigo-600' : 'text-gray-700'}`}>
                {dag}
              </div>
              {arr.map((a) => (
                <Link
                  key={a.id}
                  href={`/arrangementer/${a.id}`}
                  className="block truncate rounded px-1 py-0.5 text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 mb-0.5"
                  title={a.tittel}
                >
                  {a.tittel}
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
