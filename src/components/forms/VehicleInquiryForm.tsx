import { z } from "zod";
import {
  Field,
  Textarea,
  PrivacyConsent,
  Honeypot,
  SubmitButton,
  ErrorText,
  SuccessState,
} from "./primitives";
import { useLeadSubmit } from "./useLeadSubmit";
import { dealer } from "@/data/dealer";

const Schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  phone: z.string().trim().min(4, "Telefonnummer fehlt").max(40),
  message: z.string().trim().max(2000).optional().default(""),
  privacy: z.literal("on", { message: "Bitte Datenschutz akzeptieren" }),
});

export function VehicleInquiryForm({
  vehicleTitle,
  vehicleId,
  disabled = false,
  showVehicleField: _showVehicleField = false,
}: {
  vehicleTitle?: string;
  vehicleId?: string;
  disabled?: boolean;
  showVehicleField?: boolean;
}) {
  const defaultMsg = vehicleTitle
    ? `Interesse am ${vehicleTitle}${vehicleId ? ` (ID ${vehicleId})` : ""} — bitte zurückrufen.`
    : "";

  const { error, sent, handleSubmit } = useLeadSubmit({
    schema: Schema,
    buildSubject: (d) =>
      vehicleTitle
        ? `Fahrzeuganfrage: ${vehicleTitle}${vehicleId ? ` (${vehicleId})` : ""}`
        : `Anfrage über Website von ${d.name}`,
    buildBody: (d) =>
      [
        vehicleTitle && `Fahrzeug: ${vehicleTitle}`,
        vehicleId && `Fahrzeug-ID: ${vehicleId}`,
        "",
        `Name: ${d.name}`,
        `Telefon: ${d.phone}`,
        "",
        d.message ? "Nachricht:" : "",
        d.message || "(keine Nachricht)",
      ]
        .filter(Boolean)
        .join("\n"),
  });

  if (sent) {
    const waText = vehicleTitle
      ? `Hallo ${dealer.legalName}, ich interessiere mich für ${vehicleTitle}. Ist das Fahrzeug noch verfügbar?`
      : undefined;
    return <SuccessState whatsappText={waText} />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e.currentTarget);
      }}
      className="space-y-7"
      noValidate
    >
      <Field label="Name" name="name" required autoComplete="name" />
      <Field
        label="Telefon"
        name="phone"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
      />
      <Textarea
        label="Nachricht (optional)"
        name="message"
        defaultValue={defaultMsg}
        rows={3}
      />
      <PrivacyConsent />
      <Honeypot />
      <ErrorText>{error}</ErrorText>
      <fieldset disabled={disabled} className="contents">
        <SubmitButton>Rückruf anfordern</SubmitButton>
      </fieldset>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-soft">
        Antwort i. d. R. innerhalb von 2 Stunden · Mo–Sa
      </p>
    </form>
  );
}
