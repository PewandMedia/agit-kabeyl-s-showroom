import { Link } from "@tanstack/react-router";
import { Calendar, Gauge, Zap, Cog, ArrowRight } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice } from "@/data/vehicles";

/**
 * Flyer-Style Highlight-Karte für die Startseite.
 * Inserat-Optik: großes Bild, Status-Badge, Eckdaten-Chips, Preis groß.
 */
export function HighlightFlyerCard({
  vehicle,
  priority = false,
}: {
  vehicle: Vehicle;
  priority?: boolean;
}) {
  const ps = Math.round(vehicle.powerKw * 1.359);
  const badge =
    vehicle.status === "highlight"
      ? "Highlight"
      : vehicle.status === "new-arrival"
        ? "Neu eingetroffen"
        : vehicle.status === "reserved"
          ? "Reserviert"
          : null;

  return (
    <Link
      to="/fahrzeuge/$id"
      params={{ id: vehicle.id }}
      aria-label={`${vehicle.title} — ${formatPrice(vehicle.priceEur)}`}
      className="group relative flex flex-col border border-line bg-surface transition-all duration-500 hover:border-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
    >
      {/* Flyer-Header mit Marken-Lockup */}
      <div className="flex items-center justify-between border-b border-line bg-paper/40 px-5 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-champagne" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.32em] text-champagne">
            Autohaus AK · Velbert
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
          {vehicle.id}
        </span>
      </div>

      {/* Hero-Bild */}
      <div className="relative aspect-[16/10] overflow-hidden bg-emerald-deep">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.title} ${vehicle.firstRegistration}`}
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          className="pointer-events-none h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent" />
        {badge && (
          <div className="pointer-events-none absolute left-4 top-4">
            <span className="bg-champagne px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-paper">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Titel & Marke */}
      <div className="border-t border-line p-6">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-champagne">
          {vehicle.make}
        </div>
        <h3 className="mt-2 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-ink md:text-2xl">
          {vehicle.title}
        </h3>

        {/* Eckdaten-Chips mit Icons */}
        <div className="mt-5 grid grid-cols-4 gap-2 border-t border-line pt-4">
          <SpecChip icon={<Calendar size={14} strokeWidth={1.6} />} label={vehicle.firstRegistration} />
          <SpecChip icon={<Gauge size={14} strokeWidth={1.6} />} label={formatKm(vehicle.mileageKm)} />
          <SpecChip icon={<Zap size={14} strokeWidth={1.6} />} label={`${ps} PS`} />
          <SpecChip icon={<Cog size={14} strokeWidth={1.6} />} label={vehicle.transmission === "Automatik" ? "Aut." : "Schalt."} />
        </div>

        {/* Preisblock */}
        <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-soft">
              Preis
            </div>
            <div className="mt-1 font-display text-3xl font-extrabold leading-none tracking-[-0.02em] text-champagne md:text-[34px]">
              {formatPrice(vehicle.priceEur)}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-champagne">
            Details
            <ArrowRight size={14} strokeWidth={1.8} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SpecChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 border-r border-line px-1 py-1 last:border-r-0">
      <span className="text-champagne">{icon}</span>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
