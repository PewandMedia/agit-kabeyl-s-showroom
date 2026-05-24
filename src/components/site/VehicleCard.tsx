import { Link } from "@tanstack/react-router";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice } from "@/data/vehicles";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      to="/fahrzeuge/$id"
      params={{ id: vehicle.id }}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <img
          src={vehicle.image}
          alt={`${vehicle.title}, Baujahr ${vehicle.year}`}
          width={1280}
          height={832}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="kicker">{vehicle.make}</p>
          <h3 className="mt-2 font-serif text-2xl text-ink leading-tight">
            {vehicle.title}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-soft">
            {vehicle.firstRegistration} · {formatKm(vehicle.mileageKm)} ·{" "}
            {vehicle.fuel}
          </p>
        </div>
        <div className="text-right">
          <p className="font-serif text-xl text-ink whitespace-nowrap">
            {formatPrice(vehicle.priceEur)}
          </p>
        </div>
      </div>
    </Link>
  );
}
