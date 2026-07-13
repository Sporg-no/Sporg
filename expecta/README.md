# Expecta

Trygghetssvar for gravide og ammende – skann produktet, få svar. Dette er
landingssiden for det norske markedet, bygget etter spesifikasjonen i
[`docs/landingsside-blueprint.md`](docs/landingsside-blueprint.md).

## Kom i gang

```bash
npm install
npm run dev      # utviklingsserver på http://localhost:3000
npm run build    # produksjonsbygg
```

Bygget med Next.js 14 (app router), TypeScript og Tailwind CSS. Ingen database
eller miljøvariabler kreves.

## Struktur

- `src/app/page.tsx` – hele landingssiden (selvstendig, ingen eksterne avhengigheter utover Next/Tailwind)
- `src/app/layout.tsx` – metadata og SEO (norsk `lang="nb"`, Open Graph)
- `docs/landingsside-blueprint.md` – komplett spesifikasjon: copy, wireframe, A/B-tester, designsystem

## Viktig før lansering

- Alle brukertall, sitater og betaresultater på siden er **plassholdere**
  (merket i koden) og må byttes med reelle data.
- Disclaimeren om at Expecta ikke er medisinsk utstyr (footer) skal ikke fjernes.

## Flytte til eget repositorium

Denne mappen er et komplett, frittstående prosjekt. For å gjøre den til et eget
repo (f.eks. `Sporg-no/expecta`):

```bash
# fra en klone av Sporg, på branchen claude/expecta-landing-page-ed77ds
cp -r expecta ../expecta && cd ../expecta
git init && git add -A && git commit -m "Initial commit"
git remote add origin git@github.com:Sporg-no/expecta.git
git push -u origin main
```
