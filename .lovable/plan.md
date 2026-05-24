
# Autohaus AK GmbH – Vollständiger Build-Plan

Aktueller Stand: Phase 1 (Frontend-Foundation, Design-Tokens, 5 Seiten mit Mock-Daten) ist fertig. Dieser Plan ergänzt **alle fehlenden Seiten, Funktionen, das mobile.de-Import-System und den Admin-Bereich** und hebt das Design auf das angeforderte Champion/Premium-Niveau.

---

## 1. Design-Upgrade (vor allem Anderen)

Aktuell: Editorial (off-white, Serif, hell). User will: **dunkler Premium-Look**.

Umbau in `src/styles.css`:
- Dark-Mode als Default: `--background` ≈ `#0A0A0B` (Schwarz), `--surface` Anthrazit `#141416`, `--foreground` Off-white `#F5F4F1`
- Akzente: Champagner-Gold `#C9A14A` (primär), tiefes Grün `#1F3A2E` (sekundär, dezent)
- Glassmorphism-Utility: `bg-white/5 backdrop-blur-xl border border-white/10`
- Premium-Cards mit feinen Gold-Linien (`border-[hsl(var(--accent))]/20`)
- Headlines: bleibt Instrument Serif (groß, tight tracking), UI bleibt Inter
- Smooth Animationen via Tailwind `transition-*` + bestehendes `tw-animate-css`
- Subtile Gold-Gradient-Hairlines als Trenner statt harter Borders

Neue Shared-Komponenten:
- `GlassCard`, `GoldDivider`, `SectionHeader`, `StatBadge`, `TrustBar`
- `MobileStickyBar` (fixed bottom, 4 Aktionen: Fahrzeuge / Anrufen / WhatsApp / Anfrage)

---

## 2. Seitenstruktur (9 Routen)

| Route | Status | Inhalt |
|---|---|---|
| `/` | umbauen | Premium-Hero, Trust-Bar, Story, Highlight-Fahrzeuge, Bestand-Teaser, Ankauf-Teaser, Finanzierung-Teaser, "Warum AK", Bewertungen, FAQ, Kontakt-CTA |
| `/fahrzeuge` | vorhanden, polieren | Filter (Marke, Preis, KM, Jahr, Kraftstoff, Getriebe), Sortierung, Grid mit GlassCards |
| `/fahrzeuge/$id` | vorhanden, polieren | Galerie, Specs, Features, Anfrage-/WhatsApp-/Finanzierungs-CTA, ähnliche Fahrzeuge |
| `/auto-verkaufen` | **neu** | Ankauf-Formular (Marke, Modell, EZ, KM, Zustand, Fotos-Upload, Kontakt) |
| `/finanzierung` | **neu** | Rechner (Kaufpreis, Anzahlung, Laufzeit, Zins-Indikation), Finanzierungsanfrage-Formular |
| `/ueber-uns` | vorhanden, polieren | Story Champion-Mentalität, Werte, Team-Andeutung, Standort |
| `/kontakt` | vorhanden, polieren | Formular, Karte, Öffnungszeiten, Direktkontakte |
| `/impressum` | vorhanden | Platzhalter bis Realdaten |
| `/datenschutz` | vorhanden | Standardtext |
| `/admin` + `/admin/fahrzeuge` + `/admin/leads` + `/admin/import` | **neu** | Login, CRUD, Lead-Inbox, mobile.de-Import |

Jede Route mit eigenem `head()` (Title, Description, OG).

---

## 3. Fahrzeug-System (Cloud)

Lovable Cloud aktivieren. Tabellen:

```text
vehicles
  id, mobile_ad_id (nullable, unique), title, make, model, variant,
  year, first_registration (date), mileage_km, price_eur, vat_reportable,
  fuel, transmission, power_kw, power_ps, exterior_color, interior,
  body_type, doors, seats, features (text[]), description (text),
  images (text[]),  -- public URLs
  status ('available'|'reserved'|'sold'|'draft'),
  source ('manual'|'csv'|'xml'|'mobile_api'),
  is_highlight (bool),
  created_at, updated_at

leads
  id, vehicle_id (nullable FK), type ('inquiry'|'sellcar'|'financing'|'callback'|'contact'),
  name, phone, email, message, payload (jsonb), channel ('form'|'whatsapp'),
  status ('new'|'open'|'won'|'lost'), created_at

user_roles  (siehe Knowledge: Rollen NIE auf profiles)
  id, user_id (FK auth.users), role (enum 'admin'|'editor')

has_role(uuid, app_role) SECURITY DEFINER  -- für RLS
```

Storage-Bucket `vehicles` (public read) für Bilder + `sellcar` (private) für Ankauf-Uploads.

