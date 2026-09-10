import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LangProvider } from "@/lib/lang-context";
import "./globals.css";

// Fallback for machines without the Apple system faces, so the type reads
// the same weight and width everywhere.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naraintelligence.ai"),
  title: "Nara Intelligence — Digital employees for every task",
  description:
    "We design, train and deploy AI agents that run real workflows in your company — with the precision and availability of one more employee.",
  openGraph: {
    title: "Nara Intelligence",
    description:
      "Digital employees, designed and deployed for the specific tasks holding your operation back.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
  icons: { icon: "/assets/na-logo.jpg" },
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
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
