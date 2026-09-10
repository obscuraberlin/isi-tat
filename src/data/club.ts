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
    { href: "/club/kanal/", label: "CLUB", kuerzel: "Club" },
  ],
  /* Auf dem Desktop in der Kopfzeile, auf dem Telefon unter MEHR —
     fuenf Punkte und "Mehr" passen unten nicht nebeneinander. */
  navMehr: [{ href: "/club/events/", label: "EVENTS", kuerzel: "Events" }],

  /* Im Aufklappmenue oben rechts. */
  konto: {
    titel: "Konto",
    profil: "Mein Profil",
    einstellungen: "Einstellungen",
    abmelden: "Abmelden",
    mehr: "Mehr",
    mehrHref: "/club/mehr/",
    schliessen: "Schließen",
  },

  /* Die Seite MEHR: eine Liste, drei Gruppen, unten Abmelden. */
  mehr: {
    eyebrow: "Mehr",
    headline: "DEIN BEREICH.",
    profilAnsehen: "Profil ansehen",
    gruppen: [
      {
        titel: "DEIN ACCOUNT",
        eintraege: [
          { href: "/club/profil/", label: "Mein Profil" },
          { href: "/club/mitgliedschaft/", label: "Mitgliedschaft" },
          { href: "/club/einstellungen/", label: "Sicherheit & Einstellungen" },
        ],
      },
      {
        titel: "DER CLUB",
        eintraege: [
          { href: "/club/events/", label: "Events" },
          { href: "/club/live/", label: "Live mit ISI" },
          { href: "/club/kanal/", label: "ISI Kanal" },
        ],
      },
      {
        titel: "HILFE",
        eintraege: [
          { href: "/club/support/", label: "Hilfe & Support" },
          { href: "/club/datenschutz/", label: "Datenschutz & Account" },
          { href: "/impressum/", label: "Impressum" },
        ],
      },
    ],
  },

  profil: {
    eyebrow: "Profil",
    headline: "MEIN PROFIL.",
    lead: "Was hier steht, sehen nur du und ISI.",
    name: "Name",
    email: "E-Mail",
    emailAendern: "Ändern",
    seit: "Mitglied seit",
    speichern: "SPEICHERN",
    gespeichert: "Gespeichert.",
  },

  einstellungen: {
    eyebrow: "Sicherheit",
    headline: "SICHERHEIT & EINSTELLUNGEN.",
    lead: "E-Mail-Adresse und Passwort deines Zugangs.",
    emailTitel: "E-MAIL-ADRESSE",
    emailAktuell: "Aktuelle Adresse",
    emailNeu: "Neue E-Mail-Adresse",
    emailPasswort: "Dein aktuelles Passwort",
    emailKnopf: "ÄNDERUNG BESTÄTIGEN",
    emailHinweis:
      "Wir schicken einen Bestätigungslink an die neue Adresse. Bis du ihn öffnest, bleibt die alte.",
    emailGesendet:
      "Wenn die Adresse frei ist, liegt jetzt ein Bestätigungslink in dem Postfach. Er gilt 24 Stunden.",
    emailOk: "Deine E-Mail-Adresse ist geändert.",
    emailUngueltig: "Der Link ist nicht mehr gültig. Trag die Adresse noch einmal ein.",
    emailVergeben: "Diese Adresse ist inzwischen vergeben. Trag eine andere ein.",
    passwortTitel: "PASSWORT",
    passwortAktuell: "Aktuelles Passwort",
    passwortNeu: "Neues Passwort",
    passwortWiederholen: "Neues Passwort wiederholen",
    passwortRegel: "Mindestens 10 Zeichen. Ein Satz, den du dir merken kannst, ist besser als ein kurzes Wort mit Sonderzeichen.",
    passwortKnopf: "PASSWORT SPEICHERN",
    passwortOk: "Passwort geändert. Alle anderen Geräte sind jetzt abgemeldet.",
    passwortUngleich: "Die beiden Passwörter sind nicht gleich.",
    geraeteTitel: "GERÄTE",
    geraeteText:
      "Änderst du dein Passwort, sind alle anderen Geräte sofort abgemeldet. Eine Anmeldung gilt 12 Stunden, mit „Angemeldet bleiben“ 30 Tage.",
  },

  mitgliedschaft: {
    eyebrow: "Mitgliedschaft",
    headline: "DEINE MITGLIEDSCHAFT.",
    status: "AKTIV",
    statusText: "Dein Zugang zum ISI TAT Business Club ist aktiv.",
    seit: "Mitglied seit",
    enthaltenTitel: "ENTHALTEN",
    enthalten: [
      "Alle Inhalte: fünf Serien, 40 Folgen",
      "Live-Termine mit ISI",
      "Events — Treffen in echt",
      "ISI Kanal",
    ],
    fragenTitel: "FRAGEN ZUR MITGLIEDSCHAFT",
    fragenText: "Laufzeit, Rechnung, Verlängerung — schreib uns, wir antworten persönlich.",
    fragenKnopf: "SUPPORT KONTAKTIEREN",
  },

  support: {
    eyebrow: "Hilfe",
    headline: "HILFE & SUPPORT.",
    lead: "Schreib uns, worum es geht. Deine Anfrage geht direkt an ISI und sein Team.",
    kategorieTitel: "Worum geht es?",
    kategorien: ["Technisches Problem", "Mitgliedschaft", "Inhalte", "Live", "Events", "Sonstiges"],
    betreff: "Betreff",
    nachricht: "Deine Nachricht",
    knopf: "ANFRAGE SENDEN",
    danke: "Deine Anfrage ist angekommen.",
    dankeText: "Wir melden uns bei dir per E-Mail — an die Adresse deines Zugangs.",
    zurueck: "ZURÜCK ZUM CLUB",
  },

  datenschutzKonto: {
    eyebrow: "Datenschutz",
    headline: "DATENSCHUTZ & ACCOUNT.",
    lead: "Was der Club über dich speichert — und was nicht.",
    serverTitel: "AUF DEM SERVER",
    server: [
      "Dein Name, deine E-Mail-Adresse und das Datum, an dem dein Zugang angelegt wurde.",
      "Dein Passwort — nur als Hash, aus dem sich das Passwort nicht zurückrechnen lässt.",
      "Deine Zusagen zu Events und Live-Terminen.",
    ],
    browserTitel: "NUR IN DEINEM BROWSER",
    browser: [
      "Welche Folgen du gesehen hast und wo du in einer Folge stehen geblieben bist.",
      "Ob du den Gruß beim ersten Mal schon gesehen hast.",
      "Das Anmelde-Cookie, das dich als Mitglied ausweist.",
    ],
    browserHinweis:
      "Nichts davon verlässt dein Gerät. Ein anderer Browser oder ein privates Fenster fängt bei null an.",
    aussenTitel: "WAS NICHT PASSIERT",
    aussen: [
      "Kein Tracking, keine Analyse, keine Werbung.",
      "Videos von YouTube und Instagram holt der Server; dein Browser spricht nicht mit Google oder Meta.",
      "Der Server wertet nicht aus, wer welche Folge gesehen hat.",
    ],
    rechteTitel: "DEINE RECHTE",
    auskunft: "MEINE DATEN HERUNTERLADEN",
    auskunftText: "Alles, was der Server über dich hat, als Datei (Art. 15 und 20 DSGVO).",
    loeschen: "KONTO LÖSCHEN ANFRAGEN",
    loeschenText:
      "Wir melden uns vor der Löschung kurz bei dir — ein bezahlter Zugang soll nicht durch einen Fehlklick verschwinden.",
    loeschenGesendet: "Deine Anfrage ist angekommen. Wir melden uns per E-Mail.",
    erklaerung: "Zur vollständigen Datenschutzerklärung",
  },

  passwortVergessen: {
    headline: ["PASSWORT", "VERGESSEN?"],
    text: "Trag deine E-Mail-Adresse ein. Wenn ein Zugang dazu existiert, schicken wir dir einen Link.",
    email: "E-Mail",
    knopf: "LINK SENDEN",
    gesendet: "Wenn ein Zugang zu dieser E-Mail existiert, liegt jetzt ein Link im Postfach. Er gilt 30 Minuten.",
    zurueck: "Zurück zur Anmeldung",
    linkAufLogin: "Passwort vergessen?",
  },

  neuesPasswort: {
    headline: ["NEUES", "PASSWORT."],
    text: "Wähle ein neues Passwort für deinen Zugang.",
    neu: "Neues Passwort",
    wiederholen: "Noch einmal",
    knopf: "PASSWORT SPEICHERN",
    fertig: "Dein Passwort ist gesetzt.",
    fertigText: "Melde dich jetzt mit dem neuen Passwort an.",
    zumLogin: "ZUR ANMELDUNG",
    ungueltig: "Der Link ist nicht mehr gültig.",
    ungueltigText: "Er ist abgelaufen oder wurde schon benutzt. Fordere einen neuen an.",
    neuAnfordern: "NEUEN LINK ANFORDERN",
  },

  formular: {
    fehler: "Das hat gerade nicht geklappt. Versuch es gleich noch einmal.",
    verbindung: "Keine Verbindung. Prüf dein Internet und versuch es noch einmal.",
  },

  willkommen: {
    titel: ["WILLKOMMEN", "IM CLUB."],
    text: "Hier findest du die Inhalte, Live-Termine und alles, was gerade im Club passiert.",
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
    eyebrowWeiter: "WEITER ANSEHEN",
    eyebrowAnfang: "HIER GEHT ES LOS",
    eyebrowFertig: "ALLE FOLGEN GESEHEN",
    weiter: "WEITER",
    anfangen: "ABSPIELEN",
    nochmal: "VON VORN",
    /* Unter der Karte: der Stand in der Serie, nicht im ganzen Katalog. */
    stand: (gesehen: number, gesamt: number) => `${gesehen} von ${gesamt} gesehen`,
    /* "37 % gesehen" bei einer angefangenen Folge. */
    folgeStand: (prozent: number) => `${prozent} % gesehen`,
    fertigText: "Ab jetzt kannst du jede Folge direkt öffnen.",
  },

  /* Folgen, die noch zu sind. */
  gesperrt: {
    kurz: "Noch gesperrt",
    hinweis: "Sieh die Folge davor zu Ende, dann öffnet sich diese.",
  },

  inhalte: {
    eyebrow: "Inhalte",
    headline: "ALLE INHALTE.",
    subline: "Fünf Serien, 40 Folgen — hier stehen sie alle, mit deinem Stand.",
    /* Ueber jeder Serie in der langen Liste. */
    serie: "SERIE",
    zurSerie: "Serie öffnen",
  },

  kapitel: {
    folgen: "FOLGEN",
    abspielen: "ABSPIELEN",
    weiter: "WEITER",
    naechsteOffene: "ZUR NÄCHSTEN OFFENEN FOLGE",
    /* "3 von 8 gesehen" unter dem Plakat; daneben die Prozent. */
    stand: (gesehen: number, gesamt: number) => `${gesehen} von ${gesamt} gesehen`,
    prozent: (p: number) => `${p} %`,
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
    eyebrow: "ISI Kanal",
    headline: "NEUES IM CLUB.",
    lead: "Hier schreibt ISI. Termine, Hinweise, neue Folgen, Events.",
    hinweis:
      "Der Feed ist zum Lesen. Wenn du etwas besprechen willst, bring es in die nächste Live-Runde mit.",
    leer: "Hier steht noch nichts.",
    leerText:
      "Sobald es etwas zu sagen gibt — ein Termin, eine neue Folge, ein Event — findest du es an dieser Stelle.",
    neu: "NEUES IM CLUB",
    alleZeigen: "Zum Kanal",
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
