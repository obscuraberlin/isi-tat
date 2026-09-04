import { application, cta, isPending, membership, pricing } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Access.module.css";

/**
 * Ein Block für die gesamte Kaufentscheidung: Leistungen, Preis, Aufnahme.
 * Vorher drei getrennte Sektionen — das hat den Abschluss zerfasert.
 */
export function Access() {
  /* Offene Konditionen werden als offen gezeigt, nicht erfunden. */
  const chips = [
    { key: "Laufzeit", value: pricing.term },
    { key: "Zahlung", value: pricing.payment },
  ].map((entry) => ({
    ...entry,
    value:
      entry.value === "TODO_CONTENT"
        ? "wird im Gespräch besprochen"
        : entry.value,
  }));

  return (
    <section className={styles.section} id="zugang">
      <div className={styles.inner}>
        <SectionHead
          eyebrow={membership.eyebrow}
          lines={membership.headline}
          accentLines={membership.headlineAccent}
          subline="Was drin ist, was es kostet, wie du reinkommst."
        />

        <Reveal className={styles.preview}>
          <Media asset={membership.preview} tone="dark" />
          <p className={styles.previewCaption}>{membership.previewCaption}</p>
        </Reveal>

        <div className={styles.rows}>
          {membership.rows.map((row, index) => (
            <Reveal
              key={row.label}
              className={styles.row}
              delay={index * 40}
              shift={12}
            >
              <h3 className={styles.rowLabel}>{row.label}</h3>
              {isPending(row.text) ? (
                <p className={styles.pending}>Umfang wird ergänzt.</p>
              ) : (
                <p className={styles.rowText}>{row.text}</p>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.price}>
          <div>
            <p className={styles.priceLabel}>{pricing.eyebrow}</p>
            <p className={styles.priceValue}>{pricing.price}</p>
            <div className={styles.priceMeta}>
              {chips.map((chip) => (
                <span key={chip.key} className={styles.chip}>
                  {chip.key}: {chip.value}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className={styles.facts}>
              {pricing.facts.map((fact) => (
                <span key={fact} className={styles.fact}>
                  {fact}
                </span>
              ))}
            </div>

            <ButtonLink
              href={cta.primary.href}
              variant="primaryOnDark"
              full
              className={styles.priceCta}
            >
              {cta.primary.label}
            </ButtonLink>

            <p className={styles.priceNote}>{pricing.note}</p>
          </div>
        </Reveal>

        <div>
          <p className={styles.stepsHead}>{application.headline.join(" ")}</p>
          <ol className={styles.steps}>
            {application.steps.map((item, index) => (
              <Reveal
                as="li"
                key={item.step}
                className={styles.step}
                delay={index * 80}
              >
                <p className={styles.stepNum}>{item.step}</p>
                <h3 className={styles.stepLabel}>{item.label}</h3>
                <p className={styles.stepText}>{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
