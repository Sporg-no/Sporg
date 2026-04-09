import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDato(dato: Date | string): string {
  const d = typeof dato === 'string' ? new Date(dato) : dato
  return new Intl.DateTimeFormat('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function formatDatoTid(dato: Date | string): string {
  const d = typeof dato === 'string' ? new Date(dato) : dato
  return new Intl.DateTimeFormat('nb-NO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function formatPris(oere: number): string {
  if (oere === 0) return 'Gratis'
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  }).format(oere / 100)
}

export function genererSlug(tittel: string): string {
  const base = tittel
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base}-${suffix}`
}

export function kategorietikett(kategori: string): string {
  const map: Record<string, string> = {
    LOPING: 'Løping',
    SYKLING: 'Sykling',
    SVOMMING: 'Svømming',
    TRIATHLON: 'Triathlon',
    SKIIDRETT: 'Skiidrett',
    LAGIDRETT: 'Lagidrett',
    KAMPSPORT: 'Kampsport',
    ANNET: 'Annet',
  }
  return map[kategori] ?? kategori
}

export function statusEtikett(status: string): string {
  const map: Record<string, string> = {
    UTKAST: 'Utkast',
    PUBLISERT: 'Publisert',
    AVLYST: 'Avlyst',
    AVSLUTTET: 'Avsluttet',
    VENTENDE: 'Ventende',
    BEKREFTET: 'Bekreftet',
    VENTELISTE: 'Venteliste',
    AVBESTILT: 'Avbestilt',
    AVVIST: 'Avvist',
    FULLFORT: 'Fullført',
    FEILET: 'Feilet',
    REFUNDERT: 'Refundert',
    SOKT: 'Søkt',
    GODKJENT: 'Godkjent',
  }
  return map[status] ?? status
}
