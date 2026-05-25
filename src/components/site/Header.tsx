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
          ? "border-champagne/20 bg-paper/90 backdrop-blur-xl"
          : "border-transparent bg-paper/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link
          to="/"
          className="group flex items-baseline gap-2"
          aria-label={dealer.legalName}
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-2xl font-extrabold tracking-tighter text-ink">
            AK
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne">
            Autohaus
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-champagne"
              activeProps={{ className: "text-champagne" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={telLink()}
            className="font-mono text-[11px] font-semibold tracking-widest text-ink/80 hover:text-champagne"
          >
            {dealer.phoneDisplay}
          </a>
          <a
            href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-champagne px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-champagne transition-colors hover:bg-champagne hover:text-paper"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 right-0 top-0 h-px bg-ink transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 right-0 h-px bg-ink transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-champagne/20 bg-paper/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-2">
              <a
                href={telLink()}
                className="border border-line py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink"
              >
                Anrufen · {dealer.phoneDisplay}
              </a>
              <a
                href={whatsappLink(
                  `Hallo ${dealer.shortName}, ich habe eine Anfrage.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-champagne py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
