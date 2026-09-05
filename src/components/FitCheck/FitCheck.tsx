"use client";

import { fit } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useMediaQuery } from "@/lib/hooks";
import styles from "./FitCheck.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

/** Frueher Filter: zwei Spalten, vier Zeilen je Seite, kein Fliesstext. */
export function FitCheck() {
  /* Auf dem Handy die kurzen Zeilen: jede passt in eine Zeile, statt
     ueber zwei zu laufen. Vier Punkte pro Seite bleiben es hier wie da. */
  const mobil = useMediaQuery("(max-width: 767px)");
  const columns = [
    {
      key: "yes",
      data: fit.yes,
      items: mobil ? fit.jaMobil : fit.yes.items,
      /* Steht nur unter der Ja-Spalte: dort entscheidet sich, ob jemand
         sich angesprochen fuehlt. */
      note: mobil ? fit.jaHinweisMobil : fit.yes.note,
      mark: "✓",
      className: styles.columnYes,
    },
    {
      key: "no",
      data: fit.no,
      items: mobil ? fit.neinMobil : fit.no.items,
      note: null,
      mark: "—",
      className: styles.columnNo,
    },
  ];

  return (
    <section className={styles.section} id="fuer-wen">
      <Backdrop variant="beam" tone="dark" drift={30} />

      <div className={styles.inner}>
        <SectionHead
          eyebrow={fit.eyebrow}
          lines={fit.headline}
          accentLines={fit.headlineAccent}
          tone="dark"
        />

        <div className={styles.columns}>
          {columns.map((column, index) => (
            <Reveal
              key={column.key}
              className={`${styles.column} ${column.className}`}
              delay={index * 90}
            >
              <p className={styles.label}>{column.data.label}</p>
              <ul className={styles.list}>
                {column.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.mark} aria-hidden="true">
                      {column.mark}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {column.note ? (
                <p className={styles.note}>{column.note}</p>
              ) : null}
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className={styles.closing}>{fit.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
