import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { meta } from "@/data/landingPage";
import { Kopierstempel } from "@/components/Kopierstempel/Kopierstempel";
import { TrailerProvider } from "@/components/TrailerModal/TrailerContext";
import "./globals.css";

/* Netflix Sans wird NICHT ausgeliefert (kein Font-Asset im Projekt).
   Ersatz: Archivo fuer Headlines — eine Grotesk mit Breitenachse, die dem
   leicht schmalen, harten Charakter von Netflix Sans nahekommt. Inter
   bleibt fuer Fliesstext, weil es auf langen Strecken ruhiger liest.
   Siehe globals.css fuer den vorbereiteten @font-face-Block. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
    <html lang="de" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <a className="skipLink" href="#inhalt">
          Zum Inhalt springen
        </a>
        <Kopierstempel />
        <TrailerProvider>{children}</TrailerProvider>
      </body>
    </html>
  );
}
