## Ziel

Die Fahrzeug- und Flyer-Bilder werden derzeit als `.asset.json`-Pointer auf Lovables CDN (`/__l5e/assets-v1/...`) gespeichert. Dieser Pfad existiert nur auf Lovables Infrastruktur, deshalb laden die Bilder auf deinem eigenen Server (`kabayel.pewandmedia.de`) nicht. Wir holen alle Bilder zurueck in `src/assets/` und lassen Vite sie ganz normal mit deinem Build buendeln.

## Umfang

Betroffene Dateien:
- `src/assets/flyer-porsche-macan.png.asset.json` (1 Pointer)
- `src/assets/vehicles/*.asset.json` (alle Fahrzeugbilder: macan, cla45, cle, rs6, targa)

Code-Referenzen die angepasst werden:
- `src/data/vehicles.ts` (alle `import ... from "@/assets/vehicles/...asset.json"` plus `.map((a) => a.url)`)
- `src/routes/index.tsx` (Import von `flyerMacan` plus `flyerMacan.url`)

Keine anderen Komponenten greifen direkt auf Asset-Pointer zu.

## Schritte

1. **Bilder herunterladen.** Skript laeuft ueber alle `.asset.json` unter `src/assets/`, liest den `url`-Pfad und laedt die Datei vom Preview-Origin (`https://id-preview--bca0e697-7211-4a95-a942-310593cf6372.lovable.app`) an exakt denselben Pfad ohne die `.asset.json`-Endung (z. B. `src/assets/vehicles/macan-01.jpg`). Bricht ab, falls auch nur eine Datei fehlschlaegt.

2. **Pointer loeschen.** Alle erfolgreich ersetzten `.asset.json`-Dateien aus dem Repo entfernen (`rm`). Die eigentlichen CDN-Assets bleiben unangetastet, damit der Schritt reversibel bleibt.

3. **Imports umschreiben.**
   - In `src/data/vehicles.ts` und `src/routes/index.tsx` werden alle Import-Pfade `"@/assets/.../<datei>.<ext>.asset.json"` zu `"@/assets/.../<datei>.<ext>"` gekuerzt. Vite gibt dann beim Import einer Bilddatei direkt die URL als String zurueck.
   - `.map((a) => a.url)` wird zu `.map((a) => a)` (bzw. ganz entfernt, je nach Lesbarkeit).
   - `flyerMacan.url` wird zu `flyerMacan`.

4. **Build pruefen.** Wird automatisch ausgefuehrt; bei roten Imports nachsteuern.

## Technische Details

- Vite kennt fuer `.png/.jpg` den Default-Import als URL-String, deshalb genuegt das Entfernen von `.asset.json` und `.url`.
- Repository wird um die Bildgroessen wachsen (grob im zweistelligen MB-Bereich). Das ist bei eigenem Hosting gewollt, damit der Build alles enthaelt.
- Keine Aenderungen an Routing, Komponenten oder Server-Code noetig.
- `vite.config.ts` und `wrangler.jsonc` bleiben unveraendert.

## Nicht im Plan

- Keine Aenderung an externen URLs/CDNs.
- Keine Migration zu einem externen Bild-Host.
- Bilder werden nicht komprimiert/optimiert (kann auf Wunsch in einem Folgeschritt erfolgen).
