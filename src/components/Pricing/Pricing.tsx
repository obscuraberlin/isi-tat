import { cta, pricing } from "@/data/landingPage";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Pricing.module.css";

export function Pricing() {
  /* Offene Konditionen werden als solche gezeigt, nicht erfunden. */
  const terms = [
    { key: "Laufzeit", value: pricing.term },
    { key: "Zahlung", value: pricing.payment },
  ].filter((entry) => entry.value !== "TODO_CONTENT");

  const open = [
    { key: "Laufzeit", value: pricing.term },
    { key: "Zahlung", value: pricing.payment },
  ].filter((entry) => entry.value === "TODO_CONTENT");

  return (
    <section className={styles.section} id="zugang">
      <div className={styles.inner}>
        <Reveal>
          <Eyebrow rule>{pricing.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal variant="mask" delay={60}>
          <h2 className={styles.headline}>{pricing.headline}</h2>
        </Reveal>

        <Reveal delay={100}>
          <p className={styles.subline}>{pricing.subline}</p>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.price}>{pricing.price}</p>
        </Reveal>

        {terms.length > 0 || open.length > 0 ? (
          <Reveal delay={180} className={styles.terms}>
            {terms.map((entry) => (
              <span key={entry.key} className={styles.term}>
                {entry.key}: {entry.value}
              </span>
            ))}
            {open.map((entry) => (
              <span key={entry.key} className={styles.term}>
                {entry.key}: [wird im Gespräch besprochen]
              </span>
            ))}
          </Reveal>
        ) : null}

        <Reveal delay={200} className={styles.facts}>
          {pricing.facts.map((fact) => (
            <span key={fact} className={styles.fact}>
              {fact}
            </span>
          ))}
        </Reveal>

        <Reveal delay={240} className={styles.cta}>
          <ButtonLink href={cta.primary.href} variant="primary" full>
            {cta.primary.label}
          </ButtonLink>
        </Reveal>

        <Reveal delay={280}>
          <p className={styles.note}>{pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
