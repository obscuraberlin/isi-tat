"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { isPending, timeline, trust } from "@/data/landingPage";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import { Media } from "@/components/Media/Media";
import { PlayButton } from "@/components/ui/PlayButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./TrustSection.module.css";

/** Scrollfortschritt über der Timeline-Linie, 0–1. */
function useTrackProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height + window.innerHeight * 0.35;
      setProgress(
        Math.min(1, Math.max(0, (window.innerHeight * 0.85 - rect.top) / span)),
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

/**
 * Über ISI: Ruf, Zahlen und der Weg dorthin in einem Block.
 * Vorher zwei getrennte Sektionen, die dieselbe Geschichte erzählt haben.
 */
export function TrustSection() {
  const { openVideo } = useTrailer();
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useTrackProgress(trackRef);
  const total = timeline.entries.length;

  return (
    <section className={styles.section} id="ueber-isi">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <Reveal>
              <Eyebrow rule>{trust.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal variant="mask" delay={60}>
              <h2 className={styles.headline}>
                {trust.headline.map((line) => (
                  <span key={line} className={styles.headlineLine}>
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className={styles.body}>
                {trust.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {isPending(trust.bio) ? (
                <p className={styles.bioPending}>
                  Ausführliche Biografie folgt.
                </p>
              ) : (
                <p className={styles.bio}>{trust.bio}</p>
              )}

              <p className={styles.claim}>{trust.claim}</p>
            </Reveal>
          </div>

          <Reveal delay={100} className={styles.visual}>
            <Media asset={trust.video} tone="dark" />
            <PlayButton
              onClick={() => openVideo(trust.video, trust.eyebrow)}
              ariaLabel={`Video abspielen: ${trust.video.alt}`}
            />
          </Reveal>

          <Reveal delay={140} className={styles.person}>
            <p className={styles.personName}>{trust.person.name}</p>
            <p className={styles.personRole}>{trust.person.role}</p>
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
        </Reveal>

        <div className={styles.timeline} id="erfahrung">
          <Reveal>
            <p className={styles.timelineHead}>{timeline.headline.join(" ")}</p>
          </Reveal>

          <div
            ref={trackRef}
            className={styles.track}
            style={{ ["--p"]: progress } as CSSProperties}
          >
            <span className={styles.line} aria-hidden="true" />
            <span className={styles.progress} aria-hidden="true" />

            <ol className={styles.entries}>
              {timeline.entries.map((entry, index) => (
                <Reveal
                  as="li"
                  key={entry.year}
                  className={styles.entry}
                  delay={index * 60}
                  shift={14}
                >
                  <span
                    className={[
                      styles.dot,
                      progress >= (index + 0.5) / total ? styles.dotActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden="true"
                  />
                  <p className={styles.year}>{entry.year}</p>
                  <p className={styles.entryTitle}>{entry.title}</p>
                  <p className={styles.entryText}>{entry.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
