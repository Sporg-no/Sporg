# Expecta – Landingsside-blueprint (norsk marked)

> **Produkt:** Expecta – appen som skanner produkter og gir gravide og ammende et tydelig, kildebasert trygghetssvar på sekunder.
> **Marked:** Norge. All tekst er på norsk, alle kilder, priser og referanser er tilpasset norske forhold.
> **Formål med dokumentet:** Komplett spesifikasjon (tekst + layout + wireframe) som kan overleveres direkte til en utvikler eller AI-builder.
> **Domeneforslag:** expecta.no

---

## NORSK MARKEDSKONTEKST (les før bygging)

Dette er ikke en oversatt amerikansk side – posisjoneringen bygger på norske realiteter:

- **Trygg Mammamedisin**, den offentlige spørretjenesten fra RELIS der gravide kunne spørre om legemidler, er lagt ned. Det finnes ikke lenger én enkel, offentlig kanal for raske svar. Dette er kjernehullet Expecta fyller.
- Norske råd avviker fra amerikanske og britiske (f.eks. koffeingrenser, matvareråd). Gravide som googler får engelskspråklige svar som ikke stemmer med **Helsedirektoratets** og **Matportalens** anbefalinger. Expecta svarer alltid etter *norske* retningslinjer.
- Norske kanaler der målgruppen faktisk er: Babyverden, Barnimagen-forum, Facebook-grupper («Gravid 2026», «Ammehjelpen»), jordmor og helsestasjon.
- Betaling: **Vipps** i tillegg til App Store/Google Play. Priser i NOK.
- Personvern: GDPR, data lagret i EU/EØS. Nordmenn har høy tillit til offentlige helsekilder – siden skal låne troverdighet fra kildene, aldri utgi seg for å være dem.
- Ca. 52 000 fødsler i året i Norge → tallene i social proof må være realistiske for et norsk produkt (tusener, ikke millioner).

**Viktig juridisk ramme:** Expecta er et informasjonsverktøy, ikke medisinsk utstyr og ikke en erstatning for lege eller jordmor. Denne disclaimeren skal være synlig (footer + FAQ + ved siden av verdikt-eksempler), men ikke dominere.

---

## 1. SIDESTRUKTUR & WIREFRAME

### Above the fold (Hero-seksjon)

**Layout:**
- Desktop: 55/45-splitt. Venstre kolonne: tekst + CTA. Høyre kolonne: telefon-mockup i lett vinkel som viser appen midt i et skann.
- Mobil: sentrert, tekst først, deretter telefon-mockup (beskåret nederst så den «stikker opp» i neste seksjon).
- Bakgrunn: varm off-white (`#FAF7F4`) med en myk, diffus fersken/rosa gradient øverst til høyre. Ingen bakgrunnsbilder – rask lastetid og rolig uttrykk.
- Sticky toppmeny: logo venstre, lenker («Slik virker det», «Priser», «FAQ»), knapp «Last ned gratis» høyre.

**Primær overskrift (H1):**
> **Er det trygt? Skann og få svar.**

**Underoverskrift:**
> Expecta leser strekkoden eller ingredienslisten med kameraet og gir deg en tydelig vurdering for graviditet og amming – bygget på medisinske kilder og norske retningslinjer, ikke forumtråder.

**Hero-bilde/-video:**
Telefon-mockup som viser appens svarskjerm: øverst et produktfoto (en håndkrem fra apoteket), under det en stor grønn badge **«Trygt i 2. trimester»**, deretter to linjer begrunnelse og en kildeliste («Helsedirektoratet · Felleskatalogen»). Bak telefonen, lett uskarpt: en hånd som holder telefonen mot en butikkhylle. Alternativ (A/B-test): 12 sekunders autoplay-loop (uten lyd) av selve skannet – hylle → skann → grønt svar.

**Primær CTA-knapp:**
- Tekst: **«Last ned Expecta gratis»**
- Stil: stor, avrundet (pill), mørk aubergine/plomme (`#4A2545`) med hvit tekst. Under knappen: App Store- og Google Play-badges side om side.
- Mikrotekst under: «Gratis å laste ned · Ingen kortopplysninger»

