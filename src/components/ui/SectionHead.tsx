import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./SectionHead.module.css";

interface SectionHeadProps {
  eyebrow?: string;
  /** Jede Zeile wird als eigener Block gesetzt. */
  lines: readonly string[];
  /** Zusätzliche Zeilen im Champagne-Akzent. */
  accentLines?: readonly string[];
  subline?: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}

/** Ab dieser Zeichenzahl wird die Headline eine Stufe kleiner gesetzt. */
const LONG_HEADLINE = 44;

export function SectionHead({
  eyebrow,
  lines,
  accentLines,
  subline,
  tone = "light",
  align = "start",
  className,
}: SectionHeadProps) {
  const length = [...lines, ...(accentLines ?? [])].join("").length;

  return (
    <div
      className={[
        styles.head,
        align === "center" ? styles.center : "",
        tone === "dark" ? styles.onDark : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow rule tone={tone === "dark" ? "onDark" : "default"}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}

      <Reveal variant="mask" delay={60}>
        <h2
          className={[
            styles.headline,
            length > LONG_HEADLINE ? styles.headlineLong : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {lines.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
          {accentLines?.map((line) => (
            <span key={line} className={`${styles.line} ${styles.accent}`}>
              {line}
            </span>
          ))}
        </h2>
      </Reveal>

      {subline ? (
        <Reveal delay={120}>
          <p className={styles.subline}>{subline}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
