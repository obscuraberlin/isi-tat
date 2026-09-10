import { NextResponse } from "next/server";
import { tokenVerbrauchen } from "@/lib/token";
import { mitgliedAendern, passwortHash, passwortSchwach } from "@/lib/konten";
import { absender, gebremst } from "@/lib/bremse";
import { meldung } from "../_gemeinsam";

/** Passwort vergessen — Schritt 2: neues Passwort mit dem Token setzen. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (gebremst(`neues-passwort:${absender(request)}`, 10, 15 * 60_000)) {
    return meldung("Zu viele Versuche. Warte ein paar Minuten.", 429);
  }
  let daten: { token?: unknown; neu?: unknown };
  try {
    daten = await request.json();
  } catch {
    return meldung("Ungültige Anfrage.", 400);
  }
  const token = typeof daten.token === "string" ? daten.token : "";
  const neu = typeof daten.neu === "string" ? daten.neu : "";

  const schwach = passwortSchwach(neu);
  if (schwach) return meldung(schwach, 422);

  const eintrag = tokenVerbrauchen(token, "reset");
  if (!eintrag) return meldung("Der Link ist nicht mehr gültig. Fordere einen neuen an.", 410);

  const geaendert = mitgliedAendern(eintrag.email, { hash: passwortHash(neu) });
  if (!geaendert) return meldung("Der Link ist nicht mehr gültig. Fordere einen neuen an.", 410);

  return NextResponse.json({ ok: true });
}
