import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agit Kabeyl Autohaus" },
      {
        name: "description",
        content:
          "Agit Kabeyl Autohaus – Webseite in Vorbereitung. Inhalte folgen in Kürze.",
      },
      { property: "og:title", content: "Agit Kabeyl Autohaus" },
      {
        property: "og:description",
        content: "Webseite in Vorbereitung. Inhalte folgen in Kürze.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Agit Kabeyl
        </p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Autohaus
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Webseite in Vorbereitung — Inhalte folgen in Kürze.
        </p>
        <div className="mt-10 inline-flex items-center justify-center rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
          Platzhalter – Inhalte folgen
        </div>
      </div>
    </main>
  );
}
