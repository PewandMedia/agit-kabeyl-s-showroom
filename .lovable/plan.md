# Plan: Detail-Seite reparieren + mehrere Bilder pro Fahrzeug

## Problem 1 — Klick auf "Details" wirkt wie Scroll nach oben
Die Detail-Route `/fahrzeuge/$id` existiert und rendert bereits alle Daten inkl. Ausstattung (10 Fahrzeuge, je 8-10 Features in `src/data/vehicles.ts`). Der Klick scheint aber nicht zu navigieren — Runtime-Log zeigt `Failed to fetch dynamically imported module … tanstack-start-client-entry`. Ursache: stale Vite-Modulgraph nach den letzten Edits.

**Fix:** Dev-Server neu starten, danach in der Preview auf RS5 klicken und Detail-Seite (Galerie · Eckdaten · Ausstattung · Tech. Daten · Anfrage) verifizieren.

## Problem 2 — In der Galerie ist nur 1 Bild zu sehen
Die `VehicleGallery` rendert bereits mehrere Bilder mit Thumbnails. Aktuell teilen sich aber alle Fahrzeuge nur 5 Stock-Fotos (`hero-car.jpg`, `car-1…4.jpg`) — d.h. pro Auto sieht man 3-4× sehr ähnliche/gleiche Bilder. Es fehlen echte fahrzeugspezifische Aufnahmen.

**Fix:** Für jedes der 10 Fahrzeuge generiere ich **3 markenspezifische Bilder** mit dem Agent-Image-Tool (cineastische Showroom-Aufnahmen passend zu Marke/Modell/Farbe — Exterieur Front 3/4, Heck 3/4, Interieur/Cockpit). Speichere unter `src/assets/vehicles/<id>-{1,2,3}.jpg`, lege sie als Lovable-Asset-Pointer an (CDN, kein Repo-Bloat) und verdrahte sie in `vehicles.ts` als `images: [hero, side, interior]`.

### Bildbeschreibungen (Beispiele)
- **AK-2024-001** Mercedes S 500 Obsidianschwarz: dunkler Showroom, AMG-Line Front 3/4, Heck-Schräg, MBUX-Cockpit
- **AK-2024-002** BMW M4 Comp Brooklyn Grey: Front mit Carbon-Dach, Heck mit Quad-Auspuff, M-Sportsitze
- **AK-2024-003** Porsche 911 GT-Silber: Front, Heckflügel-Detail, Sport-Chrono-Interieur
- **AK-2024-004** Audi RS5 Sportback Nardograu: Coupé-Linie 3/4, Heck mit Diffusor, Virtual Cockpit
- … analog für 005-010 (G-Klasse, Cayenne, M3, RS Q8, Range Rover Sport, AMG GT)

3 Bilder × 10 Autos = **30 Generierungen** (Tier `fast`, 4:3, ~6-8 Min total). Falls Zeit/Cost knapp wird, fallback auf **2 Bilder × 10 Autos**.

### Dateien
- **neu:** `src/assets/vehicles/<id>-{1,2,3}.jpg.asset.json` (30 Asset-Pointer, keine Binaries im Repo)
- **bearbeitet:** `src/data/vehicles.ts` (pro Fahrzeug `images: […]` auf die neuen URLs umstellen)
- **Dev-Server-Restart** für den Navigations-Fix

Keine Backend-Änderung, kein Schema-Wechsel.
