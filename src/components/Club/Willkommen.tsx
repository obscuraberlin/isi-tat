"use client";

import { useEffect, useState } from "react";
import { club } from "@/data/club";
import { willkommenGesehen, willkommenMerken } from "@/lib/merker";
import styles from "./Willkommen.module.css";

/**
 * Der Gruss beim ersten Mal.
 *
 * Ein Schritt, ein Knopf. Kein Rundgang mit fuenf Seiten und
 * Fortschrittspunkten — wer gerade vierstellig bezahlt hat, will hinein
 * und nicht eingewiesen werden.
 *
 * Gemerkt wird im Browser des Mitglieds. Auf einem zweiten Geraet kommt
 * er also noch einmal. Das ist der Preis dafuer, dass der Server nicht
 * mitschreibt, wer wann zum ersten Mal da war — und es ist der richtige.
 */
export function Willkommen() {
  const [zeigen, setZeigen] = useState(false);

  useEffect(() => {
    /* Erst nach dem Einhaengen entscheiden: auf dem Server gibt es den
       Speicher nicht, und ein Overlay, das bei jedem Aufruf kurz
       aufblitzt, waere schlimmer als keins. */
    if (!willkommenGesehen()) setZeigen(true);
  }, []);

  useEffect(() => {
    if (!zeigen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") schliessen();
    };
    document.addEventListener("keydown", taste);
    /* Die Seite dahinter soll nicht mitscrollen. */
    const vorher = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", taste);
      document.body.style.overflow = vorher;
    };
  }, [zeigen]);

  function schliessen() {
    willkommenMerken();
    setZeigen(false);
  }

  if (!zeigen) return null;

  return (
    <div className={styles.schleier} role="dialog" aria-modal="true" aria-labelledby="willkommen">
      <div className={styles.kasten}>
        <h2 id="willkommen" className={styles.titel}>
          {club.willkommen.titel.map((zeile, i) => (
            <span key={zeile} className={i === 1 ? styles.gold : undefined}>
              {zeile}
            </span>
          ))}
        </h2>

        <p className={styles.text}>{club.willkommen.text}</p>

        <button type="button" className={styles.knopf} onClick={schliessen} autoFocus>
          {club.willkommen.knopf}
        </button>
      </div>
    </div>
  );
}
