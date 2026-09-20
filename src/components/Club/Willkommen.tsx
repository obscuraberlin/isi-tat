"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaFile } from "@/data/mediaFiles";
import { club } from "@/data/club";
import { willkommenGesehen, willkommenMerken } from "@/lib/merker";
import styles from "./Willkommen.module.css";
import { Wasserzeichen } from "./Wasserzeichen";

/**
 * Der Gruss beim ersten Mal — ISIs Willkommensvideo.
 *
 * Ein Overlay, ein Video, ein Knopf. Das Video startet auf Klick, nicht
 * von selbst: mit Ton darf ein Browser nichts von selbst starten, und
 * stumm waere die Begruessung keine. Nach dem Ende wird aus
 * "Überspringen" das "CLUB ÖFFNEN". Ohne Videodatei steht der Text
 * allein, wie vorher.
 *
 * Gemerkt wird im Browser des Mitglieds. Auf einem zweiten Geraet kommt
 * das Video also noch einmal — der Server schreibt nicht mit, wer wann
 * zum ersten Mal da war. Wer es spaeter noch einmal sehen will: MEHR →
 * Willkommensvideo.
 */
export function Willkommen({ video }: { video: MediaFile | null }) {
  const [zeigen, setZeigen] = useState(false);
  const [laeuft, setLaeuft] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [quelle, setQuelle] = useState<string | null>(null);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    /* Erst nach dem Einhaengen entscheiden: auf dem Server gibt es den
       Speicher nicht, und ein Overlay, das bei jedem Aufruf kurz
       aufblitzt, waere schlimmer als keins. */
    if (!willkommenGesehen()) setZeigen(true);
  }, []);

  /* Auf dem Telefon die kleine Fassung — ein Drittel der Daten, und auf
     390 px sieht niemand den Unterschied. */
  useEffect(() => {
    if (!video?.src) return;
    const schmal = window.matchMedia("(max-width: 900px)").matches;
    setQuelle(schmal && video.klein ? video.klein : video.src);
  }, [video]);

  useEffect(() => {
    if (!zeigen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") schliessen();
    };
    document.addEventListener("keydown", taste);
    const vorher = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", taste);
      document.body.style.overflow = vorher;
    };
  }, [zeigen]);

  function schliessen() {
    willkommenMerken();
    ref.current?.pause();
    setZeigen(false);
  }

  function abspielen() {
    const el = ref.current;
    if (!el) return;
    el.muted = false;
    el.play().then(() => setLaeuft(true)).catch(() => setLaeuft(true));
  }

  if (!zeigen) return null;
  const t = club.willkommen;

  return (
    <div className={styles.schleier} role="dialog" aria-modal="true" aria-labelledby="willkommen">
      <div className={[styles.kasten, quelle ? styles.mitVideo : ""].filter(Boolean).join(" ")}>
        <h2 id="willkommen" className={styles.titel}>
          {t.titel.map((zeile, i) => (
            <span key={zeile} className={i === 1 ? styles.gold : undefined}>
              {zeile}
            </span>
          ))}
        </h2>

        {quelle ? (
          <div className={styles.video}>
            <video
              ref={ref}
              className={styles.videoElement}
              src={quelle}
              poster={video?.poster ?? undefined}
              playsInline
              preload="metadata"
              controls={laeuft}
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              onEnded={() => setFertig(true)}
              aria-label={t.videoLabel}
            />
            {laeuft ? <Wasserzeichen /> : null}
            {!laeuft ? (
              <button type="button" className={styles.play} onClick={abspielen} autoFocus>
                <span className={styles.playKreis} aria-hidden="true">
                  <svg viewBox="0 0 12 14">
                    <path d="M0 0v14l12-7z" />
                  </svg>
                </span>
                {t.abspielen}
              </button>
            ) : null}
          </div>
        ) : (
          <p className={styles.text}>{t.text}</p>
        )}

        {!quelle || fertig ? (
          <button type="button" className={styles.knopf} onClick={schliessen} autoFocus={!quelle}>
            {t.knopf}
          </button>
        ) : (
          <button type="button" className={styles.leise} onClick={schliessen}>
            {t.ueberspringen}
          </button>
        )}
      </div>
    </div>
  );
}
