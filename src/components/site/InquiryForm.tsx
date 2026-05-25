import { useState } from "react";
import { z } from "zod";
import { dealer } from "@/data/dealer";

const Schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  email: z.string().trim().email("Ungültige E-Mail").max(200),
  phone: z.string().trim().min(4, "Telefonnummer fehlt").max(40),
  message: z.string().trim().min(5, "Bitte eine kurze Nachricht").max(2000),
  honey: z.string().max(0).optional(),
});

export function InquiryForm({
  vehicleTitle,
  vehicleId,
  disabled = false,
}: {
  vehicleTitle: string;
  vehicleId: string;
  disabled?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const defaultMsg = `Guten Tag, ich interessiere mich für den ${vehicleTitle} (ID ${vehicleId}). Bitte kontaktieren Sie mich für weitere Informationen / Probefahrt.`;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      honey: String(fd.get("company") ?? ""),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Bitte Eingaben prüfen.");
      return;
    }
    const { name, email, phone, message } = parsed.data;
    const subject = `Anfrage: ${vehicleTitle} (${vehicleId})`;
    const body =
      `Fahrzeug: ${vehicleTitle}\nFahrzeug-ID: ${vehicleId}\n\n` +
      `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`;
    const href = `mailto:${dealer.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-champagne/40 bg-champagne/10 p-6 text-sm text-ink">
        Vielen Dank — Ihre Anfrage wird gesendet. Wir melden uns umgehend.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Telefon" name="phone" type="tel" required />
      </div>
      <Field label="E-Mail" name="email" type="email" required />
      <div>
        <Label>Nachricht</Label>
        <textarea
          name="message"
          required
          rows={4}
          defaultValue={defaultMsg}
          className="mt-2 w-full bg-surface px-4 py-3 text-sm text-ink"
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
      {error && (
        <p className="text-xs text-[oklch(0.78_0.18_27)]">{error}</p>
      )}
      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-champagne px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Anfrage absenden
      </button>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
        Antwort i. d. R. innerhalb von 2 Stunden (Mo–Sa)
      </p>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne">
      {children}
    </label>
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
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full bg-surface px-4 py-3 text-sm text-ink"
      />
    </div>
  );
}
