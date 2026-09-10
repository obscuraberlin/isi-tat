import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fingerabdruck, type Mitglied } from "@/lib/mitglieder";
import { COOKIE, sitzungSchreiben, type Sitzung } from "@/lib/sitzung";

/** Antwort mit einer Meldung, die das Mitglied lesen kann. */
export const meldung = (text: string, status: number) =>
  NextResponse.json({ ok: false, meldung: text }, { status });

export const NICHT_EINGERICHTET =
  "Der Mail-Versand ist auf diesem Server noch nicht eingerichtet. Bitte melde dich direkt bei uns.";

/**
 * Nach einer Aenderung am Konto ein frisches Cookie setzen — die alte
 * Sitzung wuerde am geaenderten Fingerabdruck scheitern. Ablauf bleibt.
 */
export async function sitzungErneuern(sitzung: Sitzung, mitglied: Mitglied) {
  const wert = sitzungSchreiben({
    email: mitglied.email,
    name: mitglied.name,
    fp: fingerabdruck(mitglied.hash),
    exp: sitzung.exp,
  });
  if (!wert) return;
  (await cookies()).set(COOKIE, wert, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(sitzung.exp),
  });
}

export function saeubern(wert: unknown, max = 200): string {
  if (typeof wert !== "string") return "";
  return wert.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

export const istMail = (wert: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(wert);
