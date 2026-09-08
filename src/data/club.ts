/* ==========================================================================
   MITGLIEDERBEREICH — Texte und Kanal
   ==========================================================================

   Alles, was im Club an Text steht, an einer Stelle. Wie bei der
   Startseite gilt: nichts erfunden. Keine Mitgliederzahlen, keine
   Termine, keine Zusagen ueber Kontakte oder Zusammenarbeit.

   Ton: kurz und direkt. ANSEHEN, nicht "Starte jetzt deine Learning
   Journey". Der Club redet mit Erwachsenen, die bezahlt haben — die
   muessen nicht mehr ueberzeugt werden.

   Was hier bewusst NICHT steht — und ohne ausdrueckliche Entscheidung
   auch nicht dazukommen sollte:

     Fortschritt in Prozent, abgehakte Lektionen, Tests, Pruefungen,
     Zertifikate, eine vorgegebene Reihenfolge, Punkte, Abzeichen,
     Bestenlisten.

   Der Grund fuer die erste Haelfte ist nicht Geschmack, sondern das
   Fernunterrichtsschutzgesetz: ein Lehrgang mit Ueberwachung des
   Lernerfolgs ist zulassungspflichtig. Material bereitstellen und sich
   austauschen ist beides nicht. "Weiter ansehen" ist deshalb ein
   Lesezeichen im Browser des Mitglieds — kein Zeugnis.

   Der Grund fuer die zweite Haelfte ist Publikum: Unternehmer mit
   eigenem Betrieb sammeln keine Abzeichen.
   ========================================================================== */

export const club = {
  /* Vier Ziele, mehr nicht. Was leer ist, steht nicht in der Navigation —
     ein Menuepunkt, hinter dem nichts liegt, laesst den Club leerer
     wirken, als er ist. */
  nav: [
    { href: "/club/", label: "START", kuerzel: "Start" },
    { href: "/club/inhalte/", label: "INHALTE", kuerzel: "Inhalte" },
    { href: "/club/live/", label: "LIVE", kuerzel: "Live" },
    { href: "/club/kanal/", label: "KANAL", kuerzel: "Kanal" },
  ],

  /* Im Aufklappmenue oben rechts und hinter "Mehr" auf dem Telefon. */
  konto: {
    titel: "Konto",
    abmelden: "Abmelden",
    mehr: "Mehr",
    schliessen: "Schließen",
  },

  willkommen: {
    titel: ["WILLKOMMEN", "IM CLUB."],
    text: "Hier findest du die Masterclass, Live-Termine und alles, was gerade im Club passiert.",
    knopf: "CLUB ÖFFNEN",
  },

  start: {
    grussVor: "WILLKOMMEN ZURÜCK,",
    weitersehen: "WEITER ANSEHEN",
    serien: "ALLE SERIEN",
    alleZeigen: "Alle Serien",
  },

  /* Die Flaeche ganz oben: nicht ein einzelnes Video, sondern das Ganze.
     Wer hereinkommt, soll in einem Blick wissen, was das hier ist — und
     mit einem Tipp anfangen koennen. */
  hero: {
    headline: "DIE MASTERCLASS.",
    text: "40 Videos in fünf Serien. Erfahrung aus über 20 Jahren — zum Ansehen, dann zum Umsetzen.",
    abspielen: "ABSPIELEN",
    alleFolgen: "ALLE SERIEN",
  },

  inhalte: {
    eyebrow: "Serien",
    headline: "ALLE SERIEN.",
    subline: "Fünf Serien, 40 Folgen. Fang an, wo es bei dir gerade brennt.",
  },

  kapitel: {
    folgen: "FOLGEN",
    andere: "WEITERE SERIEN",
    abspielen: "ABSPIELEN",
  },

  live: {
    eyebrow: "Live",
    headline: "LIVE MIT ISI.",
    subline: "Gespräche, Fragen und Situationen, die gerade anstehen.",
    naechster: "NÄCHSTER TERMIN",
    beitreten: "LIVE BEITRETEN",
    kommende: "KOMMENDE TERMINE",
    aufzeichnungen: "AUFZEICHNUNGEN",
    aufzeichnungAnsehen: "AUFZEICHNUNG ANSEHEN",
    /* §64: kein erfundener Termin, aber auch kein leeres Loch. */
    leer: "Der nächste Termin wird hier angekündigt.",
    leerText:
      "Sobald ein Termin steht, findest du ihn hier und auf der Startseite.",
  },

  /* Unter dem Video so wenig wie moeglich: worum es geht, die Themen als
     Stichworte, der Rest zum Aufklappen. Wer das Video ansieht, will
     nicht danach noch eine Seite lesen. */
  video: {
    kern: "ÜBER DIESES VIDEO",
    themen: "THEMEN",
    aufklappen: "DEINE UMSETZUNG & ISI RULES",
    aufgabe: "Deine Umsetzung",
    regeln: "ISI Rules",
    weitere: "ALLE FOLGEN",
    aufgabeHinweis:
      "Nichts davon wird eingereicht oder bewertet. Die Aufgabe steht hier, weil ein Video, aus dem nichts folgt, nur Unterhaltung war.",
    nochNicht: "Dieses Video wird gerade produziert.",
    nochNichtText:
      "Sobald es geschnitten ist, läuft es an dieser Stelle — ohne dass du etwas tun musst.",
  },

  kanal: {
    eyebrow: "Kanal",
    headline: "NACHRICHTEN AUS DEM CLUB.",
    lead: "Hier schreibt ISI. Termine, Hinweise, neue Inhalte.",
    hinweis:
      "Der Kanal ist zum Lesen. Wenn du etwas besprechen willst, bring es in die nächste Live-Runde mit.",
    leer: "Hier steht noch nichts.",
    leerText:
      "Sobald es etwas zu sagen gibt — ein Termin, ein neues Video, eine Änderung — findest du es an dieser Stelle.",
    dieseWoche: "DIESE WOCHE IM CLUB",
    alleZeigen: "Alle Nachrichten",
  },
} as const;

/**
 * Welches Video oben auf der Startseite steht.
 *
 * Nummer 1 ist der Einstieg der Masterclass — wer zum ersten Mal
 * hereinkommt, soll dort anfangen. Sobald es neuere Videos gibt, gehoert
 * hier eine andere Nummer hin; das ist eine redaktionelle Entscheidung
 * und deshalb eine Zahl an einer Stelle, kein Automatismus.
 */
export const startVideoNr = 1;

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
 *      die dieselbe Liste enthaelt. Dann geht es ohne Deploy.
 *
 * Aus der Seite heraus schreiben zu koennen braeuchte eine Datenbank und
 * eine Anmeldung mit Rechten; das ist ein eigener Schritt.
 */
export const nachrichten: readonly Nachricht[] = [];
