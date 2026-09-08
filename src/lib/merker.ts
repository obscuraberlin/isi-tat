"use client";

/**
 * Kleinkram, den sich der Browser des Mitglieds merkt.
 *
 * Hier nur noch: ob der Gruss beim ersten Mal schon gezeigt wurde. Der
 * Weg durch die Folgen liegt in fortschritt.ts.
 */

const SCHLUESSEL = "isi-club-willkommen";

/** Wurde der Gruss beim ersten Mal schon gezeigt? */
export function willkommenGesehen(): boolean {
  try {
    return window.localStorage.getItem(SCHLUESSEL) === "1";
  } catch {
    /* Im Zweifel gezeigt haben — lieber kein Overlay als jedes Mal eins. */
    return true;
  }
}

export function willkommenMerken() {
  try {
    window.localStorage.setItem(SCHLUESSEL, "1");
  } catch {
    /* dann eben beim naechsten Mal wieder. */
  }
}
