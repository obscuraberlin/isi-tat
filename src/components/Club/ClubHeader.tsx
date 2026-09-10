"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/data/landingPage";
import { club } from "@/data/club";
import { useAbmelden } from "./abmelden";
import styles from "./ClubHeader.module.css";

/**
 * Kopfzeile des Mitgliederbereichs.
 *
 * Bewusst nicht die Kopfzeile der Startseite: dort steht
 * Verkaufsnavigation ("Jetzt bewerben", "Über ISI"), und wer schon
 * bezahlt hat, soll nicht beworben werden.
 *
 * Vier Ziele und ein Aufklappmenue. Keine zwanzig Punkte — was leer ist,
 * steht gar nicht erst hier.
 *
 * Der Balken ist ueber dem Hero durchsichtig und wird beim Scrollen
 * dunkel. Ueber einem randlosen Bild zu stehen und trotzdem lesbar zu
 * bleiben, ist der einzige Grund fuer diese Unterscheidung.
 */
export function ClubHeader({ name }: { name: string }) {
  const pfad = usePathname();
  const [offen, setOffen] = useState(false);
  const [gescrollt, setGescrollt] = useState(false);
  const menue = useRef<HTMLDivElement>(null);
  const abmelden = useAbmelden();

  useEffect(() => {
    const beim = () => setGescrollt(window.scrollY > 24);
    beim();
    window.addEventListener("scroll", beim, { passive: true });
    return () => window.removeEventListener("scroll", beim);
  }, []);

  /* Klick daneben und Escape schliessen das Menue. Ohne das bleibt es
     offen, waehrend man schon woanders liest. */
  useEffect(() => {
    if (!offen) return;
    const daneben = (e: MouseEvent) => {
      if (!menue.current?.contains(e.target as Node)) setOffen(false);
    };
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(false);
    };
    document.addEventListener("pointerdown", daneben);
    document.addEventListener("keydown", taste);
    return () => {
      document.removeEventListener("pointerdown", daneben);
      document.removeEventListener("keydown", taste);
    };
  }, [offen]);

  /* Beim Seitenwechsel zu. */
  useEffect(() => setOffen(false), [pfad]);

  const vorname = name.trim().split(/\s+/)[0] ?? "";

  return (
    <header
      className={[styles.header, gescrollt ? styles.fest : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.inner}>
        <Link href="/club/" className={styles.logo} aria-label={brand.fullName}>
          <span className={styles.logoMark}>{brand.name}</span>
          <span className={styles.logoSuffix}>{brand.suffix}</span>
        </Link>

        <nav className={styles.nav} aria-label="Mitgliederbereich">
          {[...club.nav, ...club.navMehr].map((eintrag) => {
            const aktiv = istAktiv(pfad, eintrag.href);
            return (
              <Link
                key={eintrag.href}
                href={eintrag.href}
                className={[styles.navLink, aktiv ? styles.navAktiv : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={aktiv ? "page" : undefined}
              >
                {eintrag.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.konto} ref={menue}>
          <button
            type="button"
            className={styles.knopf}
            onClick={() => setOffen((o) => !o)}
            aria-expanded={offen}
            aria-haspopup="menu"
          >
            <span className={styles.kreis} aria-hidden="true">
              {vorname.slice(0, 1).toUpperCase()}
            </span>
            <span className={styles.name}>{vorname}</span>
            <svg className={styles.pfeil} viewBox="0 0 10 6" aria-hidden="true">
              <path d="M1 1l4 4 4-4" fill="none" strokeWidth="1.4" />
            </svg>
          </button>

          {offen ? (
            <div className={styles.aufklapp} role="menu">
              <p className={styles.voll}>{name}</p>
              <Link href="/club/profil/" className={styles.eintrag} role="menuitem">
                {club.konto.profil}
              </Link>
              <Link href="/club/einstellungen/" className={styles.eintrag} role="menuitem">
                {club.konto.einstellungen}
              </Link>
              <Link href={club.konto.mehrHref} className={styles.eintrag} role="menuitem">
                {club.konto.mehr}
              </Link>
              <button
                type="button"
                className={styles.eintrag}
                role="menuitem"
                onClick={abmelden.los}
                disabled={abmelden.geht}
              >
                {club.konto.abmelden}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/**
 * Welcher Punkt leuchtet.
 *
 * "Inhalte" gilt auch auf einer Kapitel- oder Videoseite — sonst leuchtet
 * beim Ansehen eines Videos gar nichts, und man weiss nicht mehr, wo man
 * ist. Die Startseite gilt nur exakt, sonst waere sie ueberall aktiv.
 */
export function istAktiv(pfad: string, href: string) {
  if (href === "/club/") return pfad === "/club" || pfad === "/club/";
  if (href === "/club/inhalte/") {
    return (
      pfad.startsWith("/club/inhalte") ||
      pfad.startsWith("/club/kapitel") ||
      pfad.startsWith("/club/video")
    );
  }
  return pfad.startsWith(href.replace(/\/$/, ""));
}

/** Alles, was auf dem Telefon unter MEHR liegt. */
export function istMehr(pfad: string) {
  return ["/club/mehr", "/club/profil", "/club/einstellungen", "/club/mitgliedschaft", "/club/support", "/club/datenschutz", "/club/events"].some(
    (p) => pfad.startsWith(p),
  );
}
