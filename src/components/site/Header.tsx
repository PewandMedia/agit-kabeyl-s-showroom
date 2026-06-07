import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

const NAV = [
  { to: "/fahrzeuge", label: "Bestand" },
  { to: "/auto-verkaufen", label: "Ankauf" },
  { to: "/finanzierung", label: "Finanzierung" },
  { to: "/rueckruf", label: "Rückruf" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-champagne/30 bg-paper/92 backdrop-blur-xl"
          : "border-transparent bg-paper/72 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-20 md:px-10">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label={dealer.legalName}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tighter text-ink">
              AK
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne">
              Autohaus
            </span>
          </div>
          <span className="hidden items-center gap-1.5 whitespace-nowrap border border-champagne/70 bg-surface px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-champagne 2xl:inline-flex">
            <span aria-hidden className="h-1 w-1 rotate-45 bg-champagne" />
            Team Kabayel · WBC #1
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-champagne xl:tracking-[0.2em]"
              activeProps={{ className: "text-champagne" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={telLink()}
            className="hidden whitespace-nowrap font-mono text-[11px] font-semibold tracking-widest text-ink/80 hover:text-champagne xl:inline"
          >
            {dealer.phoneDisplay}
          </a>
          <a
            href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap border border-champagne px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-champagne transition-colors hover:bg-champagne hover:text-paper xl:px-5 xl:tracking-[0.25em]"
          >
            WhatsApp
          </a>
        </div>


        {/* Mobile: Telefon-Icon + Menü-Button immer sichtbar */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={telLink()}
            aria-label={`Anrufen ${dealer.phoneDisplay}`}
            className="flex h-11 w-11 items-center justify-center text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center text-ink"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 right-0 top-0 h-[2px] bg-ink transition-transform ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-ink transition-transform ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-champagne/20 bg-paper/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-4">
            <div className="mb-4 grid grid-cols-2 gap-2">
              <a
                href={telLink()}
                className="flex min-h-[52px] items-center justify-center border border-ink/40 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink"
              >
                Anrufen
              </a>
              <a
                href={whatsappLink(
                  `Hallo ${dealer.shortName}, ich habe eine Anfrage.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center bg-champagne font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper"
              >
                WhatsApp
              </a>
            </div>
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex min-h-[56px] items-center justify-between border-b border-line font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink"
                activeProps={{ className: "text-champagne" }}
              >
                {item.label}
                <span aria-hidden className="text-champagne">→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
