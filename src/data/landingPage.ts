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
  { label: "ÜBER ISI", href: "#ueber-isi" },
  { label: "INSIDE THE CLUB", href: "#inside-the-club" },
  { label: "ERFAHRUNG", href: "#erfahrung" },
  { label: "FÜR WEN", href: "#fuer-wen" },
  { label: "FAQ", href: "#faq" },
] as const;

/* --------------------------------------------------------------------------
   HERO
   -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "ISI TAT BUSINESS CLUB",
  headline: {
    lines: ["ERFAHRUNG LÄSST SICH", "NICHT ABKÜRZEN."],
    /** Wird im Champagne-Akzent gesetzt. */
    accent: "ZUGANG SCHON.",
  },
  subheadline:
    "Zwanzig Jahre Vertrieb, Unternehmertum und Netzwerk — in einem Raum, der nicht für jeden offen ist.",
  trustLine: ["20+ JAHRE", "VERTRIEB", "UNTERNEHMERTUM", "NETZWERK", "LIVE"],
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
   TRUST / REPUTATION
   -------------------------------------------------------------------------- */

export const trust = {
  eyebrow: "Über ISI",
  headline: ["SEIN RUF", "IST SEIN KAPITAL."],
  body: [
    "ISI muss heute nicht mehr mit jedem arbeiten. Genau deshalb tut er es nicht.",
    "Dahinter stehen zwanzig Jahre verkaufen, verhandeln, entscheiden — und Fehler machen. Kein Zertifikat.",
    "Der Club öffnet einen Teil davon.",
  ],
  video: media(
    "[ISI_REPUTATION_VIDEO]",
    "video",
    "ISI TAT über Ruf, Erfahrung und Zusammenarbeit",
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
  subline: "Vier Welten. Kein Lehrplan.",
  note: "Folgen kommen laufend dazu. Es gibt keine Reihenfolge — du steigst ein, wo es dich betrifft.",
  /* Folgentitel sind Entwuerfe, bis die finalen Titel aus der Mediathek vorliegen.
     Ausnahme: "Konsum vs Investieren" ist eine real existierende Folge. */
  draftEpisodeNote:
    "Folgentitel sind Arbeitsstände und werden durch die finalen Titel ersetzt.",
  series: [
    {
      /* interne Ablage: MINDSET:PERSÖNLICHKEIT */
      id: "mindset",
      label: "MINDSET & PERSÖNLICHKEIT",
      tagline: "Entscheiden, wenn es unbequem wird.",
      description:
        "Wie ISI Entscheidungen trifft, wenn Informationen fehlen und Zeit knapp ist. Über Standards, die niemand kontrolliert — und was passiert, wenn man sie unterschreitet.",
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
      label: "DER BERUF",
      tagline: "Vom Job zum eigenen Unternehmen.",
      description:
        "Was sich ändert, wenn aus einer Tätigkeit ein Unternehmen wird. Über Verantwortung, Struktur, Menschen — und die Entscheidungen, die ISI heute anders treffen würde.",
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
      label: "GELD",
      tagline: "Verdienen ist das eine. Behalten das andere.",
      description:
        "Der Umgang mit Geld, wenn es mehr wird. Konsum, Investition, Prioritäten — und warum die meisten Fehler nicht beim Verdienen passieren.",
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
      label: "NETZWERK",
      tagline: "Wer dich kennt, entscheidet mit.",
      description:
        "Warum Zugang zu Menschen schwerer zu bekommen ist als Wissen. Wie Beziehungen entstehen, woran sie zerbrechen und was Verlässlichkeit über Jahre wert ist.",
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
      label: "LIVE",
      tagline: "Roundtables, Gespräche, Begegnungen.",
      description:
        "Der Teil, der sich nicht aufzeichnen lässt. Live-Formate mit ISI und dem Umfeld des Clubs — Fragen, Fälle, echte Gespräche.",
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

/* --------------------------------------------------------------------------
   TIMELINE — Jahre vom Auftraggeber freigegeben
   -------------------------------------------------------------------------- */

export const timeline = {
  eyebrow: "Erfahrung",
  headline: ["EIN WEG.", "ZWANZIG JAHRE."],
  entries: [
    {
      year: "2003",
      title: "ANFÄNGE",
      text: "Erste Schritte im Verkauf. Kein Netzwerk, kein Kapital, kein Plan B.",
    },
    {
      year: "2008",
      title: "VERTRIEB",
      text: "Vertrieb wird zum Handwerk. Struktur, Verantwortung, erste Teams.",
    },
    {
      year: "2013",
      title: "BUSINESS",
      text: "Vom Verkaufen zum Aufbauen. Eigene Unternehmen, eigene Fehler.",
    },
    {
      year: "2018",
      title: "WACHSTUM",
      text: "Skalierung, Partnerschaften, internationale Projekte.",
    },
    {
      year: "2021",
      title: "FREIHEIT",
      text: "Entscheiden, mit wem und woran gearbeitet wird. Und mit wem nicht.",
    },
    {
      year: "HEUTE",
      title: "ISI TAT",
      text: "Der Club öffnet einen Teil dieser zwanzig Jahre für ausgewählte Menschen.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   VIER BEREICHE — Sticky-Szene (Desktop) / Karten (Mobile)
   -------------------------------------------------------------------------- */

export const pillars = {
  eyebrow: "Fundament",
  headline: ["VIER BEREICHE.", "EIN FUNDAMENT."],
  items: [
    {
      id: "mindset",
      label: "MINDSET",
      text: "Entscheidungen. Disziplin. Verantwortung. Der Umgang mit Rückschlägen.",
      image: media("[PILLAR_MINDSET_IMAGE]", "image", "Mindset", "4 / 3"),
    },
    {
      id: "beruf",
      label: "DER BERUF",
      text: "Vom Job zum Unternehmen. Verantwortung, Struktur, Entscheidungen.",
      image: media("[PILLAR_BERUF_IMAGE]", "image", "Der Beruf", "4 / 3"),
    },
    {
      id: "geld",
      label: "GELD",
      text: "Verdienen, behalten, investieren. Prioritäten statt Budgets.",
      image: media("[PILLAR_GELD_IMAGE]", "image", "Geld", "4 / 3"),
    },
    {
      id: "opportunity",
      label: "OPPORTUNITY",
      text: "Wer im Umfeld des Clubs durch Persönlichkeit, Zuverlässigkeit und Entwicklung auffällt, wird sichtbar. Daraus können sich weitere Möglichkeiten ergeben.",
      note: "Keine Jobgarantie. Keine Einkommensgarantie. Keine zugesicherte Zusammenarbeit.",
      image: media("[PILLAR_OPPORTUNITY_IMAGE]", "image", "Opportunity", "4 / 3"),
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   OPPORTUNITY MOMENT
   -------------------------------------------------------------------------- */

export const opportunity = {
  first: ["DIE MITGLIEDSCHAFT", "KANNST DU KAUFEN."],
  second: ["DIE CHANCE", "MUSST DU DIR"],
  accent: "VERDIENEN.",
  note: "Wer im Club durch Persönlichkeit, Leistung und Zuverlässigkeit auffällt, wird im Umfeld von ISI sichtbar. Eine Garantie ist das nicht.",
} as const;

/* --------------------------------------------------------------------------
   FEHLER / FAILURE STORY
   -------------------------------------------------------------------------- */

export const failure = {
  eyebrow: "Ehrlich",
  headline: ["NICHT JEDE ENTSCHEIDUNG", "WAR RICHTIG."],
  body: [
    "Zwanzig Jahre Business heißen nicht zwanzig Jahre richtige Entscheidungen.",
    "Sie heißen auch: falsches Timing, falsche Menschen, verpasste Chancen.",
  ],
  closing: ["SEINE ERFOLGE KANNST DU SEHEN.", "SEINE FEHLER SPAREN DIR ZEIT."],
  image: media("[ISI_OLD_PHOTO_01]", "image", "ISI TAT — frühe Jahre", "3 / 4"),
} as const;

/* --------------------------------------------------------------------------
   FREIHEIT / LIFESTYLE
   -------------------------------------------------------------------------- */

export const lifestyle = {
  eyebrow: "Freiheit",
  headline: ["ES GEHT NICHT UM", "DEN ROLLS-ROYCE."],
  headlineAccent: ["ES GEHT UM", "DIE WAHL."],
  body: [
    "Zeit selbst einteilen. Menschen unterstützen. Der Familie Möglichkeiten geben.",
    "Und unabhängig entscheiden, wie man leben und arbeiten möchte.",
  ],
  /* Slots entsprechen den vorhandenen Aufnahmen — nur `src` setzen. */
  gallery: [
    media("[ISI_PARIS_ROLLS_ROYCE]", "image", "Paris bei Nacht", "4 / 5"),
    media("[ISI_PRIVATE_JET]", "image", "Unterwegs", "4 / 5"),
    media("[ISI_PORSCHE_HUND]", "image", "Berlin", "4 / 5"),
    media("[ISI_GARAGE_PARTNER]", "image", "Menschen", "4 / 5"),
  ],
  disclaimer:
    "Der dargestellte Lebensstil zeigt persönliche Erfahrungen von ISI und stellt kein Versprechen über Ergebnisse von Mitgliedern dar.",
} as const;

/* --------------------------------------------------------------------------
   NETWORK
   -------------------------------------------------------------------------- */

export const network = {
  eyebrow: "Umfeld",
  headline: ["DEIN UMFELD VERÄNDERT", "DEINE PERSPEKTIVE."],
  body: ["Information ist heute überall verfügbar.", "Zugang zu Menschen nicht."],
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
  eyebrow: "Member",
  headline: ["ECHTE MENSCHEN.", "ECHTE ERFAHRUNGEN."],
  note: "Statements werden erst veröffentlicht, wenn sie vorliegen und freigegeben sind.",
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
  eyebrow: "Membership",
  headline: ["DEINE", "MEMBERSHIP."],
  rows: [
    {
      label: "PRIVATE CLUB ACCESS",
      text: "Zugang zum geschlossenen Umfeld des ISI TAT BUSINESS CLUB.",
    },
    {
      label: "BUSINESS INSIGHTS",
      text: "Serien und Gespräche zu Vertrieb, Unternehmertum, Netzwerk und Entscheidungen.",
    },
    {
      label: "LIVE ROUNDTABLES",
      text: "Regelmäßige Live-Formate mit ISI und dem Umfeld des Clubs.",
    },
    {
      label: "COMMUNITY",
      text: "Austausch mit Menschen, die an vergleichbaren Fragen arbeiten.",
    },
    {
      label: "MEMBER EXPERIENCES",
      text: "Gemeinsame Formate und Begegnungen innerhalb des Clubs.",
    },
    {
      label: "NETWORK",
      text: "Kontakte, die über den Club entstehen — nicht über eine Liste.",
    },
    {
      label: "ISI ACCESS",
      text: "TODO_CONTENT — exakten tatsächlichen Umfang eintragen.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   BEWERBUNGSPROZESS
   -------------------------------------------------------------------------- */

export const application = {
  eyebrow: "Aufnahme",
  headline: ["DEIN WEG", "IN DEN CLUB."],
  steps: [
    {
      step: "01",
      label: "ANFRAGE",
      text: "Ein kurzes Formular. Fünf Minuten, keine Verpflichtung.",
    },
    {
      step: "02",
      label: "MATCH",
      text: "Wir schauen, ob Club und Interessent grundsätzlich zueinander passen.",
    },
    {
      step: "03",
      label: "ACCESS",
      text: "Wenn es passt, erhältst du alle Informationen zur Mitgliedschaft.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   PRICING
   -------------------------------------------------------------------------- */

export const pricing = {
  eyebrow: "Investment",
  headline: "MEMBERSHIP.",
  subline: "ISI TAT BUSINESS CLUB",
  price: "4.900 €",
  /* Noch offen — bitte eintragen. */
  term: "TODO_CONTENT",
  payment: "TODO_CONTENT",
  facts: [
    "Kein Streichpreis.",
    "Kein Countdown.",
    "Keine künstliche Verknappung.",
  ],
  note: "Der genaue Leistungsumfang wird vor Abschluss vollständig dargestellt.",
} as const;

/* --------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */

export const faq = {
  eyebrow: "FAQ",
  headline: ["HÄUFIGE", "FRAGEN."],
  items: [
    {
      q: "Für wen ist der Club?",
      a: "Für Menschen, die im Vertrieb, im Unternehmertum oder in der Selbstständigkeit arbeiten und ihr Umfeld verändern wollen. Nicht für alle — und das ist Absicht.",
    },
    {
      q: "Was bekomme ich?",
      a: "Zugang zum Club, zu Serien und Gesprächen aus zwanzig Jahren Erfahrung, zu Live-Formaten und zum Umfeld der Mitglieder.",
    },
    {
      q: "Wie funktionieren die Live-Formate?",
      a: "Regelmäßige Roundtables und Q&A-Sessions mit ISI und Mitgliedern. Termine und Frequenz werden im Club angekündigt.",
    },
    {
      q: "Wie viel Kontakt gibt es zu ISI?",
      a: "TODO_CONTENT — tatsächlichen Umfang eintragen (Live-Formate, Q&A, direkter Austausch).",
    },
    {
      q: "Wie läuft die Aufnahme ab?",
      a: "Anfrage über das Formular, danach ein kurzer Abgleich, ob Club und Interessent zueinander passen. Passt es, folgen alle Informationen zur Mitgliedschaft.",
    },
    {
      q: "Wie lange läuft meine Mitgliedschaft?",
      a: "TODO_CONTENT — Laufzeit eintragen.",
    },
    {
      q: "Welche Zahlungsoptionen gibt es?",
      a: "TODO_CONTENT — Zahlungsoptionen eintragen.",
    },
    {
      q: "Kann sich daraus eine Zusammenarbeit ergeben?",
      a: "Möglich, aber nicht zugesichert. Wer im Club durch Persönlichkeit, Leistung und Zuverlässigkeit auffällt, wird sichtbar. Einen Anspruch begründet das nicht.",
    },
    {
      q: "Gibt es eine Erfolgsgarantie?",
      a: "Nein. Der Club gibt Zugang zu Erfahrungen, Perspektiven und Menschen. Was daraus wird, hängt von dir ab.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   FINAL CTA
   -------------------------------------------------------------------------- */

export const finalCta = {
  headline: ["DU BRAUCHST NICHT", "NOCH MEHR CONTENT."],
  accent: ["DU BRAUCHST", "EIN ANDERES UMFELD."],
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
  links: [
    { label: "IMPRESSUM", href: "TODO_CONTENT" },
    { label: "DATENSCHUTZ", href: "TODO_CONTENT" },
    { label: "AGB", href: "TODO_CONTENT" },
    { label: "KONTAKT", href: "TODO_CONTENT" },
  ],
  legalNote:
    "Die Inhalte dienen dem Erfahrungsaustausch und der persönlichen Weiterentwicklung. Es werden keine Ergebnisse, Einkommen oder Zusammenarbeiten zugesichert.",
} as const;

export const meta = {
  title: "ISI TAT BUSINESS CLUB — Erfahrung lässt sich nicht abkürzen.",
  description:
    "Zwanzig Jahre Vertrieb, Unternehmertum und Netzwerk — in einem Raum, der nicht für jeden offen ist.",
} as const;
