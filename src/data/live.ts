/* ==========================================================================
   LIVE — Termine mit ISI
   ==========================================================================

   Noch keiner eingetragen, und das bleibt so, bis es einen gibt. Ein
   erfundener Termin auf einer Seite, fuer die jemand vierstellig bezahlt
   hat, ist der schnellste Weg, Vertrauen zu verlieren — und beim ersten
   Mal, dass niemand erscheint, ist es auch rechtlich keine Kleinigkeit
   mehr.

   Zwei Wege, einen Termin zu veroeffentlichen:

     1. Hier eintragen und neu bereitstellen.
     2. CLUB_LIVE_DATEI auf eine JSON-Datei mit derselben Liste zeigen
        lassen — dann geht es ohne Deploy.

   Solange die Liste leer ist, zeigt der Club den Leerzustand: "Der
   naechste Termin wird hier angekuendigt." Kein Knopf, der ins Leere
   fuehrt.
   ========================================================================== */

export interface LiveTermin {
  id: string;
  /** Worum es geht. Kurz. */
  titel: string;
  /** ISO-Datum, z. B. "2026-10-14". */
  datum: string;
  /** "19:00" — Ortszeit Berlin. */
  beginn: string;
  /** "20:30". Optional; ohne Angabe steht nur der Beginn. */
  ende?: string;
  /** Zwei bis vier Zeilen, nicht mehr. */
  beschreibung?: string;
  /**
   * Wohin zum Beitreten. Fehlt sie, gibt es keinen Knopf — lieber kein
   * Knopf als einer, der nichts tut.
   */
  beitreten?: string;
  /** Aufzeichnung, sobald sie vorliegt. */
  aufzeichnung?: string;
  /** Steht nur an Beispielen aus beispiele.ts — wird als solches angezeigt. */
  beispiel?: boolean;
}

export const liveTermine: readonly LiveTermin[] = [];
