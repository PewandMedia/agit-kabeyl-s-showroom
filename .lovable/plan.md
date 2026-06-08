# Porsche 993 Targa zum Bestand hinzufügen

Neues Fahrzeug `AK-2025-004` Porsche 993 Targa aus dem hochgeladenen mobile.de-Paket in den Bestand integrieren — analog zu den vorherigen Fahrzeugen (Macan, CLA 45 AMG, RS6).

## Schritte

1. **Bilder beschaffen (36 Stück)**
   - Alle 36 Bild-URLs von `img.classistatic.de` herunterladen.
   - Mit ImageMagick zu JPEG konvertieren.
   - Per `lovable-assets create` als `targa-01.jpg.asset.json` … `targa-36.jpg.asset.json` ins CDN hochladen.

2. **`src/data/vehicles.ts` erweitern**
   - 36 Bild-Imports `targa01` … `targa36` ergänzen.
   - Neues Array `targa993Images` mit den 36 URLs.
   - Neuen Fahrzeug-Eintrag `AK-2025-004` einfügen mit allen Daten aus `fahrzeugdaten.json`:
     - Porsche 993 Targa, 69.870 €, 220.000 km, EZ 10/1995
     - 210 kW (286 PS), 3.600 cm³, 6 Zylinder, Schaltgetriebe, Benzin
     - Polarsilber Metallic, Vollleder Schwarz, 3 Vorbesitzer, HU 10/2027
     - Deutsche Ausführung, Baureihe 993, Ausstattungslinie Targa
     - Komplette Ausstattungs- und Beschreibungsliste übernehmen
     - `financingAvailable: true` (ab 736 € mtl.)
     - Status: `available`
     - 36 Bild-URLs

3. **Keine weiteren Änderungen** an Startseite, Komponenten oder Filtern — der Wagen erscheint automatisch im Bestand.
