"use client";

import type { CSSProperties } from "react";
import { network } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useInView } from "@/lib/hooks";
import styles from "./Network.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

/* Zwei Ringe statt einem — das nimmt der Grafik das Mindmap-Schema. */
const RING = [32, 44];

export function Network() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const delay = (index: number, base: number): CSSProperties =>
    ({ "--delay": inView ? `${base + index * 110}ms` : "0ms" }) as CSSProperties;

  return (
    <section className={styles.section} id="netzwerk">
      {/* Bewusst ohne Foto: von den vorhandenen Aufnahmen zeigt keine
          Menschen, und ein einzelner Mann vor einem Auto unter der Zeile
          "die richtigen Menschen" behauptet das Gegenteil. Der Abschnitt
          ist mit 35 Woertern ohnehin der kuerzeste der Seite. */}
      <Backdrop variant="grain" tone="dark" />

      <div className={styles.inner}>
        <div>
          <SectionHead
            eyebrow={network.eyebrow}
            lines={network.headline}
            accentLines={network.headlineAccent}
            tone="dark"
          />

          <Reveal delay={140}>
            <div className={styles.body}>
              {network.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className={styles.hints}>
              {network.hints.map((hint, index) => (
                <span
                  key={hint}
                  className={[styles.hint, inView ? styles.hintOn : ""]
                    .filter(Boolean)
                    .join(" ")}
                  style={delay(index, 700)}
                >
                  {hint}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Frueher ein Speichenrad mit Punkten und Beschriftungen — das
            sah aus wie eine Infografik in einer Praesentation. Jetzt
            laufen die Felder als sehr grosse Zeile langsam durch, wie
            ein Filmvorspann. Zwei Kopien fuer den lueckenlosen Lauf,
            die zweite fuer Vorlesegeraete unsichtbar. */}
        <div ref={ref} className={styles.band} aria-hidden="true">
          <div className={styles.bandLauf}>
            {[0, 1].map((kopie) => (
              <span key={kopie} className={styles.bandKopie}>
                {network.nodes.map((label) => (
                  <span key={label} className={styles.bandWort}>
                    {label}
                    <span className={styles.bandStrich}>—</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Derselbe Inhalt einmal als Liste, damit er vorgelesen und
            gefunden wird. */}
        <ul className={styles.bandListe}>
          {network.nodes.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>

      </div>
    </section>
  );
}
