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
      className="group relative block overflow-hidden border border-line bg-surface transition-all duration-500 hover:border-champagne/60 hover:bg-surface-2"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-emerald-deep">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.title} ${vehicle.firstRegistration} — Gebrauchtwagen bei ${vehicle.make}`}
          width={1280}
          height={1024}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06] ${
            isSold ? "opacity-40 grayscale" : ""
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-transparent" />
        {(isSold || isReserved) && (
          <div className="absolute left-5 top-5">
            <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink">
              <span aria-hidden className="h-px w-6 bg-champagne" />
              {isSold ? "Verkauft" : "Reserviert"}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-champagne px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-y-0">
          <span>Zu den Details</span>
          <span aria-hidden>→</span>
        </div>
      </div>

      <div className="border-t border-line p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-champagne">
            {vehicle.make}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
            {vehicle.id}
          </div>
        </div>

        <h3 className="mt-3 font-display text-2xl font-extrabold leading-[1.05] tracking-[-0.02em] text-ink md:text-[26px]">
          {vehicle.title}
        </h3>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
          {formatKm(vehicle.mileageKm)}
          <span className="mx-2 text-champagne">·</span>
          {vehicle.firstRegistration}
          <span className="mx-2 text-champagne">·</span>
          {ps} PS
          <span className="mx-2 text-champagne">·</span>
          {vehicle.fuel}
        </p>

        <div className="mt-7 flex items-end justify-between border-t border-line pt-5">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-soft">
              ab {monthlyRate(vehicle.priceEur)} €/Monat*
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft/80">
              {vehicle.transmission}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl font-extrabold leading-none tracking-[-0.02em] text-champagne md:text-4xl">
              {formatPrice(vehicle.priceEur)}
            </div>
            <div className="mt-3 inline-flex items-center gap-2 border border-champagne/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-champagne">
              Details ansehen →
            </div>
          </div>
        </div>
      </div>
    </Link>
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
