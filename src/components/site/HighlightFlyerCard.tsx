import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Highlight-Karte: zeigt einen fertigen Flyer (Bild) und verlinkt
 * auf das passende Fahrzeug oder den Bestand.
 */
export function HighlightFlyerCard({
  image,
  alt,
  to,
  params,
  priority = false,
}: {
  image: string;
  alt: string;
  to: string;
  params?: Record<string, string>;
  priority?: boolean;
}) {
  return (
    <Link
      // @ts-expect-error — dynamic route string
      to={to}
      params={params}
      className="group relative block overflow-hidden border border-line bg-ink shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] transition-colors duration-500 hover:border-primary/60"
      aria-label={alt}
    >
      <img
        src={image}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
        className="block h-auto w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.02]"
      />
      <div className="flex items-center justify-between gap-3 border-t border-line bg-ink px-5 py-4 text-paper">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-champagne">
          Zum Fahrzeug
        </span>
        <ArrowRight
          size={16}
          strokeWidth={2.2}
          className="text-primary transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
