"use client";

import { useEffect, useRef } from "react";
import styles from "./Backdrop.module.css";

export type BackdropVariant = "grain" | "grid" | "glow" | "horizon" | "beam";

interface BackdropProps {
  variant: BackdropVariant;
  tone?: "light" | "dark";
  /** Staerke der Bewegung beim Scrollen. 0 = still. */
  drift?: number;
}

/**
 * Hintergrundebene einer Sektion. Liegt hinter dem Inhalt, faengt keine
 * Klicks ab und traegt nie Text — sie gibt der Flaeche nur Tiefe.
 *
 * Die Varianten sind bewusst verschieden: eine Seite, auf der jede Sektion
 * denselben Lichtkegel traegt, wirkt schneller billig als eine ganz ohne
 * Effekt. Deshalb bekommt jede Sektion einen eigenen Grund.
 *
 * `drift` haengt die Ebene an den Scrollfortschritt. Der Wert landet als
 * CSS-Variable auf dem Element; gerechnet wird in CSS, nicht in React —
 * so laeuft die Bewegung im Compositor und loest keinen Rerender aus.
 */
export function Backdrop({ variant, tone = "dark", drift = 0 }: BackdropProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || drift === 0) return;

    /* Wer Bewegung reduziert haben will, bekommt die Ebene still. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const span = window.innerHeight + box.height;
      if (span <= 0) return;
      /* -1 wenn die Sektion unten hereinkommt, +1 kurz vor dem Verlassen. */
      const p = 1 - (box.bottom / span) * 2;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [drift]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={[
        styles.backdrop,
        styles[variant],
        tone === "light" ? styles.onLight : styles.onDark,
      ].join(" ")}
      style={{ ["--drift" as string]: drift }}
    />
  );
}
