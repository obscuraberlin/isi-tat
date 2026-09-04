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

const points = network.nodes.map((label, index) => {
  const angle = (index / network.nodes.length) * Math.PI * 2 - Math.PI / 2;
  const radius = RING[index % RING.length];
  return {
    label,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius * 0.9,
  };
});

export function Network() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const delay = (index: number, base: number): CSSProperties =>
    ({ "--delay": inView ? `${base + index * 110}ms` : "0ms" }) as CSSProperties;

  return (
    <section className={styles.section} id="netzwerk">
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

        <div ref={ref} className={styles.graph}>
          <svg
            className={styles.svg}
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
          >
            {points.map((point, index) => (
              <line
                key={`l-${point.label}`}
                className={[styles.spoke, inView ? styles.spokeOn : ""]
                  .filter(Boolean)
                  .join(" ")}
                x1="50"
                y1="50"
                x2={point.x}
                y2={point.y}
                style={delay(index, 120)}
              />
            ))}

            {points.map((point, index) => (
              <circle
                key={`p-${point.label}`}
                className={[
                  styles.node,
                  inView ? styles.nodeOn : "",
                  index === 0 ? styles.nodeAccent : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                cx={point.x}
                cy={point.y}
                r={index === 0 ? 0.85 : 0.55}
                style={delay(index, 320)}
              />
            ))}
          </svg>

          <span className={styles.center}>{network.center}</span>

          {points.map((point, index) => (
            <span
              key={point.label}
              className={[styles.label, inView ? styles.labelOn : ""]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--x": `${point.x}%`,
                  /* Etwas oberhalb des Punktes, damit die Linie frei bleibt. */
                  "--y": `${point.y - 4}%`,
                  ...delay(index, 420),
                } as CSSProperties
              }
            >
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
