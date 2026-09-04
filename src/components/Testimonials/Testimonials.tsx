"use client";

import { isPending, testimonials } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { PlayButton } from "@/components/ui/PlayButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const { openVideo } = useTrailer();

  return (
    <section className={styles.section} id="erfahrungen">
      <div className={styles.inner}>
        <SectionHead
          eyebrow={testimonials.eyebrow}
          lines={testimonials.headline}
        />

        <div className={styles.grid}>
          {testimonials.items.map((item, index) => (
            <Reveal key={item.video.id} className={styles.card} delay={index * 90}>
              <div className={styles.visual}>
                <Media asset={item.video} tone="dark" />
                <PlayButton
                  onClick={() => openVideo(item.video, "Erfahrungsbericht")}
                  ariaLabel={`Video abspielen: ${item.video.alt}`}
                />
              </div>
              <div className={styles.meta}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.role}>{item.role}</p>
                <p
                  className={[
                    styles.statement,
                    isPending(item.statement) ? styles.statementPending : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isPending(item.statement)
                    ? "Statement folgt."
                    : item.statement}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.note}>{testimonials.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
