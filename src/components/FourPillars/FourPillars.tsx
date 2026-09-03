"use client";

import { useEffect, useRef, useState } from "react";
import { pillars } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./FourPillars.module.css";

/**
 * Desktop: Text scrollt, Visual bleibt sticky und wechselt pro Schritt.
 * Mobile: normale Karten — keine Sticky-Komplexitaet.
 */
export function FourPillars() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLDivElement);
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = pillars.items[activeIndex] ?? pillars.items[0];

  return (
    <section className={styles.section} id="fuer-wen">
      <div className={styles.inner}>
        <SectionHead
          eyebrow={pillars.eyebrow}
          lines={pillars.headline}
          tone="dark"
        />

        {/* Desktop */}
        <div className={styles.scene}>
          <div className={styles.steps}>
            {pillars.items.map((item, index) => (
              <div
                key={item.id}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className={[
                  styles.step,
                  index === activeIndex ? styles.stepActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className={styles.stepBar} aria-hidden="true" />
                <p className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={styles.label}>{item.label}</h3>
                <p className={styles.text}>{item.text}</p>
                {"note" in item && item.note ? (
                  <p className={styles.note}>{item.note}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className={styles.visual}>
            <div className={styles.frame}>
              {/* Erstes Bild bestimmt die Hoehe, die weiteren liegen darueber. */}
              <Media asset={pillars.items[0].image} tone="dark" radius="0" />
              {pillars.items.map((item, index) => (
                <div
                  key={item.id}
                  className={[
                    styles.layer,
                    index === activeIndex ? styles.layerActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden={index !== activeIndex}
                >
                  <Media asset={item.image} tone="dark" radius="0" />
                </div>
              ))}
              <span className={styles.visualLabel}>{active.label}</span>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className={styles.cards}>
          {pillars.items.map((item, index) => (
            <Reveal key={item.id} className={styles.card} delay={index * 60}>
              <div className={styles.cardMedia}>
                <Media asset={item.image} tone="dark" radius="0" />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className={styles.label}>{item.label}</h3>
                <p className={styles.text}>{item.text}</p>
                {"note" in item && item.note ? (
                  <p className={styles.note}>{item.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
