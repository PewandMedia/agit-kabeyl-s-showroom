# Mobile-First Überarbeitung

Ziel: Smartphone-Erlebnis besser als typische Autohaus-Portale (Mobile.de, AutoScout24). Desktop bleibt visuell unverändert — alle Änderungen greifen nur unter `md:`.

## 1. Globales Layout & Sticky Conversion-Layer

**`MobileStickyBar.tsx`**
- Höhe auf min. 56px, Buttons min. 48px Touch-Target.
- Safe-Area: `pb-[env(safe-area-inset-bottom)]` damit iPhone-Home-Indicator nicht überlappt.
- Icons 20px, Label 10px, klarere aktive Farbe (Champagne) auf der gerade aktiven Route.
- WhatsApp + Anfrage als primäre farbige Buttons, Bestand + Anrufen als Sekundär.

**`SiteLayout.tsx`**
- Bottom-Padding `pb-[88px] md:pb-0` damit Sticky-Bar Inhalte nie verdeckt.
- `StickyWhatsAppFab` auf Mobile ausblenden (Sticky-Bar deckt WhatsApp bereits ab) — verhindert doppelte CTAs und Overlap mit dem Inhalt.

**`Header.tsx`**
- Höhe `h-16` mobil (statt h-20), kompaktere Logo-Zeile.
- Telefonnummer-Icon-Button immer sichtbar in der mobilen Top-Bar (Tel:-Link, 44×44).
- Menübutton 44×44, klar erkennbares Burger-Icon (3 Linien statt 2).
- Mobile-Menü: jeder Eintrag min. 56px hoch, primäre CTAs (Anrufen, WhatsApp) als 2-Spalten oben, Nav darunter.

## 2. Startseite (`routes/index.tsx`)

**Hero (above the fold)**
- Mobile-Reihenfolge: kleines Eyebrow → H1 (kompakter, max. 2 Zeilen, kein `<br>` der bricht) → 1 Satz Subline → **2 große CTAs nebeneinander/gestapelt** (Bestand + WhatsApp statt Ankauf, weil Ankauf weiter unten teaserd).
- H1-Größe mobil: `text-[40px] leading-[0.95]` (verhindert Überlauf auf 360px).
- Bild: mobil unterhalb des Textblocks, max. 320px hoch, `object-cover`. Data-Panels (Available Units / Quality Score) auf mobil ausblenden — zu viel Detail.
- `mix-blend-luminosity` und `hover:opacity` auf Mobile entfernen (langsam, Touch hat kein Hover).
- Section-Padding mobil: `pt-24 pb-10` statt 28/16.

**Trust-Bar**
- 2 Spalten (statt 4) auf Mobile, Werte kompakt.

**Highlights/Inventory**
- Mobil: 1-spaltig (statt 2-spaltig durch `sm:grid-cols-2`), damit Karten groß und lesbar bleiben.
- Featured-Auswahl auf 3 Fahrzeuge begrenzt + sichtbarer „Alle Fahrzeuge"-Button.

**Sektion-Padding global**: alle Home-Sektionen mobil von `py-24/py-32/py-40` auf `py-14/py-16` reduzieren — kürzere Scrolldistanz, weniger gefühlte Wartezeit.

**FAQ/Why-AK/SellCar**
- Schriftgrößen mobil ein Schritt kleiner (z.B. `text-3xl` statt `text-4xl/text-6xl`), damit nichts abschneidet.
- CTA-Buttons mindestens 48px hoch, volle Breite mobil.

## 3. Fahrzeugbestand (`routes/fahrzeuge.tsx`)

- Header-Sektion mobil kompakter (`pt-8 pb-6`), H1 `text-4xl`.
- Top-Bar: Filter-Button + Treffer-Anzahl + Sortierung als 2-Zeilen-Layout mobil (Filter+Treffer oben, Sortierung unten), beide Controls min. 44px hoch.
- Grid mobil **1-spaltig** (`grid-cols-1`, ab `sm` 2-spaltig) — Karten werden vollformatig lesbar.
- Slide-Panel:
  - Header sticky innerhalb des Panels.
  - „Schließen"-Button als großes X (44×44) oben rechts.
  - Footer-Button mit Safe-Area-Padding.
  - Panel deckt 100% Breite (statt `max-w-md`) auf Geräten < 420px.

## 4. Fahrzeugkarte (`VehicleCard.tsx`)

- `aspect-video` zu `aspect-[4/3]` auf Mobile — mehr Bildhöhe.
- `grayscale` auf Mobile **entfernen** (echte Farbe verkauft besser; Hover-Color-Reveal funktioniert auf Touch nicht).
- Titel min. `text-base`, Preis prominent als zweite Zeile rechts ausgerichtet (eigene Zeile auf 360px, damit nichts umbricht).
- Spec-Grid: 2×2, jede Zelle min. 44px hoch, Werte `text-sm` statt `text-xs`.
- CTA-Pille „Datenblatt öffnen" auf Mobile als klare Champagne-Border statt Hover-Effekt.
- `loading="lazy"` bleibt; `decoding="async"` ergänzen; `fetchpriority="high"` für die ersten 3 Karten in Featured.

