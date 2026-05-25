import { useEffect } from "react";

/**
 * Bottom-Sheet auf Mobile, klassisches zentriertes Modal auf Desktop.
 * ESC / Overlay schließt. Safe-area-aware.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 backdrop-blur-sm md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden border-t border-champagne/30 bg-paper shadow-2xl md:max-h-[88vh] md:border md:border-champagne/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag-Indicator (nur Mobile) */}
        <div className="flex justify-center pt-2 md:hidden">
          <span aria-hidden className="h-1 w-10 rounded-full bg-ink-soft/40" />
        </div>
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-paper px-5 py-4 md:px-10 md:py-6">
          <div className="min-w-0">
            <p className="kicker">Anfrage</p>
            <h2 className="mt-1 truncate font-display text-xl text-ink md:text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-line text-ink-soft transition-colors hover:border-champagne hover:text-champagne"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6 pb-safe md:px-10 md:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
