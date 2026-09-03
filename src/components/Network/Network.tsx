"use client";

import type { CSSProperties } from "react";
import { network } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useInView } from "@/lib/hooks";
import styles from "./Network.module.css";

const RADIUS = 37; // Prozent der halben Kantenlaenge

/** Knotenpositionen auf einem Kreis, beginnend oben. */
const points = network.nodes.map((label, index) => {
  const angle = (index / network.nodes.length) * Math.PI * 2 - Math.PI / 2;
  return {
    label,
    x: 50 + Math.cos(angle) * RADIUS,
    y: 50 + Math.sin(angle) * RADIUS,
  };
});

export function Network() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const delay = (index: number, base: number): CSSProperties =>
    ({ "--delay": `${base + index * 80}ms` }) as CSSProperties;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <SectionHead
            eyebrow={network.eyebrow}
            lines={network.headline}
            tone="dark"
          />
          <Reveal delay={140}>
            <div className={styles.body}>
              {network.body.map((line) => (
                <p key={line}>{line}</p>
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
            {[22, 30, 37].map((r) => (
              <circle key={r} className={styles.ring} cx="50" cy="50" r={r} />
            ))}

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
                className={[styles.point, inView ? styles.pointOn : ""]
                  .filter(Boolean)
                  .join(" ")}
                cx={point.x}
                cy={point.y}
                r="0.9"
                style={delay(index, 320)}
              />
            ))}
          </svg>

          <span className={styles.center}>{network.center}</span>

          {points.map((point, index) => (
            <span
              key={point.label}
              className={[styles.node, inView ? styles.nodeOn : ""]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--x": `${point.x}%`,
                  "--y": `${point.y}%`,
                  ...delay(index, 380),
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
