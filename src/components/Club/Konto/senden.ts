"use client";

import { useState } from "react";
import { club } from "@/data/club";

/**
 * Ein Formular an eine Konto-Route schicken.
 *
 * Die Route antwortet mit { ok } oder { ok: false, meldung } — die
 * Meldung ist fuer das Mitglied geschrieben und wird so angezeigt.
 */
export function useSenden(url: string) {
  const [laeuft, setLaeuft] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function senden(body: unknown): Promise<Record<string, unknown> | null> {
    setLaeuft(true);
    setFehler(null);
    setOk(false);
    try {
      const antwort = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body ?? {}),
      });
      const daten = await antwort.json().catch(() => ({}));
      if (!antwort.ok || !daten.ok) {
        setFehler(typeof daten.meldung === "string" ? daten.meldung : club.formular.fehler);
        return null;
      }
      setOk(true);
      return daten;
    } catch {
      setFehler(club.formular.verbindung);
      return null;
    } finally {
      setLaeuft(false);
    }
  }

  return { laeuft, fehler, ok, senden, zuruecksetzen: () => { setOk(false); setFehler(null); } };
}
