import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PageShell } from "@/components/PageShell";
import { LangProvider } from "@/lib/lang-context";
import { RequestInfoProvider } from "@/lib/request-info-context";
import {
  ORGANIZATION_JSON_LD,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

// Fallback for machines without the Apple system faces, so the type reads
// the same weight and width everywhere.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nara Intelligence — Digital employees for every task",
    template: "%s — Nara Intelligence",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    title: "Nara Intelligence",
    description:
      "Digital employees, designed and deployed for the specific tasks holding your operation back.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <LangProvider>
          <RequestInfoProvider>
            <PageShell>{children}</PageShell>
          </RequestInfoProvider>
        </LangProvider>
        {/* Cookieless: aggregated page views only, nothing stored on the device. */}
        <Analytics />
      </body>
    </html>
  );
}
