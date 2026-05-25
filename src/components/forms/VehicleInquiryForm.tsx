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
import { dealer } from "@/data/dealer";

const Schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  phone: z.string().trim().min(4, "Telefonnummer fehlt").max(40),
  email: z
    .string()
    .trim()
    .email("Ungültige E-Mail")
    .max(200)
    .or(z.literal("")),
  vehicle: z.string().trim().max(240).optional().default(""),
  message: z.string().trim().min(5, "Bitte eine kurze Nachricht").max(2000),
  contactPreference: z.enum(["telefon", "whatsapp", "email"], {
    message: "Bitte Kontaktwunsch wählen",
  }),
  privacy: z.literal("on", { message: "Bitte Datenschutz akzeptieren" }),
});

export function VehicleInquiryForm({
  vehicleTitle,
  vehicleId,
  disabled = false,
  showVehicleField = false,
}: {
  vehicleTitle?: string;
  vehicleId?: string;
  disabled?: boolean;
  /** zeige Fahrzeug-Freitextfeld (z. B. auf Kontaktseite) */
  showVehicleField?: boolean;
}) {
  const defaultMsg = vehicleTitle
    ? `Guten Tag, ich interessiere mich für den ${vehicleTitle}${
        vehicleId ? ` (ID ${vehicleId})` : ""
      }. Bitte kontaktieren Sie mich für weitere Informationen und/oder eine Probefahrt.`
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
        d.vehicle && `Wunschfahrzeug: ${d.vehicle}`,
        "",
        `Name: ${d.name}`,
        `Telefon: ${d.phone}`,
        d.email && `E-Mail: ${d.email}`,
        `Kontaktwunsch: ${d.contactPreference}`,
        "",
        "Nachricht:",
        d.message,
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
      className="space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          autoComplete="name"
        />
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
        autoComplete="email"
      />
      {showVehicleField && (
        <Field
          label="Wunschfahrzeug (optional)"
          name="vehicle"
          placeholder="z. B. Mercedes E 220 d"
        />
      )}
      <Textarea
        label="Nachricht"
        name="message"
        required
        defaultValue={defaultMsg}
        rows={4}
      />
      <RadioChips
        label="Wie sollen wir Sie kontaktieren?"
        name="contactPreference"
        required
        defaultValue="telefon"
        options={[
          { value: "telefon", label: "Telefon" },
          { value: "whatsapp", label: "WhatsApp" },
          { value: "email", label: "E-Mail" },
        ]}
      />
      <PrivacyConsent />
      <Honeypot />
      <ErrorText>{error}</ErrorText>
      <fieldset disabled={disabled} className="contents">
        <SubmitButton>Anfrage absenden</SubmitButton>
      </fieldset>
    </form>
  );
}
