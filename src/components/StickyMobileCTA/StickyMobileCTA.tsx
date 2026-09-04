"use client";

import { useEffect, useState } from "react";
import { cta } from "@/data/landingPage";
import { useMediaQuery, useScrollProgress } from "@/lib/hooks";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./StickyMobileCTA.module.css";

/* Wo der Aufruf ohnehin auf der Seite steht. Solange einer davon im Bild
   ist, hält die Leiste sich zurück — zwei Aufforderungen gleichzeitig
   wirken nicht dringlicher, sondern lauter. */
const EIGENE_CTA = ["#zugang", "#abschluss", "footer"];

/**
 * Leiste am unteren Rand, nur auf dem Telefon.
 *
 * Erscheint ab ~40 % Scrolltiefe — nicht direkt beim Aufruf, da steht der
 * Aufruf schon im Hero. Verschwindet wieder, sobald der Besucher in einem
 * Abschnitt ist, der selbst einen Knopf trägt.
 */
export function StickyMobileCTA() {
  const progress = useScrollProgress();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [imWeg, setImWeg] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const ziele = EIGENE_CTA.map((s) => document.querySelector(s)).filter(
      (el): el is Element => Boolean(el),
    );
    if (ziele.length === 0) return;

    const sichtbar = new Set<Element>();
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.isIntersecting) sichtbar.add(e.target);
          else sichtbar.delete(e.target);
        }
        setImWeg(sichtbar.size > 0);
      },
      /* Etwas vor dem Rand: die Leiste soll weg sein, bevor der eigene
         Knopf ins Bild kommt, nicht erst darüber. */
      { rootMargin: "-20% 0px -20% 0px" },
    );

    ziele.forEach((el) => beobachter.observe(el));
    return () => beobachter.disconnect();
  }, [isMobile]);

  if (!isMobile) return null;

  const zeigen = progress > 0.4 && !imWeg;

  return (
    <div
      className={[styles.bar, zeigen ? styles.visible : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={!zeigen}
    >
      <ButtonLink
        href={cta.sticky.href}
        variant="primaryOnDark"
        full
        className={styles.cta}
        tabIndex={zeigen ? undefined : -1}
      >
        {cta.sticky.label}
      </ButtonLink>
    </div>
  );
}
