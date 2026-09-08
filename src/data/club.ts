/* ==========================================================================
   MITGLIEDERBEREICH — Texte und Kanal
   ==========================================================================

   Alles, was im Club an Text steht, an einer Stelle. Wie bei der
   Startseite gilt: nichts erfunden. Keine Mitgliederzahlen, keine
   Termine, keine Zusagen ueber Kontakte oder Zusammenarbeit.

   Was hier bewusst NICHT steht — und ohne ausdrueckliche Entscheidung
   auch nicht dazukommen sollte:

     Fortschrittsbalken ueber den ganzen Kurs, abgehakte Lektionen,
     Tests, Pruefungen, Zertifikate, eine vorgegebene Reihenfolge.

   Der Grund ist nicht Geschmack, sondern das Fernunterrichtsschutzgesetz:
   ein Lehrgang mit Ueberwachung des Lernerfolgs ist zulassungspflichtig.
   Material bereitstellen und sich austauschen ist beides nicht. Wo hier
   "Weitersehen" steht, ist damit ein Lesezeichen im Browser des
   Mitglieds gemeint — kein Zeugnis.
   ========================================================================== */

export const club = {
  /* Die Marke bleibt dieselbe wie draussen, der Ton wird ruhiger: wer
     hier ist, muss nicht mehr ueberzeugt werden. */
  nav: [
    { href: "/club/", label: "MASTERCLASS" },
    { href: "/club/kanal/", label: "KANAL" },
  ],

  start: {
    /* Die Anrede kommt aus der Mitgliederliste, nicht von hier. */
    grussVor: "WILLKOMMEN ZURÜCK,",
    eyebrow: "Dein Bereich",
    lead: "40 Videos. 5 Kapitel. Fang an, wo es bei dir gerade brennt.",
    /* Kein Pflichtweg — dieselbe Haltung wie auf der Startseite. */
    hinweis:
      "Es gibt keine Reihenfolge, die du einhalten musst. Steig dort ein, wo du gerade eine konkrete Entscheidung vor dir hast — oder arbeite die Masterclass der Reihe nach durch.",
    weitersehenTitel: "WEITERSEHEN",
    weitersehenLeer:
      "Sobald du ein Video geöffnet hast, findest du es hier wieder.",
    alleAnsehen: "Alle Videos im Kapitel",
  },

  video: {
    kern: "WORUM ES GEHT",
    gliederung: "IM VIDEO",
    aufgabe: "DEINE UMSETZUNG",
    regeln: "ISI RULES",
    davor: "Vorheriges Video",
    danach: "Nächstes Video",
    zurueck: "Zur Übersicht",
    /* Steht unter der Aufgabe. Nimmt der Aufgabe ausdruecklich den
       Pruefungscharakter — und sagt gleichzeitig, warum sie da ist. */
    aufgabeHinweis:
      "Nichts davon wird eingereicht oder bewertet. Die Aufgabe steht hier, weil ein Video, aus dem nichts folgt, nur Unterhaltung war.",
    /* Wenn noch kein Video hinterlegt ist. Ehrlich statt kaputt. */
    nochNicht: "Dieses Video ist noch nicht hinterlegt.",
    nochNichtText:
      "Die Masterclass wird gerade produziert. Sobald dieses Video fertig geschnitten ist, läuft es an dieser Stelle — ohne dass du etwas tun musst.",
  },

  kanal: {
    eyebrow: "Kanal",
    headline: "NACHRICHTEN AUS DEM CLUB.",
    lead: "Hier schreibt ISI. Termine für Live-Runden, Hinweise, neue Videos.",
    /* Der Kanal geht in eine Richtung. Das ist eine Entscheidung, keine
       Luecke — deshalb steht sie auch auf der Seite. */
    hinweis:
      "Der Kanal ist zum Lesen. Wenn du etwas besprechen willst, bring es in die nächste Live-Runde mit.",
    leer: "Hier steht noch nichts.",
    leerText:
      "Sobald es etwas zu sagen gibt — ein Termin, ein neues Video, eine Änderung — findest du es an dieser Stelle.",
  },

  abmelden: "Abmelden",
} as const;

export interface Nachricht {
  /** Datum als ISO, z. B. "2026-09-14". Sortiert wird danach. */
  datum: string;
  titel: string;
  /** Ein Absatz je Eintrag. */
  text: readonly string[];
}

/**
 * Was im Kanal steht.
 *
 * Noch nichts — und das bleibt so, bis ISI die erste Nachricht schreibt.
 * Hier etwas hinzuschreiben, damit die Seite voller aussieht, hiesse ihm
 * Worte in den Mund zu legen.
 *
 * Zwei Wege, eine Nachricht zu veroeffentlichen:
 *
 *   1. Hier eintragen und neu bereitstellen. Format:
 *
 *        {
 *          datum: "2026-09-14",
 *          titel: "Nächste Live-Runde",
 *          text: ["Erster Absatz.", "Zweiter Absatz."],
 *        }
 *
 *   2. CLUB_KANAL_DATEI auf eine JSON-Datei auf dem Server zeigen lassen,
 *      die dieselbe Liste enthaelt. Dann geht es ohne Deploy — die Datei
 *      aendern reicht.
 *
 * Beides ist Handarbeit. Aus der Seite heraus schreiben zu koennen
 * braeuchte eine Datenbank und eine Anmeldung mit Rechten; das ist ein
 * eigener Schritt, keine Zeile nebenbei.
 */
export const nachrichten: readonly Nachricht[] = [];
