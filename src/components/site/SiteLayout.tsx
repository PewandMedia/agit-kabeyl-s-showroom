import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileStickyBar } from "./MobileStickyBar";
import { StickyWhatsAppFab } from "./StickyWhatsAppFab";

export function SiteLayout({
  children,
  transparentHeader = false,
  hideMobileBar = false,
  hideFab = false,
}: {
  children: React.ReactNode;
  transparentHeader?: boolean;
  hideMobileBar?: boolean;
  hideFab?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Header />
      <main className={transparentHeader ? "" : "pt-16 md:pt-20"}>
        {children}
      </main>
      <Footer />
      {!hideFab && <StickyWhatsAppFab />}
      {!hideMobileBar && <MobileStickyBar />}
      {/* Spacer so content isn't hidden behind sticky bar */}
      {!hideMobileBar && <div className="h-16 md:hidden" aria-hidden />}
    </div>
  );
}
