## Autohaus AK GmbH — Premium-Konzept & Build-Plan

Zwei Teile: **A) Strategisches Konzept** (alle 14 Punkte) und **B) konkreter technischer Build-Plan** für die Umsetzung.

---

## TEIL A — STRATEGISCHES KONZEPT

### 1. Markenpositionierung
"Champions-Autohaus in Velbert" — kein Massen-Händler, sondern eine kuratierte Premium-Plattform. Werte: **Disziplin, Vertrauen, Leistung, Qualität.** Der Kunde kauft nicht "ein Auto", sondern ein Fahrzeug, das von einem Team mit Champion-Mentalität ausgewählt, geprüft und übergeben wurde. Zielgruppe: Käufer 30–60 Jahre, die Wert auf Seriosität, persönliche Beratung und gepflegte Premium-/Mittelklasse-Fahrzeuge legen.

### 2. Claim-Ideen (zur Auswahl)
- **"Champions wählen mit Bedacht."** (Hero-Claim, Favorit)
- "Fahrzeuge auf Champions-Niveau."
- "AK — Autos mit Charakter."
- "Geprüft. Gepflegt. AK."
- Unter-Claim: *"Autohaus AK GmbH — Velbert"*

### 3. Designrichtung
- **Stil:** Editorial, monochrom, viel Whitespace — Look einer Premium-Marken-Website (Porsche / Aston Martin / Hublot), nicht eines klassischen Händlers.
- **Farben:** Tiefes Anthrazit/Schwarz (`#0B0B0C`), Off-White (`#F5F4F1`), ein einziger Champion-Akzent in gedecktem Gold/Champagner (`#B89968`). Keine Neon-, keine Boxhandschuh-Rot-Akzente.
- **Typografie:** Display-Serif für Headlines (z.B. *Instrument Serif* / *Fraunces*) + cleaner Sans (*Inter* / *Manrope*) für UI/Body. Große, ruhige Headlines.
- **Bildsprache:** Studio-Fahrzeugaufnahmen vor dunklem Hintergrund, Detail-Shots (Felge, Logo, Innenraum), körnige Schwarzweiß-Portraits vom Team. **Kein Stockfoto-Look.**
- **Motion:** Sehr dezent — Fade-Ins, langsame Image-Reveals, kein Bouncing/keine "WOW"-Effekte.

### 4. Seitenstruktur (Routes)
```
/                     Startseite
/fahrzeuge            Fahrzeugbestand (Filter, Grid)
/fahrzeuge/:id        Fahrzeug-Detail (Galerie, Specs, Anfrage)
/ueber-uns            AK-Story, Werte, Agit-Kabayel-Bezug
/leistungen           Ankauf, Finanzierung, Inzahlungnahme, Garantie
/kontakt              Standort Velbert, Öffnungszeiten, Karte, Formular
/impressum, /datenschutz
/admin                geschützter Bereich für Fahrzeugpflege (später)
```

### 5. Startseiten-Aufbau (Sektionen von oben nach unten)
1. **Hero** — Großes Standbild eines Fahrzeugs in Studio-Optik, Claim "Champions wählen mit Bedacht.", Sub: "Geprüfte Premium-Fahrzeuge aus Velbert.", CTA "Fahrzeuge ansehen" + "Termin vereinbaren".
2. **Aktuelle Highlights** — 3–4 ausgewählte Fahrzeuge (große Cards, editorial).
3. **Warum AK** — 3 Säulen: *Geprüft. Gepflegt. Persönlich.* (kurze Statements, keine Floskeln).
4. **Marken-Statement** — Volle Breite, dunkel: kurzer Absatz zu Werten + dezenter Hinweis auf die AK-Markenwelt (siehe Punkt 12).
5. **Leistungen** — 4 Tiles: Verkauf, Ankauf, Finanzierung, Inzahlungnahme.
6. **Kundenstimmen** — 2–3 echte Bewertungen (Google), zurückhaltend gesetzt.
7. **Standort & Kontakt** — Karte Velbert, Öffnungszeiten, Telefon, WhatsApp, Anfrageformular.
8. **Footer** — rechtliche Links, Social, Impressum.

