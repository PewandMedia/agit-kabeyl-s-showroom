import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PurchaseForm } from "@/components/forms/PurchaseForm";
import { TrustBlock } from "@/components/forms/primitives";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

export const Route = createFileRoute("/auto-verkaufen")({
  head: () => ({
    meta: [
      { title: "Auto verkaufen Velbert — Ankauf | Autohaus AK" },
      {
        name: "description",
        content:
          "Wir kaufen Ihr Fahrzeug — markenübergreifend, fair bewertet, sofort ausgezahlt. Ankauf in Velbert und NRW.",
      },
      { property: "og:title", content: "Auto verkaufen — Autohaus AK GmbH" },
      {
        property: "og:description",
        content:
          "Faire Bewertung, schnelle Abwicklung, sofortige Auszahlung. Markenübergreifender Ankauf.",
      },
      { property: "og:url", content: "/auto-verkaufen" },
    ],
    links: [{ rel: "canonical", href: "/auto-verkaufen" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PURCHASE_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: SellCarPage,
});

const PURCHASE_FAQS = [
  {
    q: "Welche Fahrzeuge kaufen Sie an?",
    a: "Marken- und modellübergreifend — Pkw, SUV und Transporter. Auch Unfall- oder Reparaturfahrzeuge bewerten wir gern.",
  },
  {
    q: "Wie schnell erfolgt die Auszahlung?",
    a: "Auf Wunsch noch am Tag der Übergabe — per Überweisung oder in bar nach Vereinbarung.",
  },
  {
    q: "Übernehmen Sie die Abmeldung?",
    a: "Ja. Wir übernehmen Abmeldung und alle Formalitäten — Sie geben das Fahrzeug ab und sind fertig.",
  },
  {
    q: "Kaufen Sie auch bei laufender Finanzierung?",
    a: "Ja. Wir lösen die Restschuld direkt bei Ihrer Bank ab und rechnen die Differenz mit Ihnen ab.",
  },
];

function SellCarPage() {
  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-28 md:pb-24">
          <p className="kicker">Ankauf</p>
          {/* Alt-Headlines:
              · „Fairer Ankauf. Schnelle Abwicklung."
              · „Ihr Fahrzeug verdient eine faire Bewertung." */}
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.04] text-ink md:text-7xl">
            Wir kaufen Ihr Fahrzeug —{" "}
            <span className="text-gradient-gold">fair bewertet, schnell abgewickelt.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Marken- und modellübergreifend. Bewertung innerhalb eines Termins,
            Auszahlung auf Wunsch sofort, alle Formalitäten übernehmen wir —
            auch bei laufender Finanzierung.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-20 md:px-10 md:py-24">
          <div className="md:col-span-5">
            <p className="kicker">So läuft es ab</p>
            <ol className="mt-8 space-y-8">
              {[
                ["01", "Daten senden", "Marke, Modell, Erstzulassung, Laufleistung und Zustand — gern mit Fotos per WhatsApp."],
                ["02", "Bewertung", "Wir prüfen Markt, Historie und Zustand und melden uns mit einem realistischen Angebot."],
                ["03", "Termin in Velbert", "Persönliche Begutachtung — ohne Druck, mit Zeit für Fragen."],
                ["04", "Übergabe & Auszahlung", "Übernahme inklusive Abmeldung und Auszahlung am selben Tag."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-6 border-b border-line pb-6">
                  <span className="font-display text-3xl text-champagne">{n}</span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <p className="kicker">Vertrauen</p>
              <div className="mt-5">
                <TrustBlock />
              </div>
            </div>

            <div className="mt-10 border border-line p-6">
              <p className="kicker">Lieber direkt sprechen?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={telLink()}
                  className="inline-flex items-center border border-ink/60 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-paper"
                >
                  {dealer.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(`Hallo ${dealer.shortName}, ich möchte mein Fahrzeug verkaufen.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-champagne px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="border border-line bg-surface p-6 md:p-10">
              <p className="kicker">Bewertung anfragen</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Fahrzeug-Daten senden.
              </h2>
              <div className="mt-8">
                <PurchaseForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-14 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-4">
              <p className="kicker">FAQ Ankauf</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Häufige Fragen zum Ankauf.
              </h2>
            </div>
            <div className="md:col-span-8 divide-y divide-line border-y border-line">
              {PURCHASE_FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                    <span className="font-display text-lg text-ink md:text-xl">{f.q}</span>
                    <span className="font-display text-2xl text-champagne transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
