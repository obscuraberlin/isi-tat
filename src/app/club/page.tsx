import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel, kursVideos } from "@/data/masterclass";
import { catalogue } from "@/data/landingPage";
import { club } from "@/data/club";
import { kursBildAsset, type Kursbild } from "@/lib/kursMedien";
import { VideoKarte } from "@/components/Club/VideoKarte";
import { Weitersehen } from "@/components/Club/Weitersehen";
import styles from "./page.module.css";

/**
 * Die Startseite des Clubs: alle vierzig Videos, nach den fuenf Kapiteln
 * geordnet.
 *
 * Bewusst ein Raster und keine seitlich laufende Reihe wie draussen. Auf
 * der Startseite soll ein Band Lust machen; hier will jemand etwas finden,
 * und was seitlich aus dem Bild laeuft, findet er nicht.
 */
export default async function ClubStart() {
  const sitzung = await verlangeMitglied("/club/");

  /* Die Standbilder werden hier aufgeloest, nicht in der Kachel: die
     Adresse der Videodateien steht in einer Umgebungsvariablen, und die
     gehoert auf den Server. */
  const bilder: Record<number, Kursbild> = {};
  for (const kapitel of kursKapitel) {
    for (const video of kapitel.videos) {
      bilder[video.nr] = kursBildAsset(video, kapitel.still);
    }
  }

  /* Der Vorname reicht. "Willkommen zurück, Max Mustermann" klingt nach
     Behoerde. */
  const vorname = sitzung.name.trim().split(/\s+/)[0] ?? "";

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.start.eyebrow}</p>
        <h1 className={styles.gruss}>
          {club.start.grussVor}
          <span className={styles.name}> {vorname.toUpperCase()}.</span>
        </h1>
        <p className={styles.lead}>{club.start.lead}</p>
        <p className={styles.hinweis}>{club.start.hinweis}</p>
      </header>

      <Weitersehen videos={kursVideos} bilder={bilder} />

      {kursKapitel.map((kapitel) => (
        <section
          key={kapitel.id}
          className={styles.kapitel}
          aria-labelledby={`k-${kapitel.id}`}
        >
          <div className={styles.kapitelKopf}>
            <div>
              <h2 id={`k-${kapitel.id}`} className={styles.kapitelTitel}>
                {kapitel.label}
              </h2>
              <p className={styles.kapitelText}>{kapitel.tagline}</p>
            </div>
            <span className={styles.zahl}>
              {kapitel.videos.length} Videos
            </span>
          </div>

          <div className={styles.raster}>
            {kapitel.videos.map((video) => (
              <VideoKarte
                key={video.nr}
                video={video}
                bild={bilder[video.nr].bild}
                eigen={bilder[video.nr].eigen}
              />
            ))}
          </div>

          <Link href={`/club/kapitel/${kapitel.id}/`} className={styles.mehr}>
            {club.start.alleAnsehen}
            <span aria-hidden="true"> →</span>
          </Link>
        </section>
      ))}

      <p className={styles.fuss}>
        {catalogue.seriesCount} Kapitel · {catalogue.videoCount} Videos
      </p>
    </div>
  );
}
