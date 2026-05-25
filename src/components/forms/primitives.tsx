import { Link } from "@tanstack/react-router";
import { dealer, telLink, whatsappLink } from "@/data/dealer";

/* ------------------------------------------------------------------ */
/* Shared form UI primitives — einheitliches Premium-Erscheinungsbild  */
/* ------------------------------------------------------------------ */

export function Label({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne"
    >
      {children}
      {required && <span aria-hidden className="ml-1 text-ink-soft">*</span>}
    </label>
  );
}

type BaseFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal";
};

export function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  autoComplete,
  inputMode,
}: BaseFieldProps & { type?: string }) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-2 block w-full min-h-[48px] border border-line bg-paper/40 px-4 py-3 text-base text-ink transition-colors focus:border-champagne focus:outline-none"
      />
    </div>
  );
}

export function Textarea({
  label,
  name,
  required,
  defaultValue,
  rows = 4,
  placeholder,
}: BaseFieldProps & { rows?: number }) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 block w-full border border-line bg-paper/40 px-4 py-3 text-base text-ink transition-colors focus:border-champagne focus:outline-none"
      />
    </div>
  );
}

export function Select({
  label,
  name,
  required,
  defaultValue,
  options,
}: BaseFieldProps & { options: string[] }) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 block w-full min-h-[48px] border border-line bg-paper/40 px-4 py-3 text-base text-ink transition-colors focus:border-champagne focus:outline-none"
      >
        <option value="">Bitte wählen</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}


export function RadioChips({
  label,
  name,
  options,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className="block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">
        {label}
        {required && <span aria-hidden className="ml-1 text-ink-soft">*</span>}
      </legend>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex min-h-[44px] cursor-pointer items-center justify-center border border-line bg-paper/40 px-3 py-2.5 text-center text-sm text-ink-soft transition-colors has-[:checked]:border-champagne has-[:checked]:bg-champagne/15 has-[:checked]:text-ink sm:text-xs"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={defaultValue === o.value}
              required={required}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}


export function PrivacyConsent({ name = "privacy" }: { name?: string }) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-2 text-sm leading-relaxed text-ink-soft">
      <input
        type="checkbox"
        name={name}
        required
        className="mt-1 h-5 w-5 flex-shrink-0 accent-[var(--color-champagne)]"
      />
      <span>
        Ich habe die{" "}
        <Link to="/datenschutz" className="underline hover:text-ink">
          Datenschutzerklärung
        </Link>{" "}
        gelesen und stimme der Verarbeitung meiner Daten zur Beantwortung
        dieser Anfrage zu. Keine Weitergabe an Dritte.
      </span>
    </label>
  );
}

export function Honeypot() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="hidden"
    />
  );
}

export function SubmitButton({
  children,
  variant = "gold",
}: {
  children: React.ReactNode;
  variant?: "gold" | "ink";
}) {
  const base =
    "block w-full min-h-[52px] px-6 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40";
  const cls =
    variant === "gold" ? `${base} bg-champagne text-paper` : `${base} bg-ink text-paper`;
  return (
    <button type="submit" className={cls}>
      {children}
    </button>
  );
}


export function ErrorText({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[oklch(0.65_0.2_27)]">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Trust block — neben jedem Formular                                  */
/* ------------------------------------------------------------------ */

const TRUST_DEFAULTS = [
  "Antwort i. d. R. innerhalb von 2 Stunden (Mo–Sa)",
  "Persönlich — kein Callcenter",
  "Daten verschlüsselt übertragen (SSL/TLS)",
  "DSGVO-konform, keine Weitergabe an Dritte",
];

export function TrustBlock({
  items = TRUST_DEFAULTS,
  compact = false,
}: {
  items?: string[];
  compact?: boolean;
}) {
  return (
    <ul
      className={`${compact ? "space-y-2" : "space-y-3"} font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft`}
    >
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <span aria-hidden className="mt-1.5 h-px w-4 flex-shrink-0 bg-champagne" />
          <span className="normal-case tracking-normal text-[11px] text-ink/80">
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Success state — wiederverwendbare Erfolgs-Karte                     */
/* ------------------------------------------------------------------ */

export function SuccessState({
  title = "Vielen Dank — Ihre Anfrage ist eingegangen.",
  message = "Wir melden uns persönlich innerhalb weniger Stunden zurück.",
  whatsappText,
  extra,
}: {
  title?: string;
  message?: string;
  whatsappText?: string;
  extra?: React.ReactNode;
}) {
  const wa =
    whatsappText ??
    `Hallo ${dealer.shortName}, ich habe gerade eine Anfrage über Ihre Website gesendet.`;
  return (
    <div className="border border-champagne/40 bg-champagne/10 p-6 md:p-8">
      <p className="kicker">Erfolgreich</p>
      <h3 className="mt-3 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-sm text-ink/80">{message}</p>
      {extra && <div className="mt-5">{extra}</div>}
      <div className="mt-6 border-t border-champagne/30 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
          Lieber sofort sprechen?
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <a
            href={telLink()}
            className="flex-1 border border-ink/60 px-5 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-paper"
          >
            {dealer.phoneDisplay}
          </a>
          <a
            href={whatsappLink(wa)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-champagne px-5 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper hover:opacity-90"
          >
            WhatsApp öffnen
          </a>
        </div>
      </div>
    </div>
  );
}
