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
 * Der Goldlauf auf dem Telefon.
 *
 * Die Zeilen stehen von Anfang an da, faerben sich beim Scrollen aber
 * eine nach der anderen golden — und bleiben es. Das gibt dem Block
 * einen Verlauf, ohne dass etwas springt oder nachgeladen wird.
 *
 * Gerechnet wird aus der Position des Blocks im Bild: sobald seine
 * Oberkante ueber zwei Drittel der Bildschirmhoehe steigt, faengt es an;
 * wenn seine Unterkante dort ankommt, sind alle golden.
 */
function useGoldlauf<T extends HTMLElement>(
  anzahl: number,
  /** Ab welcher Bildschirmhoehe es losgeht — kleiner = spaeter. */
  beginn = 0.88,
  /** Wie viel Bildschirmhoehe der Lauf zusaetzlich braucht. */
  strecke = 0.62,
) {
  const ref = useRef<T>(null);
  const [gold, setGold] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Wer Bewegung reduziert haben will, bekommt sie alle sofort — der
       Effekt ist Schmuck, der Text ist der Inhalt. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGold(anzahl);
      return;
    }

    let frame = 0;
    const lesen = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      /* Grosszuegiger Weg: die Faerbung soll ueber mehrere hundert Pixel
         laufen, nicht in zwei Wischern durch sein. */
      const start = window.innerHeight * beginn;
      const weg = r.height + window.innerHeight * strecke;
      const p = weg <= 0 ? 0 : (start - r.top) / weg;
      setGold(Math.max(0, Math.min(anzahl, Math.ceil(p * anzahl))));
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
  }, [anzahl, beginn, strecke]);

  return { ref, gold };
}

/** Die Schlagworte, eines nach dem anderen. */
function Schlagworte({ words }: { words: readonly string[] }) {
  const { ref, gold } = useGoldlauf<HTMLParagraphElement>(words.length);

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

/** Dieselbe Bewegung an der Ueberschrift der ersten Szene, Zeile fuer Zeile. */
function Zeilen({ lines }: { lines: readonly string[] }) {
  /* Spaeter und langsamer als bei den Schlagworten: zwei Zeilen waeren
     sonst golden, bevor man sie gelesen hat. So faellt die erste Zeile
     etwa in der Bildmitte um, die zweite kurz bevor der Block oben
     hinausgeht. */
  const { ref, gold } = useGoldlauf<HTMLHeadingElement>(lines.length, 0.7, 0.95);

  return (
    <h2 ref={ref} className={styles.headline}>
      {lines.map((line, i) => (
        <span
          key={line}
          className={[styles.line, i < gold ? styles.lineGold : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {line}
        </span>
      ))}
    </h2>
  );
}

/**
 * Text einer Szene.
 *
 * Steht auf Modulebene, nicht in `Intro`: eine im Rendern definierte
 * Komponente ist bei jedem Durchlauf ein neuer Typ — React haengt sie
 * dann ab und neu an, und der Goldlauf darin finge jedes Mal wieder bei
 * null an.
 */
function Copy({
  scene,
  isMobile,
  shown,
}: {
  scene: (typeof SCENES)[number];
  isMobile: boolean;
  shown: number;
}) {
  return (
    <>
      {scene.lines.length === 0 ? null : isMobile ? (
        <Zeilen lines={scene.lines} />
      ) : (
        <h2 className={styles.headline}>
          {scene.lines.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h2>
      )}

      {scene.words.length === 0 ? null : isMobile ? (
        <Schlagworte words={scene.words} />
      ) : (
        <p className={styles.words}>
          {scene.words.map((word, wordIndex) => (
            <span
              key={word}
              className={[styles.word, wordIndex < shown ? styles.wordOn : ""]
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
                <Copy scene={scene} isMobile shown={scene.words.length} />
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
              <Copy
                scene={scene}
                isMobile={false}
                shown={wordCount(index)}
              />
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
