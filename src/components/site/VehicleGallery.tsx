import { useCallback, useEffect, useState } from "react";

export function VehicleGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-2"
        aria-label="Bild vergrößern"
      >
        <img
          src={images[active]}
          alt={alt}
          width={1920}
          height={1200}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-3 right-3 bg-paper/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink backdrop-blur">
          {active + 1} / {images.length}  ·  Vergrößern
        </span>
        {images.length > 1 && (
          <>
            <NavButton dir="prev" onClick={(e) => { e.stopPropagation(); prev(); }} />
            <NavButton dir="next" onClick={(e) => { e.stopPropagation(); next(); }} />
          </>
        )}
      </button>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 md:gap-4">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-video overflow-hidden bg-surface-2 transition-all ${
                i === active
                  ? "ring-2 ring-champagne"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Bild ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                width={400}
                height={225}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={images[active]}
            alt={alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.22em] text-white/80 hover:text-white"
          >
            Schließen ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/80 hover:text-white"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/80 hover:text-white"
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function NavButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(e as unknown as React.MouseEvent);
      }}
      className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-paper/70 font-mono text-base text-ink backdrop-blur transition-all hover:bg-champagne hover:text-paper md:flex ${
        dir === "prev" ? "left-4" : "right-4"
      }`}
      aria-label={dir === "prev" ? "Vorheriges Bild" : "Nächstes Bild"}
    >
      {dir === "prev" ? "←" : "→"}
    </span>
  );
}
