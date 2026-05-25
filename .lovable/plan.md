# Redesign — Champion Edition

Komplette Abkehr vom dunklen Grün. Neue Identität: **helles Editorial-Weiß + Champagner-Gold + tiefes Schwarz**, mit Agit Kabayel als sichtbarem Markenbotschafter (WBC #1 Contender).

## 1. Neue Farbpalette (src/styles.css)

| Token | Wert | Verwendung |
|---|---|---|
| `--paper` | `#fafbfc` (oklch 0.985) | Seiten-Hintergrund |
| `--surface` | `#ffffff` | Karten |
| `--surface-2` | `#f3f1ec` | Sektions-Bänder |
| `--ink` | `#0d0d0d` | Haupttext, Headlines |
| `--ink-soft` | `#5a5a5a` | Sekundärtext |
| `--champagne` | `#c9a84c` (Gold) | Akzent, Preise, CTAs |
| `--champagne-soft` | `#e0c97a` | Hover |
| `--line` | `#0d0d0d / 10%` | Trennlinien |
| `--ring-rot` | `#c44545` | Champion-Badge "WBC #1" |

Alle bisherigen `bg-emerald-deep`, `text-paper` etc. bleiben Klassennamen — nur die CSS-Variablen werden umgemappt. Dadurch hellt sich die komplette Seite automatisch auf, ohne jede Komponente anzufassen.

## 2. Kabayel-Branding (neu)

**Hero-Bereich (`src/routes/index.tsx`)** — neue Sektion **direkt unter dem Header**, vor den Fahrzeugen:
- Split-Layout: links Portrait, rechts Text
- Headline: „Das Autohaus des **WBC #1 Contender**"
- Sub: „Agit Kabayel — Schwergewicht aus Bochum. Sein Team, Ihre Garantie für ehrliche Auto-Beratung."
- Gold-Badge: „WBC #1 CONTENDER · HEAVYWEIGHT"
- CTA: „Fahrzeuge ansehen" / „Story lesen"

**Bild**: KI-generierter stilisierter Boxer-Schattenriss (kein Foto von Kabayel — rechtssicher). Schwarz-Weiß, dramatisch, mit Gold-Akzent. Datei: `src/assets/champion-portrait.jpg`.
TODO-Hinweis im Code: „Echtes Pressefoto hier einsetzen, sobald Lizenz geklärt."

**Header (`Header.tsx`)**: kleines Gold-Badge neben dem Logo: „TEAM KABAYEL · WBC #1".

**Über-Uns-Seite (`ueber-uns.tsx`)**: eigene Story-Sektion „Boxen & Autos — gleiche Haltung" mit Bild, Karriere-Eckdaten (38 Kämpfe, 25 K.o., WBC-Ranking), Zitat-Block.

**Footer**: Zeile „Stolzer Partner von Agit Kabayel — WBC #1 Contender Heavyweight".

## 3. Visuelle Anpassungen

- **VehicleCard**: helle Karten mit dünner schwarzer Linie statt grünem Surface; Preis in Gold bleibt
- **Buttons (`Btn.tsx`)**: Primary = schwarz/Gold-Text → Hover Gold/Schwarz; Secondary = Gold-Border auf Weiß
- **Header**: weiß/transparent statt dunkel, Logo in Schwarz
- **Forms**: weiße Inputs mit grauer Border, Gold-Focus-Ring
- **Mobile Sticky Bar**: weißer Hintergrund + Gold-Akzent

## 4. SEO / Meta

Title & Description auf allen Routen anpassen: „Autohaus AK · Team Kabayel — Premium Gebrauchtwagen Velbert".

## Technische Details

- **Keine** Komponenten-Logik ändert sich. Nur CSS-Variablen + neue Hero-Sektion + neues Bild.
- Generiertes Portrait via `imagegen` (stilisierter Boxer-Schattenriss, premium quality).
- Box-Daten (Kampfbilanz, WBC-Position) im Code als TODO markiert — Stand Mai 2026 sollte vom Kunden bestätigt werden.
- Runtime-Fehler (dynamic import) wird durch das automatische Rebuild nach den Edits behoben.

## Aus dem Scope

- Echtes Pressefoto von Kabayel (Lizenz fehlt) — Platzhalter mit klarem TODO
- Backend / Datenbank
- mobile.de-Import (separater Auftrag)

## Nächster Schritt

Switch to Build Mode → Farb-Tokens tauschen, Hero-Sektion bauen, Portrait generieren, Header/Footer/About anpassen, visuell auf Preview prüfen.