import { NextResponse } from "next/server";
import { mitgliedMit } from "@/lib/mitglieder";
import { tokenErzeugen } from "@/lib/token";
import { absender, gebremst } from "@/lib/bremse";
import { clubAdresse, mailRahmen, postBereit, postSenden } from "@/lib/post";
import { NICHT_EINGERICHTET, istMail, meldung, saeubern } from "../_gemeinsam";

/**
 * Passwort vergessen — Schritt 1: Link per Mail.
 *
 * Die Antwort ist immer dieselbe, ob es das Konto gibt oder nicht. Auch
 * die Dauer: der Mailversand laeuft im Hintergrund, die Antwort wartet
 * nicht darauf. Sonst waere das Formular eine Liste der Mitglieder.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GUELTIG_MS = 30 * 60 * 1000;

export async function POST(request: Request) {
  if (gebremst(`reset:${absender(request)}`, 5, 15 * 60_000)) {
    return meldung("Zu viele Versuche. Warte ein paar Minuten.", 429);
  }
  let daten: { email?: unknown };
  try {
    daten = await request.json();
  } catch {
    return meldung("Ungültige Anfrage.", 400);
  }
  const email = saeubern(daten.email).toLowerCase();
  if (!istMail(email)) return meldung("Das sieht nicht wie eine E-Mail-Adresse aus.", 422);
  if (!postBereit()) return meldung(NICHT_EINGERICHTET, 503);

  const mitglied = mitgliedMit(email);
  if (mitglied && !gebremst(`reset-mail:${email}`, 3, 60 * 60_000)) {
    const token = tokenErzeugen(mitglied.email, "reset", GUELTIG_MS);
    const link = `${clubAdresse()}/login/neues-passwort/${token}/`;
    const mail = mailRahmen(
      "Neues Passwort setzen.",
      [
        `Hallo ${mitglied.name.split(/\s+/)[0]},`,
        "mit dem Link unten setzt du ein neues Passwort für deinen Zugang zum ISI TAT Business Club. Er gilt 30 Minuten und genau einmal.",
      ],
      { text: "NEUES PASSWORT SETZEN", href: link },
      "Falls du das nicht angefordert hast, kannst du diese Mail ignorieren — dein Passwort bleibt, wie es ist.",
    );
    postSenden({ an: mitglied.email, name: mitglied.name, betreff: "Neues Passwort setzen", ...mail }).catch(
      () => undefined,
    );
  }

  return NextResponse.json({ ok: true });
}
