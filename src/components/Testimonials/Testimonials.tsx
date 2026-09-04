"use client";

import { isPending, testimonials } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { PlayButton } from "@/components/ui/PlayButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import { useTrailer } from "@/components/TrailerModal/TrailerContext";
import styles from "./Testimonials.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

export function Testimonials() {
  const { openVideo } = useTrailer();

  /* Solange keine echte Stimme vorliegt, faellt die Sektion ganz weg.
     Ein Raster aus leeren Kacheln unter der Ueberschrift "Menschen, die da
     sind, wo du hin willst" arbeitet gegen die Seite — und ISIs eigenes
     Material hier einzusetzen waere eine erfundene Kundenstimme.
     Sobald ein Video oder ein freigegebenes Zitat vorliegt, erscheint die
     Sektion von selbst wieder. */
  const hatStimmen = testimonials.items.some(
    (item) => item.video.src || !isPending(item.statement),
  );
  if (!hatStimmen) return null;

  return (
    <section className={styles.section} id="erfahrungen">
      <Backdrop variant="grid" tone="light" drift={30} />

      <div className={styles.inner}>
        <SectionHead
          eyebrow={testimonials.eyebrow}
          lines={testimonials.headline}
          accentLines={testimonials.headlineAccent}
          subline={testimonials.subline}
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
                <p className={styles.role}>
                  {item.role}
                  {isPending(item.since) ? null : ` · seit ${item.since}`}
                </p>
                {/* Wo die Person heute steht — der Satz, der den Sog macht.
                    Fehlt er, bleibt die Stelle als Luecke markiert. */}
                <p
                  className={[
                    styles.standing,
                    isPending(item.standing) ? styles.standingPending : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isPending(item.standing)
                    ? "Wo diese Person heute steht, kommt hier hin."
                    : item.standing}
                </p>
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
          <p className={styles.disclaimer}>{testimonials.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
