import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { dealer } from "@/data/dealer";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz — Autohaus AK GmbH" },
      { name: "description", content: "Datenschutzerklärung." },
      { name: "robots", content: "noindex,follow" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-32">
          <p className="kicker">Rechtliches</p>
          <h1 className="mt-4 font-serif text-5xl text-ink">Datenschutz</h1>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink">
            <Block title="Verantwortlicher">
              {dealer.legalName}<br />
              {dealer.street}, {dealer.postalCode} {dealer.city}<br />
              E-Mail: {dealer.email}
            </Block>

            <Block title="Erhebung und Verarbeitung personenbezogener Daten">
              Wir verarbeiten personenbezogene Daten ausschließlich zum Zweck
              der Bearbeitung Ihrer Anfrage bzw. zur Vertragsabwicklung. Eine
              Weitergabe an Dritte erfolgt nur, sofern dies zur Vertragserfüllung
              notwendig oder gesetzlich vorgeschrieben ist.
            </Block>

            <Block title="Ihre Rechte">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit sowie das
              Recht auf Widerspruch gegen die Verarbeitung Ihrer Daten.
            </Block>

            <Block title="Speicherdauer">
              Personenbezogene Daten werden nur so lange gespeichert, wie es
              für die Erfüllung der genannten Zwecke erforderlich ist oder
              gesetzliche Aufbewahrungsfristen dies vorschreiben.
            </Block>

            <p className="text-xs text-ink-soft">
              Hinweis: Diese Datenschutzerklärung ist ein Platzhalter und sollte
              vor Live-Schaltung durch eine rechtsverbindliche Fassung
              (idealerweise mit anwaltlicher Prüfung) ersetzt werden.
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
