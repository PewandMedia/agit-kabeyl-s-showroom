import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

export const Route = createFileRoute("/auto-verkaufen")({
  head: () => ({
    meta: [
      { title: "Auto verkaufen — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content:
          "Verkaufen Sie Ihr Fahrzeug an das Autohaus AK GmbH in Velbert. Faire Bewertung, sofortige Auszahlung, alles aus einer Hand.",
      },
      { property: "og:title", content: "Auto verkaufen — Autohaus AK GmbH" },
      {
        property: "og:description",
        content: "Faire Bewertung, sofortige Auszahlung. Champion-Konditionen für Ihr Fahrzeug.",
      },
      { property: "og:url", content: "/auto-verkaufen" },
    ],
    links: [{ rel: "canonical", href: "/auto-verkaufen" }],
  }),
  component: SellCarPage,
});

function SellCarPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-28 md:pb-24">
          <p className="kicker">Ankauf</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] text-ink md:text-7xl">
            Wir kaufen Ihr Fahrzeug —{" "}
            <span className="text-gradient-gold">fair und sofort.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Marken- und modellübergreifend. Bewertung innerhalb eines Termins,
            sofortige Auszahlung möglich, alle Formalitäten übernehmen wir.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-20 md:px-10 md:py-24">
          <div className="md:col-span-5">
            <p className="kicker">So läuft es ab</p>
            <ol className="mt-8 space-y-8">
              {[
                ["01", "Daten senden", "Marke, Modell, Erstzulassung, Laufleistung, Zustand, gerne Fotos."],
                ["02", "Bewertung", "Wir prüfen Markt, Historie und Zustand — und melden uns mit einem klaren Angebot."],
                ["03", "Termin", "Persönliche Begutachtung in Velbert."],
                ["04", "Übergabe & Auszahlung", "Sofortige Übernahme, sofortige Zahlung, alle Formalitäten erledigt."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-6 border-b border-line pb-6">
                  <span className="font-serif text-3xl text-champagne">{n}</span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 glass p-6">
              <p className="kicker">Lieber direkt sprechen?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={telLink()}
                  className="inline-flex items-center bg-ink px-5 py-3 text-xs uppercase tracking-[0.2em] text-paper"
                >
                  {dealer.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(`Hallo ${dealer.shortName}, ich möchte mein Fahrzeug verkaufen.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-champagne/60 px-5 py-3 text-xs uppercase tracking-[0.2em] text-champagne hover:bg-champagne hover:text-paper"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="glass-strong p-8 md:p-10">
              <p className="kicker">Bewertung anfragen</p>
              <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
                Fahrzeug-Daten senden.
              </h2>

              {sent ? (
                <div className="mt-10 border border-champagne/40 bg-champagne/10 p-6 text-sm text-ink">
                  Vielen Dank — wir melden uns innerhalb von 24 Stunden mit
                  einer ersten Einschätzung.
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
                  <Field label="Marke" name="make" required />
                  <Field label="Modell" name="model" required />
                  <Field label="Erstzulassung (MM/JJJJ)" name="firstRegistration" required />
                  <Field label="Kilometerstand" name="mileage" type="number" required />
                  <Field label="Kraftstoff" name="fuel" />
                  <Field label="Getriebe" name="transmission" />
                  <div className="sm:col-span-2">
                    <Label>Zustand / Anmerkungen</Label>
                    <textarea
                      name="condition"
                      rows={4}
                      className="mt-2 w-full border border-line bg-paper/40 px-4 py-3 text-sm text-ink focus:border-champagne focus:outline-none"
                    />
                  </div>
                  <Field label="Ihr Name" name="name" required />
                  <Field label="Telefon" name="phone" type="tel" required />
                  <Field label="E-Mail (optional)" name="email" type="email" />
                  <Field label="PLZ" name="zip" />
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-ink px-6 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
                    >
                      Bewertung anfordern
                    </button>
                    <p className="mt-3 text-xs text-ink-soft">
                      Mit dem Absenden stimmen Sie unserer{" "}
                      <a href="/datenschutz" className="underline hover:text-ink">
                        Datenschutzerklärung
                      </a>{" "}
                      zu.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.22em] text-ink-soft">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full border border-line bg-paper/40 px-4 py-3 text-sm text-ink focus:border-champagne focus:outline-none"
      />
    </div>
  );
}
