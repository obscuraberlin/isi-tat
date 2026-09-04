import { opportunity } from "@/data/landingPage";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./OpportunityMoment.module.css";

export function OpportunityMoment() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal variant="mask">
          <p className={`${styles.block} ${styles.muted}`}>
            {opportunity.first.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal variant="mask" className={styles.second}>
          <p className={styles.block}>
            {opportunity.second.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
            <span className={styles.accent}>{opportunity.accent}</span>
          </p>
        </Reveal>

        <Reveal delay={140} className={styles.closing}>
          {opportunity.closing.map((line, index) => (
            <span
              key={line}
              className={[
                styles.closingLine,
                index === opportunity.closing.length - 1 ? styles.accent : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {line}
            </span>
          ))}
        </Reveal>

        <Reveal delay={180}>
          <p className={styles.note}>{opportunity.note}</p>
          <p className={styles.disclaimer}>{opportunity.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
