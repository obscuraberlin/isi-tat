import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { gebremst } from "@/lib/bremse";
import { mailRahmen, postBereit, postSenden, postfachIsi } from "@/lib/post";
import { club } from "@/data/club";
import { NICHT_EINGERICHTET, meldung, saeubern } from "../_gemeinsam";

/**
 * Eine Anfrage an ISI — als Mail ins selbe Postfach wie die Bewerbungen,
 * mit dem Mitglied als Antwortadresse. Nichts wird gespeichert: was
 * nicht liegt, muss auch nicht geloescht werden.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const sitzung = await angemeldet();
  if (!sitzung) return meldung("Bitte melde dich neu an.", 401);
  if (gebremst(`support:${sitzung.email}`, 5, 60 * 60_000)) {
    return meldung("Das reicht für den Moment — wir melden uns.", 429);
  }
  let daten: { kategorie?: unknown; betreff?: unknown; text?: unknown };
  try {
    daten = await request.json();
  } catch {
    return meldung("Ungültige Anfrage.", 400);
  }
  const kategorien = club.support.kategorien as readonly string[];
  const kategorie = saeubern(daten.kategorie, 40);
  const betreff = saeubern(daten.betreff, 120);
  const text = typeof daten.text === "string" ? daten.text.trim().slice(0, 4000) : "";
  if (!kategorien.includes(kategorie)) return meldung("Bitte wähle, worum es geht.", 422);
  if (betreff.length < 3) return meldung("Bitte gib einen Betreff an.", 422);
  if (text.length < 10) return meldung("Bitte beschreib kurz, worum es geht.", 422);

  const an = postfachIsi();
  if (!postBereit() || !an) return meldung(NICHT_EINGERICHTET, 503);

  const nachricht = mailRahmen(
    `Anfrage aus dem Club: ${kategorie}`,
    [`Von: ${sitzung.name} <${sitzung.email}>`, `Betreff: ${betreff}`, "", ...text.split(/\n+/)],
    undefined,
    "Antworten gehen direkt an das Mitglied.",
  );
  await postSenden({ an, betreff: `[Club] ${kategorie}: ${betreff}`, antwortAn: sitzung.email, ...nachricht });

  const kopie = mailRahmen(
    "Deine Anfrage ist angekommen.",
    [`Hallo ${sitzung.name.split(/\s+/)[0]},`, `deine Anfrage „${betreff}“ ist bei uns. Wir melden uns.`],
    undefined,
    "Diese Mail ist eine Kopie zu deiner Anfrage aus dem Club.",
  );
  postSenden({ an: sitzung.email, name: sitzung.name, betreff: "Deine Anfrage ist angekommen", ...kopie }).catch(
    () => undefined,
  );

  return NextResponse.json({ ok: true });
}
