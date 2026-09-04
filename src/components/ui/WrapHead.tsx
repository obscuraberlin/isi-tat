import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./WrapHead.module.css";

export type WrapVariant = "center" | "offset" | "band";

interface WrapHeadProps {
  eyebrow?: string;
  /** Zeilen ueber dem Medium. */
  above: readonly string[];
  /** Zeilen unter dem Medium. */
  below: readonly string[];
  /** Untere Zeilen im Champagne-Akzent setzen. */
  belowAccent?: boolean;
  /**
   * center — Medium schmal in der Mitte, Zeilen rahmen es oben und unten.
   * offset — untere Zeile eingerueckt, sie schiebt sich unter das Medium.
   * band   — Medium laeuft ueber die volle Breite zwischen den Zeilen.
   */
  variant?: WrapVariant;
  tone?: "light" | "dark";
  children: ReactNode;
}

/** Ab dieser Zeichenzahl laeuft die Headline eine Stufe kleiner. */
const LONG_HEADLINE = 44;

/**
 * Headline und Medium greifen ineinander, statt nebeneinander in zwei
 * Spalten zu stehen: ein Teil der Aussage steht darueber, der Rest darunter.
 * Das Medium liegt im Satz, nicht daneben — und der Satz liest sich weiter,
 * nachdem das Auge das Bild passiert hat.
 */
export function WrapHead({
  eyebrow,
  above,
  below,
  belowAccent = false,
  variant = "center",
  tone = "light",
  children,
}: WrapHeadProps) {
  const long = [...above, ...below].join("").length > LONG_HEADLINE;

  const line = (text: string, accent = false) => (
    <span
      key={text}
      className={[styles.line, accent ? styles.accent : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {text}
    </span>
  );

  return (
    <div
      className={[styles.wrap, styles[variant], tone === "dark" ? styles.onDark : ""]
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

      {/* Ein h2 ueber beide Haelften — das Medium darf den Satz optisch
          teilen, aber nicht die Ueberschrift in zwei Ueberschriften. */}
      <h2 className={[styles.headline, long ? styles.long : ""].filter(Boolean).join(" ")}>
        <Reveal as="span" variant="mask" delay={60} className={styles.above}>
          {above.map((text) => line(text))}
        </Reveal>

        <Reveal as="span" delay={100} className={styles.media}>
          {children}
        </Reveal>

        <Reveal as="span" variant="mask" delay={140} className={styles.below}>
          {below.map((text) => line(text, belowAccent))}
        </Reveal>
      </h2>
    </div>
  );
}
