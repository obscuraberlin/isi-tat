"use client";

import { cta, finalCta, trailer } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal/Reveal";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./FinalCTA.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

export function FinalCTA() {
  const { openTrailer, active } = useTrailer();


  return (
    <section className={styles.section} id="abschluss">
      <Backdrop variant="grain" tone="dark" />

      {/* Der fertige Trailer, stumm und unscharf. Er laeuft hier ohnehin
          im Hintergrund, also liegt die Datei schon im Zwischenspeicher,
          wenn jemand darunter auf "Trailer ansehen" drueckt — das Fenster
          geht dann ohne Ladezeit auf.

          Solange ein Video im Overlay laeuft, steht hier keines: iOS
          erlaubt nur eine begrenzte Zahl gleichzeitig laufender Videos,
          und der Hintergrund darf dem Trailer nicht den Platz wegnehmen.
          Das Overlay deckt die Flaeche ohnehin ab, zu sehen ist davon
          nichts. */}
      <div className={styles.bg} aria-hidden="true">
        {active ? null : (
          <Media
            asset={trailer.video}
            tone="dark"
            radius="0"
            autoPlay
            decoration
          />
        )}
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
