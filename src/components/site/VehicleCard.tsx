import { Link } from "@tanstack/react-router";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice, formatKw } from "@/data/vehicles";

export function VehicleCard({
  vehicle,
  priority = false,
}: {
  vehicle: Vehicle;
  priority?: boolean;
}) {
  const ps = Math.round(vehicle.powerKw * 1.359);
  const isSold = vehicle.status === "sold";
  const isReserved = vehicle.status === "reserved";

  return (
    <Link
      to="/fahrzeuge/$id"
      params={{ id: vehicle.id }}
      aria-label={`${vehicle.title} — ${formatPrice(vehicle.priceEur)} ansehen`}
      className="group relative block overflow-hidden border border-line bg-surface transition-all duration-500 hover:border-champagne/60 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-emerald-deep">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.title} ${vehicle.firstRegistration}`}
          width={1280}
          height={1024}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          className={`pointer-events-none h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06] ${
            isSold ? "opacity-40 grayscale" : ""
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/80 via-paper/10 to-transparent" />
        {(isSold || isReserved) && (
          <div className="pointer-events-none absolute left-4 top-4">
            <span className="flex items-center gap-2 bg-paper/85 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink backdrop-blur">
              {isSold ? "Verkauft" : "Reserviert"}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute bottom-4 right-4 bg-paper/85 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-champagne backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Details →
        </div>
      </div>

      <div className="border-t border-line p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-champagne">
            {vehicle.make}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
            {vehicle.id}
          </div>
        </div>

        <h3 className="mt-2 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-ink md:text-[22px]">
          {vehicle.title}
        </h3>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          {vehicle.firstRegistration}
          <span className="mx-2 text-champagne">·</span>
          {formatKm(vehicle.mileageKm)}
          <span className="mx-2 text-champagne">·</span>
          {ps} PS
          <span className="mx-2 text-champagne">·</span>
          {vehicle.transmission}
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-soft">
            Preis
          </div>
          <div className="font-display text-2xl font-extrabold leading-none tracking-[-0.02em] text-champagne md:text-3xl">
            {formatPrice(vehicle.priceEur)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export { formatKw };
