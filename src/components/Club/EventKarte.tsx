import Link from "next/link";
import type { ClubEvent } from "@/data/events";
import { club } from "@/data/club";
import { eventDatum, eventStatus } from "@/lib/events";
import { Beispiel } from "./Beispiel";
import styles from "./EventKarte.module.css";

/**
 * Ein Event als Karte: Bild, Datum, Ort, Titel, Status.
 *
 * Der Status wird nicht getippt, er ergibt sich aus Datum und Buchung.
 * "Nur noch 3 Plaetze" gibt es nicht — das koennte niemand nachzaehlen.
 */
export function EventKarte({
  event,
  gross = false,
  zugesagt = false,
}: {
  event: ClubEvent;
  /** Auf der Startseite: breiter, mit Text daneben. */
  gross?: boolean;
  /** Hat das angemeldete Mitglied zugesagt? Steht dann auf der Karte. */
  zugesagt?: boolean;
}) {
  const status = eventStatus(event);

  return (
    <Link
      href={`/club/events/${event.id}/`}
      className={[styles.karte, gross ? styles.gross : "", styles[status]]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.bild}>
        {event.bild ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.bild} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className={styles.ohneBild} aria-hidden="true">
            {event.ort}
          </span>
        )}
        <span className={styles.status}>{club.events.status[status]}</span>
        {zugesagt && status !== "vergangen" ? (
          <span className={styles.zugesagt}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            {club.events.zugesagtKurz}
          </span>
        ) : null}
      </div>

      <div className={styles.text}>
        <p className={styles.wann}>
          <time dateTime={event.datum}>{eventDatum(event)}</time>
          <span className={styles.punkt} aria-hidden="true" />
          {event.ort}
        </p>
        <h3 className={styles.titel}>
          {event.titel} <Beispiel wenn={event.beispiel} />
        </h3>
        {gross ? <p className={styles.beschreibung}>{event.beschreibung}</p> : null}
        <span className={styles.mehr}>
          {club.events.ansehen}
          <span aria-hidden="true"> →</span>
        </span>
      </div>
    </Link>
  );
}
