import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/motion/Motion";
import { SiteHeader } from "@/components/SiteHeader";
import { indexable, siteOrigin } from "@/lib/site";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Garamond", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

const manrope = localFont({
  src: [
    { path: "../fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
});

const tiro = localFont({
  src: [{ path: "../fonts/tiro-devanagari-sanskrit-subset.woff2", weight: "400", style: "normal" }],
  variable: "--font-tiro",
  display: "swap",
  preload: false,
  fallback: ["Noto Serif Devanagari", "serif"],
});

export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  title: { default: "Pandit Thulasidas · Vedic astrologer in Sydney", template: "%s · Pandit Thulasidas" },
  description:
    "Private Vedic astrology, horoscope, palm reading, psychic and spiritual consultations with Pandit Thulasidas in Sydney.",
  applicationName: "Pandit Thulasidas",
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: { type: "website", locale: "en_AU", siteName: "Pandit Thulasidas" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#f5eee2", width: "device-width", initialScale: 1, viewportFit: "cover" };

/**
 * Runs before first paint: adds `motion` only when the visitor allows motion. The hero entrance is
 * CSS-only, so content never waits on JavaScript; without this class everything renders static.
 */
const MOTION_BOOT = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${cormorant.variable} ${manrope.variable} ${tiro.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
