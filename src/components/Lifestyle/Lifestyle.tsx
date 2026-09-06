"use client";

import { useEffect, useRef, useState } from "react";
import { lifestyle } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import styles from "./Lifestyle.module.css";

/**
 * Die Luxus-Sektion als Sticky-Strecke.
 *
 * Das Bild bleibt stehen, waehrend die Aussage darueber wechselt. Kein
 * Karussell, keine Pfeile, keine Slides — die Bilder blenden ineinander,
 * die Zeile wechselt synchron. Drei Stationen, am Ende die Aufloesung.
 *
 * Auf dem Telefon faellt die Sticky-Mechanik weg: dort stehen die drei
 * Aufnahmen untereinander. Eine Strecke ueber zwei Bildschirmhoehen, die
 * man mit dem Daumen durchscrollt, ist kein Erlebnis, sondern Arbeit.
 */
export function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null);
  const [stufe, setStufe] = useState(0);
  const stationen = lifestyle.stationen;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const lesen = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const weg = r.height - window.innerHeight;
      if (weg <= 0) return;
      const p = Math.min(0.999, Math.max(0, -r.top / weg));
      setStufe(Math.floor(p * stationen.length));
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
  }, [stationen.length]);

  return (
    <section className={styles.section} aria-label={lifestyle.eyebrow}>
      <div ref={ref} className={styles.strecke}>
        <div className={styles.buehne}>
          {/* Alle drei Bilder liegen uebereinander und blenden ineinander.
              Kein Nachladen beim Wechsel, kein Aufblitzen. */}
          {lifestyle.gallery.map((asset, i) => (
            <div
              key={asset.id}
              className={[styles.bild, i === stufe ? styles.bildAn : ""]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={i !== stufe}
            >
              <Media asset={asset} tone="dark" radius="0" />
            </div>
          ))}

          <span className={styles.scrim} aria-hidden="true" />

          <div className={styles.copy}>
            <Eyebrow tone="accent" rule>
              {lifestyle.eyebrow}
            </Eyebrow>

            <div className={styles.zeilen}>
              {stationen.map((station, i) => (
                <p
                  key={station.zeile.join(" ")}
                  className={[
                    styles.zeile,
                    i === stufe ? styles.zeileAn : "",
                    station.akzent ? styles.zeileAkzent : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden={i !== stufe}
                >
                  {station.zeile.map((z) => (
                    <span key={z}>{z}</span>
                  ))}
                </p>
              ))}
            </div>

            <p className={styles.schluss}>
              {lifestyle.schluss.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
          </div>

          <p className={styles.disclaimer}>{lifestyle.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
