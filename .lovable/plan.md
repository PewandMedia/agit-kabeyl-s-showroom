## Favicon im Site-Stil

Ersetze das bisherige grüne Platzhalter-Favicon durch eines, das exakt dem Header-Branding entspricht:
- **Hintergrund:** dunkles `--paper` (≈ `#16161b`), abgerundete Ecken (8px Radius bei 64×64)
- **„AK"**: weiß (`--ink`), extrabold, tight tracking — gleiche Behandlung wie im Header
- **Champagne-Akzent:** kleiner Punkt/Strich unter „AK" in `--champagne` (≈ `#d2693f`), als visueller Anker analog zum kleinen Quadrat-Akzent im Header
- Format: `public/favicon.svg` (skaliert nativ, ersetzt die bisherige Datei)

## Stammdaten aktualisieren (`src/data/dealer.ts`)

Echte Daten einsetzen und die TODO-Markierungen entfernen:
- `street`: `"Eckstraße 9a"`
- `postalCode`: `"42551"`, `city`: `"Velbert"` (bleibt)
- `phone`: `"+4916090919911"`, `phoneDisplay`: `"+49 160 90919911"`
- `whatsapp`: `"4916090919911"` (intl. Format ohne `+`)
- `email`: `"info@autohaus-ak.com"`
- Datei-Kommentar oben: TODO-Block durch kurzen Hinweis ersetzen, dass `managingDirector`, `hrb`, `ustId` noch Platzhalter sind (für Impressum rechtlich erforderlich) — diese kann ich ohne Daten nicht erfinden.

## Nicht enthalten
- `managingDirector`, `hrb`, `ustId` bleiben Platzhalter (TODO im Datei-Kopf). Wenn du sie nachreichst, ergänze ich sie sofort.