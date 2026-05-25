## Ziel

Die Website auf "Nummer-1-Premium-Level" heben — Mischung aus Luxus-Autohaus, High-End-Sportmarke und Tech-Plattform. Basis: gewählte Richtung **Tech Platform** mit **Emerald Prestige** Palette, **Sora + Manrope + JetBrains Mono** Typografie und **Split-Screen Hero**.

## 1. Design Tokens (`src/styles.css`)

Komplette Token-Überarbeitung — verbatim aus dem gewählten Prototyp:

- `--background: #064e3b` (deep emerald)
- `--surface / card: #043d2e` (deeper emerald)
- `--foreground / paper: #f5f0e0` (warm off-white)
- `--primary / gold: #c9a84c` (champagne gold)
- `--border: #f5f0e0` @ 10% / `--border-strong: #c9a84c` @ 40%
- Neue Utilities: `.font-display` (Sora), `.font-mono` (JetBrains Mono), `.text-eyebrow` (10px uppercase tracking-[0.4em] gold), `.tech-card`, `.gold-rule`, `.spec-grid`
- Subtile Animationen: `scan-line` keyframe, längere `duration-700` hover-grayscale-out, image-zoom-on-hover
- Body-Font auf Manrope, Headlines auf Sora, technische Labels/Stock-Refs/Specs auf JetBrains Mono
- Globaler dunkler Emerald-Hintergrund statt anthrazit

## 2. Font-Import (`src/routes/__root.tsx`)

Sora + Manrope + JetBrains Mono via Google Fonts laden (preconnect + display=swap).

## 3. Shared Components (`src/components/site/`)

- **Header.tsx** — Logo-Block mit AK + Gold-Eyebrow, Sora-Brand, Mono-Telefonnummer, klare Tracking-Widest-Links, Border-Bottom in Gold/20, Sticky + Backdrop-Blur
- **Footer.tsx** — drei Spalten mit Mono-Labels, Gold-Hairlines, "System"-Footer-Note
- **VehicleCard.tsx** — Komplett-Redesign nach Tech-Card-Vorlage:
  - Aspect-Video Bild, grayscale → group-hover farbig + scale
  - Top-Left Gold-Badge ("Geprüft"/"Sofort verfügbar") in Mono
  - Marke/Modell-Header (Mono-Eyebrow + Sora-Bold), Preis rechts in Gold
  - 2-Spalten Mono-Spec-Grid (Power, Mileage, Year, Fuel) mit 1px-Gap-Linien
  - Full-width CTA "Datenblatt öffnen" mit Gold-Hover-Invert
- **MobileStickyBar.tsx** — Polishing: gold/paper Buttons in 10px-Mono-Uppercase, klare Trennung
- **Eyebrow.tsx** (neu) — wiederverwendbares `--/SYSTEM STATUS: …` Label
- **DataBadge.tsx** (neu) — Mono-Label + Wert für Hero/Trust-Sektionen
- **PrecisionConversionBand.tsx** (neu) — wiederverwendbare CTA-Sektion mit AK-Logomark, Response-Time, Call+WhatsApp

## 4. Homepage (`src/routes/index.tsx`)

Komplette Neukomposition entlang des Prototyps:

1. **Hero (Split-Screen)** — links: Eyebrow "System Status: Active" + Sora-Display "Champion / Mentalität." (Gold-Zeile 2) + Manrope-Lead + zwei CTAs (Gold solid + Gold-outline). Rechts: cinematisches Fahrzeugbild mit Overlay-DataPanels (Available Units / Quality Score), Mono-Stock-Ref oben links.
2. **Trust-Band** — vier Mono-Datenbadges (Geprüft 110-Punkte / Finanzierung 3,99 % / Ankauf 24 h / WhatsApp < 15 min) auf surface mit Gold-Trennlinien
3. **Highlights** — `Current / Selection` H2 (Sora) + "Browse System [01–03]" Mono-Link → 3 VehicleCards im Tech-Stil
4. **Brand Story (Champion-Standard)** — bestehender Text in neuer Typo, große Sora-Numerik (01/02/03)
5. **Bestand-Teaser**, **Ankauf-Teaser**, **Finanzierung-Teaser** — als Bento-artige Surface-Cards mit Gold-left-border
6. **Stimmen** (Testimonials) — typografische Karten, Mono-Attribution
7. **FAQ** — gleiche Inhalte, neues Styling (Gold-Hairlines, Sora-Fragen, Manrope-Antworten)
8. **Precision Conversion Band** (neue Komponente) als finaler CTA
9. **Standort** — beibehaltene OSM-Map mit neuem Frame

JSON-LD AutoDealer / FAQPage bleiben erhalten.

## 5. Unterseiten (visueller Sweep)

Alle Routes erben automatisch die neuen Tokens. Spezifische Anpassungen:

- **`/fahrzeuge`** — Filter-Bar im Mono-Stil, VehicleCards neu, Grid-Spacing erhöht
- **`/fahrzeuge/$id`** — Spec-Tabelle als 2-Spalten Mono-Grid mit Gold-Akzentlinien, große Bildgalerie (grayscale-hover), CTA-Band unten
- **`/auto-verkaufen`**, **`/finanzierung`**, **`/kontakt`** — Form-Styling: dunkle Surface-Inputs, Gold-Focus-Ring, Mono-Labels, Sora-H1
- **`/ueber-uns`**, **`/leistungen`** — Eyebrows + Sora-Display + ruhige Bildränder
- **`/impressum`**, **`/datenschutz`** — typografisches Refresh

## 6. Mobile

- Sticky Bottom-Bar (3 Buttons: Anrufen | WhatsApp | Anfrage) in Gold/Paper
- Hero stapelt: Bild zuerst (cinematic), dann Text mit reduzierter Schriftgröße
- Trust-Band wird zu 2×2 Grid
- VehicleCards einspaltig, größere Bilder

## 7. Animationen (subtil)

- Hero-Headline: fade-up beim Mount
- Bilder: grayscale → color + scale-105 over 700ms on hover
- Buttons: bg-Invert (Gold ↔ Paper) over 500ms
- Section-Reveal via Intersection Observer (fade-in-up, einmalig)

## 8. Was bleibt unverändert

- Daten in `src/data/vehicles.ts` und `src/data/dealer.ts` (nur Anzeige-Layer)
- Routing-Struktur
- Server-/Cloud-Setup (nicht angefragt)

## Technische Hinweise

- Tokens werden in `oklch()` in `src/styles.css` definiert; Hex-Werte oben sind Referenz.
- Keine willkürlichen `bg-[#…]`-Klassen in Komponenten — alles via semantische Tokens (`bg-background`, `bg-card`, `text-primary`, …).
- Sora wird als `font-display`, Manrope als Default-Body, JetBrains Mono als `font-mono` via Tailwind theme erweitert.
- Bestehende AI-Fahrzeugbilder werden weiterverwendet; Filter `grayscale group-hover:grayscale-0` schafft den editorial-tech Look ohne neue Asset-Generierung.

## Offen / nicht im Scope

- Cloud-Aktivierung (DB, Admin, mobile.de-Import) — separate Phase
- Echte Dealer-Daten (Adresse, Telefon, WhatsApp, HRB, USt-ID) — Platzhalter bleiben bis du sie lieferst