**Social proof-element (rett under CTA):**
> ⭐ 4,8 i App Store · Brukt av over 8 000 norske gravide og ammende
> *«Endelig slipper jeg å google alt.»* – bruker i uke 31

*(Tall og sitat er plassholdere – erstatt med reelle tall før lansering. Ikke publiser fiktive tall.)*

### Tillitsstripe (rett under hero)

**Layout:** Smal, fullbredde stripe med lys bakgrunn (`#F3EEE9`), 3–4 elementer i én rad (stables på mobil).

- **Kildelogoer/-navn (gråtoner):** «Vurderinger bygget på: Helsedirektoratets kostråd · Matportalen (Mattilsynet) · Felleskatalogen · internasjonale medisinske databaser». *Merk: Dette er kilder, ikke partnere – bruk tekst, ikke offisielle logoer, med formuleringen «bygget på åpne kilder fra».*
- **Kort testimonial:** *«Jeg skanner alt fra solkrem til pålegg. Det tar tre sekunder.»* – Ingrid, gravid i uke 24 *(plassholder)*
- **Nøkkeltall:** «12 000+ produkter i basen» · «Svar på under 5 sekunder» · «Oppdatert løpende»

---

## 2. PROBLEM-/SMERTESEKSJON

**Seksjonsoverskrift:**
> **Google gir deg fjorten svar. Du trenger ett.**

**Ingress:** Som gravid lurer du på om noe er trygt et titalls ganger om dagen. Svaret finnes – i kliniske databaser og offentlige retningslinjer. Men veien dit går gjennom gamle blogginnlegg, amerikanske nettsider og forumtråder som krangler med hverandre.

**Smertepunkter (4 kort med ikon):**
- 🔍 **Motstridende råd.** Ett forum sier ja, et annet sier nei. Amerikanske sider følger andre retningslinjer enn norske – og du vet ikke hvem du skal stole på.
- 🧴 **Ingredienslister på latin.** Retinol, salisylsyre, «parfum»... Ingen rekker å slå opp 30 ingredienser i hudpleiehyllen på Vitusapotek.
- 📵 **Ingen å spørre der og da.** Trygg Mammamedisin er lagt ned, fastlegen har tre ukers ventetid, og jordmortimen er om fjorten dager. Beslutningen tar du ved hyllen – nå.
- 😟 **Bekymringen som blir igjen.** Hver usikre avgjørelse blir liggende og gnage. Første trimester går med til å lære hva du burde sjekke – resten til å lure på hva som slapp forbi.

**Visuelt element:** Delt illustrasjon i to paneler. Venstre («I dag»): kvinne i butikk med telefonen full av åpne faner – forum, engelske nettsider, en halvlest blogg – med spørsmålstegn over hodet. Høyre («Med Expecta»): samme situasjon, ett skann, ett tydelig grønt svar. Illustrasjonsstil: myke linjer, varm og rolig – aldri skremmende. **Ikke** bruk bilder som dramatiserer fare (ingen faresymboler over mat, ingen gråtende kvinner).

---

## 3. LØSNINGSOVERSIKT

**Seksjonsoverskrift:**
> **Ett skann. Ett tydelig svar. Med begrunnelse.**

**Verdiløfte:**
Expecta krysser produktets ingredienser mot medisinske databaser og norske retningslinjer, og gir deg en klar vurdering tilpasset akkurat der du er – trimester for trimester, og videre inn i ammeperioden. Du får ikke bare «ja» eller «nei», men *hvorfor* – med kildene rett under svaret.

**Nøkkelfordeler (4 punkter):**
- ✅ **Du får svaret ved hyllen** – ikke etter en time med googling på kjøkkenet i kveld.
- 🧘 **Du slipper å bli din egen forsker.** Expecta leser studiene og retningslinjene, så du slipper.
- 🇳🇴 **Du følger norske råd.** Vurderingene bygger på Helsedirektoratet, Matportalen og Felleskatalogen – ikke amerikanske tommelfingerregler.
- 🤱 **Du er dekket hele veien.** Grensene flytter seg gjennom svangerskapet og igjen når du ammer – appen flytter seg med.

