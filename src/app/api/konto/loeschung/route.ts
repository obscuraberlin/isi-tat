import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { gebremst } from "@/lib/bremse";
import { mailRahmen, postBereit, postSenden, postfachIsi } from "@/lib/post";
import { NICHT_EINGERICHTET, meldung } from "../_gemeinsam";

/**
 * Loeschung des Kontos anfragen (Art. 17 DSGVO).
 *
 * Nicht sofort loeschen: ein Zugang, fuer den jemand bezahlt hat, soll
 * nicht durch einen Fehlklick verschwinden. Die Anfrage geht an ISI,
 * das Mitglied bekommt eine Kopie, und die Loeschung passiert von Hand
 * — mit Rueckfrage.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const sitzung = await angemeldet();
  if (!sitzung) return meldung("Bitte melde dich neu an.", 401);
  if (gebremst(`loeschung:${sitzung.email}`, 2, 24 * 60 * 60_000)) {
    return NextResponse.json({ ok: true });
  }
  const an = postfachIsi();
  if (!postBereit() || !an) return meldung(NICHT_EINGERICHTET, 503);

  const mail = mailRahmen(
    "Löschung eines Club-Kontos angefragt",
    [`${sitzung.name} <${sitzung.email}> bittet um Löschung des Kontos und aller dazu gespeicherten Daten.`, "Bitte Rücksprache halten und danach den Eintrag aus der Mitgliederdatei und den Zusagen entfernen."],
    undefined,
    "Automatische Nachricht aus dem Mitgliederbereich.",
  );
  await postSenden({ an, betreff: `[Club] Löschung angefragt: ${sitzung.email}`, antwortAn: sitzung.email, ...mail });

  const kopie = mailRahmen(
    "Deine Löschanfrage ist angekommen.",
    [`Hallo ${sitzung.name.split(/\s+/)[0]},`, "wir haben deine Anfrage, dein Konto zu löschen, erhalten und melden uns kurz bei dir, bevor wir sie ausführen."],
    undefined,
    "Falls du das nicht warst, antworte auf diese Mail.",
  );
  postSenden({ an: sitzung.email, name: sitzung.name, betreff: "Deine Löschanfrage ist angekommen", ...kopie }).catch(
    () => undefined,
  );

  return NextResponse.json({ ok: true });
}
