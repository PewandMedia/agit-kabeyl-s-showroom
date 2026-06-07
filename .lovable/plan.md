## Ziel

Vier zusammenhängende Verbesserungen:
1. Schriftbild aufwerten (seriöser, lesbarer).
2. Icons in höherer Qualität (einheitliches Set, scharf, konsistent).
3. Neues Hero-Bild: Agit Kabayel (WBC #1 Contender) mit seinem BMW 7er mit Spoiler.
4. Eckdaten auf der Fahrzeug-Detailseite klar sichtbar + auf der Startseite 3 hervorgehobene "Flyer"-Anzeigen als Eyecatcher.

---

## 1. Typografie

- Headlines: Wechsel von der aktuellen Display-Font auf eine modernere, seriöse Kombination — **"Manrope"** (Headlines, kräftig, geometrisch) + **"Inter"** (Fließtext, top Lesbarkeit). Beide via Google Fonts in `index.html` oder `styles.css`.
- Tracking enger (`-0.02em` bei Headlines), Body normalisiert (`0`).
- Größenstufen reduziert auf eine klare Skala (H1 / H2 / H3 / Body / Mono), keine Zwischengrößen mehr.
- Mono-Akzente (Kicker, IDs) bleiben, aber auf **"JetBrains Mono"** für Schärfe.
- Datei: `src/styles.css` (Font-Imports + Token), evtl. `src/routes/__root.tsx` für Preload.

## 2. Icons

- Konsolidierung auf **lucide-react** (bereits im Projekt verfügbar) mit einheitlichem `strokeWidth={1.5}` und fester Größe (16 / 20 / 24).
- Alle Emoji-/Custom-SVG-Ersatz-Icons (Trust-Bar, Features, USPs) durch Lucide-Icons ersetzen.
- Icon-Wrapper-Komponente `src/components/ui/Icon.tsx` für konsistente Größe + Stroke + Farbe (champagne / ink / muted).
- Retina-scharf, da Lucide reines SVG ist — keine Bitmap-Icons mehr.

## 3. Hero-Bild Agit Kabayel + BMW 7er

- Neues Hero-Bild generieren: **Agit Kabayel im Anzug neben seinem schwarzen BMW 7er mit Heckspoiler**, abendliche Studio-/Showroom-Atmosphäre, kinoreif, hochformatige Tiefenschärfe.
- Speicherort: `src/assets/hero-kabayel-bmw7.jpg` (ersetzt `champion-hero.jpg` als Hero-Quelle).
- Einsatz in `src/routes/index.tsx` Hero-Sektion, mit dezenter dunkler Vignette für Lesbarkeit der Headline.
- Bildunterschrift / Caption klein unten rechts: "Agit Kabayel · WBC #1 Contender · sein BMW 7er mit Spoiler — einzigartig in Deutschland".
- Rechtlicher Hinweis: KI-generiertes Symbolbild, keine echte Persönlichkeitsabbildung — als unsichtbarer Kommentar im Code dokumentiert, im UI als "Symbolbild" klein vermerkt.

## 4. Eckdaten + 3 Flyer-Highlights

### 4a) Detailseite (`src/routes/fahrzeuge.$id.tsx`)
Eckdaten-Block direkt unter dem Hero-Bild, **prominent und scanbar**:
- 6er-Grid: Erstzulassung · KM-Stand · Leistung (kW/PS) · Getriebe · Kraftstoff · Farbe
- Jede Kachel: Lucide-Icon + kleiner Mono-Label + großer Wert
- Darunter Zweispaltig: Ausstattung (links) · Technische Daten (rechts)
- Preisblock bleibt sticky rechts (Desktop) / unten (Mobile)

### 4b) Startseite — 3 Flyer-Highlights (`src/routes/index.tsx`)
Neue Sektion **"Aktuelle Highlights"** direkt unter dem Hero:
- 3 große Flyer-Karten nebeneinander (Desktop) / gestapelt (Mobile)
- Jede Karte = **Mini-Flyer im Inserat-Stil**:
  - Großes Fahrzeugbild (16:10) mit dezentem Verlauf
  - Status-Badge oben links ("Highlight" / "Neu eingetroffen")
  - Marke + Modell als H3
  - Eckdaten-Streifen (EZ · KM · PS · Getriebe) als Mono-Chips
  - Preis groß in Champagner-Akzent
  - CTA-Zeile: "Details ansehen →" + kleiner "Flyer als PDF"-Link
- Auswahl automatisch aus `vehicles.ts` (Status `highlight` + `new-arrival`, erste 3).
- Neue Komponente: `src/components/site/HighlightFlyerCard.tsx` (separater Stil, nicht die normale `VehicleCard`).

---

## Betroffene Dateien

- `src/styles.css` — Font-Tokens, Skala
- `src/routes/__root.tsx` — Font-Preload
- `src/components/ui/Icon.tsx` — neu, Wrapper für Lucide
- Alle Stellen mit Inline-Icons (TrustBar, Features, MobileStickyBar, Footer) — Icon-Komponente einsetzen
- `src/assets/hero-kabayel-bmw7.jpg` — neu generiert
- `src/routes/index.tsx` — neues Hero-Bild, neue Highlights-Sektion
- `src/components/site/HighlightFlyerCard.tsx` — neu
- `src/routes/fahrzeuge.$id.tsx` — Eckdaten-Grid prominent

Keine Backend-/DB-Änderungen.