**Demo/forhåndsvisning:** Tre telefonskjermer side om side (karusell på mobil):
1. **Skanneskjerm:** kamera rettet mot strekkoden på et Tine-produkt.
2. **Svarskjerm:** gul badge «Vær oppmerksom – begrens mengden» på en energidrikk, med koffeininnhold og Helsedirektoratets koffeingrense forklart i to setninger.
3. **Kildeskjerm:** utvidet visning med «Derfor sier vi dette» og klikkbare kilder.

---

## 4. SLIK VIRKER DET (prosess-seksjon)

**Seksjonsoverskrift:**
> **Tre sekunder fra tvil til svar**

**Steg (3 stk, nummererte kort med ikon over):**
1. **📷 Skann** – Pek kameraet på strekkoden, eller ta bilde av ingredienslisten hvis produktet er nytt eller utenlandsk.
2. **🔬 Vi sjekker** – Expecta identifiserer ingrediensene og krysser dem mot medisinske databaser og norske retningslinjer – tilpasset ditt trimester eller ammestatus.
3. **✅ Du får svar** – Trygt, vær oppmerksom, eller unngå. Alltid med begrunnelse og kilder, så du kan ta avgjørelsen selv – eller vise den til jordmoren din.

**Visuell behandling:** Horisontal tidslinje på desktop (kort 1 → 2 → 3 med tynn forbindelseslinje), vertikal på mobil. Ikoner i én strektykkelse, plommefarget. Under steg 3: liten fargeforklaring av de tre verdikt-nivåene (grønn/gul/rød) med teksten «Alltid med begrunnelse – aldri bare en farge».

---

## 5. FUNKSJONER/FORDELER

**Seksjonsoverskrift:**
> **Bygget for norske hyller – og norske retningslinjer**

**Funksjonsblokker (6 stk, 3×2 grid på desktop, 1 kolonne på mobil):**

- **🛒 Kjenner norske produkter** – Skann varene der du faktisk handler: Kiwi, Rema, Coop, Apotek 1, Normal. Basen bygges rundt norske strekkoder og fylles ut kategori for kategori etter hva brukerne faktisk skanner.
- **📅 Følger deg trimester for trimester** – Det som er greit i uke 35 kan være noe annet i uke 8. Legg inn termindato én gang, så tilpasses hvert svar automatisk.
- **🤱 Egen ammemodus** – Etter fødselen bytter appen til ammevurderinger med ett trykk. Nye grenser, samme trygghet – hele veien til du er ferdig.
- **📚 Viser alltid kildene** – Hvert svar lenker til grunnlaget: Helsedirektoratet, Matportalen, Felleskatalogen og internasjonale databaser. Ingen svarte bokser – du ser hvorfor.
- **📸 Leser ingredienslister med kameraet** – Utenlandsk hudpleie fra netthandel? Ta bilde av ingredienslisten, så tolker Expecta den – ingen strekkode nødvendig.
- **💾 Din trygghetsliste** – Lagre produktene du bruker fast. Endres kunnskapen om en ingrediens, får du beskjed – uten å måtte skanne på nytt.

---

## 6. SOCIAL PROOF-SEKSJON

**Seksjonsoverskrift:**
> **Mødre som slapp å google seg gjennom svangerskapet**

*(Alle testimonials under er **eksempler/plassholdere** som viser ønsket tone og innhold. De skal erstattes med ekte sitater fra betabrukere – f.eks. de 50 tidligbrukerne fra foreldregruppene – før publisering. Ikke publiser fiktive personer som ekte.)*

**Testimonial 1:**
> «Jeg brukte halve første trimester på å lese forumtråder fra 2014. Nå skanner jeg i butikken og er ferdig med det. Det er den eneste appen jeg har anbefalt uoppfordret i barselgruppa.»
> **Ingrid, 31 – Oslo, gravid i uke 24**
> Foto: naturlig portrett i dagslys, hjemmemiljø, ekte og uposert (ikke stockfoto-glatt).

