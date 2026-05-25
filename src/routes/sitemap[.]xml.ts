import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { vehicles } from "@/data/vehicles";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/fahrzeuge", changefreq: "daily", priority: "0.9" },
          { path: "/auto-verkaufen", changefreq: "monthly", priority: "0.8" },
          { path: "/finanzierung", changefreq: "monthly", priority: "0.8" },
          { path: "/probefahrt", changefreq: "monthly", priority: "0.7" },
          { path: "/leistungen", changefreq: "monthly", priority: "0.7" },
          { path: "/ueber-uns", changefreq: "monthly", priority: "0.6" },
          { path: "/kontakt", changefreq: "monthly", priority: "0.7" },
          { path: "/rueckruf", changefreq: "monthly", priority: "0.5" },
          { path: "/impressum", changefreq: "yearly", priority: "0.2" },
          { path: "/datenschutz", changefreq: "yearly", priority: "0.2" },
        ];

        const vehicleEntries: SitemapEntry[] = vehicles.map((v) => ({
          path: `/fahrzeuge/${v.id}`,
          changefreq: "weekly",
          priority: "0.8",
        }));

        const entries = [...staticEntries, ...vehicleEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
