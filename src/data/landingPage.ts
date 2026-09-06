/* =============================================================================
   ISI TAT BUSINESS CLUB — Zentrale Content-Datei
   -----------------------------------------------------------------------------
   Einzige Quelle fuer Texte, Zahlen, Medien, Serien, CTA-Ziele und Pricing.
   Komponenten enthalten KEINE fest verdrahteten Inhalte.

   KONVENTIONEN
   - `OFFEN`         = Angabe liegt noch nicht bestaetigt vor. Nichts
                       erfinden. Der Marker heisst bewusst nicht "TODO":
                       er landet im ausgelieferten Skript, und dort soll
                       nichts stehen, was wie unfertige Entwicklerarbeit
                       aussieht.
   - `src: null`     = Asset fehlt. Es wird ein gestalteter Platzhalter mit
                       korrektem Seitenverhaeltnis gerendert (siehe <Media/>).
                       Zum Austausch nur `src` (und ggf. `poster`) setzen.

   ENTWURFSTEXTE
   Serienbeschreibungen, Folgentitel, Mitgliedschafts-Zeilen und FAQ-Antworten sind
   als Entwurf gesetzt, damit die Seite vollstaendig lesbar ist. Sie sind
   ersetzbar und beschreiben Themen — keine Zusicherungen, keine Zahlen,
   keine Ergebnisse.

   [FERNUSG CHECK] — Begriff "Serie"
   Die Inhalte heissen "Serien", nicht "Kurse". "Kurs" ruft den
   Fernlehrgang auf, "Serie" beschreibt Inhalt — das ist das schwaechere
   Signal Richtung FernUSG. Weiterhin bewusst NICHT verwendet: Modulnummern, Lektionsnummern, vorgegebene
   Reihenfolgen, Lernpfade, Lernkontrollen, Hausaufgaben, Pruefungen,
   Zertifikate. Diese Abgrenzung steht ausdruecklich in der FAQ und traegt
   die rechtliche Argumentation — sie darf nicht stillschweigend entfallen.
   Eine anwaltliche Pruefung ersetzt das nicht.
   ========================================================================== */

import { mediaFiles } from "./mediaFiles";

/** true, wenn eine Angabe noch nicht bestaetigt vorliegt. */
export const isPending = (value: string) => value.startsWith("OFFEN");

export type MediaKind = "image" | "video";

export interface MediaAsset {
  /** Internes Label, z. B. "isi-hero-video" */
  id: string;
  /**
   * Laufende Nummer, im Platzhalter gross sichtbar. Der Auftraggeber
   * benennt seine Dateien danach (01.jpg, 02.mp4 …), dann ist eindeutig,
   * was wohin gehoert. Wird beim Anlegen vergeben, nie von Hand getippt.
   */
  no: number;
  kind: MediaKind;
  /** null = noch kein Asset geliefert */
  src: string | null;
  /** Poster/Fallback fuer Videos */
  poster?: string | null;
  /**
   * Kleine, stumme Fassung (1280 px). Fuer Handys und fuer Videos, die als
   * Hintergrund laufen — dort sieht niemand den Unterschied, spart aber
   * ein Vielfaches an Daten. Fehlt sie, wird die grosse Datei benutzt.
   */
  klein?: string | null;
  /** Aussagekraeftiger Alt-Text bzw. Videobeschreibung */
  alt: string;
  /** CSS aspect-ratio, z. B. "16 / 9" */
  ratio: string;
}

/* Zaehlt in der Reihenfolge hoch, in der die Assets hier stehen. */
let assetCounter = 0;

const media = (
  id: string,
  kind: MediaKind,
  alt: string,
  ratio: string,
  extra: Partial<MediaAsset> = {},
  /**
   * Nummer eines vorhandenen Motivs, das einspringt, solange die eigene
   * Datei fehlt. Ein grauer Kasten auf einer Verkaufsseite kostet mehr,
   * als ein zweites Mal gezeigtes Bild. Die eigene Nummer bleibt bestehen:
   * sobald die richtige Datei im Ordner liegt, gewinnt sie.
   */
  ersatzNr?: number,
): MediaAsset => {
  const no = ++assetCounter;
  /* Liegt in public/media eine Datei mit dieser Nummer, wird sie
     automatisch eingesetzt. Der Scan laeuft vor jedem Build — dadurch
     genuegt es, 03.mp4 dort abzulegen, ohne hier etwas zu aendern. */
  const datei =
    mediaFiles[no] ?? (ersatzNr ? mediaFiles[ersatzNr] : undefined);

  return {
    id,
    no,
    kind,
    src: datei?.src ?? null,
    poster: datei?.poster ?? null,
    klein: datei?.klein ?? null,
    alt,
    ratio,
    ...extra,
  };
};

/** Zweistellig, damit die Nummern in einer Dateiliste sortiert bleiben. */
export const assetNo = (asset: MediaAsset) => String(asset.no).padStart(2, "0");

/* --------------------------------------------------------------------------
   BRAND / GLOBAL
   -------------------------------------------------------------------------- */

export const brand = {
  /** Platzhalter — echtes Logo wird spaeter ausgetauscht. */
  logoPlaceholder: "logo-isi-tat",
  name: "ISI TAT",
  suffix: "BUSINESS CLUB",
  fullName: "ISI TAT BUSINESS CLUB",
} as const;

export const cta = {
  primary: { label: "JETZT BEWERBEN", href: "/bewerbung" },
  secondary: { label: "TRAILER ANSEHEN", href: "#trailer" },
  heroSecondary: { label: "TRAILER", href: "#trailer" },
  login: { label: "LOGIN", href: "/login" },
  /* Eigene Beschriftung fuer die Leiste unten am Handy: kuerzer als
     "Jetzt bewerben" und weniger fordernd, weil sie dauerhaft steht. */
  sticky: { label: "ZUGANG ANFRAGEN", href: "/bewerbung" },
} as const;

/* Die Reihenfolge folgt der Seite von oben nach unten — sonst springt die
   aktive Markierung im Header beim Scrollen vor und zurueck. */
export const nav = [
  { label: "ÜBER ISI", href: "#ueber-isi" },
  { label: "INHALTE", href: "#im-club" },
  { label: "ERFAHRUNGEN", href: "#erfahrungen" },
  { label: "MITGLIEDSCHAFT", href: "#zugang" },
  { label: "FAQ", href: "#faq" },
] as const;

/* --------------------------------------------------------------------------
   HERO
   -------------------------------------------------------------------------- */

export const hero = {
  /* Die Erfahrung steht jetzt hier oben statt als zweite Headline-Ebene —
     sie qualifiziert die Aussage, bevor man sie liest. */
  /* Das Leitmotiv der Masterclass. Es taucht spaeter im Fehler-Abschnitt
     als Zwischenheadline wieder auf und im ersten Kapitel als
     Beispielthema — dreimal dieselbe Idee, nie als Behauptung. */
  eyebrow: "ERFAHRUNG ALS ABKÜRZUNG",
  eyebrowMobil: "ERFAHRUNG ALS ABKÜRZUNG",
  /* Metazeile im Stil einer Streaming-Titelseite. "4K" ist raus: das
     Ausgangsmaterial ist 1080p und wird als 720p ausgeliefert — die
     Angabe waere nachpruefbar falsch gewesen. Sie kommt zurueck, sobald
     tatsaechlich in 4K produziert und ausgeliefert wird.
     Kapitel- und Videozahl werden gerechnet, nie getippt. */
  meta: {
    by: "VON ISI TAT",
    edition: "MASTERCLASS 2026",
  },
  /* Zwei Headline-Varianten. Umschalten ueber `headlineVariant` — beide
     sind im Layout geprueft, die Wahl ist reine Geschmackssache. */
  headlineVariant: "a" as "a" | "b",
  headlines: {
    a: {
      /* Zwei kurze Zeilen, gleiche Laenge wie vorher — nur haerter.
         Bewusst ueber MEINEN Weg, nicht ueber ein Ergebnis fuer dich:
         "von nichts zur Million" waere eine Ergebniszusage. */
      lines: ["VON NULL AUF HUNDERT.", "OHNE MEINE UMWEGE."],
      accent: [] as string[],
    },
    b: {
      lines: ["ICH HABE 20 JAHRE GEBRAUCHT."],
      accent: ["DU MUSST NICHT BEI NULL", "ANFANGEN WIE ICH."],
    },
  },
  /* Beantwortet ueber dem Fold die drei Fragen, mit denen jeder ankommt:
     wer bist du, was kannst du, was habe ich davon. */
  /* Drei Punkte, drei Sekunden. Der lange Satz vorher hat erklaert,
     dieser behauptet — und der letzte Teil ist der, der sitzt. */
  subheadline:
    "Meine Erfahrung. Meine Fehler. Meine Entscheidungen. Mein Netzwerk — verdichtet, damit du nicht jeden Umweg selbst gehen musst.",
  /* Die Vertrauenszeile ist raus: sie hat aufgezaehlt, was die Subline
     zwei Zeilen darueber schon sagt, und den Hero unten zugestellt. */
  /* 16:9, weil das Material so gedreht ist. Im 4:5-Rahmen waere fast die
     halbe Bildbreite weggeschnitten — und das Motiv wandert im Clip von
     links nach rechts, ein fester Bildausschnitt trifft es nie. */
  video: media(
    "isi-hero-video",
    "video",
    "ISI TAT im Portrait — Hero-Sequenz",
    "16 / 9",
  ),
  image: media("isi-hero-image", "image", "ISI TAT — Hero-Portrait", "4 / 5", {}, 4),
} as const;

