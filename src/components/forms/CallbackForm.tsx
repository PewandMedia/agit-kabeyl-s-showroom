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

const Schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  phone: z.string().trim().min(4, "Telefonnummer fehlt").max(40),
  window: z.enum(["jetzt", "heute", "morgen", "diese-woche"], {
    message: "Wunschzeitpunkt wählen",
  }),
  notes: z.string().trim().max(500).optional().default(""),
  privacy: z.literal("on", { message: "Bitte Datenschutz akzeptieren" }),
});

export function CallbackForm({ context }: { context?: string }) {
  const { error, sent, handleSubmit } = useLeadSubmit({
    schema: Schema,
    buildSubject: (d) => `Rückruf-Wunsch: ${d.name} (${d.window})`,
    buildBody: (d) =>
      [
        context && `Kontext: ${context}`,
        `Name: ${d.name}`,
        `Telefon: ${d.phone}`,
        `Wunschzeitpunkt: ${d.window}`,
        d.notes && `\nNotiz:\n${d.notes}`,
      ]
        .filter(Boolean)
        .join("\n"),
  });

  if (sent) {
    return (
      <SuccessState
        title="Rückruf vorgemerkt."
        message="Wir rufen Sie im gewünschten Zeitfenster persönlich zurück."
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
      <RadioChips
        label="Wann sollen wir Sie zurückrufen?"
        name="window"
        required
        defaultValue="heute"
        options={[
          { value: "jetzt", label: "Sofort" },
          { value: "heute", label: "Heute" },
          { value: "morgen", label: "Morgen" },
          { value: "diese-woche", label: "Diese Woche" },
        ]}
      />
      <Textarea
        label="Worum geht es? (optional)"
        name="notes"
        rows={3}
        placeholder="Stichworte reichen — z. B. Modell, Anliegen …"
      />
      <PrivacyConsent />
      <Honeypot />
      <ErrorText>{error}</ErrorText>
      <SubmitButton>Rückruf anfordern</SubmitButton>
    </form>
  );
}
