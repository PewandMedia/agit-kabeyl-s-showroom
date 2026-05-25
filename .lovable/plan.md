
## Ziel

Aus dem aktuellen einfachen Bestand (5 Demo-Fahrzeuge, ein Bild pro Fahrzeug, nur Marken-Filter) wird ein vollständiges Bestands-System mit Galerie, Status-Logik, Filtern, Suche, Sortierung und einer hochwertigen Detailseite mit Anfrage-Formular.

Es bleibt rein Frontend (keine DB, keine Cloud) — Daten kommen aus `src/data/vehicles.ts`. Lovable Cloud-Anbindung (Admin/Import) ist eine separate Phase.

## 1. Datenmodell (`src/data/vehicles.ts`)

Typ `Vehicle` wird erweitert auf alle gewünschten Felder:

```ts
type VehicleStatus = "available" | "reserved" | "sold" | "new-arrival" | "highlight";

type Vehicle = {
  id: string;                 // z. B. "AK-2024-001"
  make: string;               // Marke
  model: string;              // Modell
  variant: string;            // Variante / Ausstattungslinie
  title: string;              // abgeleitet: `${make} ${model} ${variant}`
  priceEur: number;
  mileageKm: number;
  firstRegistration: string;  // "MM/YYYY"
  year: number;               // aus EZ abgeleitet
  fuel: "Benzin" | "Diesel" | "Hybrid" | "Elektro";
  transmission: "Automatik" | "Schaltgetriebe";
  powerKw: number;            // + abgeleitete PS
  exteriorColor: string;
  condition: "Neuwagen" | "Jahreswagen" | "Gebraucht" | "Vorführwagen";
  previousOwners: number;
  images: string[];           // Bildergalerie (mind. 3 pro Fahrzeug aus vorhandenen Assets rotiert)
  features: string[];         // Ausstattung
  description: string;
  financingAvailable: boolean;
  monthlyRateEur?: number;    // optionale Beispielrate
  status: VehicleStatus;
};
```

Hilfsfunktionen bleiben: `formatPrice`, `formatKm`, `formatKw`, `getVehicle`. Neu:
- `statusMeta(status)` → `{ label, tone }` (Tone für Badge-Farbe: champagne/emerald/muted/red)
- `featuredVehicles` = alle mit Status `highlight` oder `new-arrival`, fallback erste 3.

## 2. Demo-Bestand

10 hochwertige Demo-Fahrzeuge (Mercedes S/G/AMG GT, BMW M3/M4/X5M, Porsche 911/Cayenne, Audi RS5/RSQ8, Range Rover) mit unterschiedlichen Status (`highlight`, `new-arrival`, `available`, `reserved`, `sold`) und realistischen Daten. Bilder werden aus den vorhandenen Assets (`hero-car`, `car-1` … `car-4`) zu Galerien à 3–4 Bildern kombiniert.

## 3. Bestandsseite (`src/routes/fahrzeuge.tsx`)

Komplett überarbeitet:

**Filterleiste (Desktop sticky links/oben, Mobile als Slide-Panel):**
- Suche (freier Text über Titel, Marke, Modell, Variante)
- Marke (Multi-Select Chips)
- Preis (Range: min / max)
- Kilometerstand (Range: max)
- Baujahr (Range: min / max)
- Kraftstoff (Chips)
- Getriebe (Chips)
- Status (Chips)
- „Filter zurücksetzen"

**Sortierung:** Neueste · Preis ↑ · Preis ↓ · Kilometer ↑

**Mobile Filter-Slide-Panel:** Button „Filter (n)" öffnet ein vollflächiges Slide-Panel von rechts mit allen Filtern + großem „Ergebnisse anzeigen"-Button.

**Ergebnis-Grid:** Bestehende `VehicleCard` (bekommt zusätzlich Status-Badge mit korrekter Farbe je `status`).

## 4. Fahrzeugdetailseite (`src/routes/fahrzeuge.$id.tsx`)

Erweitert um:

