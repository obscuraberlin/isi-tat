import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { eventDatum, eventMit, eventStatus } from "@/lib/events";
import { zusageStand } from "@/lib/zusagen";
import { Beispiel } from "@/components/Club/Beispiel";
import { Zusage } from "@/components/Club/Zusage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Ein Event: grosses Bild, Titel, Datum, Ort, Beschreibung, was einen
 * erwartet — und die Zusage.
 *
 * Offen: ZUSAGEN und Kalender. Ausgebucht: nur, wer schon zugesagt hat,
 * sieht seine Zusage (und kann absagen). Vergangen: der Status, sonst
 * nichts. "Teilnahme anfragen" gibt es zusaetzlich, wenn beim Event eine
 * Adresse dafuer steht — kein Knopf ohne Ziel.
 */
export default async function EventSeite({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = eventMit(id);
  if (!event) notFound();

  const sitzung = await verlangeMitglied(`/club/events/${event.id}/`);
  const status = eventStatus(event);
  const stand = zusageStand("event", event.id, sitzung.email);

  return (
    <article className={styles.seite}>
      <nav className={styles.pfad} aria-label="Wo du bist">
        <Link href="/club/events/" className={styles.pfadLink}>
          {club.events.zurueck}
        </Link>
      </nav>

      <div className={[styles.bild, event.bild ? "" : styles.ohneBild].filter(Boolean).join(" ")}>
        {event.bild ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.bild} alt="" decoding="async" />
        ) : (
          <span aria-hidden="true">{event.ort}</span>
        )}
      </div>

      <header className={styles.kopf}>
        <p className={styles.status} data-status={status}>
          {club.events.status[status]}
        </p>{" "}
        <Beispiel wenn={event.beispiel} />
        <h1 className={styles.titel}>{event.titel}</h1>
        <p className={styles.wann}>
          <time dateTime={event.datum}>{eventDatum(event)}</time>
          <span className={styles.punkt} aria-hidden="true" />
          {event.ort}
        </p>
      </header>

      <p className={styles.beschreibung}>{event.beschreibung}</p>

      {event.erwartet && event.erwartet.length > 0 ? (
        <section className={styles.block}>
          <h2 className={styles.blockTitel}>{club.events.erwartet}</h2>
          <ul className={styles.liste}>
            {event.erwartet.map((punkt) => (
              <li key={punkt} className={styles.punktZeile}>
                {punkt}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {status !== "vergangen" && (status === "offen" || stand.zugesagt) ? (
        <div className={styles.zusage}>
          <Zusage
            art="event"
            id={event.id}
            zugesagt={stand.zugesagt}
            andere={stand.andere}
            offen={status === "offen"}
            breit
          />
        </div>
      ) : null}

      {status === "offen" && event.anfrage ? (
        <a
          className={styles.knopf}
          href={event.anfrage}
          {...(event.anfrage.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {club.events.anfragen}
        </a>
      ) : null}
    </article>
  );
}
