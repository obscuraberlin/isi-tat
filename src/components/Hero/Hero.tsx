"use client";

import type { CSSProperties } from "react";
import { cta, hero } from "@/data/landingPage";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import { Media } from "@/components/Media/Media";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./Hero.module.css";

const delay = (ms: number) => ({ ["--delay"]: `${ms}ms` }) as CSSProperties;

/** Zeilenweiser Mask-Reveal der Headline. */
function Line({
  children,
  delayMs,
  accent,
}: {
  children: string;
  delayMs: number;
  accent?: boolean;
}) {
  return (
    <span className={styles.line}>
      <span
        className={[styles.lineInner, accent ? styles.accent : ""]
          .filter(Boolean)
          .join(" ")}
        style={delay(delayMs)}
      >
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const { openTrailer } = useTrailer();

  /* Hero-Video bevorzugt, Bild als Fallback solange kein Video hinterlegt ist. */
  const asset = hero.video.src ? hero.video : hero.image;

  return (
    <section className={styles.hero} id="top" aria-label="Einstieg">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.fadeUp} style={delay(260)}>
            <Eyebrow tone="accent" rule>
              {hero.eyebrow}
            </Eyebrow>
          </div>

          <h1 className={styles.headline}>
            <Line delayMs={420}>{hero.headline.line1}</Line>
            <span className={styles.accentBlock}>
              <Line delayMs={560} accent>
                {hero.headline.accent[0]}
              </Line>
              <Line delayMs={660} accent>
                {hero.headline.accent[1]}
              </Line>
            </span>
          </h1>

          <p className={`${styles.sub} ${styles.fadeUp}`} style={delay(880)}>
            {hero.subheadline}
          </p>

          <div className={`${styles.ctas} ${styles.fadeUp}`} style={delay(1000)}>
            <ButtonLink href={cta.primary.href} variant="primaryOnDark">
              {cta.primary.label}
            </ButtonLink>
            <Button variant="ghostOnDark" withPlayIcon onClick={openTrailer}>
              {cta.heroSecondary.label}
            </Button>
          </div>

          <ul className={`${styles.trustLine} ${styles.fadeUp}`} style={delay(1120)}>
            {hero.trustLine.map((item) => (
              <li key={item} className={styles.trustItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualFrame}>
            <Media asset={asset} tone="dark" priority autoPlay={!!asset.src} />
            <span className={styles.visualOverlay} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
