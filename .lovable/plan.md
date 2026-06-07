## Ziel
Beim Klick auf ein Fahrzeug im Bestand soll eine echte Detailansicht aufgehen: oben eine scroll-/swipebare Bildergalerie des Autos, direkt darunter die kompletten Fahrzeuginfos, Ausstattung und technische Daten. Der aktuelle Effekt, bei dem der Klick nur wieder auf der Seite landet bzw. sich falsch anfühlt, wird beseitigt.

## Umsetzungsplan
1. **Klickverhalten im Bestand korrigieren**
   - Den Fahrzeug-Card-Link und die sichtbare „Details“-Interaktion so anpassen, dass der Klick eindeutig zur Route `/fahrzeuge/$id` führt.
   - Verhindern, dass sich der Klick wie ein bloßer Sprung/Refresh derselben Seite verhält.

2. **Detailseite klar strukturieren**
   - Die Fahrzeugdetailseite so aufbauen, dass zuerst die Bildergalerie kommt.
   - Direkt darunter die Inhalte in sinnvoller Reihenfolge anzeigen: Kurzbeschreibung, Eckdaten, Ausstattung/Highlights und technische Daten.

3. **Galerie wirklich als Mehrbild-Ansicht ausbauen**
   - Die vorhandenen mehreren Bilder pro Fahrzeug als horizontal nutzbare Galerie darstellen.
   - Auf Mobilgeräten per Wischen/Scrollen nutzbar machen, auf Desktop mit klarer Navigation und Vorschaubildern.
   - Sicherstellen, dass beim Wechsel zwischen Bildern nichts springt.

4. **Fahrzeugdaten pro Inserat sichtbar machen**
   - Für jedes inserierte Auto die vorhandenen generierten Daten sauber auf der Detailseite ausgeben.
   - Ausstattung, technische Angaben und Zustandsinfos lesbar und vollständig unter der Galerie platzieren.

5. **Preview prüfen**
   - Im laufenden Preview testen, dass der Klick auf z. B. den Audi RS5 zuverlässig die Detailseite öffnet.
   - Prüfen, dass mehrere Bilder sichtbar/navigierbar sind und die Informationen direkt darunter erscheinen.

## Technische Details
- Betroffene Bereiche: `src/components/site/VehicleCard.tsx`, `src/components/site/VehicleGallery.tsx`, `src/routes/fahrzeuge.$id.tsx`
- Keine Backend-Änderung nötig.
- Es werden nur Navigation, Layout-Reihenfolge und Galerie-Interaktion angepasst; die Fahrzeugdaten bleiben frontendseitig in `src/data/vehicles.ts`.