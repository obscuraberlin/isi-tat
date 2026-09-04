"use client";

import { brand, isPending, presentation } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./page.module.css";

/**
 * Zweite Stufe des Trichters: erst Interesse zeigen, dann diese Seite.
 *
 * Bewusst ohne Navigation und ohne die Argumente der Startseite — wer hier
 * ist, hat sich schon entschieden hinzuschauen. Alles, was jetzt noch
 * ueberzeugt, steht in der Praesentation selbst.
 */
export default function PresentationPage() {
  const ctaOffen = isPending(presentation.cta.href);

  return (
    <main className={styles.page}>
      <Backdrop variant="grain" tone="dark" />
      <Backdrop variant="horizon" tone="dark" drift={40} />

      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.brand}>
            {brand.name}
            <span className={styles.brandSuffix}>{brand.suffix}</span>
          </span>

          <Eyebrow rule tone="onDark">
            {presentation.eyebrow}
          </Eyebrow>

          <h1 className={styles.headline}>
            {presentation.headline.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </h1>

          <p className={styles.intro}>{presentation.intro}</p>
        </header>

        <div className={styles.stage}>
          {/* Ohne priority: das Video ist zwar der Inhalt der Seite, aber
              es soll erst laden, wenn jemand auf Play drueckt. Vorher
              traegt das Standbild. */}
          <Media asset={presentation.video} tone="dark" controls />
        </div>

        <section className={styles.after}>
          <h2 className={styles.afterHead}>
            {presentation.afterHead.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </h2>

          <p className={styles.afterBody}>{presentation.afterBody}</p>

          {/* Solange das Ziel fehlt, wird kein toter Link gerendert. */}
          {ctaOffen ? (
            <p className={styles.ctaPending}>
              Ziel der Vorqualifizierung wird ergänzt.
            </p>
          ) : (
            <ButtonLink
              href={presentation.cta.href}
              variant="primaryOnDark"
              className={styles.cta}
            >
              {presentation.cta.label}
            </ButtonLink>
          )}

          <p className={styles.note}>{presentation.note}</p>
        </section>

        <a href="/" className={styles.back}>
          <span aria-hidden="true">←</span> Zurück zur Startseite
        </a>
      </div>
    </main>
  );
}
