import type { CSSProperties } from "react";
import type { MediaAsset } from "@/data/landingPage";
import styles from "./Media.module.css";

interface MediaProps {
  asset: MediaAsset;
  /** Optische Variante des Platzhalters. */
  tone?: "light" | "dark";
  /** Ueberschreibt das Seitenverhaeltnis aus den Daten. */
  ratio?: string;
  /** Ueberschreibt den Radius. */
  radius?: string;
  className?: string;
  /** Hero/Above-the-fold: Bild sofort laden. */
  priority?: boolean;
  /** Video autoplay (muted, playsInline, loop) — z. B. Hero-Loop. */
  autoPlay?: boolean;
  /** Video-Controls einblenden — z. B. im Trailer-Overlay. */
  controls?: boolean;
  style?: CSSProperties;
}

/**
 * Rendert ein Asset oder — solange `src` fehlt — einen gestalteten Platzhalter
 * mit korrektem Seitenverhaeltnis, Gradient und Radius.
 * Austausch: in `data/landingPage.ts` nur `src` (und ggf. `poster`) setzen.
 */
export function Media({
  asset,
  tone = "light",
  ratio,
  radius,
  className,
  priority = false,
  autoPlay = false,
  controls = false,
  style,
}: MediaProps) {
  const frameStyle: CSSProperties = {
    aspectRatio: ratio ?? asset.ratio,
    ...(radius ? ({ "--radius": radius } as CSSProperties) : null),
    ...style,
  };

  const frameClass = [styles.frame, className].filter(Boolean).join(" ");

  if (asset.src) {
    if (asset.kind === "video") {
      return (
        <div className={frameClass} style={frameStyle}>
          <video
            className={styles.media}
            poster={asset.poster ?? undefined}
            aria-label={asset.alt}
            autoPlay={autoPlay}
            muted={autoPlay}
            loop={autoPlay}
            playsInline
            controls={controls}
            preload={priority ? "auto" : "metadata"}
          >
            {asset.srcMobile ? (
              <source
                src={asset.srcMobile}
                media="(max-width: 767px)"
                type="video/mp4"
              />
            ) : null}
            <source src={asset.src} type="video/mp4" />
          </video>
        </div>
      );
    }

    return (
      <div className={frameClass} style={frameStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.media}
          src={asset.src}
          alt={asset.alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
    );
  }

  return (
    <div
      className={[
        frameClass,
        styles.placeholder,
        tone === "dark" ? styles.placeholderDark : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={frameStyle}
      role="img"
      aria-label={`Platzhalter: ${asset.alt}`}
    >
      <span className={styles.corner} aria-hidden="true" />
      <span className={styles.corner} aria-hidden="true" />
      <span className={styles.corner} aria-hidden="true" />
      <span className={styles.corner} aria-hidden="true" />
      <div className={styles.placeholderInner}>
        <span className={styles.placeholderLabel}>{asset.id}</span>
        <span className={styles.placeholderKind}>
          {asset.kind === "video" ? "Video" : "Bild"} · {asset.ratio}
        </span>
      </div>
    </div>
  );
}
