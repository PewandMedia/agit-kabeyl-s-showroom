import { z } from "zod";
import {
  Field,
  Select,
  PrivacyConsent,
  Honeypot,
  SubmitButton,
  ErrorText,
  SuccessState,
} from "./primitives";
import { useLeadSubmit } from "./useLeadSubmit";
import { dealer } from "@/data/dealer";

const Schema = z.object({
  vehicle: z.string().trim().max(240).optional().default(""),
  price: z.string().trim().max(20).optional().default(""),
  downPayment: z.string().trim().max(20).optional().default(""),
  desiredRate: z.string().trim().max(20).optional().default(""),
  termMonths: z.string().trim().min(1, "Laufzeit wählen").max(4),
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  phone: z.string().trim().min(4, "Telefonnummer fehlt").max(40),
  email: z.string().trim().email("Ungültige E-Mail").max(200),
  privacy: z.literal("on", { message: "Bitte Datenschutz akzeptieren" }),
});

export function FinancingLeadForm({
  vehicleDefault = "",
  priceDefault,
}: {
  vehicleDefault?: string;
  priceDefault?: number;
}) {
  const { error, sent, handleSubmit } = useLeadSubmit({
    schema: Schema,
    buildSubject: (d) =>
      `Finanzierungsanfrage${d.vehicle ? `: ${d.vehicle}` : ""}`,
    buildBody: (d) =>
      [
        d.vehicle && `Fahrzeug: ${d.vehicle}`,
        d.price && `Kaufpreis: ${d.price} €`,
        d.downPayment && `Anzahlung: ${d.downPayment} €`,
        d.desiredRate && `Wunschrate: ${d.desiredRate} € / Monat`,
        `Laufzeit: ${d.termMonths} Monate`,
        "",
        `Name: ${d.name}`,
        `Telefon: ${d.phone}`,
        `E-Mail: ${d.email}`,
      ]
        .filter(Boolean)
        .join("\n"),
  });

  if (sent) {
    return (
      <SuccessState
        title="Finanzierungsanfrage erhalten."
        message="Wir prüfen die Konditionen mit unseren Partnerbanken und melden uns mit Ihrer persönlichen Indikation zurück."
        whatsappText={`Hallo ${dealer.shortName}, ich habe eine Finanzierungsanfrage gesendet.`}
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
      <Field
        label="Fahrzeug"
        name="vehicle"
        defaultValue={vehicleDefault}
        placeholder="z. B. Mercedes E 220 d AMG-Line"
      />
      <div className="grid grid-cols-2 gap-5">
        <Field
          label="Kaufpreis (€)"
          name="price"
          type="number"
          inputMode="numeric"
          defaultValue={priceDefault ? String(priceDefault) : ""}
        />
        <Field
          label="Anzahlung (€)"
          name="downPayment"
          type="number"
          inputMode="numeric"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Field
          label="Wunschrate (€/Mt.)"
          name="desiredRate"
          type="number"
          inputMode="numeric"
        />
        <Select
          label="Laufzeit"
          name="termMonths"
          required
          defaultValue="60"
          options={["12", "24", "36", "48", "60", "72", "84"]}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
        label="E-Mail"
        name="email"
        type="email"
        inputMode="email"
        required
        autoComplete="email"
      />
      <PrivacyConsent />
      <Honeypot />
      <ErrorText>{error}</ErrorText>
      <SubmitButton>Konditionen anfragen</SubmitButton>
    </form>
  );
}
