import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { getSession } from "@/lib/auth/session";
import { showHiddenScreens } from "@/lib/features";
import { userKey } from "@/lib/user-storage";
import { Providers } from "@/providers";

const lato = localFont({
  src: [
    { path: "./fonts/Lato-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/Lato-Regular.woff2", weight: "400" },
    { path: "./fonts/Lato-Medium.woff2", weight: "500" },
    { path: "./fonts/Lato-Semibold.woff2", weight: "600" },
    { path: "./fonts/Lato-Bold.woff2", weight: "700" },
    { path: "./fonts/Lato-Heavy.woff2", weight: "800" },
  ],
  variable: "--font-lato",
  display: "swap",
  declarations: [
    { prop: "ascent-override", value: "100%" },
    { prop: "descent-override", value: "20%" },
  ],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open Pharmacy",
  description:
    "Sync your eScripts, track your medications, and stay on top of your treatment - all in one simple app.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showHidden, session] = await Promise.all([
    showHiddenScreens(),
    getSession(),
  ]);
  return (
    <html lang="en" className={`${lato.variable} ${inter.variable}`}>
      <body className="min-h-dvh">
        <Providers
          showHidden={showHidden}
          userKey={session ? userKey(session.uid) : null}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
