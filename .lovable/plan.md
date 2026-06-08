## Ziel

Alle 10 KI-generierten Fahrzeuge aus dem Bestand entfernen und durch das echte Inserat **Porsche Macan 2.0 PDK** (28.870 €, 149.990 km, EZ 10/2017) mit allen 26 Originalbildern ersetzen.

## Vorgehen

### 1. Bilder als Lovable-Assets einbinden
- Die 26 Bild-URLs aus dem hochgeladenen ZIP per `lovable-assets create --url …` als CDN-Assets registrieren.
- Pro Bild entsteht eine `src/assets/vehicles/macan-NN.jpg.asset.json` (Pointer-Datei mit CDN-URL, kein Binary im Repo).
- Vorteil: keine 26 Binärdateien im Repo, schnelles Laden über CDN, sauber für späteren Supabase-Umzug (URLs lassen sich direkt in eine DB-Spalte übernehmen).

### 2. KI-Bilder aus dem Repo entfernen
- `src/assets/vehicles/AK-2024-001-*.jpg` … `AK-2024-010-*.jpg` löschen (30 Dateien).

### 3. `src/data/vehicles.ts` neu aufbauen
- Alle 10 alten KI-Einträge sowie ihre Imports entfernen.
- Neuen Eintrag `AK-2025-001` (Porsche Macan) mit allen gelieferten Daten anlegen:
  - Marke/Modell/Variante, Preis 28.870 €, 149.990 km, EZ 10/2017
  - 185 kW (252 PS), Allrad, PDK, Benzin, Tiefschwarz Metallic, Vollleder Schwarz
  - 3 Vorbesitzer, HU 07/2027, Euro 6, unfallfrei
  - Vollständige Ausstattungsliste (BOSE, PDLS/Bi-Xenon, PCM, Rückfahrkamera, Parkassistent v/h, Sitzheizung, Apple CarPlay/Android Auto, 20" RS Spyder, etc.)
  - Originalbeschreibung übernehmen
  - 26 Bilder aus den Asset-Pointern als `images`-Array
  - Status: `highlight`
- `featuredVehicles` greift automatisch auf den einzigen verfügbaren Wagen zurück (Fallback ist bereits eingebaut).

### 4. Konsistenz prüfen
- `VehicleCard` zeigt `images[0]` → erstes Bild als Vorschau ✓
- `VehicleGallery` auf der Detailseite scrollt alle 26 Bilder ✓
- Startseite (Highlights), `/fahrzeuge`-Liste und `/fahrzeuge/AK-2025-001` rendern korrekt.
- Filter (`VehicleFilters`) funktionieren weiterhin (keine Strukturänderung am Type).

### 5. Live-Preview verifizieren
- `/fahrzeuge` zeigt nur noch den Macan.
- Detailseite öffnet, Galerie mit 26 Bildern, alle Infos darunter sichtbar.

## Hinweis zur späteren Datenbank
Struktur bleibt identisch zu heute, nur Datenquelle ändert sich später. Die CDN-Bild-URLs lassen sich 1:1 in eine spätere `vehicles`-Tabelle übernehmen — kein Re-Upload nötig. Aktuell **keine** DB-Verbindung, kein Konflikt mit zukünftigem Lovable-Cloud/Supabase-Setup.

## Geänderte Dateien
- `src/data/vehicles.ts` (komplett neu)
- `src/assets/vehicles/macan-01.jpg.asset.json` … `macan-26.jpg.asset.json` (26 neu)
- 30 Dateien gelöscht: `src/assets/vehicles/AK-2024-0NN-*.jpg`
