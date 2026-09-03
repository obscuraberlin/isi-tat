import { application, cta } from "@/data/landingPage";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./ApplicationSteps.module.css";

export function ApplicationSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHead
          eyebrow={application.eyebrow}
          lines={application.headline}
        />

        <ol className={styles.steps}>
          {application.steps.map((item, index) => (
            <Reveal
              as="li"
              key={item.step}
              className={styles.step}
              delay={index * 90}
            >
              <p className={styles.num}>{item.step}</p>
              <h3 className={styles.label}>{item.label}</h3>
              <p className={styles.text}>{item.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className={styles.cta}>
          <ButtonLink href={cta.primary.href} variant="primary">
            {cta.primary.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
