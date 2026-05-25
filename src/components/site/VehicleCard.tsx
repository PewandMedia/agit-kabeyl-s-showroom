import { Link } from "@tanstack/react-router";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice, formatKw } from "@/data/vehicles";
import { StatusBadge } from "@/components/site/StatusBadge";

export function VehicleCard({
  vehicle,
  priority = false,
}: {
  vehicle: Vehicle;
  priority?: boolean;
}) {
  const ps = Math.round(vehicle.powerKw * 1.359);
  const isSold = vehicle.status === "sold";

  return (
    <Link
      to="/fahrzeuge/$id"
      params={{ id: vehicle.id }}
      className="tech-card group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 md:aspect-video">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.title} ${vehicle.firstRegistration} — Gebrauchtwagen bei Autohaus AK Velbert`}
          width={1280}
          height={960}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            isSold ? "opacity-50 grayscale" : ""
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-3 top-3">
          <StatusBadge status={vehicle.status} />
        </div>
        <div className="absolute bottom-2 right-2 bg-ink/60 px-2 py-1 font-mono text-[9px] uppercase tracking-tight text-paper/90 backdrop-blur-sm">
          {vehicle.id}
        </div>
      </div>

      <div className="space-y-4 p-5 md:space-y-5 md:p-6">
        <div>
          <div className="text-eyebrow mb-1 truncate">
            {vehicle.make} / {vehicle.fuel}
          </div>
          <h3 className="font-display text-lg font-bold leading-tight text-ink md:text-lg">
            {vehicle.title}
          </h3>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="font-display text-2xl font-extrabold text-champagne md:text-xl">
              {formatPrice(vehicle.priceEur)}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              ab {monthlyRate(vehicle.priceEur)} €/Mt.*
            </div>
          </div>
        </div>

        <div className="spec-grid">
          <Spec label="Leistung" value={`${ps} PS`} />
          <Spec label="km" value={formatKm(vehicle.mileageKm)} />
          <Spec label="EZ" value={vehicle.firstRegistration} />
          <Spec label="Getriebe" value={vehicle.transmission} />
        </div>

        {vehicle.features && vehicle.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {vehicle.features.slice(0, 3).map((f) => (
              <span
                key={f}
                className="border border-line bg-surface px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-soft"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="flex min-h-[48px] w-full items-center justify-center border border-champagne/60 px-3 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-champagne transition-all duration-300 group-hover:bg-champagne group-hover:text-paper md:border-line md:text-ink md:group-hover:border-champagne">
          Datenblatt öffnen →
        </div>
      </div>

    </Link>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2.5 min-h-[44px]">
      <div className="font-mono text-[9px] uppercase tracking-widest text-ink-soft opacity-70">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-[13px] font-bold text-ink">{value}</div>
    </div>
  );
}

/** Indikative Finanzierungsrate (84 Mt., 4,99 % eff. p.a., 0 € Anzahlung) — nur als Anhaltspunkt. */
function monthlyRate(priceEur: number): string {
  const months = 84;
  const annual = 0.0499;
  const m = annual / 12;
  const rate = (priceEur * m) / (1 - Math.pow(1 + m, -months));
  return Math.round(rate).toLocaleString("de-DE");
}

export { formatKw };

