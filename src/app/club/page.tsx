import Link from "next/link";
import { notFound } from "next/navigation";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel, kursVideos, videoNr } from "@/data/masterclass";
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
import { Reihe } from "@/components/Club/Reihe";
import { Willkommen } from "@/components/Club/Willkommen";
import styles from "./page.module.css";

/**
 * Die Startseite des Clubs.
 *
 * Kein Armaturenbrett mit Kennzahlen — ein Bild, ein Satz, zwei Knoepfe,
 * darunter Reihen. Wer hereinkommt, soll in einem Klick weitersehen, was
 * er angefangen hat, oder in zweien beim naechsten Live-Termin sein.
 *
 * Die Reihenfolge folgt dem, was jemand tatsaechlich sucht: erst das
 * Eigene (Weiter ansehen, Gespeichert), dann das Terminierte (Live), dann
 * das Neue im Club, dann der Katalog. Leere Reihen rendern nichts.
 */
export default async function ClubStart() {
  const sitzung = await verlangeMitglied("/club/");

  const featured = videoNr(startVideoNr);
  const featuredKapitel = kursKapitel.find(
    (k) => k.id === featured?.kapitelId,
  );
  if (!featured || !featuredKapitel) notFound();

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

  /* Der Vorname reicht. "Willkommen zurück, Max Mustermann" klingt nach
     Behoerde. */
  const vorname = sitzung.name.trim().split(/\s+/)[0] ?? "";

  return (
    <>
      <Willkommen />

      <FeaturedHero
        video={featured}
        bild={kursHeroAsset(featured, trust.video)}
        kapitel={featuredKapitel.label}
      />

      <div className={styles.gruss}>
        <h2 className={styles.grussTitel}>
          {club.start.grussVor}
          <span className={styles.name}> {vorname.toUpperCase()}.</span>
        </h2>
        <p className={styles.grussText}>{club.start.darunter}</p>
      </div>

      <MerkReihen videos={kursVideos} bilder={bilder} />

      <div className={styles.spalte}>
        <LiveKarte termin={live.naechster} />
      </div>

      {/* §50: was leer ist, erscheint nicht. Solange im Kanal nichts
          steht, gibt es diesen Abschnitt nicht. */}
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

      {kursKapitel.map((kapitel) => (
        <Reihe
          key={kapitel.id}
          titel={kapitel.label}
          videos={kapitel.videos}
          bilder={bilder}
          mehrHref={`/club/kapitel/${kapitel.id}/`}
          mehrLabel={club.start.alleZeigen}
        />
      ))}
    </>
  );
}
