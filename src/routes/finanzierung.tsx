import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinancingLeadForm } from "@/components/forms/FinancingLeadForm";
import { TrustBlock } from "@/components/forms/primitives";
import { dealer, telLink, whatsappLink } from "@/data/dealer";
import { getVehicle } from "@/data/vehicles";

const searchSchema = z.object({
  fahrzeug: z.string().optional(),
});

export const Route = createFileRoute("/finanzierung")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Autofinanzierung Velbert — Autohaus AK GmbH" },
      {
        name: "description",
        content:
          "Autofinanzierung mit klaren Konditionen: Ballon- oder Ratenfinanzierung, schnelle Zusage. Beratung in Velbert.",
      },
      { property: "og:title", content: "Finanzierung — Autohaus AK GmbH" },
      {
        property: "og:description",
        content: "Transparente Konditionen, flexible Laufzeiten, schnelle Zusage.",
      },
      { property: "og:url", content: "/finanzierung" },
    ],
    links: [{ rel: "canonical", href: "/finanzierung" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FINANCING_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FinancingPage,
});

const FINANCING_FAQS = [
  {
    q: "Welche Unterlagen brauche ich?",
    a: "Personalausweis, aktuelle Gehaltsnachweise und einen Nachweis des Wohnsitzes. Selbstständige reichen zusätzlich BWA oder Steuerbescheid ein.",
  },
  {
    q: "Wie schnell kommt die Zusage?",
    a: "In der Regel am selben Werktag — unsere Partnerbanken entscheiden meist innerhalb weniger Stunden.",
  },
  {
    q: "Ist eine Anzahlung Pflicht?",
    a: "Nein. Eine Anzahlung senkt die monatliche Rate, ist aber nicht erforderlich.",
  },
  {
    q: "Ballon- oder Ratenfinanzierung — was passt?",
    a: "Ratenfinanzierung tilgt das Fahrzeug vollständig. Ballonfinanzierung senkt die Rate über eine Schlussrate. Wir vergleichen beides für Sie.",
  },
];

function FinancingPage() {
  const { fahrzeug } = Route.useSearch();
  const prefVehicle = fahrzeug ? getVehicle(fahrzeug) : undefined;
  const initialPrice = prefVehicle?.priceEur ?? 45000;

  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(Math.round(initialPrice * 0.1));
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(3.99);

  const monthly = useMemo(() => {
    const principal = Math.max(0, price - down);
    const r = rate / 100 / 12;
    const n = months;
    if (principal === 0) return 0;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }, [price, down, months, rate]);

  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-28 md:pb-24">
          <p className="kicker">Finanzierung</p>
          {/* Alt-Headlines:
              · „Konditionen, die zu Ihnen passen."
              · „Ihr Wunschfahrzeug. In Raten gedacht." */}
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.04] text-ink md:text-7xl">
            Finanzierung, die passt.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Transparente Konditionen, flexible Laufzeiten und schnelle
            Zusagen — über etablierte Partnerbanken. Endgültige Konditionen
            nach individueller Bonitätsprüfung.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-20 md:px-10 md:py-24">
          <div className="md:col-span-7">
            <div className="border border-line bg-surface p-8 md:p-10">
              <p className="kicker">Raten-Rechner</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Was kostet das Fahrzeug monatlich?
              </h2>

              <div className="mt-10 space-y-8">
                <Slider label="Kaufpreis" unit="€" min={5000} max={250000} step={500} value={price} onChange={setPrice} />
                <Slider label="Anzahlung" unit="€" min={0} max={Math.max(0, price - 1000)} step={500} value={Math.min(down, price)} onChange={setDown} />
                <Slider label="Laufzeit" unit="Mt." min={12} max={84} step={6} value={months} onChange={setMonths} />
                <Slider label="Sollzins (indikativ)" unit="%" min={1.99} max={9.99} step={0.1} value={rate} onChange={setRate} decimals={2} />
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <p className="kicker">Monatliche Rate (indikativ)</p>
                <p className="mt-3 font-display text-5xl text-gradient-gold md:text-6xl">
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

            <div className="mt-10">
              <p className="kicker">Vertrauen</p>
              <div className="mt-5">
                <TrustBlock />
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-24 border border-line bg-surface p-6 md:p-10">
              <p className="kicker">Anfrage senden</p>
              <h3 className="mt-4 font-display text-2xl text-ink md:text-3xl">
                Konditionen anfordern.
              </h3>

              <div className="mt-8">
                <FinancingLeadForm
                  vehicleDefault={prefVehicle?.title ?? ""}
                  priceDefault={price}
                />
              </div>

              <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6">
                <a
                  href={telLink()}
                  className="border border-ink/40 py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:border-ink"
                >
                  Anrufen · {dealer.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(`Hallo ${dealer.shortName}, ich interessiere mich für eine Finanzierung.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[oklch(0.55_0.16_150)] py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white"
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
        <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
          {label}
        </label>
        <span className="font-display text-xl text-ink">
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
