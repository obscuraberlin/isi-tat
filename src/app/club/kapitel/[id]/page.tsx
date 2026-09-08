import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel } from "@/data/masterclass";
import { club } from "@/data/club";
import { kursBildAsset } from "@/lib/kursMedien";
import { VideoKarte } from "@/components/Club/VideoKarte";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/** Ein Kapitel mit allen seinen Videos. */
export default async function KapitelSeite({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kapitel = kursKapitel.find((k) => k.id === id);
  if (!kapitel) notFound();

  await verlangeMitglied(`/club/kapitel/${kapitel.id}/`);

  return (
    <div className={styles.seite}>
      <nav className={styles.pfad} aria-label="Wo du bist">
        <Link href="/club/" className={styles.pfadLink}>
          {club.video.zurueck}
        </Link>
      </nav>

      <header className={styles.kopf}>
        <p className={styles.zahl}>{kapitel.videos.length} Videos</p>
        <h1 className={styles.titel}>{kapitel.label}</h1>
        <p className={styles.text}>{kapitel.description}</p>
      </header>

      <div className={styles.raster}>
        {kapitel.videos.map((video) => {
          const { bild, eigen } = kursBildAsset(video, kapitel.still);
          return (
            <VideoKarte
              key={video.nr}
              video={video}
              bild={bild}
              eigen={eigen}
            />
          );
        })}
      </div>
    </div>
  );
}
