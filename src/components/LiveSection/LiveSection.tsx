"use client";

import { isPending, live } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { PlayButton } from "@/components/ui/PlayButton";
import { WrapHead } from "@/components/ui/WrapHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./LiveSection.module.css";

/**
 * Der Live-Teil ist das, was den Club vom Videoarchiv unterscheidet —
 * deshalb steht er in einer eigenen Sektion und nicht als Zeile in einer Liste.
 *
 * Die Frage steht ueber dem Video, die Aufloesung darunter. Man liest das
 * Bild mit, statt es daneben zu sehen.
 */
export function LiveSection() {
  const { openVideo } = useTrailer();
  const [first, ...rest] = live.headline;

  return (
    <section className={styles.section} id="live">
      <div className={styles.inner}>
        <WrapHead
          eyebrow={live.eyebrow}
          above={[first]}
          below={rest}
          variant="center"
        >
          <span className={styles.visual}>
            <Media asset={live.visual} tone="dark" ratio="16 / 9" />
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
          </span>
        </WrapHead>

        <Reveal delay={120}>
          <div className={styles.body}>
            {live.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

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
