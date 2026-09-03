/* =============================================================================
   ISI TAT BUSINESS CLUB — Zentrale Content-Datei
   -----------------------------------------------------------------------------
   Einzige Quelle fuer Texte, Zahlen, Medien, Karten, CTA-Ziele und Pricing.
   Komponenten enthalten KEINE fest verdrahteten Inhalte.

   KONVENTIONEN
   - `TODO_CONTENT`  = Inhalt liegt noch nicht bestaetigt vor. Nichts erfinden.
   - `src: null`     = Asset fehlt. Es wird ein gestalteter Platzhalter mit
                       korrektem Seitenverhaeltnis gerendert (siehe <Media/>).
                       Zum Austausch nur `src` (und ggf. `poster`) setzen.
   - Zahlen bleiben "[XX]+" bis sie bestaetigt sind.
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
  login: { label: "LOGIN", href: "TODO_CONTENT" },
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
    line1: "20+ JAHRE ERFAHRUNG.",
    /** Wird im Champagne-Akzent gesetzt. */
    accent: ["DAMIT DU NICHT JEDEN", "FEHLER SELBST MACHEN MUSST."],
  },
  subheadline:
    "Zugang zu Erfahrungen, Business-Perspektiven, Vertrieb, Austausch, Netzwerk und ausgewählten Möglichkeiten zur Zusammenarbeit.",
  trustLine: [
    "20+ JAHRE BUSINESS",
    "VERTRIEB",
    "UNTERNEHMERTUM",
    "NETWORK",
    "LIVE EXPERIENCE",
  ],
  video: media(
    "[ISI_HERO_VIDEO]",
    "video",
    "ISI TAT im Portrait — Hero-Sequenz",
    "4 / 5",
  ),
  image: media(
    "[ISI_HERO_IMAGE]",
    "image",
    "ISI TAT — Hero-Portrait",
    "4 / 5",
  ),
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
  headline: ["SEIN RUF", "IST SEIN KAPITAL."],
  body: [
    "ISI muss heute nicht mehr mit jedem arbeiten. Und genau deshalb tut er es auch nicht.",
    "Über mehr als zwei Jahrzehnte hat er Erfahrungen gesammelt, Beziehungen aufgebaut, verkauft, verhandelt, Entscheidungen getroffen und Fehler gemacht.",
    "Sein Ruf basiert nicht auf einem Zertifikat. Sondern auf dem, was er über Jahre getan und aufgebaut hat.",
    "Der ISI TAT BUSINESS CLUB gibt ausgewählten Menschen Zugang zu einem Teil dieser Erfahrungen und Perspektiven.",
  ],
  video: media(
    "[ISI_REPUTATION_VIDEO]",
    "video",
    "ISI TAT über Ruf, Erfahrung und Zusammenarbeit",
    "3 / 4",
  ),
  /* Vom Auftraggeber freigegeben (Stand: Uebernahme aus der Vorgaengerseite). */
  metrics: [
    { value: "20+", label: "JAHRE ERFAHRUNG" },
    { value: "7", label: "UNTERNEHMEN MITGEGRÜNDET" },
    { value: "8+", label: "STELLIG UMGESETZT" },
    { value: "150+", label: "MITGLIEDER IM CLUB" },
  ],
} as const;

/* --------------------------------------------------------------------------
   INSIDE THE CLUB — Netflix-artige Content Row
   -------------------------------------------------------------------------- */

export interface ContentCard {
  label: string;
  copy: string;
  thumbnail: MediaAsset;
  /** Optionales stummes Hover-Preview (nur Desktop). null = kein Preview. */
  preview: MediaAsset | null;
  /** Ziel der Karte. null = noch kein Ziel definiert -> Karte ist nicht klickbar. */
  href: string | null;
}

export const insideTheClub = {
  headline: "INSIDE THE CLUB.",
  subline: "Wissen. Einblicke. Erfahrungen.",
  cards: [
    {
      label: "MINDSET",
      copy: "Entscheidungen. Disziplin. Standards.",
      thumbnail: media("[CONTENT_MINDSET]", "image", "Mindset", "2 / 3"),
      preview: null,
      href: null,
    },
    {
      label: "SALES",
      copy: "Kommunikation. Menschen verstehen. Vertrauen. Abschluss.",
      thumbnail: media("[CONTENT_SALES]", "image", "Sales", "2 / 3"),
      preview: null,
      href: null,
    },
    {
      label: "NETWORK",
      copy: "Beziehungen. Vertrauen. Chancen.",
      thumbnail: media("[CONTENT_NETWORK]", "image", "Network", "2 / 3"),
      preview: null,
      href: null,
    },
    {
      label: "BUSINESS",
      copy: "Erfahrungen. Entscheidungen. Umsetzung.",
      thumbnail: media("[CONTENT_BUSINESS]", "image", "Business", "2 / 3"),
      preview: null,
      href: null,
    },
    {
      label: "REAL STORIES",
      copy: "Erfolge. Fehler. Learnings.",
      thumbnail: media(
        "[CONTENT_REAL_STORIES]",
        "image",
        "Real Stories",
        "2 / 3",
      ),
      preview: null,
      href: null,
    },
    {
      label: "LIVE EXPERIENCE",
      copy: "Roundtables. Gespräche. Events.",
      thumbnail: media("[CONTENT_LIVE]", "image", "Live Experience", "2 / 3"),
      preview: null,
      href: null,
    },
  ] satisfies ContentCard[],
} as const;

/* --------------------------------------------------------------------------
   TIMELINE — vorbereitet fuer Phase 2
   Jahre vom Auftraggeber freigegeben, Beschreibungstexte fehlen noch.
   -------------------------------------------------------------------------- */

export interface TimelineEntry {
  year: string;
  title: string;
  text: string;
}

export const timeline = {
  headline: ["EIN WEG.", "20+ JAHRE.", "ECHTE ERFAHRUNGEN."],
  entries: [
    { year: "2003", title: "ANFÄNGE", text: "TODO_CONTENT" },
    { year: "2008", title: "VERTRIEB", text: "TODO_CONTENT" },
    { year: "2013", title: "BUSINESS", text: "TODO_CONTENT" },
    { year: "2018", title: "WACHSTUM", text: "TODO_CONTENT" },
    { year: "2021", title: "FREIHEIT", text: "TODO_CONTENT" },
    { year: "HEUTE", title: "ISI TAT", text: "TODO_CONTENT" },
  ] satisfies TimelineEntry[],
} as const;

/* --------------------------------------------------------------------------
   RECHTLICHE HINWEISE
   -------------------------------------------------------------------------- */

export const disclaimers = {
  lifestyle:
    "Der dargestellte Lebensstil zeigt persönliche Erfahrungen von ISI und stellt kein Versprechen über Ergebnisse von Mitgliedern dar.",
  opportunity:
    "Keine Garantie auf eine Zusammenarbeit, ein Einkommen oder eine Position.",
} as const;

export const footer = {
  claim: "ISI TAT BUSINESS CLUB",
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
  title: "ISI TAT BUSINESS CLUB — 20+ Jahre Erfahrung.",
  description:
    "Zugang zu Erfahrungen, Business-Perspektiven, Vertrieb, Austausch, Netzwerk und ausgewählten Möglichkeiten zur Zusammenarbeit.",
} as const;
