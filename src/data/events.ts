/* ==========================================================================
   EVENTS — Treffen in echt
   ==========================================================================

   Noch keins eingetragen. Ein erfundenes Event mit Ort und Datum waere
   auf einer Seite, fuer die jemand vierstellig bezahlt hat, keine
   Platzhalterei mehr, sondern eine Zusage.

   Zwei Wege, ein Event zu veroeffentlichen:

     1. Hier eintragen und neu bereitstellen.
     2. CLUB_EVENTS_DATEI auf eine JSON-Datei mit derselben Liste zeigen
        lassen — dann geht es ohne Deploy.

   Status ergibt sich, er wird nicht getippt: liegt das Datum zurueck, ist
   das Event vergangen; steht `ausgebucht`, ist es das; sonst ist die
   Anmeldung offen. Keine erfundene Knappheit — "nur noch 3 Plaetze"
   gibt es hier nicht, weil es niemand nachzaehlen kann.

   Ein Knopf "Teilnahme anfragen" erscheint nur, wenn `anfrage` gesetzt
   ist: eine Adresse (mailto: oder https:). Ohne Adresse kein Knopf.
   ========================================================================== */

export interface ClubEvent {
  id: string;
  titel: string;
  /** "Berlin" oder "Hamburg, Speicherstadt" — so genau, wie ISI es sagen will. */
  ort: string;
  /** ISO-Datum, z. B. "2026-11-14". */
  datum: string;
  /** Letzter Tag bei mehrtaegigen Events. */
  ende?: string;
  /** Zwei bis vier Zeilen. */
  beschreibung: string;
  /** "Was dich erwartet" — drei bis fuenf kurze Punkte. */
  erwartet?: readonly string[];
  /** Bild, z. B. "/media/events/berlin-2026.jpg". Ohne Bild traegt die Karte den Titel allein. */
  bild?: string;
  ausgebucht?: boolean;
  /** Wohin die Anfrage geht: "mailto:..." oder eine https-Adresse. */
  anfrage?: string;
  /** Steht nur an Beispielen aus beispiele.ts — wird als solches angezeigt. */
  beispiel?: boolean;
}

export const clubEvents: readonly ClubEvent[] = [];
