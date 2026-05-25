import type { VehicleStatus } from "@/data/vehicles";

export type Filters = {
  q: string;
  makes: string[];
  fuels: string[];
  transmissions: string[];
  statuses: VehicleStatus[];
  priceMax: number;
  mileageMax: number;
  yearMin: number;
};

export const emptyFilters = (
  bounds: { priceMax: number; mileageMax: number; yearMin: number },
): Filters => ({
  q: "",
  makes: [],
  fuels: [],
  transmissions: [],
  statuses: [],
  priceMax: bounds.priceMax,
  mileageMax: bounds.mileageMax,
  yearMin: bounds.yearMin,
});

export function VehicleFilters({
  filters,
  setFilters,
  options,
  bounds,
  onReset,
  resultCount,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  options: {
    makes: string[];
    fuels: string[];
    transmissions: string[];
    statuses: { value: VehicleStatus; label: string }[];
  };
  bounds: { priceMin: number; priceMax: number; mileageMax: number; yearMin: number; yearMax: number };
  onReset: () => void;
  resultCount: number;
}) {
  const toggle = <T,>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <div className="space-y-8">
      <div>
        <Label>Suche</Label>
        <input
          type="search"
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          placeholder="Marke, Modell, Variante…"
          className="mt-2 w-full bg-surface px-4 py-3 text-sm text-ink"
        />
      </div>

      <ChipGroup
        label="Marke"
        items={options.makes}
        active={filters.makes}
        onToggle={(m) => setFilters({ ...filters, makes: toggle(filters.makes, m) })}
      />

      <ChipGroup
        label="Kraftstoff"
        items={options.fuels}
        active={filters.fuels}
        onToggle={(m) => setFilters({ ...filters, fuels: toggle(filters.fuels, m) })}
      />

      <ChipGroup
        label="Getriebe"
        items={options.transmissions}
        active={filters.transmissions}
        onToggle={(m) =>
          setFilters({ ...filters, transmissions: toggle(filters.transmissions, m) })
        }
      />

      <div>
        <Label>Status</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {options.statuses.map((s) => {
            const on = filters.statuses.includes(s.value);
            return (
              <button
                key={s.value}
                type="button"
                onClick={() =>
                  setFilters({ ...filters, statuses: toggle(filters.statuses, s.value) })
                }
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                  on
                    ? "border-champagne bg-champagne text-paper"
                    : "border-line text-ink-soft hover:border-champagne hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <RangeRow
        label="Preis max."
        unit="€"
        min={bounds.priceMin}
        max={bounds.priceMax}
        step={1000}
        value={filters.priceMax}
        onChange={(v) => setFilters({ ...filters, priceMax: v })}
      />

      <RangeRow
        label="Kilometer max."
        unit="km"
        min={0}
        max={bounds.mileageMax}
        step={5000}
        value={filters.mileageMax}
        onChange={(v) => setFilters({ ...filters, mileageMax: v })}
      />

      <RangeRow
        label="Baujahr ab"
        unit=""
        min={bounds.yearMin}
        max={bounds.yearMax}
        step={1}
        value={filters.yearMin}
        onChange={(v) => setFilters({ ...filters, yearMin: v })}
      />

      <div className="flex items-center justify-between border-t border-line pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
          {resultCount} Treffer
        </p>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne hover:underline"
        >
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne">
      {children}
    </p>
  );
}

function ChipGroup({
  label,
  items,
  active,
  onToggle,
}: {
  label: string;
  items: string[];
  active: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((it) => {
          const on = active.includes(it);
          return (
            <button
              key={it}
              type="button"
              onClick={() => onToggle(it)}
              className={`border px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                on
                  ? "border-champagne bg-champagne text-paper"
                  : "border-line text-ink-soft hover:border-champagne hover:text-ink"
              }`}
            >
              {it}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RangeRow({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-xs text-ink">
          {value.toLocaleString("de-DE")} {unit}
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
