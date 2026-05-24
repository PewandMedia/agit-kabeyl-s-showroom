import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Autohaus AK GmbH, Velbert" },
      {
        name: "description",
        content: `Kontakt zum Autohaus AK GmbH in ${dealer.city}. Telefon, WhatsApp, E-Mail und Standort.`,
      },
      { property: "og:title", content: "Kontakt — Autohaus AK GmbH" },
      {
        property: "og:description",
        content: "Direkter Draht — Telefon, WhatsApp, E-Mail.",
      },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wird in Phase 2 (Lovable Cloud) an die leads-Tabelle gesendet.
    setSent(true);
  }

  return (
    <SiteLayout>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-16 md:px-10 md:pt-20 md:pb-24">
          <p className="kicker">Kontakt</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] text-ink md:text-7xl">
            Sprechen wir.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            Telefon, WhatsApp oder ein kurzes Formular — wählen Sie, was am
            schnellsten geht. Wir melden uns persönlich zurück.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 md:grid-cols-12 md:gap-20 md:px-10 md:py-24">
          <div className="md:col-span-5">
            <p className="kicker">Direkt erreichbar</p>
            <div className="mt-6 space-y-6">
              <a
                href={telLink()}
                className="block border-b border-line pb-4 hover:border-ink"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  Telefon
                </p>
                <p className="mt-2 font-serif text-2xl text-ink">
                  {dealer.phoneDisplay}
                </p>
              </a>
              <a
                href={whatsappLink(`Hallo ${dealer.shortName}, ich habe eine Anfrage.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-line pb-4 hover:border-ink"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  WhatsApp
                </p>
                <p className="mt-2 font-serif text-2xl text-ink">
                  Chat starten
                </p>
              </a>
              <a
                href={`mailto:${dealer.email}`}
                className="block border-b border-line pb-4 hover:border-ink"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  E-Mail
                </p>
                <p className="mt-2 font-serif text-2xl text-ink break-all">
                  {dealer.email}
                </p>
              </a>
            </div>

            <div className="mt-10">
              <p className="kicker">Anschrift</p>
              <address className="mt-4 not-italic text-base text-ink">
                {dealer.legalName}<br />
                {dealer.street}<br />
                {dealer.postalCode} {dealer.city}
              </address>
            </div>

            <div className="mt-10">
              <p className="kicker">Öffnungszeiten</p>
              <div className="mt-4 space-y-1 text-sm text-ink max-w-sm">
                {dealer.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6 border-b border-line pb-1">
                    <span>{h.day}</span>
                    <span className="text-ink-soft">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="border border-line p-8 md:p-10">
              <p className="kicker">Anfrage senden</p>
              <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
                Wir melden uns zurück.
              </h2>

              {sent ? (
                <div className="mt-10 border border-champagne/40 bg-champagne/5 p-6 text-sm text-ink">
                  Vielen Dank — Ihre Anfrage ist eingegangen. Wir melden uns in
                  Kürze persönlich.
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 space-y-5">
                  <Field label="Name" name="name" required />
                  <Field label="Telefon" name="phone" type="tel" required />
                  <Field label="E-Mail (optional)" name="email" type="email" />
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      Nachricht
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                    />
                  </div>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />
                  <button
                    type="submit"
                    className="w-full bg-ink px-6 py-4 text-xs uppercase tracking-[0.22em] text-paper hover:opacity-90"
                  >
                    Anfrage senden
                  </button>
                  <p className="text-xs text-ink-soft">
                    Mit dem Absenden stimmen Sie unserer{" "}
                    <a href="/datenschutz" className="underline hover:text-ink">
                      Datenschutzerklärung
                    </a>{" "}
                    zu.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
      />
    </div>
  );
}
