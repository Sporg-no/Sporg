import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeder: sletter eksisterende data...')
  await prisma.meldingMottaker.deleteMany()
  await prisma.melding.deleteMany()
  await prisma.frivilligPamelding.deleteMany()
  await prisma.resultat.deleteMany()
  await prisma.sjekkInn.deleteMany()
  await prisma.betaling.deleteMany()
  await prisma.pamelding.deleteMany()
  await prisma.sesjon.deleteMany()
  await prisma.arrangement.deleteMany()
  await prisma.bruker.deleteMany()

  console.log('Seeder: oppretter brukere...')
  const passordHash = await bcrypt.hash('passord123', 12)

  const admin = await prisma.bruker.create({
    data: {
      epost: 'admin@sporg.no',
      passordHash,
      navn: 'Admin Sporg',
      rolle: 'ADMIN',
    },
  })

  const organisator = await prisma.bruker.create({
    data: {
      epost: 'organisator@sporg.no',
      passordHash,
      navn: 'Ola Nordmann',
      rolle: 'ORGANISATOR',
    },
  })

  const deltaker1 = await prisma.bruker.create({
    data: {
      epost: 'kari@eksempel.no',
      passordHash,
      navn: 'Kari Hansen',
      rolle: 'DELTAKER',
    },
  })

  const deltaker2 = await prisma.bruker.create({
    data: {
      epost: 'per@eksempel.no',
      passordHash,
      navn: 'Per Olsen',
      rolle: 'DELTAKER',
    },
  })

  const deltaker3 = await prisma.bruker.create({
    data: {
      epost: 'anna@eksempel.no',
      passordHash,
      navn: 'Anna Larsen',
      rolle: 'DELTAKER',
    },
  })

  console.log('Seeder: oppretter arrangementer...')

  const fremtidigArrangement = await prisma.arrangement.create({
    data: {
      slug: 'oslo-maraton-2025',
      tittel: 'Oslo Maraton 2025',
      beskrivelse:
        'Norges største maratonløp gjennom Oslos vakre gater. Et uforglemmelig løp for alle nivåer – fra nybegynnere til eliteløpere. Ruten går gjennom historiske bydeler og langs Oslofjorden.',
      sted: 'Oslo Spektrum',
      adresse: 'Sonja Henies plass 2, 0185 Oslo',
      startDato: new Date('2025-09-20T08:00:00'),
      sluttDato: new Date('2025-09-20T18:00:00'),
      pameldingsFrist: new Date('2025-08-15T23:59:59'),
      maksAntall: 500,
      pris: 49900, // 499 NOK i øre
      status: 'PUBLISERT',
      kategori: 'LOPING',
      organisatorId: organisator.id,
    },
  })

  await prisma.sesjon.createMany({
    data: [
      {
        arrangementId: fremtidigArrangement.id,
        tittel: 'Registrering og startpakke-utdeling',
        startTid: new Date('2025-09-20T07:00:00'),
        sluttTid: new Date('2025-09-20T08:00:00'),
        sted: 'Startområde, Rådhusplassen',
        type: 'AKTIVITET',
      },
      {
        arrangementId: fremtidigArrangement.id,
        tittel: 'Maratonstarten',
        startTid: new Date('2025-09-20T08:00:00'),
        sluttTid: new Date('2025-09-20T08:30:00'),
        sted: 'Rådhusplassen',
        type: 'SEREMONI',
      },
      {
        arrangementId: fremtidigArrangement.id,
        tittel: 'Premieutdeling',
        startTid: new Date('2025-09-20T15:00:00'),
        sluttTid: new Date('2025-09-20T16:00:00'),
        sted: 'Målområde',
        type: 'SEREMONI',
      },
    ],
  })

  const utkastArrangement = await prisma.arrangement.create({
    data: {
      slug: 'bergen-sykkelritt-2025',
      tittel: 'Bergen Sykkelritt 2025',
      beskrivelse:
        'Et spennende sykkelritt gjennom Bergens mange bakker og vakre natur. Passer for alle syklister som ønsker en utfordring.',
      sted: 'Bergen',
      adresse: 'Torgallmenningen 1, 5014 Bergen',
      startDato: new Date('2025-10-15T09:00:00'),
      sluttDato: new Date('2025-10-15T17:00:00'),
      pameldingsFrist: new Date('2025-09-30T23:59:59'),
      maksAntall: 200,
      pris: 29900,
      status: 'UTKAST',
      kategori: 'SYKLING',
      organisatorId: organisator.id,
    },
  })

  const avsluttetArrangement = await prisma.arrangement.create({
    data: {
      slug: 'trondheim-triatlon-2024',
      tittel: 'Trondheim Triathlon 2024',
      beskrivelse:
        'Triathlon-løp med svømming i Nidelven, sykling gjennom Bymarka og løping langs Nedre Elvehavn. Et komplett triathlonløp for erfarne og nybegynnere.',
      sted: 'Trondheim',
      adresse: 'Nedre Elvehavn, 7042 Trondheim',
      startDato: new Date('2024-06-15T07:00:00'),
      sluttDato: new Date('2024-06-15T16:00:00'),
      maksAntall: 150,
      pris: 0,
      status: 'AVSLUTTET',
      kategori: 'TRIATHLON',
      organisatorId: organisator.id,
    },
  })

  console.log('Seeder: oppretter påmeldinger...')

  const pamelding1 = await prisma.pamelding.create({
    data: {
      arrangementId: fremtidigArrangement.id,
      brukerId: deltaker1.id,
      status: 'BEKREFTET',
      startnummer: 42,
      klasse: 'Kvinner 30-39',
    },
  })

  await prisma.betaling.create({
    data: {
      pameldingId: pamelding1.id,
      belop: 49900,
      status: 'FULLFORT',
      stripeBetalingId: 'pi_mock_kari_123',
    },
  })

  const pamelding2 = await prisma.pamelding.create({
    data: {
      arrangementId: fremtidigArrangement.id,
      brukerId: deltaker2.id,
      status: 'VENTENDE',
      klasse: 'Menn 40-49',
    },
  })

  await prisma.betaling.create({
    data: {
      pameldingId: pamelding2.id,
      belop: 49900,
      status: 'VENTENDE',
    },
  })

  const pamelding3 = await prisma.pamelding.create({
    data: {
      arrangementId: avsluttetArrangement.id,
      brukerId: deltaker1.id,
      status: 'BEKREFTET',
      startnummer: 7,
      klasse: 'Kvinner Elite',
    },
  })

  await prisma.sjekkInn.create({
    data: {
      pameldingId: pamelding3.id,
      sjekkInnAv: 'Frivillig Team',
    },
  })

  console.log('Seeder: oppretter resultater...')

  await prisma.resultat.createMany({
    data: [
      {
        arrangementId: avsluttetArrangement.id,
        deltakerNavn: 'Kari Hansen',
        startnummer: 7,
        klasse: 'Kvinner Elite',
        plassering: 1,
        tid: '02:15:33',
        publisert: true,
      },
      {
        arrangementId: avsluttetArrangement.id,
        deltakerNavn: 'Anna Larsen',
        startnummer: 12,
        klasse: 'Kvinner Elite',
        plassering: 2,
        tid: '02:22:47',
        publisert: true,
      },
      {
        arrangementId: avsluttetArrangement.id,
        deltakerNavn: 'Per Olsen',
        startnummer: 3,
        klasse: 'Menn Open',
        plassering: 1,
        tid: '01:58:14',
        publisert: true,
      },
    ],
  })

  console.log('Seeder: oppretter frivillige...')

  await prisma.frivilligPamelding.create({
    data: {
      arrangementId: fremtidigArrangement.id,
      brukerId: deltaker3.id,
      rolle: 'Tidtaker',
      status: 'GODKJENT',
    },
  })

  await prisma.frivilligPamelding.create({
    data: {
      arrangementId: fremtidigArrangement.id,
      brukerId: admin.id,
      rolle: 'Startfunksjonær',
      status: 'SOKT',
    },
  })

  console.log('Seeder: oppretter meldinger...')

  const melding = await prisma.melding.create({
    data: {
      arrangementId: fremtidigArrangement.id,
      avsenderId: organisator.id,
      emne: 'Velkommen til Oslo Maraton 2025!',
      innhold:
        'Hei alle deltakere!\n\nVi er glade for å ønske dere velkommen til Oslo Maraton 2025. Husk å hente startpakken din mellom kl. 07:00 og 08:00 på dagen.\n\nLykke til!\nOrganisasjonskomiteen',
      type: 'ALLE_DELTAKERE',
    },
  })

  await prisma.meldingMottaker.create({
    data: {
      meldingId: melding.id,
      brukerId: deltaker1.id,
      lest: true,
      lestAt: new Date(),
    },
  })

  await prisma.meldingMottaker.create({
    data: {
      meldingId: melding.id,
      brukerId: deltaker2.id,
      lest: false,
    },
  })

  console.log('✅ Seeding fullført!')
  console.log('')
  console.log('Test-brukere (passord: passord123):')
  console.log('  admin@sporg.no (ADMIN)')
  console.log('  organisator@sporg.no (ORGANISATOR)')
  console.log('  kari@eksempel.no (DELTAKER)')
  console.log('  per@eksempel.no (DELTAKER)')
  console.log('  anna@eksempel.no (DELTAKER)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
