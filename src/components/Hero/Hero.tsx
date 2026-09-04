"use client";

import type { CSSProperties } from "react";
import { catalogue, cta, hero } from "@/data/landingPage";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import { Media } from "@/components/Media/Media";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PlayButton } from "@/components/ui/PlayButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./Hero.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

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
  const headline = hero.headlines[hero.headlineVariant];

  return (
    <section className={styles.hero} id="top" aria-label="Einstieg">
      <Backdrop variant="grain" tone="dark" />

      <div className={styles.inner}>
        <div className={`${styles.copy} ${styles.copyTop}`}>
          <div className={styles.fadeUp} style={delay(260)}>
            <Eyebrow tone="accent" rule>
              {hero.eyebrow}
            </Eyebrow>
          </div>

          <h1 className={styles.headline}>
            {headline.lines.map((line, index) => (
              <Line key={line} delayMs={420 + index * 110}>
                {line}
              </Line>
            ))}
            {/* Nur setzen, wenn es die zweite Ebene ueberhaupt gibt — ein
                leerer Block wuerde Abstand erzeugen, den niemand sieht. */}
            {headline.accent.length ? (
              <span className={styles.accentBlock}>
                {headline.accent.map((line, index) => (
                  <Line
                    key={line}
                    delayMs={420 + (headline.lines.length + index) * 110}
                    accent
                  >
                    {line}
                  </Line>
                ))}
              </span>
            ) : null}
          </h1>

          {/* Metazeile: was das Ganze ist, in einer Zeile. */}
          <div className={`${styles.meta} ${styles.fadeUp}`} style={delay(880)}>
            <span className={styles.metaBy}>{hero.meta.by}</span>
            <span className={styles.badge}>{hero.meta.edition}</span>
            <span className={`${styles.badge} ${styles.badgeAccent}`}>
              {hero.meta.quality}
            </span>
            <span className={styles.metaCounts}>
              <span className={styles.metaPlain}>
                {catalogue.seriesCount} Serien
              </span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span className={styles.metaPlain}>
                {catalogue.episodeCount} Folgen
              </span>
            </span>
          </div>

        </div>

        <div className={styles.visual}>
          <div className={styles.visualFrame}>
            <Media asset={asset} tone="dark" priority autoPlay={!!asset.src} />
            <span className={styles.visualOverlay} aria-hidden="true" />
            <PlayButton
              onClick={openTrailer}
              ariaLabel={`${cta.heroSecondary.label} abspielen`}
            />
          </div>
        </div>

        <div className={`${styles.copy} ${styles.copyBottom}`}>
          <p className={`${styles.sub} ${styles.fadeUp}`} style={delay(1000)}>
            {hero.subheadline}
          </p>

          <div className={`${styles.ctas} ${styles.fadeUp}`} style={delay(1120)}>
            <ButtonLink href={cta.primary.href} variant="primaryOnDark">
              {cta.primary.label}
            </ButtonLink>
            <Button variant="ghostOnDark" withPlayIcon onClick={openTrailer}>
              {cta.heroSecondary.label}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
