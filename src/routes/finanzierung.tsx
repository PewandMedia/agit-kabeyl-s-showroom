import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

export const Route = createFileRoute("/finanzierung")({
  head: () => ({
    meta: [
      { title: "Finanzierung — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content:
          "Fahrzeugfinanzierung beim Autohaus AK GmbH in Velbert. Rechnen Sie Ihre Rate, fordern Sie unverbindlich Konditionen an — schnelle Zusagen, faire Konditionen.",
      },
      { property: "og:title", content: "Finanzierung — Autohaus AK GmbH" },
      {
        property: "og:description",
        content: "Champion-Konditionen. Rate berechnen, Anfrage stellen, schnelle Zusage.",
      },
      { property: "og:url", content: "/finanzierung" },
    ],
    links: [{ rel: "canonical", href: "/finanzierung" }],
  }),
  component: FinancingPage,
});

function FinancingPage() {
  const [price, setPrice] = useState(45000);
  const [down, setDown] = useState(5000);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(3.99);
  const [sent, setSent] = useState(false);

  const monthly = useMemo(() => {
    const principal = Math.max(0, price - down);
    const r = rate / 100 / 12;
    const n = months;
    if (principal === 0) return 0;
    if (r === 0) return principal / n;
    const m = (principal * r) / (1 - Math.pow(1 + r, -n));
    return m;
  }, [price, down, months, rate]);

  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-28 md:pb-24">
          <p className="kicker">Finanzierung</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.04] text-ink md:text-7xl">
            Champion-Konditionen.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Transparente Konditionen, individuelle Lösungen, schnelle Zusagen —
            in Zusammenarbeit mit bewährten Partnerbanken.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-20 md:px-10 md:py-24">
          <div className="md:col-span-7">
            <div className="glass-strong p-8 md:p-10">
              <p className="kicker">Raten-Rechner</p>
              <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
                Was kostet das Fahrzeug monatlich?
              </h2>

              <div className="mt-10 space-y-8">
                <Slider
                  label="Kaufpreis"
                  unit="€"
                  min={5000}
                  max={250000}
                  step={500}
                  value={price}
                  onChange={setPrice}
                />
                <Slider
                  label="Anzahlung"
                  unit="€"
                  min={0}
                  max={Math.max(0, price - 1000)}
                  step={500}
                  value={Math.min(down, price)}
                  onChange={setDown}
                />
                <Slider
                  label="Laufzeit"
                  unit="Mt."
                  min={12}
                  max={84}
                  step={6}
                  value={months}
                  onChange={setMonths}
                />
                <Slider
                  label="Sollzins (indikativ)"
                  unit="%"
                  min={1.99}
                  max={9.99}
                  step={0.1}
                  value={rate}
                  onChange={setRate}
                  decimals={2}
                />
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <p className="kicker">Monatliche Rate (indikativ)</p>
                <p className="mt-3 font-serif text-5xl text-gradient-gold md:text-6xl">
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(monthly)}
                </p>
                <p className="mt-3 text-xs text-ink-soft">
                  Unverbindliche Beispielrechnung. Endgültige Konditionen nach
                  Bonitätsprüfung der Partnerbank.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="border border-line bg-surface p-8 md:p-10">
              <p className="kicker">Anfrage senden</p>
              <h3 className="mt-4 font-serif text-2xl text-ink md:text-3xl">
                Konditionen anfordern.
              </h3>

              {sent ? (
                <div className="mt-8 border border-champagne/40 bg-champagne/10 p-5 text-sm text-ink">
                  Vielen Dank — wir melden uns mit Ihrer individuellen
                  Indikation zurück.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-8 space-y-4"
                >
                  <Field label="Name" name="name" required />
                  <Field label="Telefon" name="phone" type="tel" required />
                  <Field label="E-Mail" name="email" type="email" />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="hidden"
                      name="price"
                      value={price}
                    />
                    <input type="hidden" name="down" value={down} />
                    <input type="hidden" name="months" value={months} />
                    <input type="hidden" name="rate" value={rate} />
                    <div className="rounded-sm border border-line bg-paper/40 px-3 py-2 text-xs text-ink-soft">
                      Kaufpreis: <span className="text-ink">{price.toLocaleString("de-DE")} €</span>
                    </div>
                    <div className="rounded-sm border border-line bg-paper/40 px-3 py-2 text-xs text-ink-soft">
                      Laufzeit: <span className="text-ink">{months} Mt.</span>
                    </div>
                  </div>
                  <Field label="Wunschfahrzeug (optional)" name="vehicle" />
                  {/* Honeypot */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
                  <button
                    type="submit"
                    className="w-full bg-ink px-6 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
                  >
                    Konditionen anfragen
                  </button>
                </form>
              )}

              <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6">
                <a
                  href={telLink()}
                  className="text-center border border-ink/40 py-3 text-xs uppercase tracking-[0.2em] text-ink hover:border-ink"
                >
                  Anrufen · {dealer.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(`Hallo ${dealer.shortName}, ich interessiere mich für eine Finanzierung.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-[oklch(0.55_0.16_150)] py-3 text-xs uppercase tracking-[0.2em] text-white"
                >
                  Per WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Slider({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
  decimals = 0,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  decimals?: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          {label}
        </label>
        <span className="font-serif text-xl text-ink">
          {decimals ? value.toFixed(decimals) : value.toLocaleString("de-DE")} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--color-champagne)]"
      />
    </div>
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
      <label className="block text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full border border-line bg-paper/40 px-4 py-3 text-sm text-ink focus:border-champagne focus:outline-none"
      />
    </div>
  );
}
