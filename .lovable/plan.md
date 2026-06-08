## Ziel
Den Host `kabayel.pewandmedia.de` zusätzlich in der Vite-Allowlist erlauben (anderer Schreibweise als `kaybel...`).

## Änderung
In `vite.config.ts` den Array `allowedHosts` erweitern:

```ts
allowedHosts: ["kaybel.pewandmedia.de", "kabayel.pewandmedia.de"],
```

Alles andere bleibt unverändert. Nach dem Speichern startet der Dev-Server neu.