### RLS
- `vehicles`: public SELECT wo `status='available'`; admin alles via `has_role`
- `leads`: public INSERT (mit Validierung + Honeypot + Rate-Limit serverseitig); SELECT nur admin
- `user_roles`: nur admin SELECT/INSERT

### Server Functions (`createServerFn`)
- `listVehicles`, `getVehicle(id)` – public
- `createLead`, `createSellCarLead`, `createFinancingLead` – public, Zod-validiert
- `adminUpsertVehicle`, `adminDeleteVehicle`, `adminListLeads` – via `requireSupabaseAuth` + `has_role('admin')`
- `importMobileDeXml(file)`, `importVehiclesCsv(file)` – admin

---

## 4. mobile.de-Anbindung (3 Stufen)

Da direkter API-Zugang einen mobile.de-Händlervertrag voraussetzt, bauen wir **alle drei Wege**, sodass jeder genutzt werden kann sobald verfügbar:

1. **Manuell** – Admin-CRUD mit Multi-Image-Upload (sofort nutzbar).
2. **CSV/XML-Bulk-Import** – Upload im Admin, Parser mappt mobile.de-Felder (`make`, `model`, `mileage`, `price`, `firstRegistration` etc.) auf unser Schema. Bilder werden per URL importiert und nach Storage gespiegelt. Re-Import via `mobile_ad_id` als Upsert-Key.
3. **API-Stub** – Server-Function `syncMobileDeApi()` mit Auth-Header-Platzhalter und ENV `MOBILE_DE_USER` / `MOBILE_DE_PASS`. Aktiviert sobald Zugangsdaten vorhanden.

---

## 5. Formulare & Leads

Alle Formulare:
- Zod-Validierung (client + server), Honeypot-Feld, Längenlimits
- Bei Erfolg: Lead in `leads`, Toast, optional WhatsApp-Deeplink mit vorausgefülltem Text
- WhatsApp-Deeplink-Helper: `https://wa.me/<num>?text=<encoded>` mit Fahrzeug-Kontext

Formulare:
- Fahrzeug-Anfrage (Detailseite)
- Ankauf (mit Foto-Upload)
- Finanzierungsanfrage
- Rückruf
- Allgemeines Kontaktformular

Mobile Sticky Bar global aktiv auf `/fahrzeuge` und `/fahrzeuge/$id`.

---

## 6. Admin-Bereich

- `/login` – Email+Passwort (Supabase Auth, `onAuthStateChange` korrekt verdrahtet)
- `_authenticated` Layout-Route prüft Session + `has_role('admin')`
- `/admin` Dashboard (Counts: Fahrzeuge, neue Leads)
- `/admin/fahrzeuge` Liste + Create/Edit-Drawer (alle Felder, Bild-Upload, Highlight-Flag, Status)
- `/admin/leads` Inbox mit Filter nach Typ/Status
- `/admin/import` CSV-/XML-Upload + Preview + Commit

---

## 7. SEO & Performance

- Pro Route eigenes `head()`; OG-Image nur auf Leaf-Routen
- JSON-LD: `AutoDealer` global, `Vehicle` auf Detailseite, `FAQPage` auf Startseite-FAQ
- `sitemap.xml` + `robots.txt` (relativ, da noch keine Domain)
- Bilder als JPG, lazy, responsive `sizes`

---

## 8. Build-Reihenfolge (Phasen)

1. **Design-Umbau auf Dark-Premium** (`styles.css`, Header/Footer, Hero, Cards) + Mobile Sticky Bar
2. **Startseite neu aufbauen** mit allen 11 Sektionen + Mock-Bewertungen + FAQ
3. **Neue Seiten**: `/auto-verkaufen`, `/finanzierung` (mit Rechner-UI, Mock-Berechnung)
4. **Cloud aktivieren** + Schema + RLS + Storage + `has_role`
5. **Server-Functions** + Lead-Formulare an Cloud anbinden
6. **Admin-Login + CRUD + Lead-Inbox**
7. **CSV/XML-Import + mobile.de-API-Stub**
8. **SEO-Feinschliff** (JSON-LD, sitemap, robots)

---

## 9. Offene Punkte (parallel klärbar, blockieren Build nicht)

Real-Daten werden später in `src/data/dealer.ts` ersetzt – Platzhalter bleiben bis dahin:
- Adresse, Telefon, WhatsApp-Nummer, Email, Öffnungszeiten
- Geschäftsführer, HRB, USt-IdNr.
- mobile.de Händler-Login (für Import-Stufe 2/3)
- Echte Fahrzeugbilder oder weiterhin KI-Studio-Bilder

Mit „Implement plan" starte ich Phase 1–8 durchgehend.
