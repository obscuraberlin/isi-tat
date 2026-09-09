"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { club } from "@/data/club";
import type { ZusageArt } from "@/lib/zusagen";
import styles from "./Zusage.module.css";

/**
 * ZUSAGEN / ZUGESAGT — ein Knopf, der seinen Zustand kennt.
 *
 * Nach dem Klick fragt der Server nach; erst seine Antwort aendert den
 * Knopf. Kein optimistisches Umschalten: wenn das Event inzwischen
 * ausgebucht ist, soll das Mitglied nicht drei Sekunden lang "ZUGESAGT"
 * lesen, das dann wieder verschwindet.
 *
 * Daneben der Kalender: eine .ics-Datei vom eigenen Server, kein Dienst
 * von draussen. Und "Absagen" als leiser Textlink — es soll leicht sein,
 * aber nicht aussehen wie der Hauptweg.
 */
export function Zusage({
  art,
  id,
  zugesagt,
  andere,
  offen,
  breit = false,
}: {
  art: ZusageArt;
  id: string;
  zugesagt: boolean;
  andere: number;
  /** Kann man noch zusagen? Absagen geht immer, solange der Termin nicht vorbei ist. */
  offen: boolean;
  /** Auf der Detailseite: Knopf ueber die volle Breite auf dem Telefon. */
  breit?: boolean;
}) {
  const router = useRouter();
  const [stand, setStand] = useState({ zugesagt, andere });
  const [fehler, setFehler] = useState(false);
  const [laeuft, starte] = useTransition();

  function setzen(zusage: boolean) {
    setFehler(false);
    starte(async () => {
      try {
        const antwort = await fetch("/api/zusage/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ art, id, zusage }),
        });
        const daten = await antwort.json();
        if (!antwort.ok || !daten.ok) throw new Error();
        setStand({ zugesagt: daten.zugesagt, andere: daten.andere });
        router.refresh();
      } catch {
        setFehler(true);
      }
    });
  }

  const kalender = `/api/kalender/?art=${art}&id=${encodeURIComponent(id)}`;
  const t = club.zusage;

  return (
    <div className={[styles.block, breit ? styles.breit : ""].filter(Boolean).join(" ")}>
      <div className={styles.reihe}>
        {stand.zugesagt ? (
          <span className={`${styles.knopf} ${styles.fertig}`} aria-live="polite">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {t.zugesagt}
          </span>
        ) : offen ? (
          <button
            type="button"
            className={styles.knopf}
            onClick={() => setzen(true)}
            disabled={laeuft}
          >
            {t.zusagen}
          </button>
        ) : null}
        <a className={styles.kalender} href={kalender}>
          {t.kalender}
        </a>
      </div>

      <p className={styles.stand} aria-live="polite">
        {stand.zugesagt
          ? stand.andere > 0
            ? t.mitAnderen(stand.andere)
            : t.duBist
          : stand.andere > 0
            ? t.andere(stand.andere)
            : null}
        {stand.zugesagt ? (
          <>
            {" "}
            <button
              type="button"
              className={styles.absagen}
              onClick={() => setzen(false)}
              disabled={laeuft}
            >
              {t.absagen}
            </button>
          </>
        ) : null}
      </p>
      {fehler ? <p className={styles.fehler}>{t.fehler}</p> : null}
    </div>
  );
}
