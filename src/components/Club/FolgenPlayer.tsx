"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MediaAsset } from "@/data/landingPage";
import { club } from "@/data/club";
import { gesehenMerken, useFortschritt } from "@/lib/fortschritt";
import { Media } from "@/components/Media/Media";
import styles from "./FolgenPlayer.module.css";

/**
 * Der Spieler einer Folge — mit dem, was ihn vom nackten <video>
 * unterscheidet:
 *
 *   - Er laesst nur offene Folgen laufen. Ist die Folge noch zu, geht es
 *     zu der, die dran ist. Die Liste zeigt das schon, aber eine Adresse
 *     kann man auch tippen.
 *   - Ab 90 % Laufzeit gilt die Folge als gesehen; wer die letzten
 *     Sekunden Abspann nicht abwartet, soll nicht haengen bleiben.
 *   - Am Ende zaehlt ein Countdown und die naechste Folge startet von
 *     selbst. "Hier bleiben" haelt an — niemand wird weitergeschoben,
 *     der gerade mitschreibt.
 *   - Ohne Datei traegt ein Standbild die Flaeche, und WEITER zaehlt die
 *     Folge als gesehen. Sonst waere die Masterclass vor dem ersten
 *     Schnitt bei Folge 1 zu Ende.
 *
 * Der Stand liegt im Browser. Der Server erfaehrt nichts davon.
 */

const SCHWELLE = 0.9;
const COUNTDOWN = 5;

export function FolgenPlayer({
  nr,
  asset,
  standbild,
  naechsteNr,
  autoStart = false,
}: {
  nr: number;
  asset: MediaAsset;
  /** Fuer die Flaeche, solange keine Datei da ist. */
  standbild: MediaAsset;
  /** null = das war die letzte. */
  naechsteNr: number | null;
  /** Kommt man vom Countdown der vorigen Folge, geht es gleich los. */
  autoStart?: boolean;
}) {
  const router = useRouter();
  const stand = useFortschritt();
  const video = useRef<HTMLVideoElement>(null);
  const [zuEnde, setZuEnde] = useState(false);
  const [zaehler, setZaehler] = useState<number | null>(null);

  const laeuft = Boolean(asset.src);
  const gesehen = stand?.gesehen.has(nr) ?? false;
  const offen = stand ? stand.frei(nr) : null;

  /* Noch zu: weiter zu der Folge, die dran ist. */
  useEffect(() => {
    if (stand && !stand.frei(nr)) {
      router.replace(`/club/video/${stand.naechste}/`);
    }
  }, [stand, nr, router]);

  const weiter = useCallback(() => {
    if (naechsteNr === null) return;
    router.push(`/club/video/${naechsteNr}/?weiter=1`);
  }, [naechsteNr, router]);

  /* Countdown nach dem Ende. */
  useEffect(() => {
    if (zaehler === null) return;
    if (zaehler <= 0) {
      weiter();
      return;
    }
    const t = window.setTimeout(() => setZaehler((z) => (z === null ? null : z - 1)), 1000);
    return () => window.clearTimeout(t);
  }, [zaehler, weiter]);

  function beimFortschritt() {
    const el = video.current;
    if (!el || !el.duration || gesehen) return;
    if (el.currentTime / el.duration >= SCHWELLE) gesehenMerken(nr);
  }

  function beimEnde() {
    gesehenMerken(nr);
    setZuEnde(true);
    if (naechsteNr !== null) setZaehler(COUNTDOWN);
  }

  function markierenUndWeiter() {
    gesehenMerken(nr);
    if (naechsteNr === null) {
      setZuEnde(true);
      return;
    }
    weiter();
  }

  /* Bis der Stand da ist — oder wenn die Folge zu ist und gleich
     weitergeleitet wird — nur die dunkle Flaeche in der richtigen Groesse. */
  if (offen !== true) {
    return <div className={`${styles.rahmen} ${styles.leer}`} aria-hidden="true" />;
  }

  return (
    <div>
      <div className={[styles.rahmen, laeuft ? "" : styles.ruht].filter(Boolean).join(" ")}>
        {laeuft ? (
          <video
            ref={video}
            className={styles.video}
            src={asset.src ?? undefined}
            poster={asset.poster ?? undefined}
            controls
            playsInline
            autoPlay={autoStart}
            preload="metadata"
            aria-label={asset.alt}
            onTimeUpdate={beimFortschritt}
            onEnded={beimEnde}
          />
        ) : (
          <Media asset={standbild} tone="dark" radius="0" ratio="16 / 9" />
        )}

        {zaehler !== null && naechsteNr !== null ? (
          <div className={styles.overlay} role="status">
            <p className={styles.overlayText}>
              {club.video.naechsteStartet} <strong>{zaehler}</strong>
            </p>
            <div className={styles.overlayKnoepfe}>
              <button type="button" className={styles.jetzt} onClick={weiter}>
                {club.video.jetzt}
              </button>
              <button
                type="button"
                className={styles.bleiben}
                onClick={() => setZaehler(null)}
              >
                {club.video.bleiben}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Unter dem Spieler: die eine Zeile, die zur naechsten Folge fuehrt. */}
      <div className={styles.leiste}>
        {!laeuft ? (
          <p className={styles.fehlt}>
            <strong>{club.video.nochNicht}</strong> {club.video.nochNichtText}
          </p>
        ) : null}

        {naechsteNr === null && (gesehen || zuEnde) ? (
          <p className={styles.fertig}>{club.video.fertig}</p>
        ) : !laeuft ? (
          <button type="button" className={styles.weiter} onClick={markierenUndWeiter}>
            {club.video.gesehenWeiter}
            <span aria-hidden="true"> →</span>
          </button>
        ) : gesehen && naechsteNr !== null ? (
          <Link href={`/club/video/${naechsteNr}/`} className={styles.weiter}>
            {club.video.naechsteFolge}
            <span aria-hidden="true"> →</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
