# Plan: Echte Flyer-Bilder als Highlights nutzen

Du hast 3 fertige Flyer hochgeladen (Porsche Cayenne GTS, Range Rover Sport HSE, Mercedes V300 d). Diese sollen direkt als die 3 Highlight-Karten auf der Startseite angezeigt werden — keine Nachbau-Komponente mehr.

## Änderungen

### 1. Flyer als Assets einbinden
- `src/assets/flyer-porsche-cayenne-gts.png` — aus `Porsche_Cayenne_Bearbeite_Version_Extrem-3.png`
- `src/assets/flyer-range-rover-sport-hse.png` — aus `Range_Rover-3.png`
- `src/assets/flyer-mercedes-v300d.png` — aus `Mercedes_Benz_V300_Bild_1-3.png` (Bild 1, weil sauberere Komposition)

### 2. `src/components/site/HighlightFlyerCard.tsx` — komplett vereinfachen
Statt nachgebautem Layout: nur noch ein klickbarer Link, der den ganzen Flyer als Bild anzeigt + dezenter Hover-Effekt + kleine "Zum Fahrzeug →"-Leiste am unteren Rand (overlay).

Props: `image`, `alt`, `to` (Fahrzeug-Detail-Link), `priority`.

```tsx
<Link to={to} className="group block overflow-hidden rounded-2xl ring-1 ring-paper-line bg-paper-deep shadow-paper hover:shadow-xl transition">
  <img src={image} alt={alt} className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]" loading={priority?'eager':'lazy'} />
  <div className="px-4 py-3 flex items-center justify-between text-sm">
    <span className="font-medium">Zum Fahrzeug</span>
    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
  </div>
</Link>
```

### 3. `src/routes/index.tsx` — Highlights-Section
- 3-Spalten-Grid (`grid md:grid-cols-3 gap-6`) bleibt.
- 3 Cards mit den neuen Flyern, verknüpft auf `/fahrzeuge/<id>` der 3 passenden Bestandsfahrzeuge (Porsche Cayenne, Range Rover Sport, Mercedes V-Klasse). Falls eines im Bestand fehlt, verlinkt auf `/fahrzeuge`.
- "Weiter zum Bestand →"-Button bleibt zentriert darunter.

### 4. Bestand-Matching prüfen
Kurzer Lookup in `src/data/vehicles.ts` (oder wo der Bestand definiert ist), um die richtigen IDs für die 3 verlinkten Fahrzeuge zu finden. Falls keine 1:1-Treffer existieren, verlinke auf `/fahrzeuge` mit Marken-Filter im Query.

## Dateien
- **neu:** 3 Asset-PNGs in `src/assets/`
- **bearbeitet:** `src/components/site/HighlightFlyerCard.tsx` (radikal vereinfacht), `src/routes/index.tsx` (Cards-Daten)

Kein Backend, keine Style-Tokens-Änderung.
