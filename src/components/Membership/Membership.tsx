import { membership } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Membership.module.css";

export function Membership() {
  return (
    <section className={styles.section} id="membership">
      <div className={styles.inner}>
        <SectionHead
          eyebrow={membership.eyebrow}
          lines={membership.headline}
          tone="dark"
        />

        <div className={styles.rows}>
          {membership.rows.map((row, index) => (
            <Reveal
              key={row.label}
              className={styles.row}
              delay={index * 50}
              shift={14}
            >
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.label}>{row.label}</h3>
              <p className={styles.text}>{row.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
