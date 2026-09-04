"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { MediaAsset } from "@/data/landingPage";
import { trailer } from "@/data/landingPage";
import { useScrollLock } from "@/lib/hooks";
import { Media } from "@/components/Media/Media";
import styles from "./TrailerModal.module.css";

interface TrailerModalProps {
  request: { asset: MediaAsset; label: string } | null;
  onClose: () => void;
}

/**
 * Fullscreen-Trailer-Overlay.
 * Kein fremdes Player-Chrome, ESC schliesst, Fokus bleibt im Overlay.
 */
export function TrailerModal({ request, onClose }: TrailerModalProps) {
  const open = request !== null;
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], video[controls], [tabindex]:not([tabindex="-1"])',
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
  }, [open, onClose]);

  if (!request || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={request.label}
    >
      <div className={styles.bar}>
        <span className={styles.title}>{request.label}</span>
        <button ref={closeRef} className={styles.close} onClick={onClose}>
          <span aria-hidden="true">×</span> {trailer.closeLabel}
        </button>
      </div>

      {/* Wer auf "Trailer" klickt, hat den Start schon ausgeloest — ein
          zweiter Klick auf Play waere eine Zumutung. Der Klick gilt dem
          Browser als Geste, deshalb darf der Ton an sein. Blockt er
          trotzdem, steht das Video mit Bedienelementen da; schlimmer als
          vorher wird es nicht. */}
      <div className={styles.stage}>
        <Media
          asset={request.asset}
          tone="dark"
          className={styles.player}
          radius="14px"
          controls
          priority
          autoPlay
          muted={false}
          loop={false}
        />
      </div>

      {request.asset.src ? null : (
        <p className={styles.note}>
          Video-Asset noch nicht hinterlegt — Platzhalter {request.asset.id}.
        </p>
      )}
    </div>,
    document.body,
  );
}
