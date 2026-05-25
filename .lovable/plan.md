# Plan: Fahrzeuge von mobile.de (AK Autohaus GmbH) importieren

## Ziel
Alle aktiven Inserate von `home.mobile.de` (Kunden-ID 36122940, AK Autohaus GmbH) einmalig in die Website übernehmen — mit Bildern direkt vom mobile.de-CDN (Hotlink).

## Schritte

### 1. Firecrawl-Connector aktivieren
mobile.de rendert mit JavaScript und hat Bot-Schutz. `fetch_website` reicht nicht — Firecrawl ist nötig.
→ Tool `standard_connectors--connect` mit `connector_id: firecrawl`
→ Nutzer klickt einmal auf Connect.

### 2. Inseratsliste mappen
- `firecrawl.map` auf `https://home.mobile.de/AKAUTOHAUSGMBH` (bzw. die Kunden-ID-URL).
- Filter auf URLs nach Schema `mobile.de/auto-inserat/.../*` oder `home.mobile.de/.../vehicle/*`.
- Resultat: vollständige Liste aktiver Inserats-URLs.

### 3. Detailseiten scrapen (strukturiert)
- `firecrawl.scrape` mit `formats: [{ type: 'json', schema: {...} }]` für jede URL.
- Extrahiertes Schema pro Fahrzeug:
  - `mobileId` (aus URL)
  - `marke`, `modell`, `variante`
  - `preis` (EUR, brutto/netto-Flag)
  - `erstzulassung` (MM/YYYY)
  - `kilometer`
  - `leistungKw`, `leistungPs`
  - `getriebe`, `kraftstoff`, `farbe`, `karosserie`
  - `hu` (TÜV)
  - `ausstattung[]` (Top-Features)
  - `beschreibung`
  - `bilder[]` (mobile.de-CDN-URLs, max. 20)

### 4. Daten in `vehicles.ts` schreiben
- Mapping auf bestehendes `Vehicle`-Schema in `src/data/vehicles.ts`.
- Slug-Generierung: `marke-modell-mobileId` (URL-safe).
- `featured`: 3 teuerste Fahrzeuge automatisch markieren.
- Bilder als `https://img.classistatic.de/...` direkt referenzieren (Hotlink, kein Download).

### 5. Verifikation
- Build-Check
- Stichprobe: Homepage, `/fahrzeuge`, eine Detailseite per Screenshot prüfen.

## Wichtige Hinweise

**Hotlink-Risiko (transparent):**
- Bilder werden direkt von `img.classistatic.de` geladen — kein eigener Speicherbedarf.
- ABER: Wenn mobile.de Hotlinking blockiert oder das Inserat gelöscht wird, erscheinen leere/fehlerhafte Bilder.
- Bei Problemen können wir später auf lokales WebP-Caching umstellen.

**Statischer Import:**
- Einmaliger Snapshot — wenn AK Autohaus neue Fahrzeuge auf mobile.de einstellt oder verkauft, müssen Sie mich erneut anweisen, den Import zu wiederholen.

**Stammdaten / mobile.de-Logo:**
- Unverändert (keine echten Firmendaten ohne Ihre Bestätigung).

**Rechtliches:**
- Da Sie im Auftrag von AK Autohaus arbeiten, dürfen die eigenen Inserate übernommen werden. Bei Bedarf Freigabe vom Kunden einholen.

## Nicht enthalten
- Backend/Datenbank für Leads
- Echte Bilder-Downloads/WebP-Optimierung
- Automatische Synchronisation
- mobile.de-Logo-Entfernung aus Bildern (nur mit Original-Files möglich)

## Nächster Schritt
Firecrawl-Connector aktivieren — danach starte ich Scrape + Import direkt.