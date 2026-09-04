"use client";

import { cta, finalCta } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal/Reveal";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./FinalCTA.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

export function FinalCTA() {
  const { openTrailer } = useTrailer();

  return (
    <section className={styles.section}>
      <Backdrop variant="grain" tone="dark" />

      <div className={styles.bg} aria-hidden="true">
        <Media asset={finalCta.video} tone="dark" radius="0" autoPlay decoration />
      </div>
      <span className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal variant="mask">
          <h2 className={styles.headline}>
            {finalCta.headline.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
            <span className={styles.accentBlock}>
              {finalCta.accent.map((line) => (
                <span key={line} className={styles.accent}>
                  {line}
                </span>
              ))}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={130} className={styles.body}>
          {finalCta.body.map((line) => (
            <span key={line} className={styles.bodyLine}>
              {line}
            </span>
          ))}
        </Reveal>

        <Reveal delay={170}>
          <p className={styles.brand}>{finalCta.brand}</p>
        </Reveal>

        <Reveal delay={210} className={styles.ctas}>
          <ButtonLink href={cta.primary.href} variant="primaryOnDark">
            {cta.primary.label}
          </ButtonLink>
          <Button variant="ghostOnDark" withPlayIcon onClick={openTrailer}>
            {cta.secondary.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
