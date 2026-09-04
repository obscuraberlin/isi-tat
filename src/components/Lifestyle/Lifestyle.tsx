"use client";

import { lifestyle } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { WrapHead } from "@/components/ui/WrapHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Lifestyle.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

/**
 * Die Galerie liegt zwischen Aussage und Gegenaussage: oben steht, was
 * Luxus nicht ist, unten in Champagne, was er ist. Die Bilder dazwischen
 * sind das Argument — nicht Dekoration daneben.
 */
export function Lifestyle() {
  return (
    <section className={styles.section}>
      <Backdrop variant="beam" tone="light" drift={30} />

      <div className={styles.inner}>
        <WrapHead
          eyebrow={lifestyle.eyebrow}
          above={lifestyle.headline}
          below={lifestyle.headlineAccent}
          belowAccent
          variant="band"
        >
          <span className={styles.gallery}>
            {lifestyle.gallery.map((asset) => (
              <span key={asset.id} className={styles.tile}>
                <Media asset={asset} />
              </span>
            ))}
          </span>
        </WrapHead>

        <Reveal delay={140}>
          <div className={styles.body}>
            {lifestyle.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className={styles.disclaimer}>{lifestyle.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
