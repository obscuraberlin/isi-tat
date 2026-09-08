import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fingerabdruck, mitgliedMit, passwortStimmt } from "@/lib/mitglieder";
import {
  COOKIE,
  DAUER_KURZ,
  DAUER_LANG,
  anmeldungMoeglich,
  sitzungSchreiben,
} from "@/lib/sitzung";

/**
 * Anmeldung und Abmeldung fuer den Mitgliederbereich.
 *
 *   POST    prueft E-Mail und Passwort und setzt das Sitzungs-Cookie
 *   DELETE  loescht es wieder
 *
 * Die Mitgliederliste kommt aus CLUB_MITGLIEDER_DATEI oder CLUB_MITGLIEDER,
 * das Geheimnis fuer die Unterschrift aus CLUB_SITZUNG_GEHEIMNIS. Fehlt
 * eines davon, meldet die Route ehrlich, dass noch keine Zugaenge vergeben
 * sind — sie tut nicht so, als waere das Passwort falsch.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LAENGE = 200;

/* Ein gueltig geformter Hash, zu dem es kein Passwort gibt. Wird geprueft,
   wenn die E-Mail unbekannt ist — damit beide Faelle gleich lange dauern. */
const BLIND =
  "scrypt.16384.AAAAAAAAAAAAAAAAAAAAAA.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

/* Dieselbe einfache Bremse wie beim Bewerbungsformular: gezaehlt wird im
   Arbeitsspeicher, nach einem Neustart ist der Zaehler leer. Gegen einen
   ernsthaften Angriff hilft das nicht — dagegen hilft nur eine Sperre vor
   der Anwendung. Gegen das Durchprobieren von Hand reicht es.

   Die Verzoegerung waechst mit jedem Fehlversuch: 1s, 2s, 4s … bis 30s. */
const versuche = new Map<string, { zahl: number; zuletzt: number }>();
const VERGESSEN_MS = 15 * 60 * 1000;

function bremse(kennung: string): number {
  const jetzt = Date.now();
  const eintrag = versuche.get(kennung);
  if (!eintrag || jetzt - eintrag.zuletzt > VERGESSEN_MS) return 0;
  return Math.min(30_000, 500 * 2 ** eintrag.zahl);
}

function fehlversuch(kennung: string) {
  const jetzt = Date.now();
  const eintrag = versuche.get(kennung);
  if (!eintrag || jetzt - eintrag.zuletzt > VERGESSEN_MS) {
    versuche.set(kennung, { zahl: 1, zuletzt: jetzt });
  } else {
    eintrag.zahl += 1;
    eintrag.zuletzt = jetzt;
  }

  /* Der Speicher darf nicht unbegrenzt wachsen. Alte Eintraege raus,
     sobald es viele werden. */
  if (versuche.size > 5000) {
    for (const [k, v] of versuche) {
      if (jetzt - v.zuletzt > VERGESSEN_MS) versuche.delete(k);
    }
  }
}

function saeubern(wert: unknown): string {
  if (typeof wert !== "string") return "";
  return wert.replace(/[\r\n\t]+/g, " ").trim().slice(0, MAX_LAENGE);
}

const warte = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(request: Request) {
  if (!anmeldungMoeglich()) {
    return NextResponse.json(
      {
        ok: false,
        meldung:
          "Der Mitgliederbereich ist noch nicht freigeschaltet. Sobald die Zugänge vergeben sind, funktioniert die Anmeldung hier.",
      },
      { status: 503 },
    );
  }

  let daten: Record<string, unknown>;
  try {
    daten = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = saeubern(daten.email).toLowerCase();
  const passwort = typeof daten.passwort === "string" ? daten.passwort : "";
  const langeBleiben = daten.bleiben === true;

  /* Gezaehlt wird pro E-Mail, nicht pro Adresse: hinter einem Anschluss
     sitzen manchmal mehrere Mitglieder, und wer eine fremde Kennung
     durchprobiert, soll genau dort gebremst werden. */
  const kennung = email || "ohne";
  const strafe = bremse(kennung);
  if (strafe > 0) await warte(strafe);

  const mitglied = email && passwort ? mitgliedMit(email) : null;

  /* Auch ohne Treffer wird gerechnet, gegen einen Hash, der zu keinem
     Passwort passt. Sonst antwortet die Route auf eine unbekannte E-Mail
     spuerbar schneller als auf eine bekannte — und verraet damit, wer
     Mitglied ist. */
  const stimmt = passwortStimmt(mitglied?.hash ?? BLIND, passwort);

  if (!mitglied || !stimmt) {
    fehlversuch(kennung);
    return NextResponse.json(
      {
        ok: false,
        /* Nicht verraten, welches der beiden Felder nicht stimmt. */
        meldung: "E-Mail oder Passwort stimmt nicht.",
      },
      { status: 401 },
    );
  }

  versuche.delete(kennung);

  const dauer = langeBleiben ? DAUER_LANG : DAUER_KURZ;
  const wert = sitzungSchreiben({
    email: mitglied.email.toLowerCase(),
    name: mitglied.name,
    fp: fingerabdruck(mitglied.hash),
    exp: Date.now() + dauer,
  });

  if (!wert) {
    return NextResponse.json(
      { ok: false, meldung: "Anmeldung derzeit nicht möglich." },
      { status: 503 },
    );
  }

  (await cookies()).set({
    name: COOKIE,
    value: wert,
    httpOnly: true,
    sameSite: "lax",
    /* In der Entwicklung laeuft die Seite ueber http — mit `secure` kaeme
       das Cookie dort nie an. In Produktion ist es gesetzt. */
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(dauer / 1000),
  });

  return NextResponse.json({ ok: true, name: mitglied.name });
}

export async function DELETE() {
  (await cookies()).set({
    name: COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true });
}
