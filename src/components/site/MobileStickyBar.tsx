import { Link } from "@tanstack/react-router";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

/**
 * Bottom-Sticky-Bar nur auf Mobile. Vier Aktionen:
 * Fahrzeuge / Anrufen / WhatsApp / Anfrage
 */
export function MobileStickyBar() {
  const wa = whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="border-t border-champagne/30 bg-paper/95 backdrop-blur-xl">
        <div className="grid grid-cols-4">
          <Link
            to="/fahrzeuge"
            className="flex flex-col items-center justify-center gap-1 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-champagne"
          >
            <IconCar />
            Bestand
          </Link>
          <a
            href={telLink()}
            className="flex flex-col items-center justify-center gap-1 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-champagne"
          >
            <IconPhone />
            Anrufen
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 bg-champagne py-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-paper"
          >
            <IconWa />
            WhatsApp
          </a>
          <Link
            to="/kontakt"
            className="flex flex-col items-center justify-center gap-1 bg-ink py-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-paper"
          >
            <IconMail />
            Anfrage
          </Link>
        </div>
      </div>
    </div>
  );
}

function IconCar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 13l2-5h14l2 5M3 13v5h2v-2h14v2h2v-5M3 13h18M7 16h.01M17 16h.01" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function IconWa() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1s-.7.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.7 4.3 3.8 1.6.6 2.2.7 3 .6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
