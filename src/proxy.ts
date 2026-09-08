import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE, sitzungLesen } from "@/lib/sitzung";

/**
 * Vorpruefung fuer den Mitgliederbereich.
 *
 * Heisst in Next 16 `proxy` — die frueher `middleware` genannte Datei. Sie
 * laeuft vor dem Rendern und leitet ohne gueltiges Cookie zur Anmeldung um.
 *
 * Das ist bewusst nur die halbe Miete: geprueft wird hier die Unterschrift
 * und der Ablauf, nicht die Mitgliederliste. Ob es das Mitglied noch gibt
 * und ob sein Passwort unveraendert ist, entscheidet `verlangeMitglied()`
 * auf jeder Seite selbst — dort, wo auch die Daten geholt werden.
 *
 * Warum trotzdem beides: ohne diese Stelle wuerde fuer jeden Aufruf ohne
 * Anmeldung erst die Seite gebaut und dann verworfen. Und wer sich hier
 * allein darauf verliesse, haette die Pruefung an genau einem Ort, den man
 * beim Anlegen einer neuen Seite vergessen kann.
 */
export function proxy(request: NextRequest) {
  const sitzung = sitzungLesen(request.cookies.get(COOKIE)?.value);
  if (sitzung) return NextResponse.next();

  const ziel = new URL("/login/", request.url);
  /* Nur der Pfad, nie eine ganze Adresse — sonst waere das eine offene
     Weiterleitung. */
  ziel.searchParams.set("weiter", request.nextUrl.pathname);
  return NextResponse.redirect(ziel);
}

export const config = {
  /* Nur der Club. Alles andere — Startseite, Bewerbung, Rechtstexte,
     Bilder, Schriften — laeuft hier nicht durch. */
  matcher: ["/club", "/club/:path*"],
};
