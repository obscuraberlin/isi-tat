import type { MediaAsset } from "@/data/landingPage";
import styles from "./Collage.module.css";

interface CollageProps {
  /** Motive für die Fläche. Ohne Datei wird die Kachel übersprungen. */
  assets: readonly MediaAsset[];
  className?: string;
}

/**
 * Hintergrundcollage: ein Raster aus vorhandenen Motiven, stark
 * zurückgenommen und weich maskiert.
 *
 * Eine Sektion, in der drei Bilder auf schwarzem Grund schweben, sieht
 * unfertig aus — es fehlt der Boden, auf dem sie stehen. Die Collage gibt
 * ihn, ohne selbst gelesen zu werden: entsättigt, unscharf, zu den
 * Rändern und zur Mitte hin ausgeblendet, damit Text darüber lesbar
 * bleibt.
 *
 * Die Motive sind dieselben, die weiter oben und unten in voller Größe
 * stehen — sie sind also schon geladen und kosten keinen Aufruf mehr.
 */
export function Collage({ assets, className }: CollageProps) {
  const tiles = assets.filter((asset) => asset.src);
  if (tiles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={[styles.collage, className].filter(Boolean).join(" ")}
    >
      <div className={styles.grid}>
        {tiles.map((asset) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={asset.id}
            className={styles.tile}
            src={asset.src ?? undefined}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}
