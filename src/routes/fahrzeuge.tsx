import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VehicleCard } from "@/components/site/VehicleCard";
import {
  VehicleFilters,
  emptyFilters,
  type Filters,
} from "@/components/site/VehicleFilters";
import { vehicles, statusMeta, type VehicleStatus } from "@/data/vehicles";

export const Route = createFileRoute("/fahrzeuge")({
  head: () => ({
    meta: [
      { title: "Gebrauchtwagen Velbert — Bestand | Autohaus AK" },
      {
        name: "description",
        content:
          "Aktueller Fahrzeugbestand des Autohaus AK GmbH in Velbert. Geprüft, aufbereitet, mit transparenter Historie.",
      },
      { property: "og:title", content: "Gebrauchtwagen Velbert — Autohaus AK GmbH" },
      {
        property: "og:description",
        content: "Geprüfte Gebrauchtwagen aus Velbert — transparent dokumentiert.",
      },
      { property: "og:url", content: "/fahrzeuge" },
    ],
    links: [{ rel: "canonical", href: "/fahrzeuge" }],
  }),
  component: VehiclesPage,
});

const STATUS_OPTIONS: { value: VehicleStatus; label: string }[] = [
  { value: "highlight", label: statusMeta("highlight").label },
  { value: "new-arrival", label: statusMeta("new-arrival").label },
  { value: "available", label: statusMeta("available").label },
  { value: "reserved", label: statusMeta("reserved").label },
  { value: "sold", label: statusMeta("sold").label },
];

type Sort = "newest" | "price-asc" | "price-desc" | "mileage-asc";

function VehiclesPage() {
  const bounds = useMemo(() => {
    const prices = vehicles.map((v) => v.priceEur);
    const mileages = vehicles.map((v) => v.mileageKm);
    const years = vehicles.map((v) => v.year);
    return {
      priceMin: Math.min(...prices),
      priceMax: Math.max(...prices),
      mileageMax: Math.max(...mileages),
      yearMin: Math.min(...years),
      yearMax: Math.max(...years),
    };
  }, []);

  const options = useMemo(
    () => ({
      makes: Array.from(new Set(vehicles.map((v) => v.make))).sort(),
      fuels: Array.from(new Set(vehicles.map((v) => v.fuel))),
      transmissions: Array.from(new Set(vehicles.map((v) => v.transmission))),
      statuses: STATUS_OPTIONS,
    }),
    [],
  );

  const [filters, setFilters] = useState<Filters>(emptyFilters(bounds));
  const [sort, setSort] = useState<Sort>("newest");
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (panelOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [panelOpen]);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    let list = vehicles.filter((v) => {
      if (q) {
        const hay = `${v.title} ${v.make} ${v.model} ${v.variant}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.makes.length && !filters.makes.includes(v.make)) return false;
      if (filters.fuels.length && !filters.fuels.includes(v.fuel)) return false;
      if (
        filters.transmissions.length &&
        !filters.transmissions.includes(v.transmission)
      )
        return false;
      if (filters.statuses.length && !filters.statuses.includes(v.status))
        return false;
      if (v.priceEur > filters.priceMax) return false;
      if (v.mileageKm > filters.mileageMax) return false;
      if (v.year < filters.yearMin) return false;
      return true;
    });
    if (sort === "price-asc") list = list.sort((a, b) => a.priceEur - b.priceEur);
    else if (sort === "price-desc")
      list = list.sort((a, b) => b.priceEur - a.priceEur);
    else if (sort === "mileage-asc")
      list = list.sort((a, b) => a.mileageKm - b.mileageKm);
    else list = list.sort((a, b) => b.year - a.year);
    return list;
  }, [filters, sort]);

  const activeCount =
    (filters.q ? 1 : 0) +
    filters.makes.length +
    filters.fuels.length +
    filters.transmissions.length +
    filters.statuses.length +
    (filters.priceMax < bounds.priceMax ? 1 : 0) +
    (filters.mileageMax < bounds.mileageMax ? 1 : 0) +
    (filters.yearMin > bounds.yearMin ? 1 : 0);

  const reset = () => setFilters(emptyFilters(bounds));

  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-4 pt-8 pb-6 md:px-10 md:pt-20 md:pb-16">
          <p className="kicker">Bestand · {vehicles.length} Fahrzeuge</p>
          {/* Alt-Headlines:
              · „Fahrzeuge, die wir verantworten."
              · „Aktuell verfügbar." */}
          <h1 className="mt-3 font-display text-4xl text-ink md:text-6xl">
            Unser Bestand.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:mt-6 md:text-lg">
            Persönlich ausgewählt, geprüft und vollständig aufbereitet.
            Auf Wunsch mit Finanzierung oder Inzahlungnahme — Anfrage per
            Telefon oder WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-12 md:gap-10">
            {/* Desktop sidebar */}
            <aside className="hidden md:col-span-3 md:block">
              <div className="sticky top-24 border border-line bg-surface p-6">
                <VehicleFilters
                  filters={filters}
                  setFilters={setFilters}
                  options={options}
                  bounds={bounds}
                  onReset={reset}
                  resultCount={filtered.length}
                />
              </div>
            </aside>

            <div className="md:col-span-9">
              {/* Top bar: Mobile = Filter+Sort in 2 columns */}
              <div className="mb-6 grid grid-cols-2 gap-2 md:mb-8 md:flex md:items-center md:justify-between md:gap-4">
                <button
                  type="button"
                  onClick={() => setPanelOpen(true)}
                  className="flex min-h-[48px] items-center justify-center border border-line bg-surface px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink md:hidden"
                >
                  Filter {activeCount > 0 && `(${activeCount})`}
                </button>
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft md:block">
                  {filtered.length} Treffer
                </p>
                <label className="flex min-h-[48px] items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft md:ml-auto md:gap-3">
                  <span className="hidden sm:inline">Sortierung</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="min-h-[48px] bg-surface px-3 py-2 font-mono text-[12px] uppercase tracking-[0.16em] text-ink md:text-[10px]"
                  >
                    <option value="newest">Neueste</option>
                    <option value="price-asc">Preis ↑</option>
                    <option value="price-desc">Preis ↓</option>
                    <option value="mileage-asc">Kilometer ↑</option>
                  </select>
                </label>
              </div>

              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft md:hidden">
                {filtered.length} Treffer
              </p>

              {filtered.length === 0 ? (
                <div className="border border-line bg-surface p-10 text-center md:p-12">
                  <p className="kicker">Keine Treffer</p>
                  <p className="mt-4 text-sm text-ink-soft">
                    Keine Fahrzeuge passen zu den Filtern.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 min-h-[48px] border border-champagne px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-champagne hover:bg-champagne hover:text-paper"
                  >
                    Filter zurücksetzen
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
                  {filtered.map((v, i) => (
                    <VehicleCard key={v.id} vehicle={v} priority={i < 2} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Mobile filter slide panel */}
      <div
        className={`fixed inset-0 z-[90] md:hidden ${
          panelOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!panelOpen}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            panelOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setPanelOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper transition-transform duration-300 ${
            panelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-champagne">
              Filter
            </p>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.22em] text-ink-soft"
            >
              Schließen ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <VehicleFilters
              filters={filters}
              setFilters={setFilters}
              options={options}
              bounds={bounds}
              onReset={reset}
              resultCount={filtered.length}
            />
          </div>
          <div className="border-t border-line bg-surface p-4 pb-safe">
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="block min-h-[56px] w-full bg-champagne font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-paper"
            >
              {filtered.length} Ergebnisse anzeigen
            </button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

