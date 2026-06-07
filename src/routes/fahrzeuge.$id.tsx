import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VehicleGallery } from "@/components/site/VehicleGallery";
import { VehicleInquiryForm } from "@/components/forms/VehicleInquiryForm";
import { TestDriveForm } from "@/components/forms/TestDriveForm";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { Modal } from "@/components/site/Modal";
import { TrustBlock } from "@/components/forms/primitives";
import { StatusBadge } from "@/components/site/StatusBadge";
import {
  formatKm,
  formatKw,
  formatPrice,
  getVehicle,
  vehicles,
  type Vehicle,
} from "@/data/vehicles";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

export const Route = createFileRoute("/fahrzeuge/$id")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.id);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData, params }) => {
    const v = loaderData?.vehicle;
    if (!v) return { meta: [{ title: "Fahrzeug nicht gefunden" }] };
    const title = `${v.make} ${v.model} ${v.firstRegistration} — Autohaus AK Velbert`;
    const description = `${v.title}, EZ ${v.firstRegistration}, ${formatKm(v.mileageKm)}. Geprüft vom ${dealer.legalName} in ${dealer.city}. Probefahrt und Finanzierung möglich.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: v.images[0] },
        { name: "twitter:image", content: v.images[0] },
        { property: "og:url", content: `/fahrzeuge/${params.id}` },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/fahrzeuge/${params.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Vehicle",
            name: v.title,
            brand: { "@type": "Brand", name: v.make },
            model: v.model,
            vehicleModelDate: String(v.year),
            mileageFromOdometer: {
              "@type": "QuantitativeValue",
              value: v.mileageKm,
              unitCode: "KMT",
            },
            fuelType: v.fuel,
            vehicleTransmission: v.transmission,
            color: v.exteriorColor,
            numberOfPreviousOwners: v.previousOwners,
            offers: {
              "@type": "Offer",
              price: v.priceEur,
              priceCurrency: "EUR",
              availability:
                v.status === "sold"
                  ? "https://schema.org/SoldOut"
                  : v.status === "reserved"
                    ? "https://schema.org/Reserved"
                    : "https://schema.org/InStock",
              seller: { "@type": "AutoDealer", name: dealer.legalName },
            },
            image: v.images,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "/" },
              { "@type": "ListItem", position: 2, name: "Fahrzeuge", item: "/fahrzeuge" },
              { "@type": "ListItem", position: 3, name: v.title, item: `/fahrzeuge/${params.id}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[1400px] px-5 py-32 text-center md:px-10">
        <p className="kicker">404</p>
        <h1 className="mt-4 font-display text-5xl text-ink">
          Fahrzeug nicht gefunden
        </h1>
        <p className="mt-6 text-sm text-ink-soft">
          Dieses Fahrzeug ist nicht mehr verfügbar oder wurde verkauft.
        </p>
        <Link
          to="/fahrzeuge"
          className="mt-8 inline-flex items-center justify-center bg-champagne px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper"
        >
          Zum Bestand
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-[1400px] px-5 py-32 text-center md:px-10">
        <p className="kicker">Fehler</p>
        <h1 className="mt-4 font-display text-4xl text-ink">
          Fahrzeug konnte nicht geladen werden.
        </h1>
        <p className="mt-4 text-sm text-ink-soft">{error.message}</p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center border border-champagne px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-champagne"
        >
          Erneut versuchen
        </button>
      </div>
    </SiteLayout>
  ),
  component: VehicleDetail,
});

