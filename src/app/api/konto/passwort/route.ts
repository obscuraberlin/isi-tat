import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { mitgliedMit, passwortStimmt } from "@/lib/mitglieder";
import { mitgliedAendern, passwortHash, passwortSchwach } from "@/lib/konten";
import { gebremst } from "@/lib/bremse";
import { mailRahmen, postBereit, postSenden, clubAdresse } from "@/lib/post";
import { meldung, sitzungErneuern } from "../_gemeinsam";

/**
 * Passwort aendern — angemeldet, mit dem aktuellen Passwort als Nachweis.
 *
 * Danach bekommt das eigene Geraet ein frisches Cookie; alle anderen
 * Geraete sind damit abgemeldet, weil ihr Cookie den alten Fingerabdruck
 * traegt. Genau das will man nach einem Passwortwechsel.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const sitzung = await angemeldet();
  if (!sitzung) return meldung("Bitte melde dich neu an.", 401);
  if (gebremst(`passwort:${sitzung.email}`, 5, 15 * 60_000)) {
    return meldung("Zu viele Versuche. Warte ein paar Minuten.", 429);
  }

  let daten: { aktuell?: unknown; neu?: unknown };
  try {
    daten = await request.json();
  } catch {
    return meldung("Ungültige Anfrage.", 400);
  }
  const aktuell = typeof daten.aktuell === "string" ? daten.aktuell : "";
  const neu = typeof daten.neu === "string" ? daten.neu : "";

  const mitglied = mitgliedMit(sitzung.email);
  if (!mitglied || !passwortStimmt(mitglied.hash, aktuell)) {
    return meldung("Das aktuelle Passwort stimmt nicht.", 403);
  }
  const schwach = passwortSchwach(neu);
  if (schwach) return meldung(schwach, 422);
  if (neu === aktuell) return meldung("Das ist dasselbe Passwort wie bisher.", 422);

  const geaendert = mitgliedAendern(mitglied.email, { hash: passwortHash(neu) });
  if (!geaendert) {
    return meldung("Dieses Konto lässt sich hier nicht ändern. Bitte melde dich bei uns.", 409);
  }
  await sitzungErneuern(sitzung, geaendert);

  if (postBereit()) {
    const adresse = clubAdresse();
    const mail = mailRahmen(
      "Dein Passwort wurde geändert.",
      [
        `Hallo ${geaendert.name.split(/\s+/)[0]},`,
        "gerade wurde das Passwort für deinen Zugang zum ISI TAT Business Club geändert. Alle anderen Geräte sind damit abgemeldet.",
        "Warst du das nicht, setz dein Passwort sofort zurück und melde dich bei uns.",
      ],
      adresse ? { text: "PASSWORT ZURÜCKSETZEN", href: `${adresse}/login/passwort-vergessen/` } : undefined,
    );
    postSenden({ an: geaendert.email, name: geaendert.name, betreff: "Dein Passwort wurde geändert", ...mail }).catch(
      () => undefined,
    );
  }

  return NextResponse.json({ ok: true });
}
