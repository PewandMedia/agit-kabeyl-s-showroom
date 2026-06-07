import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Gauge,
  Zap,
  Fuel,
  Check,
  ArrowRight,
} from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice } from "@/data/vehicles";

/**
 * Kompakte Flyer-Karte im OZ-Inserat-Stil, vertikal gestapelt für ein
 * 3-Spalten-Grid auf der Startseite.
 */
export function HighlightFlyerCard({
  vehicle,
  priority = false,
}: {
  vehicle: Vehicle;
  priority?: boolean;
}) {
  const ps = Math.round(vehicle.powerKw * 1.359);
  const highlights = vehicle.features.slice(0, 5);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-ink text-paper shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] transition-colors duration-500 hover:border-primary/60">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

      {/* IMAGE */}
      <Link
        to="/fahrzeuge/$id"
        params={{ id: vehicle.id }}
        className="relative block aspect-[16/10] overflow-hidden bg-emerald-deep"
        aria-label={vehicle.title}
      >
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.title} ${vehicle.firstRegistration}`}
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.05]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

        {/* Brand corner */}
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 border border-champagne/60 bg-ink/50 px-2.5 py-1 backdrop-blur-sm">
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-champagne" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-champagne">
            Autohaus AK
          </span>
        </div>
      </Link>

      {/* HEADLINE */}
      <div className="px-6 pt-6">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-champagne">
          {vehicle.make}
        </div>
        <h3 className="mt-2 font-display text-2xl font-extrabold leading-[0.95] tracking-[-0.02em] text-paper md:text-3xl">
          {vehicle.model}
          <span className="ml-2 text-primary">{vehicle.variant.split(" ")[0]}</span>
        </h3>
        <div className="mt-2 line-clamp-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
          {vehicle.variant}
        </div>
      </div>

      {/* SPEC STRIP */}
      <div className="mx-6 mt-5 grid grid-cols-4 gap-px border border-line/40 bg-line/40">
        <SpecCell icon={<Zap size={13} strokeWidth={1.8} />} value={`${ps} PS`} />
        <SpecCell icon={<Gauge size={13} strokeWidth={1.8} />} value={formatKm(vehicle.mileageKm)} />
        <SpecCell icon={<Calendar size={13} strokeWidth={1.8} />} value={vehicle.firstRegistration} />
        <SpecCell icon={<Fuel size={13} strokeWidth={1.8} />} value={vehicle.fuel} />
      </div>

      {/* HIGHLIGHTS */}
      <div className="flex-1 px-6 pt-5">
        <div className="font-display text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary">
          Highlights
        </div>
        <ul className="mt-3 space-y-1.5">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[12.5px] leading-snug text-paper/90">
              <span className="mt-0.5 inline-flex h-3.5 w-3.5 flex-none items-center justify-center rounded-full border border-primary/70 text-primary">
                <Check size={9} strokeWidth={3} />
              </span>
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
      <div className="mx-6 mt-6 flex items-end justify-between border-l-2 border-primary bg-paper/[0.04] px-4 py-3">
        <div>
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-primary">
            Preis
          </div>
          <div className="mt-0.5 font-display text-2xl font-extrabold leading-none tracking-[-0.02em] text-paper md:text-[28px]">
            {formatPrice(vehicle.priceEur)}
          </div>
        </div>
        {vehicle.financingAvailable && vehicle.monthlyRateEur && (
          <div className="text-right font-mono text-[9px] uppercase tracking-[0.22em] text-champagne">
            ab {formatPrice(vehicle.monthlyRateEur)}
            <br />/Monat
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        to="/fahrzeuge/$id"
        params={{ id: vehicle.id }}
        className="mt-6 flex items-center justify-center gap-3 bg-primary px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        Weiter
        <ArrowRight size={14} strokeWidth={2.2} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

function SpecCell({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-ink px-1 py-2.5">
      <span className="text-champagne">{icon}</span>
      <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] text-paper text-center leading-tight">
        {value}
      </span>
    </div>
  );
}
