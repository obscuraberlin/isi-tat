import { cta } from "@/data/landingPage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal/Reveal";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./CtaBand.module.css";

interface CtaBandProps {
  lines: readonly string[];
  note: string;
  tone?: "light" | "dark";
  /** Foto hinter dem Band. Fehlt es, bleibt das Band einfarbig. */
  image?: string | null;
  /** Clip hinter dem Band — stumm in Schleife, gewinnt gegen `image`. */
  video?: string | null;
  videoKlein?: string | null;
  imageOpacity?: number;
  imagePosition?: string;
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
export function CtaBand({
  lines,
  note,
  tone = "dark",
  image,
  video,
  videoKlein,
  imageOpacity,
  imagePosition,
}: CtaBandProps) {
  return (
    <section
      className={[styles.band, tone === "light" ? styles.onLight : styles.onDark]
        .join(" ")}
      aria-label="Aufnahme anfragen"
    >
      {/* Das Band ist die Stelle, an der ein Bild am meisten traegt: kurzer
          Satz, ein Knopf, sonst nichts — dahinter darf es weit sein. */}
      <Backdrop
        variant="grain"
        tone={tone}
        image={image}
        video={video}
        videoKlein={videoKlein}
        imageOpacity={imageOpacity ?? (tone === "light" ? 0.16 : 0.3)}
        imagePosition={imagePosition}
        drift={40}
      />

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
