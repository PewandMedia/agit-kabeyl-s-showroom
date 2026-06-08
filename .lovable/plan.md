## 1. „Grün" auf dem Handy → Schwarz/Rot

Der grüne Eindruck kommt nicht vom Favicon (das ist bereits schwarz/rot), sondern vom **`theme-color` Meta-Tag** in `src/routes/__root.tsx` — aktuell `#064e3b` (Smaragdgrün). Das färbt die Adressleiste auf Mobilgeräten ein.

- `theme-color` von `#064e3b` → `#0a0a0a` (passend zum Favicon-Hintergrund).
- Favicon-SVG bleibt wie gehabt (schwarz + rotes „AK" + roter Strich).

## 2. Bestand → Fahrzeugdetail: Mobile-Swipe für Galerie

In `src/components/site/VehicleGallery.tsx` sind die Prev/Next-Buttons via `hidden md:flex` auf dem Handy **versteckt**, und es gibt keine Touch-Geste. Folge: man hängt auf Bild 1 fest.

Lösung: Hauptbild auf Mobile als **horizontal scrollbarer Track mit Scroll-Snap** umbauen — native, ruckelfreie Wischgeste:

- Container: `flex overflow-x-auto snap-x snap-mandatory` (nur mobil; ab `md` greift die bisherige Einzelbild-Ansicht mit Pfeil-Buttons).
- Jedes Bild: `snap-center w-full shrink-0`.
- Beim Scrollen wird `active` über `IntersectionObserver` aktualisiert, damit der Zähler „X / Y" und der Lightbox-Index synchron bleiben.
- Tap auf ein Bild öffnet weiterhin den Lightbox.
- Im Lightbox ebenfalls horizontaler Snap-Scroll für Mobile (gleiche Geste).
- Thumbnails darunter bleiben unverändert und scrollen das Mobile-Karussell beim Klick zum richtigen Index.

Desktop-Verhalten bleibt 1:1 wie heute (Einzelbild + ← → Buttons + Tastatur).