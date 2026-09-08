"use client";

import { useEffect, useState } from "react";
import { kursVideos } from "@/data/masterclass";

/**
 * Der Weg durch die Masterclass: eine Folge nach der anderen.
 *
 * Folge 1 ist offen. Jede weitere oeffnet sich, sobald die davor gesehen
 * ist. Sind alle vierzig gesehen, ist alles offen und man springt, wohin
 * man will. Gesehene Folgen bleiben immer offen — zurueckgehen darf man.
 *
 * Auf ausdrueckliche Anweisung des Auftraggebers.
 *
 * [FERNUSG REVIEW] Eine vorgegebene Reihenfolge ist einer der Punkte, die
 * das Briefing selbst zur Pruefung markiert. Deshalb liegt der Stand
 * ausschliesslich im Browser des Mitglieds: der Server erfaehrt nicht,
 * wer wie weit ist, und kann es nicht auswerten. Das haelt es bei
 * Navigation — eine Ueberwachung des Lernerfolgs durch den Anbieter
 * findet nicht statt. Ob das reicht, entscheidet ein Anwalt, nicht
 * dieser Kommentar.
 *
 * Der Preis der Browser-Loesung: ein neues Geraet faengt bei 1 an, ein
 * privates Fenster vergisst alles.
 *
 * "Gesehen" heisst: das Video ist bis (fast) zum Ende gelaufen — oder,
 * solange noch keine Datei da ist, das Mitglied hat auf WEITER gedrueckt.
 * Ohne diesen zweiten Weg waere die Masterclass vor dem ersten Schnitt
 * bei Folge 1 zu Ende.
 */

const SCHLUESSEL = "isi-club-gesehen";

/** Die Reihenfolge — so, wie die Folgen im Katalog stehen. */
export const REIHENFOLGE: readonly number[] = kursVideos.map((v) => v.nr);

const horcher = new Set<() => void>();

function lies(): number[] {
  try {
    const roh = window.localStorage.getItem(SCHLUESSEL);
    const wert: unknown = roh ? JSON.parse(roh) : [];
    return Array.isArray(wert) ? wert.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

export function gesehenMerken(nr: number) {
  const alt = lies();
  if (alt.includes(nr)) return;
  try {
    window.localStorage.setItem(SCHLUESSEL, JSON.stringify([...alt, nr]));
  } catch {
    /* Privates Fenster, voller Speicher — dann eben nicht. */
  }
  horcher.forEach((f) => f());
}

/** Alles, was sich aus der Liste der gesehenen Folgen ergibt. */
export function auswerten(gesehen: readonly number[]) {
  const satz = new Set(gesehen);
  const alle = REIHENFOLGE.every((nr) => satz.has(nr));

  const frei = (nr: number) => {
    if (alle || satz.has(nr)) return true;
    const i = REIHENFOLGE.indexOf(nr);
    if (i <= 0) return i === 0;
    return satz.has(REIHENFOLGE[i - 1]);
  };

  /* Die naechste, die noch nicht gesehen ist — dort geht es weiter.
     Sind alle gesehen, die erste: von vorn ist auch ein Weg. */
  const naechste = REIHENFOLGE.find((nr) => !satz.has(nr)) ?? REIHENFOLGE[0];

  return { gesehen: satz, alle, frei, naechste, anzahl: satz.size };
}

export type Fortschritt = ReturnType<typeof auswerten>;

/**
 * Der Stand als Zustand. `null`, solange noch nicht nachgesehen wurde —
 * auf dem Server gibt es den Speicher nicht, und wer vorher rendert,
 * zeigt kurz alles gesperrt, bevor es aufgeht.
 */
export function useFortschritt(): Fortschritt | null {
  const [stand, setStand] = useState<Fortschritt | null>(null);

  useEffect(() => {
    const lesen = () => setStand(auswerten(lies()));
    lesen();
    horcher.add(lesen);
    window.addEventListener("storage", lesen);
    return () => {
      horcher.delete(lesen);
      window.removeEventListener("storage", lesen);
    };
  }, []);

  return stand;
}
