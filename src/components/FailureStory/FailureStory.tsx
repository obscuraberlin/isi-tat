import { failure } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./FailureStory.module.css";

export function FailureStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <SectionHead
              eyebrow={failure.eyebrow}
              lines={failure.headline}
              tone="dark"
            />

            <Reveal delay={120}>
              <div className={styles.body}>
                {failure.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160} className={styles.closing}>
              {failure.closing.map((line) => (
                <span key={line} className={styles.closingLine}>
                  {line}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal delay={100} className={styles.visual}>
            <Media asset={failure.image} tone="dark" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
