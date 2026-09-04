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
  { label: "INHALTE", href: "#inside-the-club" },
  { label: "ÜBER ISI", href: "#ueber-isi" },
  { label: "MEMBER", href: "#member" },
  { label: "MEMBERSHIP", href: "#zugang" },
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
    by: "BY ISI TAT",
    edition: "2026",
    quality: "4K",
  },
  headline: {
    lines: ["ICH ZEIGE DIR,", "WIE ICH ARBEITE."],
    /** Wird im Champagne-Akzent gesetzt. */
    accent: "NICHT, WIE DU ARBEITEN SOLLST.",
  },
  subheadline:
    "Vier Serien über Mindset, Beruf, Geld und Netzwerk. Dazu Live-Runden, in denen ich Fragen beantworte. Was du daraus machst, ist deine Sache.",
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
    "Ich verkaufe seit über zwanzig Jahren. Angefangen ohne Netzwerk, ohne Kapital, ohne Plan B.",
    "Seitdem habe ich Unternehmen mitgegründet, Teams aufgebaut, viel richtig gemacht — und einiges falsch.",
    "Im Club zeige ich beides.",
  ],
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
   INSIDE THE CLUB — Serien (Netflix-Row + Detailansicht)
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
  eyebrow: "Inside",
  headline: "INSIDE THE CLUB.",
  subline: "Vier Themen. Keine Reihenfolge.",
  /* Wird aus `catalogue` zusammengesetzt — siehe unten. */
  note: "Es kommt laufend etwas dazu. Du fängst an, wo es dich gerade betrifft — nicht bei Folge eins.",
  /* Folgentitel sind Entwuerfe, bis die finalen Titel aus der Mediathek vorliegen.
     Ausnahme: "Konsum vs Investieren" ist eine real existierende Folge. */
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
      /* interne Ablage: DER BERUF: DAS UNTERNEHMEN */
      id: "beruf",
      format: "serie",
      label: "DER BERUF",
      tagline: "Vom Job zum eigenen Unternehmen.",
      description:
        "Was sich ändert, wenn aus einer Tätigkeit ein Unternehmen wird. Verantwortung, Struktur, Leute — und die Entscheidungen, die ich heute anders treffen würde.",
      cover: media("[SERIE_BERUF_COVER]", "image", "Der Beruf", "2 / 3"),
      still: media("[SERIE_BERUF_STILL]", "image", "Der Beruf", "16 / 9"),
      preview: null,
      episodes: [
        { title: "Vom Angestellten zum Unternehmer", runtime: null },
        { title: "Verantwortung, die niemand abnimmt", runtime: null },
        { title: "Die falschen Partner erkennen", runtime: null },
        { title: "Wachsen, ohne die Kontrolle zu verlieren", runtime: null },
      ],
    },
    {
      /* interne Ablage: GELD */
      id: "geld",
      format: "serie",
      label: "GELD",
      tagline: "Verdienen ist das eine. Behalten das andere.",
      description:
        "Was passiert, wenn mehr reinkommt. Konsum, Investition, Prioritäten — und warum meine teuersten Fehler nie beim Verdienen passiert sind.",
      cover: media("[SERIE_GELD_COVER]", "image", "Geld", "2 / 3"),
      still: media("[SERIE_GELD_STILL]", "image", "Geld", "16 / 9"),
      preview: null,
      episodes: [
        /* real existierende Folge */
        { title: "Konsum vs Investieren", runtime: null },
        { title: "Was Geld mit Entscheidungen macht", runtime: null },
        { title: "Prioritäten statt Budgets", runtime: null },
      ],
    },
    {
      /* interne Ablage: FREUNDE WERBEN FREUNDE
         Oeffentlich bewusst als NETZWERK gefuehrt — die interne Bezeichnung
         beschreibt eine Vertriebsmechanik und faellt unter Punkt 7 des Briefings
         (internes Geschaeftsmodell nicht oeffentlich kommunizieren). */
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
      id: "live",
      format: "live",
      label: "LIVE",
      tagline: "Live dabei statt nur zuschauen.",
      description:
        "Der Teil, den man nicht aufzeichnen kann. Runden, in denen ich Fragen beantworte, Fälle durchgehe und Leute miteinander bekannt mache.",
      cover: media("[SERIE_LIVE_COVER]", "image", "Live", "2 / 3"),
      still: media("[SERIE_LIVE_STILL]", "image", "Live", "16 / 9"),
      preview: null,
      episodes: [
        { title: "Roundtables", runtime: null },
        { title: "Q&A mit ISI", runtime: null },
        { title: "Member-Sessions", runtime: null },
        { title: "Events vor Ort", runtime: null },
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
      text: "Erste Schritte im Verkauf. Kein Netzwerk, kein Kapital, kein Plan B.",
    },
    {
      year: "2008",
      title: "VERTRIEB",
      text: "Verkaufen wird zum Handwerk. Struktur, Verantwortung, erste Teams.",
    },
    {
      year: "2013",
      title: "BUSINESS",
      text: "Vom Verkaufen zum Aufbauen. Eigene Firmen, eigene Fehler.",
    },
    {
      year: "2018",
      title: "WACHSTUM",
      text: "Größer werden. Partnerschaften, Projekte im Ausland.",
    },
    {
      year: "2021",
      title: "FREIHEIT",
      text: "Ich entscheide, mit wem ich arbeite. Und mit wem nicht.",
    },
    {
      year: "HEUTE",
      title: "ISI TAT",
      text: "Ich mache einen Teil davon zugänglich — für Leute, die es ernst meinen.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   OPPORTUNITY MOMENT
   -------------------------------------------------------------------------- */

export const opportunity = {
  first: ["MANCHMAL WIRD", "MEHR DARAUS."],
  second: ["ABER NUR,", "WENN ES WIRKLICH"],
  accent: "PASST.",
  note: "Mit einzelnen Mitgliedern arbeite ich irgendwann zusammen, oder Leute aus meinem Umfeld tun es. Das entsteht über Zeit — nicht dadurch, dass jemand eine Mitgliedschaft gekauft hat.",
  disclaimer:
    "Daraus entsteht kein Anspruch: keine Zusage auf Zusammenarbeit, keine Position, kein Einkommen.",
} as const;

/* --------------------------------------------------------------------------
   FEHLER / FAILURE STORY
   -------------------------------------------------------------------------- */

export const failure = {
  eyebrow: "Ehrlich",
  headline: ["WAS BEI MIR", "SCHIEFGELAUFEN IST."],
  body: [
    "Zwanzig Jahre heißen nicht zwanzig Jahre richtige Entscheidungen.",
    "Falsches Timing, die falschen Leute, Chancen nicht gesehen. Das gehört dazu und ich rede darüber.",
  ],
  closing: ["MEINE ERFOLGE KANNST DU SEHEN.", "MEINE FEHLER KOSTEN DICH NICHTS."],
  image: media("[ISI_OLD_PHOTO_01]", "image", "ISI TAT — frühe Jahre", "3 / 4"),
} as const;

/* --------------------------------------------------------------------------
   FREIHEIT / LIFESTYLE
   -------------------------------------------------------------------------- */

export const lifestyle = {
  eyebrow: "Freiheit",
  headline: ["ES GEHT NICHT", "UMS AUTO."],
  headlineAccent: ["ES GEHT DARUM,", "NEIN SAGEN ZU KÖNNEN."],
  body: [
    "Ich teile mir meine Zeit selbst ein und entscheide, mit wem ich arbeite.",
    "Das ist der Unterschied, den man auf Fotos nicht sieht.",
  ],
  /* Slots entsprechen den vorhandenen Aufnahmen — nur `src` setzen. */
  gallery: [
    media("[ISI_PARIS_ROLLS_ROYCE]", "image", "Paris bei Nacht", "4 / 5"),
    media("[ISI_PRIVATE_JET]", "image", "Unterwegs", "4 / 5"),
    media("[ISI_PORSCHE_HUND]", "image", "Berlin", "4 / 5"),
    media("[ISI_GARAGE_PARTNER]", "image", "Menschen", "4 / 5"),
  ],
  disclaimer:
    "Das sind meine Bilder aus meinem Leben. Kein Versprechen, wie deins aussehen wird.",
} as const;

/* --------------------------------------------------------------------------
   NETWORK
   -------------------------------------------------------------------------- */

export const network = {
  eyebrow: "Umfeld",
  headline: ["MIT WEM DU REDEST,", "ÄNDERT ALLES."],
  body: ["Wissen findest du überall.", "An Menschen kommst du schwerer ran."],
  center: "YOU",
  nodes: [
    "SALES",
    "FOUNDERS",
    "BUSINESS",
    "ENTREPRENEURS",
    "MARKETING",
    "FINANCE",
    "CREATORS",
    "PARTNERS",
  ],
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
  eyebrow: "Mitglieder",
  headline: ["LEUTE, DIE", "SCHON DRIN SIND."],
  note: "Hier stehen erst Stimmen, wenn sie vorliegen und die Leute zugestimmt haben. Nichts Ausgedachtes.",
  items: [
    {
      name: "[NAME]",
      role: "[BERUF]",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_01]", "video", "Member-Statement", "3 / 4"),
    },
    {
      name: "[NAME]",
      role: "[BERUF]",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_02]", "video", "Member-Statement", "3 / 4"),
    },
    {
      name: "[NAME]",
      role: "[BERUF]",
      statement: "TODO_CONTENT",
      video: media("[TESTIMONIAL_VIDEO_03]", "video", "Member-Statement", "3 / 4"),
    },
  ] satisfies Testimonial[],
} as const;

