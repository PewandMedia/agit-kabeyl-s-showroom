import { z } from "zod";
import {
  Field,
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
  vehicle: z.string().trim().min(2, "Bitte Fahrzeug angeben").max(240),
  preferredDate: z.string().trim().min(1, "Bitte Wunschdatum wählen").max(40),
  preferredTime: z.enum(["vormittag", "nachmittag", "samstag"], {
    message: "Bitte Zeitfenster wählen",
  }),
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  phone: z.string().trim().min(4, "Telefonnummer fehlt").max(40),
  email: z.string().trim().email("Ungültige E-Mail").max(200).or(z.literal("")),
  privacy: z.literal("on", { message: "Bitte Datenschutz akzeptieren" }),
});

export function TestDriveForm({
  vehicleTitle,
  vehicleId,
}: {
  vehicleTitle?: string;
  vehicleId?: string;
}) {
  const { error, sent, handleSubmit } = useLeadSubmit({
    schema: Schema,
    buildSubject: (d) =>
      `Probefahrt-Anfrage: ${d.vehicle}${vehicleId ? ` (${vehicleId})` : ""}`,
    buildBody: (d) =>
      [
        `Fahrzeug: ${d.vehicle}`,
        vehicleId && `Fahrzeug-ID: ${vehicleId}`,
        `Wunschdatum: ${d.preferredDate}`,
        `Zeitfenster: ${d.preferredTime}`,
        "",
        `Name: ${d.name}`,
        `Telefon: ${d.phone}`,
        d.email && `E-Mail: ${d.email}`,
      ]
        .filter(Boolean)
        .join("\n"),
  });

  if (sent) {
    const waText = vehicleTitle
      ? `Hallo ${dealer.legalName}, ich möchte eine Probefahrt mit dem ${vehicleTitle} vereinbaren.`
      : `Hallo ${dealer.legalName}, ich möchte eine Probefahrt vereinbaren.`;
    return (
      <SuccessState
        title="Probefahrt-Wunsch erhalten."
        message="Wir bestätigen Ihren Termin telefonisch oder per WhatsApp."
        whatsappText={waText}
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
        required
        defaultValue={vehicleTitle ?? ""}
        placeholder="z. B. BMW M3 Competition"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Wunschdatum"
          name="preferredDate"
          type="date"
          required
        />
        <RadioChips
          label="Zeitfenster"
          name="preferredTime"
          required
          defaultValue="nachmittag"
          options={[
            { value: "vormittag", label: "Vormittag" },
            { value: "nachmittag", label: "Nachmittag" },
            { value: "samstag", label: "Samstag" },
          ]}
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
        label="E-Mail (optional)"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
      />
      <PrivacyConsent />
      <Honeypot />
      <ErrorText>{error}</ErrorText>
      <SubmitButton>Probefahrt anfragen</SubmitButton>
    </form>
  );
}
