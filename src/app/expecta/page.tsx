import type { Metadata } from 'next'
import Link from 'next/link'

// Expecta landingsside – bygget etter docs/expecta/landingsside-blueprint.md
// NB: Alle brukertall, sitater og betaresultater på siden er PLASSHOLDERE
// og skal erstattes med reelle data før siden publiseres offentlig.

export const metadata: Metadata = {
  title: 'Expecta – Er det trygt? Skann produktet og få svar | For gravide og ammende',
  description:
    'Expecta leser strekkoden eller ingredienslisten med kameraet og gir deg en tydelig vurdering for graviditet og amming – bygget på medisinske kilder og norske retningslinjer.',
}

const painPoints = [
  {
    icon: '🔍',
    title: 'Motstridende råd',
    text: 'Ett forum sier ja, et annet sier nei. Amerikanske sider følger andre retningslinjer enn norske – og du vet ikke hvem du skal stole på.',
  },
  {
    icon: '🧴',
    title: 'Ingredienslister på latin',
    text: 'Retinol, salisylsyre, «parfum»... Ingen rekker å slå opp 30 ingredienser i hudpleiehyllen på apoteket.',
  },
  {
    icon: '📵',
    title: 'Ingen å spørre der og da',
    text: 'Trygg Mammamedisin er lagt ned, fastlegen har tre ukers ventetid, og jordmortimen er om fjorten dager. Beslutningen tar du ved hyllen – nå.',
  },
  {
    icon: '😟',
    title: 'Bekymringen som blir igjen',
    text: 'Hver usikre avgjørelse blir liggende og gnage. Første trimester går med til å lære hva du burde sjekke – resten til å lure på hva som slapp forbi.',
  },
]

const benefits = [
  {
    icon: '✅',
    text: 'Du får svaret ved hyllen – ikke etter en time med googling på kjøkkenet i kveld.',
  },
  {
    icon: '🧘',
    text: 'Du slipper å bli din egen forsker. Expecta leser studiene og retningslinjene, så du slipper.',
  },
  {
    icon: '🇳🇴',
    text: 'Du følger norske råd – Helsedirektoratet, Matportalen og Felleskatalogen, ikke amerikanske tommelfingerregler.',
  },
  {
    icon: '🤱',
    text: 'Du er dekket hele veien. Grensene flytter seg gjennom svangerskapet og inn i ammeperioden – appen flytter seg med.',
  },
]

const steps = [
  {
    icon: '📷',
    title: 'Skann',
    text: 'Pek kameraet på strekkoden, eller ta bilde av ingredienslisten hvis produktet er nytt eller utenlandsk.',
  },
  {
    icon: '🔬',
    title: 'Vi sjekker',
    text: 'Expecta identifiserer ingrediensene og krysser dem mot medisinske databaser og norske retningslinjer – tilpasset ditt trimester eller ammestatus.',
  },
  {
    icon: '✅',
    title: 'Du får svar',
    text: 'Trygt, vær oppmerksom, eller unngå. Alltid med begrunnelse og kilder, så du kan ta avgjørelsen selv – eller vise den til jordmoren din.',
  },
]

const features = [
  {
    icon: '🛒',
    title: 'Kjenner norske produkter',
    text: 'Skann varene der du faktisk handler: Kiwi, Rema, Coop, Apotek 1, Normal. Basen bygges rundt norske strekkoder og fylles ut etter hva brukerne faktisk skanner.',
  },
  {
    icon: '📅',
    title: 'Følger deg trimester for trimester',
    text: 'Det som er greit i uke 35 kan være noe annet i uke 8. Legg inn termindato én gang, så tilpasses hvert svar automatisk.',
  },
  {
    icon: '🤱',
    title: 'Egen ammemodus',
    text: 'Etter fødselen bytter appen til ammevurderinger med ett trykk. Nye grenser, samme trygghet – hele veien til du er ferdig.',
  },
  {
    icon: '📚',
    title: 'Viser alltid kildene',
    text: 'Hvert svar lenker til grunnlaget: Helsedirektoratet, Matportalen, Felleskatalogen og internasjonale databaser. Ingen svarte bokser – du ser hvorfor.',
  },
  {
    icon: '📸',
    title: 'Leser ingredienslister med kameraet',
    text: 'Utenlandsk hudpleie fra netthandel? Ta bilde av ingredienslisten, så tolker Expecta den – ingen strekkode nødvendig.',
  },
  {
    icon: '💾',
    title: 'Din trygghetsliste',
    text: 'Lagre produktene du bruker fast. Endres kunnskapen om en ingrediens, får du beskjed – uten å måtte skanne på nytt.',
  },
]

