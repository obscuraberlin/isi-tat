"use client";

import { vergleich } from "@/data/landingPage";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Vergleich.module.css";

/**
 * Masterclass gegen Club.
 *
 * Die Unterscheidung, an der die ganze Produktlogik haengt — einmal
 * gross und ohne Beiwerk. Zwei Haelften, eine Linie dazwischen, sonst
 * nichts auf der Flaeche.
 */
export function Vergleich() {
  return (
    <section className={styles.section} aria-label="Masterclass und Club">
      <div className={styles.inner}>
        <div className={styles.paar}>
          {[vergleich.links, vergleich.rechts].map((seite, i) => (
            <Reveal key={seite.label} className={styles.seite} delay={i * 120}>
              <p className={styles.label}>{seite.label}</p>
              <p
                className={[styles.zeile, i === 1 ? styles.zeileAkzent : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                {seite.zeile}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <p className={styles.note}>{vergleich.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
