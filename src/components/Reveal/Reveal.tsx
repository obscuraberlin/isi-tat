"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  /** "fade" = Fade + Shift, "mask" = Clip-Path-Reveal (sparsam einsetzen). */
  variant?: "fade" | "mask";
  delay?: number;
  /** Vertikaler Versatz in px fuer die Fade-Variante. */
  shift?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/** Scroll-Reveal per IntersectionObserver — laeuft einmal, dann kostenfrei. */
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  shift,
  as: Tag = "div",
  className,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const inlineStyle = {
    "--reveal-delay": `${delay}ms`,
    ...(shift != null ? { "--reveal-shift": `${shift}px` } : null),
    ...style,
  } as CSSProperties;

  if (variant === "mask") {
    return (
      <Tag
        ref={ref}
        className={[styles.maskHost, inView ? styles.visible : "", className]
          .filter(Boolean)
          .join(" ")}
        style={inlineStyle}
      >
        <span className={styles.maskInner}>{children}</span>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={[styles.reveal, inView ? styles.visible : "", className]
        .filter(Boolean)
        .join(" ")}
      style={inlineStyle}
    >
      {children}
    </Tag>
  );
}
