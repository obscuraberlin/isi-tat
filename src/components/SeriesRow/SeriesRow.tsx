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

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg className={styles.arrowIcon} viewBox="0 0 16 16" aria-hidden="true">
    <path
      d={dir === "left" ? "M10 2 4 8l6 6" : "M6 2l6 6-6 6"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Card({ series, onOpen }: { series: Series; onOpen: () => void }) {
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

export function SeriesRow() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState<Series | null>(null);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const page = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <section className={styles.section} id="inside-the-club">
      <Reveal className={styles.head}>
        <div>
          <Eyebrow rule>{insideTheClub.eyebrow}</Eyebrow>
          <h2 className={styles.headline}>{insideTheClub.headline}</h2>
        </div>

        <p className={styles.subline}>{insideTheClub.subline}</p>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Vorherige Serien"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Weitere Serien"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </Reveal>

      <div
        ref={scrollerRef}
        className={styles.scroller}
        role="region"
        aria-label={`${insideTheClub.headline} — Serien, horizontal scrollbar`}
        tabIndex={0}
      >
        {insideTheClub.series.map((series) => (
          <Card
            key={series.id}
            series={series}
            onOpen={() => setActive(series)}
          />
        ))}
      </div>

      <div className={styles.noteWrap}>
        <p className={styles.note}>{insideTheClub.note}</p>
      </div>

      <SeriesModal series={active} onClose={() => setActive(null)} />
    </section>
  );
}
