import { readFileSync, statSync } from "node:fs";
import { nachrichten, type Nachricht } from "@/data/club";
import { beispielNews, beispieleAktiv } from "@/data/beispiele";
import { socialFeed, type FeedQuelle } from "./social";

/**
 * Der Feed: was ISI im Club schreibt, zusammen mit dem, was er draussen
 * veroeffentlicht.
 *
 * Eigene Nachrichten kommen aus dem Projekt oder aus CLUB_NEWS_DATEI.
 * Videos von YouTube und Instagram holt social.ts — nur, wenn die
 * Quellen eingerichtet sind. Alles zusammen, neueste zuerst.
 */

export interface FeedEintrag {
  id: string;
  /** "club" = von ISI im Club geschrieben. */
  quelle: FeedQuelle | "club";
  datum: string;
  titel: string;
  text: readonly string[];
  bild?: string;
  /** Bei Eintraegen von draussen: wohin es geht. */
  link?: string;
  /** Bilder von draussen laufen durch /api/bild — siehe dort, warum. */
  bildVonDraussen?: boolean;
  beispiel?: boolean;
}

let zwischen: { stand: number; liste: Nachricht[] } | null = null;

function gueltig(n: unknown): n is Nachricht {
  const k = n as Nachricht;
  return (
    !!k &&
    typeof k.datum === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(k.datum) &&
    typeof k.titel === "string" &&
    Array.isArray(k.text) &&
    k.text.every((t) => typeof t === "string") &&
    (k.bild === undefined || typeof k.bild === "string")
  );
}

/** Nur die eigenen Nachrichten — aus dem Projekt oder von der Platte. */
export function newsBeitraege(): Nachricht[] {
  const pfad = process.env.CLUB_NEWS_DATEI;
  let liste: Nachricht[] = [...nachrichten];

  if (pfad) {
    try {
      const stand = statSync(pfad).mtimeMs;
      if (zwischen && zwischen.stand === stand) {
        liste = zwischen.liste;
      } else {
        const roh = JSON.parse(readFileSync(pfad, "utf8"));
        if (Array.isArray(roh)) {
          liste = roh.filter(gueltig);
          zwischen = { stand, liste };
        }
      }
    } catch {
      /* Datei fehlt oder ist kaputt — es bleibt bei der Liste im Projekt. */
    }
  }

  if (beispieleAktiv) liste = [...liste, ...beispielNews];
  return [...liste].sort((a, b) => b.datum.localeCompare(a.datum));
}

/** Eigene Nachrichten und Videos von draussen, zusammengelegt. */
export async function feed(): Promise<FeedEintrag[]> {
  const eigene: FeedEintrag[] = newsBeitraege().map((n) => ({
    id: `club-${n.datum}-${n.titel}`,
    quelle: "club",
    datum: n.datum,
    titel: n.titel,
    text: n.text,
    bild: n.bild,
    beispiel: n.beispiel,
  }));

  const draussen: FeedEintrag[] = (await socialFeed()).map((s) => ({
    id: s.id,
    quelle: s.quelle,
    datum: s.datum,
    titel: s.titel,
    text: [],
    bild: s.bild,
    bildVonDraussen: Boolean(s.bild),
    link: s.link,
  }));

  return [...eigene, ...draussen].sort((a, b) => b.datum.localeCompare(a.datum));
}

/** "14. September 2026" — ausgeschrieben, nicht 14.09. */
export function datumLang(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** Adresse fuer ein Bild aus dem Feed — durch den Durchleiter. */
export const bildAdresse = (u: string) => `/api/bild/?u=${encodeURIComponent(u)}`;
