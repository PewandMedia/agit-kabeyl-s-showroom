## Ziel

Drei Probleme an einem Stück fixen:
1. Fahrzeug-Karten führen zuverlässig zur Detailseite.
2. Pro Fahrzeug ein echter, druckbarer Flyer im Stil der gezeigten Inserate für Kabayels Autohaus.
3. Gesamtauftritt seriöser: weniger Text, mehr Bild, ruhigere Hierarchie.

---

## 1. Detail-Klick reparieren

Bei `<Link>` mit verschachtelten interaktiven Elementen (z. B. das "Details ansehen" Pseudo-Button in `VehicleCard.tsx`) kann der Klick verschluckt wirken, wenn der innere Hover-Overlay (`absolute inset-x-0 bottom-0 ... pointer-events-auto`) zwischen Maus und Karte liegt oder der Status-Badge das Image überlagert.

Maßnahmen in `src/components/site/VehicleCard.tsx`:
- Die gesamte Karte bleibt **ein** `<Link>` (kein verschachteltes `<button>`/`<a>` innen).
- Alle dekorativen Layer (`Zu den Details`, "Details ansehen →", Status-Badge, Hover-Stripe) bekommen `pointer-events: none`, damit der Klick immer den Link trifft.
- Tap-Target ≥ 44 px, `aria-label` mit Titel + Preis.
- Bilder bekommen `draggable=false`, damit auf Touch kein Bild-Drag den Tap frisst.
- Auf der Bestandsseite und der Startseite wird **dieselbe** Karte genutzt — Fix wirkt überall.

Außerdem in `fahrzeuge.$id.tsx`: prüfen, dass `getVehicle(id)` korrekt matched (sonst landet man im `notFoundComponent`, was sich wie "nicht klickbar" anfühlt). Falls ID-Mismatch besteht, fixen.

---

## 2. Fahrzeug-Flyer (PDF + Web-Flyer)

Zweigleisig, weil die geschickten Beispiele wie echte Inserate aussehen:

### 2a) Web-Flyer (Detailseite im Inserat-Stil)
`src/routes/fahrzeuge.$id.tsx` wird zu einem "Print-Inserat im Web":
- Großes Hero-Bild des Autos (16:10), darüber kleines Marken-Lockup "Autohaus AK · Velbert" und Status-Badge.
- Titelzeile gross, eine knappe Untertitel-Zeile (Variante).
- Fakten-Streifen (EZ · KM · PS · Getriebe · Kraftstoff) als ruhige Chips.
- Preisblock rechts (sticky auf Desktop), darunter WhatsApp / Anrufen / Probefahrt / Finanzierung.
- "Ausstattung" knapp in zwei Spalten, keine Marketing-Floskeln.
- "Technische Daten" als kompakte Definitionsliste.
- Galerie nur als Strip (Thumbnails) statt großem Block, mehr Bilder weniger Text.
- "Ähnliche Fahrzeuge" beibehalten, aber kleiner.

### 2b) PDF-Download pro Fahrzeug
Auf der Detailseite ein Button "Flyer als PDF" der einen klassisch gesetzten 1-Seiten-Flyer erzeugt (DIN A4 quer-/hochformat, Logo, Hauptbild, Fakten, Preis, Kontakt + QR-Code zur Detailseite).
- Implementierung clientseitig mit `jspdf` + `html2canvas` (in Browser-Runtime erlaubt), keine Server-Funktion nötig.
- Daten kommen direkt aus `vehicles.ts`, keine zusätzliche Backend-Anbindung.
- Vorlage liegt in `src/components/site/VehicleFlyer.tsx` (versteckt off-screen gerendert, dann zu PDF konvertiert).

Falls `jspdf`/`html2canvas` Probleme machen, Fallback: Druck-optimierte CSS-Seite `/fahrzeuge/$id/flyer` (eigene Route, A4-Layout, `@media print`), Nutzer wählt im Browser "Als PDF speichern". Damit funktioniert es garantiert.

---

## 3. Seriöser, bildlastiger Auftritt

Reduktion auf der Startseite (`src/routes/index.tsx`) und in `Header.tsx`:
- Hero: Bild bleibt dominant, Headline kürzer ("Geprüfte Gebrauchtwagen aus Velbert."), Box-Untertitel auf 1–2 Sätze.
- "Team Kabayel · WBC #1"-Story als kleine, dezente Notiz unten im Hero — nicht als Hauptbotschaft.
- TrustBar: 4 Punkte, nur Icon + Label, keine doppelte Zeile.
- BrandStory: einen einzigen ruhigen Satz statt mehrerer Absätze.
- Highlights: nur Fahrzeug-Grid, kein zusätzlicher Erklärtext.
- Lange Sektionen WhyAK / Testimonials / Financing-Erklärung verschlanken oder zusammenführen (max. eine kurze Zeile + CTA).
- FAQ einklappbar, default zu.
- Farbe: aktuelles Schwarz behalten, Rot zurückhaltender einsetzen (nur Akzente, Hover, Preis, CTAs) — keine roten Flächen ohne Funktion.
- Typografie: Headlines bleiben, Fließtext eine Stufe kleiner und mit mehr Weiß drumherum.

Bestand (`fahrzeuge.tsx`): Hero-Block kürzer (nur Kicker + H1, keine Marketing-Beschreibung).

---

## 4. Funktionen prüfen

Letzter Durchgang in der Vorschau:
- Karte → Detail → WhatsApp / Anrufen / Probefahrt-Modal / Rückruf-Modal / Finanzierung-Link / PDF-Flyer-Download → alle klickbar.
- Mobile Sticky-Bar überdeckt keine CTAs.
- Filter/Sort auf `/fahrzeuge` funktionieren weiter.

---

## Betroffene Dateien
- `src/components/site/VehicleCard.tsx` (Klick-Fix, ruhigeres Layout)
- `src/routes/fahrzeuge.$id.tsx` (Inserat-Look + PDF-Button)
- `src/components/site/VehicleFlyer.tsx` (neu, PDF-Vorlage)
- evtl. `src/routes/fahrzeuge.$id.flyer.tsx` (Fallback-Druckseite)
- `src/routes/index.tsx` (weniger Text, mehr Bild)
- `src/routes/fahrzeuge.tsx` (kürzerer Header)
- `src/styles.css` (Rot dezenter, ruhigere Token)
- `bun add jspdf html2canvas qrcode` für PDF + QR

Keine Backend-/DB-Änderungen.
