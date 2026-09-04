"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Wählt die Quelle für ein Video, das von selbst läuft.
 *
 * Auf schmalen Schirmen und für Flächen, die nur Hintergrund sind, die
 * kleine Fassung — dort sieht niemand den Unterschied, es spart aber ein
 * Vielfaches an Daten. Die Auswahl passiert im Browser, weil `<source
 * media>` in `<video>` von keinem Browser ausgewertet wird: gemessen lädt
 * Chromium auf 390 px Breite trotzdem die große Datei.
 *
 * Vor der ersten Messung wird `null` geliefert, damit nicht zuerst die
 * große Datei anläuft und die kleine sie ersetzt. Das Posterbild steht
 * in dieser Zeit — bei einem Hintergrund merkt das niemand.
 */
export function useLoopQuelle(
  gross: string | null | undefined,
  klein: string | null | undefined,
  /** true = immer die kleine Fassung, unabhängig von der Bildschirmbreite. */
  immerKlein = false,
) {
  const [quelle, setQuelle] = useState<string | null>(null);

  useEffect(() => {
    if (!gross) {
      setQuelle(null);
      return;
    }
    if (!klein) {
      setQuelle(gross);
      return;
    }
    if (immerKlein) {
      setQuelle(klein);
      return;
    }

    const schmal = window.matchMedia("(max-width: 900px)");
    const waehlen = () => setQuelle(schmal.matches ? klein : gross);
    waehlen();

    /* Beim Drehen des Geräts neu entscheiden — aber nur, wenn sich die
       Antwort dadurch ändert, sonst startet das Video ohne Grund neu. */
    schmal.addEventListener("change", waehlen);
    return () => schmal.removeEventListener("change", waehlen);
  }, [gross, klein, immerKlein]);

  return quelle;
}

/**
 * Hält ein Video an, sobald es aus dem Bild gescrollt ist.
 *
 * Ein Loop, der unsichtbar weiterläuft, kostet Akku und auf dem Handy
 * spürbar Rechenzeit — bei mehreren Flächen auf einer Seite summiert sich
 * das. Wer Bewegung reduziert haben will, bekommt es gar nicht erst.
 */
export function useLoopImBild(
  ref: RefObject<HTMLVideoElement | null>,
  aktiv: boolean,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !aktiv) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }

    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting) {
          /* Kann scheitern (Energiesparmodus, Datensparmodus). Dann steht
             das Posterbild — das ist ein gültiger Zustand, kein Fehler. */
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" },
    );

    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [ref, aktiv]);
}
