import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content:
          "Persönlich, geprüft, verbindlich. Die Werte hinter dem Autohaus AK GmbH in Velbert — und die Menschen dahinter.",
      },
      { property: "og:title", content: "Über uns — Autohaus AK GmbH" },
      {
        property: "og:description",
        content:
          "Persönlich, geprüft, verbindlich. Die Werte hinter dem Autohaus AK in Velbert.",
      },
      { property: "og:url", content: "/ueber-uns" },
    ],
    links: [{ rel: "canonical", href: "/ueber-uns" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-20 md:px-10 md:pt-20 md:pb-32">
          <p className="kicker">Über uns</p>
          {/* Alt-Headlines:
              · „Persönlich. Geprüft. Verbindlich."
              · „Ein Autohaus, das Verantwortung übernimmt." */}
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
            Ein Autohaus mit <span className="italic text-champagne">Haltung</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Autohaus AK GmbH ist ein inhabergeführtes Autohaus in Velbert.
            Wir arbeiten für Käufer, die Wert auf eine sorgfältige Auswahl,
            saubere Aufbereitung und eine ehrliche Beratung legen.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 md:grid-cols-12 md:gap-20 md:px-10 md:py-32">
          <div className="md:col-span-3">
            <p className="kicker">Werte</p>
          </div>
          <div className="md:col-span-9 space-y-12">
            <ValueBlock
              n="01"
              title="Sorgfalt"
              body="Eingangsprüfung, Aufbereitung und Dokumentation folgen einem festen Ablauf. Was nicht passt, kommt nicht in den Verkauf."
            />
            <ValueBlock
              n="02"
              title="Qualität"
              body="Wir kaufen nach Zustand, nicht nach Stückzahl. Jedes Fahrzeug, das bei uns steht, hat eine Geschichte, die wir kennen und vertreten."
            />
            <ValueBlock
              n="03"
              title="Verantwortung"
              body="Vor dem Kauf, beim Kauf, nach dem Kauf. Sie sprechen mit Menschen, die ihr Fahrzeug und ihre Aussage kennen."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface grain">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-10 md:py-40">
          <div className="grid gap-14 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="kicker">Unser Versprechen</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
                Klar in der Aussage. Sauber in der Übergabe.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="font-serif text-2xl leading-[1.3] text-ink md:text-3xl">
                Wir versprechen kein günstigstes Angebot. Wir versprechen ein
                Fahrzeug, das hält, was wir sagen — <span className="text-gradient-gold">und einen Ansprechpartner, der bleibt.</span>
              </p>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                Geprüfter Bestand, faire Konditionen, ein direkter Draht.
                Daran lassen wir uns messen — vom ersten Gespräch bis lange
                nach der Übergabe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 text-center md:px-10 md:py-32">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl text-ink md:text-5xl">
            Lernen Sie uns kennen.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-ink-soft md:text-lg">
            Vor Ort in Velbert oder direkt per Telefon, WhatsApp und E-Mail —
            wir nehmen uns Zeit für Ihre Fragen.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/fahrzeuge"
              className="inline-flex items-center justify-center bg-ink px-7 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
            >
              Fahrzeuge ansehen
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center border border-ink px-7 py-4 text-xs uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-paper"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ValueBlock({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="border-t border-line pt-8">
      <div className="flex items-baseline gap-6">
        <span className="kicker">{n}</span>
        <h3 className="font-serif text-3xl text-ink md:text-4xl">{title}</h3>
      </div>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
        {body}
      </p>
    </div>
  );
}
