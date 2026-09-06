"use client";

import { application, cta, membership, spots } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
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

        {/* Banner statt Bild: links steht, was der Bereich ist, rechts
            laeuft das Mockup aus dem Rahmen. Ein hingelegter Screenshot
            erklaert sich nicht von selbst. */}
        <Reveal className={styles.preview}>
          <div className={styles.previewText}>
            <p className={styles.previewEyebrow}>{membership.preview.eyebrow}</p>
            <h3 className={styles.previewHead}>
              {membership.preview.headline.map((line) => (
                <span key={line} className={styles.previewHeadLine}>
                  {line}
                </span>
              ))}
            </h3>
            <ul className={styles.previewList}>
              {membership.preview.lines.map((line) => (
                <li key={line} className={styles.previewItem}>
                  {line}
                </li>
              ))}
            </ul>
            <p className={styles.previewNote}>{membership.preview.note}</p>
          </div>

          <div className={styles.previewVisual}>
            <Media asset={membership.mockup} radius="0" />
          </div>
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
              <p className={styles.rowText}>{row.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className={styles.rowsNote}>{membership.rowsNote}</p>
        </Reveal>

        <Reveal className={styles.price}>
          <div>
            <p className={styles.priceLabel}>{spots.eyebrow}</p>
            {/* Keine Platzzahl. Solange es keine echte Limitierung gibt,
                waere jede Zahl erfundene Knappheit — und ein Hinweis,
                dass sie "noch kommt", ist ein sichtbarer Platzhalter.
                Stattdessen steht hier, was tatsaechlich gilt. */}
            <p className={styles.priceValue}>
              {spots.headlineNeu.map((zeile) => (
                <span key={zeile} className={styles.priceZeile}>
                  {zeile}
                </span>
              ))}
            </p>
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
          {/* Die Linie liegt hinter den Punkten und verbindet sie — dieselbe
              Figur wie die Zeitleiste bei "Mein Weg". */}
          <ol className={styles.steps}>
            <span className={styles.stepsLine} aria-hidden="true" />
            {application.steps.map((item, index) => (
              <Reveal
                as="li"
                key={item.step}
                className={styles.step}
                delay={index * 80}
              >
                <span className={styles.stepDot} aria-hidden="true" />
                <p className={styles.stepNum}>{item.step}</p>
                <h3 className={styles.stepLabel}>{item.label}</h3>
                <p className={styles.stepText}>{item.text}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={280}>
            <p className={styles.stepsNote}>{application.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
