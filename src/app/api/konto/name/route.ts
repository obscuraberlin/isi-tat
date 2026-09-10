import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { mitgliedAendern } from "@/lib/konten";
import { meldung, saeubern } from "../_gemeinsam";

/** Den Anzeigenamen aendern. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const sitzung = await angemeldet();
  if (!sitzung) return meldung("Bitte melde dich neu an.", 401);
  let daten: { name?: unknown };
  try {
    daten = await request.json();
  } catch {
    return meldung("Ungültige Anfrage.", 400);
  }
  const name = saeubern(daten.name, 80);
  if (name.length < 2) return meldung("Bitte gib deinen Namen an.", 422);
  if (/[<>{}]/.test(name)) return meldung("Der Name enthält Zeichen, die hier nicht gehen.", 422);
  const geaendert = mitgliedAendern(sitzung.email, { name });
  if (!geaendert) return meldung("Dieses Konto lässt sich hier nicht ändern. Bitte melde dich bei uns.", 409);
  return NextResponse.json({ ok: true, name: geaendert.name });
}