### 6. Mobile-First-Strategie
- Single-column Hero, Claim bleibt groß und ruhig.
- Sticky Bottom-Bar mit **"Anrufen"** + **"WhatsApp"** auf allen Fahrzeug-Detailseiten (Conversion-Booster #1 mobil).
- Tap-Targets ≥ 48px, Filter als Bottom-Sheet, Bilder lazy-loaded und auf Format optimiert.
- Performance-Ziel: LCP < 2,5 s auf 4G, keine schweren Animationen mobil.

### 7. Conversion-Strategie
- **Primärer Lead-Pfad:** Fahrzeug-Detail → "Unverbindlich anfragen" (3-Feld-Formular: Name, Telefon, Nachricht) **oder** "WhatsApp-Anfrage" mit vorausgefülltem Text inkl. Fahrzeug-ID.
- **Sekundär:** "Probefahrt vereinbaren", "Finanzierungsrate berechnen" (einfacher Slider, kein Bank-Antrag).
- **Trust-Signale:** Garantie-Hinweis, Inzahlungnahme-Versprechen, echte Team-Fotos, Google-Bewertungen, Adresse + Telefon im Header sichtbar.
- **Reibung minimieren:** Keine Pflicht-E-Mail, kein Captcha im ersten Schritt, kein Pop-up-Newsletter.

### 8. Fahrzeugbestand-System (Architektur)
- **Datenmodell** (`vehicles`-Tabelle in Lovable Cloud):
  `id, mobile_ad_id, title, make, model, year, mileage_km, price_eur, fuel, transmission, power_kw, first_registration, exterior_color, interior, features[], description, images[], status (active/sold/reserved), source ('mobile_de'|'manual'), source_url, created_at, updated_at`
- **Storage** für eigene Bilder; bei mobile.de-Sync werden Bild-URLs gespiegelt.
- **Frontend:** Filter (Marke, Preis-Range, KM, Baujahr, Kraftstoff), Sortierung, Pagination, Detail-Galerie mit Lightbox.
- **Admin-UI** (`/admin`, geschützt): Liste, neu anlegen, bearbeiten, Bilder-Upload, "verkauft markieren", Sync-Button.

### 9. mobile.de Import-/Sync-Strategie
Drei Stufen, gestaffelt nach Aufwand und mobile.de-Konto:

| Stufe | Lösung | Aufwand | Voraussetzung |
|---|---|---|---|
| **1 — Manuell (sofort nutzbar)** | Admin-Form: mobile.de-Link einfügen → Server-Funktion holt Titel/Preis/Bilder per HTML-Scrape und legt Fahrzeug an. Bearbeitbar danach. | Niedrig | Keine |
| **2 — Bulk-CSV/XML-Import** | Upload einer Bestandsdatei (mobile.de bietet Händlern Exporte). Parser legt/aktualisiert Fahrzeuge per `mobile_ad_id`. | Mittel | mobile.de Händler-Account mit Export-Recht |
| **3 — Vollautomatischer Sync** | Cron (z.B. alle 6 h) ruft mobile.de **Seller API** ab, synchronisiert Bestand inkl. Status (neu/geändert/verkauft). | Hoch | Freischaltung der Seller-API durch mobile.de (Vertrag nötig) |

**Empfehlung:** Stufe 1 + 2 sofort bauen. Stufe 3 vorbereiten (Schnittstelle modular), aktivieren sobald API-Zugang vorliegt. Status: aus AK-Sicht **klären, ob ein Händler-Account mit Export besteht** — das entscheidet, ob Stufe 2/3 sofort möglich ist.

### 10. Lead-System
- Jede Anfrage → Insert in `leads`-Tabelle (`id, vehicle_id, name, phone, email?, message, channel, created_at, status`) + Sofort-Mail an AK + optional WhatsApp-Weiterleitung.
- Admin-Inbox unter `/admin/leads`: Status (neu/in Bearbeitung/abgeschlossen), Notizfeld.
- Honeypot + Rate-Limit gegen Spam, kein lautes Captcha.
- Später: Export als CSV, Anbindung an CRM/Mail-Tool möglich.

### 11. SEO-Strategie
- Eigene Routes mit eigenem `head()` pro Seite (Title, Description, OG).
- **Lokale Keywords:** "Autohaus Velbert", "Gebrauchtwagen Velbert", "[Marke] kaufen Velbert", "Inzahlungnahme Velbert".
- **JSON-LD:** `AutoDealer` auf der Startseite (Adresse, Öffnungszeiten, Telefon), `Vehicle` / `Product` auf jeder Fahrzeug-Detailseite (Marke, Modell, Preis, KM, Baujahr).
- **Sitemap.xml** dynamisch aus Fahrzeugbestand generiert; `robots.txt` sauber.
- **Google Business Profil** verlinken, Bewertungen einholen.
- Bild-`alt`-Texte mit Modell + Baujahr, semantisches HTML, eine H1 pro Seite.

### 12. Der Agit-Kabayel-Faktor (edel & seriös)
**Prinzip: Werte zeigen, nicht Person plakatieren.** Kein Boxhandschuh-Logo, keine Ring-Fotos im Hero.
- **Tonalität:** Sätze wie *"Mit der Disziplin eines Champions ausgewählt."* — Werte, kein Personenkult.
- **Eine** dezente Sektion auf `/ueber-uns`: körniges Schwarzweiß-Portrait, kurzer Absatz: *"Die Marke AK steht für Leistung auf höchstem Niveau — auf dem Ring wie in unserem Autohaus."*
- Akzentfarbe (Champagner-Gold) als visuelle Klammer zur AK-Markenwelt.
- Eventuell ein kleines **AK-Monogramm** als Markenzeichen (typografisch, kein Boxer-Icon).
- **Bewusst NICHT:** Kampfposen im Hero, "Knockout-Preise", Boxring-Hintergründe, rote Akzente.

### 13. Starttexte (Vorschlag — final mit AK abstimmen)
- **Hero-Headline:** *"Champions wählen mit Bedacht."*
- **Hero-Sub:** *"Geprüfte Premium- und Gebrauchtfahrzeuge aus Velbert. Persönlich ausgewählt, sorgfältig aufbereitet, ehrlich verkauft."*
- **Warum AK — 3 Säulen:**
  - **Geprüft.** *"Jedes Fahrzeug durchläuft eine eigene Eingangsprüfung, bevor es bei uns steht."*
  - **Gepflegt.** *"Aufbereitung, Service und Dokumentation gehören zum Standard — nicht zum Extra."*
  - **Persönlich.** *"Sie sprechen mit Menschen, die ihre Fahrzeuge kennen. Keine Hotline, keine Weiterleitung."*
- **Marken-Statement (dunkle Sektion):** *"Autohaus AK GmbH steht für die Werte einer Marke, die Disziplin, Qualität und Verantwortung lebt. Wir verkaufen keine Stückzahl — wir verkaufen Vertrauen."*
- **Standort-Block:** *"Sie finden uns in Velbert. Kommen Sie vorbei, machen Sie eine Probefahrt — oder schreiben Sie uns kurz per WhatsApp."*

### 14. Warum eigene Website > nur Händlerportale
- **Markenaufbau:** mobile.de zeigt Fahrzeuge — eine eigene Website zeigt eine **Marke**. Wiedererkennung, Empfehlung, Direktbesuche.
- **Niedrigere Lead-Kosten:** Keine Pay-per-Lead-Gebühren bei direkten Anfragen.
- **Datenhoheit:** Kundendaten gehören AK, nicht dem Portal — Basis für Newsletter, Folgekäufe, CRM.
- **Vertrauen:** Eigene Domain, eigene Bewertungen, eigene Geschichte. Käufer recherchieren Händler vor dem Kauf — die Website ist das Vertrauenssignal.
- **Conversion:** Klare, eigene Anfragepfade (WhatsApp, Telefon, Formular) ohne Portal-Reibung.
- **Unabhängigkeit:** Portal kann morgen Preise erhöhen oder Account sperren — die eigene Website bleibt.
- **SEO-Sichtbarkeit:** Lokale Suchen ("Autohaus Velbert") führen direkt zu AK, nicht zur Konkurrenz im Portal.
- Portale bleiben als **Reichweiten-Kanal**, nicht als alleinige Verkaufsplattform.

---

## TEIL B — TECHNISCHER BUILD-PLAN

### Phase 1 — Frontend-Foundation (jetzt, ohne Backend)
- Design-Tokens in `src/styles.css`: Farben (Anthrazit/Off-White/Champagner), Serif+Sans-Pairing, Spacing, Radius.
- Layout-Komponenten: `Header` (mit Telefon + WhatsApp), `Footer`, `Container`.
- Routes anlegen: `/`, `/fahrzeuge`, `/fahrzeuge/$id`, `/ueber-uns`, `/leistungen`, `/kontakt`, `/impressum`, `/datenschutz` — jede mit eigenem `head()`.
- Startseite mit allen Sektionen aus Punkt 5, **mit Demo-Daten** (statische Fahrzeug-Mock-Liste).
- Mobile sticky CTA-Bar auf Fahrzeug-Detail.
- SEO: JSON-LD `AutoDealer` auf `/`, `Vehicle` auf Detail (vorerst mit Mock-Daten).

### Phase 2 — Lovable Cloud + Fahrzeugbestand
- Lovable Cloud aktivieren → Tabellen `vehicles`, `leads`, `user_roles` (admin-Rolle).
- RLS: `vehicles` öffentlich lesbar (status=active), Schreibrechte nur für Rolle `admin`. `leads` öffentlich insert, lesen nur admin.
- Admin-Login + `/admin` (geschützt) mit CRUD + Bild-Upload.
- Fahrzeuge auf `/fahrzeuge` und `/fahrzeuge/$id` aus DB.

### Phase 3 — mobile.de Import (Stufe 1 + 2)
- Server-Funktion "Import per Link": URL → Scrape → vorausgefülltes Anlage-Formular.
- Server-Funktion "CSV/XML-Upload": Bulk-Parser, upsert per `mobile_ad_id`.
- Sync-Button im Admin, Log-Tabelle.

### Phase 4 — Lead-System & Polish
- Anfrage-Formular auf Detail + WhatsApp-Deep-Link mit vorausgefülltem Text.
- E-Mail-Benachrichtigung an AK (Resend o.ä.).
- `/admin/leads`-Inbox.
- Performance-Pass, finale Bilder, Texte mit AK abstimmen.

### Phase 5 — Optional / später
- mobile.de Seller-API (Stufe 3) — sobald Vertrag vorliegt.
- Google Reviews live einbinden.
- Finanzierungs-Rechner-Erweiterung.

---

## OFFENE FRAGEN AN DICH (vor Phase 2 wichtig)

1. **Logo/Wortmarke:** Gibt es ein bestehendes Logo für "Autohaus AK GmbH", oder soll ich ein typografisches Monogramm vorschlagen?
2. **Adresse & Kontakt:** Konkrete Adresse in Velbert, Telefonnummer, WhatsApp-Nummer, Öffnungszeiten — vorhanden oder mit Platzhaltern starten?
3. **mobile.de-Account:** Existiert ein Händler-Account mit Export-/API-Zugang? (Entscheidet, ob Stufe 2/3 sofort gehen.)
4. **Bilder/Fotos:** Vorhandenes Bildmaterial (Fahrzeuge, Team, Standort) — oder vorerst KI-generierte Platzhalter im richtigen Look?
5. **Claim:** "Champions wählen mit Bedacht." — passt das, oder soll ich Alternativen liefern?
6. **Start-Scope:** Soll ich direkt mit **Phase 1 (Frontend + Mock-Daten)** loslegen, oder zuerst Cloud aktivieren und Tabellen anlegen?

Sobald Phase 1 freigegeben ist und du auf die offenen Punkte antwortest (zumindest #5 + #6), gehe ich los.