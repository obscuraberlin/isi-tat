import Link from "next/link";
import type { ClubEvent } from "@/data/events";
import { club } from "@/data/club";
import { eventDatum, eventStatus } from "@/lib/events";
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
}: {
  event: ClubEvent;
  /** Auf der Startseite: breiter, mit Text daneben. */
  gross?: boolean;
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
      </div>

      <div className={styles.text}>
        <p className={styles.wann}>
          <time dateTime={event.datum}>{eventDatum(event)}</time>
          <span className={styles.punkt} aria-hidden="true" />
          {event.ort}
        </p>
        <h3 className={styles.titel}>{event.titel}</h3>
        {gross ? <p className={styles.beschreibung}>{event.beschreibung}</p> : null}
        <span className={styles.mehr}>
          {club.events.ansehen}
          <span aria-hidden="true"> →</span>
        </span>
      </div>
    </Link>
  );
}
