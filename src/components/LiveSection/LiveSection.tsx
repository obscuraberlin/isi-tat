"use client";

import { isPending, live } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { PlayButton } from "@/components/ui/PlayButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./LiveSection.module.css";

/**
 * Der Live-Teil ist das, was den Club vom Videoarchiv unterscheidet —
 * deshalb steht er in einer eigenen Sektion und nicht als Zeile in einer Liste.
 */
export function LiveSection() {
  const { openVideo } = useTrailer();

  return (
    <section className={styles.section} id="live">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <SectionHead eyebrow={live.eyebrow} lines={live.headline} />

            <Reveal delay={120}>
              <div className={styles.body}>
                {live.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className={styles.visual}>
            <Media asset={live.visual} tone="dark" />
            <span className={styles.badge}>
              <span className={styles.dot} aria-hidden="true" />
              {isPending(live.frequency)
                ? "Termine werden im Club angekündigt"
                : live.frequency}
            </span>
            <PlayButton
              onClick={() => openVideo(live.visual, live.eyebrow)}
              ariaLabel={`Video abspielen: ${live.visual.alt}`}
            />
          </Reveal>
        </div>

        <div className={styles.items}>
          {live.items.map((item, index) => (
            <Reveal key={item.label} className={styles.item} delay={index * 80}>
              <h3 className={styles.itemLabel}>{item.label}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
