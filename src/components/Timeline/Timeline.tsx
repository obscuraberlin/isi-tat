"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { timeline } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Timeline.module.css";

/**
 * Der Champagne-Punkt wandert beim Scrollen über die Linie.
 * Bewusst ruhig — kein Pinning, kein Scroll-Hijacking.
 */
export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const span = rect.height + window.innerHeight * 0.35;
      const value = (start - rect.top) / span;
      setProgress(Math.min(1, Math.max(0, value)));
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
  }, []);

  const total = timeline.entries.length;

  return (
    <section className={styles.section} id="erfahrung">
      <div className={styles.inner}>
        <SectionHead
          eyebrow={timeline.eyebrow}
          lines={timeline.headline}
        />

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
                delay={index * 70}
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
                <p className={styles.title}>{entry.title}</p>
                <p className={styles.text}>{entry.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
