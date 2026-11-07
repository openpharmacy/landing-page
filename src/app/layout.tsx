import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";

import { Providers } from "@/providers";

// Body / UI typeface. Lato on Google Fonts ships 100/300/400/700/900 — there is
// no true 500, so the Figma "Medium" labels render at 400 (documented in design.md).
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

// Brand wordmark + legal text typeface.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open Pharmacy",
  description:
    "Compare pharmacy products, prices and stock, and manage your scripts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${inter.variable}`}>
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
