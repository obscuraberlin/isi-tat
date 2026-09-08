"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { brand } from "@/data/landingPage";
import { club } from "@/data/club";
import styles from "./ClubHeader.module.css";

/**
 * Kopfzeile des Mitgliederbereichs.
 *
 * Bewusst nicht die Kopfzeile der Startseite: dort steht Verkaufsnavigation
 * ("Jetzt bewerben", "Über ISI"), und wer schon Mitglied ist, soll nicht
 * beworben werden. Hier stehen zwei Ziele und der Ausgang.
 */
export function ClubHeader({ name }: { name: string }) {
  const pfad = usePathname();
  const router = useRouter();
  const [geht, setGeht] = useState(false);

  async function abmelden() {
    setGeht(true);
    try {
      await fetch("/api/anmeldung/", { method: "DELETE" });
    } finally {
      /* refresh() vor push(): sonst zeigt der Router die im Speicher
         gehaltene Club-Seite noch einmal, bevor er weiterschaltet. */
      router.refresh();
      router.push("/");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/club/" className={styles.logo} aria-label={brand.fullName}>
          <span className={styles.logoMark}>{brand.name}</span>
          <span className={styles.logoSuffix}>{brand.suffix}</span>
        </Link>

        <nav className={styles.nav} aria-label="Mitgliederbereich">
          {club.nav.map((eintrag) => {
            /* Die Masterclass-Seite ist auch bei /club/video/... aktiv —
               sonst leuchtet beim Ansehen eines Videos gar nichts. */
            const aktiv =
              eintrag.href === "/club/"
                ? !pfad.startsWith("/club/kanal")
                : pfad.startsWith(eintrag.href);
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

        <div className={styles.rechts}>
          <span className={styles.name} title={name}>
            {name}
          </span>
          <button
            type="button"
            className={styles.abmelden}
            onClick={abmelden}
            disabled={geht}
          >
            {club.abmelden}
          </button>
        </div>
      </div>
    </header>
  );
}
