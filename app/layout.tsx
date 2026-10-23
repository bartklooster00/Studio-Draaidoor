import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site-data";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Inter", "Arial", "sans-serif"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.studiodraaidoor.nl"),
  title: {
    default:
      "Studio DraaiDoor | Videoproductie voor bedrijven",
    template: `%s | ${site.name}`
  },
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${manrope.className} min-h-screen bg-[#050505] text-[#F5F3EF] antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
