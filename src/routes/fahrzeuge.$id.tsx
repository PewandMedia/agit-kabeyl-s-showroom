import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  formatKm,
  formatKw,
  formatPrice,
  getVehicle,
  vehicles,
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
    const title = `${v.title} · ${v.firstRegistration} · ${formatPrice(v.priceEur)} — Autohaus AK`;
    const description = `${v.title}, EZ ${v.firstRegistration}, ${formatKm(v.mileageKm)}, ${v.fuel}, ${formatKw(v.powerKw)}. Verfügbar beim Autohaus AK GmbH in Velbert.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: v.image },
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
            offers: {
              "@type": "Offer",
              price: v.priceEur,
              priceCurrency: "EUR",
              availability:
                v.status === "active"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/SoldOut",
              seller: { "@type": "AutoDealer", name: dealer.legalName },
            },
            image: v.image,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-[1400px] px-5 py-32 text-center md:px-10">
        <p className="kicker">404</p>
        <h1 className="mt-4 font-serif text-5xl text-ink">
          Fahrzeug nicht gefunden
        </h1>
        <p className="mt-6 text-sm text-ink-soft">
          Dieses Fahrzeug ist nicht mehr verfügbar oder wurde verkauft.
        </p>
        <Link
          to="/fahrzeuge"
          className="mt-8 inline-flex items-center justify-center bg-ink px-6 py-3 text-xs uppercase tracking-[0.22em] text-paper"
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
        <h1 className="mt-4 font-serif text-4xl text-ink">
          Fahrzeug konnte nicht geladen werden.
        </h1>
        <p className="mt-4 text-sm text-ink-soft">{error.message}</p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center border border-ink px-6 py-3 text-xs uppercase tracking-[0.22em] text-ink"
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
  const whatsappText = `Hallo ${dealer.shortName}, ich interessiere mich für den ${v.title} (ID ${v.id}).`;

  return (
    <SiteLayout>
      <article>
        <section className="bg-ink">
          <div className="mx-auto max-w-[1400px] px-5 pt-8 md:px-10 md:pt-12">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center text-[11px] uppercase tracking-[0.22em] text-paper/60 hover:text-paper"
            >
              ← Bestand
            </Link>
          </div>
          <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-6 md:px-10 md:pb-16">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink">
              <img
                src={v.image}
                alt={`${v.title}, ${v.firstRegistration}`}
                width={1920}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-24">
            <div className="md:col-span-7">
              <p className="kicker">{v.make}</p>
              <h1 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
                {v.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                {v.description}
              </p>

              <div className="mt-12">
                <p className="kicker">Technische Daten</p>
                <dl className="mt-6 grid grid-cols-2 gap-y-5 text-sm md:grid-cols-3">
                  <SpecItem label="Erstzulassung" value={v.firstRegistration} />
                  <SpecItem label="Kilometerstand" value={formatKm(v.mileageKm)} />
                  <SpecItem label="Leistung" value={formatKw(v.powerKw)} />
                  <SpecItem label="Kraftstoff" value={v.fuel} />
                  <SpecItem label="Getriebe" value={v.transmission} />
                  <SpecItem label="Farbe" value={v.exteriorColor} />
                </dl>
              </div>

              <div className="mt-12">
                <p className="kicker">Ausstattung</p>
                <ul className="mt-6 grid grid-cols-1 gap-y-3 text-sm text-ink sm:grid-cols-2">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2 h-px w-4 bg-champagne" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="md:col-span-5">
              <div className="sticky top-24 border border-line bg-paper p-6 md:p-8">
                <p className="kicker">Preis</p>
                <p className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                  {formatPrice(v.priceEur)}
                </p>
                <p className="mt-2 text-xs text-ink-soft">
                  Inkl. MwSt. ausweisbar · zzgl. Überführung
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={whatsappLink(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center bg-ink px-6 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
                  >
                    Anfrage per WhatsApp
                  </a>
                  <a
                    href={telLink()}
                    className="flex w-full items-center justify-center border border-ink px-6 py-4 text-xs uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-paper"
                  >
                    {dealer.phoneDisplay}
                  </a>
                  <Link
                    to="/kontakt"
                    className="block w-full text-center text-xs uppercase tracking-[0.22em] text-ink-soft hover:text-ink"
                  >
                    Probefahrt vereinbaren →
                  </Link>
                </div>

                <div className="mt-8 border-t border-line pt-6 text-xs text-ink-soft">
                  <p>Fahrzeug-ID</p>
                  <p className="mt-1 font-mono text-ink">{v.id.toUpperCase()}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <OtherVehicles currentId={v.id} />

        <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper md:hidden">
          <a
            href={telLink()}
            className="flex items-center justify-center border-r border-line py-4 text-xs uppercase tracking-[0.18em] text-ink"
          >
            Anrufen
          </a>
          <a
            href={whatsappLink(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-ink py-4 text-xs uppercase tracking-[0.18em] text-paper"
          >
            WhatsApp
          </a>
        </div>
      </article>
    </SiteLayout>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line pb-3">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </dt>
      <dd className="mt-2 text-ink">{value}</dd>
    </div>
  );
}

function OtherVehicles({ currentId }: { currentId: string }) {
  const others = vehicles.filter((v) => v.id !== currentId).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <p className="kicker">Weitere Fahrzeuge</p>
        <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
          Aus unserem Bestand.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {others.map((v) => (
            <div key={v.id}>
              <Link
                to="/fahrzeuge/$id"
                params={{ id: v.id }}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <img
                    src={v.image}
                    alt={v.title}
                    width={1280}
                    height={832}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="kicker mt-5">{v.make}</p>
                <h3 className="mt-2 font-serif text-xl text-ink">{v.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-soft">
                  {formatPrice(v.priceEur)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
