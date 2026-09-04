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
   Serien-Beschreibungen, Folgentitel, Membership-Zeilen und FAQ-Antworten sind
   als Entwurf gesetzt, damit die Seite vollstaendig lesbar ist. Sie sind
   ersetzbar und beschreiben Themen — keine Zusicherungen, keine Zahlen,
   keine Ergebnisse.

   FERNUSG
   Bewusst NICHT verwendet: Modulnummern, Lektionsnummern, vorgegebene
   Reihenfolgen, Lernpfade, Lernkontrollen, Zertifikate. Die Inhalte sind als
   Mediathek beschrieben, nicht als Lehrgang.
   ========================================================================== */

/** true, wenn eine Angabe noch nicht bestaetigt vorliegt. */
export const isPending = (value: string) => value.startsWith("TODO_CONTENT");

export type MediaKind = "image" | "video";

export interface MediaAsset {
  /** Sichtbares Platzhalter-Label, z. B. "[ISI_HERO_VIDEO]" */
  id: string;
  kind: MediaKind;
  /** null = noch kein Asset geliefert */
  src: string | null;
  /** Poster/Fallback fuer Videos */
  poster?: string | null;
  /** Kleinere Quelle fuer Mobile (Performance) */
  srcMobile?: string | null;
  /** Aussagekraeftiger Alt-Text bzw. Videobeschreibung */
  alt: string;
  /** CSS aspect-ratio, z. B. "16 / 9" */
  ratio: string;
}

const media = (
  id: string,
  kind: MediaKind,
  alt: string,
  ratio: string,
  extra: Partial<MediaAsset> = {},
): MediaAsset => ({
  id,
  kind,
  src: null,
  poster: null,
  alt,
  ratio,
  ...extra,
});

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
  primary: { label: "ZUGANG ANFRAGEN", href: "#zugang" },
  secondary: { label: "TRAILER ANSEHEN", href: "#trailer" },
  heroSecondary: { label: "90 SEKUNDEN TRAILER", href: "#trailer" },
  login: { label: "LOGIN", href: "/login" },
} as const;

export const nav = [
  { label: "INHALTE", href: "#im-club" },
  { label: "ÜBER ISI", href: "#ueber-isi" },
  { label: "ERFAHRUNGEN", href: "#erfahrungen" },
  { label: "MITGLIEDSCHAFT", href: "#zugang" },
  { label: "FAQ", href: "#faq" },
] as const;

/* --------------------------------------------------------------------------
   HERO
   -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "ISI TAT BUSINESS CLUB",
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
      lines: ["DU MUSST NICHT ALLES", "SELBST HERAUSFINDEN."],
      accent: ["20+ JAHRE ERFAHRUNG", "AN DEINER SEITE."],
    },
    b: {
      lines: ["20+ JAHRE ERFAHRUNG."],
      accent: ["DAMIT DU NICHT JEDEN", "FEHLER SELBST MACHEN MUSST."],
    },
  },
  subheadline:
    "Erfahrung. Orientierung. Austausch. Netzwerk. Und ein Umfeld, in dem du mit deinen Fragen nicht alleine bleibst.",
  trustLine: [
    "20+ JAHRE ERFAHRUNG",
    "VERTRIEB",
    "BUSINESS",
    "NETZWERK",
    "LIVE-AUSTAUSCH",
  ],
  video: media(
    "[ISI_HERO_VIDEO]",
    "video",
    "ISI TAT im Portrait — Hero-Sequenz",
    "4 / 5",
  ),
  image: media("[ISI_HERO_IMAGE]", "image", "ISI TAT — Hero-Portrait", "4 / 5"),
} as const;

/* --------------------------------------------------------------------------
   TRAILER
   -------------------------------------------------------------------------- */

