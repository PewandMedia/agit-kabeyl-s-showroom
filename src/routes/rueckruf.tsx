import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { TrustBlock } from "@/components/forms/primitives";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

export const Route = createFileRoute("/rueckruf")({
  head: () => ({
    meta: [
      { title: "Rückruf anfordern — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content:
          "Rückruf vom Autohaus AK GmbH in Velbert anfordern. Wunsch-Zeitfenster wählen, persönlich, kein Callcenter.",
      },
      { property: "og:title", content: "Rückruf anfordern — Autohaus AK" },
      {
        property: "og:description",
        content: "Wunsch-Zeitfenster wählen — wir rufen persönlich zurück.",
      },
      { property: "og:url", content: "/rueckruf" },
    ],
    links: [{ rel: "canonical", href: "/rueckruf" }],
  }),
  component: CallbackPage,
});

function CallbackPage() {
  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 md:px-10 md:pt-28 md:pb-24">
          <p className="kicker">Rückruf</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.04] text-ink md:text-7xl">
            Wir rufen{" "}
            <span className="text-gradient-gold">persönlich zurück.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Zwei Felder — fertig. Sie wählen das Zeitfenster, wir melden uns
            verbindlich. Kein Callcenter, kein Skript.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-20 md:px-10 md:py-24">
          <div className="md:col-span-7">
            <div className="border border-line bg-surface p-6 md:p-10">
              <p className="kicker">Rückruf-Wunsch</p>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                In 30 Sekunden gesendet.
              </h2>
              <div className="mt-8">
                <CallbackForm />
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <p className="kicker">Sofort sprechen</p>
            <div className="mt-5 grid gap-3">
              <a
                href={telLink()}
                className="flex items-center justify-between border border-ink/60 px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-paper"
              >
                <span>Anrufen</span>
                <span>{dealer.phoneDisplay}</span>
              </a>
              <a
                href={whatsappLink(`Hallo ${dealer.shortName}, ich hätte gern einen Rückruf.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-champagne px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper"
              >
                <span>WhatsApp</span>
                <span>Chat starten →</span>
              </a>
            </div>

            <div className="mt-10">
              <p className="kicker">Vertrauen</p>
              <div className="mt-5">
                <TrustBlock />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