## 5. Fahrzeug-Detail (`routes/fahrzeuge.$id.tsx`)

- Mobile-Reihenfolge anpassen: Galerie → Preis-Block (aus Sidebar nach oben hochgezogen) → Titel/Specs → CTAs als Vollbreite-Buttons → Beschreibung → Ausstattung → Anfrageformular → ähnliche Fahrzeuge.
- Preis-Karte mobil als eigene Sektion direkt unter der Galerie, nicht erst nach Specs.
- Alle CTA-Buttons mobil min. 52px hoch, `font-size 12px`, ausreichend Tap-Spacing (≥12px Gap).
- Sticky Bottom-Bar erweitern auf **3 Spalten**: Anrufen / WhatsApp / Anfrage (Anchor zum Formular) — derzeit nur 2.
- Modals (Probefahrt/Rückruf): mobil als Bottom-Sheet (slide-up von unten, full-width, Header sticky, Safe-Area-Footer). Schließen-Button 44×44.

## 6. Formulare (`components/forms/*`, `primitives.tsx`)

- Alle Inputs min. 48px Höhe, `text-base` (verhindert iOS-Auto-Zoom bei Fokus).
- `inputMode` + `autoComplete` korrekt setzen: `tel` für Telefon, `email` für E-Mail, `numeric` für Anzahlung/Rate/Laufzeit.
- Submit-Buttons mobil full-width, min. 52px, primär Champagne.
- Radio-Chips (Kontaktwunsch) mobil als 3 gleich breite Buttons in einer Zeile, Touch-Target 44px.
- Fehlermeldungen direkt unter dem Feld, rot/lesbar, nicht als Toast.
- DSGVO-Checkbox mit größerer Klickfläche (`label` umfasst Checkbox + Text).
- Erfolgs-State: scrollt automatisch in den Viewport.

## 7. Andere Seiten (`finanzierung`, `auto-verkaufen`, `kontakt`, `probefahrt`, `rueckruf`, `leistungen`, `ueber-uns`)

- Einheitliche mobile Section-Paddings (`py-14`), H1 `text-4xl`, H2 `text-2xl`.
- Jede Seite: Telefon + WhatsApp-CTA als Vertrauensbalken direkt unter dem Hero.
- Formularseiten: Formular sofort sichtbar (kein langer Intro-Block davor) — wichtigsten Trust-Block links daneben/darüber kürzen.

## 8. Performance & Bilder

- Hero-Bild: `width/height` setzen (bereits OK), zusätzlich `decoding="async"`.
- Galerie-Thumbnails: `loading="lazy"`, `decoding="async"`.
- `transition-all duration-1000` / `duration-700` auf Mobile durch `duration-200` ersetzen oder via `motion-reduce:transition-none` — wirkt schneller, kein „Laggy"-Gefühl.
- `backdrop-blur-xl` auf Mobile zu `backdrop-blur-md` reduzieren (GPU-günstiger auf Low-End).
- `grain`-Overlay auf Mobile deaktivieren (CSS Hintergrund).

## 9. Tap-Target & Typografie Audit

- Globale CSS-Regel in `styles.css`: alle `a, button` min. `min-h-[44px]` standard via Utility-Klasse `.tap` (anwenden wo nötig statt überall).
- Kicker/Mono-Labels mobil nicht kleiner als 10px, sonst unleserlich.
- Body-Text mobil min. `text-base` (16px) für Lesbarkeit.
- Niemals `whitespace-nowrap` ohne `truncate` — bricht aktuell den Preis ab.

## Out of Scope
- Keine Backend-Änderungen, keine echten Bild-Uploads, keine Service-Worker/PWA.
- Keine Logikänderungen an Filter-/Sortier-Mechanik, nur Layout/UX.
- Desktop bleibt visuell wie heute.

## Technische Datei-Liste
- Edit: `src/components/site/MobileStickyBar.tsx`, `Header.tsx`, `SiteLayout.tsx`, `VehicleCard.tsx`, `Modal.tsx`, `StickyWhatsAppFab.tsx`, `VehicleFilters.tsx`, `VehicleGallery.tsx`
- Edit: `src/components/forms/primitives.tsx` und alle 5 Form-Komponenten
- Edit: `src/routes/index.tsx`, `fahrzeuge.tsx`, `fahrzeuge.$id.tsx`, `finanzierung.tsx`, `auto-verkaufen.tsx`, `kontakt.tsx`, `probefahrt.tsx`, `rueckruf.tsx`, `leistungen.tsx`, `ueber-uns.tsx`
- Edit: `src/styles.css` (Safe-Area-Utility, `.tap`, motion-reduce Defaults)
