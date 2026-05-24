import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content:
          "Autohaus AK GmbH in Velbert. Die Werte der Marke AK: Disziplin, Qualität, Verantwortung. Lernen Sie unser Team kennen.",
      },
      { property: "og:title", content: "Über uns — Autohaus AK GmbH" },
      {
        property: "og:description",
        content:
          "Die Werte der Marke AK: Disziplin, Qualität, Verantwortung.",
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
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
            Eine Marke, die <span className="italic text-champagne">Haltung</span> hat.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Autohaus AK GmbH ist mehr als ein Händler. Wir verstehen uns als
            Plattform für Käufer, die Wert auf Auswahl, Qualität und ehrliche
            Beratung legen.
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
              title="Disziplin"
              body="Jede Aufbereitung, jede Prüfung, jede Übergabe folgt einem klaren Standard. Keine Abkürzungen — auch dann nicht, wenn niemand zusieht."
            />
            <ValueBlock
              n="02"
              title="Qualität"
              body="Wir wählen nicht nach Stückzahl, sondern nach Zustand. Ein Fahrzeug, das bei uns steht, hat eine Geschichte, die wir kennen — und vertreten."
            />
            <ValueBlock
              n="03"
              title="Verantwortung"
              body="Vor dem Kauf, nach dem Kauf, bei jeder Frage. Unsere Kunden bekommen Antworten von Menschen, die ihre Fahrzeuge kennen."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface grain">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
          <div className="grid gap-14 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="kicker">Die Marke AK</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
                Leistung auf höchstem Niveau.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="font-serif text-2xl leading-[1.3] text-ink md:text-3xl">
                Die Marke AK steht für Werte, die auf dem Ring entstanden sind
                und in unserem Autohaus weiterleben: <span className="text-gradient-gold">Disziplin, Vertrauen, Champion-Mentalität.</span>
              </p>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                Wer hier kauft, kauft mehr als ein Fahrzeug — er kauft das
                Versprechen einer Marke, die ihren Standard ernst nimmt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 text-center md:px-10 md:py-32">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl text-ink md:text-5xl">
            Sie wollen mehr erfahren?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-ink-soft md:text-lg">
            Wir freuen uns auf Ihren Besuch im Autohaus oder Ihre direkte
            Anfrage.
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
