"use client";

import { fit } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useMediaQuery, useNacheinander } from "@/lib/hooks";
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

  /* Die Nein-Seite streicht sich beim Scrollen durch, eine Zeile nach der
     anderen. Nur auf dem Telefon: am Desktop stehen beide Spalten
     nebeneinander im Bild, dort waere der Lauf schon durch, bevor man
     hinsieht. */
  const { ref: neinRef, an: durch } = useNacheinander<HTMLUListElement>(
    mobil ? fit.neinMobil.length : 0,
    0.72,
    0.5,
  );

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
              <ul
                className={styles.list}
                ref={column.key === "no" ? neinRef : undefined}
              >
                {column.items.map((item, i) => (
                  <li
                    key={item}
                    className={[
                      styles.item,
                      column.key === "no" && mobil && i < durch
                        ? styles.itemDurch
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className={styles.mark} aria-hidden="true">
                      {column.mark}
                    </span>
                    <span className={styles.itemText}>{item}</span>
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
