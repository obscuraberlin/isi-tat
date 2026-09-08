"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { club } from "@/data/club";
import { istAktiv } from "./ClubHeader";
import { useAbmelden } from "./abmelden";
import styles from "./MobilNav.module.css";

/**
 * Die Leiste unten auf dem Telefon.
 *
 * Vier Ziele und "Mehr" — mehr passt nicht nebeneinander, ohne dass die
 * Beschriftungen unleserlich werden. Was selten gebraucht wird (abmelden,
 * spaeter das Profil), liegt hinter "Mehr" statt einen der vier Plaetze
 * zu belegen.
 *
 * Die Leiste liegt ueber dem Inhalt; der Abstand darunter kommt aus dem
 * Layout, damit nichts dahinter verschwindet.
 */

const Zeichen = ({ art }: { art: string }) => {
  /* Strichzeichnungen statt Emojis: die sehen auf jedem Geraet anders aus
     und tragen Farbe, die hier nicht hingehoert. */
  const pfade: Record<string, string> = {
    start: "M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1z",
    inhalte: "M3 5h14M3 10h14M3 15h9",
    live: "M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM8.6 7.7l3.6 2.3-3.6 2.3z",
    news: "M4 5h12v8H8l-4 3z",
    mehr: "M5 10h.01M10 10h.01M15 10h.01",
  };
  return (
    <svg className={styles.zeichen} viewBox="0 0 20 20" aria-hidden="true">
      <path
        d={pfade[art] ?? pfade.mehr}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ART = ["start", "inhalte", "live", "news"];

export function MobilNav() {
  const pfad = usePathname();
  const [mehr, setMehr] = useState(false);
  const abmelden = useAbmelden();

  useEffect(() => setMehr(false), [pfad]);

  useEffect(() => {
    if (!mehr) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMehr(false);
    };
    document.addEventListener("keydown", taste);
    return () => document.removeEventListener("keydown", taste);
  }, [mehr]);

  return (
    <>
      {mehr ? (
        <div
          className={styles.schleier}
          onClick={() => setMehr(false)}
          role="presentation"
        />
      ) : null}

      {mehr ? (
        <div className={styles.blatt} role="dialog" aria-label={club.konto.mehr}>
          {/* Was unten keinen Platz hat: hier, ueber dem Abmelden. */}
          {club.navMehr.map((eintrag) => (
            <Link
              key={eintrag.href}
              href={eintrag.href}
              className={styles.blattEintrag}
              aria-current={istAktiv(pfad, eintrag.href) ? "page" : undefined}
            >
              {eintrag.kuerzel}
            </Link>
          ))}
          <button
            type="button"
            className={`${styles.blattEintrag} ${styles.blattTrenner}`}
            onClick={abmelden.los}
            disabled={abmelden.geht}
          >
            {club.konto.abmelden}
          </button>
          <button
            type="button"
            className={`${styles.blattEintrag} ${styles.blattZu}`}
            onClick={() => setMehr(false)}
          >
            {club.konto.schliessen}
          </button>
        </div>
      ) : null}

      <nav className={styles.leiste} aria-label="Mitgliederbereich">
        {club.nav.map((eintrag, i) => {
          const aktiv = istAktiv(pfad, eintrag.href);
          return (
            <Link
              key={eintrag.href}
              href={eintrag.href}
              className={[styles.punkt, aktiv ? styles.aktiv : ""]
                .filter(Boolean)
                .join(" ")}
              aria-current={aktiv ? "page" : undefined}
            >
              <Zeichen art={ART[i] ?? "mehr"} />
              {eintrag.kuerzel}
            </Link>
          );
        })}

        <button
          type="button"
          className={[
            styles.punkt,
            mehr || club.navMehr.some((e) => istAktiv(pfad, e.href))
              ? styles.aktiv
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setMehr((m) => !m)}
          aria-expanded={mehr}
        >
          <Zeichen art="mehr" />
          {club.konto.mehr}
        </button>
      </nav>
    </>
  );
}
