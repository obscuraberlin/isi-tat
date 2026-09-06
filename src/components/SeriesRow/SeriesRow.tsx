"use client";

import { useState } from "react";
import type { Series } from "@/data/landingPage";
import { catalogue, insideTheClub } from "@/data/landingPage";
import { useInView } from "@/lib/hooks";
import { Media } from "@/components/Media/Media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import { SeriesModal } from "./SeriesModal";
import styles from "./SeriesRow.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

/**
 * Ein Kapitel der Masterclass.
 *
 * Frueher lagen die Themenwelten als Karten in einem Endlos-Laufband.
 * Das hatte zwei Probleme: es sah aus wie ein Shop-Regal, und fuer den
 * lueckenlosen Lauf standen alle Karten dreifach im DOM — Suchmaschinen
 * und Vorlesegeraete sahen jede Themenwelt dreimal.
 *
 * Jetzt nimmt jedes Kapitel eine eigene Flaeche ein, Bild und Text
 * wechseln die Seite, und die Nummer steht gross und fast unsichtbar
 * dahinter. Jede Themenwelt steht genau einmal auf der Seite.
 */
function Chapter({
  series,
  index,
  gesamt,
  onOpen,
}: {
  series: Series;
  index: number;
  gesamt: number;
  onOpen: () => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.14,
    rootMargin: "0px 0px -12% 0px",
  });
  const nr = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      className={[
        styles.chapter,
        index % 2 === 1 ? styles.chapterGedreht : "",
        inView ? styles.chapterAn : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Die Nummer traegt keine Information, sie gibt der Flaeche Tiefe.
          Deshalb aria-hidden und sehr weit zurueckgenommen. */}
      <span className={styles.ghost} aria-hidden="true">
        {nr}
      </span>

      <div className={styles.chapterVisual}>
        <div className={styles.chapterBild}>
          <Media asset={series.cover} tone="dark" ratio="4 / 5" radius="0" />
        </div>
      </div>

      <div className={styles.chapterText}>
        <p className={styles.kapitelMarke}>
          {nr} <span aria-hidden="true">/</span> {String(gesamt).padStart(2, "0")}
        </p>

        <h3 className={styles.chapterTitel}>{series.label}</h3>

        <p className={styles.chapterZahl}>
          {String(series.videos).padStart(2, "0")} Filme
        </p>

        <p className={styles.chapterCopy}>{series.tagline}</p>

        <button type="button" className={styles.kapitelKnopf} onClick={onOpen}>
          {insideTheClub.kapitelOeffnen}
          <span className={styles.pfeil} aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </article>
  );
}

export function SeriesRow() {
  const [active, setActive] = useState<Series | null>(null);

  return (
    <section className={styles.section} id="im-club">
      <Backdrop variant="glow" tone="light" drift={60} />

      <div className={styles.head}>
        <Eyebrow rule>{insideTheClub.eyebrow}</Eyebrow>
        <Reveal variant="mask">
          <h2 className={styles.headline}>
            {catalogue.videoCount} VIDEOS.
            <span className={styles.headlineZeile}>
              {catalogue.seriesCount} THEMENWELTEN.
            </span>
            <span className={styles.headlineAkzent}>
              KEINE ABKÜRZUNG OHNE UMSETZUNG.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className={styles.subline}>{insideTheClub.subline}</p>
        </Reveal>
      </div>

      <div className={styles.chapters}>
        {insideTheClub.series.map((series, index) => (
          <Chapter
            key={series.id}
            series={series}
            index={index}
            gesamt={insideTheClub.series.length}
            onOpen={() => setActive(series)}
          />
        ))}
      </div>

      <div className={styles.noteWrap}>
        <Reveal>
          <p className={styles.workLine}>
            {insideTheClub.workLine.map((line) => (
              <span key={line} className={styles.workLineRow}>
                {line}
              </span>
            ))}
          </p>
          <p className={styles.work}>{insideTheClub.work}</p>

          {/* Wie an einem einzelnen Video gearbeitet wird — kein Lernpfad
              durch die Inhalte, sondern die Arbeitsweise daran. */}
          <ol className={styles.ablauf}>
            {insideTheClub.ablauf.map((schritt, i) => (
              <li key={schritt} className={styles.schritt}>
                <span className={styles.schrittNr}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {schritt}
              </li>
            ))}
          </ol>
        </Reveal>

        <p className={styles.note}>{insideTheClub.note}</p>
      </div>

      <SeriesModal series={active} onClose={() => setActive(null)} />
    </section>
  );
}
