import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";
import { Preloader } from "@/components/layout/preloader";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { navigation } from "@/content/site";
import { getSiteSettings } from "@/lib/content";

import "./globals.css";

// Instrument Sans ships a true italic. Geist does not, so every `font-style:
// italic` on the site was being synthesised by the browser — tolerable at 11px,
// but the hero wordmark sets italic at ~350px, where a faux oblique is obvious.
const sans = Instrument_Sans({
  variable: "--font-sans-family",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://azura.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AZURA — Maulana Alfara, Fullstack & AI Engineer",
    template: "%s — AZURA",
  },
  description:
    "Maulana Alfara — fullstack and AI engineer. Next.js, Laravel and Node.js, with business rules, machine learning and LLM retrieval working as one system.",
  openGraph: {
    type: "website",
    siteName: "AZURA",
    url: siteUrl,
    title: "AZURA — Maulana Alfara, Fullstack & AI Engineer",
    description:
      "Web products with the intelligence built in, not bolted on.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={sans.variable}>
      <body>
        <SmoothScroll>
          <Preloader />
          <PageTransition />
          <Cursor />

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-ink"
          >
            Skip to content
          </a>

          <Navbar items={navigation} settings={settings} />

          <main id="main">{children}</main>

          <Footer settings={settings} />
        </SmoothScroll>
      </body>
    </html>
  );
}
