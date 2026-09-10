import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel } from "@/data/masterclass";
import { club } from "@/data/club";
import { kursBildAsset, type Kursbild } from "@/lib/kursMedien";
import { liveDaten } from "@/lib/live";
import { feed, datumLang } from "@/lib/news";
import { eventDaten } from "@/lib/events";
import { LiveKarte } from "@/components/Club/LiveKarte";
import { EventKarte } from "@/components/Club/EventKarte";
import { NaechsteFolge } from "@/components/Club/NaechsteFolge";
import { SerienUebersicht } from "@/components/Club/SerienUebersicht";
import { Willkommen } from "@/components/Club/Willkommen";
import { Beispiel } from "@/components/Club/Beispiel";
import { zusageStand } from "@/lib/zusagen";
import styles from "./page.module.css";

/**
 * Die Startseite des Clubs — ein Armaturenbrett, aber eins mit genau
 * einem Hebel: WEITER.
 *
 * Oben die Karte mit der naechsten Folge und dem Stand. Dann, nur wenn
 * es sie gibt: der naechste Live-Termin, das naechste Event, Neues aus
 * den News. Darunter die fuenf Serien, jede mit "3 von 8 gesehen".
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
  const events = eventDaten();
  const news = (await feed()).slice(0, 4);
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
          <LiveKarte termin={live.naechster} email={sitzung.email} />
        </div>
      ) : null}

      {events.naechstes ? (
        <section className={styles.block} aria-labelledby="event">
          <div className={styles.blockKopf}>
            <h2 id="event" className={styles.blockTitel}>
              {club.events.naechstes}
            </h2>
            <Link href="/club/events/" className={styles.blockMehr}>
              {club.events.zurueck}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
          <EventKarte
            event={events.naechstes}
            gross
            zugesagt={zusageStand("event", events.naechstes.id, sitzung.email).zugesagt}
          />
        </section>
      ) : null}

      {news.length > 0 ? (
        <section className={`${styles.block} ${styles.news}`} aria-labelledby="news">
          <div className={styles.newsKopf}>
            <h2 id="news" className={styles.blockTitel}>
              {club.news.neu}
            </h2>
            <Link href="/club/kanal/" className={styles.blockMehr}>
              {club.news.alleZeigen}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
          <ul className={styles.newsListe}>
            {news.map((n) => {
              const zeile = (
                <>
                  <time className={styles.newsDatum} dateTime={n.datum}>
                    {datumLang(n.datum)}
                  </time>
                  <span className={styles.newsQuelle}>{club.news.quelle[n.quelle]}</span>
                  <span className={styles.newsText}>
                    {n.titel} <Beispiel wenn={n.beispiel} />
                  </span>
                </>
              );
              return (
                <li key={n.id} className={styles.newsZeile}>
                  {n.link ? (
                    <a href={n.link} className={styles.newsVerweis} target="_blank" rel="noreferrer noopener">
                      {zeile}
                    </a>
                  ) : (
                    zeile
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className={styles.block} aria-labelledby="serien">
        <div className={styles.blockKopf}>
          <h2 id="serien" className={styles.serienTitel}>
            {club.start.serien}
          </h2>
          <Link href="/club/inhalte/" className={styles.blockMehr}>
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
