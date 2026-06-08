## Ziel
Mercedes-Benz CLA 45 AMG 4Matic als zweites Inserat in den Bestand aufnehmen. Daten und 22 Bilder kommen aus dem hochgeladenen ZIP.

## Schritte

1. **22 Bilder als CDN-Assets hochladen**
   - `lovable-assets create` für `bild_01.png` … `bild_22.png`
   - Pointer: `src/assets/vehicles/cla45-01.jpg.asset.json` … `cla45-22.jpg.asset.json`
   *(Dateiendung im Pointer bleibt `.png` wenn Quelle `.png` ist — ich nutze `--filename cla45-XX.png`.)*

2. **`src/data/vehicles.ts` erweitern**
   - Imports für alle 22 neuen `cla45-*.png.asset.json` hinzufügen.
   - Neuen `vehicles[]`-Eintrag `AK-2025-002` direkt nach dem Macan einfügen:
     - Marke: Mercedes-Benz, Modell: CLA 45 AMG, Variante: 4Matic
     - Preis: 20.870 €, Monatsrate: 196 €
     - 165.000 km, EZ 09/2015, 280 kW, Benzin, Automatik
     - Allrad, Kosmosschwarz Metallic, Teilleder Schwarz
     - 1 Vorbesitzer, HU 08/2027, Euro 6, Gebraucht
     - Features-Liste aus den Inseratdaten (Klappenauspuff, H&K, Memory, HD-Performance, AMG Driver's Package, Night-Paket, 19" AMG Felgen, Bi-Xenon, Abstandstempomat, Rückfahrkamera, Sportfahrwerk, etc.)
     - Beschreibung kompakt aus den Inserat-Angaben generieren
     - Status: `available` (Highlight bleibt der Macan auf der Startseite)
     - `financingAvailable: true`

3. **Verifikation**
   - `/fahrzeuge` zeigt Macan + CLA 45 AMG
   - `/fahrzeuge/AK-2025-002` lädt mit Galerie aller 22 Bilder
   - Startseiten-Flyer bleibt unverändert (Macan)

## Hinweise
- Keine Änderungen an `HIGHLIGHT_FLYERS` auf der Startseite.
- Der bestehende Macan-Eintrag (`AK-2025-001`) bleibt unverändert.