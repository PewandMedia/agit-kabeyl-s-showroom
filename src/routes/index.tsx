import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, CreditCard, Handshake, UserRound } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VehicleCard } from "@/components/site/VehicleCard";
import { HighlightFlyerCard } from "@/components/site/HighlightFlyerCard";
import { BtnLink, BtnA } from "@/components/ui/Btn";
import { featuredVehicles, vehicles } from "@/data/vehicles";
import { dealer, telLink, whatsappLink } from "@/data/dealer";
import heroCar from "@/assets/hero-car.jpg";
import championHero from "@/assets/hero-kabayel-bmw7.jpg";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${dealer.legalName} — Gebrauchtwagen in ${dealer.city}` },
      {
        name: "description",
        content:
          "Geprüfte Gebrauchtwagen, ehrliche Beratung und faire Konditionen in Velbert. Verkauf, Ankauf und Finanzierung aus einer Hand.",
      },
      { property: "og:title", content: `${dealer.legalName} — Gebrauchtwagen in ${dealer.city}` },
      {
        property: "og:description",
        content:
          "Geprüfte Gebrauchtwagen, ehrliche Beratung, Finanzierung und Ankauf in Velbert.",
      },
      { property: "og:image", content: heroCar },
      { name: "twitter:image", content: heroCar },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout transparentHeader>
      <Hero />
      <TrustBar />
      <Highlights />
      <SellCar />
      <Financing />
      <FAQ />
      <ContactCTA />
    </SiteLayout>
  );
}

/* ─────────────────────────── HERO — Cinematic Champion Edition ─────────────────────────── */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      {/* Radial spotlight backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 600px at 80% 20%, color-mix(in oklab, var(--color-champagne) 12%, transparent), transparent 60%), radial-gradient(700px 500px at 10% 80%, color-mix(in oklab, var(--color-ink) 6%, transparent), transparent 65%)",
        }}
      />

      <div className="mx-auto grid min-h-[88vh] max-w-[1440px] grid-cols-1 items-center gap-10 px-6 pb-20 pt-28 md:grid-cols-12 md:gap-14 md:px-12 md:pb-28 md:pt-32">
        {/* LEFT — Cinematic image */}
        <div className="relative md:col-span-5 lg:col-span-5">
          <div className="group relative aspect-[4/5] w-full overflow-hidden bg-ink">
            <img
              src={championHero}
              alt="Agit Kabayel · WBC #1 Contender mit seinem BMW 7er im Showroom — Symbolbild"
              width={1024}
              height={1280}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
            />
            {/* Vignette overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--color-paper) 80%, transparent) 100%), linear-gradient(90deg, color-mix(in oklab, var(--color-paper) 40%, transparent) 0%, transparent 35%)",
              }}
            />

            {/* Top corner badge */}
            <div className="absolute left-5 top-5 flex items-center gap-2.5 border border-champagne/60 bg-paper/70 px-3 py-2 backdrop-blur-sm">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-champagne" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">
                Verkauf · Ankauf
              </span>
            </div>

            {/* Bottom caption */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <div className="font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-champagne">
                Velbert · seit 2018
              </div>
              <div className="mt-1 font-display text-2xl font-extrabold text-ink md:text-3xl">
                Autohaus AK
              </div>
            </div>

            {/* Corner crosshair marks */}
            <span aria-hidden className="absolute right-5 top-5 h-3 w-3 border-r border-t border-champagne/70" />
            <span aria-hidden className="absolute bottom-5 right-5 h-3 w-3 border-b border-r border-champagne/70" />
          </div>
        </div>


        {/* RIGHT — Story */}
        <div className="md:col-span-7 lg:col-span-7">
          <div className="flex items-center gap-3 animate-fade-up">
            <span className="h-px w-10 bg-champagne" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne">
              Autohaus AK · {dealer.city}
            </span>
          </div>

          <h1 className="mt-7 font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl md:text-7xl lg:text-[84px] animate-fade-up">
            Geprüfte
            <br />
            Gebrauchtwagen
            <br />
            aus <span className="text-champagne">Velbert.</span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg animate-fade-up">
            Persönlich ausgewählt, geprüft und transparent dokumentiert.
            Verkauf, Ankauf und Finanzierung aus einer Hand.
          </p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6 animate-fade-up">
            <BtnLink to="/fahrzeuge" variant="primary" size="lg">
              Fahrzeuge ansehen
            </BtnLink>
            <BtnLink to="/ueber-uns" variant="ghost" arrow>
              Story lesen
            </BtnLink>
          </div>

          {/* Stat strip */}
          <dl className="mt-14 grid grid-cols-3 gap-px overflow-hidden border border-line bg-line">
            <Stat label="Bestand" value={String(vehicles.length).padStart(2, "0")} />
            <Stat label="Standort" value="Velbert" />
            <Stat label="Garantie" value="12 Mt." />
          </dl>
        </div>
      </div>

      {/* Quiet bottom rule replaces the marquee for a more serious tone */}
      <div className="border-t border-line" aria-hidden />
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-5 py-5 md:px-6 md:py-6">
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-ink-soft">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-extrabold leading-none text-champagne md:text-4xl">
        {value}
      </div>
    </div>
  );
}

/* ─────────────────────── TRUST BAR (compact) ─────────────────────── */
const TRUSTS = [
  { label: "Geprüft", value: "Eigene Eingangsprüfung", Icon: ShieldCheck },
  { label: "Finanzierung", value: "Auf Wunsch", Icon: CreditCard },
  { label: "Ankauf", value: "Faire Bewertung", Icon: Handshake },
  { label: "Persönlich", value: "Direkter Ansprechpartner", Icon: UserRound },
] as const;

function TrustBar() {
  return (
    <section className="border-y border-champagne/15 bg-surface">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-line md:grid-cols-4">
        {TRUSTS.map(({ label, value, Icon }) => (
          <div key={label} className="group flex flex-col gap-5 bg-surface px-8 py-12 transition-colors duration-500 hover:bg-surface-2 md:py-16">
            <div className="text-champagne">
              <Icon size={28} strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <div className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-champagne">
                {t.label}
              </div>
              <div className="mt-3 font-display text-xl font-bold leading-tight text-ink md:text-2xl">
                {t.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ────────────────────── BRAND STORY ────────────────────── */
function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-40">

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="kicker">Unser Anspruch</p>
            <p className="mt-4 font-serif text-xl text-ink-soft">
              Auswahl, Prüfung, Übergabe — sauber gemacht.
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-3xl leading-[1.18] text-ink sm:text-4xl md:text-[44px]">
              Wir kaufen nicht nach Stückzahl, sondern nach Zustand.
              Jedes Fahrzeug, das bei uns steht, hat eine Geschichte,
              die wir kennen —{" "}
              <span className="text-gradient-gold">und vertreten.</span>
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Eingangsprüfung, Aufbereitung und vollständige Dokumentation
              gehören für uns zum Standard, nicht zum Extra. Sie kaufen ein
              Fahrzeug, das wir verantworten können.
            </p>
            <div className="mt-10">
              <Link
                to="/ueber-uns"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-champagne hover:text-ink"
              >
                Über uns <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── HIGHLIGHTS ───────────────────── */
function Highlights() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-champagne">
              Aus unserem Bestand
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Aktuelle <span className="text-champagne">Auswahl</span>
            </h2>
          </div>
          <Link
            to="/fahrzeuge"
            className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-champagne transition-opacity hover:opacity-70 md:inline-flex"
          >
            Gesamten Bestand ansehen →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {featuredVehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} priority={i < 2} />
          ))}
        </div>


        <div className="mt-10 md:hidden">
          <Link
            to="/fahrzeuge"
            className="block w-full border border-champagne/40 py-4 text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-champagne"
          >
            Alle Fahrzeuge ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── INVENTORY TEASER ───────────────────── */
function Inventory() {
  const rest = vehicles.slice(3, 5);
  if (rest.length === 0) return null;
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="kicker">Bestand</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Aus unserem Bestand.
            </h2>
            <p className="mt-6 text-base text-ink-soft">
              Jedes Fahrzeug persönlich ausgewählt, geprüft und transparent
              dokumentiert.
            </p>
            <Link
              to="/fahrzeuge"
              className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-champagne hover:text-ink"
            >
              Zum kompletten Bestand →
            </Link>
          </div>
          <div className="md:col-span-8 grid gap-10 sm:grid-cols-2">
            {rest.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── SELL CAR TEASER ───────────────────── */
function SellCar() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-7">
            <p className="kicker">Ankauf</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
              Wir kaufen Ihr Fahrzeug —{" "}
              <span className="text-gradient-gold">fair und sofort.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Faire Bewertung, schnelle Abwicklung, sofortige Zahlung. Egal ob
              Marke, Alter oder Kilometer — wir machen Ihnen ein realistisches
              Angebot.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {[
                "Bewertung innerhalb eines Termins",
                "Sofortige Auszahlung möglich",
                "Übernahme aller Formalitäten",
                "Marken- und modellübergreifend",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-px w-4 bg-champagne" />
                  <span className="text-ink">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/auto-verkaufen"
                className="inline-flex items-center justify-center bg-ink px-7 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
              >
                Angebot anfordern
              </Link>
              <a
                href={whatsappLink(`Hallo ${dealer.shortName}, ich möchte mein Fahrzeug verkaufen.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-ink/40 px-7 py-4 text-xs uppercase tracking-[0.22em] text-ink hover:border-ink"
              >
                Direkt per WhatsApp
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="glass p-8 md:p-10">
              <p className="kicker">Schnellbewertung</p>
              <p className="mt-4 font-serif text-2xl leading-snug text-ink">
                Schicken Sie uns Marke, Modell, Baujahr und Laufleistung — wir
                melden uns mit einer ersten Hausnummer zurück.
              </p>
              <div className="mt-8 space-y-4 text-sm text-ink-soft">
                <Step n="01" text="Fahrzeugdaten senden" />
                <Step n="02" text="Bewertung innerhalb 24 h" />
                <Step n="03" text="Persönlicher Termin in Velbert" />
                <Step n="04" text="Sofortige Übernahme & Auszahlung" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-line pb-3 last:border-0">
      <span className="font-serif text-2xl text-champagne">{n}</span>
      <span className="text-ink">{text}</span>
    </div>
  );
}

