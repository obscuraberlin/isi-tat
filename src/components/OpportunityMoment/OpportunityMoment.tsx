"use client";

import { backdrops, opportunity } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./OpportunityMoment.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

export function OpportunityMoment() {
  return (
    <section className={styles.section}>
      <Backdrop variant="grain" tone="dark" />

      <div className={styles.inner}>
        <Reveal variant="mask">
          <p className={`${styles.block} ${styles.muted}`}>
            {opportunity.first.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </p>
        </Reveal>

        {/* Ein echtes Bild zwischen den beiden Aussagen statt einer
            Aufnahme hinter dem Text: hinter Schrift wird jeder Schnitt
            matschig, davor traegt er. Und es zeigt genau, wovon die
            Zeilen sprechen — jemand, der allein in der Halle sitzt. */}
        <Reveal delay={80} className={styles.bild}>
          <Media asset={backdrops.ctaNachInhalten} tone="dark" ratio="16 / 9" />
        </Reveal>

        <Reveal variant="mask" className={styles.second}>
          <p className={styles.block}>
            {opportunity.second.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
            <span className={styles.accent}>{opportunity.accent}</span>
          </p>
        </Reveal>

        <Reveal delay={140} className={styles.closing}>
          {opportunity.closing.map((line, index) => (
            <span
              key={line}
              className={[
                styles.closingLine,
                index === opportunity.closing.length - 1 ? styles.accent : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {line}
            </span>
          ))}
        </Reveal>

        {/* Vor dem Hinweis, nicht danach: erst sagt er, warum — dann
            steht da, was daraus nicht folgt. */}
        <Reveal delay={160}>
          <blockquote className={styles.zitat}>
            {opportunity.zitat.map((absatz) => (
              <p key={absatz}>{absatz}</p>
            ))}
            <cite className={styles.zitatName}>ISI TAT</cite>
          </blockquote>
        </Reveal>

        <Reveal delay={180}>
          <p className={styles.note}>{opportunity.note}</p>
          <p className={styles.disclaimer}>{opportunity.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
