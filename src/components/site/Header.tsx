import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

const NAV = [
  { to: "/", label: "Start" },
  { to: "/fahrzeuge", label: "Fahrzeuge" },
  { to: "/auto-verkaufen", label: "Auto verkaufen" },
  { to: "/finanzierung", label: "Finanzierung" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-paper/85 backdrop-blur-xl border-b border-line"
          : "bg-gradient-to-b from-paper/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label={dealer.legalName}
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center border border-champagne/60 font-serif text-base text-champagne md:h-10 md:w-10 md:text-lg">
            AK
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-base text-ink md:text-lg">
              Autohaus AK
            </span>
            <span className="kicker mt-1 text-[10px]">Velbert</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[12px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telLink()}
            className="text-[12px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
          >
            {dealer.phoneDisplay}
          </a>
          <a
            href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-ink px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-paper transition-opacity hover:opacity-90"
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
        <div className="border-t border-line bg-paper/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-sm uppercase tracking-[0.18em] text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={telLink()}
                className="border border-ink py-3 text-center text-xs uppercase tracking-[0.18em] text-ink"
              >
                Anrufen · {dealer.phoneDisplay}
              </a>
              <a
                href={whatsappLink(
                  `Hallo ${dealer.shortName}, ich habe eine Anfrage.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink py-3 text-center text-xs uppercase tracking-[0.18em] text-paper"
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
