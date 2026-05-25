
# Knallharter Audit — Autohaus AK GmbH

Bewertung wie eine Premium-Agentur (Awwwards/Brand-Niveau). Schulnoten 1 (sehr gut) bis 6.

## 1. Erster Eindruck — Note 2−

Stark: Hero-Typografie hat Charakter, Champagne-Akzent + Dark-Green wirken eigenständig. Nicht 08/15-Autohaus.
Schwach:
- **Header bricht im Desktop-Mid-Range (≈980–1100 px)**: „AUTOHAUS"-Label kollidiert mit „BESTAND", Telefonnummer umbricht zweizeilig mitten in der Navi. Sofort sichtbarer Layout-Bruch zerstört Premium-Anmutung.
- WhatsApp-FAB ist auf Tablets/kleinem Desktop sichtbar UND die Mobile Sticky-Bar greift erst < md → redundant am Übergang.
- Hero-Bild wirkt durch `mix-blend-luminosity` + 55 % opacity tot. Premium-Autohäuser zeigen Lack mit Reflexionen, kein verwaschenes Stockfoto.

## 2. Designqualität — Note 2

- Typografie-System (Sora/Manrope/JetBrains Mono) ist konsistent, Kicker-Pattern sauber.
- Farbsystem solide, aber: Champagne (`oklch(...)`) wird inflationär als Akzent benutzt — verliert Wirkung. Premium = Akzent sparsam.
- Detailseite arbeitet mit harten Linien (Web-1.0-Tabellen-Look). Wirkt eher „Tech-Brutalismus" als Luxus-Autohaus. Entscheidung treffen: Brutalist oder Luxury — aktuell Mischmasch.
- Keine echten Mikro-Interaktionen (kein Hover-Reveal auf Cards, keine Bildscale, kein Cursor-Detail).
- Grain-Overlay mobil deaktiviert (gut), Desktop teilweise zu körnig auf grünem Hintergrund → wirkt nach Kompressionsartefakt.

## 3. Mobile UX — Note 2+

- Bottom-Bar 4-Tap-Buttons ist sehr gut.
- 16 px Input-Font verhindert iOS-Zoom — gut.
- Probleme:
  - Hero-H1 mit `text-[40px]` immer noch knapp an Viewport-Rand bei kleinen Geräten (320 px).
  - Filter-Slide-Panel öffnet → kein klarer „Anwenden"-CTA sichtbar ohne Scrollen (zu prüfen).
  - Fahrzeugkarten 4:3 → bei vielen Karten viel Scroll. Lazy-Loading + Intersection-Observer für Hero-Bild ist da, aber kein `srcset`/responsive `sizes`.

## 4. Conversion — Note 2

Sehr gut: 5 Formulare, WhatsApp/Phone überall, Sticky Mobile Bar, Trust-Blöcke neben Formularen.
Lücken:
- **Keine Lead-Erfassung im Backend** — Forms simulieren Submit (`useLeadSubmit`). Ohne echten Endpunkt = 0 Conversions.
- Kein Exit-Intent, kein „letzte Anfrage vor 12 Min" Social-Proof.
- Finanzierungsrechner ohne direkten „Rate übernehmen → Anfrage" Pre-Fill war's mal — aktuell schickt er Werte, aber kein sichtbares „Diese Rate sichern" CTA neben dem Ergebnis.
- Detailseite: 3 Buttons (Call/WA/Probefahrt) konkurrieren. Hauptaktion sollte visuell dominieren.
- Keine Bewertungs-/Google-Sterne sichtbar → fehlt für „social proof".

## 5. Fahrzeugpräsentation — Note 3

- Galerie funktioniert, aber: keine Vollbild-Zoom-Lupe, keine 360°, keine Innenraum-Schnellnavigation.
- Karten zeigen Titel/EZ/km/Preis — solide. Aber: kein „Highlights"-Chip (z. B. „Standheizung · AHK · 360°-Kamera"), keine Finanzierungs-Rate auf der Karte.
- Premium-Portale (mobile.de, Auto1) zeigen Rate prominent — fehlt hier.
- Bilder sind Stockfotos? Konsistente Studio-Optik fehlt. Premium = einheitlicher Bildstil (gleicher Hintergrund/Lichtsetup).
- Kein Vergleichsmodus, kein Merkliste.

