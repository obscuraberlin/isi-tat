import Link from "next/link";
import type { MediaAsset } from "@/data/landingPage";
import { club } from "@/data/club";
import { Media } from "@/components/Media/Media";
import styles from "./FeaturedHero.module.css";

/**
 * Die Flaeche ganz oben.
 *
 * Ein Bild ueber die volle Breite, die Begruessung klein, der Name der
 * Masterclass gross, ein Satz, zwei Knoepfe. Das war es. Kein Kapitel,
 * kein einzelner Videotitel, keine Kennzahl — wer hereinkommt, soll
 * einen Knopf sehen und nicht eine Entscheidung.
 *
 * ABSPIELEN startet die erste Folge. ALLE SERIEN fuehrt zur Uebersicht.
 */
export function FeaturedHero({
  bild,
  vorname,
  erstesVideoNr,
}: {
  bild: MediaAsset;
  vorname: string;
  erstesVideoNr: number;
}) {
  return (
    <section className={styles.hero} aria-labelledby="hero-titel">
      <div className={styles.bild}>
        <Media asset={bild} tone="dark" priority radius="0" ratio="16 / 9" />
      </div>
      <span className={styles.verlauf} aria-hidden="true" />

      <div className={styles.inhalt}>
        {vorname ? (
          <p className={styles.gruss}>
            {club.start.grussVor} {vorname.toUpperCase()}.
          </p>
        ) : null}

        <h1 id="hero-titel" className={styles.titel}>
          {club.hero.headline}
        </h1>

        <p className={styles.text}>{club.hero.text}</p>

        <div className={styles.knoepfe}>
          <Link href={`/club/video/${erstesVideoNr}/`} className={styles.abspielen}>
            <svg className={styles.play} viewBox="0 0 12 14" aria-hidden="true">
              <path d="M0 0v14l12-7z" />
            </svg>
            {club.hero.abspielen}
          </Link>
          <Link href="/club/inhalte/" className={styles.alle}>
            {club.hero.alleFolgen}
          </Link>
        </div>
      </div>
    </section>
  );
}
