import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen — Verkauf, Ankauf, Finanzierung | Autohaus AK" },
      {
        name: "description",
        content:
          "Verkauf, Ankauf, Inzahlungnahme und Finanzierung aus einer Hand. Persönlich beraten vom Autohaus AK GmbH in Velbert.",
      },
      { property: "og:title", content: "Leistungen — Autohaus AK GmbH" },
      {
        property: "og:description",
        content:
          "Verkauf, Ankauf, Inzahlungnahme und Finanzierung aus einer Hand.",
      },
      { property: "og:url", content: "/leistungen" },
    ],
    links: [{ rel: "canonical", href: "/leistungen" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    n: "01",
    title: "Verkauf",
    body:
      "Geprüfte Premium- und Gebrauchtfahrzeuge, persönlich ausgewählt und sorgfältig aufbereitet. Mit transparenter Historie und ehrlicher Beratung.",
    bullets: [
      "Eingangsprüfung jedes Fahrzeugs",
      "Vollständige Aufbereitung",
      "Garantie verfügbar",
      "Lieferung deutschlandweit möglich",
    ],
  },
  {
    n: "02",
    title: "Ankauf",
    body:
      "Faire Bewertung, sofortige Entscheidung, schnelle Abwicklung. Sie verkaufen Ihr Fahrzeug an einen Händler, der den Wert kennt.",
    bullets: [
      "Bewertung innerhalb eines Termins",
      "Sofortige Auszahlung möglich",
      "Übernahme aller Formalitäten",
      "Marken- und modellübergreifend",
    ],
  },
  {
    n: "03",
    title: "Inzahlungnahme",
    body:
      "Ihr aktuelles Fahrzeug fließt direkt in den Kauf Ihres neuen Fahrzeugs ein. Ein Termin, eine Übergabe, eine Entscheidung.",
    bullets: [
      "Bewertung beim Kauftermin",
      "Anrechnung auf den Kaufpreis",
      "Keine doppelten Wege",
      "Klare Konditionen",
    ],
  },
  {
    n: "04",
    title: "Finanzierung",
    body:
      "Transparente Konditionen, individuelle Lösungen, schnelle Zusagen. Wir arbeiten mit bewährten Partnerbanken.",
    bullets: [
      "Bonitätsprüfung am gleichen Tag",
      "Ballonfinanzierung möglich",
      "Klassische Ratenfinanzierung",
      "Beratung ohne Druck",
    ],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-20 md:px-10 md:pt-20 md:pb-32">
          <p className="kicker">Leistungen</p>
          {/* Alt-Headlines:
              · „Verkauf, Ankauf, Finanzierung — sauber aus einer Hand."
              · „Ein Ansprechpartner. Alle Schritte." */}
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
            Alles aus einer Hand.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Vom ersten Gespräch bis zur Übergabe — und darüber hinaus.
            Verkauf, Ankauf, Inzahlungnahme und Finanzierung sauber
            koordiniert, ein Ansprechpartner durchgehend.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-px bg-line">
            {SERVICES.map((s) => (
              <div
                key={s.n}
                className="grid gap-12 bg-paper px-2 py-10 md:grid-cols-12 md:gap-16 md:px-8 md:py-16"
              >
                <div className="md:col-span-4">
                  <p className="kicker">{s.n}</p>
                  <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
                    {s.title}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                    {s.body}
                  </p>
                  <ul className="mt-8 grid grid-cols-1 gap-3 text-sm text-ink sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span aria-hidden className="mt-2 h-px w-4 bg-champagne" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface grain">
        <div className="mx-auto max-w-[1400px] px-5 py-24 text-center md:px-10 md:py-32">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl text-ink md:text-5xl">
            Sprechen wir über Ihr Vorhaben.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-ink-soft md:text-lg">
            Verkauf, Ankauf, Finanzierung oder eine kurze Einschätzung —
            wählen Sie den schnellsten Weg.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center bg-ink px-7 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
            >
              Termin vereinbaren
            </Link>
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center justify-center border border-champagne/60 px-7 py-4 text-xs uppercase tracking-[0.22em] text-champagne hover:bg-champagne hover:text-paper"
            >
              Fahrzeuge ansehen
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
