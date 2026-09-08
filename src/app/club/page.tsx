import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel } from "@/data/masterclass";
import { club } from "@/data/club";
import { kursBildAsset, type Kursbild } from "@/lib/kursMedien";
import { liveDaten } from "@/lib/live";
import { kanalNachrichten, datumLang } from "@/lib/kanal";
import { LiveKarte } from "@/components/Club/LiveKarte";
import { NaechsteFolge } from "@/components/Club/NaechsteFolge";
import { SerienUebersicht } from "@/components/Club/SerienUebersicht";
import { Willkommen } from "@/components/Club/Willkommen";
import styles from "./page.module.css";

/**
 * Die Startseite des Clubs — ein Armaturenbrett, aber eins mit genau
 * einem Hebel: WEITER.
 *
 * Oben die Karte mit der naechsten Folge und dem Stand. Darunter die
 * fuenf Serien, jede mit "3 von 8 gesehen". Live-Termin und Kanal nur,
 * wenn es sie gibt.
 *
 * Kein grosses Bild mehr ueber die volle Breite: wer hereinkommt, will
 * weitermachen, nicht staunen. Das Bild sitzt jetzt in der Karte, neben
 * dem Knopf.
 */
export default async function ClubStart() {
  const sitzung = await verlangeMitglied("/club/");

  /* Die Standbilder werden hier aufgeloest, nicht im Browser: die Adresse
     der Videodateien steht in einer Umgebungsvariablen, und die gehoert
     auf den Server. */
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
    <div className={styles.seite}>
      <Willkommen />

      <p className={styles.gruss}>
        {club.start.grussVor} {vorname.toUpperCase()}.
      </p>

      <NaechsteFolge bilder={bilder} />

      {/* §50: was leer ist, erscheint nicht. */}
      {live.naechster ? (
        <div className={styles.block}>
          <LiveKarte termin={live.naechster} />
        </div>
      ) : null}

      {neuigkeiten.length > 0 ? (
        <section className={`${styles.block} ${styles.woche}`} aria-labelledby="woche">
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
      ) : null}

      <section className={styles.block} aria-labelledby="serien">
        <div className={styles.serienKopf}>
          <h2 id="serien" className={styles.serienTitel}>
            {club.start.serien}
          </h2>
          <Link href="/club/inhalte/" className={styles.serienMehr}>
            {club.start.alleZeigen}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
        <div className={styles.serien}>
          <SerienUebersicht />
        </div>
      </section>
    </div>
  );
}
