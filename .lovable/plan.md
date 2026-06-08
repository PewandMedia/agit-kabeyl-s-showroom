## Ziel
Den Host `kaybel.pewandmedia.de` im Vite Dev-Server erlauben (sonst blockt Vite mit "Blocked request. This host is not allowed").

## Änderung
In `vite.config.ts` die zusätzliche Vite-Konfiguration via `defineConfig({ vite: { ... } })` erweitern und `server.allowedHosts` setzen:

```ts
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      allowedHosts: ["kaybel.pewandmedia.de"],
    },
  },
});
```

Die bestehenden Einstellungen aus `@lovable.dev/vite-tanstack-config` (Port, Host, strictPort, Sandbox-Detection) bleiben unverändert — wir ergänzen nur die Allowlist.

## Hinweis
Nach der Änderung startet der Dev-Server neu. Die Allowlist wirkt nur im Dev-Modus; in Produktion (Cloudflare Worker) ist sie irrelevant.