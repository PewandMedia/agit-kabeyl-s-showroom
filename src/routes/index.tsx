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
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-paper text-ink grain">
      <img
        src={heroCar}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-paper/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/40" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-between px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-champagne" />
            <p className="kicker">Autohaus AK GmbH · {dealer.city}</p>
          </div>
          <h1 className="mt-7 font-serif text-[44px] leading-[1.02] text-ink sm:text-6xl md:text-7xl lg:text-[88px]">
            Champion-Mentalität.<br />
            <span className="text-gradient-gold">Premium-Fahrzeuge.</span><br />
            Ehrlicher Service.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            {dealer.subclaim}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center justify-center bg-ink px-7 py-4 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-opacity hover:opacity-90"
            >
              Fahrzeuge ansehen
            </Link>
            <Link
              to="/auto-verkaufen"
              className="inline-flex items-center justify-center border border-champagne/60 px-7 py-4 text-xs font-medium uppercase tracking-[0.22em] text-champagne transition-colors hover:bg-champagne hover:text-paper"
            >
              Auto verkaufen
            </Link>
            <a
              href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Frage.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-ink/30 px-7 py-4 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:border-ink"
            >
              WhatsApp-Anfrage
            </a>
          </div>
        </div>

        <div className="mt-16 hidden grid-cols-3 gap-8 border-t border-line pt-8 md:grid">
          <Stat label="Standort" value={dealer.city} />
          <Stat label="Verkauf · Ankauf" value="Persönlich vor Ort" />
          <Stat label="Direkt erreichbar" value={dealer.phoneDisplay} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="kicker">{label}</p>
      <p className="mt-2 font-serif text-xl text-ink md:text-2xl">{value}</p>
    </div>
  );
}

/* ─────────────────────── TRUST BAR ─────────────────────── */
const TRUSTS = [
  "Geprüfte Fahrzeuge",
  "Finanzierung möglich",
  "Inzahlungnahme",
  "Schnelle Abwicklung",
  "Persönliche Beratung",
  "Direkter WhatsApp-Kontakt",
];

function TrustBar() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          {TRUSTS.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-champagne md:inline-block" />}
              <span>{t}</span>
            </span>
          ))}
        </div>
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
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker">Auswahl</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Aktuelle Highlights.
            </h2>
          </div>
          <Link
            to="/fahrzeuge"
            className="hidden text-xs uppercase tracking-[0.22em] text-ink-soft transition-colors hover:text-ink md:inline-flex"
          >
            Alle ansehen →
          </Link>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3">
          {featuredVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Link
            to="/fahrzeuge"
            className="block w-full border border-ink/40 py-4 text-center text-xs uppercase tracking-[0.22em] text-ink"
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