- **Bildergalerie**: Hauptbild + Thumbnail-Reihe darunter, Klick wechselt Hauptbild; Tastatur-Navigation links/rechts; Lightbox-ähnliche Vergrößerung beim Klick aufs Hauptbild (CSS-only Overlay).
- **Sticky Sidebar**: Preis, Status-Badge, Fahrzeug-ID, WhatsApp-CTA, Anruf-CTA, „Finanzierungsanfrage"-CTA, „Probefahrt vereinbaren".
- **Technische Daten** als zweispaltige Spec-Grid (alle neuen Felder: Variante, Zustand, Vorbesitzer, Farbe, Leistung kW/PS, EZ, Kraftstoff, Getriebe).
- **Ausstattung** Liste (bestehend, leicht aufgewertet).
- **Beschreibung** Block.
- **Anfrageformular** (neue Komponente): Name, E-Mail, Telefon, Nachricht (vorbefüllt mit Fahrzeug-Titel und ID). Zod-Validierung. Submit öffnet `mailto:` an Dealer-E-Mail mit vorgefülltem Body (kein Backend nötig).
- **WhatsApp-Text** auf den vom Nutzer geforderten Wortlaut:
  `Hallo Autohaus AK GmbH, ich interessiere mich für [Fahrzeugname]. Ist das Fahrzeug noch verfügbar?`
- **Finanzierungsanfrage-CTA**: Link zu `/finanzierung?fahrzeug={id}`; auf der Finanzierungsseite wird der Query-Param als vorbefüllter Hinweis angezeigt.
- **Ähnliche Fahrzeuge**: Filterung nach gleicher Marke oder gleichem Preissegment (±25 %), max. 3, fallback auf neueste.
- **Status-Behandlung**: Bei `sold` werden CTAs deaktiviert/grau, Hinweis „Bereits verkauft — sprechen Sie uns für ähnliche Fahrzeuge an".

## 5. Komponenten (neu / aktualisiert)

- `src/components/site/VehicleCard.tsx` — Status-Badge nutzt `statusMeta` (Farbtokens), zeigt korrekten Label-Text.
- `src/components/site/VehicleFilters.tsx` (neu) — Filter-UI, wiederverwendet für Desktop und Mobile-Panel.
- `src/components/site/VehicleGallery.tsx` (neu) — Galerie mit Thumbnails + Lightbox.
- `src/components/site/InquiryForm.tsx` (neu) — Anfrageformular mit Zod-Validierung, `mailto:`-Submit.
- `src/components/site/StatusBadge.tsx` (neu) — gemeinsame Badge-Komponente.

## 6. Styling

Bleibt im bestehenden Tech-Platform-Prestige-System (Emerald/Champagner, Sora/Manrope/JetBrains Mono). Filter-Chips und Status-Badges nutzen vorhandene Tokens (`--champagne`, `--ink`, `--line`, `--surface-2`); für `new-arrival`/`highlight` wird Champagner verwendet, für `reserved` ein gedämpftes Muted-Token, für `sold` ein dezentes Rot-Token (neu in `src/styles.css` als `--status-sold`).

## 7. Nicht im Scope

- Lovable Cloud / Datenbank, Admin-Backend, mobile.de-Import — separate Phase.
- Echte Anfrage-Übermittlung per E-Mail/Server (statt `mailto:`).
- Bezahlte Bildlizenzen / neue Fahrzeugfotos — wir bleiben bei den vorhandenen Assets.

## Geänderte / neue Dateien

- aktualisiert: `src/data/vehicles.ts`, `src/routes/fahrzeuge.tsx`, `src/routes/fahrzeuge.$id.tsx`, `src/components/site/VehicleCard.tsx`, `src/routes/finanzierung.tsx` (Query-Param-Hinweis), `src/styles.css` (Status-Tokens)
- neu: `src/components/site/VehicleFilters.tsx`, `src/components/site/VehicleGallery.tsx`, `src/components/site/InquiryForm.tsx`, `src/components/site/StatusBadge.tsx`