// PLASSHOLDERE – erstatt med ekte sitater fra betabrukere før lansering.
const testimonials = [
  {
    quote:
      'Jeg brukte halve første trimester på å lese forumtråder fra 2014. Nå skanner jeg i butikken og er ferdig med det. Det er den eneste appen jeg har anbefalt uoppfordret i barselgruppa.',
    name: 'Ingrid, 31 – Oslo',
    role: 'Gravid i uke 24',
  },
  {
    quote:
      'Som ammende var jeg mest usikker på medisiner og kosttilskudd. Expecta ga meg svar med kilder jeg kunne vise til helsestasjonen – og de var like imponert som meg.',
    name: 'Silje, 28 – Trondheim',
    role: 'Mamma til Ella (4 mnd)',
  },
  {
    quote:
      'Jeg får de samme spørsmålene hver eneste dag: «Kan jeg spise dette? Kan jeg smøre meg med dette?» At kvinnene kommer med kildebaserte svar i stedet for forumråd, gjør samtalene våre bedre.',
    name: 'Marte – Bergen',
    role: 'Jordmor',
  },
]

const tiers = [
  {
    name: 'Gratis',
    price: '0 kr',
    period: '',
    highlight: false,
    features: ['5 skann per uke', 'Grunnleggende vurderinger'],
    cta: 'Last ned gratis',
    fit: 'For deg som vil teste med varene du lurer mest på.',
  },
  {
    name: 'Expecta+',
    price: '79 kr',
    period: '/mnd',
    highlight: true,
    features: [
      'Ubegrenset skanning',
      'Trimester-tilpassede svar',
      'Ammemodus',
      'Trygghetsliste med varsler',
      'Fotoskann av ingredienslister',
    ],
    cta: 'Prøv 14 dager gratis',
    fit: 'For deg som vil slippe å tenke på det – de fleste velger denne.',
  },
  {
    name: 'Hele reisen',
    price: '849 kr',
    period: 'én gang',
    highlight: false,
    features: [
      'Alt i Expecta+',
      'Hele svangerskapet + 12 mnd amming',
      'Uansett hvor lang reisen blir',
    ],
    cta: 'Kjøp én gang – ferdig',
    fit: 'For deg som hater abonnementer og vil betale én gang.',
  },
]