/* --------------------------------------------------------------------------
   MEMBERSHIP
   -------------------------------------------------------------------------- */

export const membership = {
  eyebrow: "Mitgliedschaft",
  headline: ["WAS DU", "BEKOMMST."],
  /* Echter Screenshot des Mitgliederbereichs — das ueberzeugendste Element
     der Seite, sobald er da ist. Solange leer, steht ein Platzhalter. */
  preview: media(
    "[MEMBERBEREICH_SCREENSHOT]",
    "image",
    "Der Mitgliederbereich des ISI TAT BUSINESS CLUB",
    "16 / 10",
  ),
  previewCaption: "So sieht es von innen aus.",
  rows: [
    {
      label: "DER CLUB",
      text: "Der geschlossene Bereich. Alle Inhalte, alle Mitglieder, ein Login.",
    },
    {
      label: "DIE SERIEN",
      text: "Vier Serien zu Mindset, Beruf, Geld und Netzwerk. Es kommt laufend etwas dazu.",
    },
    {
      label: "LIVE MIT MIR",
      text: "Regelmäßige Runden, in denen ich Fragen beantworte und Fälle durchgehe.",
    },
    {
      label: "DIE LEUTE",
      text: "Austausch mit Mitgliedern, die an denselben Fragen sitzen wie du.",
    },
    {
      label: "TREFFEN",
      text: "Gemeinsame Formate und Events innerhalb des Clubs.",
    },
    {
      label: "KONTAKTE",
      text: "Verbindungen, die im Club entstehen. Keine Liste, die du bekommst.",
    },
    {
      label: "ZUGANG ZU MIR",
      text: "TODO_CONTENT — exakten tatsächlichen Umfang eintragen.",
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
      text: "Kurzes Formular. Fünf Minuten, unverbindlich.",
    },
    {
      step: "02",
      label: "GESPRÄCH",
      text: "Wir schauen, ob das passt. Ehrlich, und in beide Richtungen.",
    },
    {
      step: "03",
      label: "ZUGANG",
      text: "Passt es, bekommst du alle Infos zur Mitgliedschaft und dein Login.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   PRICING
   -------------------------------------------------------------------------- */

export const pricing = {
  eyebrow: "Preis",
  headline: "MEMBERSHIP.",
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
  note: "Was genau drin ist, steht vor dem Abschluss vollständig da. Keine Überraschungen danach.",
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
      a: "Nein. Es gibt keine Reihenfolge, keine Hausaufgaben, keine Prüfung und kein Zertifikat. Du schaust, was dich gerade betrifft, und fragst live nach, wenn etwas offen ist.",
    },
    {
      q: "Wie oft sind die Live-Runden?",
      a: "TODO_CONTENT — Frequenz und Format eintragen.",
    },
    {
      q: "Wie viel Kontakt habe ich zu dir?",
      a: "TODO_CONTENT — tatsächlichen Umfang eintragen (Live-Runden, Fragen, direkter Austausch).",
    },
    {
      q: "Wie läuft die Aufnahme?",
      a: "Du füllst das Formular aus, danach sprechen wir kurz. Wenn es für beide Seiten passt, bekommst du alle Infos und deinen Zugang. Wenn nicht, sage ich das auch.",
    },
    {
      q: "Wie lange läuft die Mitgliedschaft?",
      a: "TODO_CONTENT — Laufzeit eintragen.",
    },
    {
      q: "Wie kann ich bezahlen?",
      a: "TODO_CONTENT — Zahlungsoptionen eintragen.",
    },
    {
      q: "Kann daraus eine Zusammenarbeit werden?",
      a: "Möglich, aber ich sichere es nicht zu. Mit einzelnen Mitgliedern arbeite ich irgendwann zusammen. Das entsteht über Zeit und nicht durch den Kauf einer Mitgliedschaft.",
    },
    {
      q: "Gibt es eine Erfolgsgarantie?",
      a: "Nein. Ich zeige dir, wie ich arbeite und was ich gelernt habe. Was du damit machst, kann ich dir nicht abnehmen.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   FINAL CTA
   -------------------------------------------------------------------------- */

export const finalCta = {
  headline: ["CONTENT HAST", "DU GENUG."],
  accent: ["LEUTE, DIE ES GEMACHT", "HABEN, NICHT."],
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
  title: "ISI TAT BUSINESS CLUB — Ich zeige dir, wie ich arbeite.",
  description:
    "Vier Serien über Mindset, Beruf, Geld und Netzwerk. Dazu Live-Runden mit ISI. Kein Kurs, kein Lehrplan.",
} as const;
