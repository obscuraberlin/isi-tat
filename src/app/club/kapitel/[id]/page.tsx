import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel } from "@/data/masterclass";
import { club } from "@/data/club";
import { kursBildAsset, type Kursbild } from "@/lib/kursMedien";
import { Media } from "@/components/Media/Media";
import { FolgenListe } from "@/components/Club/FolgenListe";
import { AktivInsBild } from "@/components/Club/AktivInsBild";
import { SerieStart } from "@/components/Club/SerieStart";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Eine Serie: Plakat, Titel, ein Absatz — und darunter die Folgen als
 * nummerierte Liste. Oben die anderen Serien zum Wechseln, ohne zurueck
 * zu muessen.
 */
export default async function KapitelSeite({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kapitel = kursKapitel.find((k) => k.id === id);
  if (!kapitel) notFound();

  await verlangeMitglied(`/club/kapitel/${kapitel.id}/`);

  const bilder: Record<number, Kursbild> = {};
  for (const video of kapitel.videos) {
    bilder[video.nr] = kursBildAsset(video, kapitel.still);
  }
  return (
    <div className={styles.seite}>
      {/* Zum Wechseln zwischen den Serien — die aktuelle ist markiert und
          wird auf dem Telefon ins Bild geschoben. */}
      <AktivInsBild selektor={`.${styles.wechsel} [aria-current="page"]`} />
      <nav className={styles.wechsel} aria-label="Serie wählen">
        {kursKapitel.map((k) => (
          <Link
            key={k.id}
            href={`/club/kapitel/${k.id}/`}
            className={[styles.pille, k.id === kapitel.id ? styles.pilleAktiv : ""]
              .filter(Boolean)
              .join(" ")}
            aria-current={k.id === kapitel.id ? "page" : undefined}
          >
            {k.label}
          </Link>
        ))}
      </nav>

      <header className={styles.kopf}>
        <div className={styles.plakat}>
          <Media asset={kapitel.cover} tone="dark" radius="inherit" ratio="2 / 3" />
        </div>
        <div className={styles.kopfText}>
          <p className={styles.zahl}>{kapitel.videos.length} Folgen</p>
          <h1 className={styles.titel}>{kapitel.label}</h1>
          <p className={styles.text}>{kapitel.description}</p>
          <SerieStart folgen={kapitel.videos} />
        </div>
      </header>

      <section aria-labelledby="folgen">
        <h2 id="folgen" className={styles.folgenTitel}>
          {club.kapitel.folgen}
        </h2>
        <FolgenListe folgen={kapitel.videos} bilder={bilder} />
      </section>
    </div>
  );
}
