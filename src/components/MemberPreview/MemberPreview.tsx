import { brand, catalogue, hero, insideTheClub } from "@/data/landingPage";
import styles from "./MemberPreview.module.css";

const NAV = ["Start", "Inhalte", "Live", "Community", "Profil"];

/**
 * Nachbau der Mitglieder-Oberflaeche — zeigt statt zu beschreiben, was man
 * nach der Aufnahme sieht. Gebaut aus denselben Daten wie die Seite, damit
 * Mockup und echte Bereiche nie auseinanderlaufen.
 */
export function MemberPreview() {
  const featured = insideTheClub.series[0];
  const shelf = insideTheClub.series.slice(1);

  return (
    <div className={styles.frame}>
      <div className={styles.bar}>
        <span className={styles.logo}>{brand.name}</span>
        <nav className={styles.barNav}>
          {NAV.map((item, index) => (
            <span
              key={item}
              className={index === 0 ? styles.barNavActive : undefined}
            >
              {item}
            </span>
          ))}
        </nav>
        <span className={styles.avatar} />
      </div>

      <div className={styles.stage}>
        <span className={styles.stageScrim} />
        <div className={styles.stageBody}>
          <p className={styles.stageTitle}>{featured.label}</p>
          <div className={styles.stageMeta}>
            <span className={styles.tag}>Serie</span>
            <span className={styles.tag}>{hero.meta.edition}</span>
            <span className={`${styles.tag} ${styles.tagAccent}`}>
              {hero.meta.quality}
            </span>
            <span>{featured.episodes.length} Folgen</span>
          </div>
          <div className={styles.stageButtons}>
            <span className={styles.play}>
              <svg className={styles.icon} viewBox="0 0 9 11">
                <path d="M0 0v11l9-5.5z" />
              </svg>
              Abspielen
            </span>
            <span className={styles.list}>Alle Folgen</span>
          </div>
        </div>
      </div>

      <div className={styles.shelf}>
        <p className={styles.shelfLabel}>
          Alle Bereiche · {catalogue.episodeCount} Folgen
        </p>
        <div className={styles.grid}>
          {shelf.map((series, index) => (
            <div
              key={series.id}
              className={[styles.tile, index === 0 ? styles.tileWide : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.tileScrim} />
              <div className={styles.tileBody}>
                <p className={styles.tileLabel}>{series.label}</p>
                <p className={styles.tileMeta}>
                  {series.episodes.length} Folgen
                </p>
              </div>
              {index === 0 ? (
                <span className={styles.progress}>
                  <span className={styles.progressFill} />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
