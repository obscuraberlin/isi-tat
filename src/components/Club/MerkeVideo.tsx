"use client";

import { useEffect } from "react";
import { merkeVideo } from "./Weitersehen";

/**
 * Setzt das Lesezeichen, sobald ein Video geoeffnet wird.
 *
 * Eine eigene Komponente, weil die Videoseite sonst insgesamt im Browser
 * laufen muesste — nur wegen dieser einen Zeile. So bleibt die Seite eine
 * Server-Komponente und nur dieser Haken wandert hinueber.
 *
 * Gespeichert wird im Browser des Mitglieds. Der Server erfaehrt nicht,
 * wer was angesehen hat, und soll es auch nicht.
 */
export function MerkeVideo({ nr }: { nr: number }) {
  useEffect(() => {
    merkeVideo(nr);
  }, [nr]);

  return null;
}
