## Header-Logo → immer nach ganz oben scrollen

In `src/components/site/Header.tsx` ist das „AK Autohaus"-Logo bereits ein `<Link to="/">`. Problem: Wenn man **schon** auf `/` ist, navigiert der Router nicht neu — und scrollt deshalb auch nicht hoch.

Fix: Im bestehenden `onClick` (der bereits das Mobile-Menü schließt) zusätzlich `window.scrollTo({ top: 0, behavior: "smooth" })` aufrufen. Funktioniert sowohl beim Klick von der Startseite (sofortiges Hochscrollen) als auch von Unterseiten (Router-Navigation + danach oben).