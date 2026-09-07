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
 * Damit das stimmt, muss hier dieselbe Fassung angefragt werden wie dort:
 * stünde nur `asset.src` im img, holte der Browser das JPEG zusätzlich
 * zum AVIF, das er oben schon hat — gemessen acht Dateien doppelt.
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
          /* Das <picture> traegt die Kachelklasse, nicht das Bild: die
             Regeln fuer jede zweite und jede vierte Kachel zaehlen die
             Kinder des Rasters. Waere das img das Kind, waere es immer
             das erste und die Kacheln stuenden alle gleich hoch. */
          <picture key={asset.id} className={styles.tile}>
            {asset.avif ? (
              <source srcSet={asset.avif} type="image/avif" />
            ) : null}
            {asset.webp ? (
              <source srcSet={asset.webp} type="image/webp" />
            ) : null}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.tileBild}
              src={asset.src ?? undefined}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
        ))}
      </div>
    </div>
  );
}
