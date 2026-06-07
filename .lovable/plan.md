## Ziel
1. Hero-Bild ersetzen: aus dem Instagram-Screenshot (unten rechts: Agit + Meltem mit erhobener Faust vor schwarzem BMW 7er) Meltem wegretuschieren, sodass nur Agit allein vor dem BMW steht. Dieses Bild wird das neue Hero auf der Startseite.
2. Drei flyer-artige Highlight-Karten auf der Startseite im Stil der hochgeladenen OZ-Automobile-Flyer (dunkler Hintergrund, große Modell-Headline weiß + rot, Spec-Chips mit Icons, Highlights-Liste mit roten Häkchen, großer Preis-Block, mehrere Detailbilder im Collage-Layout).

## Umsetzung

### 1. Hero-Bild (`src/assets/hero-kabayel-bmw7.jpg`)
- Quelle: rechte untere Kachel des hochgeladenen Instagram-Screenshots zuschneiden (Agit + Meltem vor schwarzem BMW 7er im Showroom, beide Faust hoch).
- Mit `imagegen--edit_image` bearbeiten: Frau (links im Bild) komplett entfernen, Showroom-Hintergrund + BMW 7er + Agit (rechts, Faust hoch) erhalten. Cinematischer Look, leichter Kontrast-Boost. 16:9.
- Datei `hero-kabayel-bmw7.jpg` überschreiben — bestehender Import in `src/routes/index.tsx` bleibt.
- Caption bleibt: „Agit Kabayel · WBC #1 Contender · sein BMW 7er mit Spoiler".

### 2. Flyer-Karten Redesign (`src/components/site/HighlightFlyerCard.tsx`)
Komplett neu im OZ-Flyer-Stil, statt der jetzigen schlanken Karte:

```
┌──────────────────────────────────────────────┐
│ [Logo AK]   STATUS-BADGE (z.B. Neu eingetroffen)│
│                                              │
│ PORSCHE                       [Hauptbild     │
│ CAYENNE GTS  ← weiß+rot         großer       │
│ Sport. Luxury. Performance.     Wagen]       │
│                                              │
│ ⚡441 PS  📏168.000 km  📅10/2016  ⛽Benzin   │
│ ─────────────────────────────────────────── │
│ HIGHLIGHTS              [3 kleine Thumbs   ] │
│ ✓ GTS Sportpaket        [Innen/Felge/Heck  ] │
│ ✓ Luftfederung                               │
│ ✓ Panorama                                   │
│ ✓ BOSE                  PREIS               │
│ ✓ ...                   36.950 €             │
│                                              │
│ [Details ansehen →]   [Flyer als PDF ↓]      │
└──────────────────────────────────────────────┘
```

Technisch:
- Dunkles Karten-Background (`--card`), feiner roter Border-Accent, gold/champagne Preis.
- Headline: Manrope Black, riesig, Modellname weiß + Variante in `--primary` (rot).
- Spec-Chips: lucide Icons (Gauge, Route, Calendar, Fuel) mit JetBrains Mono Labels.
- Highlights-Liste: 6–8 Stichpunkte aus `vehicle.equipment`, rote Check-Icons (lucide `Check` in `--primary`).
- Mini-Bildcollage rechts (3 weitere Bilder aus `vehicle.images`, falls vorhanden — sonst nur Hauptbild größer).
- Preis-Block mit `font-mono`, kontrastierender Box.
- Zwei CTAs unten: Link zur Detailseite + „Flyer als PDF" (nutzt vorhandenes `generateVehicleFlyer`).

### 3. Startseite (`src/routes/index.tsx`)
- Bestehende „Drei Inserate" Sektion: Karten untereinander statt 3-spaltig (Karten sind groß, vertikal — wie echte Flyer). Auf Desktop max-w-4xl mittig, jede Karte mit großzügigem Abstand.
- Sektions-Headline: „Aktuelle Highlights".
- Quelle bleibt: erste 3 Fahrzeuge aus `vehicles.ts`.

## Dateien
- `src/assets/hero-kabayel-bmw7.jpg` (überschreiben via edit_image aus dem Upload-Screenshot-Crop)
- `src/components/site/HighlightFlyerCard.tsx` (Redesign)
- `src/routes/index.tsx` (Sektion-Layout anpassen)

Keine Backend-Änderungen.
