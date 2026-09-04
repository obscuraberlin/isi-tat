"use client";

import { application, cta, isPending, membership, spots } from "@/data/landingPage";
import { DeviceCluster } from "@/components/DeviceCluster/DeviceCluster";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Access.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

/**
 * Ein Block für die gesamte Kaufentscheidung: Leistungen, Preis, Aufnahme.
 * Vorher drei getrennte Sektionen — das hat den Abschluss zerfasert.
 */
export function Access() {
  /* Die Platzzahl wird nicht geraten. Solange sie nicht bestaetigt ist,
     steht hier eine offene Angabe statt einer erfundenen Knappheit. */
  const offen = isPending(spots.count);

  return (
    <section className={styles.section} id="zugang">
      <Backdrop variant="glow" tone="light" drift={50} />

      <div className={styles.inner}>
        <SectionHead
          eyebrow={membership.eyebrow}
          lines={membership.headline}
          accentLines={membership.headlineAccent}
          subline="Was drin ist, wie viele Plätze es gibt, wie du reinkommst."
        />

        <Reveal className={styles.preview}>
          <DeviceCluster />
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
            <p className={styles.priceLabel}>{spots.eyebrow}</p>
            {offen ? (
              <p className={styles.spotsPending}>
                Die Zahl der freien Plätze steht hier, sobald sie feststeht.
              </p>
            ) : (
              <>
                <p className={styles.priceValue}>{spots.count}</p>
                {isPending(spots.period) ? null : (
                  <p className={styles.spotsPeriod}>{spots.period}</p>
                )}
              </>
            )}
          </div>

          <div>
            <div className={styles.facts}>
              {spots.facts.map((fact) => (
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

            <p className={styles.priceNote}>{spots.priceNote}</p>
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
