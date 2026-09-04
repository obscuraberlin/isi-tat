"use client";

import { failure } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { WrapHead } from "@/components/ui/WrapHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./FailureStory.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

/**
 * "WAS BEI MIR" steht oben, die Gegenueberstellung ueber die volle Breite
 * darunter, "SCHIEFGELAUFEN IST." darunter.
 *
 * Nicht die eingerueckte Figur: die schiebt den zweiten Teil der Headline
 * ins Bild hinein: bei einem schmalen Hochformat rechts geht das auf, bei
 * zwei Bildern nebeneinander laeuft die Schrift darueber.
 *
 * Zwei Bilder statt einem: der Abstand zwischen frueher und heute ist das
 * Argument. Die Beschriftungen erzaehlen ueber Wissen und Zeit, nicht ueber
 * Besitz — sonst kippt die Gegenueberstellung ins Angeberische.
 */
export function FailureStory() {
  const [first, ...rest] = failure.headline;
  const c = failure.compare;

  return (
    <section className={styles.section}>
      <Backdrop variant="horizon" tone="dark" drift={50} />

      <div className={styles.inner}>
        <WrapHead
          eyebrow={failure.eyebrow}
          above={[first]}
          below={rest}
          variant="band"
          tone="dark"
        >
          <span className={styles.compare}>
            {[
              { label: c.beforeLabel, caption: c.beforeCaption, asset: c.before },
              { label: c.afterLabel, caption: c.afterCaption, asset: c.after },
            ].map((side) => (
              <span key={side.label} className={styles.side}>
                <span className={styles.visual}>
                  <Media asset={side.asset} tone="dark" />
                </span>
                <span className={styles.sideLabel}>{side.label}</span>
                <span className={styles.sideCaption}>{side.caption}</span>
              </span>
            ))}
          </span>
        </WrapHead>

        <div className={styles.after}>
          <Reveal delay={120}>
            <div className={styles.body}>
              {failure.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160} className={styles.closing}>
            {failure.closing.map((line) => (
              <span key={line} className={styles.closingLine}>
                {line}
              </span>
            ))}
          </Reveal>

          <Reveal delay={200}>
            <p className={styles.pass}>{failure.pass}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
