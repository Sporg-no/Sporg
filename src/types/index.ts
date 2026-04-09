import type {
  Arrangement,
  Bruker,
  Pamelding,
  Betaling,
  SjekkInn,
  Resultat,
  FrivilligPamelding,
  Melding,
  MeldingMottaker,
  Sesjon,
} from '@prisma/client'

export type {
  Arrangement,
  Bruker,
  Pamelding,
  Betaling,
  SjekkInn,
  Resultat,
  FrivilligPamelding,
  Melding,
  MeldingMottaker,
  Sesjon,
}

export type ArrangementMedOrganisator = Arrangement & {
  organisator: Pick<Bruker, 'id' | 'navn' | 'epost'>
  _count: {
    pameldingerFor: number
    frivilligePameldingerFor: number
  }
}

export type PameldingMedDetaljer = Pamelding & {
  bruker: Pick<Bruker, 'id' | 'navn' | 'epost' | 'telefon'>
  betaling: Betaling | null
  sjekkInn: SjekkInn | null
}

export type ResultatMedArrangement = Resultat & {
  arrangement: Pick<Arrangement, 'id' | 'tittel' | 'slug'>
}

export type FrivilligMedBruker = FrivilligPamelding & {
  bruker: Pick<Bruker, 'id' | 'navn' | 'epost' | 'telefon'>
}

export type MeldingMedDetaljer = Melding & {
  avsender: Pick<Bruker, 'id' | 'navn' | 'epost'>
  mottakere: (MeldingMottaker & {
    bruker: Pick<Bruker, 'id' | 'navn' | 'epost'>
  })[]
  arrangement: Pick<Arrangement, 'id' | 'tittel' | 'slug'> | null
}

export type ServerActionResult<T = void> =
  | { success: true; data?: T; melding?: string }
  | { success: false; feil: string }
