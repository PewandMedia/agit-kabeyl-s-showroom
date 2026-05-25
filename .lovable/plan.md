
# Premium-Redesign Autohaus AK

Ziel: Editorial-High-End-Look (Aston Martin / Porsche Studio Niveau), kein Template-Geruch. Sichtbare, mutige Änderungen — keine Mikro-Tweaks.

## 0. Vorab
- SSR-Fehler in `index.tsx` (JSX-Tag-Bruch ~Z. 151) beim Refactor mit beheben.

## 1. Design-Tokens (`src/styles.css`)
- Neue Palette: `--ink: oklch(0.14 0.01 270)`, `--paper: oklch(0.97 0.005 90)`, `--bone: oklch(0.93 0.008 80)`, Akzent `--champagne: oklch(0.78 0.07 80)` raffinieren (kühler, weniger gelb), zusätzlich `--accent-deep: oklch(0.32 0.05 80)` für Hover.
- Typo-Skala neu: Display 72/88, H1 56, H2 40, H3 24, Body 16/26. `tracking-[-0.03em]` für Display.
- Einheitliche Easing-Token `--ease-premium: cubic-bezier(0.22, 0.61, 0.36, 1)`, Dauer 500–700 ms.
- Spacing-Rhythm: Sections `py-32 md:py-40`, Container `max-w-[1440px] px-6 md:px-12`.
- Globale Regeln: keine `rounded-*` außer `rounded-none`; alle Buttons scharfkantig. Border standard `border-ink/8`.

## 2. Hero (`src/routes/index.tsx`)
- Full-bleed Split 55/45, Höhe `min-h-[92vh]`.
- Links: Eyebrow-Strich + Kicker („Autohaus · Düsseldorf"), riesiger Display-Headline 2-zeilig mit Wechsel-Akzentwort in Champagner-Outline-Schrift, Subline max. 16 Wörter, danach **eine** primäre CTA „Fahrzeuge ansehen" (massive schwarze Pille, Pfeil-Icon, Hover füllt Champagner) + Textlink „oder Termin vereinbaren →".
- Unter den CTAs eine schmale Trust-Leiste (4 Items mit dünnen Icons, Trennstrichen).
- Rechts: cinematisches Bild full-height ohne Padding/Border, dezenter Vignette-Gradient, untenrechts Live-Counter „24 Fahrzeuge im Bestand" als Glas-Chip.
- Scroll-Indikator dezent unten.

## 3. Fahrzeugkarten (`VehicleCard.tsx`)
- Format `aspect-[4/5]` Bild, darunter Info-Block auf Bone.
- Oben links Statuschip (Neu/Reserviert) als reines Text-Label mit Strich.
- Marke in Mono-Caps oben, Modell als Display-Serif darunter (große H3), Eckdaten (km · EZ · PS · Kraftstoff) als Mono-Reihe mit Punkten als Trenner.
- Preis rechtsbündig, große Zahl + kleinere „MwSt." Zeile; Monatsrate als Sub-Text klein darunter.
- Hover: Bild Zoom 1.04 + Vignette dunkler, unten Slide-In-Leiste „Details ansehen →" in Champagner.
- Feature-Chips entfernt (zu „Template"). Stattdessen max. 3 dezente Tags als kleine Mono-Caps unter dem Modellnamen.

## 4. Buttons (neue `Button.tsx` Variants)
- `primary`: bg-ink, text-paper, Höhe 56px, padding-x 32px, Mono-Caps tracking-[0.2em], Pfeil-Icon, Hover swap zu Champagner-bg + ink-text mit 400ms.
- `secondary`: 1px border-ink, transparent, gleiche Geometrie, Hover invertiert.
- `ghost`: nur Text mit animiertem Underline (left→right).
- Keine Schatten, keine Radius.

## 5. Mobile Bottom Bar (`MobileStickyBar.tsx`)
- Höhe 72px, voll-breite, bg-ink, 3 Slots gleichmäßig: Anrufen · WhatsApp · Termin.
- Icons 22px outline + Mini-Label 10px Mono-Caps darunter.
- Aktiver Slot bekommt Champagner-Top-Strich (3px).
- Safe-Area `pb-[env(safe-area-inset-bottom)]`, dezenter Top-Border ink/20.
- Verschwindet beim Scrollen nach unten, erscheint beim Scrollen nach oben (Hide-on-scroll).

## 6. Typografie
- Headings: `Instrument Serif` (Display) für Hero/Modellnamen, `Sora` für UI/Mono für Daten.
- Body `Manrope` 16/26, `text-ink/80`.
- Komplette Site auf max. 2 Schriftgrößen pro Section.

## 7. Trust-Elemente
- Neue Komponente `TrustStack`: 4 große Pillars als horizontale Cards mit Zahl (Display 64px) + Untertitel — direkt unter Hero.
- Bewertungs-Strip mit echtem Hinweis „Bewertungen werden geladen" (kein Fake bis Daten existieren).
- Garantie-Siegel-Reihe in monochrom (SVG outline) unter Fahrzeugliste.
- „Ihr Ansprechpartner" Card mit Portrait-Platzhalter + direktem Mobilkontakt im Footer-Bereich jeder Hauptseite.

## 8. CTAs
- Pro Seite **eine** primäre CTA. Sekundäres immer als Ghost-Link.
- Sticky Sub-Header CTA „Termin vereinbaren" ab Scroll 400px (Desktop).

## 9. Formulare (`InquiryForm.tsx`, Kontakt, Rückruf, Probefahrt)
- Reduktion auf **3 Felder**: Name · Telefon · Nachricht (optional). E-Mail nur wenn nötig.
- Floating Labels, 1px Bottom-Border-Stil (kein Box-Look), Fokus-Border Champagner.
- Submit-Button full-width Primary, Loading-State mit animiertem Strich.
- Success-State inline (kein Toast): großes „Danke." Display + Rückrufzeit.
- Honeypot + Zeitfalle gegen Spam.

## 10. Abstände & Grid
- Globaler 12-col Grid mit 24px Gutter.
- Section-Padding `py-32 md:py-40`, Headings immer mit 96px Abstand zum Folgeblock.
- Konsequente vertikale Rhythmik via `space-y-*` statt margin-Mix.

## 11. Footer
- Reduziert auf 3 Spalten + Bottom-Bar. Mega-CTA-Strip oben raus (zu laut), stattdessen schlanker Subscribe-freier Block „Besuchen Sie uns" mit Adresse, Öffnungszeiten, Telefon.

## 12. Performance
- `font-display: swap`, Preload Hero-Bild, AVIF/WebP wo möglich.
- Framer-Motion-Imports auf `m` + LazyMotion umstellen.

## Geänderte Dateien (≈14)
`src/styles.css`, `src/routes/index.tsx`, `VehicleCard.tsx`, `VehicleFilters.tsx`, `Header.tsx`, `Footer.tsx`, `MobileStickyBar.tsx`, `StickyWhatsAppFab.tsx` (entfernen — redundant zur neuen Bar), `InquiryForm.tsx`, `fahrzeuge.tsx`, `fahrzeuge.$id.tsx`, `kontakt.tsx`, `probefahrt.tsx`, `rueckruf.tsx`. Neu: `src/components/ui/Button.tsx`, `src/components/site/TrustStack.tsx`.

## Ausgeschlossen
- Lead-Backend, Stammdaten, echte Bilder, Stripe — separate Runden.
