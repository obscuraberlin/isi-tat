import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Nimmt eine Bewerbung entgegen und schickt sie als Mail weiter.
 *
 * Bewusst kein Formulardienst: Bewerberdaten sind personenbezogen, und
 * die üblichen kostenlosen Anbieter sitzen in den USA und schließen
 * keinen Auftragsverarbeitungsvertrag. Hier gehen die Daten vom Browser
 * des Besuchers an denselben Server, der auch die Seite ausliefert, und
 * von dort in das Postfach des Auftraggebers. Es ist kein Dritter
 * beteiligt, also gibt es auch nichts offenzulegen außer dem Hoster.
 *
 * Die Zugangsdaten kommen aus Umgebungsvariablen und stehen nirgends im
 * Quelltext:
 *   BEWERBUNG_SMTP_HOST, BEWERBUNG_SMTP_PORT, BEWERBUNG_SMTP_USER,
 *   BEWERBUNG_SMTP_PASS, BEWERBUNG_EMPFAENGER, BEWERBUNG_ABSENDER
 *
 * Fehlt eine davon, antwortet die Route mit 503 und einer Meldung, die
 * der Besucher versteht — sie verrät nicht, was serverseitig fehlt.
 */

export const runtime = "nodejs";
/* Nichts an dieser Route darf zwischengespeichert werden. */
export const dynamic = "force-dynamic";

/** Nur so viel, wie eine Bewerbung braucht. */
const MAX_LAENGE = 400;
const PFLICHT = ["name", "email"] as const;

/* Einfache Bremse gegen Massensendungen aus derselben Quelle. Der Speicher
   ist der Prozess: nach einem Neustart ist er leer. Das reicht für ein
   Formular dieser Größe — eine echte Sperre gehört vor die Anwendung. */
const letzterVersuch = new Map<string, number>();
const SPERRE_MS = 30_000;

function saeubern(wert: unknown): string {
  if (typeof wert !== "string") return "";
  /* Steuerzeichen raus, damit niemand Kopfzeilen in die Mail schmuggelt. */
  return wert.replace(/[\r\n\t]+/g, " ").trim().slice(0, MAX_LAENGE);
}

function istMail(wert: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(wert);
}

export async function POST(request: Request) {
  let daten: Record<string, unknown>;
  try {
    daten = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  /* Honigtopf: ein Feld, das kein Mensch sieht und keiner ausfüllt.
     Ist es befüllt, war es ein Automat — wir antworten freundlich und
     schicken nichts. Ein Fehler würde ihm verraten, dass er aufgeflogen
     ist. */
  if (saeubern(daten._honey)) {
    return NextResponse.json({ ok: true });
  }

  const felder: Record<string, string> = {};
  for (const [schluessel, wert] of Object.entries(daten)) {
    if (schluessel.startsWith("_")) continue;
    felder[schluessel] = saeubern(wert);
  }

  for (const pflicht of PFLICHT) {
    if (!felder[pflicht]) {
      return NextResponse.json(
        { ok: false, grund: "unvollstaendig" },
        { status: 400 },
      );
    }
  }
  if (!istMail(felder.email)) {
    return NextResponse.json({ ok: false, grund: "email" }, { status: 400 });
  }

  const kennung =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unbekannt";
  const zuletzt = letzterVersuch.get(kennung) ?? 0;
  if (Date.now() - zuletzt < SPERRE_MS) {
    return NextResponse.json({ ok: false, grund: "zuschnell" }, { status: 429 });
  }

  const {
    BEWERBUNG_SMTP_HOST,
    BEWERBUNG_SMTP_PORT,
    BEWERBUNG_SMTP_USER,
    BEWERBUNG_SMTP_PASS,
    BEWERBUNG_EMPFAENGER,
    BEWERBUNG_ABSENDER,
  } = process.env;

  if (
    !BEWERBUNG_SMTP_HOST ||
    !BEWERBUNG_SMTP_USER ||
    !BEWERBUNG_SMTP_PASS ||
    !BEWERBUNG_EMPFAENGER
  ) {
    /* Absichtlich ohne Details: was serverseitig fehlt, geht den Besucher
       nichts an — und einen Angreifer erst recht nicht. */
    return NextResponse.json(
      { ok: false, grund: "nicht_eingerichtet" },
      { status: 503 },
    );
  }

  const port = Number(BEWERBUNG_SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: BEWERBUNG_SMTP_HOST,
    port,
    /* 465 ist implizit verschlüsselt, 587 steigt über STARTTLS um. */
    secure: port === 465,
    auth: { user: BEWERBUNG_SMTP_USER, pass: BEWERBUNG_SMTP_PASS },
  });

  const zeilen = Object.entries(felder)
    .filter(([, wert]) => wert)
    .map(([schluessel, wert]) => `${schluessel}: ${wert}`)
    .join("\n");

  try {
    await transport.sendMail({
      from: BEWERBUNG_ABSENDER ?? BEWERBUNG_SMTP_USER,
      to: BEWERBUNG_EMPFAENGER,
      /* Antworten geht direkt an den Bewerber. Als Absender steht er
         bewusst NICHT drin — das würde die Mail als gefälscht aussehen
         lassen und im Spam landen. */
      replyTo: felder.email,
      subject: `Bewerbung: ${felder.name}`,
      text: `Neue Bewerbung über die Website.\n\n${zeilen}\n`,
    });
  } catch {
    return NextResponse.json({ ok: false, grund: "versand" }, { status: 502 });
  }

  letzterVersuch.set(kennung, Date.now());
  return NextResponse.json({ ok: true });
}
