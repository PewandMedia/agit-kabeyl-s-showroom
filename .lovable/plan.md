## Ziel

Alle sichtbaren Texte der Website auf ein einheitliches Premium-Niveau heben: seriös, klar, verkaufsstark — ohne Werbefloskeln. Keine Funktions- oder Layoutänderungen, nur Copy + Meta-Tags.

## Tonalität (Leitplanken)

- **Haltung**: ruhig, selbstbewusst, präzise. Kein „Wahnsinns-Angebot", kein „günstig wie nie".
- **Sprache**: kurze Hauptsätze, aktive Verben, keine Superlative ohne Beleg.
- **Markenwerte**: geprüft · ehrlich · fair · schnell · persönlich.
- **Vermeiden**: „Top", „mega", „unschlagbar", „Traumauto", Ausrufezeichen-Ketten.
- **Konsistenz**: Sie-Form, „Autohaus AK GmbH" beim ersten Vorkommen, danach „AK" / „wir".

## Headline-Varianten (zur Auswahl pro Seite)

Pro Seite werden 3 Varianten als Kommentar im Code hinterlegt, die erste Variante wird aktiv gesetzt — so kann später ohne neuen Auftrag gewechselt werden.

## Seiten & Texte im Detail

### 1. Startseite (`src/routes/index.tsx`)
- **Hero H1** (Varianten):
  1. „Premium-Fahrzeuge. Geprüft. Persönlich übergeben."
  2. „Geprüfte Fahrzeuge aus Velbert — mit Haltung verkauft."
  3. „Ihr nächstes Fahrzeug. Ehrlich beraten, sauber übergeben."
- **Subline**: Ein Satz, der Auswahl, Prüfung und persönliche Beratung verbindet.
- **Eyebrow/Kicker**: „Autohaus AK · Velbert"
- **CTA-Labels**: „Bestand ansehen" · „Per WhatsApp anfragen"
- **Vorteile/Werte-Block** (3–4 Kacheln): Geprüfter Bestand · Finanzierung auf Wunsch · Fairer Ankauf · Persönliche Beratung — jeweils 1 Headline + 1 Satz.
- **Featured-Bestand Intro** + Section-Kicker.
- **Schluss-CTA**: „Sie haben ein Fahrzeug im Blick?" + zwei klare Buttons.

### 2. Fahrzeugbestand (`src/routes/fahrzeuge.tsx`)
- **H1**: „Unser Bestand." / Alt: „Fahrzeuge, die wir verantworten."
- **Intro**: Hinweis auf persönliche Auswahl, Prüfung, Aufbereitung.
- **Empty-State**: freundlicher, lösungsorientierter Text.
- **Filter-Panel Labels**: konsistent (Marke, Kraftstoff, Getriebe, Status, Preis bis, KM bis, ab Baujahr).

### 3. Fahrzeug-Detail (`src/routes/fahrzeuge.$id.tsx`)
- Section-Überschriften: „Auf einen Blick" · „Ausstattung" · „Beschreibung" · „Ähnliche Fahrzeuge".
- CTA-Texte im Sidebar/Sticky: „Probefahrt vereinbaren" · „Rückruf anfordern" · „WhatsApp-Anfrage".
- Vertrauenszeile unter dem Preis: „Geprüft · Finanzierung möglich · Inzahlungnahme willkommen".

### 4. Über uns (`src/routes/ueber-uns.tsx`)
- **H1**: „Ein Autohaus mit Haltung." (Alt: „Persönlich. Geprüft. Verbindlich.")
- Werte-Blöcke (Disziplin/Qualität/Verantwortung) bleiben strukturell, Texte werden entschlackt: weniger Pathos, mehr Substanz (z. B. konkrete Prüfschritte, persönliche Übergabe, Ansprechpartner).
- Schluss-CTA-Text seriöser.

### 5. Ankauf (`src/routes/auto-verkaufen.tsx`)
- **H1**: „Wir kaufen Ihr Fahrzeug — fair bewertet, schnell abgewickelt."
- 4-Schritte-Prozess: Texte kürzen, klare Erwartung pro Schritt (Daten · Bewertung · Termin · Übergabe & Zahlung).
- Trust-Box: „Marken- und modellübergreifend · Auch mit Finanzierung · Sofortige Zahlung möglich".

### 6. Finanzierung (`src/routes/finanzierung.tsx`)
- **H1**: „Finanzierung, die zu Ihnen passt."
- Intro: neutrale Beschreibung (Bankenpartner, Laufzeit, Anzahlung), kein Werbeton.
- Hinweis-Satz zu Bonität/Repräsentativ-Beispiel platzhalterfrei aber rechtssicher formuliert (als Hinweis kennzeichnen).

