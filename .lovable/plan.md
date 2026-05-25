
# Umsetzung — Premium-Upgrade auf Nummer-1-Niveau

Fokus auf alles, was ohne externe Daten (echte Stammdaten/Fotos) machbar ist. Keine Vermischung mit Backend-Setup — das bleibt separater Schritt.

## 1. Header & Navigation
- Logo-Mark redesignen: monogramm „AK" mit feinem Champagne-Underline statt zwei kollidierender Labels.
- Sticky-Header bekommt subtilen Glas-Effekt + dünne Trennlinie nur nach Scroll.
- Aktive Route mit Champagne-Underline (statt nur Farbe).
- Mobile Menü: Full-Screen-Overlay mit großer Typo + Sekundär-Block (Telefon/WhatsApp/Adresse) unten.
- Telefonnummer mit Icon im Header ab `xl`.

## 2. Hero
- Hintergrund: dunkler Verlauf (`bg-ink` → `bg-paper`) statt flach grün → cineastischer.
- H1-Kontrast erhöhen (text-paper auf dunklem Bereich), Champagne-Akzent bleibt.
- Neue Sub-Reassurance-Zeile mit 3 Inline-Trust-Punkten („Eingangsprüfung · 12 Monate Garantie · Finanzierung möglich") mit Mini-Icons.
- Daten-Panels (Available Units / Quality Score) durch echte Differenzierung ersetzen: „Bestand · Ø Lieferzeit · Bewertung".
- Smooth Parallax (subtil, nur Desktop, prefers-reduced-motion respektiert).
- CTAs hierarchisch: primär „Bestand ansehen" solid Champagne, sekundär „Fahrzeug verkaufen" Outline.

## 3. Fahrzeugkarten
- Bereits letzte Iteration: Highlight-Chips + Monatsrate.
- Zusätzlich: Hover-Reveal mit „Details ansehen →" Bar, Preis-Hierarchie sauberer (Preis groß, Rate dezent darunter).
- „Neu im Bestand"-Badge für Fahrzeuge < 14 Tage.
- Bild mit `aspect-[16/10]` einheitlich, object-position für bessere Komposition.
- Skeleton-Loader-Stil für leere Slots.

## 4. Fahrzeug-Detailseite
- CTA-Hierarchie: ein dominanter Primär-Button („Probefahrt buchen"), zwei sekundäre (Call/WhatsApp) kleiner.
- Sticky-CTA-Bar am unteren Bildschirmrand (Desktop seitlich, Mobile bottom) mit Preis + Rate + Primär-CTA.
- Galerie mit Vollbild-Lightbox (Klick auf Hauptbild), Tastatur-Navigation, Thumbnail-Strip.
- „Highlights"-Block oberhalb der Tech-Daten mit Icons.
- Redaktioneller „Über dieses Fahrzeug"-Absatz (dynamisch generiert aus Marke/Modell/Features).
- Finanzierungs-Box mit Rate, Laufzeit-Slider (3/4/5/7 Jahre) und „Anfrage senden" Pre-Fill.

## 5. Formulare
- Floating-Label-Stil statt Top-Labels (sauberer Premium-Look).
- Inline-Validierung mit ruhigen Microcopy-Hinweisen (kein rotes Schreien).
- Multi-Step für Probefahrt/Ankauf (2–3 Schritte) mit Fortschrittsbalken.
- Submit-State: animierter Loading-Indikator + Success-Karte mit klarem nächsten Schritt.
- Honeypot + zeitbasierter Spamschutz.

## 6. Trust
- Neue „Trust-Stack"-Sektion auf Home: 4 Säulen mit Icons (Eingangsprüfung, Garantie, Finanzierung, persönliche Übergabe) statt Text-only.
- Testimonial-Block aufwerten: 3 Karten mit Initial-Avatar + Standort + Sterne, Schema.org Review (auch wenn Beispieldaten — mit `aria-label="Beispielbewertung"` gekennzeichnet, damit nicht irreführend).
- „Ihr Ansprechpartner"-Karte mit Platzhalter-Bild + Direkt-Kontakt (Telefon/WhatsApp/Mail).
- Garantie/Zertifikat-Strip („TÜV-geprüft · 12 Monate Gewährleistung · DAT-bewertet") in monochromem Logo-Stil.

## 7. Texte (Feinschliff)
- Hero alternative final wählen: „Geprüfte Fahrzeuge. Persönlich übergeben." (kürzer, härter).
- FAQ um 3 echte Sorgen ergänzen (Mängel nach Übergabe, TÜV-Kosten, Lieferradius).
- Detailseite: redaktionelle Vorlage pro Fahrzeug.
- Microcopy in Formularen (z. B. „Antwort meist innerhalb von 60 Min").

## 8. SEO
- Pro Route saubere H1/H2-Hierarchie prüfen, doppelte H1 entfernen.
- `og:image` pro Hauptroute (relativ zur Domain, später absolute URL via `getRequestOrigin`).
- `Article` Schema vorbereiten (für späteren Blog) — Infrastruktur via `head()` Helper.
- `Service` Schema für `/auto-verkaufen` und `/finanzierung`.
- `AggregateRating` mit Beispieldaten **NICHT** ausspielen (Google-Strafe-Risiko bei Fake). Stattdessen Platzhalter-Hook, der erst aktiv wird wenn echte Bewertungen kommen.
- Sitemap mit `lastmod` ergänzen.

## 9. Geschwindigkeit
- `vite-imagetools` einbauen → Hero und Fahrzeugbilder als AVIF + WebP mit `<picture>` und `srcset`.
- LCP-Bild Preload via `head().links`.
- Google Fonts: lokale Variable-Fonts (Sora, Manrope) statt CDN-Link, `font-display: swap`.
- Grain-Overlay komplett raus (war ein Performance-Tax ohne Premium-Gewinn).
- Code-Split: schwerere Inseln (Finanzierungsrechner, Lightbox) lazy.

## 10. Animationen
- Globale Regel: Easing `[0.22, 0.61, 0.36, 1]`, Dauer 400–600 ms, keine Bounces.
- `prefers-reduced-motion: reduce` respektieren — alle dekorativen Anims aus.
- Scroll-reveal nur einmal pro Element (IntersectionObserver, dann unsubscribe).
- Kein paralleles Animieren mehrerer Layers (verhindert Jank auf mobil).

## 11. Footer
- Komplett-Redesign: 4-Spalten-Grid (Marke/Adresse · Bestand-Links · Service-Links · Rechtliches), oben „Bereit zur Probefahrt?"-CTA-Strip.
- Mini-Map-Snippet (statisches Bild, kein iframe — lädt nicht extern) mit Klick → Google Maps.
- Öffnungszeiten als Liste mit „Jetzt geöffnet/geschlossen"-Indikator (Client-side).
- Newsletter weglassen (für Autohaus selten relevant, würde DSGVO-Aufwand erzeugen).

## 12. Mobile (Feinschliff)
- Sticky Bottom-Bar bekommt Icon + Label statt nur Label, 4 gleich breite Slots.
- Tap-Targets durchgehend min. 48 px.
- Filter-Slide-Panel: „Anwenden"-CTA als Sticky-Footer im Panel.
- Hero-H1 ab 360 px sauber (testen, ggf. text-balance + manuelles `<wbr>`).
- Zurück-zum-Top-Button nach 600 px Scroll, dezent rechts unten (ersetzt FAB auf Mobile nicht).

## 13. Stilentscheidung
Premium-Brutalism beibehalten (harte Linien, Mono-Akzente), aber konsequenter: keine runden Buttons, keine Schatten ohne Zweck, Champagne nur für Akzent-Trigger (CTAs, aktive Zustände, Preise) — nicht für Body-Text.

---

## Was bewusst NICHT in dieser Runde

- **Lead-Backend** (Lovable Cloud + Resend) — separater Schritt, gibst du Freigabe?
- **Echte Stammdaten/Bilder** — brauche Input von dir.
- **Reservierung mit Stripe-Anzahlung** — P3.
- **Blog/Ratgeber-Inhalte** — Infrastruktur ja, Inhalte separat.
- **3D/360°-Modul** — P3.

## Reihenfolge der Umsetzung

1. Design-Foundation (Tokens, Animation-System, Reduced-Motion).
2. Header + Footer + Navigation.
3. Hero + Trust-Stack + Testimonials.
4. Fahrzeugkarten + Detailseite + Lightbox.
5. Formulare (Floating-Label, Multi-Step, Honeypot).
6. SEO-Feinschliff (H-Hierarchie, Service-Schema, Sitemap-lastmod).
7. Performance (vite-imagetools, Font-Self-Host, Preload).
8. Mobile-Feinschliff + QA-Screenshots Desktop/Tablet/Mobile.

Geschätzter Umfang: ca. 12–15 Dateien geändert, 2–3 neu (Lightbox, FloatingField, BackToTop).

Soll ich genau so loslegen, oder willst du etwas raus/dazu?
