import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { mitgliedMit, passwortStimmt } from "@/lib/mitglieder";
import { emailVergeben } from "@/lib/konten";
import { tokenErzeugen } from "@/lib/token";
import { gebremst } from "@/lib/bremse";
import { clubAdresse, mailRahmen, postBereit, postSenden } from "@/lib/post";
import { NICHT_EINGERICHTET, istMail, meldung, saeubern } from "../_gemeinsam";

/**
 * Neue E-Mail-Adresse — Schritt 1: Link an die neue Adresse.
 *
 * Bis der Link geklickt ist, bleibt die alte Adresse. Die alte bekommt
 * einen Hinweis, damit ein Fremder mit einem offenen Handy das Konto
 * nicht still uebernehmen kann. Ob die neue Adresse schon vergeben ist,
 * verraet die Antwort nicht — sonst liesse sich abfragen, wer Mitglied
 * ist.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GUELTIG_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  const sitzung = await angemeldet();
  if (!sitzung) return meldung("Bitte melde dich neu an.", 401);
  if (gebremst(`email:${sitzung.email}`, 5, 15 * 60_000)) {
    return meldung("Zu viele Versuche. Warte ein paar Minuten.", 429);
  }

  let daten: { neu?: unknown; passwort?: unknown };
  try {
    daten = await request.json();
  } catch {
    return meldung("Ungültige Anfrage.", 400);
  }
  const neu = saeubern(daten.neu).toLowerCase();
  const passwort = typeof daten.passwort === "string" ? daten.passwort : "";

  const mitglied = mitgliedMit(sitzung.email);
  if (!mitglied || !passwortStimmt(mitglied.hash, passwort)) {
    return meldung("Das Passwort stimmt nicht.", 403);
  }
  if (!istMail(neu)) return meldung("Das sieht nicht wie eine E-Mail-Adresse aus.", 422);
  if (neu === mitglied.email.toLowerCase()) return meldung("Das ist schon deine Adresse.", 422);
  if (!postBereit()) return meldung(NICHT_EINGERICHTET, 503);

  const adresse = clubAdresse();
  const vorname = mitglied.name.split(/\s+/)[0];

  /* Vergeben: dieselbe Antwort wie sonst, nur ohne Link — die Person
     hinter der anderen Adresse erfaehrt davon nichts, und der Fragende
     auch nicht. */
  if (!emailVergeben(neu)) {
    const token = tokenErzeugen(mitglied.email, "email", GUELTIG_MS, neu);
    const link = `${adresse}/api/konto/email-bestaetigen/?t=${token}`;
    const mail = mailRahmen(
      "Neue E-Mail-Adresse bestätigen.",
      [
        `Hallo ${vorname},`,
        "du möchtest diese Adresse für deinen Zugang zum ISI TAT Business Club verwenden. Bestätige das mit einem Klick — der Link gilt 24 Stunden.",
        "Bis dahin bleibt deine bisherige Adresse gültig.",
      ],
      { text: "ADRESSE BESTÄTIGEN", href: link },
      "Falls du das nicht warst, kannst du diese Mail einfach ignorieren.",
    );
    await postSenden({ an: neu, name: mitglied.name, betreff: "Neue E-Mail-Adresse bestätigen", ...mail });
  }

  const hinweis = mailRahmen(
    "Jemand möchte deine Club-E-Mail ändern.",
    [
      `Hallo ${vorname},`,
      `für deinen Zugang zum ISI TAT Business Club wurde eine neue E-Mail-Adresse eingetragen (${neu.replace(/(.{2}).+(@.+)/, "$1…$2")}). Sie gilt erst, wenn sie über den Link in der Mail an die neue Adresse bestätigt wird.`,
      "Warst du das nicht, ändere sofort dein Passwort und melde dich bei uns.",
    ],
  );
  postSenden({ an: mitglied.email, name: mitglied.name, betreff: "Änderung deiner E-Mail-Adresse", ...hinweis }).catch(
    () => undefined,
  );

  return NextResponse.json({ ok: true });
}
