import { failure } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { WrapHead } from "@/components/ui/WrapHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./FailureStory.module.css";

/**
 * "WAS BEI MIR" steht oben, das Bild darunter, "SCHIEFGELAUFEN IST."
 * eingerueckt darunter — die zweite Haelfte faengt das Bild auf, statt
 * linksbuendig neu anzusetzen.
 */
export function FailureStory() {
  const [first, ...rest] = failure.headline;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <WrapHead
          eyebrow={failure.eyebrow}
          above={[first]}
          below={rest}
          variant="offset"
          tone="dark"
        >
          <span className={styles.visual}>
            <Media asset={failure.image} tone="dark" />
          </span>
        </WrapHead>

        <div className={styles.after}>
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
      </div>
    </section>
  );
}
