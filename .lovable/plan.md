
## Ziel

Ein einheitliches Lead-System mit fünf konversionsoptimierten Formularen plus zusätzlichen Conversion-Elementen (Sticky WhatsApp, Sektion-CTAs, Erfolgsmeldungen, Trust-Hinweise). Alle Formulare bleiben Frontend-only — Versand via `mailto:` (konsistent mit bestehendem `InquiryForm`-Pattern). Anbindung an eine Leads-Tabelle in Lovable Cloud ist eine separate Phase.

## 1. Geteilte Form-Primitives (`src/components/forms/`)

Neue, wiederverwendbare Bausteine, damit alle Formulare gleich edel und konsistent aussehen:

- `FormField.tsx` — Input, Textarea, Select mit einheitlichem Label-Stil (Mono-Eyebrow, Champagner-Fokus).
- `RadioGroup.tsx` — Chip-Stil-Radios (z. B. „Kontaktwunsch: Telefon / WhatsApp / E-Mail").
- `Checkbox.tsx` — Datenschutz-Checkbox mit Link zu `/datenschutz`.
- `TrustBlock.tsx` — Vertrauensliste neben Formularen: „Antwort i. d. R. < 2 h", „Persönlich, kein Callcenter", „Daten verschlüsselt übertragen", „DSGVO-konform".
- `SuccessState.tsx` — Wiederverwendbare Erfolgs-Karte (Champagner-Akzent, WhatsApp-/Anruf-Fallback-CTAs „Lieber sofort sprechen?").
- `useLeadSubmit.ts` — Hook, der Subject + strukturierten Body baut, `mailto:` öffnet, Erfolgs-State setzt. Enthält Zod-Validierung und Honeypot-Check.

Alle Formulare nutzen diese Primitives.

## 2. Lead-Formulare (`src/components/forms/`)

### `VehicleInquiryForm.tsx` (ersetzt heutige `InquiryForm.tsx`)
Felder: Name, Telefon, E-Mail, Fahrzeug (vorbefüllt), Nachricht (vorbefüllt), Kontaktwunsch (Radio: Telefon/WhatsApp/E-Mail), Datenschutz-Checkbox (Pflicht). Submit per `mailto:` an `dealer.email`; bei Kontaktwunsch „WhatsApp" zusätzlich Hinweis „Per WhatsApp kontaktieren" als Sekundär-CTA, der direkt `wa.me` öffnet.

### `TestDriveForm.tsx` (neu)
Felder: Fahrzeug (vorbefüllt oder Freitext), Wunschdatum, Wunschzeit (Vormittag / Nachmittag / Samstag), Name, Telefon, E-Mail (optional), Datenschutz.

### `FinancingLeadForm.tsx` (neu — ersetzt einfache Form in `finanzierung.tsx`)
Felder: Fahrzeug (Freitext, vorbefüllt aus `?fahrzeug=`-Query-Param), Kaufpreis (aus Rechner), Anzahlung, Wunschrate (€/Monat), Laufzeit (12/24/36/48/60/72/84), Name, Telefon, E-Mail, Datenschutz.

### `PurchaseForm.tsx` (Ankauf — ersetzt Inline-Form in `auto-verkaufen.tsx`)
Felder: Marke, Modell, Baujahr, Kilometerstand, Kraftstoff (Chips), Getriebe (Chips), Zustand (Chips: Sehr gut / Gut / Gebrauchsspuren / Reparaturbedürftig), Unfallfrei (Radio: Ja/Nein), Wunschpreis (optional), Name, Telefon, E-Mail, Datenschutz. **Fotos**: kein echter Upload (kein Backend) — stattdessen prominenter Hinweis nach Submit „Senden Sie uns Fotos direkt per WhatsApp" mit One-Tap-WhatsApp-Link, der die soeben eingegebenen Eckdaten als Text mitschickt.

### `CallbackForm.tsx` (neu, Rückruf)
Felder: Name, Telefon, Wunsch-Zeitfenster (Radio: Jetzt / Heute / Morgen / Diese Woche), kurze Notiz (optional), Datenschutz. Sehr kurz und mobil-first, dafür für Modal-Einsatz geeignet.

Alle Formulare:
- Zod-Validierung, deutsche Fehlertexte.
- Honeypot-Feld `company` (hidden).
- Pflicht-Datenschutz-Checkbox.
- `aria-`-Labels, keyboard-fokussierbar.
- Mobile-first: Inputs `inputMode` korrekt (`tel`, `email`, `numeric`).
- `SuccessState` mit Anruf- und WhatsApp-Fallback.

## 3. Neue Routes

- `src/routes/probefahrt.tsx` — Hero + `TestDriveForm` + Ablauf-Steps + Trust-Block.
- `src/routes/rueckruf.tsx` — Hero + `CallbackForm` (kurz) + „Sofort sprechen"-Block (Telefon-/WhatsApp-Buttons).

## 4. Integration in bestehende Seiten

- `src/routes/fahrzeuge.$id.tsx`: nutzt neue `VehicleInquiryForm`; in der Sticky-Sidebar zusätzlicher Button „Probefahrt anfragen" → öffnet Modal mit `TestDriveForm` (vorbefülltes Fahrzeug) statt nur Link nach `/kontakt`. „Rückruf anfordern"-Button öffnet Modal mit `CallbackForm`.
- `src/routes/finanzierung.tsx`: rechte Spalte nutzt `FinancingLeadForm`; Query-Param `?fahrzeug=<id>` füllt das Feld vor. Versteckte Felder aus dem Rechner werden weiterhin mitgesendet.
- `src/routes/auto-verkaufen.tsx`: rechte Spalte nutzt `PurchaseForm` (mit Unfallfrei, Wunschpreis, Foto-via-WhatsApp).
- `src/routes/kontakt.tsx`: Form wird auf `VehicleInquiryForm`-Variante umgestellt (ohne vorbefülltes Fahrzeug-Feld, mit Kontaktwunsch + Datenschutz).
- `src/routes/index.tsx`: nach Hero und nach Bestand jeweils ein CTA-Band („Rückruf anfordern" + „WhatsApp"), am Ende ein großer Conversion-Block.

### Modal-Mechanik
Eine minimale `Modal.tsx`-Komponente (Overlay + ESC-/Outside-Close + Focus-Trap-light), wiederverwendet für Test-Drive- und Callback-Form auf der Detailseite.

## 5. Conversion-Elemente

- **`StickyWhatsAppFab.tsx`** (neu): rundes Floating-WhatsApp-Icon unten rechts, sichtbar auf Desktop **und** Mobile (auf Mobile oberhalb der `MobileStickyBar` positioniert, damit nichts überdeckt wird). Auf Detailseiten ausgeblendet, weil dort eine spezifische Sticky-Bar greift.
- **`MobileStickyBar`** bleibt: Fahrzeuge / Anrufen / WhatsApp / Anfrage. Aktiver-Tab-Indikator wird leicht aufgewertet.
- **Sektion-CTAs**: nach jeder Hauptsektion (Bestand-Auszug, Leistungen, Über uns) ein dezenter „Anfragen / Anrufen / WhatsApp"-Streifen.
- **Trust-Block** (`TrustBlock`) neben jedem Formular.
- **Erfolgsmeldung** einheitlich via `SuccessState`.
- **2-Klick-Regel**: WhatsApp-Fab + Mobile-Bar liefern Kontakt mit 1 Tap; alle Formulare sind mit ≤ 4 Pflichtfeldern auf Mobile in einem Screen sichtbar.

## 6. Datenschutz

- Jedes Formular: Pflicht-Checkbox „Ich habe die Datenschutzerklärung gelesen…" mit Link zu `/datenschutz`. Submit-Button bleibt disabled, solange ungecheckt.
- Hinweistext unter Submit-Button: „Wir nutzen Ihre Daten ausschließlich zur Beantwortung Ihrer Anfrage. Keine Weitergabe an Dritte."
- Honeypot bleibt.

## 7. Out of Scope

- Echte Server-Übermittlung / Lovable-Cloud-Leads-Tabelle / Admin-Inbox → separate Phase.
- Echter Bilder-Upload beim Ankauf (benötigt Storage). Stattdessen WhatsApp-Foto-Shortcut nach Submit.
- E-Mail-Transactional-Provider (Resend o. ä.).

## Geänderte / neue Dateien

- **neu**: `src/components/forms/FormField.tsx`, `RadioGroup.tsx`, `Checkbox.tsx`, `TrustBlock.tsx`, `SuccessState.tsx`, `useLeadSubmit.ts`, `VehicleInquiryForm.tsx`, `TestDriveForm.tsx`, `FinancingLeadForm.tsx`, `PurchaseForm.tsx`, `CallbackForm.tsx`, `src/components/site/Modal.tsx`, `src/components/site/StickyWhatsAppFab.tsx`, `src/routes/probefahrt.tsx`, `src/routes/rueckruf.tsx`
- **aktualisiert**: `src/components/site/SiteLayout.tsx` (FAB einbinden), `src/components/site/InquiryForm.tsx` (Re-Export auf neue `VehicleInquiryForm` oder löschen), `src/components/site/MobileStickyBar.tsx` (kleine Politur), `src/routes/fahrzeuge.$id.tsx` (Modals + neue Form), `src/routes/finanzierung.tsx` (neue Form, Query-Param-Prefill), `src/routes/auto-verkaufen.tsx` (neue Form), `src/routes/kontakt.tsx` (neue Form), `src/routes/index.tsx` (Sektion-CTAs), `src/components/site/Header.tsx` (Rückruf-Link in Nav)
