import { Link } from "@tanstack/react-router";
import { dealer } from "@/data/dealer";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-paper/60 font-serif text-lg">
                AK
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg">Autohaus AK</span>
                <span className="kicker mt-1 text-[10px]">Velbert</span>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">
              Geprüfte Premium- und Gebrauchtfahrzeuge aus Velbert. Persönlich
              ausgewählt, sorgfältig aufbereitet, ehrlich verkauft.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="kicker text-paper/60">Navigation</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/fahrzeuge" className="text-paper/80 hover:text-paper">Fahrzeugbestand</Link></li>
              <li><Link to="/leistungen" className="text-paper/80 hover:text-paper">Leistungen</Link></li>
              <li><Link to="/ueber-uns" className="text-paper/80 hover:text-paper">Über uns</Link></li>
              <li><Link to="/kontakt" className="text-paper/80 hover:text-paper">Kontakt</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="kicker text-paper/60">Kontakt</p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-paper/80">
              {dealer.legalName}<br />
              {dealer.street}<br />
              {dealer.postalCode} {dealer.city}
            </address>
            <div className="mt-5 space-y-1 text-sm text-paper/80">
              <div>
                <a href={`tel:${dealer.phone.replace(/\s+/g, "")}`} className="hover:text-paper">
                  {dealer.phoneDisplay}
                </a>
              </div>
              <div>
                <a href={`mailto:${dealer.email}`} className="hover:text-paper">
                  {dealer.email}
                </a>
              </div>
            </div>
            <div className="mt-5 space-y-1 text-sm text-paper/70">
              {dealer.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-8 text-xs text-paper/50 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {dealer.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link to="/impressum" className="hover:text-paper">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-paper">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
