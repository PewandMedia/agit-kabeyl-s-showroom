import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VehicleCard } from "@/components/site/VehicleCard";
import { vehicles } from "@/data/vehicles";

export const Route = createFileRoute("/fahrzeuge")({
  head: () => ({
    meta: [
      { title: "Fahrzeugbestand — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content:
          "Aktueller Fahrzeugbestand des Autohaus AK GmbH in Velbert. Geprüfte Premium- und Gebrauchtfahrzeuge.",
      },
      { property: "og:title", content: "Fahrzeugbestand — Autohaus AK GmbH" },
      {
        property: "og:description",
        content: "Geprüfte Premium-Fahrzeuge aus Velbert.",
      },
      { property: "og:url", content: "/fahrzeuge" },
    ],
    links: [{ rel: "canonical", href: "/fahrzeuge" }],
  }),
  component: VehiclesPage,
});

function VehiclesPage() {
  const [make, setMake] = useState<string>("alle");
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">(
    "newest",
  );

  const makes = useMemo(
    () => ["alle", ...Array.from(new Set(vehicles.map((v) => v.make)))],
    [],
  );

  const filtered = useMemo(() => {
    let list = vehicles.slice();
    if (make !== "alle") list = list.filter((v) => v.make === make);
    if (sort === "price-asc") list.sort((a, b) => a.priceEur - b.priceEur);
    else if (sort === "price-desc") list.sort((a, b) => b.priceEur - a.priceEur);
    else list.sort((a, b) => b.year - a.year);
    return list;
  }, [make, sort]);

  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-10 md:px-10 md:pt-20 md:pb-16">
          <p className="kicker">Bestand</p>
          <h1 className="mt-4 font-serif text-5xl text-ink md:text-6xl">
            Unsere Fahrzeuge.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Jedes Fahrzeug persönlich ausgewählt, geprüft und aufbereitet. Bei
            Interesse erreichen Sie uns direkt — telefonisch oder per WhatsApp.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-10">
          <div className="flex flex-wrap gap-2">
            {makes.map((m) => (
              <button
                key={m}
                onClick={() => setMake(m)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                  make === m
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink-soft">
            Sortieren
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border border-line bg-paper px-3 py-2 text-xs uppercase tracking-[0.18em] text-ink focus:border-ink focus:outline-none"
            >
              <option value="newest">Neueste</option>
              <option value="price-asc">Preis aufsteigend</option>
              <option value="price-desc">Preis absteigend</option>
            </select>
          </label>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-ink-soft">
              Keine Fahrzeuge gefunden.
            </p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
