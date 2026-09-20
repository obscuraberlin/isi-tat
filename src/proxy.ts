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
 *
 * Zweiter Fall: die Kursdateien selbst. Sie liegen als v17.mp4 in
 * public/media und wuerden ohne diese Stelle jedem ausgeliefert, der die
 * Adresse kennt — der Player im Club haette dann ein Schloss, die Datei
 * dahinter keins. Ohne Sitzung gibt es 403, nicht die Anmeldeseite: ein
 * <video> kann mit einer Weiterleitung auf HTML nichts anfangen.
 */

/* Alles, was nur Mitgliedern gehoert: Folgen (vNN.mp4, vNN-klein.mp4,
   vNN-poster.jpg) und das Willkommensvideo. Die Trailer der Startseite
   heissen 01.mp4, 03.mp4 … und bleiben frei. */
const CLUB_DATEI = /^\/media\/(v\d{2}|willkommen)(-[a-z]+)?\.[a-z0-9]+$/;

export function proxy(request: NextRequest) {
  const pfad = request.nextUrl.pathname;
  const sitzung = sitzungLesen(request.cookies.get(COOKIE)?.value);

  if (pfad.startsWith("/media/")) {
    if (!CLUB_DATEI.test(pfad)) return NextResponse.next();
    if (!sitzung) return new NextResponse(null, { status: 403 });
    const antwort = NextResponse.next();
    /* Nur fuer diesen Browser, nie fuer einen Zwischenspeicher oder ein
       CDN — sonst laege die Datei nach dem ersten Abruf offen auf dem
       Weg. `inline` statt `attachment`: abspielen, nicht speichern. */
    antwort.headers.set("Cache-Control", "private, no-store");
    antwort.headers.set("Content-Disposition", "inline");
    return antwort;
  }

  if (sitzung) return NextResponse.next();

  const ziel = new URL("/login/", request.url);
  /* Nur der Pfad, nie eine ganze Adresse — sonst waere das eine offene
     Weiterleitung. */
  ziel.searchParams.set("weiter", pfad);
  return NextResponse.redirect(ziel);
}

export const config = {
  /* Der Club und die Kursdateien. Alles andere — Startseite, Bewerbung,
     Rechtstexte, Bilder, Schriften — laeuft hier nicht durch. */
  matcher: ["/club", "/club/:path*", "/media/:path*"],
};
