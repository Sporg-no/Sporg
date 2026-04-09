-- CreateTable
CREATE TABLE "brukere" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "epost" TEXT NOT NULL,
    "passordHash" TEXT NOT NULL,
    "navn" TEXT NOT NULL,
    "telefon" TEXT,
    "rolle" TEXT NOT NULL DEFAULT 'DELTAKER',
    "opprettetAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oppdatertAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "arrangementer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "tittel" TEXT NOT NULL,
    "beskrivelse" TEXT NOT NULL,
    "sted" TEXT NOT NULL,
    "adresse" TEXT,
    "startDato" DATETIME NOT NULL,
    "sluttDato" DATETIME NOT NULL,
    "pameldingsFrist" DATETIME,
    "maksAntall" INTEGER,
    "pris" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'UTKAST',
    "kategori" TEXT NOT NULL DEFAULT 'ANNET',
    "organisatorId" TEXT NOT NULL,
    "opprettetAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oppdatertAt" DATETIME NOT NULL,
    CONSTRAINT "arrangementer_organisatorId_fkey" FOREIGN KEY ("organisatorId") REFERENCES "brukere" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sesjoner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arrangementId" TEXT NOT NULL,
    "tittel" TEXT NOT NULL,
    "beskrivelse" TEXT,
    "startTid" DATETIME NOT NULL,
    "sluttTid" DATETIME NOT NULL,
    "sted" TEXT,
    "type" TEXT NOT NULL DEFAULT 'AKTIVITET',
    CONSTRAINT "sesjoner_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "arrangementer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pameldinjer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arrangementId" TEXT NOT NULL,
    "brukerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'VENTENDE',
    "startnummer" INTEGER,
    "klasse" TEXT,
    "merknader" TEXT,
    "opprettetAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oppdatertAt" DATETIME NOT NULL,
    CONSTRAINT "pameldinjer_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "arrangementer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pameldinjer_brukerId_fkey" FOREIGN KEY ("brukerId") REFERENCES "brukere" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sjekk_inn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pameldingId" TEXT NOT NULL,
    "tidspunkt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sjekkInnAv" TEXT,
    CONSTRAINT "sjekk_inn_pameldingId_fkey" FOREIGN KEY ("pameldingId") REFERENCES "pameldinjer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "betalinger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pameldingId" TEXT NOT NULL,
    "belop" INTEGER NOT NULL,
    "valuta" TEXT NOT NULL DEFAULT 'NOK',
    "status" TEXT NOT NULL DEFAULT 'VENTENDE',
    "stripeSessionId" TEXT,
    "stripeBetalingId" TEXT,
    "opprettetAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oppdatertAt" DATETIME NOT NULL,
    CONSTRAINT "betalinger_pameldingId_fkey" FOREIGN KEY ("pameldingId") REFERENCES "pameldinjer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "resultater" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arrangementId" TEXT NOT NULL,
    "deltakerNavn" TEXT NOT NULL,
    "startnummer" INTEGER,
    "klasse" TEXT,
    "plassering" INTEGER,
    "tid" TEXT,
    "poeng" REAL,
    "merknad" TEXT,
    "publisert" BOOLEAN NOT NULL DEFAULT false,
    "opprettetAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oppdatertAt" DATETIME NOT NULL,
    CONSTRAINT "resultater_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "arrangementer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "frivillig_pameldinjer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arrangementId" TEXT NOT NULL,
    "brukerId" TEXT NOT NULL,
    "rolle" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SOKT',
    "merknader" TEXT,
    "opprettetAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "frivillig_pameldinjer_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "arrangementer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "frivillig_pameldinjer_brukerId_fkey" FOREIGN KEY ("brukerId") REFERENCES "brukere" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meldinger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arrangementId" TEXT,
    "avsenderId" TEXT NOT NULL,
    "emne" TEXT NOT NULL,
    "innhold" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'DIREKTE',
    "sendtAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "meldinger_arrangementId_fkey" FOREIGN KEY ("arrangementId") REFERENCES "arrangementer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "meldinger_avsenderId_fkey" FOREIGN KEY ("avsenderId") REFERENCES "brukere" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "melding_mottakere" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meldingId" TEXT NOT NULL,
    "brukerId" TEXT NOT NULL,
    "lest" BOOLEAN NOT NULL DEFAULT false,
    "lestAt" DATETIME,
    CONSTRAINT "melding_mottakere_meldingId_fkey" FOREIGN KEY ("meldingId") REFERENCES "meldinger" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "melding_mottakere_brukerId_fkey" FOREIGN KEY ("brukerId") REFERENCES "brukere" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "brukere_epost_key" ON "brukere"("epost");

-- CreateIndex
CREATE UNIQUE INDEX "arrangementer_slug_key" ON "arrangementer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pameldinjer_arrangementId_brukerId_key" ON "pameldinjer"("arrangementId", "brukerId");

-- CreateIndex
CREATE UNIQUE INDEX "sjekk_inn_pameldingId_key" ON "sjekk_inn"("pameldingId");

-- CreateIndex
CREATE UNIQUE INDEX "betalinger_pameldingId_key" ON "betalinger"("pameldingId");

-- CreateIndex
CREATE UNIQUE INDEX "betalinger_stripeSessionId_key" ON "betalinger"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "frivillig_pameldinjer_arrangementId_brukerId_key" ON "frivillig_pameldinjer"("arrangementId", "brukerId");

-- CreateIndex
CREATE UNIQUE INDEX "melding_mottakere_meldingId_brukerId_key" ON "melding_mottakere"("meldingId", "brukerId");