**Testimonial 2:**
> «Som ammende var jeg mest usikker på medisiner og kosttilskudd. Expecta ga meg svar med kilder jeg kunne vise til helsestasjonen – og de var like imponert som meg.»
> **Silje, 28 – Trondheim, mamma til Ella (4 mnd)**
> Foto: mor med baby på armen, kjøkkenbenk-setting, varmt lys.

**Testimonial 3 (fagperson – gir faglig tyngde):**
> «Jeg får de samme spørsmålene hver eneste dag: 'Kan jeg spise dette? Kan jeg smøre meg med dette?' At kvinnene kommer med kildebaserte svar i stedet for forumråd, gjør samtalene våre bedre.»
> **Marte, jordmor – Bergen**
> Foto: profesjonelt, men vennlig portrett; gjerne i arbeidsklær uten identifiserbar arbeidsgiver.

**Alternativ social proof (velg det som er reelt tilgjengelig ved lansering):**
- **Betaresultat-boks:** «I pilotgruppen med 50 mødre: 9 av 10 sa Expecta reduserte bekymringen i hverdagen» *(bytt med reelle måltall)*.
- **UGC-stripe:** Innebygde TikTok/Instagram-klipp der brukere viser et skann («kan gravide spise denne?»-formatet) – matcher GTM-strategien med Reels/TikTok.
- **Presseomtale:** plasser for logoer (Babyverden, KK, Foreldre & Barn) når omtale finnes – tom seksjon skjules til da.

---

## 7. PRISSEKSJON

**Seksjonsoverskrift:**
> **Mindre enn en pose vitaminer i måneden**

**Ingress:** Last ned gratis og prøv. Oppgrader når du vil ha ubegrenset trygghet – avslutt når som helst.

**Pristabell (3 kort, midterste fremhevet med «Mest valgt»-badge):**

| | **Gratis** | **Expecta+** ⭐ Mest valgt | **Hele reisen** |
|---|---|---|---|
| **Pris** | 0 kr | **79 kr/mnd** | **849 kr én gang** |
| **Innhold** | 5 skann per uke · grunnleggende vurderinger | Ubegrenset skanning · trimester-tilpassede svar · ammemodus · trygghetsliste med varsler · fotoskann av ingredienslister | Alt i Expecta+ · gjelder hele svangerskapet + 12 mnd amming · uansett hvor lang reisen blir |
| **CTA** | «Last ned gratis» | «Prøv 14 dager gratis» | «Kjøp én gang – ferdig» |
| **Passer for** | Deg som vil teste med varene du lurer mest på | Deg som vil slippe å tenke på det – de fleste velger denne | Deg som hater abonnementer og vil betale én gang |

**Detaljer:**
- Betaling via App Store, Google Play eller **Vipps**.
- Under tabellen: «14 dager gratis prøvetid på Expecta+ · Ingen binding · Avslutt med to trykk».
- Mikrocopy ved «Hele reisen»: «Blir det baby nummer to? Da aktiverer du på nytt med rabatt.» (bygger på gjenbruks-/anbefalingsmekanikken i forretningsmodellen).

---

## 8. FAQ-SEKSJON

**Seksjonsoverskrift:**
> **Det lurer alle på**

**Layout:** Accordion, ett spørsmål åpent om gangen. Skjemamarkup (FAQPage schema.org) for SEO.

1. **Kan jeg stole på svarene?**
   Hvert svar bygger på medisinske databaser og norske retningslinjer – blant annet Helsedirektoratets kostråd, Matportalen og Felleskatalogen – og du ser alltid kildene rett under vurderingen. Der forskningen er usikker, sier vi det tydelig og anbefaler forsiktighet fremfor å gjette. Vi overdriver aldri sikkerhet for å gi deg et «hyggeligere» svar.

2. **Erstatter Expecta legen eller jordmoren min?**
   Nei – og det skal den ikke. Expecta er et informasjonsverktøy som gir deg kunnskapsgrunnlaget der og da. Bruker du medisiner fast, eller har en risikograviditet, skal du alltid avklare med lege eller jordmor. Mange brukere tar med seg Expecta-svaret *inn* i de samtalene.

