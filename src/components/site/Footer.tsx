import { Link } from "@tanstack/react-router";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

/** Parsed open/closed indicator. Operates client-side via Date(); deterministic enough server-side
 *  (we just render a neutral state initially and let hydration fill in). */
function isOpenNow(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0 Sun, 6 Sat
  const h = now.getHours() + now.getMinutes() / 60;
  if (day === 0) return false;
  if (day === 6) return h >= 10 && h < 15;
  return h >= 9 && h < 18.5;
}

export function Footer() {
  const open = isOpenNow();
  return (
    <footer className="relative border-t border-line bg-surface text-ink">
      <div className="gold-divider absolute inset-x-0 top-0" aria-hidden />

      {/* CTA-Strip */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:gap-8 md:px-10 md:py-14">
          <div>
            <p className="kicker">Bereit für die Probefahrt?</p>
            <p className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink md:text-3xl">
              Sprechen Sie uns an —{" "}
              <span className="text-champagne">heute noch.</span>
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <a
              href={telLink()}
              className="inline-flex min-h-[52px] items-center justify-center bg-champagne px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper transition-opacity hover:opacity-90"
            >
              Anrufen
            </a>
            <a
              href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center border border-champagne px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-champagne transition-colors hover:bg-champagne hover:text-paper"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold tracking-tighter text-ink">
                AK
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne">
                Autohaus · Velbert
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
              Geprüfte Premium- und Gebrauchtfahrzeuge aus Velbert. Persönliche
              Beratung, faire Konditionen, sauberer Service.
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-champagne/60">
              SYS · AK_V01 · LOC: VELBERT_DE
            </p>
          </div>

          {/* Bestand */}
          <div className="md:col-span-2">
            <p className="kicker">Bestand</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/fahrzeuge" className="text-ink-soft hover:text-champagne">Fahrzeuge</Link></li>
              <li><Link to="/probefahrt" className="text-ink-soft hover:text-champagne">Probefahrt</Link></li>
              <li><Link to="/finanzierung" className="text-ink-soft hover:text-champagne">Finanzierung</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div className="md:col-span-2">
            <p className="kicker">Service</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/auto-verkaufen" className="text-ink-soft hover:text-champagne">Auto verkaufen</Link></li>
              <li><Link to="/leistungen" className="text-ink-soft hover:text-champagne">Leistungen</Link></li>
              <li><Link to="/rueckruf" className="text-ink-soft hover:text-champagne">Rückruf</Link></li>
              <li><Link to="/ueber-uns" className="text-ink-soft hover:text-champagne">Über uns</Link></li>
            </ul>
          </div>

          {/* Kontakt + Hours */}
          <div className="md:col-span-4">
            <p className="kicker">Kontakt</p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-ink-soft">
              {dealer.legalName}<br />
              {dealer.street}<br />
              {dealer.postalCode} {dealer.city}
            </address>
            <div className="mt-4 space-y-1 text-sm">
              <a href={telLink()} className="block text-ink hover:text-champagne">
                {dealer.phoneDisplay}
              </a>
              <a href={`mailto:${dealer.email}`} className="block text-ink-soft hover:text-champagne">
                {dealer.email}
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 border border-line bg-paper/40 px-3 py-1.5">
              <span
                aria-hidden
                className={`inline-block h-2 w-2 ${open ? "bg-[oklch(0.7_0.18_150)]" : "bg-ink-soft"}`}
              />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                {open ? "Jetzt geöffnet" : "Aktuell geschlossen"}
              </span>
            </div>

            <ul className="mt-4 space-y-1 text-xs text-ink-soft">
              {dealer.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span className="font-mono uppercase tracking-widest">{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rechtsfuß */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-ink-soft md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {dealer.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link to="/impressum" className="hover:text-champagne">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-champagne">Datenschutz</Link>
            <Link to="/kontakt" className="hover:text-champagne">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
