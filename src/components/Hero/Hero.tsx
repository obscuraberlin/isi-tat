"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { brand, catalogue, cta, hero } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./Hero.module.css";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Eine Zeile der Headline.
 *
 * Sie steht in einem Rahmen mit overflow: hidden und faehrt von unten
 * herein — dieselbe Bewegung wie die Bilder in den Kapiteln. Ein Fade
 * waere weicher, aber austauschbar; ein Reveal hat eine Kante.
 */
function Line({
  children,
  delayMs,
  accent,
}: {
  children: string;
  delayMs: number;
  accent?: boolean;
}) {
  return (
    <span className={styles.lineWrap}>
      <span
        className={[styles.line, accent ? styles.lineAccent : ""]
          .filter(Boolean)
          .join(" ")}
        style={delay(delayMs)}
      >
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const { openTrailer } = useTrailer();
  const ref = useRef<HTMLElement>(null);

  /* Hero-Video bevorzugt, Bild als Fallback solange kein Video hinterlegt ist. */
  const asset = hero.video.src ? hero.video : hero.image;
  const headline = hero.headlines[hero.headlineVariant];

  /* Der Uebergang beim Scrollen. Alles laeuft ueber eine einzige Zahl von
     0 bis 1, die als CSS-Variable am Abschnitt haengt — Hintergrund
     skaliert sehr wenig, das Dunkel nimmt zu, die Schrift wandert ein
     Stueck nach oben. Bewegung insgesamt unter 50 px: es soll teuer
     wirken, nicht technisch. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const lesen = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      el.style.setProperty("--p", p.toFixed(4));
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
  }, []);

  return (
    <section ref={ref} className={styles.hero} id="top" aria-label="Einstieg">
      {/* Das Bewegtbild traegt die ganze Flaeche, statt in einem Rahmen
          daneben zu stehen. Stumm, in Schleife, ohne Schnitte. */}
      <div className={styles.buehne} aria-hidden="true">
        <Media asset={asset} tone="dark" radius="0" priority autoPlay={!!asset.src} />
      </div>
      <span className={styles.scrim} aria-hidden="true" />
      <Backdrop variant="grain" tone="dark" />

      <div className={styles.inner}>
        <div className={styles.marken} style={delay(200)}>
          <span className={styles.marke}>
            {brand.name} <span aria-hidden="true">/</span> {brand.suffix}
          </span>
          <span className={styles.markeAkzent}>{hero.eyebrow}</span>
        </div>

        <h1 className={styles.headline}>
          {headline.lines.map((line, index) => (
            <Line key={line} delayMs={420 + index * 110}>
              {line}
            </Line>
          ))}
          {headline.accent.length ? (
            <span className={styles.accentBlock}>
              {headline.accent.map((line, index) => (
                <Line
                  key={line}
                  delayMs={420 + (headline.lines.length + index) * 110}
                  accent
                >
                  {line}
                </Line>
              ))}
            </span>
          ) : null}
        </h1>

        <p className={`${styles.sub} ${styles.fadeUp}`} style={delay(880)}>
          {hero.subheadline}
        </p>

        {/* Vier Marken statt eines Satzes. Die Zahlen kommen aus den
            Daten — 5 Themenwelten, und die Videozahl ist ihre Summe. */}
        <ul className={`${styles.meta} ${styles.fadeUp}`} style={delay(980)}>
          <li className={styles.metaItem}>{catalogue.videoCount} VIDEOS</li>
          <li className={styles.metaItem}>
            {catalogue.seriesCount} THEMENWELTEN
          </li>
          {hero.metaListe.slice(2).map((item) => (
            <li key={item} className={styles.metaItem}>
              {item}
            </li>
          ))}
        </ul>

        <div className={`${styles.ctas} ${styles.fadeUp}`} style={delay(1080)}>
          <ButtonLink href={cta.primary.href} variant="primaryOnDark">
            {cta.primary.label}
          </ButtonLink>
          <Button variant="ghostOnDark" withPlayIcon onClick={openTrailer}>
            {cta.secondary.label}
          </Button>
        </div>
      </div>

      <span className={`${styles.scroll} ${styles.fadeUp}`} style={delay(1400)}>
        {hero.scroll}
      </span>
    </section>
  );
}
