import { Link } from "@tanstack/react-router";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice, formatKw } from "@/data/vehicles";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const ps = Math.round(vehicle.powerKw * 1.359);
  const statusLabel =
    vehicle.status === "reserved"
      ? "Reserviert"
      : vehicle.status === "sold"
        ? "Verkauft"
        : "Geprüft";

  return (
    <Link
      to="/fahrzeuge/$id"
      params={{ id: vehicle.id }}
      className="tech-card group block"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-2">
        <img
          src={vehicle.image}
          alt={`${vehicle.title}, Baujahr ${vehicle.year}`}
          width={1280}
          height={720}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
        />
        <div className="absolute left-3 top-3">
          <span className="bg-champagne px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-tight text-paper">
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-eyebrow mb-1 truncate">
              {vehicle.make} / {vehicle.fuel}
            </div>
            <h3 className="font-display text-lg font-bold text-ink leading-tight">
              {vehicle.title}
            </h3>
          </div>
          <div className="font-display text-lg font-extrabold text-champagne whitespace-nowrap">
            {formatPrice(vehicle.priceEur)}
          </div>
        </div>

        <div className="spec-grid">
          <Spec label="Leistung" value={`${ps} PS`} />
          <Spec label="Laufleistung" value={formatKm(vehicle.mileageKm)} />
          <Spec label="EZ" value={vehicle.firstRegistration} />
          <Spec label="Getriebe" value={vehicle.transmission} />
        </div>

        <div className="block w-full border border-line py-3.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-all duration-300 group-hover:border-champagne group-hover:bg-champagne group-hover:text-paper">
          Datenblatt öffnen
        </div>
      </div>
    </Link>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2.5">
      <div className="font-mono text-[8px] uppercase tracking-widest text-ink-soft opacity-60">
        {label}
      </div>
      <div className="font-mono text-xs font-bold text-ink">{value}</div>
    </div>
  );
}

// Re-export for compatibility
export { formatKw };
