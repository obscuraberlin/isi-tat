"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ContentCard } from "@/data/landingPage";
import { insideTheClub } from "@/data/landingPage";
import { useHasHover } from "@/lib/hooks";
import { Media } from "@/components/Media/Media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./ContentCarousel.module.css";

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg className={styles.arrowIcon} viewBox="0 0 16 16" aria-hidden="true">
    <path
      d={dir === "left" ? "M10 2 4 8l6 6" : "M6 2l6 6-6 6"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Card({ card, index }: { card: ContentCard; index: number }) {
  const hasHover = useHasHover();
  const [previewOn, setPreviewOn] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Preview nur, wenn ein echtes Asset vorliegt — nichts vortaeuschen. */
  const canPreview = hasHover && !!card.preview?.src;

  const start = useCallback(() => {
    if (!canPreview) return;
    timer.current = setTimeout(() => setPreviewOn(true), 550);
  }, [canPreview]);

  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPreviewOn(false);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const content = (
    <>
      <Media asset={card.thumbnail} tone="dark" radius="inherit" />

      {canPreview && card.preview?.src ? (
        <video
          className={[styles.preview, previewOn ? styles.previewVisible : ""]
            .filter(Boolean)
            .join(" ")}
          src={previewOn ? card.preview.src : undefined}
          poster={card.preview.poster ?? undefined}
          muted
          loop
          playsInline
          autoPlay={previewOn}
          aria-hidden="true"
        />
      ) : null}

      <span className={styles.scrim} aria-hidden="true" />
      <span className={styles.index} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={styles.cardBody}>
        <h3 className={styles.cardLabel}>{card.label}</h3>
        <div className={styles.cardCopyWrap}>
          <div>
            <p className={styles.cardCopy}>{card.copy}</p>
          </div>
        </div>
        {card.href ? (
          <span className={styles.cardPlay}>
            <svg className={styles.cardPlayIcon} viewBox="0 0 9 11" aria-hidden="true">
              <path d="M0 0v11l9-5.5z" />
            </svg>
            Ansehen
          </span>
        ) : null}
      </div>
    </>
  );

  if (card.href) {
    return (
      <a
        className={styles.card}
        href={card.href}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
      >
        {content}
      </a>
    );
  }

  return (
    <article className={styles.card} onMouseEnter={start} onMouseLeave={stop}>
      {content}
    </article>
  );
}

export function ContentCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
          <Eyebrow rule>Inside</Eyebrow>
          <h2 className={styles.headline}>{insideTheClub.headline}</h2>
        </div>

        <p className={styles.subline}>{insideTheClub.subline}</p>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Vorherige Inhalte"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Weitere Inhalte"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </Reveal>

      <div
        ref={scrollerRef}
        className={styles.scroller}
        role="region"
        aria-label={`${insideTheClub.headline} — Inhalte, horizontal scrollbar`}
        tabIndex={0}
      >
        {insideTheClub.cards.map((card, index) => (
          <Card key={card.label} card={card} index={index} />
        ))}
      </div>

      <p className={styles.hint}>
        Der Umfang der Inhalte wird im Gespräch besprochen — hier stehen nur die
        Themenfelder.
      </p>
    </section>
  );
}
