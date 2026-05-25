import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TestDriveForm } from "@/components/forms/TestDriveForm";
import { TrustBlock } from "@/components/forms/primitives";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

export const Route = createFileRoute("/probefahrt")({
  head: () => ({
    meta: [
      { title: "Probefahrt vereinbaren — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content:
          "Vereinbaren Sie Ihre Probefahrt beim Autohaus AK GmbH in Velbert. Wunschdatum wählen, in wenigen Stunden bestätigt — persönlich, unkompliziert.",
      },
      { property: "og:title", content: "Probefahrt vereinbaren — Autohaus AK" },
      {
        property: "og:description",
        content: "Wunschtermin wählen — wir bestätigen persönlich.",
      },
      { property: "og:url", content: "/probefahrt" },
    ],
    links: [{ rel: "canonical", href: "/probefahrt" }],
  }),
  component: TestDrivePage,
});

function TestDrivePage() {
  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-28 md:pb-24">
          <p className="kicker">Probefahrt</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.04] text-ink md:text-7xl">
            Erleben.{" "}
            <span className="text-gradient-gold">Dann entscheiden.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Wunschdatum wählen, Zeitfenster angeben — wir bestätigen Ihren
            Termin innerhalb weniger Stunden. Persönlich, ohne Druck, mit Zeit
            für Fragen.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-20 md:px-10 md:py-24">
          <div className="md:col-span-5">
            <p className="kicker">So einfach geht's</p>
            <ol className="mt-8 space-y-8">
              {[
                ["01", "Termin wählen", "Datum und Zeitfenster (Vormittag, Nachmittag, Samstag)."],
                ["02", "Bestätigung", "Wir bestätigen telefonisch oder per WhatsApp."],
                ["03", "Probefahrt", "Persönlich vor Ort in Velbert — ohne Verkaufsdruck."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-6 border-b border-line pb-6">
                  <span className="font-display text-3xl text-champagne">{n}</span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <p className="kicker">Vertrauen</p>
              <div className="mt-5">
                <TrustBlock />
              </div>
            </div>

            <div className="mt-10 border border-line p-6">
              <p className="kicker">Lieber direkt sprechen?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={telLink()}
                  className="inline-flex items-center border border-ink/60 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-paper"
                >
                  {dealer.phoneDisplay}
                </a>
                <a
                  href={whatsappLink(`Hallo ${dealer.shortName}, ich möchte eine Probefahrt vereinbaren.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-champagne px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="border border-line bg-surface p-6 md:p-10">
              <p className="kicker">Probefahrt-Anfrage</p>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                Termin vereinbaren.
              </h2>
              <div className="mt-8">
                <TestDriveForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
