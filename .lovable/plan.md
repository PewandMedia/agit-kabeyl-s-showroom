## 1. Highlight-Flyer wieder 3 nebeneinander
- `HighlightFlyerCard.tsx` neu im kompakten OZ-Flyer-Stil, vertikal gestapelt für 3-Spalten-Grid: dunkler Hintergrund, Bild oben (16:10), darunter Marke + Modell-Headline (weiß + rot), Spec-Strip mit Icons (PS, km, EZ, Kraftstoff), 4–5 Highlights mit roten Check-Icons, Preisblock mit rotem Akzent, CTA „Weiter →".
- `routes/index.tsx`: Sektion zurück auf `md:grid-cols-3 gap-6`, darunter zentrierter Primary-Button „Weiter zum Bestand →".

## 2. Hero-Bild Agit Kabayel ans Design angleichen
- `imagegen--edit_image` auf `src/assets/hero-kabayel-bmw7.jpg`: Farb-Grading dunkler/cinematischer, Showroom-Gelbstich raus, dezenter Champagner-Ton, Vignette, BMW + Subjekt durch Spotlight hervorheben. 4:5 bleibt.
- Hero-Overlay in `index.tsx` etwas stärker (oben/unten), damit Bild nahtlos in Paper-BG übergeht und Caption lesbar bleibt.

## 3. Detailseite klarer
`routes/fahrzeuge.$id.tsx`:
- Eckdaten-Grid auf 8 Felder erweitern: EZ, Laufleistung, Leistung (kW/PS), Getriebe, Kraftstoff, Farbe, **Vorbesitzer**, **Zustand** — größere Chips mit Icons.
- Ausstattungs-Box im Flyer-Stil: dunkler Hintergrund, rote Check-Icons, 2-spaltige Liste, Header „Ausstattung & Highlights" mit Anzahl.
- Technische Daten kompakter aber vollständig.
- Reihenfolge: Galerie → Eckdaten XL → Beschreibung → Ausstattung → Tech. Daten → Anfrage → Ähnliche.

## Dateien
- `src/assets/hero-kabayel-bmw7.jpg`
- `src/components/site/HighlightFlyerCard.tsx`
- `src/routes/index.tsx`
- `src/routes/fahrzeuge.$id.tsx`
