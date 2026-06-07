
# Premium-Refresh — Cinematic Champion Edition

Ziel: Aus der jetzigen Seite eine "Awwwards-würdige" Vorlage machen. Hero-Bild auf ein neues Level, Hero-Composition cineastischer, Sektionen visuell aufgewertet, Mobile poliert, Formulare verifiziert.

Rechtlicher Rahmen: Echte Kabayel-Fotos (auch aus der Google-Suche) sind urheberrechtlich geschützt. Ich nutze daher **stilisierte, rechtssichere KI-Bilder** und lasse klare TODO-Marker im Code, damit später lizenzierte Pressefotos eingesetzt werden können.

## 1. Neues Hero-Bild (das Kernstück)

Ein einziges, starkes Editorial-Bild statt nur Portrait — **Premium-Quality**:
- **Motiv**: Dramatische Boxer-Silhouette von hinten (Schulterpartie, Bandagen, kein erkennbares Gesicht → rechtssicher) vor einem dunklen, halbbeleuchteten Premium-Coupé in einer Werkstatt-Halle. Goldenes Rim-Light auf Schulter + Autodach, harter Schatten, kinematografisch.
- **Format**: 3:4 hoch (1280×1707) für die Hero-Spalte
- **Datei**: `src/assets/champion-hero.jpg` (alt `champion-portrait.jpg` bleibt als Fallback in /ueber-uns)
- **Model**: `imagegen` premium

## 2. Hero-Sektion neu komponieren

- **Volle Viewport-Höhe** (min-h-[92vh]) mit cineastischem Layout
- Linke Spalte (5/12): das neue Bild, mit overlaying gold-rim & subtilem Ken-Burns-ähnlichen Scale-on-Load
- Rechte Spalte (7/12):
  - Eyebrow mit animierter Goldlinie
  - **Riesige Headline** (font-size bis 96px) mit gemischter Display-Schrift + Italic-Akzent ("WBC #1 Contender" in italic gold)
  - Subline + zwei CTAs (Primary "Fahrzeuge ansehen" / Secondary "Story lesen")
  - **Stat-Strip** wird visuell aufgewertet (animated count-up, dünne Goldlinien zwischen den Werten)
- **Scroll-Indicator** unten (dünne animierte Vertikal-Linie + "Scroll" Label)
- Dezenter **Grain-Overlay** + radialer Spotlight-Verlauf in der Sektion

## 3. Sektions-Politur

| Sektion | Upgrade |
|---|---|
| **TrustBar** | Icons in goldenem Kreis, Hover-Lift, animated fade-in on scroll |
| **BrandStory** | Marquee-Style Mini-Tag-Reel ("VELBERT · SEIT 2018 · TEAM KABAYEL · …") als dünne Bewegung über der Sektion |
| **Highlights (Fahrzeug-Grid)** | Section-Header bekommt ein dezent animiertes Goldband, Cards heben sich stärker bei Hover (Schatten + Image-Zoom verstärken) |
| **SellCar / Financing** | Klarere Hierarchie, große Editorial-Zahlen (01/02/03) als Designelement |
| **FAQ** | Sauberes Accordion mit Gold-Linien |
| **ContactCTA** | Vollbreite dunkle Sektion mit Gold-Accent — visueller Bruch zum Footer |

## 4. Globale Design-Politur

- **Smooth scroll-reveals** via Intersection Observer auf Sektions-Headlines (fade-up, kein heavy library)
- **Header**: beim Scroll dezenter Gold-Hairline darunter
- **Mobile Sticky Bar**: weiße Glas-Optik mit Gold-Akzent (existiert schon, wird visuell geschliffen)
- **Cursor-Friendly**: alle Hover-States konsistent (500ms easing)
- **Typography Scale**: H1 größer, mehr Tracking-Differenzierung zwischen Display und Mono

## 5. Feature-Check (Funktion)

Da nicht klar war, was konkret defekt sein soll, gehe ich pragmatisch durch:
1. **Alle Lead-Formulare** (Anfrage, Probefahrt, Rückruf, Finanzierung, Ankauf) per Browser-Tool öffnen und Submit testen
2. **Fahrzeug-Filter** auf `/fahrzeuge` durchklicken
3. **Mobile Viewport (375px)** alle Hauptseiten visuell prüfen
4. Fundstellen werden direkt gefixt; Issues, die ich nicht reproduzieren kann, dokumentiere ich im Ergebnis

## 6. Aus dem Scope

- Echtes Kabayel-Pressefoto (Lizenz fehlt) — TODO im Code bleibt
- Backend-Änderungen, mobile.de-Import (separater Auftrag)
- Komplette Komponenten-Logik bleibt unverändert; nur Präsentation + neue Hero-Composition

## Technische Details

- Neue Datei: `src/assets/champion-hero.jpg` via `imagegen` (premium, 3:4)
- Editierte Dateien: `src/routes/index.tsx` (Hero rebuild + Sektions-Politur), `src/styles.css` (neue Animation-Utilities: reveal, marquee, gold-spot), evtl. `src/components/site/Header.tsx` (Hairline), `src/components/site/MobileStickyBar.tsx` (Politur)
- Keine neuen npm-Pakete nötig (alles mit CSS + IntersectionObserver lösbar)
- Verifikation via Browser-Preview (Desktop 1440, Mobile 375)

## Nächster Schritt

Switch to Build Mode → Bild generieren, Hero neu bauen, Sektionen polieren, Mobile prüfen, Formulare durchklicken.
