"use client";

import { useEffect, useState } from "react";
import type { KursVideo } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { club } from "@/data/club";
import { VideoKarte } from "./VideoKarte";
import styles from "./Weitersehen.module.css";

/**
 * "Weitersehen" — die zuletzt geoeffneten Videos.
 *
 * Das ist ein Lesezeichen, kein Zeugnis: gemerkt wird im Browser des
 * Mitglieds, nicht auf dem Server. Niemand wertet aus, wer was gesehen
 * hat, und es gibt keinen Fortschritt in Prozent.
 *
 * Der Unterschied ist nicht nur Geschmack. Ein Lehrgang, bei dem der
 * Anbieter den Lernerfolg ueberwacht, faellt unter das
 * Fernunterrichtsschutzgesetz und ist zulassungspflichtig. Material
 * bereitstellen ist es nicht. Solange das hier ein Lesezeichen bleibt,
 * bleibt auch die Einordnung klar — deshalb steht es im Browser.
 *
 * Nebenbei erspart es eine Einwilligung: was der Browser fuer den Besucher
 * selbst speichert und nirgends hinschickt, ist keine Datenverarbeitung,
 * die jemand erlauben muesste.
 */

const SCHLUESSEL = "isi-club-zuletzt";
const WIE_VIELE = 4;

/** Merkt sich eine Nummer. Wird von der Videoseite aufgerufen. */
export function merkeVideo(nr: number) {
  try {
    const roh = window.localStorage.getItem(SCHLUESSEL);
    const alt: number[] = roh ? JSON.parse(roh) : [];
    const liste = [nr, ...(Array.isArray(alt) ? alt : []).filter((n) => n !== nr)];
    window.localStorage.setItem(
      SCHLUESSEL,
      JSON.stringify(liste.slice(0, 12).filter((n) => Number.isInteger(n))),
    );
  } catch {
    /* Privates Fenster, voller Speicher, abgeschaltete Seitendaten — dann
       gibt es eben kein Lesezeichen. Nichts daran darf die Seite kosten. */
  }
}

export function Weitersehen({
  videos,
  bilder,
}: {
  videos: readonly KursVideo[];
  /** Standbild je Videonummer — kommt vom Server, wo die Quellen bekannt sind. */
  bilder: Record<number, Kursbild>;
}) {
  /* null = noch nicht nachgesehen. Erst nach dem Einhaengen im Browser
     steht fest, was gespeichert ist; auf dem Server steht es nicht. Wuerde
     hier gleich eine leere Liste stehen, blitzte der Leertext einmal auf,
     bevor die Kacheln erscheinen. */
  const [nummern, setNummern] = useState<number[] | null>(null);

  useEffect(() => {
    try {
      const roh = window.localStorage.getItem(SCHLUESSEL);
      const liste: unknown = roh ? JSON.parse(roh) : [];
      setNummern(Array.isArray(liste) ? liste.filter(Number.isInteger) : []);
    } catch {
      setNummern([]);
    }
  }, []);

  if (nummern === null) return null;

  const zuletzt = nummern
    .map((nr) => videos.find((v) => v.nr === nr))
    .filter((v): v is KursVideo => Boolean(v))
    .slice(0, WIE_VIELE);

  return (
    <section className={styles.block} aria-labelledby="weitersehen">
      <h2 id="weitersehen" className={styles.titel}>
        {club.start.weitersehenTitel}
      </h2>

      {zuletzt.length === 0 ? (
        <p className={styles.leer}>{club.start.weitersehenLeer}</p>
      ) : (
        <div className={styles.reihe}>
          {zuletzt.map((v) => (
            <VideoKarte
              key={v.nr}
              video={v}
              bild={bilder[v.nr].bild}
              eigen={bilder[v.nr].eigen}
            />
          ))}
        </div>
      )}
    </section>
  );
}
