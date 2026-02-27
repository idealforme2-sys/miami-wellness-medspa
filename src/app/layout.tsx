import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import "./globals.css";

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miamiwellnessmedspa.com";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Miami Wellness Medspa | Advanced Aesthetics in Miami, FL",
    template: "%s | Miami Wellness Medspa",
  },
  description:
    "Miami Wellness Medspa delivers personalized aesthetic treatments, advanced devices, and a modern booking-first client experience in Miami, Florida.",
  keywords: [
    "Miami Medspa",
    "Aesthetic treatments Miami",
    "Body sculpting Miami",
    "Facials Miami",
    "Miami Wellness Medspa",
  ],
  openGraph: {
    title: "Miami Wellness Medspa | Advanced Aesthetics in Miami, FL",
    description:
      "Book personalized aesthetic treatments at Miami Wellness Medspa with a premium, modern experience.",
    url: siteUrl,
    siteName: "Miami Wellness Medspa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miami Wellness Medspa",
    description:
      "Modern medspa care with personalized plans, advanced treatments, and easy online booking.",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
    },
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
        style={{ background: "#07070b", color: "#f0ece4" }}
      >
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
