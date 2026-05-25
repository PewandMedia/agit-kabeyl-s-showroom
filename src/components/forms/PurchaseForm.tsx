import { z } from "zod";
import {
  Field,
  Textarea,
  RadioChips,
  PrivacyConsent,
  Honeypot,
  SubmitButton,
  ErrorText,
  SuccessState,
} from "./primitives";
import { useLeadSubmit } from "./useLeadSubmit";
import { dealer, whatsappLink } from "@/data/dealer";

const Schema = z.object({
  make: z.string().trim().min(1, "Marke angeben").max(60),
  model: z.string().trim().min(1, "Modell angeben").max(80),
  year: z
    .string()
    .trim()
    .regex(/^(19|20)\d{2}$/, "Baujahr als 4-stellige Jahreszahl"),
  mileage: z
    .string()
    .trim()
    .regex(/^\d{1,7}$/, "Kilometerstand als Zahl"),
  fuel: z.enum(["benzin", "diesel", "hybrid", "elektro", "andere"], {
    message: "Kraftstoff wählen",
  }),
  transmission: z.enum(["automatik", "schaltung"], {
    message: "Getriebe wählen",
  }),
  condition: z.enum(["sehr-gut", "gut", "gebrauchsspuren", "reparatur"], {
    message: "Zustand wählen",
  }),
  accidentFree: z.enum(["ja", "nein"], { message: "Bitte angeben" }),
  desiredPrice: z.string().trim().max(20).optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  phone: z.string().trim().min(4, "Telefonnummer fehlt").max(40),
  email: z.string().trim().email("Ungültige E-Mail").max(200).or(z.literal("")),
  privacy: z.literal("on", { message: "Bitte Datenschutz akzeptieren" }),
});

export function PurchaseForm() {
  const { error, sent, handleSubmit } = useLeadSubmit({
    schema: Schema,
    buildSubject: (d) => `Ankauf-Anfrage: ${d.make} ${d.model} (${d.year})`,
    buildBody: (d) =>
      [
        `Marke: ${d.make}`,
        `Modell: ${d.model}`,
        `Baujahr: ${d.year}`,
        `Kilometerstand: ${d.mileage} km`,
        `Kraftstoff: ${d.fuel}`,
        `Getriebe: ${d.transmission}`,
        `Zustand: ${d.condition}`,
        `Unfallfrei: ${d.accidentFree}`,
        d.desiredPrice && `Wunschpreis: ${d.desiredPrice} €`,
        d.notes && `\nAnmerkungen:\n${d.notes}`,
        "",
        `Name: ${d.name}`,
        `Telefon: ${d.phone}`,
        d.email && `E-Mail: ${d.email}`,
      ]
        .filter(Boolean)
        .join("\n"),
  });

  if (sent) {
    const photoWa = `Hallo ${dealer.legalName}, anbei die Fotos zu meinem soeben gesendeten Ankauf-Angebot.`;
    return (
      <SuccessState
        title="Ankauf-Anfrage erhalten."
        message="Wir prüfen Markt, Historie und Zustand und melden uns innerhalb von 24 Stunden mit einer fairen Einschätzung."
        whatsappText={photoWa}
        extra={
          <div className="border border-champagne/30 bg-paper/40 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne">
              Tipp · Fotos beschleunigen die Bewertung
            </p>
            <p className="mt-2 text-xs text-ink/80">
              Senden Sie uns einfach 4–6 Bilder (außen, innen, Cockpit, Tacho)
              direkt per WhatsApp — das gibt uns sofort ein realistisches Bild.
            </p>
            <a
              href={whatsappLink(photoWa)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center bg-champagne px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper"
            >
              Fotos per WhatsApp senden
            </a>
          </div>
        }
      />
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e.currentTarget);
      }}
      className="space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Marke" name="make" required placeholder="z. B. BMW" />
        <Field label="Modell" name="model" required placeholder="z. B. 530d" />
        <Field
          label="Baujahr"
          name="year"
          required
          inputMode="numeric"
          placeholder="JJJJ"
        />
        <Field
          label="Kilometerstand"
          name="mileage"
          required
          type="number"
          inputMode="numeric"
        />
      </div>

      <RadioChips
        label="Kraftstoff"
        name="fuel"
        required
        defaultValue="diesel"
        options={[
          { value: "benzin", label: "Benzin" },
          { value: "diesel", label: "Diesel" },
          { value: "hybrid", label: "Hybrid" },
          { value: "elektro", label: "Elektro" },
          { value: "andere", label: "Andere" },
        ]}
      />
      <RadioChips
        label="Getriebe"
        name="transmission"
        required
        defaultValue="automatik"
        options={[
          { value: "automatik", label: "Automatik" },
          { value: "schaltung", label: "Schaltung" },
        ]}
      />
      <RadioChips
        label="Zustand"
        name="condition"
        required
        defaultValue="gut"
        options={[
          { value: "sehr-gut", label: "Sehr gut" },
          { value: "gut", label: "Gut" },
          { value: "gebrauchsspuren", label: "Gebrauchsspuren" },
          { value: "reparatur", label: "Reparaturbedürftig" },
        ]}
      />
      <RadioChips
        label="Unfallfrei?"
        name="accidentFree"
        required
        defaultValue="ja"
        options={[
          { value: "ja", label: "Ja" },
          { value: "nein", label: "Nein" },
        ]}
      />

      <Field
        label="Wunschpreis (optional, €)"
        name="desiredPrice"
        type="number"
        inputMode="numeric"
      />

      <Textarea
        label="Anmerkungen (optional)"
        name="notes"
        placeholder="Besonderheiten, Ausstattung, Service-Historie …"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
        />
      </div>
      <Field
        label="E-Mail (optional)"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
      />

      <PrivacyConsent />
      <Honeypot />
      <ErrorText>{error}</ErrorText>
      <SubmitButton>Bewertung anfordern</SubmitButton>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
        Fotos können nach dem Senden direkt per WhatsApp übermittelt werden.
      </p>
    </form>
  );
}
