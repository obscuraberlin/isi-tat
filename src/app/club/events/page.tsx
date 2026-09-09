import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { eventDaten } from "@/lib/events";
import { EventKarte } from "@/components/Club/EventKarte";
import { zusageStand } from "@/lib/zusagen";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Events — Treffen in echt.
 *
 * Kommende oben, vergangene darunter. Solange keins eingetragen ist,
 * steht genau ein Satz: dass das naechste hier angekuendigt wird. Kein
 * Platzhalter-Event mit erfundenem Ort.
 */
export default async function EventsSeite() {
  const sitzung = await verlangeMitglied("/club/events/");
  const { kommend, vergangen } = eventDaten();
  const zugesagt = (id: string) => zusageStand("event", id, sitzung.email).zugesagt;

  return (
    <div className={styles.seite}>
      <header className={styles.kopf}>
        <p className={styles.eyebrow}>{club.events.eyebrow}</p>
        <h1 className={styles.titel}>{club.events.headline}</h1>
        <p className={styles.lead}>{club.events.lead}</p>
      </header>

      {kommend.length === 0 && vergangen.length === 0 ? (
        <div className={styles.leer}>
          <p className={styles.leerTitel}>{club.events.leer}</p>
          <p className={styles.leerText}>{club.events.leerText}</p>
        </div>
      ) : null}

      {kommend.length > 0 ? (
        <section className={styles.block} aria-labelledby="kommend">
          <h2 id="kommend" className={styles.blockTitel}>
            {club.events.kommende}
          </h2>
          <div className={styles.raster}>
            {kommend.map((e) => (
              <EventKarte key={e.id} event={e} zugesagt={zugesagt(e.id)} />
            ))}
          </div>
        </section>
      ) : null}

      {vergangen.length > 0 ? (
        <section className={styles.block} aria-labelledby="vergangen">
          <h2 id="vergangen" className={styles.blockTitel}>
            {club.events.vergangene}
          </h2>
          <div className={styles.raster}>
            {vergangen.map((e) => (
              <EventKarte key={e.id} event={e} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