function VehicleDetail() {
  const { vehicle: v } = Route.useLoaderData();
  const isSold = v.status === "sold";
  const whatsappText = `Hallo ${dealer.legalName}, ich interessiere mich für ${v.title}. Ist das Fahrzeug noch verfügbar?`;
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <SiteLayout hideMobileBar hideFab>
      <Modal open={testDriveOpen} onClose={() => setTestDriveOpen(false)} title={`Probefahrt: ${v.title}`}>
        <TestDriveForm vehicleTitle={v.title} vehicleId={v.id} />
      </Modal>
      <Modal open={callbackOpen} onClose={() => setCallbackOpen(false)} title="Rückruf anfordern">
        <CallbackForm context={`Fahrzeug ${v.title} (ID ${v.id})`} />
      </Modal>
      <article>
        <section className="border-b border-line bg-paper">
          <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft hover:text-champagne"
            >
              ← Bestand
            </Link>

            <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="kicker">{v.make}</p>
                  <StatusBadge status={v.status} />
                </div>
                <h1 className="mt-4 font-display text-4xl leading-[0.95] text-ink md:text-6xl xl:text-7xl">
                  {v.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft md:text-lg">
                  {v.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
                  <FactChip label="EZ" value={v.firstRegistration} />
                  <FactChip label="KM" value={formatKm(v.mileageKm)} />
                  <FactChip label="Leistung" value={formatKw(v.powerKw)} />
                  <FactChip label="Getriebe" value={v.transmission} />
                  <FactChip label="Kraftstoff" value={v.fuel} />
                </div>
              </div>

              <aside className="md:col-span-4">
                <div className="border border-champagne/30 bg-surface p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-champagne">Preis</p>
                  <p className="mt-3 font-display text-4xl text-champagne md:text-5xl">{formatPrice(v.priceEur)}</p>
                  <p className="mt-2 text-xs text-ink-soft">Inkl. MwSt. ausweisbar · zzgl. Überführung</p>
                  {v.monthlyRateEur && (
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                      ab <span className="text-ink">{formatPrice(v.monthlyRateEur)} / Monat</span>
                    </p>
                  )}
                  <div className="mt-6 space-y-3">
                    <a
                      href={whatsappLink(whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex w-full items-center justify-center bg-champagne px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-foreground ${isSold ? "pointer-events-none opacity-40" : ""}`}
                    >
                      Anfrage per WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setTestDriveOpen(true)}
                      disabled={isSold}
                      className="block w-full border border-line py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Probefahrt anfragen
                    </button>
                    <Link
                      to="/finanzierung"
                      search={{ fahrzeug: v.id } as never}
                      className={`block w-full border border-line py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:border-champagne hover:text-champagne ${isSold ? "pointer-events-none opacity-40" : ""}`}
                    >
                      Finanzierung anfragen
                    </Link>
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-8">
              <VehicleGallery images={v.images} alt={`${v.title}, ${v.firstRegistration}`} />
            </div>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 md:grid-cols-12 md:px-10 md:py-16">
            <div className="md:col-span-7">
              <div className="border border-line bg-surface p-6 md:p-8">
                <p className="kicker">Highlights</p>
                <ul className="mt-6 grid grid-cols-1 gap-y-3 text-sm text-ink sm:grid-cols-2">
                  {v.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2 h-px w-4 bg-champagne" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border border-line bg-surface p-6 md:p-8">
                <p className="kicker">Anfrage</p>
                <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">Direkt zu diesem Fahrzeug.</h2>
                <div className="mt-8 max-w-xl">
                  <VehicleInquiryForm vehicleTitle={v.title} vehicleId={v.id} disabled={isSold} />
                </div>
                <div className="mt-10 max-w-xl">
                  <TrustBlock />
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="border border-line bg-surface p-6 md:p-8">
                <p className="kicker">Technische Daten</p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                  <SpecItem label="Marke" value={v.make} />
                  <SpecItem label="Modell" value={v.model} />
                  <SpecItem label="Variante" value={v.variant} />
                  <SpecItem label="Farbe" value={v.exteriorColor} />
                  <SpecItem label="Zustand" value={v.condition} />
                  <SpecItem label="Vorbesitzer" value={String(v.previousOwners)} />
                  <SpecItem label="Telefon" value={dealer.phoneDisplay} />
                  <SpecItem label="Fahrzeug-ID" value={v.id} />
                </dl>

                {isSold && (
                  <div className="mt-6 border border-line bg-paper/40 p-4 text-xs text-ink-soft">
                    Dieses Fahrzeug ist bereits verkauft. Sprechen Sie uns für ähnliche Modelle an.
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setCallbackOpen(true)}
                  className="mt-6 block w-full text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft transition-colors hover:text-champagne"
                >
                  Rückruf anfordern →
                </button>
              </div>
            </div>
          </div>
        </section>

        <SimilarVehicles current={v} />

        {/* Vehicle-specific sticky bar replaces the global one on detail pages */}
        {!isSold && (
          <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-line bg-paper/95 backdrop-blur-xl pb-safe md:hidden">
            <a
              href={telLink()}
              className="flex min-h-[56px] items-center justify-center border-r border-line font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink"
            >
              Anrufen
            </a>
            <a
              href={whatsappLink(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[56px] items-center justify-center border-r border-line bg-[oklch(0.62_0.17_150)] font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setTestDriveOpen(true)}
              className="flex min-h-[56px] items-center justify-center bg-champagne font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper"
            >
              Probefahrt
            </button>
          </div>
        )}

      </article>
    </SiteLayout>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line pb-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </dt>
      <dd className="mt-2 text-ink">{value}</dd>
    </div>
  );
}

function SimilarVehicles({ current }: { current: Vehicle }) {
  const sameMake = vehicles.filter(
    (x) => x.id !== current.id && x.make === current.make,
  );
  const closePrice = vehicles.filter(
    (x) =>
      x.id !== current.id &&
      x.make !== current.make &&
      Math.abs(x.priceEur - current.priceEur) / current.priceEur < 0.25,
  );
  const seen = new Set<string>();
  const picks = [...sameMake, ...closePrice, ...vehicles]
    .filter((x) => {
      if (x.id === current.id) return false;
      if (seen.has(x.id)) return false;
      seen.add(x.id);
      return true;
    })
    .slice(0, 3);

  if (picks.length === 0) return null;
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <p className="kicker">Ähnliche Fahrzeuge</p>
        <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
          Aus unserem Bestand.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {picks.map((x) => (
            <Link
              key={x.id}
              to="/fahrzeuge/$id"
              params={{ id: x.id }}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                <img
                  src={x.images[0]}
                  alt={`${x.title} — ${dealer.shortName}`}
                  width={1280}
                  height={832}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute left-3 top-3">
                  <StatusBadge status={x.status} />
                </div>
              </div>
              <p className="kicker mt-5">{x.make}</p>
              <h3 className="mt-2 font-display text-xl text-ink">{x.title}</h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-champagne">
                {formatPrice(x.priceEur)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
