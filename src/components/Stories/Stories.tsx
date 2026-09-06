"use client";

import { stories } from "@/data/landingPage";
import { Reveal } from "@/components/Reveal/Reveal";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./Stories.module.css";

/**
 * Vier Geschichten aus der Masterclass.
 *
 * Der Betrag steht gross, weil er den Blick faengt — aber er ist der
 * Einstieg, nicht der Inhalt. Darunter steht jedes Mal, worum es
 * tatsaechlich geht. Keine Karten mit Symbolen, keine Balken: nur
 * Typografie und Linien.
 */
export function Stories() {
  return (
    <section className={styles.section} aria-label="Echte Entscheidungen">
      <Backdrop variant="grain" tone="dark" />

      <div className={styles.inner}>
        <Reveal variant="mask">
          <h2 className={styles.headline}>
            {stories.headline.map((line, i) => (
              <span
                key={line}
                className={i === 1 ? styles.headlineAkzent : undefined}
              >
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <ol className={styles.liste}>
          {stories.items.map((item, i) => (
            <Reveal as="li" key={item.nr} className={styles.item} delay={i * 70}>
              <span className={styles.nr}>{item.nr}</span>

              <p className={styles.betrag}>{item.betrag}</p>

              <p className={styles.zeile}>
                {item.zeile.map((z) => (
                  <span key={z}>{z}</span>
                ))}
              </p>

              <p className={styles.marke}>{item.marke}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
