import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { dealer } from "@/data/dealer";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Autohaus AK GmbH" },
      { name: "description", content: "Impressum und Anbieterkennzeichnung." },
      { name: "robots", content: "noindex,follow" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <SiteLayout>
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-32">
          <p className="kicker">Rechtliches</p>
          <h1 className="mt-4 font-serif text-5xl text-ink">Impressum</h1>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink">
            <Block title="Angaben gemäß § 5 TMG">
              {dealer.legalName}<br />
              {dealer.street}<br />
              {dealer.postalCode} {dealer.city}<br />
              Deutschland
            </Block>

            <Block title="Vertretungsberechtigt">
              Geschäftsführer: [TODO Name eintragen]
            </Block>

            <Block title="Kontakt">
              Telefon: {dealer.phoneDisplay}<br />
              E-Mail: {dealer.email}
            </Block>

            <Block title="Registereintrag">
              Eintragung im Handelsregister.<br />
              Registergericht: [TODO]<br />
              Registernummer: [TODO]
            </Block>

            <Block title="Umsatzsteuer-ID">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
              [TODO USt-IdNr.]
            </Block>

            <Block title="Verbraucherstreitbeilegung">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </Block>

            <p className="text-xs text-ink-soft">
              Hinweis: Dieses Impressum enthält Platzhalter und muss vor Live-Schaltung
              durch die tatsächlichen rechtlichen Angaben ergänzt werden.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-ink">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