/* ───────────────────── FINANCING TEASER ───────────────────── */
function Financing() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="kicker">Finanzierung</p>
            {/* Alt: „Konditionen, die zu Ihnen passen." */}
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Finanzierung, die passt.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
              Transparente Konditionen, individuelle Laufzeiten und schnelle
              Zusagen — über etablierte Partnerbanken. Rate berechnen oder
              direkt anfragen.
            </p>
            <div className="mt-10">
              <Link
                to="/finanzierung"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-champagne hover:text-ink"
              >
                Rate berechnen →
              </Link>
            </div>
          </div>
          <div className="md:col-span-7 grid gap-6 sm:grid-cols-3">
            {[
              { v: "12–84 Mt.", l: "Laufzeit flexibel" },
              { v: "Individuell", l: "Anzahlung wählbar" },
              { v: "Schnell", l: "Zusage über Partnerbank" },
            ].map((s) => (
              <div key={s.l} className="glass p-6">
                <p className="font-serif text-3xl text-champagne md:text-4xl">{s.v}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── WHY AK ───────────────────── */
const WHY = [
  {
    n: "01",
    title: "Geprüft.",
    body: "Jedes Fahrzeug durchläuft eine eigene Eingangsprüfung, bevor es bei uns steht.",
  },
  {
    n: "02",
    title: "Gepflegt.",
    body: "Aufbereitung, Service und Dokumentation sind Standard — nicht Extra.",
  },
  {
    n: "03",
    title: "Persönlich.",
    body: "Sie sprechen mit Menschen, die ihre Fahrzeuge kennen. Keine Hotline.",
  },
  {
    n: "04",
    title: "Direkt.",
    body: "WhatsApp, Telefon, Termin vor Ort — Sie wählen, was schneller geht.",
  },
];

function WhyAK() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-32">
        <div className="max-w-2xl">
          <p className="kicker">Warum Autohaus AK</p>
          {/* Alt: „Vier Gründe, mit uns zu sprechen." */}
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Was Sie bei uns erwartet.
          </h2>
        </div>
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="bg-paper p-8 md:p-10">
              <p className="kicker">{w.n}</p>
              <h3 className="mt-6 font-serif text-2xl text-ink md:text-3xl">
                {w.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── TESTIMONIALS ───────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "Persönliche Beratung von der ersten Minute. Das Auto wurde tipptopp übergeben.",
    name: "M. Yildiz",
    detail: "Käufer, Velbert",
  },
  {
    quote:
      "Faire Inzahlungnahme, ehrlicher Umgang, alles in einem Termin geklärt.",
    name: "S. Hoffmann",
    detail: "Käuferin, Essen",
  },
  {
    quote: "Hier passt einfach das ganze Auftreten. Premium, ohne abgehoben zu sein.",
    name: "D. Becker",
    detail: "Käufer, Wuppertal",
  },
];

function Testimonials() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-32">
        <p className="kicker">Stimmen</p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl text-ink md:text-5xl">
          Was unsere Kunden sagen.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="glass p-8 md:p-10">
              <span aria-hidden className="font-serif text-5xl leading-none text-champagne">
                "
              </span>
              <blockquote className="mt-4 font-serif text-xl leading-snug text-ink md:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-4 text-xs uppercase tracking-[0.18em] text-ink-soft">
                {t.name} · {t.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── FAQ ───────────────────── */
const FAQS = [
  {
    q: "Sind alle Fahrzeuge geprüft?",
    a: "Ja. Jedes Fahrzeug durchläuft eine Eingangsprüfung, wird aufbereitet und mit lückenloser Historie übergeben.",
  },
  {
    q: "Kann ich mein aktuelles Fahrzeug in Zahlung geben?",
    a: "Ja. Wir bewerten Ihr Fahrzeug im gleichen Termin und rechnen den Wert direkt auf den Kaufpreis an.",
  },
  {
    q: "Bietet das Autohaus AK GmbH Finanzierung an?",
    a: "Ja. Wir arbeiten mit bewährten Partnerbanken und können in den meisten Fällen am selben Tag eine Indikation geben.",
  },
  {
    q: "Liefern Sie deutschlandweit?",
    a: "Auf Wunsch ja. Wir koordinieren Überführung oder Lieferung zu klaren Konditionen.",
  },
  {
    q: "Wie schnell antworten Sie auf eine Anfrage?",
    a: "In der Regel innerhalb weniger Stunden — am schnellsten per WhatsApp oder Telefon.",
  },
];

function FAQ() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-4">
            <p className="kicker">FAQ</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Häufige Fragen.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                  <span className="font-serif text-xl text-ink md:text-2xl">
                    {f.q}
                  </span>
                  <span className="font-serif text-3xl text-champagne transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── CONTACT CTA ───────────────────── */
function ContactCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:items-end md:gap-20">
          <div className="md:col-span-7">
            <p className="kicker">Direktkontakt</p>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl lg:text-7xl">
              Sprechen wir über
              <br />
              <span className="text-champagne">Ihr nächstes Fahrzeug.</span>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-ink/80 md:text-lg">
              Kauf, Verkauf, Finanzierung oder ein kurzer Rückruf — wählen Sie
              den Weg, der für Sie am schnellsten ist.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
              <BtnLink to="/kontakt" variant="primary" size="lg">
                Anfrage senden
              </BtnLink>
              <BtnA href={telLink()} variant="ghost">
                {dealer.phoneDisplay}
              </BtnA>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="border-l border-champagne/40 pl-8 md:pl-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-champagne">
                Vor Ort
              </p>
              <p className="mt-4 font-display text-xl leading-snug text-ink">
                {dealer.legalName}<br />
                {dealer.street}<br />
                {dealer.postalCode} {dealer.city}
              </p>
              <a
                href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-champagne hover:text-ink transition-colors"
              >
                Oder direkt per WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

