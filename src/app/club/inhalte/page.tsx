import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel } from "@/data/masterclass";
import { club } from "@/data/club";
import { SerienKarte } from "@/components/Club/SerienKarte";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Alle Serien.
 *
 * Fuenf Kacheln, sonst nichts. Die Folgen sieht man erst in der Serie —
 * hier waehlt man, dort arbeitet man.
 */
export default async function InhalteSeite() {
  await verlangeMitglied("/club/inhalte/");

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.inhalte.eyebrow}</p>
        <h1 className={styles.titel}>{club.inhalte.headline}</h1>
        <p className={styles.subline}>{club.inhalte.subline}</p>
      </header>

      <div className={styles.serien}>
        {kursKapitel.map((kapitel) => (
          <SerienKarte
            key={kapitel.id}
            href={`/club/kapitel/${kapitel.id}/`}
            label={kapitel.label}
            tagline={kapitel.tagline}
            anzahl={kapitel.videos.length}
            cover={kapitel.cover}
          />
        ))}
      </div>
    </div>
  );
}
