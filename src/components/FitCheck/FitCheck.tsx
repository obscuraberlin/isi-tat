"use client";

import { fit } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./FitCheck.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

/** Frueher Filter: zwei Spalten, vier Zeilen je Seite, kein Fliesstext. */
export function FitCheck() {
  const columns = [
    { key: "yes", data: fit.yes, mark: "✓", className: styles.columnYes },
    { key: "no", data: fit.no, mark: "—", className: styles.columnNo },
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
                {column.data.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.mark} aria-hidden="true">
                      {column.mark}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
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