3. **Hvorfor koster det penger?**
   Fordi kunnskapen ikke står stille. Retningslinjer oppdateres, nye studier kommer, og produkter endrer innhold. Abonnementet betaler for at basen vedlikeholdes løpende – og for at det aldri kommer annonser eller sponsede «anbefalinger» mellom deg og svaret.

4. **Hva om produktet ikke finnes i basen?**
   Da tar du bilde av ingredienslisten, så tolker Expecta den direkte. Samtidig lærer basen: produkter som skannes ofte, prioriteres først. Basen er bygget rundt norske varer og vokser for hver bruker.

5. **Følger dere norske eller amerikanske råd?**
   Norske. Rådene fra amerikanske nettsider avviker på flere punkter fra Helsedirektoratets anbefalinger – det er nettopp derfor googling gjør deg mer forvirret. Der norske retningslinjer ikke dekker en ingrediens, bruker vi anerkjente internasjonale kilder og merker det tydelig.

6. **Hva skjer med dataene mine?**
   Skannehistorikken din er din. Data lagres i EU/EØS i tråd med GDPR, selges aldri videre, og du kan slette alt med ett trykk i appen. Du trenger ikke oppgi mer enn termindato for å få tilpassede svar.

7. **Kan jeg bruke den etter fødselen?**
   Ja – det er halve poenget. Ammemodusen bruker egne grenseverdier for ammeperioden, og trygghetslisten din blir med videre. Og blir det flere barn, ligger alt klart til neste gang.

---

## 9. SISTE CTA-SEKSJON

**Layout:** Fullbredde-seksjon i mørk plommefarge (`#4A2545`), hvit tekst, sentrert. Telefon-mockup til høyre på desktop. Dette er sidens emosjonelle avslutning – rolig, ikke masete.

**Overskrift:**
> **Neste gang du står ved hyllen og lurer – ha svaret i lomma.**

**Støttetekst:**
> Du kommer til å lure på hundrevis av produkter før termin. Du kan google hver eneste gang – eller skanne og gå videre med dagen. Last ned gratis og prøv med det første produktet du lurer på.

**CTA-knapp:** **«Last ned Expecta gratis»** (hvit knapp, plommefarget tekst) + App Store/Google Play-badges + QR-kode på desktop (skann med mobilen → rett til app-butikken).

**Risikoreduksjon (linje under knappen):**
> Gratis å laste ned · 14 dager gratis prøvetid på Expecta+ · Ingen binding – avslutt med to trykk

**Sekundær CTA (tekstlenke):**
> «Ikke gravid ennå, men kjenner noen som er? [Send dem siden →]» *(delingslenke – matcher munn-til-munn-mekanikken i vekststrategien)*

---

## 10. FOOTER

**Layout:** 4 kolonner på desktop, stablet på mobil. Lys bakgrunn, diskret.

- **Kolonne 1 – Expecta:** Logo, én linje: «Trygghetssvar for gravide og ammende – bygget på medisinske kilder.» Org.nr. og firmanavn. E-post: hei@expecta.no.
- **Kolonne 2 – Produkt:** Slik virker det · Priser · FAQ · Last ned (App Store / Google Play).
- **Kolonne 3 – Ressurser:** Gratis guide: «Trygg gjennom svangerskapet» (lead magnet, e-postinnsamling) · Blogg/kunnskapsbase (SEO: «kan gravide spise …»-artikler) · For jordmødre og helsepersonell (fremtidig B2B-spor).
- **Kolonne 4 – Juridisk & sosialt:** Personvernerklæring · Vilkår · Informasjonskapsler · Instagram · TikTok · Facebook.

**Disclaimer (full bredde, liten grå tekst nederst):**
> Expecta er et informasjonsverktøy og gir generell, kildebasert informasjon. Appen er ikke medisinsk utstyr og erstatter ikke helsefaglig rådgivning fra lege, jordmor eller helsestasjon. Kontakt alltid helsepersonell ved medisinske spørsmål.

---

## COPY-RETNINGSLINJER

