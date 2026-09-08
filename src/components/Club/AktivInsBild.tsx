"use client";

import { useEffect } from "react";

/**
 * Schiebt in einem seitlich scrollenden Band das markierte Element ins
 * Bild — z. B. die aktuelle Serie im Serienwechsel.
 *
 * Ohne das zeigt das Band auf dem Telefon immer den Anfang, und wer in
 * "Sales" ist, sieht oben "Mindset" markiert nicht, sondern gar nichts
 * Markiertes. Das sieht aus, als waere man woanders.
 *
 * Nur beim Einhaengen, ohne Animation: die Seite ist gerade erst da, ein
 * Band, das beim Laden losfaehrt, wirkt nervoes.
 */
export function AktivInsBild({ selektor }: { selektor: string }) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selektor);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" });
  }, [selektor]);

  return null;
}
