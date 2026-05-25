import { dealer, whatsappLink } from "@/data/dealer";

/**
 * Floating WhatsApp-Button — Desktop unten rechts,
 * auf Mobile oberhalb der MobileStickyBar.
 */
export function StickyWhatsAppFab() {
  return (
    <a
      href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp-Chat starten"
      className="group fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.62_0.17_150)] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 md:bottom-6 md:right-6 md:h-16 md:w-16"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1s-.7.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.7 4.3 3.8 1.6.6 2.2.7 3 .6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-champagne/30 bg-paper px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink opacity-0 transition-opacity group-hover:opacity-100 md:block">
        WhatsApp · Sofort antworten
      </span>
    </a>
  );
}
