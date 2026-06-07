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
  return <Phone size={22} strokeWidth={1.6} aria-hidden />;
}
function IconWa() {
  return <MessageCircle size={22} strokeWidth={1.6} aria-hidden />;
}
function IconCalendar() {
  return <CalendarDays size={22} strokeWidth={1.6} aria-hidden />;
}
