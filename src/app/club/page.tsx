import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel, kursVideos } from "@/data/masterclass";
import { club, startVideoNr } from "@/data/club";
import { trust } from "@/data/landingPage";
import {
  kursBildAsset,
  kursHeroAsset,
  type Kursbild,
} from "@/lib/kursMedien";
import { liveDaten } from "@/lib/live";
import { kanalNachrichten, datumLang } from "@/lib/kanal";
import { FeaturedHero } from "@/components/Club/FeaturedHero";
import { LiveKarte } from "@/components/Club/LiveKarte";
import { MerkReihen } from "@/components/Club/MerkReihen";
import { SerienKarte } from "@/components/Club/SerienKarte";
import { Willkommen } from "@/components/Club/Willkommen";
import styles from "./page.module.css";

/**
 * Die Startseite des Clubs.
 *
 * Bild, ein Satz, zwei Knoepfe — dann die fuenf Serien. Nicht vierzig
 * Videos. Was jemand angefangen hat, steht dazwischen; ein Live-Termin
 * und Neues aus dem Kanal nur, wenn es sie gibt.
 *
 * Die Folgen einer Serie sieht man erst, wenn man sie oeffnet. So bleibt
 * die erste Seite eine Auswahl aus fuenf Dingen, nicht aus vierzig.
 */
export default async function ClubStart() {
  const sitzung = await verlangeMitglied("/club/");

  const erstes = kursVideos.find((v) => v.nr === startVideoNr) ?? kursVideos[0];

  /* Die Standbilder werden hier aufgeloest, nicht in der Kachel: die
     Adresse der Videodateien steht in einer Umgebungsvariablen, und die
     gehoert auf den Server. */
  const bilder: Record<number, Kursbild> = {};
  for (const kapitel of kursKapitel) {
    for (const video of kapitel.videos) {
      bilder[video.nr] = kursBildAsset(video, kapitel.still);
    }
  }

  const live = liveDaten();
  const neuigkeiten = kanalNachrichten().slice(0, 3);
  const vorname = sitzung.name.trim().split(/\s+/)[0] ?? "";

  return (
    <>
      <Willkommen />

      <FeaturedHero
        bild={kursHeroAsset(erstes, trust.video)}
        vorname={vorname}
        erstesVideoNr={erstes.nr}
      />

      <div className={styles.abstand} />

      <MerkReihen videos={kursVideos} bilder={bilder} />

      {/* §50: was leer ist, erscheint nicht. Der naechste Termin steht
          hier nur, wenn es einen gibt — den Leerzustand hat die
          Live-Seite. */}
      {live.naechster ? (
        <div className={styles.spalte}>
          <LiveKarte termin={live.naechster} />
        </div>
      ) : null}

      {neuigkeiten.length > 0 ? (
        <div className={styles.spalte}>
          <section className={styles.woche} aria-labelledby="woche">
            <div className={styles.wocheKopf}>
              <h2 id="woche" className={styles.wocheTitel}>
                {club.kanal.dieseWoche}
              </h2>
              <Link href="/club/kanal/" className={styles.wocheMehr}>
                {club.kanal.alleZeigen}
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
            <ul className={styles.wocheListe}>
              {neuigkeiten.map((n) => (
                <li key={`${n.datum}-${n.titel}`} className={styles.wocheZeile}>
                  <time className={styles.wocheDatum} dateTime={n.datum}>
                    {datumLang(n.datum)}
                  </time>
                  <span className={styles.wocheText}>{n.titel}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      <section className={styles.spalte} aria-labelledby="serien">
        <h2 id="serien" className={styles.serienTitel}>
          {club.start.serien}
        </h2>
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
      </section>
    </>
  );
}
