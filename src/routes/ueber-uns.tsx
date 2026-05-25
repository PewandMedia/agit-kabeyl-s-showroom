import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import championPortrait from "@/assets/champion-portrait.jpg";

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


      {/* ───── KABAYEL STORY ───── */}
      <section className="border-b border-line bg-ink text-paper">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-32">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* TODO: Echtes Pressefoto von Agit Kabayel einsetzen, sobald Lizenz geklärt. */}
              <img
                src={championPortrait}
                alt="Agit Kabayel — WBC #1 Contender Heavyweight"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 border border-champagne/70 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-champagne backdrop-blur-sm">
                WBC · #1 Contender
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-champagne">
              Team Kabayel
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-paper md:text-6xl">
              Boxen & Autos —<br />
              <span className="text-champagne">gleiche Haltung.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-paper/80 md:text-lg">
              Autohaus AK ist das Autohaus von <strong>Agit Kabayel</strong> —
              Schwergewichts-Boxer aus Bochum und aktuell die Nummer 1 im
              WBC-Ranking. Was ihn auszeichnet, gilt auch für uns: konsequente
              Vorbereitung, ehrliche Arbeit, kein Kompromiss bei Qualität.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80 md:text-lg">
              Wer hier ein Fahrzeug kauft, kauft beim Team eines Profisportlers,
              der weiß, was Disziplin bedeutet — und der seinen Namen
              dahinterstellt.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-champagne/20 bg-champagne/20">
              <KStat label="WBC Rang" value="#1" />
              <KStat label="Gewichtsklasse" value="Heavyweight" />
              <KStat label="Heimat" value="Bochum" />
            </dl>

            <blockquote className="mt-10 border-l-2 border-champagne pl-5 font-display text-xl leading-snug text-paper md:text-2xl">
              „Im Ring und im Geschäft — du gewinnst durch Vorbereitung,
              nicht durch Glück."
              <footer className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-champagne">
                — Team Kabayel
              </footer>
            </blockquote>
          </div>
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

function KStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink px-4 py-5">
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-champagne/80">
        {label}
      </div>
      <div className="mt-2 font-display text-xl font-extrabold leading-none text-paper md:text-2xl">
        {value}
      </div>
    </div>
  );
}
