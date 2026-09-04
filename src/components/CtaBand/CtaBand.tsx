import { cta } from "@/data/landingPage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./CtaBand.module.css";

interface CtaBandProps {
  lines: readonly string[];
  note: string;
  tone?: "light" | "dark";
}

/**
 * Schmaler Zwischenruf zwischen zwei Abschnitten. Ein Aufruf, der nur ganz
 * oben und ganz unten steht, erreicht niemanden, der in der Mitte
 * ueberzeugt wird — und wer schon ueberzeugt ist, soll nicht erst ans
 * Seitenende scrollen muessen.
 *
 * Bewusst schmal gehalten: das Band unterbricht den Lesefluss, es soll ihn
 * nicht ersetzen.
 */
export function CtaBand({ lines, note, tone = "dark" }: CtaBandProps) {
  return (
    <section
      className={[styles.band, tone === "light" ? styles.onLight : styles.onDark]
        .join(" ")}
      aria-label="Aufnahme anfragen"
    >
      <Reveal className={styles.inner}>
        <p className={styles.line}>
          {lines.map((line) => (
            <span key={line} className={styles.lineItem}>
              {line}
            </span>
          ))}
        </p>

        <div className={styles.action}>
          <ButtonLink
            href={cta.primary.href}
            variant={tone === "light" ? "primary" : "primaryOnDark"}
          >
            {cta.primary.label}
          </ButtonLink>
          <p className={styles.note}>{note}</p>
        </div>
      </Reveal>
    </section>
  );
}
