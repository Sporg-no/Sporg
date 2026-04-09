import { z } from 'zod'

export const ArrangementSkjemaSchema = z.object({
  tittel: z.string().min(3, 'Tittel må ha minst 3 tegn'),
  beskrivelse: z.string().min(10, 'Beskrivelse må ha minst 10 tegn'),
  sted: z.string().min(2, 'Sted er påkrevd'),
  adresse: z.string().optional(),
  startDato: z.string().min(1, 'Startdato er påkrevd'),
  sluttDato: z.string().min(1, 'Sluttdato er påkrevd'),
  pameldingsFrist: z.string().optional(),
  maksAntall: z.coerce.number().int().positive().optional().nullable(),
  pris: z.coerce.number().int().min(0).default(0),
  kategori: z.enum(['LOPING', 'SYKLING', 'SVOMMING', 'TRIATHLON', 'SKIIDRETT', 'LAGIDRETT', 'KAMPSPORT', 'ANNET']),
})

export type ArrangementSkjemaData = z.infer<typeof ArrangementSkjemaSchema>

export const PameldingSkjemaSchema = z.object({
  arrangementId: z.string().cuid(),
  klasse: z.string().optional(),
  merknader: z.string().max(500).optional(),
})

export type PameldingSkjemaData = z.infer<typeof PameldingSkjemaSchema>

export const ResultatSkjemaSchema = z.object({
  arrangementId: z.string().cuid(),
  deltakerNavn: z.string().min(2, 'Navn er påkrevd'),
  startnummer: z.coerce.number().int().positive().optional().nullable(),
  klasse: z.string().optional(),
  plassering: z.coerce.number().int().positive().optional().nullable(),
  tid: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}(\.\d+)?$/, 'Ugyldig format (HH:MM:SS)')
    .optional()
    .or(z.literal('')),
  poeng: z.coerce.number().optional().nullable(),
  merknad: z.string().optional(),
})

export type ResultatSkjemaData = z.infer<typeof ResultatSkjemaSchema>

export const FrivilligSkjemaSchema = z.object({
  arrangementId: z.string().cuid(),
  rolle: z.string().optional(),
  merknader: z.string().max(500).optional(),
})

export type FrivilligSkjemaData = z.infer<typeof FrivilligSkjemaSchema>

export const SesjonSkjemaSchema = z.object({
  arrangementId: z.string().cuid(),
  tittel: z.string().min(2, 'Tittel er påkrevd'),
  beskrivelse: z.string().optional(),
  startTid: z.string().min(1, 'Starttid er påkrevd'),
  sluttTid: z.string().min(1, 'Sluttid er påkrevd'),
  sted: z.string().optional(),
  type: z.enum(['AKTIVITET', 'SEREMONI', 'PAUSE', 'ANNET']).default('AKTIVITET'),
})

export type SesjonSkjemaData = z.infer<typeof SesjonSkjemaSchema>

export const MeldingSkjemaSchema = z.object({
  arrangementId: z.string().cuid(),
  emne: z.string().min(2, 'Emne er påkrevd'),
  innhold: z.string().min(5, 'Innhold er påkrevd'),
  type: z.enum(['DIREKTE', 'ALLE_DELTAKERE', 'ALLE_FRIVILLIGE', 'KUNNGJORING']).default('ALLE_DELTAKERE'),
})

export type MeldingSkjemaData = z.infer<typeof MeldingSkjemaSchema>

export const RegistrerBrukerSchema = z.object({
  navn: z.string().min(2, 'Navn må ha minst 2 tegn'),
  epost: z.string().email('Ugyldig e-postadresse'),
  passord: z.string().min(8, 'Passord må ha minst 8 tegn'),
})

export type RegistrerBrukerData = z.infer<typeof RegistrerBrukerSchema>
