"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { useLoopImBild, useLoopQuelle } from "@/lib/videoLoop";
import { assetNo, type MediaAsset } from "@/data/landingPage";
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
  /** Video autoplay (playsInline) — z. B. Hero-Loop. */
  autoPlay?: boolean;
  /**
   * Das Video ist Dekoration — unscharf, abgedunkelt, hinter Schrift.
   * Dann immer die kleine Fassung: dort sieht niemand den Unterschied
   * zwischen 1280 und 1920 Pixeln, die Datei ist aber ein Vielfaches
   * kleiner.
   */
  decoration?: boolean;
  /**
   * Ton beim Start. Ohne Angabe stumm, sobald autoPlay gesetzt ist —
   * unaufgefordert startende Videos mit Ton blockieren Browser ohnehin.
   * Nach einem Klick des Besuchers (Trailer-Overlay) darf der Ton an sein.
   */
  muted?: boolean;
  /** Endlosschleife. Ohne Angabe wie autoPlay — ein Trailer laeuft einmal. */
  loop?: boolean;
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
  decoration = false,
  muted,
  loop,
  controls = false,
  style,
}: MediaProps) {
  /* Das Asset-Verhaeltnis liegt auf --asset-ratio, nicht auf --ratio.
     Dadurch kann eine Regel oder ein Breakpoint --ratio setzen und gewinnt,
     obwohl der Inline-Wert hier steht. */
  const frameStyle: CSSProperties = {
    ["--asset-ratio" as string]: ratio ?? asset.ratio,
    ...(radius ? ({ "--radius": radius } as CSSProperties) : null),
    ...style,
  };

  const frameClass = [styles.frame, className].filter(Boolean).join(" ");

  /* Nur fuer Videos, die von selbst laufen: auf schmalen Schirmen die
     kleine Fassung, und angehalten, solange sie ausserhalb des Bildes
     stehen. Ein Video, das erst auf Klick startet, bleibt unberuehrt —
     dort will jemand das gute Bild sehen. */
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopQuelle = useLoopQuelle(asset.src, asset.klein, decoration);
  useLoopImBild(videoRef, autoPlay && asset.kind === "video");

  if (asset.src) {
    if (asset.kind === "video") {
      return (
        <div className={frameClass} style={frameStyle}>
          <video
            ref={videoRef}
            className={styles.media}
            src={autoPlay ? (loopQuelle ?? undefined) : asset.src}
            poster={asset.poster ?? undefined}
            aria-label={asset.alt}
            autoPlay={autoPlay}
            muted={muted ?? autoPlay}
            loop={loop ?? autoPlay}
            playsInline
            controls={controls}
            /* Ohne Autoplay laedt nichts, bis jemand auf Play drueckt —
               das Posterbild traegt die Flaeche so lange. Gemessen: mit
               "metadata" hat Chromium die ganze Datei geholt, 1,2 MB fuer
               ein Video, das vielleicht nie laeuft. */
            preload={priority ? "auto" : autoPlay ? "metadata" : "none"}
          >
            {/* Die Quelle steht als Attribut am <video>, nicht als <source>:
                das media-Attribut wird an <source> nur innerhalb von
                <picture> ausgewertet, in <video> ignorieren es alle
                Browser. Welche Fassung geladen wird, entscheidet deshalb
                useLoopQuelle im Browser. */}
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
        {/* Die Nummer traegt den Platzhalter: danach heisst die gelieferte
            Datei, danach wird einsortiert. Deshalb steht sie gross und der
            Rest klein darunter. */}
        <span className={styles.placeholderNo}>{assetNo(asset)}</span>
        <span className={styles.placeholderLabel}>{asset.alt}</span>
        <span className={styles.placeholderKind}>
          {asset.kind === "video" ? "Video" : "Bild"} · {asset.ratio}
        </span>
      </div>
    </div>
  );
}
