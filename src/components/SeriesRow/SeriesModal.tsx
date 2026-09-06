"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Series } from "@/data/landingPage";
import { cta, hero, insideTheClub } from "@/data/landingPage";
import { useMediaQuery, useScrollLock } from "@/lib/hooks";
import { Media } from "@/components/Media/Media";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./SeriesModal.module.css";

interface SeriesModalProps {
  series: Series | null;
  onClose: () => void;
}

/**
 * Detailansicht einer Serie — bewusst ohne Nummerierung und ohne
 * vorgegebene Reihenfolge: eine Mediathek, kein Lehrplan.
 */
export function SeriesModal({ series, onClose }: SeriesModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const { openTrailer } = useTrailer();
  /* Zehn Beispielthemen untereinander sind auf 375 px eine halbe
     Bildschirmhoehe Aufzaehlung. Drei reichen, um zu zeigen, worum es
     geht; der Rest steht hinter einem Schalter. */
  const mobil = useMediaQuery("(max-width: 767px)");
  const [alleThemen, setAlleThemen] = useState(false);

  useScrollLock(series !== null);

  useEffect(() => {
    setAlleThemen(false);
  }, [series]);

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

  /* Nur auf dem Telefon kuerzen, und nur wenn es wirklich mehr als drei
     sind — sonst stuende ein Schalter da, der nichts aufklappt. */
  const gekuerzt = mobil && series.topics.length > 3;
  const themen =
    gekuerzt && !alleThemen ? series.topics.slice(0, 3) : series.topics;

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
              <span className={styles.tag}>Themenwelt</span>
              <span className={`${styles.tag} ${styles.tagAccent}`}>
                {hero.meta.edition}
              </span>
              <span>{series.videos} Videos</span>
              <span aria-hidden="true">·</span>
              <span>{series.tagline}</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.actions}>
              {/* Frueher "VORSCHAU", die series.still oeffnete — ein
                  Standbild in einem Videofenster. Es gibt genau ein
                  Video auf dieser Seite, und das ist der Trailer. */}
              <Button
                variant="primaryOnDark"
                withPlayIcon
                onClick={() => {
                  /* Erst dieses Fenster zu, dann den Trailer auf — sonst
                     lägen zwei Overlays uebereinander und beide sperrten
                     das Scrollen. */
                  onClose();
                  openTrailer();
                }}
              >
                {cta.secondary.label}
              </Button>
              <ButtonLink href={cta.primary.href} variant="ghostOnDark" onClick={onClose}>
                {cta.primary.label}
              </ButtonLink>
            </div>

            <p className={styles.description}>{series.description}</p>
          </div>

          {/* Beispielthemen statt Folgentitel: was vorkommt, nicht in
              welcher Reihenfolge. Die Liste ist bewusst nicht
              nummeriert. */}
          <div>
            <p className={styles.episodesTitle}>Beispielthemen</p>
            <ul className={styles.episodes}>
              {themen.map((thema) => (
                <li key={thema} className={styles.episode}>
                  <span className={styles.episodeIcon} aria-hidden="true">
                    <svg viewBox="0 0 9 11">
                      <path d="M0 0v11l9-5.5z" />
                    </svg>
                  </span>
                  <span className={styles.episodeTitle}>{thema}</span>
                </li>
              ))}
            </ul>

            {gekuerzt ? (
              <button
                type="button"
                className={styles.mehr}
                onClick={() => setAlleThemen((v) => !v)}
              >
                {alleThemen
                  ? insideTheClub.themenWeniger
                  : insideTheClub.themenMehr}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
