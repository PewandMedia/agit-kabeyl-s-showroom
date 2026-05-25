import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VehicleCard } from "@/components/site/VehicleCard";
import { featuredVehicles, vehicles } from "@/data/vehicles";
import { dealer, telLink, whatsappLink } from "@/data/dealer";
import heroCar from "@/assets/hero-car.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${dealer.legalName} — Premium-Fahrzeuge in ${dealer.city}` },
      {
        name: "description",
        content:
          "Autohaus AK GmbH in Velbert. Champion-Mentalität, geprüfte Premium-Fahrzeuge, faire Konditionen und persönliche Beratung. Direktkontakt per WhatsApp.",
      },
      { property: "og:title", content: `${dealer.legalName} — Premium-Fahrzeuge in ${dealer.city}` },
      { property: "og:description", content: "Champion-Mentalität. Premium-Fahrzeuge. Ehrlicher Service." },
      { property: "og:image", content: heroCar },
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
      <BrandStory />
      <Highlights />
      <Inventory />
      <SellCar />
      <Financing />
      <WhyAK />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </SiteLayout>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-20 md:pt-32">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 pb-12 md:grid-cols-2 md:gap-12 md:px-10 md:pb-24 lg:items-stretch">
        {/* LEFT — Headline */}
        <div className="flex animate-fade-up flex-col justify-between md:py-12">
          <div className="space-y-5 md:space-y-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-champagne" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.4em] text-champagne">
                Premium-Fahrzeuge · Velbert
              </span>
            </div>
            <h1 className="font-display text-[40px] font-extrabold leading-[0.95] tracking-tighter text-ink sm:text-6xl md:text-7xl lg:text-[88px]">
              Champion-<wbr />
              <span className="text-champagne">Mentalität.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              Geprüfte Premium-Fahrzeuge, transparente Daten,
              kompromisslosen Service — direkt von {dealer.legalName}.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 md:flex md:flex-wrap">
            <Link
              to="/fahrzeuge"
              className="inline-flex min-h-[56px] items-center justify-center bg-champagne px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-paper transition-colors md:px-8 md:py-5 md:text-[10px] md:tracking-[0.3em] md:hover:bg-ink md:hover:text-paper"
            >
              Bestand ansehen
            </Link>
            <a
              href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center justify-center border border-champagne/50 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink md:hidden"
            >
              WhatsApp
            </a>
            <Link
              to="/auto-verkaufen"
              className="hidden md:inline-flex md:items-center md:justify-center md:border md:border-champagne/40 md:px-8 md:py-5 md:font-mono md:text-[10px] md:font-bold md:uppercase md:tracking-[0.3em] md:text-ink md:transition-colors md:duration-500 md:hover:border-champagne md:hover:text-champagne"
            >
              Ankauf-Portal
            </Link>
          </div>
        </div>

        {/* RIGHT — Cinematic image + data overlays */}
        <div className="relative h-[280px] overflow-hidden border border-champagne/15 bg-surface p-2 md:h-auto md:min-h-[560px]">
          <img
            src={heroCar}
            alt=""
            width={1200}
            height={1500}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-90 md:opacity-55 md:mix-blend-luminosity md:transition-all md:duration-1000 md:hover:opacity-70 md:hover:mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/70 via-paper/10 to-transparent md:bg-gradient-to-tr md:from-paper/80" />

          {/* Bottom data panels — Desktop only */}
          <div className="absolute inset-x-0 bottom-0 hidden grid-cols-2 gap-3 p-6 md:grid md:p-8">
            <DataPanel label="Available Units" value={String(vehicles.length).padStart(2, "0")} />
            <DataPanel label="Quality Score" value="99,8 %" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DataPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-champagne bg-paper/80 p-4 backdrop-blur-md">
      <div className="font-mono text-[9px] uppercase tracking-widest text-ink-soft opacity-70">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl font-extrabold text-ink">{value}</div>
    </div>
  );
}


/* ─────────────────────── TRUST BAR ─────────────────────── */
const TRUSTS: { label: string; value: string }[] = [
  { label: "Geprüft", value: "110-Punkte Check" },
  { label: "Finanzierung", value: "ab 3,99 % p.a." },
  { label: "Ankauf", value: "24 h Auszahlung" },
  { label: "Persönlich", value: "WhatsApp < 15 min" },
];

function TrustBar() {
  return (
    <section className="border-y border-champagne/15 bg-surface">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-line md:grid-cols-4">
        {TRUSTS.map((t) => (
          <div key={t.label} className="bg-surface px-6 py-8 text-center md:py-10">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">
              {t.label}
            </div>
            <div className="mt-3 font-display text-base font-bold text-ink md:text-lg">
              {t.value}
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
    <section className="relative overflow-hidden bg-paper grain">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="kicker">Marke AK</p>
            <p className="mt-4 font-serif text-xl text-ink-soft">
              Gebaut mit dem Anspruch eines Champions.
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-3xl leading-[1.18] text-ink sm:text-4xl md:text-[44px]">
              Wer Nummer 1 sein will, akzeptiert keine Abkürzungen.
              Jede Prüfung, jede Aufbereitung, jedes Gespräch
              folgt einem klaren Standard —{" "}
              <span className="text-gradient-gold">dem höchsten.</span>
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Autohaus AK GmbH steht für die Werte einer Marke, die Disziplin,
              Qualität und Verantwortung lebt. Wir verkaufen keine Stückzahl —
              wir verkaufen Vertrauen.
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
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-champagne">
              Selected Inventory
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Current / <span className="text-champagne">Selection</span>
            </h2>
          </div>
          <Link
            to="/fahrzeuge"
            className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-champagne transition-opacity hover:opacity-70 md:inline-flex"
          >
            Browse System [01–{String(vehicles.length).padStart(2, "0")}] →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
          {featuredVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
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
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
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
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
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
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="kicker">Finanzierung</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Champion-Konditionen.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
              Transparente Konditionen, individuelle Lösungen, schnelle
              Zusagen — durch bewährte Partnerbanken.
            </p>
            <div className="mt-10">
              <Link
                to="/finanzierung"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-champagne hover:text-ink"
              >
                Finanzierung berechnen →
              </Link>
            </div>
          </div>
          <div className="md:col-span-7 grid gap-6 sm:grid-cols-3">
            {[
              { v: "ab 3,99%", l: "Effektivzins indikativ" },
              { v: "12–84 Mt.", l: "Laufzeit flexibel" },
              { v: "0 €", l: "Anzahlung möglich" },
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
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="max-w-2xl">
          <p className="kicker">Warum Autohaus AK GmbH</p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Standard auf höchstem Niveau.
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
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
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
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
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
    <section className="relative overflow-hidden border-t border-line bg-surface grain">
      <div className="mx-auto max-w-[1400px] px-5 py-24 text-center md:px-10 md:py-32">
        <p className="kicker">Direktkontakt</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink md:text-6xl">
          Bereit für den nächsten Schritt?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-ink-soft md:text-lg">
          Ob Kauf, Verkauf, Finanzierung oder Beratung — wir sind direkt für Sie da.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={telLink()}
            className="inline-flex items-center justify-center bg-ink px-7 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
          >
            {dealer.phoneDisplay}
          </a>
          <a
            href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-champagne/60 px-7 py-4 text-xs uppercase tracking-[0.22em] text-champagne hover:bg-champagne hover:text-paper"
          >
            WhatsApp
          </a>
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center border border-ink/30 px-7 py-4 text-xs uppercase tracking-[0.22em] text-ink hover:border-ink"
          >
            Anfrage senden
          </Link>
        </div>
      </div>
    </section>
  );
}
