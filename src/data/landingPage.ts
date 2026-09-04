/* =============================================================================
   ISI TAT BUSINESS CLUB — Zentrale Content-Datei
   -----------------------------------------------------------------------------
   Einzige Quelle fuer Texte, Zahlen, Medien, Serien, CTA-Ziele und Pricing.
   Komponenten enthalten KEINE fest verdrahteten Inhalte.

   KONVENTIONEN
   - `TODO_CONTENT`  = Inhalt liegt noch nicht bestaetigt vor. Nichts erfinden.
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
export const isPending = (value: string) => value.startsWith("TODO_CONTENT");

export type MediaKind = "image" | "video";

export interface MediaAsset {
  /** Internes Label, z. B. "[ISI_HERO_VIDEO]" */
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
  logoPlaceholder: "[LOGO_ISI_TAT]",
  name: "ISI TAT",
  suffix: "BUSINESS CLUB",
  fullName: "ISI TAT BUSINESS CLUB",
} as const;

export const cta = {
  primary: { label: "JETZT BEWERBEN", href: "/bewerbung" },
  secondary: { label: "TRAILER ANSEHEN", href: "#trailer" },
  heroSecondary: { label: "TRAILER", href: "#trailer" },
  login: { label: "LOGIN", href: "/login" },
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
  eyebrow: "20+ JAHRE ERFAHRUNG AN DEINER SEITE",
  /* Metazeile im Stil einer Streaming-Titelseite.
     `edition` und `quality` sind Angaben ueber das Material — `quality`
     nur stehen lassen, wenn tatsaechlich in 4K produziert wird.
     Serien- und Folgenzahl werden aus den Daten berechnet, nie getippt. */
  meta: {
    by: "VON ISI TAT",
    edition: "2026",
    quality: "4K",
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
    "Meine Erfahrung. Mein Netzwerk. Meine Fehler — damit du sie nicht auch machst.",
  /* Die Vertrauenszeile ist raus: sie hat aufgezaehlt, was die Subline
     zwei Zeilen darueber schon sagt, und den Hero unten zugestellt. */
  /* 16:9, weil das Material so gedreht ist. Im 4:5-Rahmen waere fast die
     halbe Bildbreite weggeschnitten — und das Motiv wandert im Clip von
     links nach rechts, ein fester Bildausschnitt trifft es nie. */
  video: media(
    "[ISI_HERO_VIDEO]",
    "video",
    "ISI TAT im Portrait — Hero-Sequenz",
    "16 / 9",
  ),
  image: media("[ISI_HERO_IMAGE]", "image", "ISI TAT — Hero-Portrait", "4 / 5", {}, 4),
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
    "[ISI_TRAILER_VIDEO]",
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
        "[ISI_PORTRAIT_ROLLS]",
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
        "[ISI_JET]",
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
  claim: "Du musst nicht jede Situation zum ersten Mal alleine erleben.",
  /* 16:9, so ist das Material gedreht. Ein quadratischer Ausschnitt haette
     ein Viertel der Bildbreite gekostet. */
  video: media(
    "[ISI_REPUTATION_VIDEO]",
    "video",
    "ISI TAT über seinen Weg",
    "16 / 9",
  ),
  /* Bildunterschrift am Portrait — wie eine Autorenzeile. */
  person: {
    name: "ISI TAT",
    role: "Unternehmer · Vertrieb · Netzwerk",
  },
  /* Die eigentliche Biografie. Drei bis vier Saetze in ISIs Worten:
     Herkunft, Wendepunkt, was heute daraus geworden ist. Solange leer,
     zeigt die Seite die Stelle als gekennzeichnete Luecke. */
  bio: "TODO_CONTENT",
  /* Vom Auftraggeber freigegeben. "20+ JAHRE ERFAHRUNG" ist raus — das
     steht schon im Hero ueber der Headline und war hier eine Wiederholung. */
  metrics: [
    { value: "7", label: "UNTERNEHMEN MITGEGRÜNDET" },
    { value: "8+", label: "STELLIG UMGESETZT" },
    { value: "150+", label: "MITGLIEDER IM CLUB" },
  ],
} as const;

/* --------------------------------------------------------------------------
   IM CLUB — Bereiche (Netflix-Row + Detailansicht)
   Bewusst ohne Nummerierung und ohne vorgegebene Reihenfolge.
   -------------------------------------------------------------------------- */

export interface Episode {
  title: string;
  /** Freie Laufzeitangabe, z. B. "18 MIN". null = noch offen. */
  runtime: string | null;
}

export interface Series {
  id: string;
  /** "serie" zaehlt in die Serien-Zahl, "live" ist ein Format. */
  format: "serie" | "live";
  label: string;
  /** Ein Satz auf der Karte. */
  tagline: string;
  /** Zwei bis drei Saetze in der Detailansicht. */
  description: string;
  cover: MediaAsset;
  still: MediaAsset;
  /** Stummes Hover-Preview (nur Desktop). null = kein Preview, keine Animation. */
  preview: MediaAsset | null;
  episodes: Episode[];
}

export const insideTheClub = {
  eyebrow: "Im Club",
  headline: "WAS DICH IM MENTORING ERWARTET.",
  subline: "Fünf Serien. Plus live. Keine Reihenfolge.",
  note: "Es kommt laufend etwas dazu. Du fängst an, wo es dich gerade betrifft — nicht bei Folge eins.",
  draftEpisodeNote:
    "Folgentitel sind Arbeitsstände und werden durch die finalen Titel ersetzt.",
  series: [
    {
      /* interne Ablage: MINDSET:PERSÖNLICHKEIT */
      id: "mindset",
      format: "serie",
      label: "MINDSET & PERSÖNLICHKEIT",
      tagline: "Entscheiden, wenn es unbequem wird.",
      description:
        "Wie ich entscheide, wenn Informationen fehlen und die Zeit knapp ist. Über Standards, die niemand kontrolliert — und was passiert, wenn ich sie unterschreite.",
      cover: media("[KURS_MINDSET_COVER]", "image", "Mindset & Persönlichkeit", "2 / 3"),
      still: media("[KURS_MINDSET_STILL]", "image", "Mindset & Persönlichkeit", "16 / 9", {}, 7),
      preview: null,
      episodes: [
        { title: "Standards, die niemand kontrolliert", runtime: null },
        { title: "Entscheiden mit halber Information", runtime: null },
        { title: "Was Rückschläge wirklich kosten", runtime: null },
        { title: "Disziplin ohne Motivation", runtime: null },
      ],
    },
    {
      id: "vertrieb",
      format: "serie",
      label: "VERTRIEB",
      tagline: "Menschen verstehen, bevor du verkaufst.",
      description:
        "Zwanzig Jahre Gespräche, Einwände und Verhandlungen. Warum Menschen kaufen, bevor sie überzeugt sind — und woran es liegt, wenn sie es nicht tun.",
      cover: media("[KURS_VERTRIEB_COVER]", "image", "Vertrieb", "2 / 3"),
      still: media("[KURS_VERTRIEB_STILL]", "image", "Vertrieb", "16 / 9", {}, 9),
      preview: null,
      episodes: [
        { title: "Das Gespräch vor dem Gespräch", runtime: null },
        { title: "Einwände sind Informationen", runtime: null },
        { title: "Verhandeln, ohne zu verlieren", runtime: null },
        { title: "Der Abschluss ist kein Moment", runtime: null },
      ],
    },
    {
      /* interne Ablage: DER BERUF: DAS UNTERNEHMEN */
      id: "business",
      format: "serie",
      label: "BUSINESS",
      tagline: "Vom Job zum eigenen Unternehmen.",
      description:
        "Was sich ändert, wenn aus einer Tätigkeit ein Unternehmen wird. Verantwortung, Struktur, Leute — und die Entscheidungen, die ich heute anders treffen würde.",
      cover: media("[KURS_BUSINESS_COVER]", "image", "Business", "2 / 3"),
      still: media("[KURS_BUSINESS_STILL]", "image", "Business", "16 / 9", {}, 11),
      preview: null,
      episodes: [
        { title: "Vom Angestellten zum Unternehmer", runtime: null },
        { title: "Verantwortung, die niemand abnimmt", runtime: null },
        { title: "Die falschen Partner erkennen", runtime: null },
        { title: "Wachsen, ohne die Kontrolle zu verlieren", runtime: null },
        /* aus der Ablage GELD — real existierende Folge */
        { title: "Konsum vs Investieren", runtime: null },
      ],
    },
    {
      /* interne Ablage: FREUNDE WERBEN FREUNDE
         Oeffentlich als NETZWERK gefuehrt: die interne Bezeichnung beschreibt
         eine Vertriebsmechanik und gehoert nicht auf die Verkaufsseite. */
      id: "netzwerk",
      format: "serie",
      label: "NETZWERK",
      tagline: "Wer dich kennt, entscheidet mit.",
      description:
        "Warum man an Menschen schwerer rankommt als an Wissen. Wie Beziehungen entstehen, woran sie kaputtgehen und was Verlässlichkeit über Jahre wert ist.",
      cover: media("[KURS_NETZWERK_COVER]", "image", "Netzwerk", "2 / 3"),
      still: media("[KURS_NETZWERK_STILL]", "image", "Netzwerk", "16 / 9", {}, 13),
      preview: null,
      episodes: [
        { title: "Der erste Eindruck ist der zweite", runtime: null },
        { title: "Geben, bevor du brauchst", runtime: null },
        { title: "Räume, in die man eingeladen wird", runtime: null },
      ],
    },
    {
      id: "geschichten",
      format: "serie",
      label: "ECHTE GESCHICHTEN",
      tagline: "Was gelaufen ist. Und was nicht.",
      description:
        "Erzählte Fälle aus zwanzig Jahren, ohne Politur. Die Sachen, die funktioniert haben. Die, die schiefgingen. Und was jeweils den Unterschied gemacht hat.",
      cover: media("[KURS_GESCHICHTEN_COVER]", "image", "Echte Geschichten", "2 / 3"),
      still: media("[KURS_GESCHICHTEN_STILL]", "image", "Echte Geschichten", "16 / 9", {}, 15),
      preview: null,
      episodes: [
        { title: "Der Deal, der zu gut aussah", runtime: null },
        { title: "Zwei Jahre auf die falsche Karte", runtime: null },
        { title: "Wieder aufstehen ist keine Metapher", runtime: null },
      ],
    },
    {
      id: "live",
      format: "live",
      label: "LIVE MIT ISI",
      tagline: "Fragen stellen, statt nur zuschauen.",
      description:
        "Der Teil, den man nicht aufzeichnen kann. Runden, in denen ich Fragen beantworte, Situationen einordne und Leute miteinander bekannt mache.",
      cover: media("[KURS_LIVE_COVER]", "image", "Live mit ISI", "2 / 3"),
      still: media("[KURS_LIVE_STILL]", "image", "Live mit ISI", "16 / 9", {}, 17),
      preview: null,
      episodes: [
        { title: "Offene Fragerunden", runtime: null },
        { title: "Fälle aus dem Alltag", runtime: null },
        { title: "Austausch unter Mitgliedern", runtime: null },
        { title: "Treffen vor Ort", runtime: null },
      ],
    },
  ] satisfies Series[],
} as const;

/** Aus den Daten abgeleitet — waechst automatisch mit der Mediathek. */
export const catalogue = {
  seriesCount: insideTheClub.series.filter((s) => s.format === "serie")
    .length,
  episodeCount: insideTheClub.series.reduce(
    (total, s) => total + s.episodes.length,
    0,
  ),
} as const;

/* --------------------------------------------------------------------------
   TIMELINE — Jahre vom Auftraggeber freigegeben
   -------------------------------------------------------------------------- */

export const timeline = {
  eyebrow: "Erfahrung",
  headline: ["MEIN WEG."],
  /* Nur Jahr und Stichwort. Sechs erklaerende Saetze daneben hat niemand
     gelesen — sie haben nur eine Bildschirmhoehe gekostet. */
  entries: [
    { year: "2003", title: "ANFÄNGE" },
    { year: "2008", title: "VERTRIEB" },
    { year: "2013", title: "BUSINESS" },
    { year: "2018", title: "WACHSTUM" },
    { year: "2021", title: "FREIHEIT" },
    { year: "HEUTE", title: "DER CLUB" },
  ],
} as const;

/* --------------------------------------------------------------------------
   ZUSAMMENARBEIT
   -------------------------------------------------------------------------- */

export const opportunity = {
  first: ["MANCHMAL", "ENTSTEHT MEHR DARAUS."],
  second: ["NICHT WEIL DU BEZAHLT HAST.", "SONDERN WEIL DU"],
  accent: "AUFFÄLLST.",
  note: "Wer im Club durch Zuverlässigkeit, Persönlichkeit und den Umgang mit anderen auffällt, wird in meinem Umfeld sichtbar.",
  closing: ["ZUGANG KANNST DU ANFRAGEN.", "VERTRAUEN MUSST DU DIR ERARBEITEN."],
  disclaimer:
    "Daraus entsteht kein Anspruch: keine Jobgarantie, keine Einkommensgarantie, keine automatische Zusammenarbeit.",
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
  /* Zwei Bilder statt einem: der Abstand zwischen ihnen ist das Argument.
     Bewusst ueber Wissen und Zeit erzaehlt, nicht ueber Besitz — sonst
     kippt die Gegenueberstellung ins Angeberische. */
  compare: {
    beforeLabel: "FRÜHER",
    beforeCaption: "Ohne Plan, ohne jemanden, der es erklärt.",
    before: media("[ISI_FRUEHER]", "image", "ISI TAT als Jugendlicher", "3 / 4"),
    afterLabel: "HEUTE",
    afterCaption: "Derselbe Weg — nur habe ich ihn alleine gesucht.",
    after: media("[ISI_HEUTE]", "image", "ISI TAT heute", "3 / 4"),
  },
  /* Kein Erfolgsbild. Es steht neben dem Absatz ueber die Eltern und
     traegt den Grund, aus dem ueberhaupt jemand Vollgas gibt. */
  motive: {
    /* Kein Aufruf, kein Argument — nur der Grund. */
    line: ["MEINE ENERGIE.", "MEINE HOFFNUNG.", "MEINE MAMA."],
    caption: "Der Grund, warum ich angefangen habe, es ernst zu nehmen.",
    asset: media(
      "[ISI_MUTTER]",
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
  video: media("[ISI_GARAGE]", "video", "ISI TAT in der Garage", "16 / 9"),
  /* Drei statt vier: die vierte Kachel war eine Kachel zu viel, und der
     Auftraggeber liefert drei Autoaufnahmen. */
  gallery: [
    /* Alt-Text beschreibt, was zu sehen ist — er wird vorgelesen,
       wenn das Bild nicht laedt oder jemand es nicht sehen kann. */
    media("[ISI_FREIHEIT_01]", "image", "Nachts in Paris, vor dem Rolls-Royce", "4 / 5"),
    media("[ISI_FREIHEIT_02]", "image", "Im Showroom, neben einem roten Ferrari", "4 / 5"),
    media("[ISI_FREIHEIT_03]", "image", "Vor einem Privatjet", "4 / 5"),
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
export const live = {
  label: "LIVE DABEI",
  line: "Der Club besteht nicht nur aus Aufnahmen.",
  items: [
    {
      label: "FRAGEN STELLEN",
      text: "Was dich gerade beschäftigt.",
    },
    {
      label: "SITUATIONEN EINORDNEN",
      text: "Eine zweite Perspektive von jemandem, der sie kennt.",
    },
    {
      label: "VON ANDEREN FÄLLEN PROFITIEREN",
      text: "Die Frage eines anderen ist oft auch deine.",
    },
  ],
  /* Frequenz noch offen. */
  frequency: "TODO_CONTENT",
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
      name: "[NAME]",
      role: "[BRANCHE]",
      since: "TODO_CONTENT",
      standing: "TODO_CONTENT",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_01]", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
    {
      name: "[NAME]",
      role: "[BRANCHE]",
      since: "TODO_CONTENT",
      standing: "TODO_CONTENT",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_02]", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
    {
      name: "[NAME]",
      role: "[BRANCHE]",
      since: "TODO_CONTENT",
      standing: "TODO_CONTENT",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_03]", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
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
      "verkaufst, aufbaust oder selbstständig arbeitest",
      "Entscheidungen triffst, für die du niemanden zum Fragen hast",
      "bereit bist, an deinem Können zu arbeiten",
      "ein Umfeld willst, das weiter ist als deins",
    ],
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
    "[MITGLIEDERBEREICH_MOCKUP]",
    "image",
    "Der Mitgliederbereich auf Laptop, Tablet und Telefon",
    "16 / 10",
  ),
  rows: [
    {
      label: "INHALTE & ERFAHRUNGEN",
      text: "Aus über 20 Jahren Vertrieb und Business.",
    },
    {
      label: "LIVE MIT ISI",
      text: "Fragen stellen. Situationen einordnen.",
    },
    {
      label: "DIE COMMUNITY",
      text: "Menschen mit denselben Fragen.",
    },
    {
      label: "NETZWERK",
      text: "Kontakte, die über Zeit entstehen.",
    },
    {
      label: "TREFFEN & EVENTS",
      text: "TODO_CONTENT — tatsächlichen Umfang eintragen.",
    },
    {
      label: "ZUGANG ZU ISI",
      text: "TODO_CONTENT — tatsächlichen Umfang des persönlichen Zugangs eintragen.",
    },
    {
      label: "WEITERE MÖGLICHKEITEN",
      text: "Keine Garantie. Aber die Chance, sichtbar zu werden.",
    },
  ],
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
  count: "TODO_CONTENT",
  period: "TODO_CONTENT",
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
      a: "Die Erfahrung aus über 20 Jahren Vertrieb, Business und Aufbau — und ein Netzwerk, das funktioniert. Beides an einem Ort, über ein Login.",
    },
    {
      q: "Wie sind die Serien aufgebaut?",
      a: "So, dass jeder auf seiner Ebene einsteigen kann. Es gibt keine feste Reihenfolge, keine Hausaufgaben, keine Prüfung und kein Zertifikat. Du gehst dahin, wo du gerade stehst, und fragst im Austausch nach, was offen bleibt.",
    },
    {
      q: "Wie viel Kontakt habe ich zu dir?",
      a: "TODO_CONTENT — Live-Runden, Frequenz und Umfang des persönlichen Zugangs eintragen.",
    },
    {
      q: "Laufzeit und Zahlung?",
      a: "Ja, es kostet etwas. Wer das nicht als Investment sieht, ist hier ohnehin falsch. Einen Weg findet man: komplett auf einmal oder in zwei bis drei Zahlungen. Die eigentliche Frage ist nicht das Wie, sondern ob du überhaupt teilnehmen kannst — es ist ein Bewerbungsverfahren mit einer begrenzten Zahl an Plätzen.",
    },
    {
      q: "Kann daraus eine Zusammenarbeit werden?",
      a: "Genau das ist die Idee dahinter. Wenn jemand mitmacht, dranbleibt und auffällt, wird es interessant — dann reden wir darüber. Zusichern kann ich es dir vorab nicht, das entsteht über Zeit.",
    },
    {
      q: "Bin ich nach der Aufnahme auf mich allein gestellt?",
      a: "Nein. Du profitierst vom Netzwerk, von der Erfahrung und von den Fragen, die dort beantwortet werden — auch von denen, die du selbst nie gestellt hättest. Entscheiden musst du weiter selbst, aber du machst es nicht mehr mit dir allein aus.",
    },
  ],
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
  video: media("[FINAL_ISI_VIDEO]", "video", "ISI TAT — Abschluss", "16 / 9", {}, 22),
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
    { label: "IMPRESSUM", href: "TODO_CONTENT" },
    { label: "DATENSCHUTZ", href: "TODO_CONTENT" },
    { label: "AGB", href: "TODO_CONTENT" },
    { label: "KONTAKT", href: "TODO_CONTENT" },
  ],
  legalNote:
    "Ich teile hier Erfahrungen, keine Rezepte. Es gibt keine Zusicherung auf Ergebnisse, Einkommen oder eine Zusammenarbeit.",
} as const;

