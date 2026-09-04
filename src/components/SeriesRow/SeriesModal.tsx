"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Series } from "@/data/landingPage";
import { cta, hero, insideTheClub } from "@/data/landingPage";
import { useScrollLock } from "@/lib/hooks";
import { Media } from "@/components/Media/Media";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./SeriesModal.module.css";

interface SeriesModalProps {
  series: Series | null;
  onClose: () => void;
}

/**
 * Detailansicht eines Kurses — bewusst ohne Nummerierung und ohne
 * vorgegebene Reihenfolge: eine Mediathek, kein Lehrplan.
 */
export function SeriesModal({ series, onClose }: SeriesModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const { openVideo } = useTrailer();

  useScrollLock(series !== null);

  useEffect(() => {
    if (!series) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreRef.current?.focus?.();
    };
  }, [series, onClose]);

  if (!series || typeof document === "undefined") return null;

  const count = series.episodes.length;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={series.label}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={panelRef} className={styles.panel}>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Schließen"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.stage}>
          <Media asset={series.still} tone="dark" radius="0" />
          <span className={styles.stageScrim} aria-hidden="true" />
          <div className={styles.stageBody}>
            <h2 className={styles.title}>{series.label}</h2>
            <div className={styles.meta}>
              <span className={styles.tag}>
                {series.format === "live" ? "Format" : "Kurs"}
              </span>
              <span className={styles.tag}>{hero.meta.edition}</span>
              <span className={`${styles.tag} ${styles.tagAccent}`}>
                {hero.meta.quality}
              </span>
              <span>
                {count} {count === 1 ? "Folge" : "Folgen"}
              </span>
              <span aria-hidden="true">·</span>
              <span>{series.tagline}</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.actions}>
              <Button
                variant="primaryOnDark"
                withPlayIcon
                onClick={() => openVideo(series.still, series.label)}
              >
                VORSCHAU
              </Button>
              <ButtonLink href={cta.primary.href} variant="ghostOnDark" onClick={onClose}>
                {cta.primary.label}
              </ButtonLink>
            </div>

            <p className={styles.description}>{series.description}</p>

            <p className={styles.footnote}>
              {insideTheClub.draftEpisodeNote}
            </p>
          </div>

          <div>
            <p className={styles.episodesTitle}>Folgen</p>
            <ul className={styles.episodes}>
              {series.episodes.map((episode) => (
                <li key={episode.title} className={styles.episode}>
                  <span className={styles.episodeIcon} aria-hidden="true">
                    <svg viewBox="0 0 9 11">
                      <path d="M0 0v11l9-5.5z" />
                    </svg>
                  </span>
                  <span className={styles.episodeTitle}>{episode.title}</span>
                  {episode.runtime ? (
                    <span className={styles.episodeRuntime}>{episode.runtime}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
