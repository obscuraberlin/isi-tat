/* ==========================================================================
   MITGLIEDERBEREICH — Texte und News
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
    { href: "/club/news/", label: "NEWS", kuerzel: "News" },
  ],
  /* Auf dem Desktop in der Kopfzeile, auf dem Telefon hinter "Mehr" —
     fuenf Punkte und "Mehr" passen unten nicht nebeneinander. */
  navMehr: [{ href: "/club/events/", label: "EVENTS", kuerzel: "Events" }],

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
    serien: "DEINE SERIEN",
    alleZeigen: "Alle Serien",
  },

  /* Die Karte ganz oben: wo es weitergeht. Ein Bild, die Folge, ein Knopf. */
  naechste: {
    eyebrow: "DEINE NÄCHSTE FOLGE",
    eyebrowAnfang: "HIER GEHT ES LOS",
    eyebrowFertig: "ALLE FOLGEN GESEHEN",
    weiter: "WEITER",
    anfangen: "ABSPIELEN",
    nochmal: "VON VORN",
    /* "12 von 40 Folgen gesehen" — Zaehlung, kein Zeugnis. */
    stand: (gesehen: number, gesamt: number) =>
      `${gesehen} von ${gesamt} Folgen gesehen`,
    fertigText: "Ab jetzt kannst du jede Folge direkt öffnen.",
  },

  /* Folgen, die noch zu sind. */
  gesperrt: {
    kurz: "Noch gesperrt",
    hinweis: "Sieh die Folge davor zu Ende, dann öffnet sich diese.",
  },

  inhalte: {
    eyebrow: "Serien",
    headline: "ALLE SERIEN.",
    subline: "Fünf Serien, 40 Folgen. Fang an, wo es bei dir gerade brennt.",
  },

  kapitel: {
    folgen: "FOLGEN",
    abspielen: "ABSPIELEN",
    weiter: "WEITER",
    naechsteOffene: "ZUR NÄCHSTEN OFFENEN FOLGE",
    /* "3 von 8 gesehen" unter dem Plakat. */
    stand: (gesehen: number, gesamt: number) => `${gesehen} von ${gesamt} gesehen`,
  },

  live: {
    eyebrow: "Live",
    headline: "LIVE MIT ISI.",
    subline: "Gespräche, Fragen und Situationen, die gerade anstehen.",
    naechster: "NÄCHSTER TERMIN",
    beitreten: "LIVE BEITRETEN",
    kommende: "KOMMENDE TERMINE",
    vergangene: "VERGANGENE TERMINE",
    vergangen: "Vergangen",
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
    /* Nach dem Ende: die naechste Folge, mit Countdown. */
    naechsteStartet: "Nächste Folge startet in",
    jetzt: "JETZT",
    bleiben: "HIER BLEIBEN",
    naechsteFolge: "NÄCHSTE FOLGE",
    gesehenWeiter: "GESEHEN — WEITER",
    fertig: "Das war die letzte Folge.",
    aufgabeHinweis:
      "Nichts davon wird eingereicht oder bewertet. Die Aufgabe steht hier, weil ein Video, aus dem nichts folgt, nur Unterhaltung war.",
    nochNicht: "Dieses Video wird gerade produziert.",
    nochNichtText:
      "Sobald es geschnitten ist, läuft es an dieser Stelle — ohne dass du etwas tun musst.",
  },

  news: {
    eyebrow: "News",
    headline: "NEUES IM CLUB.",
    lead: "Hier schreibt ISI. Termine, Hinweise, neue Folgen, Events.",
    hinweis:
      "Der Feed ist zum Lesen. Wenn du etwas besprechen willst, bring es in die nächste Live-Runde mit.",
    leer: "Hier steht noch nichts.",
    leerText:
      "Sobald es etwas zu sagen gibt — ein Termin, eine neue Folge, ein Event — findest du es an dieser Stelle.",
    neu: "NEUES IM CLUB",
    alleZeigen: "Alle News",
    /* Woher ein Eintrag kommt — steht klein ueber dem Titel. */
    quelle: {
      club: "Im Club",
      youtube: "YouTube",
      instagram: "Instagram",
    },
    ansehen: "ANSEHEN",
  },

  /* Zusagen — fuer Events und Live-Termine gleich. Eine Zusage ist kein
     Ticket: sie sagt ISI, mit wem er rechnen kann, und laesst sich
     jederzeit zuruecknehmen. */
  zusage: {
    zusagen: "ZUSAGEN",
    zugesagt: "ZUGESAGT",
    absagen: "Absagen",
    kalender: "+ ZUM KALENDER",
    duBist: "Du hast zugesagt.",
    /* "Du und 3 weitere haben zugesagt." */
    mitAnderen: (n: number) =>
      n === 1 ? "Du und 1 weiteres Mitglied haben zugesagt." : `Du und ${n} weitere haben zugesagt.`,
    andere: (n: number) => (n === 1 ? "1 Mitglied hat zugesagt." : `${n} Mitglieder haben zugesagt.`),
    fehler: "Das hat gerade nicht geklappt. Versuch es gleich noch einmal.",
  },

  events: {
    eyebrow: "Events",
    headline: "TREFFEN IN ECHT.",
    lead: "Wenn es passt, trifft man sich. Hier stehen die Termine.",
    naechstes: "NÄCHSTES EVENT",
    kommende: "KOMMENDE EVENTS",
    vergangene: "VERGANGENE EVENTS",
    ansehen: "EVENT ANSEHEN",
    anfragen: "TEILNAHME ANFRAGEN",
    erwartet: "WAS DICH ERWARTET",
    zurueck: "Alle Events",
    status: {
      offen: "Zusagen offen",
      ausgebucht: "Ausgebucht",
      vergangen: "Vergangen",
    },
    zugesagtKurz: "Zugesagt",
    leer: "Das nächste Event wird hier angekündigt.",
    leerText:
      "Sobald ein Termin und ein Ort feststehen, findest du beides hier — und auf der Startseite.",
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
  /** Optional ein Bild, z. B. "/media/news/live-oktober.jpg". */
  bild?: string;
  /** Steht nur an Beispielen aus beispiele.ts — wird als solches angezeigt. */
  beispiel?: boolean;
}

/**
 * Was im News-Feed steht.
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
 *          bild: "/media/news/live-oktober.jpg",   // optional
 *        }
 *
 *   2. CLUB_NEWS_DATEI auf eine JSON-Datei auf dem Server zeigen lassen,
 *      die dieselbe Liste enthaelt. Dann geht es ohne Deploy.
 *
 * Aus der Seite heraus schreiben zu koennen braeuchte eine Datenbank und
 * eine Anmeldung mit Rechten; das ist ein eigener Schritt.
 */
export const nachrichten: readonly Nachricht[] = [];
