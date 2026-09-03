import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { meta } from "@/data/landingPage";
import { TrailerProvider } from "@/components/TrailerModal/TrailerContext";
import "./globals.css";

/* Netflix Sans wird NICHT ausgeliefert (kein Font-Asset im Projekt).
   Inter / Inter Tight uebernehmen den neutralen, kompakten Charakter.
   Siehe globals.css fuer den vorbereiteten @font-face-Block. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        <a className="skipLink" href="#inhalt">
          Zum Inhalt springen
        </a>
        <TrailerProvider>{children}</TrailerProvider>
      </body>
    </html>
  );
}
