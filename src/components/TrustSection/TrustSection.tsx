"use client";

import { trust } from "@/data/landingPage";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import { Media } from "@/components/Media/Media";
import { PlayButton } from "@/components/ui/PlayButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./TrustSection.module.css";

export function TrustSection() {
  const { openVideo } = useTrailer();

  return (
    <section className={styles.section} id="ueber-isi">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <Reveal>
              <Eyebrow rule>Über ISI</Eyebrow>
            </Reveal>

            <Reveal variant="mask" delay={80}>
              <h2 className={styles.headline}>
                <span className={styles.headlineAccentLine}>
                  {trust.headline[0]}
                </span>
                <span className={styles.headlineAccentLine}>
                  {trust.headline[1]}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className={styles.body}>
                {trust.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className={styles.visual}>
            <Media asset={trust.video} tone="dark" />
            <PlayButton
              onClick={() => openVideo(trust.video, "Über ISI")}
              ariaLabel={`Video abspielen: ${trust.video.alt}`}
              caption="Ansehen"
            />
          </Reveal>
        </div>

        <Reveal>
          <dl className={styles.metrics}>
            {trust.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <dt className={styles.metricLabel}>{metric.label}</dt>
                <dd className={styles.metricValue}>{metric.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.metricNote}>
            Zahlen werden erst veröffentlicht, wenn sie bestätigt sind.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
