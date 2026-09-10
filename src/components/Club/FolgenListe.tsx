"use client";

import Link from "next/link";
import type { KursVideo } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { club } from "@/data/club";
import { useFortschritt } from "@/lib/fortschritt";
import { Media } from "@/components/Media/Media";
import styles from "./FolgenListe.module.css";

/**
 * Die Folgen einer Serie als Liste.
 *
 * Nummer, Standbild, Titel, Zeile darunter. Gesehene Folgen tragen einen
 * Haken, die naechste offene ist normal, alles dahinter ist gedaempft mit
 * Schloss und nicht anklickbar — es oeffnet sich, sobald die Folge davor
 * zu Ende gesehen ist.
 *
 * Die Nummer zaehlt innerhalb der Serie (1, 2, 3 …), nicht im Katalog.
 *
 * Laufzeiten stehen nicht dabei: die Videos sind nicht geschnitten, und
 * eine geratene Minutenzahl waere die erste Luege im Club.
 */
export function FolgenListe({
  folgen,
  bilder,
  aktuell,
}: {
  folgen: readonly KursVideo[];
  bilder: Record<number, Kursbild>;
  /** Die gerade laufende Folge — wird markiert, nicht verlinkt. */
  aktuell?: number;
}) {
  const stand = useFortschritt();

  /* Der Hinweis "Sieh die Folge davor zu Ende" steht nur an der ersten
     gesperrten Folge. Siebenmal untereinander liest ihn niemand mehr, und
     die Zeile darunter behaelt ihren Sinn: worum es in der Folge geht. */
  const ersteZu = stand ? folgen.find((f) => !stand.frei(f.nr))?.nr : undefined;

  return (
    <ol className={styles.liste}>
      {folgen.map((folge, i) => {
        const laeuft = folge.nr === aktuell;
        const gesehen = stand?.gesehen.has(folge.nr) ?? false;
        const prozent = stand ? stand.prozent(folge.nr) : 0;
        const angefangen = prozent > 0 && prozent < 100;
        /* Solange der Stand nicht da ist, gilt alles als offen — der
           Spieler prueft ohnehin noch einmal. */
        const offen = stand ? stand.frei(folge.nr) : true;

        const inhalt = (
          <>
            <span className={styles.nummer} aria-hidden="true">
              {gesehen && !laeuft ? (
                <svg className={styles.haken} viewBox="0 0 12 10" aria-hidden="true">
                  <path d="M1 5.5 4.5 9 11 1" fill="none" strokeWidth="1.8" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span
              className={[
                styles.bild,
                bilder[folge.nr]?.eigen ? "" : styles.geliehen,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Media
                asset={bilder[folge.nr].bild}
                tone="dark"
                radius="8px"
                ratio="16 / 9"
              />
              {angefangen ? (
                <span className={styles.balken} aria-hidden="true">
                  <span className={styles.balkenVoll} style={{ width: `${prozent}%` }} />
                </span>
              ) : null}
              {!offen ? (
                <span className={styles.schloss} aria-hidden="true">
                  <svg viewBox="0 0 12 14">
                    <path d="M3 6V4.5a3 3 0 0 1 6 0V6M2 6h8v7H2z" fill="none" strokeWidth="1.4" />
                  </svg>
                </span>
              ) : null}
            </span>
            <span className={styles.text}>
              <span className={styles.titel}>{folge.titel}</span>
              <span className={styles.unter}>
                {folge.nr === ersteZu ? club.gesperrt.hinweis : folge.unter}
              </span>
              {angefangen ? (
                <span className={styles.prozent}>{club.naechste.folgeStand(prozent)}</span>
              ) : null}
            </span>
          </>
        );

        const klassen = [
          styles.zeile,
          laeuft ? styles.laeuft : "",
          gesehen ? styles.gesehen : "",
          !offen ? styles.zu : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={folge.nr} className={styles.eintrag}>
            {laeuft || !offen ? (
              <span
                className={klassen}
                aria-current={laeuft ? "true" : undefined}
                aria-disabled={!offen ? "true" : undefined}
              >
                {inhalt}
              </span>
            ) : (
              <Link href={`/club/video/${folge.nr}/`} className={klassen}>
                {inhalt}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}
