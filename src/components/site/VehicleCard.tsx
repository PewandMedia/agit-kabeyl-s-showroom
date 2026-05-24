import { Link } from "@tanstack/react-router";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice, formatKw } from "@/data/vehicles";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      to="/fahrzeuge/$id"
      params={{ id: vehicle.id }}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface">
        <img
          src={vehicle.image}
          alt={`${vehicle.title}, Baujahr ${vehicle.year}`}
          width={1280}
          height={832}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="bg-paper/70 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-champagne backdrop-blur-md">
            Geprüft
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-paper/70 px-3 py-1.5 text-sm font-medium text-ink backdrop-blur-md">
          {formatPrice(vehicle.priceEur)}
        </div>
      </div>
      <div className="mt-5">
        <p className="kicker">{vehicle.make}</p>
        <h3 className="mt-2 font-serif text-2xl text-ink leading-tight transition-colors group-hover:text-champagne">
          {vehicle.title}
        </h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          {vehicle.firstRegistration} · {formatKm(vehicle.mileageKm)} ·{" "}
          {vehicle.fuel} · {formatKw(vehicle.powerKw)}
        </p>
      </div>
    </Link>
  );
}
