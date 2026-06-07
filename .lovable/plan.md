# Redesign-Plan

Ziel: Die aktuelle helle Farbwelt wird durch einen deutlich hochwertigeren, dunklen Performance-Look ersetzt. Zusätzlich bekommen die Fahrzeug-Detailseiten einen starken Inserat-Stil nach dem Vorbild deiner Referenzen – aber angepasst auf Kabayels Autohaus.

## Was ich umbaue

### 1. Neue Farbwelt für die ganze Seite
Ich stelle die Seite von dem jetzigen hellen Gold/Weiß-Look auf einen dunklen Premium-Look um:
- Grundfarben: Schwarz, Anthrazit, Tiefgrau
- Akzentfarbe: kräftiges Rot
- Sekundärakzent: dezente Metall-/Champagner-Töne nur sehr sparsam
- Weniger „editorial hell“, mehr „performance showroom“

Das betrifft:
- Header
- Buttons
- Karten
- Fahrzeuglisten
- Formulare
- Footer
- Mobile Sticky Bar
- allgemeine Hintergründe, Linien, Hover-Zustände

### 2. Fahrzeugkarten klarer auf „Details“ ausrichten
Die Karten verlinken bereits korrekt auf echte Detailseiten. Ich mache das sichtbarer und hochwertiger:
- deutlicherer CTA auf den Karten
- stärkere Hierarchie bei Preis, Modell und Status
- optisch klarer, dass man in die Fahrzeug-Details reingehen kann

### 3. Neue Fahrzeug-Detailseite im Inserat-Stil
Die Detailseiten werden oben komplett neu aufgebaut – inspiriert von deinen Referenzen.

Geplant ist eine Komposition mit:
- starkem dunklem Hero-Bereich
- großem Fahrzeugtitel
- Key-Facts-Leiste direkt sichtbar (EZ, km, PS/kW, Getriebe, Kraftstoff etc.)
- prominenter Preisfläche
- Highlight-Sektion im Stil eines Premium-Inserats
- technische Daten als hochwertiges Datenpanel
- Bildbereiche/Galerie in einer spannenderen, inserat-artigen Anordnung
- CTA-Bereich für WhatsApp, Anruf, Finanzierung, Probefahrt

Wichtig: Ich kopiere die Beispielgrafiken nicht 1:1, sondern übernehme die Logik und den Premium-Charakter für Kabayels Autohaus.

### 4. Stilrichtung der Inserate
Da du „Schwarz + Rot“ gewählt hast, setze ich die Fahrzeugseiten so um:
- schwarze/dunkle Flächen als Bühne
- rote Akzentlinien, Badges und CTA-Flächen
- sportlichere Typografie-Hierarchie
- technischere, aggressivere Darstellung als aktuell

### 5. Bestehende Funktionen erhalten
Ich ändere nur Design und Präsentation, nicht unnötig die Logik.
Dabei prüfe ich beim Umbau besonders:
- Klick von Fahrzeugliste → Detailseite
- WhatsApp/Telefon/Probefahrt/Finanzierung auf Detailseiten
- ähnliche Fahrzeuge am Ende der Detailseite
- mobile Darstellung

## Betroffene Bereiche
Voraussichtlich vor allem:
- `src/styles.css`
- `src/components/site/VehicleCard.tsx`
- `src/routes/fahrzeuge.$id.tsx`
- ggf. `src/components/site/Header.tsx`
- ggf. `src/components/site/Footer.tsx`
- ggf. weitere kleine UI-Komponenten für CTA-/Fact-/Badge-Darstellung

## Technische Details
- Bestehende Fahrzeugdaten reichen für den Umbau bereits aus
- Die Detailseiten müssen nicht neu erfunden werden, sondern werden visuell neu strukturiert
- Die hochgeladenen Bilder nutze ich als Stilreferenz, nicht direkt als Website-Assets
- Kein Backend-Umbau nötig

## Ergebnis
Nach dem Umbau soll die Seite:
- deutlich moderner wirken
- farblich viel stärker und hochwertiger sein
- bei den Fahrzeugen nach echten Premium-Inseraten aussehen
- klar zeigen, dass man jedes Auto im Detail ansehen und direkt anfragen kann
