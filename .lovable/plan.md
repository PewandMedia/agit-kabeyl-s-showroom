## Neues Fahrzeug: Audi RS6 Avant 4.0 TFSI quattro

Quelle: mobile.de Inserat 456325877 (Daten aus dem ZIP). Im ZIP sind keine lokalen Bilder enthalten — nur 35 Bild-URLs von classistatic.de (AVIF-Auslieferung). Ich lade die Bilder im Sandbox herunter, konvertiere sie zu JPEG und uploade sie via `lovable-assets` ins CDN.

### Schritte

1. **35 Bilder** von den `BildURLs` herunterladen, mit ImageMagick zu JPEG konvertieren, dann je via `lovable-assets create` als `rs6-01.jpg.asset.json` … `rs6-35.jpg.asset.json` ins CDN. Falls einzelne Downloads scheitern, melde ich, wie viele Bilder am Ende verfügbar sind.
2. **`src/data/vehicles.ts`**: 35 Imports `rs601`…`rs635`, ein `rs6Images`-Array und ein neuer Eintrag `AK-2025-003` direkt nach dem CLA 45.

### Fahrzeugdaten (AK-2025-003)

- Audi RS6 Avant 4.0 TFSI quattro
- 84.870 € (brutto, 19 % MwSt. — 71.319 € netto)
- 87.000 km, EZ 06/2021, 441 kW (600 PS), Benzin, Automatik, Allrad
- Farbe: „Audi exclusive Individuallackierung" / Vollleder Schwarz
- 1 Vorbesitzer, unfallfrei, Scheckheftgepflegt, deutsche Ausführung
- HU 08/2027, Euro 6, 4-Zonen-Klima, 8 Zylinder, 3.996 cm³
- `financingAvailable: true`, Status `new-arrival` (damit es auf der Bestandsseite hervorgehoben wird; Highlight-Flyer auf Startseite bleibt Macan).
- Vollständige Ausstattungsliste aus dem JSON (~85 Punkte) übernommen.
- Beschreibung aus dem JSON 1:1 übernommen.

### Verifikation

- `/fahrzeuge` zeigt jetzt drei Karten: Macan, CLA 45, RS6.
- `/fahrzeuge/AK-2025-003` lädt mit allen Bildern und vollständigen Daten.
- Startseite unverändert (nur Macan-Flyer).

### Hinweis

Die Bilder werden von mobile.de/classistatic geladen und ins Lovable-CDN übernommen — anschließend hängt das Inserat nicht mehr von der externen Quelle ab. Falls einzelne URLs nicht mehr abrufbar sind, fällt die jeweilige Bildposition weg und ich melde das im Build-Ergebnis.
