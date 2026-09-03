"use client";

import styles from "./PlayButton.module.css";

interface PlayButtonProps {
  onClick: () => void;
  /** Barrierefreies Label, z. B. "Video abspielen: …" */
  ariaLabel: string;
  /** Optionales sichtbares Label unten links. */
  caption?: string;
}

/** Play-Overlay ueber einem Visual — deckt die gesamte Flaeche ab. */
export function PlayButton({ onClick, ariaLabel, caption }: PlayButtonProps) {
  return (
    <button
      type="button"
      className={styles.play}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={styles.circle} aria-hidden="true">
        <svg className={styles.icon} viewBox="0 0 17 20">
          <path d="M0 0v20l17-10z" />
        </svg>
      </span>
      {caption ? <span className={styles.label}>{caption}</span> : null}
    </button>
  );
}