export const meta = {
  title: "ISI TAT BUSINESS CLUB — Du musst nicht alles selbst herausfinden.",
  description:
    "Über 20 Jahre Vertrieb, Business und Netzwerk. Inhalte, Live-Austausch und ein Umfeld, in dem du mit deinen Fragen nicht alleine bleibst.",
} as const;

/* --------------------------------------------------------------------------
   LOGIN
   -------------------------------------------------------------------------- */

export const login = {
  visual: media("[LOGIN_VISUAL]", "image", "ISI TAT BUSINESS CLUB", "3 / 4", {}, 5),
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
    "[PRAESENTATION_VIDEO]",
    "video",
    "Die Präsentation — ISI TAT BUSINESS CLUB",
    "16 / 9",
    {},
    1,
  ),
  afterHead: ["WENN ES", "FÜR DICH PASST."],
  afterBody:
    "Dann musst du nicht auf ein Gespräch warten. Du füllst die Vorqualifizierung aus, ich schaue sie mir an und melde mich.",
  cta: { label: "JETZT VORQUALIFIZIEREN", href: "TODO_CONTENT" },
  /* Ehrlich halten: eine Bewerbung ist keine Zusage. */
  note: "Die Vorqualifizierung ist noch keine Aufnahme. Passt es nicht, bekommst du eine Absage — das ist kein schlechtes Ergebnis, sondern ein ehrliches.",
} as const;

/* --------------------------------------------------------------------------
   ZWISCHENRUFE — der Aufruf wiederholt sich, statt nur oben und unten zu stehen
   -------------------------------------------------------------------------- */

export const ctaBands = {
  /* Zeigt auf die Menschen, nicht auf das Material: das Band steht nach
     den Serien, und ab da ist der Unterschied nicht mehr der Inhalt. */
  nachInhalten: {
    lines: ["INHALTE SIND DER ANFANG.", "DIE MENSCHEN SIND DER REST."],
    note: "Die Plätze sind begrenzt — wer rein will, zeigt es zuerst.",
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
    "[BACKDROP_CTA_INHALTE]",
    "image",
    "Hintergrund: die Halle mit dem Rolls-Royce",
    "16 / 9",
  ),
  finalCta: media(
    "[BACKDROP_ABSCHLUSS]",
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
    "[BACKDROP_CTA_CLIP]",
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
  /* Vorschau: die Antworten gehen noch nirgendwohin. Offen sagen, sonst
     wartet jemand auf eine Rueckmeldung, die niemand bekommt. */
  preview: "Vorschau — die Bewerbung wird noch nicht verschickt.",
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
