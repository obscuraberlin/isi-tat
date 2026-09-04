"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Series } from "@/data/landingPage";
import { insideTheClub } from "@/data/landingPage";
import { useHasHover } from "@/lib/hooks";
import { Media } from "@/components/Media/Media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import { SeriesModal } from "./SeriesModal";
import styles from "./SeriesRow.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

function Card({
  series,
  onOpen,
  /** Kopie fuer den Endlos-Lauf: dekorativ, nicht anspringbar, nicht vorgelesen. */
  kopie = false,
}: {
  series: Series;
  onOpen: () => void;
  kopie?: boolean;
}) {
  const hasHover = useHasHover();
  const [previewOn, setPreviewOn] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Preview nur, wenn ein echtes Asset vorliegt — nichts vortaeuschen. */
  const canPreview = hasHover && !!series.preview?.src;

  const start = useCallback(() => {
    if (!canPreview) return;
    timer.current = setTimeout(() => setPreviewOn(true), 550);
  }, [canPreview]);

  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPreviewOn(false);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const count = series.episodes.length;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onOpen}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      aria-label={`${series.label} öffnen`}
      aria-hidden={kopie || undefined}
      tabIndex={kopie ? -1 : undefined}
    >
      <Media asset={series.cover} tone="dark" radius="inherit" />

      {canPreview && series.preview?.src ? (
        <video
          className={[styles.preview, previewOn ? styles.previewVisible : ""]
            .filter(Boolean)
            .join(" ")}
          src={previewOn ? series.preview.src : undefined}
          poster={series.preview.poster ?? undefined}
          muted
          loop
          playsInline
          autoPlay={previewOn}
          aria-hidden="true"
        />
      ) : null}

      <span className={styles.scrim} aria-hidden="true" />

      <div className={styles.cardBody}>
        <span className={styles.cardMeta}>
          {series.format === "live" ? "Format" : "Serie"} ·{" "}
          {count} {count === 1 ? "Folge" : "Folgen"}
        </span>
        <h3 className={styles.cardLabel}>{series.label}</h3>
        <div className={styles.cardCopyWrap}>
          <div>
            <p className={styles.cardCopy}>{series.tagline}</p>
          </div>
        </div>
        <span className={styles.cardOpen}>
          <svg className={styles.playIcon} viewBox="0 0 9 11" aria-hidden="true">
            <path d="M0 0v11l9-5.5z" />
          </svg>
          Ansehen
        </span>
      </div>
    </button>
  );
}

/* Drei Kopien: eine reicht nicht ueber die Breite eines grossen Schirms,
   zwei liessen beim Sprung eine Luecke. Verschoben wird um genau eine
   Kopie — dadurch sitzt der Sprung auf einem identischen Bild. */
const KOPIEN = 3;

export function SeriesRow() {
  const [active, setActive] = useState<Series | null>(null);

  return (
    <section className={styles.section} id="im-club">
      <Backdrop variant="glow" tone="light" drift={60} />

      <Reveal className={styles.head}>
        <div>
          <Eyebrow rule>{insideTheClub.eyebrow}</Eyebrow>
          <h2 className={styles.headline}>{insideTheClub.headline}</h2>
        </div>

        <p className={styles.subline}>{insideTheClub.subline}</p>
      </Reveal>

      {/* Laufband ueber die volle Breite statt einer Spalte mit Pfeilen:
          links wie rechts laeuft es aus dem Bild, die Reihe steht nie
          angeschnitten still. Haelt an, sobald jemand mit der Maus oder
          der Tastatur hineingeht — sonst klickt man auf ein Ziel, das
          sich wegbewegt. */}
      <div
        className={styles.marquee}
        role="region"
        aria-label={`${insideTheClub.headline} — Serien`}
      >
        <div className={styles.track}>
          {Array.from({ length: KOPIEN }, (_, kopie) =>
            insideTheClub.series.map((series) => (
              <Card
                key={`${kopie}-${series.id}`}
                series={series}
                kopie={kopie > 0}
                onOpen={() => setActive(series)}
              />
            )),
          )}
        </div>
      </div>

      <div className={styles.noteWrap}>
        <p className={styles.note}>{insideTheClub.note}</p>
      </div>

      <SeriesModal series={active} onClose={() => setActive(null)} />
    </section>
  );
}
