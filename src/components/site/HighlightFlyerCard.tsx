import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Gauge,
  Zap,
  Cog,
  Fuel,
  Check,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Handshake,
} from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatPrice } from "@/data/vehicles";

/**
 * Flyer-Style Highlight-Karte im Stil eines klassischen Autohaus-Inserats
 * (Vorbild: OZ Automobile-Flyer). Dunkler Hintergrund, große Headline,
 * Spec-Chips, Highlights-Liste, Preisblock, Bildcollage.
 */
export function HighlightFlyerCard({
  vehicle,
  priority = false,
}: {
  vehicle: Vehicle;
  priority?: boolean;
}) {
  const ps = Math.round(vehicle.powerKw * 1.359);
  const highlights = vehicle.features.slice(0, 8);
  const thumbs = vehicle.images.slice(1, 4);

  return (
    <article
      className="relative overflow-hidden border border-line bg-ink text-paper shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
      aria-label={`${vehicle.title} — ${formatPrice(vehicle.priceEur)}`}
    >
      {/* Dezente rote Akzentlinie oben */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* HEADER */}
      <header className="flex items-start justify-between gap-6 px-6 pt-6 md:px-10 md:pt-8">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-7 w-7 border border-champagne/70 grid place-items-center">
            <span className="font-display text-[11px] font-extrabold text-champagne">AK</span>
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-paper">
              Autohaus AK
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-champagne">
              Velbert
            </div>
          </div>
        </div>

        <ul className="hidden flex-col gap-1.5 sm:flex">
          <TrustChip Icon={Handshake} label="Im Kundenauftrag" />
          <TrustChip Icon={ShieldCheck} label="Unfallfrei" />
          <TrustChip Icon={FileCheck2} label="Scheckheftgepflegt" />
        </ul>
      </header>

      {/* TITLE + HERO IMAGE */}
      <div className="grid gap-6 px-6 pt-6 md:grid-cols-12 md:gap-8 md:px-10 md:pt-8">
        <div className="md:col-span-5">
          <div className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-paper md:text-5xl">
            {vehicle.make}
          </div>
          <div className="mt-1 font-display text-4xl font-black uppercase italic leading-[0.95] tracking-[-0.02em] text-primary md:text-6xl">
            {vehicle.model}
          </div>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-champagne">
            {vehicle.variant}
          </div>

          {/* Mobile trust chips */}
          <ul className="mt-5 flex flex-wrap gap-2 sm:hidden">
            <TrustChip Icon={Handshake} label="Im Kundenauftrag" />
            <TrustChip Icon={ShieldCheck} label="Unfallfrei" />
          </ul>
        </div>

        <div className="relative md:col-span-7">
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
              className="h-full w-full object-cover"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* SPEC STRIP */}
      <div className="mx-6 mt-7 grid grid-cols-2 gap-px border border-line/40 bg-line/40 md:mx-10 md:grid-cols-5">
        <SpecCell icon={<Zap size={16} strokeWidth={1.6} />} value={`${ps} PS`} label={`${vehicle.powerKw} kW`} />
        <SpecCell icon={<Gauge size={16} strokeWidth={1.6} />} value={formatKm(vehicle.mileageKm)} label="Kilometer" />
        <SpecCell icon={<Calendar size={16} strokeWidth={1.6} />} value={vehicle.firstRegistration} label="Erstzul." />
        <SpecCell icon={<Fuel size={16} strokeWidth={1.6} />} value={vehicle.fuel} label="Kraftstoff" />
        <SpecCell icon={<Cog size={16} strokeWidth={1.6} />} value={vehicle.transmission === "Automatik" ? "Automatik" : "Schalt."} label="Getriebe" />
      </div>

      {/* HIGHLIGHTS + THUMBS + PRICE */}
      <div className="grid gap-8 px-6 pb-2 pt-8 md:grid-cols-12 md:gap-10 md:px-10 md:pt-10">
        {/* Highlights */}
        <div className="md:col-span-6">
          <div className="font-display text-xs font-extrabold uppercase tracking-[0.32em] text-primary">
            Highlights
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[13px] leading-snug text-paper/90">
                <span className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border border-primary/60 text-primary">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Thumbs + Price */}
        <div className="md:col-span-6">
          {thumbs.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5">
              {thumbs.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden bg-emerald-deep">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-end justify-between border-l-2 border-primary bg-paper/[0.04] px-5 py-4">
            <div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.32em] text-primary">
                Preis
              </div>
              <div className="mt-1 font-display text-3xl font-extrabold leading-none tracking-[-0.02em] text-paper md:text-[40px]">
                {formatPrice(vehicle.priceEur)}
              </div>
            </div>
            <div className="text-right font-mono text-[9px] uppercase tracking-[0.22em] text-paper/60">
              <div>inkl. MwSt.</div>
              {vehicle.financingAvailable && vehicle.monthlyRateEur && (
                <div className="mt-1 text-champagne">
                  ab {formatPrice(vehicle.monthlyRateEur)} /Mt.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA FOOTER */}
      <footer className="mt-8 grid grid-cols-1 border-t border-line/40 sm:grid-cols-2">
        <Link
          to="/fahrzeuge/$id"
          params={{ id: vehicle.id }}
          className="group flex items-center justify-center gap-3 bg-primary px-6 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Jetzt entdecken
          <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/fahrzeuge/$id"
          params={{ id: vehicle.id }}
          hash="kontakt"
          className="flex items-center justify-center gap-3 border-t border-line/40 px-6 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-champagne transition-colors hover:bg-paper/[0.04] sm:border-l sm:border-t-0"
        >
          Anfragen & Flyer
        </Link>
      </footer>
    </article>
  );
}

function SpecCell({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-ink px-4 py-3.5">
      <span className="text-champagne">{icon}</span>
      <div className="leading-tight">
        <div className="font-display text-sm font-bold text-paper">{value}</div>
        <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-paper/50">
          {label}
        </div>
      </div>
    </div>
  );
}

function TrustChip({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
}) {
  return (
    <li className="inline-flex items-center gap-2 border border-champagne/30 bg-paper/[0.03] px-2.5 py-1">
      <Icon size={11} strokeWidth={1.8} className="text-champagne" />
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-paper/85">
        {label}
      </span>
    </li>
  );
}
