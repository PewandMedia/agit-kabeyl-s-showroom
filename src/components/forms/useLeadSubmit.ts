import { useState } from "react";
import { z, type ZodTypeAny } from "zod";
import { dealer } from "@/data/dealer";

/**
 * Generischer Hook für alle Lead-Formulare.
 * - validiert mit einem Zod-Schema
 * - prüft Honeypot
 * - baut Subject/Body und öffnet mailto:
 * - liefert UI-States (error, sent, submitting)
 */
export function useLeadSubmit<S extends ZodTypeAny>(opts: {
  schema: S;
  buildSubject: (data: z.infer<S>) => string;
  buildBody: (data: z.infer<S>) => string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(form: HTMLFormElement) {
    setError(null);
    const fd = new FormData(form);

    // Honeypot
    if (String(fd.get("company") ?? "").trim().length > 0) {
      setSent(true); // still tu so, als wäre es OK
      return;
    }

    const raw: Record<string, unknown> = {};
    fd.forEach((value, key) => {
      if (key === "company") return;
      if (raw[key] !== undefined) return; // keep first
      raw[key] = typeof value === "string" ? value : "";
    });

    const parsed = opts.schema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Bitte Eingaben prüfen.");
      return;
    }

    const subject = opts.buildSubject(parsed.data);
    const body = opts.buildBody(parsed.data);
    const href = `mailto:${dealer.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    if (typeof window !== "undefined") {
      window.location.href = href;
    }
    setSent(true);
  }

  return { error, sent, setSent, handleSubmit };
}
