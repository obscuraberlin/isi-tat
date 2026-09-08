import Link from "next/link";
import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel } from "@/data/masterclass";
import { catalogue } from "@/data/landingPage";
import { club } from "@/data/club";
import { kursBildAsset } from "@/lib/kursMedien";
import { VideoKarte } from "@/components/Club/VideoKarte";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Die Bibliothek: alle vierzig Videos, nach den fuenf Kapiteln geordnet.
 *
 * Hier bewusst ein Raster und keine laufende Reihe. Auf der Startseite
 * soll ein Band Lust machen; hier will jemand etwas finden, und was
 * seitlich aus dem Bild laeuft, findet er nicht.
 */
export default async function InhalteSeite() {
  await verlangeMitglied("/club/inhalte/");

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.inhalte.eyebrow}</p>
        <h1 className={styles.titel}>{club.inhalte.headline}</h1>
        <p className={styles.subline}>{club.inhalte.subline}</p>
        <p className={styles.hinweis}>{club.inhalte.hinweis}</p>

        {/* Sprungmarken statt Filter: bei fuenf Kapiteln auf einer Seite
            ist Springen schneller als Ein- und Ausblenden — und es
            funktioniert ohne eine Zeile im Browser. */}
        <nav className={styles.marken} aria-label="Kapitel">
          {kursKapitel.map((k) => (
            <a key={k.id} href={`#${k.id}`} className={styles.marke}>
              {k.label}
            </a>
          ))}
        </nav>
      </header>

      {kursKapitel.map((kapitel) => (
        <section key={kapitel.id} id={kapitel.id} className={styles.kapitel}>
          <div className={styles.kapitelKopf}>
            <div>
              <h2 className={styles.kapitelTitel}>{kapitel.label}</h2>
              <p className={styles.kapitelText}>{kapitel.tagline}</p>
            </div>
            <Link
              href={`/club/kapitel/${kapitel.id}/`}
              className={styles.kapitelMehr}
            >
              {kapitel.videos.length} Videos
              <span aria-hidden="true"> →</span>
            </Link>
          </div>

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
        </section>
      ))}

      <p className={styles.fuss}>
        {catalogue.seriesCount} Kapitel · {catalogue.videoCount} Videos
      </p>
    </div>
  );
}