- **Tone:** Rolig, varm og voksen. Som en kunnskapsrik venninne som har lest studiene – aldri belærende, aldri skremmende. Bekymringen anerkjennes («du lurer et titalls ganger om dagen»), men siden selger *ro*, ikke frykt. Forbudt: skremselsbilder, «visste du at X kan skade babyen din»-vinklinger, utropstegn i faglige påstander.
- **Språk:** Bokmål. Du-form. Korte setninger. 8.-klassenivå – ingen medisinske faguttrykk uten forklaring i samme setning.
- **SEO-nøkkelord (flettes naturlig inn i overskrifter, brødtekst og FAQ):** «trygt under graviditet», «kan gravide spise», «trygg hudpleie gravid», «medisiner og amming», «gravid app», «koffein gravid», «ingredienser gravide bør unngå». FAQ-en og bloggen bærer long-tail-trafikken («kan gravide spise brie», «er retinol farlig for gravide»).
- **Skannbarhet:** Maks 3 linjer per avsnitt. Punktlister med ikon. Én tanke per seksjon. Alle seksjonsoverskrifter skal gi mening lest alene (mange leser bare overskriftene).
- **Ærlighet:** Alle tall, sitater og resultater merket *(plassholder)* i dette dokumentet skal byttes ut med reelle data før publisering – aldri publiser fiktive brukertall eller testimonials som ekte.

## TEKNISKE NOTATER

- **Mobile-first:** 70–85 % av trafikken kommer fra mobil (Instagram/TikTok-annonser og foreldrefora). Design mobilskjermen først; desktop er tilpasningen. CTA-en «Last ned gratis» skal alltid være maks ett scroll unna (sticky bunn-CTA på mobil etter 50 % scroll).
- **Ytelse:** Hero uten video som standard (statisk mockup, WebP/AVIF, < 120 kB). Eventuell demo-video lazy-lastes under folden. Mål: LCP < 2,0 s på 4G, CLS ≈ 0.
- **App-nedlasting:** Smart deep-link (én lenke som ruter til riktig app-butikk). QR-kode kun på desktop-visning.
- **Skjema/lead magnet:** Guide-nedlasting («Trygg gjennom svangerskapet») krever kun e-post – dette er bait-steget i verdistigen og fanger dem som ikke laster ned appen i dag.
- **SEO-teknisk:** FAQPage-schema på FAQ, AppSoftware-schema på produktet, norsk `lang="nb"`, meta-tittel: «Expecta – Er det trygt? Skann produktet og få svar | For gravide og ammende».
- **Sporing:** Hendelser for CTA-klikk per seksjon, scrolldybde, pristabell-interaksjon og FAQ-åpninger. Samtykkebanner iht. norsk praksis (Datatilsynet) – ingen sporing før samtykke.

### A/B-tester (prioritert rekkefølge)
1. **H1:** «Er det trygt? Skann og få svar.» vs. «Slutt å google. Begynn å skanne.» vs. «Ett skann. Ett svar. Ro i magen.»
2. **Hero-visual:** statisk mockup vs. 12 sek skanne-loop.
3. **Primær-CTA:** «Last ned Expecta gratis» vs. «Skann ditt første produkt gratis».
4. **Prisanker:** månedspris fremhevet vs. «Hele reisen»-engangskjøp fremhevet.
5. **Social proof i hero:** stjernerating vs. brukersitat vs. antall skann utført.

### Designsystem (kort)
- **Farger:** Bunn: varm off-white `#FAF7F4`. Primær: plomme `#4A2545`. Verdikt-farger: grønn `#2E7D5B`, gul `#C98A00`, rød `#B4453A` (dempet – aldri alarmrød). Aksent: fersken `#F4C7B0`.
- **Typografi:** Rund, vennlig sans-serif med god lesbarhet (f.eks. «Fraunces» for overskrifter + «Inter» for brødtekst). Minimum 17 px brødtekst på mobil.
- **Bildestil:** Ekte, nordisk hverdag – butikkhyller, kjøkkenbenker, dagslys. Ingen glansede amerikanske stockfotos.
