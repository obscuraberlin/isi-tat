"use client";

import { useEffect, useState } from "react";

/**
 * Was sich der Browser des Mitglieds merkt.
 *
 * Zwei Listen, beide nur hier im Geraet:
 *
 *   zuletzt     welche Videos geoeffnet wurden — traegt "Weiter ansehen"
 *   spaeter     was jemand fuer spaeter gespeichert hat
 *
 * Bewusst nicht auf dem Server. Sobald dort steht, wer wie weit gesehen
 * hat, entsteht eine Nutzungsakte ueber jedes Mitglied — und aus einer
 * Navigationshilfe wird die Ueberwachung eines Lernerfolgs. Genau daran
 * haengt die Zulassungspflicht nach dem Fernunterrichtsschutzgesetz.
 * Hier ist es ein Lesezeichen, nicht mehr.
 *
 * Nebenbei erspart es eine Einwilligung: was der Browser fuer den
 * Besucher selbst ablegt und nirgends hinschickt, muss niemand erlauben.
 *
 * Der Preis: ein neues Geraet faengt bei null an, und ein privates
 * Fenster vergisst alles. Das ist der richtige Tausch.
 */

const SCHLUESSEL = {
  zuletzt: "isi-club-zuletzt",
  spaeter: "isi-club-spaeter",
  willkommen: "isi-club-willkommen",
} as const;

type Liste = keyof Pick<typeof SCHLUESSEL, "zuletzt" | "spaeter">;

/* Damit mehrere Bausteine auf derselben Seite dasselbe sehen: das
   storage-Ereignis des Browsers feuert nur in ANDEREN Tabs, nicht im
   eigenen. Wer sich darauf verlaesst, hat einen Knopf, der erst nach dem
   Neuladen umspringt. */
const horcher = new Set<() => void>();
const melden = () => horcher.forEach((f) => f());

function lies(liste: Liste): number[] {
  try {
    const roh = window.localStorage.getItem(SCHLUESSEL[liste]);
    const wert: unknown = roh ? JSON.parse(roh) : [];
    return Array.isArray(wert) ? wert.filter(Number.isInteger) : [];
  } catch {
    /* Privates Fenster, voller Speicher, abgeschaltete Seitendaten. */
    return [];
  }
}

function schreib(liste: Liste, werte: number[]) {
  try {
    window.localStorage.setItem(
      SCHLUESSEL[liste],
      JSON.stringify(werte.slice(0, 60)),
    );
  } catch {
    /* Nicht speichern zu koennen darf die Seite nichts kosten. */
  }
  melden();
}

/** Nach vorn stellen — die zuletzt geoeffnete Nummer steht immer oben. */
export function merken(liste: Liste, nr: number) {
  schreib(liste, [nr, ...lies(liste).filter((n) => n !== nr)]);
}

export function vergessen(liste: Liste, nr: number) {
  schreib(
    liste,
    lies(liste).filter((n) => n !== nr),
  );
}

export function umschalten(liste: Liste, nr: number) {
  const drin = lies(liste).includes(nr);
  if (drin) vergessen(liste, nr);
  else merken(liste, nr);
  return !drin;
}

/**
 * Die Liste als Zustand.
 *
 * `null`, solange noch nicht nachgesehen wurde. Auf dem Server gibt es
 * den Speicher nicht — stuende hier gleich eine leere Liste, blitzte der
 * Leertext einmal auf, bevor die Kacheln erscheinen.
 */
export function useMerkliste(liste: Liste): number[] | null {
  const [werte, setWerte] = useState<number[] | null>(null);

  useEffect(() => {
    const lesen = () => setWerte(lies(liste));
    lesen();
    horcher.add(lesen);
    /* Ein zweiter Tab desselben Mitglieds soll nicht veralten. */
    window.addEventListener("storage", lesen);
    return () => {
      horcher.delete(lesen);
      window.removeEventListener("storage", lesen);
    };
  }, [liste]);

  return werte;
}

/* ---------- Willkommen ---------- */

/** Wurde der Gruss beim ersten Mal schon gezeigt? */
export function willkommenGesehen(): boolean {
  try {
    return window.localStorage.getItem(SCHLUESSEL.willkommen) === "1";
  } catch {
    /* Im Zweifel gezeigt haben — lieber kein Overlay als jedes Mal eins. */
    return true;
  }
}

export function willkommenMerken() {
  try {
    window.localStorage.setItem(SCHLUESSEL.willkommen, "1");
  } catch {
    /* dann eben beim naechsten Mal wieder. */
  }
}