## 6. Vertrauen — Note 3−

- TrustBlock ist da, aber generisch (keine echten Zahlen, keine Logos).
- Keine echten Kundenstimmen mit Foto/Standort.
- Keine Google-Bewertung („4,9 ★ aus 312 Bewertungen") verlinkt.
- Inhaber-Story fehlt auf /ueber-uns mit Foto.
- Impressum-Platzhalter (`HRB 00000`) ist ein **Vertrauenskiller** — wenn live, sofort schließen.
- Keine Garantie-/Gewährleistungs-Siegel (z. B. „24 Monate Gebrauchtwagengarantie") visualisiert.
- WhatsApp-Nummer + Telefonnummer in `dealer.ts` sind Platzhalter — bei echtem Launch tot.

## 7. Texte — Note 2

- Tonalität konsistent „seriös-direkt", keine Marketing-Lyrik. Stark.
- Aber: viele Headlines klingen ähnlich („geprüft · ehrlich · fair") → wiederholtes Vokabular über alle Seiten.
- Detailseite hat fast keinen redaktionellen Text pro Fahrzeug — fehlt ein „Warum dieses Fahrzeug" Absatz pro Inserat (auch SEO-relevant).
- FAQs sind okay, könnten aber 2–3 echte Sorgen aufnehmen („Was passiert bei Mängeln nach Übergabe?", „TÜV-Kosten?").
- Keine lokalen Anker im Text („Anfahrt aus Essen 15 Min", „Stellplätze direkt vor der Tür").

## 8. SEO — Note 2

Bereits umgesetzt (letzte Iteration): AutoDealer/Vehicle/FAQPage/BreadcrumbList JSON-LD, saubere Meta-Titles ≤ 60, Descriptions ≤ 160, dynamische `sitemap.xml`, `robots.txt`.
Offen:
- **Keine echte Domain** → alle canonicals relativ, OG-Bilder ohne absolute URL → schlechte Social-Previews.
- Keine `Article`-Inhalte (Blog/Ratgeber) → Long-Tail-Keywords fehlen komplett („Was kostet eine Inzahlungnahme?", „BMW X5 vs. Audi Q7").
- Keine internen Hub-Links Marke→Modell (`/fahrzeuge/marke/bmw`).
- Bilder ohne `srcset`/AVIF → Core Web Vitals leiden, LCP hoch.
- Kein `hreflang` (irrelevant solange nur DE).
- Google Business Profile nicht verlinkt/eingebettet.

## 9. Geschwindigkeit — Note 3

- Google Fonts via CDN-Link blockiert Render (kein `font-display: swap` Override garantiert).
- Hero-Bild als `.jpg` ohne `srcset` → potenziell überdimensioniert auf Mobile.
- Keine sichtbare Optimierung der Fahrzeug-Galerien (Vorschaubilder = Original?).
- Kein Service-Worker / kein Preload außer Fonts.
- TanStack Start SSR + Vite ist solide Basis, aber Bilder = größter Hebel.
- Verdächtig: `oklch` + `mix-blend-luminosity` + Backdrop-Blur kosten auf älteren Androids.

## 10. Unterschied zu normalen Autohaus-Websites — Note 2+

Stärker als 90 % der DACH-Autohäuser:
- Eigenständige Designsprache (kein Bootstrap-Template).
- Saubere Forms statt mailto:.
- Mobile Bottom Bar.
- Strukturierte Daten.

Aber noch **nicht** wie Top-Player (Senger, AMG-Center, Tesla, Polestar):
- Keine Konfigurator-Anmutung.
- Keine cineastischen Hero-Videos.
- Kein Inventory-Streaming/Live-Status.
- Kein Online-Reservierungs-Flow mit Bezahlung.
- Keine Marken-eigene Bildwelt (Inhaber, Showroom, Team).

---

# Konkrete Verbesserungsliste (priorisiert)

## P0 — Blocker vor Launch (1–2 Tage)

1. Header-Layout fixen: Telefonnummer ab `lg` einblenden, ab `md` nur Icon; Navi-Spacing reduzieren oder Burger ab `lg` aktivieren.
2. WhatsApp-FAB nur ab `lg` zeigen (nicht `md`), Konflikt mit Bottom-Bar entschärfen.
3. `dealer.ts` Platzhalter ersetzen (Adresse, Telefon, WhatsApp, HRB, USt-ID) — sonst ist die Seite rechtlich und SEO-technisch unbrauchbar.
4. Echten Lead-Endpoint anschließen (Lovable Cloud Tabelle `leads` + Resend-E-Mail an Inhaber + Bestätigungs-Mail).
5. Echte Fahrzeugbilder + Studio-Look prüfen; sonst konsistenter Look-Filter.

## P1 — Premium-Aufwertung (3–5 Tage)

6. Bild-Pipeline: AVIF/WebP, `srcset`/`sizes`, Sharp-basiertes Resize (Cloudflare Images oder Server-Route).
7. Hero-Bild austauschen oder unbearbeitet zeigen — `mix-blend-luminosity` raus.
8. Fahrzeugkarte um Finanzierungs-Rate + 3 Highlight-Chips erweitern.
9. Detailseite: visuelle Hauptaktion definieren (CTA-Hierarchie), Vollbild-Galerie + Innenraum-Sprung, Redaktionstext pro Fahrzeug.
10. Merkzettel (localStorage) + Vergleichsleiste (2–3 Fahrzeuge).
11. Inhaber-Story + Team-Foto auf /ueber-uns, echte Bewertungen einbinden (Google Reviews API oder kuratierter Block).
12. Mikro-Interaktionen: Card-Hover-Reveal, Bild-Parallax light, Cursor-Polish.

## P2 — Inhalt & SEO-Tiefe (laufend)

13. Blog/Ratgeber starten: 8–12 Artikel rund um Gebrauchtwagenkauf, Finanzierung, Ankauf, Velbert-spezifisch. JSON-LD `Article`.
14. Marken-Hub-Seiten `/fahrzeuge/marke/$brand` mit kuratierten Modellen.
15. Google Business Profile einbetten + Bewertungen abrufen.
16. Long-Tail-Landingpages: „BMW gebraucht kaufen Velbert", „Mercedes Ankauf NRW".
17. Schema erweitern: `Review`, `AggregateRating`, `Service` für Ankauf/Finanzierung.
18. Domain registrieren → absolute OG-URLs, Sitemap-Direktive in robots.txt.

## P3 — Differenzierung Top-Tier (1–2 Wochen)

19. Cineastisches Showroom-Video als optionales Hero (mit Poster-Fallback).
20. „Reservieren mit 500 €" — Stripe-Anzahlung statt nur Anfrage.
21. Live-Bestandsstatus (Realtime via Lovable Cloud) — „Vor 4 Min angesehen von 3 Personen".
22. Konfigurator-Anmutung für Finanzierung (Step-by-Step, animierte Übergänge).
23. PWA + Offline-Fähigkeit für Bestandsliste, Push-Benachrichtigungen bei Preisänderung.
24. Eigenes 3D/360°-Modul für Top-Fahrzeuge.

---

## Tatsächliche Gesamtnote: **2+ (gut bis sehr gut)**

Bereits über dem Marktdurchschnitt. Für „Nummer 1 in NRW" fehlen: echte Inhalte (Bilder/Bewertungen/Stammdaten), eine Stilentscheidung (Brutalist vs. Luxury), Bild-Performance, Backend-Leads, redaktionelle Tiefe.

Soll ich nach Freigabe in der nächsten Iteration mit **P0** starten (Header-Fix, FAB, Lead-Backend) oder direkt mit **P1** (Bild-Pipeline + Detailseite-Upgrade)?
