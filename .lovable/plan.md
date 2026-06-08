## Ziel
Auf der Startseite im Highlights-Bereich die drei bisherigen KI-Flyer (Porsche Cayenne GTS, Range Rover Sport HSE, Mercedes V 300 d) entfernen und durch den neuen, hochgeladenen Porsche Macan 2.0 PDK Flyer ersetzen. Der Flyer verlinkt auf die Detailseite `AK-2025-001`.

## Schritte

1. **Neuen Flyer als CDN-Asset anlegen**
   - `lovable-assets create` mit der hochgeladenen Datei `ChatGPT Image 8. Juni 2026, 14_50_37.png`
   - Pointer-Datei: `src/assets/flyer-porsche-macan.png.asset.json`

2. **`src/routes/index.tsx` anpassen**
   - Die drei Imports `flyerPorsche`, `flyerRangeRover`, `flyerMercedes` entfernen.
   - Neuen Import `flyerMacan from "@/assets/flyer-porsche-macan.png.asset.json"` hinzufügen.
   - `HIGHLIGHT_FLYERS` auf einen einzigen Eintrag reduzieren (Macan → `/fahrzeuge/$id` mit `id: "AK-2025-001"`).
   - Im `Highlights()`-Layout das Grid so anpassen, dass eine einzelne Karte zentriert und in passender Maximalbreite dargestellt wird (statt `md:grid-cols-3`), z. B. zentrierte Karte mit `max-w-2xl`.
   - Den Untertitel von „Drei Inserate, drei Geschichten." auf etwas Passendes für ein einzelnes Highlight ändern (z. B. „Unser aktuelles Highlight-Inserat.").

3. **Alte Flyer-Assets löschen**
   - `src/assets/flyer-porsche-cayenne-gts.png.asset.json`
   - `src/assets/flyer-range-rover-sport-hse.png.asset.json`
   - `src/assets/flyer-mercedes-v300d.png.asset.json`
   (via `assets--delete_asset`, entfernt CDN-Datei + Pointer)

4. **Verifikation**
   - Preview auf `/` laden und prüfen, dass der Macan-Flyer einzeln, zentriert und scharf erscheint und der Klick auf die Detailseite des Macan führt.

## Hinweise
- Der Bestand (`vehicles.ts`) bleibt unverändert — dort steht bereits der Macan als `AK-2025-001`.
- Header-Text „Drei Inserate…" wird auf einzelnes Highlight angepasst, damit nichts widersprüchlich wirkt.