### 7. Probefahrt / Rückruf (`probefahrt.tsx`, `rueckruf.tsx`)
- Klare H1, ein Satz Nutzenversprechen, kein Marketing-Geschwurbel.
- Bestätigungstexte (Success-State) konsistent.

### 8. Kontakt (`src/routes/kontakt.tsx`)
- **H1**: „Sprechen Sie uns an." / Alt: „Direkter Draht nach Velbert."
- Kontaktwege als gleichwertige Optionen mit klaren Erwartungen (Antwortzeit Mo–Fr).

### 9. Leistungen (`src/routes/leistungen.tsx`)
- Leistungs-Blöcke: Verkauf · Ankauf · Finanzierung · Inzahlungnahme · Aufbereitung — je 1 Headline + 2 Sätze.

### 10. FAQ
- Wird auf der Startseite **oder** Leistungen-Seite als neuer Abschnitt eingefügt (vorhandene Section-Struktur, kein neues Routing). 6–8 Fragen:
  - Sind die Fahrzeuge geprüft?
  - Bieten Sie Finanzierung an?
  - Nehmen Sie mein altes Fahrzeug in Zahlung?
  - Wie läuft eine Probefahrt ab?
  - Liefern Sie deutschlandweit?
  - Garantie / Gewährleistung?
  - Wie schnell ist die Übergabe?
  - Kann ich per WhatsApp anfragen?

### 11. CTA-Bereiche (global)
- Einheitliche Button-Labels:
  - Primär: „Bestand ansehen" · „Probefahrt vereinbaren" · „Finanzierung anfragen"
  - Sekundär: „WhatsApp" · „Anrufen" · „Rückruf anfordern"
- Bestätigungs-Texte (Success-State der Formulare) freundlich + nächste Schritte.

### 12. Meta-Tags (Title + Description je Route)

| Route | Title (<60) | Description (<160) |
|---|---|---|
| `/` | Autohaus AK GmbH — Premium-Fahrzeuge aus Velbert | Geprüfte Fahrzeuge, ehrliche Beratung, Finanzierung & Ankauf. Persönlich betreut vom Autohaus AK GmbH in Velbert. |
| `/fahrzeuge` | Fahrzeugbestand — Autohaus AK GmbH, Velbert | Aktueller Bestand: geprüfte Premium- und Gebrauchtfahrzeuge. Filter nach Marke, Preis, Kilometerstand und Kraftstoff. |
| `/fahrzeuge/$id` | dynamisch: „{Marke Modell} — Autohaus AK GmbH" | dynamisch: kurzer Spec-Satz + „Jetzt anfragen". |
| `/auto-verkaufen` | Auto verkaufen in Velbert — Autohaus AK GmbH | Faire Bewertung, schnelle Abwicklung, sofortige Auszahlung. Markenübergreifender Ankauf vom Autohaus AK. |
| `/finanzierung` | Fahrzeug-Finanzierung — Autohaus AK GmbH, Velbert | Passende Finanzierung für Ihr Wunschfahrzeug. Transparente Konditionen, schnelle Zusage. |
| `/probefahrt` | Probefahrt vereinbaren — Autohaus AK GmbH | Probefahrt in Velbert oder nach Absprache. In zwei Schritten Termin sichern. |
| `/rueckruf` | Rückruf anfordern — Autohaus AK GmbH | Wir rufen Sie zurück — werktags meist innerhalb von 60 Minuten. |
| `/kontakt` | Kontakt — Autohaus AK GmbH, Velbert | Telefon, WhatsApp, E-Mail oder vor Ort: Wir sind persönlich erreichbar. |
| `/ueber-uns` | Über uns — Autohaus AK GmbH, Velbert | Persönlich, geprüft, verbindlich. Die Werte hinter dem Autohaus AK in Velbert. |
| `/leistungen` | Leistungen — Verkauf, Ankauf, Finanzierung | Verkauf, Ankauf, Finanzierung und Inzahlungnahme aus einer Hand. |

OG-Titel und OG-Description spiegeln den Title/Description (bereits bestehende Struktur).

## Nicht im Scope
- Layout, Komponenten-Struktur, Routing, Logik, Bilder bleiben unverändert.
- Keine neuen Routen (FAQ wird als Section auf bestehender Seite eingebaut).
- Keine neuen Bilder/Icons.
- Stammdaten (`dealer.ts`: Adresse, Telefon, HRB etc.) bleiben Platzhalter, sofern nicht später geliefert.

## Lieferung

Pro Route: aktualisierter Body-Text + Meta. Headline-Varianten werden als Kommentar (`{/* Alt: … */}`) über der aktiven H1 hinterlegt, sodass ein späterer Wechsel ein 30-Sekunden-Job ist.
