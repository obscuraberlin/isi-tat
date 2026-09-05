"use client";

import { useEffect, useRef, useState } from "react";
import { intro } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { useMediaQuery } from "@/lib/hooks";
import styles from "./Intro.module.css";

const SCENES = intro.scenes;

/**
 * Sticky-Intro zwischen Hero und Trust-Section.
 * Der Text wechselt beim Scrollen, das Visual bleibt stehen. Kein
 * Scroll-Hijacking: der Nutzer scrollt normal, nur der Inhalt haelt an.
 * Mobil sind es zwei normale Bloecke — kein Sticky, keine Parallax.
 */
/**
 * Die Schlagworte auf dem Telefon.
 *
 * Sie stehen von Anfang an da, aber sie faerben sich beim Scrollen eines
 * nach dem anderen golden — und bleiben es. Das gibt dem Block einen
 * Verlauf, ohne dass etwas springt oder nachgeladen wird.
 *
 * Gerechnet wird aus der Position des Blocks im Bild: sobald seine
 * Oberkante ueber zwei Drittel der Bildschirmhoehe steigt, faengt es an;
 * wenn seine Unterkante dort ankommt, sind alle golden.
 */
function Schlagworte({ words }: { words: readonly string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [gold, setGold] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Wer Bewegung reduziert haben will, bekommt sie alle sofort — der
       Effekt ist Schmuck, die Woerter sind der Inhalt. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGold(words.length);
      return;
    }

    let frame = 0;
    const lesen = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      /* Grosszuegiger Weg: die Faerbung soll ueber mehrere hundert Pixel
         laufen, nicht in zwei Wischern durch sein. */
      const start = window.innerHeight * 0.88;
      const weg = r.height + window.innerHeight * 0.62;
      const p = weg <= 0 ? 0 : (start - r.top) / weg;
      setGold(
        Math.max(0, Math.min(words.length, Math.ceil(p * words.length))),
      );
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(lesen);
    };

    lesen();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={styles.words}>
      {words.map((word, i) => (
        <span
          key={word}
          className={[styles.word, styles.wordOn, i < gold ? styles.wordGold : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile) return;
    let frame = 0;

    const read = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      /* 0 sobald die Sektion oben steht, 1 wenn ihr Ende erreicht ist. */
      const travel = rect.height - window.innerHeight;
      setProgress(
        travel <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / travel)),
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
  }, [isMobile]);

  /* Erste Haelfte Szene eins, zweite Haelfte Szene zwei. */
  const activeIndex = Math.min(
    SCENES.length - 1,
    Math.floor(progress * SCENES.length),
  );
  const sceneProgress = progress * SCENES.length - activeIndex;

  const wordCount = (index: number) =>
    index < activeIndex
      ? SCENES[index].words.length
      : index > activeIndex
        ? 0
        : /* Wörter erscheinen über die Szene verteilt, das letzte kurz vor Ende. */
          Math.round(sceneProgress * (SCENES[index].words.length + 0.6));

  const Copy = ({ index }: { index: number }) => {
    const scene = SCENES[index];
    const shown = isMobile ? scene.words.length : wordCount(index);

    return (
      <>
        {scene.lines.length > 0 ? (
          <h2 className={styles.headline}>
            {scene.lines.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </h2>
        ) : null}

        {scene.words.length === 0 ? null : isMobile ? (
          <Schlagworte words={scene.words} />
        ) : (
          <p className={styles.words}>
            {scene.words.map((word, wordIndex) => (
              <span
                key={word}
                className={[
                  styles.word,
                  wordIndex < shown ? styles.wordOn : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {word}
              </span>
            ))}
          </p>
        )}
      </>
    );
  };

  /* ---------- Mobile: zwei einfache Bloecke ---------- */
  if (isMobile) {
    return (
      <section ref={sectionRef} className={styles.section} aria-label="Intro">
        <div className={styles.stage}>
          {SCENES.map((scene, index) => (
            <div key={scene.id} className={styles.mobileScene}>
              <div className={styles.layer + " " + styles.layerActive}>
                <Media asset={scene.visual} tone="dark" radius="0" />
              </div>
              <span className={styles.scrim} aria-hidden="true" />
              <div className={styles.copy}>
                <Copy index={index} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---------- Desktop: Sticky-Buehne ---------- */
  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ height: `${SCENES.length * 90}vh` }}
      aria-label="Intro"
    >
      <div className={styles.stage}>
        {SCENES.map((scene, index) => (
          <div
            key={scene.id}
            className={[
              styles.layer,
              index === activeIndex ? styles.layerActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={index !== activeIndex}
          >
            <Media asset={scene.visual} tone="dark" radius="0" />
          </div>
        ))}

        <span className={styles.scrim} aria-hidden="true" />

        <div className={styles.copy}>
          {SCENES.map((scene, index) => (
            <div
              key={scene.id}
              className={[
                styles.scene,
                index === activeIndex ? styles.sceneActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={index !== activeIndex}
            >
              <Copy index={index} />
            </div>
          ))}
        </div>

        <div className={styles.progress} aria-hidden="true">
          {SCENES.map((scene, index) => (
            <span
              key={scene.id}
              className={[styles.dot, index <= activeIndex ? styles.dotOn : ""]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
