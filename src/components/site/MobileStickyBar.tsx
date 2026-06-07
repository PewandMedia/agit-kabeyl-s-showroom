import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

/**
 * Premium Bottom-Bar — nur Mobile.
 * - 3 Slots gleichmäßig: Anrufen · WhatsApp · Termin
 * - Aktiver Slot: Champagner Top-Strich
 * - Hide-on-Scroll-Down, Show-on-Scroll-Up
 * - Safe-Area + 72px Höhe
 */
export function MobileStickyBar() {
  const wa = whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isContact = location.pathname === "/kontakt";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="border-t border-champagne/30 bg-paper/95 backdrop-blur-xl pb-safe">
        <div className="grid grid-cols-3">
          <BarSlot
            href={telLink()}
            label="Anrufen"
            icon={<IconPhone />}
            active={false}
            ariaLabel={`Anrufen ${dealer.phoneDisplay}`}
          />
          <BarSlot
            href={wa}
            label="WhatsApp"
            icon={<IconWa />}
            active={false}
            external
            ariaLabel="WhatsApp Chat starten"
          />
          <BarSlot
            to="/kontakt"
            label="Termin"
            icon={<IconCalendar />}
            active={isContact}
          />
        </div>
      </div>
    </div>
  );
}

function BarSlot({
  to,
  href,
  label,
  icon,
  active,
  external,
  ariaLabel,
}: {
  to?: string;
  href?: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const cls = `relative flex h-[72px] flex-col items-center justify-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] transition-colors duration-300 ${
    active ? "text-champagne" : "text-ink-soft active:text-champagne"
  }`;
  const accent = (
    <span
      aria-hidden
      className={`absolute inset-x-0 top-0 h-[3px] bg-champagne transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
  const inner = (
    <>
      {accent}
      <span className="text-champagne">{icon}</span>
      <span>{label}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} activeProps={{ className: "text-champagne" }}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={cls}
    >
      {inner}
    </a>
  );
}

function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function IconWa() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1s-.7.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.7 4.3 3.8 1.6.6 2.2.7 3 .6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