/* --------------------------------------------------------------------------
   TRAILER
   -------------------------------------------------------------------------- */

export const trailer = {
  label: "TRAILER",
  closeLabel: "SCHLIESSEN",
  /* Solange kein eigener Trailer geschnitten ist, laeuft hier derselbe
     Zusammenschnitt wie im Hero — ein Knopf, der ins Leere fuehrt, ist
     schlechter als einer, der das zeigt, was schon da ist. Sobald 03.mp4
     im Ordner liegt, gewinnt die Datei. */
  video: media(
    "isi-trailer-video",
    "video",
    "Trailer — ISI TAT BUSINESS CLUB",
    "16 / 9",
    {},
    1,
  ),
} as const;

/* --------------------------------------------------------------------------
   SCROLLYTELLING INTRO
   Zwei Szenen zwischen Hero und Trust-Section. Szene drei aus dem Briefing
   ist die Trust-Section selbst — sie traegt dieselbe Headline, deshalb steht
   sie hier nicht doppelt.
   -------------------------------------------------------------------------- */

export const intro = {
  scenes: [
    {
      id: "weg",
      lines: ["ERFOLG SIEHT MAN AM ENDE.", "DEN WEG DAHIN NICHT."],
      /** Wird nacheinander eingeblendet. Leer = nur die Headline. */
      words: [] as string[],
      /* Das Portrait traegt diese Szene: die Aussage "den Weg dahin sieht
         man nicht" braucht ein Ergebnisbild, kein Bewegtbild. Hochformat,
         weil es so fotografiert ist — der Ausschnitt wird per
         object-position auf das Gesicht gelegt, siehe Intro.module.css. */
      visual: media(
        "isi-portrait-rolls",
        "image",
        "ISI TAT im Anzug vor einem Rolls-Royce",
        "4 / 5",
      ),
    },
    {
      id: "worte",
      lines: [] as string[],
      words: [
        "VERTRIEB.",
        "ENTSCHEIDUNGEN.",
        "MENSCHEN.",
        "FEHLER.",
        "NETZWERK.",
        "20+ JAHRE.",
      ],
      /* Zweites Ergebnisbild — Hochformat wie das erste, damit die beiden
         Szenen im selben Ausschnitt liegen. */
      visual: media(
        "isi-jet",
        "image",
        "ISI TAT vor einem Jet",
        "4 / 5",
      ),
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   TRUST / REPUTATION
   -------------------------------------------------------------------------- */

export const trust = {
  eyebrow: "Über mich",
  headline: ["WER IST", "ISI TAT?"],
  body: [
    "Über zwanzig Jahre Vertrieb. Angefangen ohne Netzwerk, ohne Kapital, ohne Plan B.",
    "Seitdem: eigene Unternehmen, eigene Teams, eigene Fehler.",
  ],
  /* Steht als eigene Zeile unter der Copy — die Kernhaltung der Seite. */
  claim:
    "Ich will euch nicht erzählen, dass ich immer alles richtig gemacht habe. Einige meiner wichtigsten Lektionen haben mich Geld, Zeit und Nerven gekostet. Genau deshalb kann meine Erfahrung für euch eine Abkürzung sein.",
  /* 16:9, so ist das Material gedreht. Ein quadratischer Ausschnitt haette
     ein Viertel der Bildbreite gekostet. */
  video: media(
    "isi-reputation-video",
    "video",
    "ISI TAT über seinen Weg",
    "16 / 9",
  ),
  /* Bildunterschrift am Portrait — wie eine Autorenzeile. */
  person: {
    name: "ISI TAT",
    /* "Investor" steht bewusst nicht da: die Bezeichnung ist rechtlich
       aufgeladen und vom Auftraggeber nicht freigegeben. Sie kann hier
       eingesetzt werden, sobald ISI sie ausdruecklich bestaetigt. */
    role: "Unternehmer · Vertrieb · Beteiligungen · Personal Brand",
  },
  /* Die eigentliche Biografie. Drei bis vier Saetze in ISIs Worten:
     Herkunft, Wendepunkt, was heute daraus geworden ist. Solange leer,
     zeigt die Seite die Stelle als gekennzeichnete Luecke. */
  /* "Ausfuehrliche Biografie folgt." ist ersatzlos raus — ein Hinweis auf
     eine fehlende Biografie ist keine Biografie, und an der Stelle, an der
     Vertrauen entsteht, liest er sich wie eine unfertige Seite. */
  bio: [
    "Über zwei Jahrzehnte praktische Erfahrung in Handel, Vertrieb, Unternehmertum, Investments, Gastronomie und Personal Brand.",
    "Mein Weg begann nicht mit einem Businessplan. Er begann mit der Frage, wo Möglichkeiten entstehen.",
    "Von frühen Online- und Handelsgeschäften über Felgenhandel, Promotion und Vertrieb bis zu Vermögensberatung, eigenen unternehmerischen Strukturen, Beteiligungen, Investments und Social Media.",
    "Dabei ist nicht alles richtig gelaufen. Einige meiner wichtigsten Lektionen haben mich Geld, Zeit und Nerven gekostet.",
    "Genau deshalb kann meine Erfahrung heute für andere eine Abkürzung sein.",
  ],
} as const;

/* --------------------------------------------------------------------------
   IM CLUB — Bereiche (Netflix-Row + Detailansicht)
   Bewusst ohne Nummerierung und ohne vorgegebene Reihenfolge.
   -------------------------------------------------------------------------- */

/** Ein Beispielthema aus einem Kapitel. Kein Folgentitel, keine Nummer. */
export type Thema = string;

export interface Series {
  id: string;
  /** Titel des Kapitels. */
  label: string;
  /** Ein Satz auf der Karte. */
  tagline: string;
  /** Anzahl der Videos in diesem Kapitel. Summe ueber alle: 40. */
  videos: number;
  /** Zwei bis drei Saetze in der Detailansicht. */
  description: string;
  cover: MediaAsset;
  still: MediaAsset;
  /** Beispielthemen — was vorkommt, nicht in welcher Reihenfolge. */
  topics: readonly Thema[];
}

export const insideTheClub = {
  eyebrow: "Die Masterclass",
  headline: "DIE MASTERCLASS.",
  /* Keine Gesamtlaufzeit: die Videos sind nicht final geschnitten, und
     eine geschaetzte Stundenzahl waere eine nachpruefbare Angabe. */
  subline: "40 Videos. 5 Kapitel. Erfahrung aus über 20 Jahren.",
  body: "Persönliche Geschichten. Konkrete Prinzipien. Klare Aufgaben.",
  facts: "5 Kapitel · 40 Videos · konkrete Umsetzungsaufgaben · plus Live-Formate im Club",
  /* Loest "Keine Reihenfolge." ab. Der Kurs ist strukturiert; die
     Freiheit liegt im Einstieg, nicht in der Struktur. */
  note: "Steig dort ein, wo du gerade eine konkrete Herausforderung hast — oder arbeite die Masterclass als Ganzes durch.",
  workLine: ["WISSEN ALLEIN REICHT NICHT.", "UMSETZUNG ENTSCHEIDET."],
  work: "Jedes Video endet mit einer konkreten Aufgabe. Nicht damit du beschäftigt bist — sondern damit aus einer Erkenntnis eine Handlung wird.",
  /* Die Schritte als Zeile unter dem Text. Kein Lernpfad durch die
     Inhalte, sondern die Arbeitsweise an einem einzelnen Video. */
  ablauf: ["VERSTEHEN", "PRÜFEN", "ANWENDEN", "REFLEKTIEREN", "WEITERMACHEN"],
  /* Auf dem Telefon nur die ersten drei Beispielthemen, der Rest hinter
     einem Schalter. Zwoelf Zeilen Aufzaehlung liest dort niemand. */
  themenMehr: "Alle Themen ansehen",
  themenWeniger: "Weniger",
  series: [
    {
      id: "mindset",
      label: "MINDSET, CHANCEN & UNTERNEHMERISCHES DENKEN",
      tagline:
        "Chancen erkennen, Entscheidungen treffen und Probleme lösen, ohne dich in Theorie zu verlieren.",
      videos: 8,
      description:
        "Wie ich entscheide, wenn Informationen fehlen und die Zeit knapp ist. Warum manche Chancen erst sichtbar werden, wenn man einmal darauf geachtet hat — und warum die meisten Probleme nicht gelöst, sondern nur verwaltet werden.",
      cover: media("kurs-mindset-cover", "image", "Mindset, Chancen & unternehmerisches Denken", "2 / 3"),
      still: media("kurs-mindset-still", "image", "Mindset, Chancen & unternehmerisches Denken", "16 / 9", {}, 7),
      topics: [
        "Erfahrung als Abkürzung",
        "Der Red-Car-Effekt",
        "Entscheidungen schnell treffen",
        "Zu langsam vs. zu schnell",
        "Probleme lösen statt verwalten",
        "Ziele visualisieren und umsetzen",
      ],
    },
    {
      id: "sales",
      label: "SALES, MENSCHEN & VERHANDELN",
      tagline:
        "Verkaufen lernen, Menschen besser verstehen, Preise erklären und Verhandlungen vorbereiten.",
      videos: 8,
      description:
        "Verkaufen ist kein Talent, sondern Handwerk — und der größte Teil davon passiert, bevor jemand über den Preis spricht. Wie ich Kundentypen unterscheide, wie ich mit „zu teuer“ umgehe und warum ich manche Kunden ziehen lasse.",
      cover: media("kurs-sales-cover", "image", "Sales, Menschen & Verhandeln", "2 / 3"),
      still: media("kurs-sales-still", "image", "Sales, Menschen & Verhandeln", "16 / 9", {}, 9),
      topics: [
        "Verkaufen kann man lernen",
        "Schlagzahl entscheidet",
        "Warum Menschen bei Menschen kaufen",
        "Verkaufe nichts, woran du nicht glaubst",
        "Drei Kundentypen",
        "„Das ist mir zu teuer.“",
        "Warum ich Kunden gehen lasse",
        "Wie ich bei einem Ferrari ca. 20.000 € verhandelt habe",
      ],
    },
    {
      id: "business",
      label: "BUSINESS AUFBAUEN & GELD VERDIENEN",
      tagline:
        "Ideen prüfen, Partner einschätzen, Risiken verstehen, Teams aufbauen und Systeme schaffen.",
      videos: 10,
      description:
        "Eine gute Idee ist der einfachste Teil. Wie ich Partner einschätze, warum ein Handschlag keinen Vertrag ersetzt und was mich das Lehrgeld gekostet hat, bevor ich das verstanden hatte.",
      cover: media("kurs-business-cover", "image", "Business aufbauen & Geld verdienen", "2 / 3"),
      still: media("kurs-business-still", "image", "Business aufbauen & Geld verdienen", "16 / 9", {}, 11),
      topics: [
        "Eine gute Idee reicht nicht",
        "Investiere in Menschen",
        "Fünfstelliges Investment-Lehrgeld",
        "Warum Verträge Pflicht sind",
        "Geld wird beim Einkauf verdient",
        "Vermögen schützen",
        "Delegation",
        "Zeit gegen Geld",
        "Menschen auswählen",
        "Menschen führen",
      ],
    },
    {
      id: "geld",
      label: "GELD, LIFESTYLE & BUSINESS-HACKS",
      tagline:
        "Liquidität verstehen, Geld sinnvoll einsetzen und finanzielle Entscheidungen erwachsener treffen.",
      videos: 9,
      description:
        "Umsatz ist nicht dein Geld — das ist der Satz, der die meisten am spätesten trifft. Wie ich zwischen Ausgeben, Reinvestieren und Behalten unterscheide, und warum ein guter Steuerberater keine Kostenstelle ist.",
      cover: media("kurs-geld-cover", "image", "Geld, Lifestyle & Business-Hacks", "2 / 3"),
      still: media("kurs-geld-still", "image", "Geld, Lifestyle & Business-Hacks", "16 / 9", {}, 13),
      topics: [
        "Mehr verdienen statt nur sparen",
        "Umsatz ist nicht dein Geld",
        "Warum ein guter Steuerberater Geld wert ist",
        "Reinvestieren",
        "Geld bewusst ausgeben",
        "Lifestyle als Content",
        "Kreditkarten und Punkte",
        "Finanzierung vs. Barzahlung",
        "Preise recherchieren",
      ],
    },
    {
      id: "brand",
      label: "PERSONAL BRAND, NETZWERK & WACHSTUM",
      tagline:
        "Sichtbarkeit aufbauen, Vertrauen schaffen und dafür sorgen, dass die richtigen Menschen wissen, wofür du stehst.",
      videos: 5,
      description:
        "Eine Personal Brand ist kein Selbstzweck. Sie sorgt dafür, dass Menschen dich kennen, bevor du dich vorstellst — und dass aus Reichweite gelegentlich ein Gespräch wird, aus dem etwas entsteht.",
      cover: media("kurs-brand-cover", "image", "Personal Brand, Netzwerk & Wachstum", "2 / 3"),
      still: media("kurs-brand-still", "image", "Personal Brand, Netzwerk & Wachstum", "16 / 9", {}, 15),
      topics: [
        "Deine Personal Brand arbeitet, während du schläfst",
        "Wie Social Media echte Deals bringen kann",
        "Warum ich Lifestyle zeige",
        "Reichweite ist nicht gleich Einfluss",
        "Vom Zuschauer zum möglichen Geschäftskontakt",
      ],
    },
  ] as readonly Series[],
  /* Die beiden Flaechen, die frueher zur Serie "Live mit ISI" gehoerten
     (Nummer 17 und 18). Sie bleiben an dieser Stelle stehen, damit sich
     die Nummerierung aller folgenden Flaechen nicht verschiebt — und
     tragen jetzt den eigenen Live-Bereich statt einer sechsten Karte. */
  liveVisual: {
    cover: media("live-cover", "image", "Live mit ISI", "2 / 3"),
    still: media("live-still", "image", "Live mit ISI", "16 / 9", {}, 17),
  },
} as const;

export const catalogue = {
  seriesCount: insideTheClub.series.length,
  /* Getippt wird nichts: die Videozahl ist die Summe der Kapitel.
     8 + 8 + 10 + 9 + 5 = 40. Live mit ISI zaehlt nicht mit — das ist
     Club, nicht Masterclass. */
  videoCount: insideTheClub.series.reduce((summe, s) => summe + s.videos, 0),
} as const;

/* --------------------------------------------------------------------------
   TIMELINE — Jahre vom Auftraggeber freigegeben
   -------------------------------------------------------------------------- */

export const timeline = {
  eyebrow: "Erfahrung",
  headline: ["MEIN WEG."],
  /* Nur Jahr und Stichwort. Sechs erklaerende Saetze daneben hat niemand
     gelesen — sie haben nur eine Bildschirmhoehe gekostet. */
  /* Ohne Jahreszahlen. 2003 / 2008 / 2013 / 2018 / 2021 waren nie von ISI
     bestaetigt — sechs erfundene Daten in einer Zeitleiste sind sechs
     Angaben, die jemand nachrechnen kann. Die Stationen selbst stimmen,
     also stehen sie ohne Datum. Sobald ISI die Jahre bestaetigt, koennen
     sie hier eingesetzt werden. */
  entries: [
    { year: "ANFÄNGE", title: "HANDEL & ERSTE GESCHÄFTE" },
    { year: "VERTRIEB", title: "VERKAUFEN LERNEN DURCH PRAXIS" },
    { year: "UNTERNEHMERTUM", title: "EIGENE STRUKTUREN UND TEAMS" },
    { year: "BETEILIGUNGEN", title: "INVESTMENTS, CHANCEN UND LEHRGELD" },
    { year: "PERSONAL BRAND", title: "SOCIAL MEDIA ALS GESCHÄFTLICHER HEBEL" },
    { year: "HEUTE", title: "ISI BUSINESS CLUB" },
  ],
} as const;

/* --------------------------------------------------------------------------
   ZUSAMMENARBEIT
   -------------------------------------------------------------------------- */

export const opportunity = {
  first: ["MANCHMAL", "ENTSTEHT MEHR DARAUS."],
  second: ["NICHT WEIL DU INVESTIERT HAST.", "SONDERN WEIL DU"],
  accent: "AUFFÄLLST.",
  note: "Wer durch Umsetzung, Zuverlässigkeit, Fähigkeiten und den Umgang mit anderen positiv auffällt, kann in meinem Umfeld sichtbar werden. Daraus können Gespräche, Kontakte oder neue Möglichkeiten entstehen.",
  /* ISI in eigenen Worten. Steht hier, weil dieser Abschnitt sonst eine
     Behauptung ueber ihn waere — so ist es sein Motiv, und ein Motiv ist
     kein Versprechen. "Moeglicherweise" bleibt unangetastet: das Wort
     traegt die ganze rechtliche Last des Absatzes. */
  /* Verdichtet. Beide Gruende bleiben benannt, "moeglicherweise" bleibt
     stehen — das Wort traegt die rechtliche Last des Absatzes. */
  zitat: [
    "Ich gebe diese Erfahrungen weiter, damit andere nicht jeden meiner Umwege selbst gehen müssen.",
    "Und ich lerne darüber Menschen kennen. Wenn jemand zu unserer Philosophie passt, entwickelt sich daraus möglicherweise eine langfristige Zusammenarbeit.",
    "Das sage ich offen — Mehrwert und der Aufbau eines starken Teams schließen sich für mich nicht aus.",
  ],
  closing: ["ZUGANG KANNST DU ANFRAGEN.", "VERTRAUEN MUSST DU DIR ERARBEITEN."],
  /* "kann sichtbar werden" statt "wird sichtbar", und der Anspruch wird
     ausdruecklich ausgeschlossen — sonst liest sich der Abschnitt als
     Zusage auf Zusammenarbeit. */
  disclaimer:
    "Es gibt jedoch keinerlei Anspruch auf einen Job, eine Beteiligung, eine geschäftliche Zusammenarbeit, ein Investment oder ein bestimmtes Einkommen.",
} as const;

/* --------------------------------------------------------------------------
   FEHLER / FAILURE STORY
   -------------------------------------------------------------------------- */

export const failure = {
  eyebrow: "Ehrlich",
  headline: ["WAS BEI MIR", "SCHIEFGELAUFEN IST."],
  body: [
    "Als Jugendlicher habe ich Party gemacht wie alle anderen auch. Ernst genommen habe ich davon nichts.",
    "Je älter meine Eltern wurden, desto klarer wurde mir: irgendwann zählt es wirklich. Also habe ich Vollgas gegeben — und bereue davon keinen Tag.",
    "Das Schwerste war nicht die Arbeit. Es war, dass mir niemand etwas erklärt hat. Ich habe mir alles selbst beigebracht, und das hat Jahre gekostet, die ich nicht zurückbekomme.",
  ],
  /* Auf dem Handy dieselbe Aussage in vier Zeilen statt in drei Absaetzen.
     Wer auf einer Spalte liest, steigt bei der dritten Erklaerung aus. */
  /* Nur ein Absatz: der zweite Gedanke steht direkt darunter gross als
     Schlusszeile — zweimal derselbe Satz ist einer zu viel. */
  bodyMobil: [
    "Falsches Timing. Falsche Menschen. Entscheidungen, die ich heute anders treffen würde.",
  ],
  /* Zwei Bilder statt einem: der Abstand zwischen ihnen ist das Argument.
     Bewusst ueber Wissen und Zeit erzaehlt, nicht ueber Besitz — sonst
     kippt die Gegenueberstellung ins Angeberische. */
  compare: {
    beforeLabel: "FRÜHER",
    beforeCaption: "Ohne Plan, ohne jemanden, der es erklärt.",
    before: media("isi-frueher", "image", "ISI TAT als Jugendlicher", "3 / 4"),
    afterLabel: "HEUTE",
    afterCaption: "Derselbe Weg — nur habe ich ihn alleine gesucht.",
    after: media("isi-heute", "image", "ISI TAT heute", "3 / 4"),
  },
  /* Kein Erfolgsbild. Es steht neben dem Absatz ueber die Eltern und
     traegt den Grund, aus dem ueberhaupt jemand Vollgas gibt. */
  motive: {
    /* Kein Aufruf, kein Argument — nur der Grund. */
    line: ["MEINE ENERGIE.", "MEINE HOFFNUNG.", "MEINE MAMA."],
    caption: "Der Grund, warum ich angefangen habe, es ernst zu nehmen.",
    asset: media(
      "isi-mutter",
      "image",
      "ISI TAT mit seiner Mutter",
      "4 / 5",
    ),
  },
  closing: [
    "MIT JEMANDEM AN MEINER SEITE",
    "WÄRE ICH VIEL SCHNELLER GEWESEN.",
  ],
  /* Der Satz, der die Sektion mit dem Angebot verbindet — ohne zu
     versprechen, dass es bei jemand anderem funktioniert. */
  pass: "Genau das gebe ich heute weiter: Schritt für Schritt, damit du meine Umwege nicht noch einmal gehen musst.",
  /* Verbindet die persoenliche Geschichte mit dem Produkt: die Fehler
     sind nicht Beiwerk, sie sind der Gegenstand. Zwischenheadline und
     Text kommen woertlich vom Auftraggeber. */
  shortcut: {
    line: ["ERFAHRUNG ALS ABKÜRZUNG."],
    body: [
      "Du musst nicht jeden Fehler selbst machen.",
      "Manche kosten Geld. Manche kosten Jahre. Die teuersten kosten beides.",
    ],
    /* Vier Lektionen, keine Anekdoten. Jede benennt, worum es geht, nicht
       wie dramatisch es war. Keine Namen, keine Vorwuerfe gegen Dritte. */
    stories: [
      /* Alle vier fingen mit "Warum ..." an — vier gleiche Satzanfaenge
         untereinander sind Laenge ohne Inhalt. Jetzt steht die Lektion
         direkt da. */
      { label: "STEUERN", text: "Umsatz ist nicht automatisch dein Geld." },
      {
        label: "INVESTMENTS",
        text: "Ein gutes Produkt ist noch kein gutes Investment.",
      },
      { label: "VERTRÄGE", text: "Vertrauen ersetzt keinen sauberen Vertrag." },
      { label: "RISIKO", text: "Vermögen aufzubauen ist nur die Hälfte." },
    ],
  },
} as const;

/* --------------------------------------------------------------------------
   FREIHEIT / LIFESTYLE
   -------------------------------------------------------------------------- */

export const lifestyle = {
  eyebrow: "Freiheit",
  headline: ["DER LUXUS IST", "NICHT DAS AUTO."],
  headlineAccent: ["DER LUXUS IST,", "ENTSCHEIDEN ZU KÖNNEN."],
  body: [
    "Mit wem du arbeitest. Wann. Wo.",
    "Welche Chancen du annimmst — und zu welchen du Nein sagst.",
  ],
  /* Slots entsprechen den vorhandenen Aufnahmen — nur `src` setzen. */
  /* Steht ueber der Galerie und traegt die Sektion — bewegtes Bild wirkt
     hier staerker als vier Standbilder nebeneinander. */
  video: media("isi-garage", "video", "ISI TAT in der Garage", "16 / 9"),
  /* Drei statt vier: die vierte Kachel war eine Kachel zu viel, und der
     Auftraggeber liefert drei Autoaufnahmen. */
  gallery: [
    /* Alt-Text beschreibt, was zu sehen ist — er wird vorgelesen,
       wenn das Bild nicht laedt oder jemand es nicht sehen kann. */
    media("isi-freiheit-01", "image", "Nachts in Paris, vor dem Rolls-Royce", "4 / 5"),
    media("isi-freiheit-02", "image", "Im Showroom, neben einem roten Ferrari", "4 / 5"),
    media("isi-freiheit-03", "image", "Vor einem Privatjet", "4 / 5"),
  ],
  disclaimer:
    "Meine Bilder aus meinem Leben. Kein Versprechen, wie deins aussieht.",
} as const;

/* --------------------------------------------------------------------------
   NETWORK
   -------------------------------------------------------------------------- */

export const network = {
  eyebrow: "Dein Umfeld",
  headline: ["WISSEN FINDEST", "DU ÜBERALL."],
  headlineAccent: ["DIE RICHTIGEN", "MENSCHEN NICHT."],
  body: [
    "Manchmal fehlt nicht die nächste Information.",
    "Sondern jemand, der die Situation schon kennt.",
  ],
  /* Erscheinen nacheinander, waehrend die Grafik in den Blick kommt. */
  hints: ["Ein Kontakt.", "Eine Perspektive.", "Ein ehrlicher Hinweis.", "Ein Gespräch zur richtigen Zeit."],
  center: "DU",
  nodes: [
    "VERTRIEB",
    "UNTERNEHMER",
    "SELBSTSTÄNDIGE",
    "BUSINESS",
    "MARKETING",
    "FINANZEN",
    "KREATIVBRANCHE",
    "PARTNER",
    "EXPERTEN",
  ],
} as const;

/* --------------------------------------------------------------------------
   LIVE MIT ISI
   -------------------------------------------------------------------------- */

/* Der Live-Teil hatte eine eigene Sektion mit grossem Videoplatz. Es gibt
   dafuer kein Material und es soll auch keins gedreht werden — statt eine
   Bildschirmhoehe mit einem Platzhalter zu fuellen, steht die Aussage jetzt
   als schmale Zeile im Zugang-Abschnitt, wo sie ohnehin hingehoert. */
/* Live mit ISI war frueher eine sechste Karte neben den Serien und wurde
   damit zur Masterclass gezaehlt. Es ist aber kein Kursinhalt, sondern
   ein Bestandteil der Mitgliedschaft — und steht deshalb in einem eigenen
   Bereich nach den fuenf Kapiteln. */
export const live = {
  lead: ["DIE MASTERCLASS", "IST NICHT DER GANZE CLUB."],
  label: "LIVE MIT ISI",
  line: "Videos geben dir die Grundlagen. Im Live-Austausch geht es um die Situationen, die gerade wirklich vor dir liegen.",
  items: [
    {
      label: "FRAGEN STELLEN",
      text: "Was beschäftigt dich gerade?",
    },
    {
      label: "SITUATIONEN EINORDNEN",
      text: "Eine zweite Perspektive auf reale Entscheidungen.",
    },
    {
      label: "VON ANDEREN LERNEN",
      text: "Die Frage eines anderen kann genau dein Problem treffen.",
    },
    {
      label: "UMSETZUNG BESPRECHEN",
      text: "Nicht nur Inhalte konsumieren, sondern anwenden.",
    },
  ],
  /* Keine Zahl und keine Frequenz, solange die Termine nicht feststehen.
     "Woechentlich" waere eine Zusage, die jemand einloesen muss. */
  frequency: "OFFEN",
} as const;

/* --------------------------------------------------------------------------
   TESTIMONIALS — keine erfundenen Aussagen, nur Platzhalter
   -------------------------------------------------------------------------- */

export interface Testimonial {
  name: string;
  role: string;
  /** Seit wann im Club — macht aus einem Zitat einen Beleg. */
  since: string;
  /**
   * Wo die Person heute steht. Der Satz, der beim Lesen den Gedanken
   * ausloest "das will ich auch". Bewusst als Beschreibung der Person,
   * nicht als Versprechen an den Leser — und niemals erfunden.
   */
  standing: string;
  statement: string;
  video: MediaAsset;
}

export const testimonials = {
  eyebrow: "Erfahrungen",
  /* Zeigt auf die Menschen, nicht auf ein Ergebnis: wer hier liest, soll
     sich mit ihnen vergleichen — ohne dass ihm etwas zugesagt wird. */
  headline: ["MENSCHEN, DIE DA SIND,"],
  headlineAccent: ["WO DU HIN WILLST."],
  subline:
    "Keine Nachher-Zahlen. Menschen, die dieselbe Entscheidung getroffen haben — und was seitdem anders läuft.",
  note: "Hier stehen erst Stimmen, wenn sie vorliegen und die Leute zugestimmt haben. Nichts Ausgedachtes.",
  /* Einzelfaelle sind kein Massstab — das muss dabeistehen, sobald echte
     Stimmen eingetragen werden. */
  disclaimer:
    "Einzelne Erfahrungen. Kein Massstab für dein Ergebnis und keine Zusage.",
  items: [
    {
      name: "OFFEN — Name",
      role: "OFFEN — Branche",
      since: "OFFEN",
      standing: "OFFEN",
      statement: "OFFEN",
      video: media("testimonial-video-01", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
    {
      name: "OFFEN — Name",
      role: "OFFEN — Branche",
      since: "OFFEN",
      standing: "OFFEN",
      statement: "OFFEN",
      video: media("testimonial-video-02", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
    {
      name: "OFFEN — Name",
      role: "OFFEN — Branche",
      since: "OFFEN",
      standing: "OFFEN",
      statement: "OFFEN",
      video: media("testimonial-video-03", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
  ] satisfies Testimonial[],
} as const;

/* --------------------------------------------------------------------------
   FÜR WEN
   Steht frueh: wer sich hier nicht wiederfindet, liest gar nicht weiter —
   und wer bleibt, liest den Rest ueberzeugter. Beide Seiten sind Aussagen
   ueber Haltung, keine Versprechen ueber Ergebnisse.
   -------------------------------------------------------------------------- */

export const fit = {
  eyebrow: "Kurz vorab",
  headline: ["FÜR WEN DAS IST."],
  headlineAccent: ["UND FÜR WEN NICHT."],
  yes: {
    label: "Das passt, wenn du",
    items: [
      "verkaufst, aufbaust, selbstständig arbeitest — oder genau da hin willst",
      "Entscheidungen triffst, für die du niemanden zum Fragen hast",
      "bereit bist, an deinem Können zu arbeiten",
      "ein Umfeld willst, das weiter ist als deins",
    ],
    /* Ohne diesen Satz las sich die erste Zeile wie eine Bedingung. Der
       Klub steht Quereinsteigern ausdruecklich offen — dieselbe Aussage
       wie in den haeufigen Fragen, nur dort, wo aussortiert wird. */
    note: "Quereinsteiger ausdrücklich auch. Vorerfahrung ist keine Bedingung — anfangen kannst du auf jeder Ebene.",
  },
  no: {
    label: "Das passt nicht, wenn du",
    items: [
      "von heute auf morgen reich werden willst",
      "denkst, es geht um Zufall statt um dein Können",
      "eine Garantie erwartest, dass es funktioniert",
      "Inhalte sammelst und nichts davon umsetzt",
    ],
  },
  /* Auf dem Handy je vier kurze Zeilen. Eine Zeile, ein Gedanke —
     umgebrochene Aufzaehlungen liest niemand zu Ende. */
  jaMobil: [
    "du verkaufst, aufbaust — oder gerade erst anfängst",
    "du Entscheidungen nicht immer alleine treffen willst",
    "du an deinen Fähigkeiten arbeiten willst",
    "du ein stärkeres Umfeld suchst",
  ],
  /* Kurzfassung des Hinweises fuer die schmale Spalte. */
  jaHinweisMobil: "Quereinsteiger ausdrücklich auch. Vorerfahrung ist keine Bedingung.",
  neinMobil: [
    "du schnellen Reichtum erwartest",
    "du Garantien suchst",
    "du Verantwortung abgeben willst",
    "du nur Content sammeln willst",
  ],
  closing: "Ich baue mit dir etwas auf, das kein schneller Gewinn ist.",
} as const;

/* --------------------------------------------------------------------------
   MITGLIEDSCHAFT
   -------------------------------------------------------------------------- */

export const membership = {
  eyebrow: "Deine Mitgliedschaft",
  headline: ["NICHT NUR CONTENT."],
  headlineAccent: ["EIN UMFELD,", "DAS MITDENKT."],
  /* Das Mockup steht nicht nackt auf der Seite, sondern in einem Banner:
     links, was der Bereich ist, rechts das Bild, das aus dem Rahmen
     laeuft. Ein Screenshot allein erklaert sich nicht. */
  preview: {
    eyebrow: "Der Mitgliederbereich",
    headline: ["ALLES AN EINEM ORT.", "EIN LOGIN."],
    lines: [
      "Am Laptop, auf dem Tablet, auf dem Telefon.",
      "Jede Serie, jede Aufzeichnung, der ganze Austausch.",
      "Kommt etwas dazu, liegt es am nächsten Tag drin.",
    ],
    note: "Abbildung des Mitgliederbereichs. Die Inhalte wachsen laufend.",
  },
  /* Gestaltete Abbildung statt nachgebauter Geraete: der Auftraggeber
     liefert das Mockup, damit die Oberflaeche so aussieht, wie sie
     tatsaechlich gedacht ist. */
  mockup: media(
    "mitgliederbereich-mockup",
    "image",
    "Der Mitgliederbereich auf Laptop, Tablet und Telefon",
    "16 / 10",
  ),
  rows: [
    {
      label: "40-VIDEO MASTERCLASS",
      text: "Fünf Kapitel aus über 20 Jahren praktischer Erfahrung.",
    },
    {
      label: "LIVE MIT ISI",
      text: "Fragen stellen und reale Situationen einordnen.",
    },
    {
      label: "COMMUNITY",
      text: "Austausch mit Menschen, die ebenfalls aufbauen, verkaufen und entscheiden.",
    },
    {
      label: "NETZWERK",
      text: "Kontakte entstehen über Vertrauen, Zeit und gegenseitigen Mehrwert.",
    },
    {
      label: "TREFFEN & EVENTS",
      text: "Wenn es passt, nehme ich dich mit. In echt, nicht per Video.",
    },
    /* "Ruecksprache halten" statt "Feedback", "Betreuung" oder
       "Lernkontrolle": das FernUSG haengt an der Ueberwachung des
       Lernerfolgs durch den Anbieter. Fragen beantworten ist keine
       Ueberwachung — Ergebnisse pruefen, korrigieren oder einen
       Fortschritt bestaetigen waere eine. */
    /* Bewusst ohne Zusage staendiger Erreichbarkeit: der Zugang laeuft
       ueber die vorgesehenen Formate, nicht ueber eine offene Leitung. */
    {
      label: "ZUGANG ZU ISI",
      text: "Rücksprache über die vorgesehenen Live- und Community-Formate.",
    },
    {
      label: "WEITERE MÖGLICHKEITEN",
      text: "Keine Garantie. Aber die Möglichkeit, durch Umsetzung und Fähigkeiten sichtbar zu werden.",
    },
  ],
  /* Sagt, worauf das hinauslaeuft — und haelt zugleich fest, dass es
     nicht ums Durcharbeiten geht. Beides zusammen in einem Satz. */
  rowsNote:
    "Das Ziel ist nicht, dass du alles gesehen hast. Das Ziel ist, dass du weißt, wen du fragst, wenn es drauf ankommt.",
} as const;

/* --------------------------------------------------------------------------
   BEWERBUNGSPROZESS
   -------------------------------------------------------------------------- */

export const application = {
  eyebrow: "Der Weg rein",
  headline: ["SO KOMMEN WIR", "ZUSAMMEN."],
  /* Fuenf Schritte auf einer Linie — dieselbe Figur wie die Zeitleiste
     weiter oben. Die Texte sind bewusst kurz: in fuenf Spalten hat ein
     langer Satz keinen Platz, und ein Ablauf soll man ueberfliegen. */
  /* Vier statt fuenf: "Ich schaue es mir an" war kein Schritt, den der
     Besucher geht — der letzte Schritt gehoert ihm, nicht mir. */
  steps: [
    {
      step: "01",
      label: "DU ENTSCHEIDEST DICH",
      text: "Was willst du wirklich erreichen?",
    },
    {
      step: "02",
      label: "DU BEWIRBST DICH",
      text: "Fünf Fragen. Unverbindlich.",
    },
    {
      step: "03",
      label: "DU SIEHST DIE PRÄSENTATION",
      text: "Umfang, Ablauf, Preis — in Ruhe.",
    },
    {
      step: "04",
      label: "DU ENTSCHEIDEST, OB WIR LOSLEGEN",
      text: "Passt es für dich, geht es los.",
    },
  ],
  /* Ehrlich halten: eine Bewerbung ist keine Zusage. */
  note: "Es passt nicht mit jedem. Wenn ich absage, ist das kein schlechtes Ergebnis — nur ein ehrliches.",
} as const;

/* --------------------------------------------------------------------------
   PRICING
   -------------------------------------------------------------------------- */

export const spots = {
  eyebrow: "Aufnahme",
  headline: "PLÄTZE.",
  /* [ECHTZAHL NOETIG] Die Platzzahl muss stimmen. Eine erfundene Knappheit
     ist irrefuehrende Werbung (UWG) und steht auf der Verbotsliste des
     Auftraggebers. Bis zur Bestaetigung wird die Zeile als offen gerendert,
     nicht geraten. */
  count: "OFFEN",
  period: "OFFEN",
  facts: [
    "Kein Streichpreis, kein Countdown.",
    "Kein Upsell nach der Aufnahme.",
    "Wer nicht passt, bekommt eine Absage.",
  ],
  /* Der Preis steht bewusst nicht hier, sondern in der Praesentation —
     zusammen mit dem, was drin ist. Er wird nicht verschwiegen, nur nicht
     aus dem Zusammenhang gerissen. */
  priceNote:
    "Was die Mitgliedschaft kostet, sage ich dir in der Präsentation — zusammen mit allem, was drin ist. Vorher wäre es eine Zahl ohne Zusammenhang.",
} as const;

/* --------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */

export const faq = {
  eyebrow: "FAQ",
  headline: ["WAS DU", "WISSEN WILLST."],
  items: [
    {
      q: "Für wen ist der Club?",
      a: "Für Quereinsteiger, die neu anfangen — und genauso für Leute, die längst dabei sind und auf ein ganz anderes Level wollen. Entscheidend ist nicht, wo du heute stehst, sondern wohin du willst.",
    },
    {
      q: "Was bekomme ich konkret?",
      a: "Du erhältst Zugang zur 40-Video-Masterclass mit fünf Kapiteln: Mindset & unternehmerisches Denken, Sales & Verhandeln, Business, Geld & Lifestyle sowie Personal Brand & Wachstum. Hinzu kommen die Club-Bestandteile wie Live-Austausch, Community und Netzwerk entsprechend deiner Mitgliedschaft.",
    },
    /* Frueher: "keine feste Reihenfolge, keine Hausaufgaben, keine
       Pruefung". Es gibt Umsetzungsaufgaben — die Aussage war falsch. */
    {
      q: "Wie ist die Masterclass aufgebaut?",
      a: "Die Masterclass besteht aus 40 Videos in fünf Kapiteln. Jedes Video vermittelt eine Kernbotschaft, ordnet sie anhand konkreter Erfahrungen oder Beispiele ein und endet mit einer praktischen Umsetzungsaufgabe und klaren ISI Rules. Es geht nicht darum, möglichst schnell alles anzusehen. Entscheidend ist, was du davon tatsächlich anwendest.",
    },
    /* Neutrale Fassung, solange Frequenz und Formate nicht feststehen.
       "Wird ergaenzt, sobald es feststeht" las sich wie eine Baustelle. */
    {
      q: "Wie viel Kontakt habe ich zu dir?",
      a: "Der persönliche Austausch findet insbesondere über die vorgesehenen Live- und Community-Formate statt. Die konkreten Frequenzen und Formate werden vor Abschluss der Mitgliedschaft transparent kommuniziert.",
    },
    {
      q: "Laufzeit und Zahlung?",
      a: "Ja, es kostet etwas. Wer das nicht als Investment sieht, ist hier ohnehin falsch. Einen Weg findet man: komplett auf einmal oder in zwei bis drei Zahlungen. Umfang, Laufzeit, Preis und Zahlungsoptionen siehst du vor deiner Entscheidung transparent in der Präsentation.",
    },
    /* Frueher: "Genau das ist die Idee dahinter." Das war eine Zusage auf
       Zusammenarbeit und damit ein Versprechen, das niemand halten muss. */
    {
      q: "Kann daraus eine Zusammenarbeit werden?",
      a: "Das kann passieren, ist aber kein Bestandteil oder Versprechen der Mitgliedschaft. Wer über Zeit durch Umsetzung, Zuverlässigkeit, Fähigkeiten und Charakter auffällt, kann in meinem Umfeld sichtbar werden. Daraus können Gespräche oder Möglichkeiten entstehen. Es gibt jedoch keine Garantie und keinen Anspruch auf Zusammenarbeit, Job, Beteiligung, Investment oder Einkommen.",
    },
    {
      q: "Bin ich nach der Aufnahme auf mich allein gestellt?",
      a: "Nein. Du profitierst vom Netzwerk, von der Erfahrung und von den Fragen, die dort beantwortet werden — auch von denen, die du selbst nie gestellt hättest. Entscheiden musst du weiter selbst, aber du machst es nicht mehr mit dir allein aus.",
    },
  ],
  /* Steht unter den Fragen, klein und sachlich — nicht als Warnkasten.
     Noetig, weil die Masterclass Geld, Investments, Finanzierung,
     Versicherungen, Steuern und Vertraege beruehrt. */
  hinweis: {
    label: "Hinweis",
    text: [
      "Die Inhalte des ISI BUSINESS CLUB dienen der allgemeinen Weiterbildung und basieren auf persönlichen Erfahrungen und Einschätzungen.",
      "Sie stellen keine individuelle Rechts-, Steuer-, Versicherungs-, Finanzierungs- oder Anlageberatung dar.",
      "Persönliche Zahlen und historische Beispiele werden — soweit erforderlich — als ungefähre Erinnerungswerte dargestellt.",
      "Es werden keine Einkommens-, Investment- oder sonstigen Erfolgsversprechen abgegeben.",
    ],
  },
} as const;

/* --------------------------------------------------------------------------
   FINAL CTA
   -------------------------------------------------------------------------- */

export const finalCta = {
  headline: ["JETZT KENNST", "DU MICH BESSER."],
  accent: ["DIE FRAGE IST, MIT WEM DU", "DEINE NÄCHSTEN ENTSCHEIDUNGEN TRIFFST."],
  body: [
    "Kein Fake. Alles echt.",
    "Mein Wort ist mein Stil.",
    "Mein Name ist meine Marke.",
  ],
  brand: "ISI TAT BUSINESS CLUB",
  /* Der Auftraggeber hat fuer diese Flaeche denselben Garagen-Clip
     geliefert, der oben in "Freiheit" laeuft — byte-gleiche Datei. Statt
     ihn ein zweites Mal auszuliefern, verweist die Flaeche auf Nummer 22.
     Hier laeuft er unscharf im Hintergrund, dort scharf im Vordergrund;
     eine eigene 30.mp4 wuerde jederzeit gewinnen. */
  video: media("final-isi-video", "video", "ISI TAT — Abschluss", "16 / 9", {}, 22),
} as const;

/* --------------------------------------------------------------------------
   RECHTLICHES / FOOTER
   -------------------------------------------------------------------------- */

export const footer = {
  /* Oeffentliche Kanaele. Wer wissen will, wer hier spricht, kann nachsehen. */
  social: [
    { label: "Instagram", handle: "@isi.tat", href: "https://www.instagram.com/isi.tat/" },
    { label: "TikTok", handle: "@isi.tat", href: "https://www.tiktok.com/@isi.tat" },
    { label: "YouTube", handle: "@isitat", href: "https://www.youtube.com/@isitat" },
  ],
  links: [
    { label: "IMPRESSUM", href: "/impressum" },
    { label: "DATENSCHUTZ", href: "/datenschutz" },
    /* AGB und Kontakt bleiben offen, bis es sie gibt. Ein Link auf eine
       leere Seite ist schlechter als ein Hinweis, dass sie fehlt. */
    { label: "AGB", href: "OFFEN" },
    { label: "KONTAKT", href: "OFFEN" },
  ],
  /* Vom Auftraggeber neu formuliert. Die Aussage "niemand kann etwas
     garantieren" bleibt darin — sie muss bleiben, sonst liest sich die
     Seite als Ergebnisversprechen. Nur der Ton ist jetzt seiner. */
  /* Dezente Urheberzeile ganz unten, wie sie auf Agenturarbeiten ueblich
     ist. Externer Link, deshalb rel="noreferrer noopener" — die fremde
     Seite soll weder erfahren, von wo der Klick kam, noch Zugriff auf
     dieses Fenster bekommen. */
  credit: {
    label: "CREATED BY",
    name: "OBSCURA DIGITAL MARKETING",
    href: "https://obscura-berlin.de",
  },
  /* Kurz, aber die Aussage bleibt vollstaendig: keine Garantie, und das
     Ergebnis haengt am Leser. Ohne diesen Satz liest sich die Seite als
     Ergebnisversprechen. */
  legalNote:
    "Erfahrungen und Prinzipien aus meinem eigenen Weg. Keine Garantie auf ein bestimmtes Ergebnis — was daraus entsteht, hängt von deinen Entscheidungen und deiner Umsetzung ab.",
} as const;

export const meta = {
  title: "ISI TAT BUSINESS CLUB | 40-Video Masterclass, Live & Netzwerk",
  description:
    "40 Videos aus über 20 Jahren Erfahrung in Vertrieb, Unternehmertum, Business, Geld und Personal Brand — kombiniert mit Live-Austausch, Community und Netzwerk im ISI TAT BUSINESS CLUB.",
} as const;

/* --------------------------------------------------------------------------
   RECHTSSEITEN
   -----------------------------------------------------------------------------
   Impressum und Datenschutz stehen als eigene Seiten. Alles, was hier
   `OFFEN` ist, muss der Auftraggeber liefern — erfundene Angaben
   waeren in einem Impressum keine Luecke, sondern eine Falschangabe.
   -------------------------------------------------------------------------- */

export const impressum = {
  title: "Impressum",
  intro: "Angaben gemäß § 5 DDG.",
  /* Anbieter: vollstaendiger Firmenname inkl. Rechtsform. */
  anbieter: ["OFFEN — Firma inkl. Rechtsform", "OFFEN — Straße und Hausnummer", "OFFEN — PLZ und Ort"],
  vertreten: "OFFEN — Geschäftsführer/in",
  register: { gericht: "OFFEN — Registergericht", nummer: "OFFEN — HRB-Nummer" },
  /* § 27a UStG. Die Steuernummer gehoert NICHT auf die Seite. */
  ustId: "OFFEN — USt-IdNr. (DE…)",
  kontakt: { mail: "OFFEN — E-Mail", telefon: "OFFEN — Telefon" },
  /* § 18 Abs. 2 MStV — nur noetig bei journalistisch-redaktionellen Inhalten,
     schadet aber nicht. */
  verantwortlich: ["OFFEN — Name", "OFFEN — Anschrift"],
  streit: {
    head: "EU-Streitschlichtung",
    text: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:",
    href: "https://ec.europa.eu/consumers/odr/",
    label: "ec.europa.eu/consumers/odr",
    hinweis:
      "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
  },
} as const;

/* --------------------------------------------------------------------------
   LOGIN
   -------------------------------------------------------------------------- */

export const login = {
  visual: media("login-visual", "image", "ISI TAT BUSINESS CLUB", "3 / 4", {}, 5),
  /* Folgt der Hero-Aussage — vorher stand hier noch die abgeloeste Headline. */
  quote: ["DU MUSST NICHT ALLES", "SELBST HERAUSFINDEN."],
} as const;

/* --------------------------------------------------------------------------
   PRAESENTATION — eigene Seite hinter der Interessensbekundung
   -------------------------------------------------------------------------- */

export const presentation = {
  eyebrow: "Für dich freigeschaltet",
  headline: ["DIE PRÄSENTATION."],
  intro:
    "Was der Club ist, wie er läuft, was er kostet. Ohne Countdown und ohne Verkaufsdruck — schau sie an, wann es dir passt.",
  video: media(
    "praesentation-video",
    "video",
    "Die Präsentation — ISI TAT BUSINESS CLUB",
    "16 / 9",
    {},
    1,
  ),
  afterHead: ["WENN ES", "FÜR DICH PASST."],
  afterBody:
    "Dann musst du nicht auf ein Gespräch warten. Du füllst die Vorqualifizierung aus, ich schaue sie mir an und melde mich.",
  cta: { label: "JETZT VORQUALIFIZIEREN", href: "OFFEN" },
  /* Ehrlich halten: eine Bewerbung ist keine Zusage. */
  note: "Die Vorqualifizierung ist noch keine Aufnahme. Passt es nicht, bekommst du eine Absage — das ist kein schlechtes Ergebnis, sondern ein ehrliches.",
} as const;

/* --------------------------------------------------------------------------
   ZWISCHENRUFE — der Aufruf wiederholt sich, statt nur oben und unten zu stehen
   -------------------------------------------------------------------------- */

export const ctaBands = {
  /* Steht direkt nach den Serien. Vorher stand hier "Inhalte sind der
     Anfang. Die Menschen sind der Rest." — eine Behauptung ohne Gegen-
     stand, und dazu fast wortgleich mit der Ueberschrift der naechsten
     Sektion ("Wissen findest du ueberall. Die richtigen Menschen
     nicht."), der sie damit die Wirkung nahm.

     Jetzt steht dort, was der Klub tatsaechlich abkuerzt: nicht das
     Wissen, sondern die Jahre. Das ist nachpruefbar, es steht so schon
     im Hero, und es verspricht nichts. */
  nachInhalten: {
    lines: [
      "40 VIDEOS SIND DER ANFANG.",
      "ENTSCHEIDEND IST, WAS DU DAMIT MACHST.",
    ],
    /* Vorher "Die Plaetze sind begrenzt" — eine Knappheitsaussage ohne
       Zahl dahinter. Die Absage ist der echte Filter und braucht keine. */
    note: "Du siehst Umfang, Ablauf und Konditionen, bevor du dich entscheidest.",
  },
  nachUmfeld: {
    lines: [
      "DU BEWIRBST DICH NICHT UM EINEN KURS.",
      "SONDERN UM EIN UMFELD.",
    ],
    note: "Fünf Minuten Formular. Danach bekommst du die Präsentation.",
  },
} as const;

/* --------------------------------------------------------------------------
   HINTERGRUNDEBENEN
   Fotos, die hinter einer Sektion liegen — mit niedriger Deckkraft, Korn
   und Vignette darueber. Sie tragen keine Aussage und keinen Text; wenn
   eine Datei fehlt, sieht die Sektion aus wie vorher.
   Stehen bewusst am Ende: so verschieben sich die Nummern der Flaechen
   auf der Seite nicht, wenn hier eine dazukommt.
   -------------------------------------------------------------------------- */

export const backdrops = {
  /* Weites Bild, viel leere Flaeche — vertraegt grosse Schrift darueber. */
  ctaNachInhalten: media(
    "backdrop-cta-inhalte",
    "image",
    "Hintergrund: die Halle mit dem Rolls-Royce",
    "16 / 9",
  ),
  finalCta: media(
    "backdrop-abschluss",
    "image",
    "Hintergrund: im Showroom neben dem Ferrari",
    "16 / 9",
  ),
  /* Bewegtbild fuer das erste Band. Der Auftraggeber hat dafuer den
     Garagen-Clip benannt — dieselbe Datei, die in "Freiheit" scharf im
     Vordergrund laeuft. Statt sie ein drittes Mal auszuliefern, verweist
     die Flaeche auf Nummer 22. Eine eigene 35.mp4 wuerde jederzeit
     gewinnen; liegt keine da, bleibt das Standbild darunter stehen. */
  ctaClip: media(
    "backdrop-cta-clip",
    "video",
    "Hintergrund-Clip: in der Garage",
    "16 / 9",
    {},
    22,
  ),
} as const;

/* --------------------------------------------------------------------------
   BEWERBUNG / VORQUALIFIZIERUNG
   -----------------------------------------------------------------------------
   Zweck: vor dem Gespraech herausfinden, ob es ueberhaupt passt — Ziel,
   Zeit, Ernst und die Frage, ob jemand ueberhaupt investieren kann.

   Zur Geldfrage: sie steht offen drin, statt sie ueber Umwege zu erraten.
   Ein verdeckter Test aus Beruf oder Wohnort trifft schlechter (ein
   Angestellter kann liquide sein, ein Selbstaendiger klamm) und faellt
   unangenehm auf, sobald jemand ihn bemerkt. Eine klare, hoeflich
   gestellte Frage liefert das bessere Signal — und nennt trotzdem keinen
   Preis, der erst in der Praesentation kommt.

   Der Punktestand wird im Browser gerechnet. Das reicht, um jemanden zu
   fuehren, nicht um ihn auszuschliessen: wer den Quelltext liest, sieht
   die Gewichtung. Eine echte Sperre braucht einen Server.
   -------------------------------------------------------------------------- */

export const screening = {
  eyebrow: "Bewerbung",
  headline: ["BEVOR WIR", "MITEINANDER REDEN."],
  intro:
    "Fünf Fragen, keine drei Minuten. Ich lese jede Bewerbung selbst — deshalb lohnt es sich, ehrlich zu antworten und nicht das, was gut klingt.",
  /* Rueckmeldungen zum Absenden. Sie sagen, was passiert ist, ohne dem
     Besucher Serverinterna zu erklaeren. */
  status: {
    sendet: "Wird gesendet …",
    unvollstaendig: "Bitte Name und eine gültige E-Mail angeben.",
    email: "Diese E-Mail-Adresse sieht nicht richtig aus.",
    zuschnell: "Das war zu schnell hintereinander. Bitte kurz warten.",
    nichtEingerichtet: "Der Versand ist gerade nicht erreichbar.",
    versand: "Das Senden hat nicht geklappt.",
    /* Wird nur angehaengt, wenn eine Adresse hinterlegt ist — sonst
       endete der Satz mit einem Doppelpunkt ins Leere. */
    direktSchreiben: "Schreib mir bitte direkt:",
  },
  /* Wohin, wenn der Versand scheitert. Erst eintragen, dann anzeigen —
     ein Mailto ins Leere ist schlimmer als keins. */
  fallbackMail: "OFFEN",
  /* Der Satz unter dem Knopf. Sagt, was mit den Angaben passiert. */
  hinweis:
    "Deine Angaben gehen als E-Mail an mich und werden nicht an Dritte weitergegeben.",
  progressLabel: "Frage",
  backLabel: "Zurück",
  nextLabel: "WEITER",
  submitLabel: "BEWERBUNG ABSCHICKEN",
  questions: [
    {
      id: "ziel",
      question: "Was willst du in den nächsten zwölf Monaten erreichen?",
      options: [
        { label: "Etwas Eigenes aufbauen", score: 2 },
        { label: "Das, was ich mache, deutlich größer machen", score: 3 },
        { label: "Raus aus dem Angestelltenverhältnis", score: 2 },
        { label: "Weiß ich noch nicht genau", score: 0 },
      ],
    },
    {
      id: "stand",
      question: "Wo stehst du gerade?",
      hint: "Es gibt keine falsche Antwort. Ich will nur wissen, worauf wir aufbauen.",
      options: [
        { label: "Selbstständig — ich lebe davon", score: 3 },
        { label: "Selbstständig — es trägt noch nicht", score: 1 },
        { label: "Angestellt — ich baue nebenbei etwas auf", score: 2 },
        { label: "Ich fange gerade bei null an", score: 0 },
      ],
    },
    {
      id: "zeit",
      question: "Wie viel Zeit steckst du in den nächsten Monaten rein?",
      options: [
        { label: "Unter 5 Stunden die Woche", score: 0 },
        { label: "5 bis 10 Stunden", score: 1 },
        { label: "10 bis 20 Stunden", score: 2 },
        { label: "So viel, wie nötig ist", score: 3 },
      ],
    },
    {
      id: "invest",
      question: "Ein Platz im Club kostet Geld. Was trifft auf dich zu?",
      hint: "Die Zahl bekommst du in der Präsentation. Hier geht es nur darum, ob es zeitlich für dich überhaupt aufgeht.",
      options: [
        { label: "Ich habe Mittel dafür bereit", score: 3 },
        { label: "Geht — wenn ich es auf zwei bis drei Zahlungen verteile", score: 3 },
        { label: "Ich müsste es erst verdienen", score: 0 },
        { label: "Aktuell nicht", score: -6 },
      ],
    },
    {
      id: "start",
      question: "Wann willst du anfangen?",
      options: [
        { label: "Sofort", score: 3 },
        { label: "In den nächsten Wochen", score: 2 },
        { label: "Irgendwann dieses Jahr", score: 1 },
        { label: "Ich schaue mich erst mal um", score: 0 },
      ],
    },
  ],
  contact: {
    headline: "WOHIN DARF ICH ANTWORTEN?",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name", required: true, placeholder: "Vor- und Nachname" },
      { name: "email", label: "E-Mail", type: "email", autoComplete: "email", required: true, placeholder: "name@beispiel.de" },
      { name: "telefon", label: "Telefon", type: "tel", autoComplete: "tel", required: false, placeholder: "Optional" },
      { name: "instagram", label: "Instagram", type: "text", autoComplete: "off", required: false, placeholder: "Optional — @deinname" },
    ],
    note: "Deine Angaben gehen an mich und an niemanden sonst.",
    /* Unsichtbares Feld. Menschen sehen es nicht, Automaten fuellen es —
       daran erkennt der Server sie, ohne dass jemand ein Raetsel loesen
       muss. */
    honigtopf: "_honey",
  },
  /* Ab hier faellt die Entscheidung. Die Schwellen sind bewusst weich:
     bestehen ist die Regel, die Absage die Ausnahme. */
  thresholds: { direkt: 11, pruefen: 7 },
  results: {
    direkt: {
      eyebrow: "Passt",
      headline: ["DAS KLINGT NACH", "JEMANDEM, DER LOSLEGT."],
      body: "Schau dir die Präsentation an — Umfang, Ablauf, Preis. In Ruhe, ohne Countdown. Danach entscheidest du.",
      cta: { label: "ZUR PRÄSENTATION", href: "/praesentation" },
    },
    pruefen: {
      eyebrow: "Angekommen",
      headline: ["ICH SCHAUE", "MIR DAS AN."],
      body: "Deine Bewerbung liegt bei mir. Ich melde mich — und sage dir ehrlich, ob es gerade passt oder nicht.",
      cta: null,
    },
    warten: {
      eyebrow: "Ehrlich gesagt",
      headline: ["GERADE PASST", "ES NOCH NICHT."],
      body: "Das ist kein Urteil über dich. Der Club setzt voraus, dass du Zeit und Mittel gerade wirklich hast — sonst kostet er dich mehr, als er dir bringt. Wenn sich das ändert, bewirb dich wieder. Die Tür bleibt offen.",
      cta: { label: "ZURÜCK ZUR STARTSEITE", href: "/" },
    },
  },
} as const;

export const datenschutz = {
  title: "Datenschutzerklärung",
  stand: "OFFEN — Stand (Monat und Jahr)",
  /* Was hier steht, ist am 4. September 2026 im gebauten Quelltext
     geprueft worden: keine Anfrage an einen fremden Server beim Laden,
     kein Cookie, kein localStorage, keine Schriftart von Google. Wird
     spaeter etwas eingebaut, das das aendert, muss dieser Text mit. */
  abschnitte: [
    {
      head: "Verantwortlicher",
      body: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist der im Impressum genannte Anbieter.",
      ],
    },
    {
      head: "Was beim Aufruf dieser Seite passiert",
      body: [
        "Beim Aufruf werden keine Cookies gesetzt und keine Daten im Browser gespeichert. Es werden keine Verbindungen zu Servern Dritter aufgebaut — Schriftarten, Bilder und Videos liegen auf demselben Server wie die Seite.",
        "Der Hoster verarbeitet technisch notwendige Zugriffsdaten (IP-Adresse, Zeitpunkt, abgerufene Datei, Browsertyp) in Server-Logfiles. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO — das berechtigte Interesse am sicheren und stabilen Betrieb.",
      ],
    },
    {
      head: "Hosting",
      body: ["OFFEN — Hoster mit Firma, Anschrift, Land und Hinweis auf den Auftragsverarbeitungsvertrag."],
    },
    {
      head: "Schriftarten",
      body: [
        "Die verwendeten Schriften liegen auf dem Server dieser Website und werden von dort geladen. Es besteht keine Verbindung zu Google Fonts; es wird keine IP-Adresse an Google übertragen.",
      ],
    },
    {
      head: "Bewerbungsformular",
      body: [
        "Wenn du dich bewirbst, werden die von dir eingegebenen Angaben — Name, E-Mail-Adresse, optional Telefonnummer und Instagram-Name sowie deine Antworten auf die Fragen — an den Server dieser Website übermittelt und von dort als E-Mail an das Postfach des Anbieters weitergeleitet.",
        "Es ist kein Formular- oder Marketingdienst eingebunden. Die Daten verlassen den Server nur auf dem Weg zu diesem Postfach; eine Übermittlung in ein Drittland findet nicht statt.",
        "Zweck ist die Bearbeitung deiner Bewerbung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Maßnahmen auf deine Anfrage hin). Die Angaben werden gelöscht, sobald sie für die Bearbeitung nicht mehr nötig sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
        "Zur Abwehr automatisierter Massenanfragen wird beim Absenden für kurze Zeit vermerkt, von welcher IP-Adresse eine Bewerbung eingegangen ist. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
      ],
    },
    {
      head: "Keine Analyse, kein Tracking",
      body: [
        "Diese Website nutzt keine Analyse- oder Trackingdienste, keine Werbe-Pixel und keine eingebetteten Inhalte fremder Anbieter. Es findet keine Profilbildung statt.",
      ],
    },
    {
      head: "Deine Rechte",
      body: [
        "Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Wende dich dafür an die im Impressum genannte Adresse.",
        "Außerdem steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO).",
      ],
    },
  ],
} as const;
