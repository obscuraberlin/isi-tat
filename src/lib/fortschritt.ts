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
/* Wo man in einer Folge stehen geblieben ist: { "7": { t: 812, d: 1420 } }
   — Sekunden und Laufzeit. Daraus wird "57 %" und der Balken. */
const SCHLUESSEL_POS = "isi-club-position";

export interface Position {
  t: number;
  d: number;
}

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

function liesPositionen(): Record<number, Position> {
  try {
    const roh = window.localStorage.getItem(SCHLUESSEL_POS);
    const wert: unknown = roh ? JSON.parse(roh) : {};
    if (!wert || typeof wert !== "object") return {};
    const aus: Record<number, Position> = {};
    for (const [k, v] of Object.entries(wert as Record<string, unknown>)) {
      const pos = v as Position;
      if (Number.isInteger(Number(k)) && pos && pos.d > 0 && pos.t >= 0) {
        aus[Number(k)] = { t: pos.t, d: pos.d };
      }
    }
    return aus;
  } catch {
    return {};
  }
}

/**
 * Position merken — oder loeschen (t = null), wenn die Folge zu Ende ist.
 * Wird alle paar Sekunden aus dem Spieler aufgerufen; die Horcher
 * bekommen es nur mit, wenn sich der Prozentwert aendert, sonst
 * rendert jede Sekunde die halbe Seite neu.
 */
export function positionMerken(nr: number, t: number | null, d = 0) {
  const alt = liesPositionen();
  const vorher = alt[nr] ? Math.round((alt[nr].t / alt[nr].d) * 100) : 0;
  if (t === null) delete alt[nr];
  else if (d > 0) alt[nr] = { t: Math.round(t), d: Math.round(d) };
  else return;
  try {
    window.localStorage.setItem(SCHLUESSEL_POS, JSON.stringify(alt));
  } catch {
    /* dann eben nicht */
  }
  const nachher = alt[nr] ? Math.round((alt[nr].t / alt[nr].d) * 100) : 0;
  if (vorher !== nachher) horcher.forEach((f) => f());
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
export function auswerten(
  gesehen: readonly number[],
  positionen: Record<number, Position> = {},
) {
  const satz = new Set(gesehen);
  const alle = REIHENFOLGE.every((nr) => satz.has(nr));

  /* Wie viel von einer Folge gesehen ist: 100 fuer gesehene, sonst die
     Position im Verhaeltnis zur Laufzeit. Nur eine Zahl fuer den Balken —
     der Server bekommt sie nie. */
  const prozent = (nr: number) => {
    if (satz.has(nr)) return 100;
    const p = positionen[nr];
    if (!p) return 0;
    return Math.min(99, Math.max(1, Math.round((p.t / p.d) * 100)));
  };

  /* Stand einer Serie: gesehene Folgen und Prozent daraus. */
  const serie = (nrs: readonly number[]) => {
    const g = nrs.filter((nr) => satz.has(nr)).length;
    return {
      gesehen: g,
      gesamt: nrs.length,
      prozent: nrs.length ? Math.round((g / nrs.length) * 100) : 0,
      begonnen: g > 0 || nrs.some((nr) => positionen[nr]),
    };
  };

  /* Die zuletzt begonnene, noch nicht gesehene Folge — dort geht es
     weiter, mitten im Video. */
  const begonnen = REIHENFOLGE.filter((nr) => positionen[nr] && !satz.has(nr));

  const frei = (nr: number) => {
    if (alle || satz.has(nr)) return true;
    const i = REIHENFOLGE.indexOf(nr);
    if (i <= 0) return i === 0;
    return satz.has(REIHENFOLGE[i - 1]);
  };

  /* Die naechste, die noch nicht gesehen ist — dort geht es weiter.
     Sind alle gesehen, die erste: von vorn ist auch ein Weg. */
  const naechste = REIHENFOLGE.find((nr) => !satz.has(nr)) ?? REIHENFOLGE[0];

  return {
    gesehen: satz,
    alle,
    frei,
    naechste,
    anzahl: satz.size,
    prozent,
    serie,
    position: (nr: number) => positionen[nr] ?? null,
    /* Die naechste, wenn man mitten in einer Folge aufgehoert hat, sonst
       die naechste ungesehene. */
    weiterBei: begonnen.find((nr) => frei(nr)) ?? naechste,
  };
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
    const lesen = () => setStand(auswerten(lies(), liesPositionen()));
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
