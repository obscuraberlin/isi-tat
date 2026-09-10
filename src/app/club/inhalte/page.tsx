import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel } from "@/data/masterclass";
import { club } from "@/data/club";
import { kursBildAsset, type Kursbild } from "@/lib/kursMedien";
import { SerienUebersicht } from "@/components/Club/SerienUebersicht";
import { SerienBlock } from "@/components/Club/SerienBlock";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Alle Inhalte auf einer Seite.
 *
 * Oben die fuenf Serien als Plakate mit Stand — zum Springen. Darunter
 * jede Serie mit allen Folgen, nummeriert, mit Haken, Balken und
 * Prozent. Wer hier scrollt, sieht die ganze Bibliothek und weiss an
 * jeder Stelle, wo er steht.
 */
export default async function InhalteSeite() {
  await verlangeMitglied("/club/inhalte/");

  const bilder: Record<number, Kursbild> = {};
  for (const kapitel of kursKapitel) {
    for (const video of kapitel.videos) {
      bilder[video.nr] = kursBildAsset(video, kapitel.still);
    }
  }

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.inhalte.eyebrow}</p>
        <h1 className={styles.titel}>{club.inhalte.headline}</h1>
        <p className={styles.subline}>{club.inhalte.subline}</p>
      </header>

      <div className={styles.serien}>
        <SerienUebersicht anker />
      </div>

      {kursKapitel.map((kapitel) => (
        <SerienBlock key={kapitel.id} kapitel={kapitel} bilder={bilder} />
      ))}
    </div>
  );
}
