import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileStickyBar } from "./MobileStickyBar";
import { StickyWhatsAppFab } from "./StickyWhatsAppFab";
import { BackToTop } from "./BackToTop";

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
      {!hideFab && false && <StickyWhatsAppFab />}
      {!hideMobileBar && <MobileStickyBar />}
      <BackToTop />
      {!hideMobileBar && (
        <div className="h-[72px] pb-safe md:hidden" aria-hidden />
      )}
    </div>
  );
}
