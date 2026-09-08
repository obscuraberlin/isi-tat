/**
 * Was ISI draussen veroeffentlicht — als Eintraege fuer den Feed.
 *
 * Zwei Quellen, beide nur, wenn sie eingerichtet sind:
 *
 *   YouTube    CLUB_YOUTUBE_KANAL = Kanal-ID (beginnt mit "UC…").
 *              Jeder Kanal hat einen oeffentlichen Atom-Feed, ohne
 *              Schluessel, ohne Anmeldung. Das ist der einfache Weg.
 *
 *   Instagram  CLUB_INSTAGRAM_TOKEN = langlebiges Zugangstoken eines
 *              Business- oder Creator-Kontos ("Instagram API with
 *              Instagram Login"). Das Token haelt 60 Tage und muss vorher
 *              erneuert werden — sonst bleibt der Feed still stehen, ohne
 *              dass es jemand merkt. Deshalb steht unten der Aufruf dafuer.
 *
 *   TikTok     Nicht dabei. Die Schnittstelle gibt es nur nach Freigabe
 *              einer App durch TikTok; ohne sie laesst sich keine Liste
 *              der neuesten Videos abrufen. Ein einzelnes Video laesst
 *              sich als Nachricht mit Link eintragen.
 *
 * Geholt wird auf dem Server, nicht im Browser des Mitglieds: so erfaehrt
 * weder Google noch Meta, welches Mitglied gerade den Club aufruft.
 * Zwischengespeichert fuer eine halbe Stunde — ein Feed muss nicht
 * sekundengenau sein, und die Quellen sollen nicht bei jedem Aufruf
 * angefragt werden.
 *
 * Faellt eine Quelle aus, faellt nur sie aus: der Feed zeigt den Rest.
 * Das Mitglied sieht keine Fehlermeldung; der Server schreibt eine Zeile
 * ins Protokoll.
 */

export type FeedQuelle = "youtube" | "instagram";

export interface SocialEintrag {
  id: string;
  quelle: FeedQuelle;
  /** ISO-Datum, z. B. "2026-09-08". */
  datum: string;
  titel: string;
  /** Bild von der Plattform — wird ueber /api/bild ausgeliefert. */
  bild?: string;
  /** Wo das Video liegt. */
  link: string;
}

/** Eine halbe Stunde. */
const HALTBAR_MS = 30 * 60 * 1000;

const KANAL_FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=";
const INSTAGRAM_MEDIA =
  "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12";

/* ---------- YouTube ---------- */

const text = (block: string, tag: string) => {
  const m = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`).exec(block);
  return m ? entschaerfen(m[1].trim()) : "";
};

const attribut = (block: string, tag: string, name: string) => {
  const m = new RegExp(`<${tag}\\b[^>]*\\b${name}="([^"]*)"`).exec(block);
  return m ? entschaerfen(m[1]) : "";
};

function entschaerfen(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

/**
 * Der Atom-Feed eines Kanals, ohne XML-Bibliothek: die Eintraege sind
 * flach und immer gleich gebaut, ein regulaerer Ausdruck je Feld reicht.
 * Kommt ein Feld nicht, faellt der Eintrag weg — kein halber Eintrag.
 */
export function youtubeLesen(xml: string): SocialEintrag[] {
  const eintraege: SocialEintrag[] = [];
  for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const block = m[1];
    const id = text(block, "yt:videoId");
    const titel = text(block, "title");
    const wann = text(block, "published");
    if (!id || !titel || !wann) continue;
    eintraege.push({
      id: `yt-${id}`,
      quelle: "youtube",
      datum: wann.slice(0, 10),
      titel,
      bild: attribut(block, "media:thumbnail", "url") || undefined,
      link: `https://www.youtube.com/watch?v=${id}`,
    });
  }
  return eintraege;
}

