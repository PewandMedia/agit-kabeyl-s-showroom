import { Link } from "@tanstack/react-router";
import { dealer } from "@/data/dealer";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface text-ink">
      <div className="gold-divider absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold tracking-tighter text-ink">
                AK
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne">
                Autohaus · Velbert
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
              Geprüfte Premium- und Gebrauchtfahrzeuge aus Velbert. Champion-
              Mentalität, ehrlicher Service, faire Konditionen.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-champagne/70">
              SYS · AK_V01 · LOC: VELBERT_DE
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="kicker">Navigation</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/fahrzeuge" className="text-ink-soft hover:text-ink">Fahrzeugbestand</Link></li>
              <li><Link to="/auto-verkaufen" className="text-ink-soft hover:text-ink">Auto verkaufen</Link></li>
              <li><Link to="/finanzierung" className="text-ink-soft hover:text-ink">Finanzierung</Link></li>
              <li><Link to="/ueber-uns" className="text-ink-soft hover:text-ink">Über uns</Link></li>
              <li><Link to="/kontakt" className="text-ink-soft hover:text-ink">Kontakt</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="kicker">Kontakt</p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-ink-soft">
              {dealer.legalName}<br />
              {dealer.street}<br />
              {dealer.postalCode} {dealer.city}
            </address>
            <div className="mt-5 space-y-1 text-sm">
              <div>
                <a href={`tel:${dealer.phone.replace(/\s+/g, "")}`} className="text-ink hover:text-champagne">
                  {dealer.phoneDisplay}
                </a>
              </div>
              <div>
                <a href={`mailto:${dealer.email}`} className="text-ink-soft hover:text-ink">
                  {dealer.email}
                </a>
              </div>
            </div>
            <div className="mt-5 space-y-1 text-sm text-ink-soft">
              {dealer.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-ink-soft md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {dealer.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link to="/impressum" className="hover:text-ink">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-ink">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