export const trailer = {
  label: "90 SEKUNDEN TRAILER",
  closeLabel: "SCHLIESSEN",
  video: media(
    "[ISI_TRAILER_VIDEO]",
    "video",
    "90 Sekunden Trailer — ISI TAT BUSINESS CLUB",
    "16 / 9",
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
      visual: media(
        "[ISI_INTRO_FAHRZEUG]",
        "video",
        "ISI TAT unterwegs",
        "16 / 9",
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
      visual: media(
        "[ISI_INTRO_BEWEGUNG]",
        "video",
        "ISI TAT in Bewegung",
        "16 / 9",
      ),
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   TRUST / REPUTATION
   -------------------------------------------------------------------------- */

export const trust = {
  eyebrow: "Über mich",
  headline: ["KURZ", "ZU MIR."],
  body: [
    "Über zwanzig Jahre Vertrieb. Angefangen ohne Netzwerk, ohne Kapital, ohne Plan B.",
    "Seitdem: eigene Unternehmen, eigene Teams, eigene Fehler.",
  ],
  /* Steht als eigene Zeile unter der Copy — die Kernhaltung der Seite. */
  claim: "Du musst nicht jede Situation zum ersten Mal alleine erleben.",
  video: media(
    "[ISI_REPUTATION_VIDEO]",
    "video",
    "ISI TAT über seinen Weg",
    "3 / 4",
  ),
  /* Vom Auftraggeber freigegeben. */
  metrics: [
    { value: "20+", label: "JAHRE ERFAHRUNG" },
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
  headline: "WAS DICH DRINNEN ERWARTET.",
  subline: "Sechs Bereiche. Keine Reihenfolge.",
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
      cover: media("[SERIE_MINDSET_COVER]", "image", "Mindset & Persönlichkeit", "2 / 3"),
      still: media("[SERIE_MINDSET_STILL]", "image", "Mindset & Persönlichkeit", "16 / 9"),
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
      cover: media("[SERIE_VERTRIEB_COVER]", "image", "Vertrieb", "2 / 3"),
      still: media("[SERIE_VERTRIEB_STILL]", "image", "Vertrieb", "16 / 9"),
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
      cover: media("[SERIE_BUSINESS_COVER]", "image", "Business", "2 / 3"),
      still: media("[SERIE_BUSINESS_STILL]", "image", "Business", "16 / 9"),
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
      cover: media("[SERIE_NETZWERK_COVER]", "image", "Netzwerk", "2 / 3"),
      still: media("[SERIE_NETZWERK_STILL]", "image", "Netzwerk", "16 / 9"),
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
      cover: media("[SERIE_GESCHICHTEN_COVER]", "image", "Echte Geschichten", "2 / 3"),
      still: media("[SERIE_GESCHICHTEN_STILL]", "image", "Echte Geschichten", "16 / 9"),
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
      cover: media("[SERIE_LIVE_COVER]", "image", "Live mit ISI", "2 / 3"),
      still: media("[SERIE_LIVE_STILL]", "image", "Live mit ISI", "16 / 9"),
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
  seriesCount: insideTheClub.series.filter((s) => s.format === "serie").length,
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
  entries: [
    {
      year: "2003",
      title: "ANFÄNGE",
      text: "Erste Schritte im Verkauf.",
    },
    {
      year: "2008",
      title: "VERTRIEB",
      text: "Verkaufen wird zum Handwerk.",
    },
    {
      year: "2013",
      title: "BUSINESS",
      text: "Vom Verkaufen zum Aufbauen.",
    },
    {
      year: "2018",
      title: "WACHSTUM",
      text: "Partnerschaften, Projekte im Ausland.",
    },
    {
      year: "2021",
      title: "FREIHEIT",
      text: "Ich entscheide, mit wem ich arbeite.",
    },
    {
      year: "HEUTE",
      title: "ISI TAT",
      text: "Der Club öffnet einen Teil davon.",
    },
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
    "Falsches Timing. Falsche Menschen. Chancen zu spät erkannt.",
    "Das gehört genauso in den Club wie das, was funktioniert hat.",
  ],
  closing: [
    "MEINE ERFOLGE KANNST DU SEHEN.",
    "VON MEINEN FEHLERN KANNST DU MEHR LERNEN.",
  ],
  image: media("[ISI_OLD_PHOTO_01]", "image", "ISI TAT — frühe Jahre", "3 / 4"),
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
  gallery: [
    media("[ISI_ROLLS_ROYCE]", "image", "Paris bei Nacht", "4 / 5"),
    media("[ISI_REISE]", "image", "Unterwegs", "4 / 5"),
    media("[ISI_FAMILIE]", "image", "Zuhause", "4 / 5"),
    media("[ISI_BUSINESS]", "image", "Bei der Arbeit", "4 / 5"),
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

export const live = {
  eyebrow: "Live mit ISI",
  headline: ["WENN EINE FRAGE NICHT BIS", "ZUM NÄCHSTEN VIDEO WARTEN KANN."],
  body: [
    "Business läuft selten exakt nach Plan.",
    "Deshalb besteht der Club nicht nur aus Inhalten.",
  ],
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
  visual: media("[ISI_LIVE_RUNDE]", "video", "Live-Runde mit ISI TAT", "16 / 9"),
} as const;

/* --------------------------------------------------------------------------
   TESTIMONIALS — keine erfundenen Aussagen, nur Platzhalter
   -------------------------------------------------------------------------- */

export interface Testimonial {
  name: string;
  role: string;
  statement: string;
  video: MediaAsset;
}

export const testimonials = {
  eyebrow: "Erfahrungen",
  headline: ["MENSCHEN, DIE", "SCHON DRIN SIND."],
  note: "Hier stehen erst Stimmen, wenn sie vorliegen und die Leute zugestimmt haben. Nichts Ausgedachtes.",
  items: [
    {
      name: "[NAME]",
      role: "[BERUF]",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_01]", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
    {
      name: "[NAME]",
      role: "[BERUF]",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_02]", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
    {
      name: "[NAME]",
      role: "[BERUF]",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_03]", "video", "Erfahrungsbericht eines Mitglieds", "3 / 4"),
    },
  ] satisfies Testimonial[],
} as const;

/* --------------------------------------------------------------------------
   MITGLIEDSCHAFT
   -------------------------------------------------------------------------- */

export const membership = {
  eyebrow: "Deine Mitgliedschaft",
  headline: ["NICHT NUR CONTENT."],
  headlineAccent: ["EIN UMFELD,", "DAS MITDENKT."],
  previewCaption:
    "So sieht der Mitgliederbereich aus. Abbildung — die Inhalte wachsen laufend.",
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
  eyebrow: "Aufnahme",
  headline: ["SO KOMMST", "DU REIN."],
  steps: [
    {
      step: "01",
      label: "ANFRAGE",
      text: "Fünf Minuten. Unverbindlich.",
    },
    {
      step: "02",
      label: "GESPRÄCH",
      text: "Wir schauen, ob es passt. In beide Richtungen.",
    },
    {
      step: "03",
      label: "ZUGANG",
      text: "Passt es, bekommst du dein Login.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   PRICING
   -------------------------------------------------------------------------- */

export const pricing = {
  eyebrow: "Preis",
  headline: "MITGLIEDSCHAFT.",
  subline: "ISI TAT BUSINESS CLUB",
  price: "4.900 €",
  /* Noch offen — bitte eintragen. */
  term: "TODO_CONTENT",
  payment: "TODO_CONTENT",
  facts: [
    "Ein Preis, keine Stufen.",
    "Kein Streichpreis, kein Countdown.",
    "Kein Upsell nach dem Kauf.",
  ],
  note: "Was drin ist, steht vor dem Abschluss vollständig da.",
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
      a: "Für Leute, die verkaufen, aufbauen oder selbstständig arbeiten wollen und dafür ein anderes Umfeld brauchen. Nicht für alle — das ist keine Verknappung, das ist einfach so.",
    },
    {
      q: "Was bekomme ich konkret?",
      a: "Zugang zum Club mit vier Serien zu Mindset, Beruf, Geld und Netzwerk, Live-Runden mit mir, und den Austausch mit den anderen Mitgliedern. Alles über ein Login.",
    },
    {
      q: "Ist das ein Kurs?",
      a: "Nein. Keine Reihenfolge, keine Hausaufgaben, keine Prüfung, kein Zertifikat. Du schaust, was dich gerade betrifft, und fragst live nach.",
    },
    {
      q: "Wie viel Kontakt habe ich zu dir?",
      a: "TODO_CONTENT — Live-Runden, Frequenz und Umfang des persönlichen Zugangs eintragen.",
    },
    {
      q: "Laufzeit und Zahlung?",
      a: "TODO_CONTENT — Laufzeit und Zahlungsoptionen eintragen.",
    },
    {
      q: "Kann daraus eine Zusammenarbeit werden?",
      a: "Möglich, aber ich sichere es nicht zu. Das entsteht über Zeit und dadurch, wie jemand auffällt — nicht durch den Kauf.",
    },
    {
      q: "Bin ich nach dem Kauf auf mich allein gestellt?",
      a: "Nein. Genau das soll der Club nicht sein. Du bekommst Zugang zu den verfügbaren Inhalten, den Live-Formaten und dem Austausch innerhalb des Clubs. Du triffst deine Entscheidungen weiterhin selbst — aber du musst nicht jede Frage alleine mit dir ausmachen.",
    },
    {
      q: "Gibt es eine Erfolgsgarantie?",
      a: "Nein. Kein seriöser Mensch kann dir ein bestimmtes geschäftliches oder finanzielles Ergebnis garantieren. Was wir dir geben können, sind Erfahrungen, Perspektiven, Austausch und ein Umfeld, das dich bei deinen nächsten Entscheidungen unterstützen kann.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   FINAL CTA
   -------------------------------------------------------------------------- */

export const finalCta = {
  headline: ["CONTENT HAST", "DU GENUG."],
  accent: ["DIE FRAGE IST, MIT WEM DU", "DEINE NÄCHSTEN ENTSCHEIDUNGEN TRIFFST."],
  body: [
    "20+ Jahre Erfahrung.",
    "Ein starkes Umfeld.",
    "Und Menschen, die nicht nur darüber reden.",
  ],
  brand: "ISI TAT BUSINESS CLUB",
  video: media(
    "[FINAL_ISI_VIDEO]",
    "video",
    "ISI TAT — Abschluss",
    "16 / 9",
  ),
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