const faqs = [
  {
    q: 'Kan jeg stole på svarene?',
    a: 'Hvert svar bygger på medisinske databaser og norske retningslinjer – blant annet Helsedirektoratets kostråd, Matportalen og Felleskatalogen – og du ser alltid kildene rett under vurderingen. Der forskningen er usikker, sier vi det tydelig og anbefaler forsiktighet fremfor å gjette. Vi overdriver aldri sikkerhet for å gi deg et «hyggeligere» svar.',
  },
  {
    q: 'Erstatter Expecta legen eller jordmoren min?',
    a: 'Nei – og det skal den ikke. Expecta er et informasjonsverktøy som gir deg kunnskapsgrunnlaget der og da. Bruker du medisiner fast, eller har en risikograviditet, skal du alltid avklare med lege eller jordmor. Mange brukere tar med seg Expecta-svaret inn i de samtalene.',
  },
  {
    q: 'Hvorfor koster det penger?',
    a: 'Fordi kunnskapen ikke står stille. Retningslinjer oppdateres, nye studier kommer, og produkter endrer innhold. Abonnementet betaler for at basen vedlikeholdes løpende – og for at det aldri kommer annonser eller sponsede «anbefalinger» mellom deg og svaret.',
  },
  {
    q: 'Hva om produktet ikke finnes i basen?',
    a: 'Da tar du bilde av ingredienslisten, så tolker Expecta den direkte. Samtidig lærer basen: produkter som skannes ofte, prioriteres først. Basen er bygget rundt norske varer og vokser for hver bruker.',
  },
  {
    q: 'Følger dere norske eller amerikanske råd?',
    a: 'Norske. Rådene fra amerikanske nettsider avviker på flere punkter fra Helsedirektoratets anbefalinger – det er nettopp derfor googling gjør deg mer forvirret. Der norske retningslinjer ikke dekker en ingrediens, bruker vi anerkjente internasjonale kilder og merker det tydelig.',
  },
  {
    q: 'Hva skjer med dataene mine?',
    a: 'Skannehistorikken din er din. Data lagres i EU/EØS i tråd med GDPR, selges aldri videre, og du kan slette alt med ett trykk i appen. Du trenger ikke oppgi mer enn termindato for å få tilpassede svar.',
  },
  {
    q: 'Kan jeg bruke den etter fødselen?',
    a: 'Ja – det er halve poenget. Ammemodusen bruker egne grenseverdier for ammeperioden, og trygghetslisten din blir med videre. Og blir det flere barn, ligger alt klart til neste gang.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

function StoreBadges({ light = false }: { light?: boolean }) {
  const base = light
    ? 'border-white/40 text-white hover:bg-white/10'
    : 'border-[#4A2545]/30 text-[#4A2545] hover:bg-[#4A2545]/5'
  return (
    <div className="flex flex-wrap gap-3">
      <a href="#last-ned" className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${base}`}>
         App Store
      </a>
      <a href="#last-ned" className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${base}`}>
        ▶ Google Play
      </a>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className="mx-auto w-[280px] rounded-[2.5rem] border-[6px] border-[#2b1527] bg-white p-4 shadow-2xl sm:w-[300px]">
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#2b1527]/20" />
      <div className="rounded-2xl bg-[#FAF7F4] p-4">
        <p className="text-xs font-medium text-[#8a7183]">Skannet nå · Håndkrem 75 ml</p>
        <div className="mt-2 flex h-24 items-center justify-center rounded-xl bg-[#F4C7B0]/40 text-4xl">
          🧴
        </div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#2E7D5B] px-3 py-1.5 text-sm font-semibold text-white">
          ✓ Trygt i 2. trimester
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#4A2545]">
          Ingen av de 18 ingrediensene er forbundet med risiko i svangerskapet.
          Inneholder ikke retinoider eller salisylsyre.
        </p>
        <div className="mt-3 border-t border-[#4A2545]/10 pt-2">
          <p className="text-[10px] uppercase tracking-wide text-[#8a7183]">Kilder</p>
          <p className="text-xs text-[#4A2545]">Helsedirektoratet · Felleskatalogen</p>
        </div>
      </div>
    </div>
  )
}

export default function ExpectaLandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#3a2136] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Toppmeny */}
      <header className="sticky top-0 z-50 border-b border-[#4A2545]/10 bg-[#FAF7F4]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/expecta" className="font-serif text-xl font-bold text-[#4A2545]">
            expecta<span className="text-[#C98A00]">.</span>
          </Link>
          <div className="hidden gap-6 text-sm font-medium text-[#4A2545]/80 sm:flex">
            <a href="#slik-virker-det" className="hover:text-[#4A2545]">Slik virker det</a>
            <a href="#priser" className="hover:text-[#4A2545]">Priser</a>
            <a href="#faq" className="hover:text-[#4A2545]">FAQ</a>
          </div>
          <a
            href="#last-ned"
            className="rounded-full bg-[#4A2545] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3a1c37]"
          >
            Last ned gratis
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, #F4C7B0 0%, transparent 70%)' }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[55%_45%]">
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#4A2545] sm:text-5xl">
              Er det trygt? Skann og få svar.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3a2136]/80">
              Expecta leser strekkoden eller ingredienslisten med kameraet og gir deg en
              tydelig vurdering for graviditet og amming – bygget på medisinske kilder og
              norske retningslinjer, ikke forumtråder.
            </p>
            <div className="mt-8 flex flex-col gap-4" id="last-ned">
              <a
                href="#priser"
                className="inline-flex w-fit items-center rounded-full bg-[#4A2545] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#3a1c37]"
              >
                Last ned Expecta gratis
              </a>
              <StoreBadges />
              <p className="text-sm text-[#3a2136]/60">Gratis å laste ned · Ingen kortopplysninger</p>
            </div>
            {/* PLASSHOLDER: erstatt tall og sitat med reelle data før lansering */}
            <div className="mt-8 border-t border-[#4A2545]/10 pt-5 text-sm text-[#3a2136]/70">
              <p>⭐ 4,8 i App Store · Brukt av over 8 000 norske gravide og ammende</p>
              <p className="mt-1 italic">«Endelig slipper jeg å google alt.» – bruker i uke 31</p>
            </div>
          </div>
          <PhoneMockup />
        </div>
      </section>

      {/* Tillitsstripe */}
      <section className="border-y border-[#4A2545]/10 bg-[#F3EEE9]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-sm sm:grid-cols-3">
          <p className="text-[#3a2136]/70">
            <span className="font-semibold text-[#4A2545]">Vurderinger bygget på åpne kilder fra:</span>
            <br />
            Helsedirektoratets kostråd · Matportalen (Mattilsynet) · Felleskatalogen ·
            internasjonale medisinske databaser
          </p>
          {/* PLASSHOLDER-sitat */}
          <p className="italic text-[#3a2136]/70">
            «Jeg skanner alt fra solkrem til pålegg. Det tar tre sekunder.»
            <br />
            <span className="not-italic font-medium text-[#4A2545]">– Ingrid, gravid i uke 24</span>
          </p>
          <div className="flex flex-col gap-1 font-medium text-[#4A2545]">
            <span>12 000+ produkter i basen</span>
            <span>Svar på under 5 sekunder</span>
            <span>Oppdatert løpende</span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <h2 className="font-serif text-3xl font-bold text-[#4A2545] sm:text-4xl">
          Google gir deg fjorten svar. Du trenger ett.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[#3a2136]/80">
          Som gravid lurer du på om noe er trygt et titalls ganger om dagen. Svaret finnes
          – i kliniske databaser og offentlige retningslinjer. Men veien dit går gjennom
          gamle blogginnlegg, amerikanske nettsider og forumtråder som krangler med hverandre.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {painPoints.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#4A2545]/10 bg-white p-6">
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-[#4A2545]">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-[#3a2136]/75">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Løsning */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <h2 className="font-serif text-3xl font-bold text-[#4A2545] sm:text-4xl">
            Ett skann. Ett tydelig svar. Med begrunnelse.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[#3a2136]/80">
            Expecta krysser produktets ingredienser mot medisinske databaser og norske
            retningslinjer, og gir deg en klar vurdering tilpasset akkurat der du er –
            trimester for trimester, og videre inn i ammeperioden. Du får ikke bare «ja»
            eller «nei», men <em>hvorfor</em> – med kildene rett under svaret.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.icon} className="flex gap-4 rounded-2xl bg-[#FAF7F4] p-5">
                <span className="text-2xl">{b.icon}</span>
                <span className="leading-relaxed text-[#3a2136]/85">{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Slik virker det */}
      <section id="slik-virker-det" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <h2 className="font-serif text-3xl font-bold text-[#4A2545] sm:text-4xl">
          Tre sekunder fra tvil til svar
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-[#4A2545]/10 bg-white p-6">
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#4A2545] text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="mt-2 text-3xl">{s.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-[#4A2545]">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-[#3a2136]/75">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2E7D5B]/10 px-3 py-1 font-medium text-[#2E7D5B]">
            ● Trygt
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#C98A00]/10 px-3 py-1 font-medium text-[#C98A00]">
            ● Vær oppmerksom
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#B4453A]/10 px-3 py-1 font-medium text-[#B4453A]">
            ● Unngå
          </span>
          <span className="text-[#3a2136]/60">Alltid med begrunnelse – aldri bare en farge.</span>
        </div>
      </section>

      {/* Funksjoner */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <h2 className="font-serif text-3xl font-bold text-[#4A2545] sm:text-4xl">
            Bygget for norske hyller – og norske retningslinjer
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-[#FAF7F4] p-6">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold text-[#4A2545]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3a2136]/75">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof – PLASSHOLDERE, erstatt med ekte sitater fra betabrukere */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <h2 className="font-serif text-3xl font-bold text-[#4A2545] sm:text-4xl">
          Mødre som slapp å google seg gjennom svangerskapet
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-[#4A2545]/10 bg-white p-6">
              <blockquote className="flex-1 leading-relaxed text-[#3a2136]/85">«{t.quote}»</blockquote>
              <figcaption className="mt-4 border-t border-[#4A2545]/10 pt-3">
                <div className="font-semibold text-[#4A2545]">{t.name}</div>
                <div className="text-sm text-[#3a2136]/60">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#3a2136]/40">
          Sitatene er illustrative eksempler fra pilotfasen.
        </p>
      </section>

      {/* Priser */}
      <section id="priser" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <h2 className="font-serif text-3xl font-bold text-[#4A2545] sm:text-4xl">
            Mindre enn en pose vitaminer i måneden
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[#3a2136]/80">
            Last ned gratis og prøv. Oppgrader når du vil ha ubegrenset trygghet – avslutt
            når som helst.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  t.highlight
                    ? 'border-[#4A2545] bg-[#FAF7F4] shadow-xl'
                    : 'border-[#4A2545]/15 bg-white'
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#C98A00] px-3 py-1 text-xs font-bold text-white">
                    ⭐ Mest valgt
                  </span>
                )}
                <h3 className="text-lg font-semibold text-[#4A2545]">{t.name}</h3>
                <p className="mt-2">
                  <span className="font-serif text-4xl font-bold text-[#4A2545]">{t.price}</span>
                  <span className="ml-1 text-[#3a2136]/60">{t.period}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-[#3a2136]/80">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-[#2E7D5B]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#last-ned"
                  className={`mt-6 rounded-full px-5 py-3 text-center font-semibold transition-colors ${
                    t.highlight
                      ? 'bg-[#4A2545] text-white hover:bg-[#3a1c37]'
                      : 'border border-[#4A2545]/30 text-[#4A2545] hover:bg-[#4A2545]/5'
                  }`}
                >
                  {t.cta}
                </a>
                <p className="mt-3 text-xs text-[#3a2136]/60">{t.fit}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[#3a2136]/60">
            Betaling via App Store, Google Play eller Vipps · 14 dager gratis prøvetid på
            Expecta+ · Ingen binding – avslutt med to trykk
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <h2 className="font-serif text-3xl font-bold text-[#4A2545] sm:text-4xl">
          Det lurer alle på
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-[#4A2545]/10 bg-white p-5">
              <summary className="cursor-pointer list-none font-semibold text-[#4A2545] marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#C98A00] transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-[#3a2136]/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Siste CTA */}
      <section className="bg-[#4A2545] text-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Neste gang du står ved hyllen og lurer – ha svaret i lomma.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Du kommer til å lure på hundrevis av produkter før termin. Du kan google hver
            eneste gang – eller skanne og gå videre med dagen. Last ned gratis og prøv med
            det første produktet du lurer på.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="#last-ned"
              className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#4A2545] shadow-lg transition-colors hover:bg-[#F4C7B0]"
            >
              Last ned Expecta gratis
            </a>
            <StoreBadges light />
            <p className="text-sm text-white/70">
              Gratis å laste ned · 14 dager gratis prøvetid på Expecta+ · Ingen binding –
              avslutt med to trykk
            </p>
            <p className="text-sm text-white/70">
              Ikke gravid ennå, men kjenner noen som er?{' '}
              <a href="#" className="underline hover:text-white">
                Send dem siden →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#4A2545]/10 bg-[#F3EEE9]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-bold text-[#4A2545]">
              expecta<span className="text-[#C98A00]">.</span>
            </p>
            <p className="mt-2 text-[#3a2136]/70">
              Trygghetssvar for gravide og ammende – bygget på medisinske kilder.
            </p>
            <p className="mt-2 text-[#3a2136]/60">hei@expecta.no</p>
          </div>
          <div>
            <p className="font-semibold text-[#4A2545]">Produkt</p>
            <ul className="mt-2 space-y-1 text-[#3a2136]/70">
              <li><a href="#slik-virker-det" className="hover:text-[#4A2545]">Slik virker det</a></li>
              <li><a href="#priser" className="hover:text-[#4A2545]">Priser</a></li>
              <li><a href="#faq" className="hover:text-[#4A2545]">FAQ</a></li>
              <li><a href="#last-ned" className="hover:text-[#4A2545]">Last ned</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#4A2545]">Ressurser</p>
            <ul className="mt-2 space-y-1 text-[#3a2136]/70">
              <li><a href="#" className="hover:text-[#4A2545]">Gratis guide: Trygg gjennom svangerskapet</a></li>
              <li><a href="#" className="hover:text-[#4A2545]">Kunnskapsbase</a></li>
              <li><a href="#" className="hover:text-[#4A2545]">For jordmødre og helsepersonell</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#4A2545]">Juridisk & sosialt</p>
            <ul className="mt-2 space-y-1 text-[#3a2136]/70">
              <li><a href="#" className="hover:text-[#4A2545]">Personvernerklæring</a></li>
              <li><a href="#" className="hover:text-[#4A2545]">Vilkår</a></li>
              <li><a href="#" className="hover:text-[#4A2545]">Instagram · TikTok · Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#4A2545]/10">
          <p className="mx-auto max-w-6xl px-5 py-5 text-xs leading-relaxed text-[#3a2136]/50">
            Expecta er et informasjonsverktøy og gir generell, kildebasert informasjon.
            Appen er ikke medisinsk utstyr og erstatter ikke helsefaglig rådgivning fra
            lege, jordmor eller helsestasjon. Kontakt alltid helsepersonell ved medisinske
            spørsmål.
          </p>
        </div>
      </footer>
    </div>
  )
}
