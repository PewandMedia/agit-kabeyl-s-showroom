## Ziel

Die Seite deployment-ready machen und alle für Besucher sichtbaren Hinweise auf Lovable entfernen. Da die Domain noch nicht final ist, bleiben Canonical/og:url/Sitemap relativ — das funktioniert sofort unter jeder Domain.

## Was geändert wird

### 1. Lovable-Spuren entfernen
- **Publish-Badge** ("Edit with Lovable") auf veröffentlichten Deployments **ausblenden** (`publish_settings--set_badge_visibility` → benötigt Pro-Plan; falls Plan zu klein, melde ich das zurück).
- **`package.json`**: Projektname `tanstack-start-app` → `autohaus-ak-website`.
- **`wrangler.jsonc`**: Worker-Name `tanstack-start-app` → `autohaus-ak`.
- **`.lovable/plan.md`** lassen wir — das ist intern und wird nicht ausgeliefert.
- Der Build-Plugin-Import `@lovable.dev/vite-tanstack-config` **bleibt** (rein build-seitig, im Browser unsichtbar; ein Entfernen würde den Build brechen).

### 2. Stammdaten / Platzhalter (`src/data/dealer.ts`)
- Echte Adresse, Telefon, WhatsApp, E-Mail, HRB, USt-ID sind aktuell `Musterstraße 1` / `00000` etc. Da du die Frage übersprungen hast, **markiere ich sie deutlich mit `TODO:`-Kommentaren am Anfang der Datei und lasse die Platzhalter** — du musst sie vor Go-Live ersetzen. (Falls du willst, dass ich frei erfundene Daten einsetze, sag Bescheid — aber für ein echtes Impressum riskant.)

### 3. SEO & Head
- **`src/routes/__root.tsx`**: Default-`og:image` (Champion-Bild) ergänzen, `theme-color` passend zur Markenfarbe.
- **`<link rel="icon">`**: ein schlichtes `AK`-Monogramm-Favicon (SVG, Markengrün auf hellem Grund) generieren und unter `public/favicon.svg` + `apple-touch-icon.png` einbinden.
- Sicherstellen, dass alle Routen (`fahrzeuge.index`, `fahrzeuge.$id`, `kontakt`, etc.) eigene `title` + `description` + `og:title` + `og:description` haben (Spot-Check, ggf. ergänzen).
- **`src/routes/sitemap[.]xml.ts`**: `BASE_URL = ""` bleibt mit TODO — relative URLs sind unter jeder Domain gültig.

### 4. robots.txt
- `public/robots.txt` bleibt `User-agent: * / Allow: /` — kein `Sitemap:`-Eintrag, bis Domain final ist (sonst falsche URL im Index).

### 5. Build-/Deploy-Check
- Nach den Änderungen einmal die Vorschau prüfen (Konsole + Netzwerk) — keine 404-Assets, kein Lovable-Branding im DOM.

## Nicht enthalten (ohne deine Daten nicht machbar)
- Echte Impressums-Daten (Adresse, GF, HRB, USt-ID, Telefon, E-Mail, WhatsApp).
- Verbindung einer eigenen Domain (`autohaus-ak.de` o. ä.) — das geht nach dem ersten Publish in Project Settings → Domains.
- Eigentlicher Publish-Klick — den löst du selbst aus, oder ich tue es nach deinem OK.

## Nach diesem Plan lieferbar
Die Seite ist technisch deploybar (Build sauber, Favicon, OG-Tags, Sitemap funktioniert, Badge weg). Vor echtem Go-Live musst du nur noch die `TODO:`-Stammdaten in `src/data/dealer.ts` ersetzen und die Domain verbinden.