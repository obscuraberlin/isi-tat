import { catalogue, insideTheClub } from "@/data/landingPage";
import { MemberPreview } from "@/components/MemberPreview/MemberPreview";
import styles from "./DeviceCluster.module.css";

/**
 * Der Mitgliederbereich auf drei Geraeten. Beantwortet nebenbei die Frage,
 * die im Text sonst eine Zeile kosten wuerde: wo kann ich das ueberhaupt
 * schauen.
 *
 * Alles ist Markup, kein Screenshot — dadurch scharf auf jedem Display und
 * immer synchron mit den echten Seriendaten. Bewusst ohne Glanzlichter,
 * Spiegelungen und schwebende Schatten: die Geraete sind Rahmen, nicht Deko.
 */
export function DeviceCluster() {
  const featured = insideTheClub.series[0];
  /* Alle Bereiche — ein halb angeschnittenes Raster liest sich wie eine
     Uebersicht, die weitergeht, statt wie eine halbleere Seite. */
  const tiles = insideTheClub.series;
  const episodes = featured.episodes.slice(0, 4);

  return (
    <div className={styles.cluster}>
      {/* ---------- Laptop: die volle Oberflaeche ---------- */}
      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <MemberPreview />
        </div>
        <div className={styles.laptopBase}>
          <span className={styles.laptopNotch} />
        </div>
      </div>

      {/* ---------- Tablet: die Uebersicht ---------- */}
      <div className={styles.tablet} aria-hidden="true">
        <div className={styles.tabletScreen}>
          <p className={styles.miniLabel}>Alle Bereiche</p>
          <p className={styles.miniCount}>{catalogue.episodeCount} Folgen</p>
          <div className={styles.tabletGrid}>
            {tiles.map((series) => (
              <span key={series.id} className={styles.miniTile}>
                <span className={styles.miniTileScrim} />
                <span className={styles.miniTileLabel}>{series.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Telefon: eine Folge, unterwegs ---------- */}
      <div className={styles.phone} aria-hidden="true">
        <div className={styles.phoneScreen}>
          <div className={styles.phonePlayer}>
            <span className={styles.phonePlay}>
              <svg viewBox="0 0 9 11" className={styles.phonePlayIcon}>
                <path d="M0 0v11l9-5.5z" />
              </svg>
            </span>
          </div>
          <p className={styles.phoneKicker}>{featured.label}</p>
          <ul className={styles.phoneList}>
            {episodes.map((episode, index) => (
              <li key={episode.title} className={styles.phoneItem}>
                <span
                  className={[
                    styles.phoneDot,
                    index === 0 ? styles.phoneDotActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
                <span className={styles.phoneItemBar} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