async function youtube(): Promise<SocialEintrag[]> {
  const kanal = (process.env.CLUB_YOUTUBE_KANAL ?? "").trim();
  /* CLUB_YOUTUBE_FEED: die ganze Adresse statt der Kanal-ID — fuer einen
     Spiegel oder zum Testen. Normalerweise nicht setzen. */
  const adresse = (process.env.CLUB_YOUTUBE_FEED ?? "").trim() || (kanal ? KANAL_FEED + kanal : "");
  if (!adresse) return [];

  const antwort = await fetch(adresse, {
    headers: { accept: "application/atom+xml, application/xml, text/xml" },
    next: { revalidate: HALTBAR_MS / 1000 },
  });
  if (!antwort.ok) throw new Error(`YouTube antwortet mit ${antwort.status}`);
  return youtubeLesen(await antwort.text());
}

/* ---------- Instagram ---------- */

interface InstagramMedium {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

/** Die erste Zeile der Bildunterschrift als Titel — mehr passt in keine Karte. */
function titelAus(caption: string | undefined, art: string) {
  const zeile = (caption ?? "").split("\n").map((s) => s.trim()).find(Boolean);
  if (zeile) return zeile.length > 120 ? zeile.slice(0, 117) + "…" : zeile;
  return art === "VIDEO" ? "Neues Video" : "Neuer Beitrag";
}

export function instagramLesen(daten: { data?: InstagramMedium[] }): SocialEintrag[] {
  return (daten.data ?? [])
    .filter((m) => m.id && m.permalink && m.timestamp)
    .map((m) => ({
      id: `ig-${m.id}`,
      quelle: "instagram" as const,
      datum: m.timestamp.slice(0, 10),
      titel: titelAus(m.caption, m.media_type),
      bild: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url,
      link: m.permalink,
    }));
}

async function instagram(): Promise<SocialEintrag[]> {
  const token = (process.env.CLUB_INSTAGRAM_TOKEN ?? "").trim();
  if (!token) return [];

  const antwort = await fetch(`${INSTAGRAM_MEDIA}&access_token=${encodeURIComponent(token)}`, {
    next: { revalidate: HALTBAR_MS / 1000 },
  });
  if (!antwort.ok) throw new Error(`Instagram antwortet mit ${antwort.status}`);
  return instagramLesen(await antwort.json());
}

/* ---------- zusammen ---------- */

let zwischen: { stand: number; liste: SocialEintrag[] } | null = null;

/**
 * Alle Quellen, zusammengelegt, neueste zuerst.
 *
 * Zweiter Zwischenspeicher im Arbeitsspeicher, zusaetzlich zum Fetch-Cache
 * von Next: faellt eine Quelle aus, bleibt der letzte gute Stand stehen,
 * statt dass der Feed schrumpft.
 */
export async function socialFeed(): Promise<SocialEintrag[]> {
  const jetzt = Date.now();
  if (zwischen && jetzt - zwischen.stand < HALTBAR_MS) return zwischen.liste;

  const ergebnisse = await Promise.allSettled([youtube(), instagram()]);
  const liste: SocialEintrag[] = [];
  let ausfall = false;

  for (const [i, e] of ergebnisse.entries()) {
    if (e.status === "fulfilled") liste.push(...e.value);
    else {
      ausfall = true;
      console.warn(`Feed: ${i === 0 ? "YouTube" : "Instagram"} nicht erreichbar —`, e.reason?.message ?? e.reason);
    }
  }

  /* Bei Ausfall den alten Stand behalten, wenn es einen gibt. */
  if (ausfall && zwischen && liste.length < zwischen.liste.length) return zwischen.liste;

  liste.sort((a, b) => b.datum.localeCompare(a.datum));
  zwischen = { stand: jetzt, liste };
  return liste;
}

/** Welche Bildquellen /api/bild durchlassen darf. */
export const BILD_HOSTS = [
  /(^|\.)ytimg\.com$/,
  /(^|\.)cdninstagram\.com$/,
  /(^|\.)fbcdn\.net$/,
];
