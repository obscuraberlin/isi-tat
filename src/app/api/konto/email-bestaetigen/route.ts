import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokenVerbrauchen } from "@/lib/token";
import { emailVergeben, mitgliedAendern } from "@/lib/konten";
import { COOKIE, sitzungLesen } from "@/lib/sitzung";
import { zusagenUmschreiben } from "@/lib/zusagen";
import { sitzungErneuern } from "../_gemeinsam";

/**
 * Neue E-Mail-Adresse — Schritt 2: der Klick auf den Link.
 *
 * Ist der Token gueltig, wird die Adresse umgeschrieben und die laufende
 * Sitzung (falls es eine gibt) auf die neue Adresse gesetzt. Danach geht
 * es zu den Einstellungen mit einer kurzen Bestaetigung.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ziel = (stand: string) => NextResponse.redirect(new URL(`/club/einstellungen/?email=${stand}`, url));

  const roh = url.searchParams.get("t") ?? "";
  const eintrag = tokenVerbrauchen(roh, "email");
  if (!eintrag?.neu) return ziel("ungueltig");
  if (emailVergeben(eintrag.neu)) return ziel("vergeben");

  const geaendert = mitgliedAendern(eintrag.email, { email: eintrag.neu });
  if (!geaendert) return ziel("ungueltig");
  zusagenUmschreiben(eintrag.email, geaendert.email);

  const sitzung = sitzungLesen((await cookies()).get(COOKIE)?.value);
  if (sitzung && sitzung.email.toLowerCase() === eintrag.email) {
    await sitzungErneuern(sitzung, geaendert);
  }
  return ziel("ok");
}
