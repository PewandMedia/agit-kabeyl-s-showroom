import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VehicleCard } from "@/components/site/VehicleCard";
import { featuredVehicles } from "@/data/vehicles";
import { dealer, telLink, whatsappLink } from "@/data/dealer";
import heroCar from "@/assets/hero-car.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${dealer.legalName} — Premium-Fahrzeuge in ${dealer.city}` },
      {
        name: "description",
        content:
          "Autohaus AK GmbH in Velbert — geprüfte Premium- und Gebrauchtfahrzeuge. Persönlich ausgewählt, sorgfältig aufbereitet, ehrlich verkauft.",
      },
      {
        property: "og:title",
        content: `${dealer.legalName} — Premium-Fahrzeuge in ${dealer.city}`,
      },
      {
        property: "og:description",
        content:
          "Geprüfte Premium- und Gebrauchtfahrzeuge in Velbert. Champions wählen mit Bedacht.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout transparentHeader>
      <Hero />
      <FeaturedVehicles />
      <Pillars />
      <BrandStatement />
      <Services />
      <Testimonials />
      <Location />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-ink text-paper grain">
      <img
        src={heroCar}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-between px-5 pb-12 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="max-w-3xl">
          <p className="kicker text-champagne">
            Autohaus AK GmbH · {dealer.city}
          </p>
          <h1 className="mt-6 font-serif text-[44px] leading-[1.02] text-paper sm:text-6xl md:text-7xl lg:text-[88px]">
            {dealer.claim}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/80 md:text-lg">
            {dealer.subclaim}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center justify-center bg-paper px-7 py-4 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90"
            >
              Fahrzeuge ansehen
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center border border-paper/40 px-7 py-4 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Termin vereinbaren
            </Link>
          </div>
        </div>

        <div className="mt-16 hidden grid-cols-3 gap-8 border-t border-paper/15 pt-8 md:grid">
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
      <p className="kicker text-paper/60">{label}</p>
      <p className="mt-2 font-serif text-xl text-paper md:text-2xl">{value}</p>
    </div>
  );
}

function FeaturedVehicles() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker">Auswahl</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Aktuelle Highlights
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
            className="block w-full border border-ink py-4 text-center text-xs uppercase tracking-[0.22em] text-ink"
          >
            Alle Fahrzeuge ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    title: "Geprüft.",
    body:
      "Jedes Fahrzeug durchläuft eine eigene Eingangsprüfung, bevor es bei uns steht.",
  },
  {
    title: "Gepflegt.",
    body:
      "Aufbereitung, Service und Dokumentation gehören zum Standard — nicht zum Extra.",
  },
  {
    title: "Persönlich.",
    body:
      "Sie sprechen mit Menschen, die ihre Fahrzeuge kennen. Keine Hotline, keine Weiterleitung.",
  },
];

function Pillars() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {PILLARS.map((p, i) => (
            <div key={p.title}>
              <p className="kicker">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStatement() {
  return (
    <section className="relative bg-ink text-paper grain">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="kicker text-champagne">Marke AK</p>
          </div>
          <div className="md:col-span-9">
            <p className="font-serif text-3xl leading-[1.18] text-paper sm:text-4xl md:text-[44px]">
              Autohaus AK GmbH steht für die Werte einer Marke, die Disziplin,
              Qualität und Verantwortung lebt. Wir verkaufen keine Stückzahl —{" "}
              <span className="text-champagne">wir verkaufen Vertrauen.</span>
            </p>
            <div className="mt-12">
              <Link
                to="/ueber-uns"
                className="inline-flex items-center text-xs uppercase tracking-[0.22em] text-paper/80 transition-colors hover:text-paper"
              >
                Mehr über uns →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { title: "Verkauf", body: "Geprüfte Premium- und Gebrauchtfahrzeuge." },
  { title: "Ankauf", body: "Faire Bewertung, schnelle Abwicklung, sofortige Zahlung." },
  { title: "Inzahlungnahme", body: "Ihr aktuelles Fahrzeug fließt direkt in den Kauf ein." },
  { title: "Finanzierung", body: "Transparente Konditionen, individuelle Lösungen." },
];

function Services() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="max-w-2xl">
          <p className="kicker">Leistungen</p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Mehr als Verkauf.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
            Wir begleiten Sie vom ersten Gespräch bis zur Übergabe — und darüber
            hinaus.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="flex flex-col bg-paper p-8 transition-colors hover:bg-secondary md:p-10"
            >
              <p className="kicker">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 font-serif text-2xl text-ink md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/leistungen"
            className="inline-flex items-center text-xs uppercase tracking-[0.22em] text-ink-soft transition-colors hover:text-ink"
          >
            Alle Leistungen →
          </Link>
        </div>
      </div>
    </section>
  );
}

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
    quote:
      "Hier passt einfach das ganze Auftreten. Premium, ohne abgehoben zu sein.",
    name: "D. Becker",
    detail: "Käufer, Wuppertal",
  },
];

function Testimonials() {
  return (
    <section className="border-t border-line bg-secondary">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <p className="kicker">Stimmen</p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl text-ink md:text-5xl">
          Was unsere Kunden sagen.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <span aria-hidden className="font-serif text-5xl leading-none text-champagne">
                “
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

function Location() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="kicker">Standort</p>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Sie finden uns in {dealer.city}.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg">
              Kommen Sie vorbei, machen Sie eine Probefahrt — oder schreiben Sie
              uns kurz per WhatsApp.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="kicker">Adresse</p>
                <p className="mt-2 text-base text-ink">
                  {dealer.street}<br />
                  {dealer.postalCode} {dealer.city}
                </p>
              </div>
              <div>
                <p className="kicker">Öffnungszeiten</p>
                <div className="mt-2 space-y-1 text-sm text-ink">
                  {dealer.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-6 border-b border-line pb-1 max-w-xs">
                      <span>{h.day}</span>
                      <span className="text-ink-soft">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={telLink()}
                className="inline-flex items-center justify-center bg-ink px-6 py-3.5 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
              >
                {dealer.phoneDisplay}
              </a>
              <a
                href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Frage.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-ink px-6 py-3.5 text-xs uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-paper"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              <iframe
                title={`Standort ${dealer.legalName}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=7.0%2C51.32%2C7.07%2C51.36&layer=mapnik&marker=51.34%2C7.04`}
                className="absolute inset-0 h-full w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
