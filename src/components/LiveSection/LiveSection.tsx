"use client";

import { insideTheClub, live } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Reveal } from "@/components/Reveal/Reveal";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./LiveSection.module.css";

/**
 * Live mit ISI — eigener Abschnitt hinter den fuenf Themenwelten.
 *
 * Frueher stand das als sechste Karte in der Serienreihe und wurde damit
 * zur Masterclass gezaehlt. Es ist aber kein Kursinhalt, sondern ein
 * Bestandteil der Mitgliedschaft. Die Trennung ist der Grund fuer diesen
 * Abschnitt: die Reihe darueber sind 40 Videos, das hier ist der Club.
 *
 * Keine Frequenz und keine Terminzahl, solange sie nicht feststehen.
 */
export function LiveSection() {
  return (
    <section className={styles.section} id="live" aria-label={live.label}>
      <Backdrop variant="horizon" tone="dark" drift={40} />

      <div className={styles.inner}>
        <Reveal>
          <p className={styles.lead}>
            {live.lead.map((line) => (
              <span key={line} className={styles.leadLine}>
                {line}
              </span>
            ))}
          </p>
        </Reveal>

        <div className={styles.grid}>
          <Reveal delay={80} className={styles.copy}>
            <h2 className={styles.headline}>{live.label}</h2>
            <p className={styles.line}>{live.line}</p>

            <ul className={styles.items}>
              {live.items.map((item) => (
                <li key={item.label} className={styles.item}>
                  <span className={styles.itemLabel}>{item.label}</span>
                  <span className={styles.itemText}>{item.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className={styles.visual}>
            <Media asset={insideTheClub.liveVisual.still} tone="dark" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
