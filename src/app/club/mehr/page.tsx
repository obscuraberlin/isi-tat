import type { Metadata } from "next";
import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { Abmelden } from "@/components/Club/Konto/Abmelden";
import s from "@/components/Club/Seite.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

/**
 * MEHR — eine Liste, drei Gruppen, unten Abmelden. Auf dem Telefon der
 * fuenfte Punkt der Leiste, auf dem Desktop im Aufklappmenue.
 */
export default async function MehrSeite() {
  const sitzung = await verlangeMitglied("/club/mehr/");
  const vorname = sitzung.name.trim().split(/\s+/)[0] ?? "";

  return (
    <div className={s.seite}>
      <header className={s.kopf}>
        <p className={s.eyebrow}>{club.mehr.eyebrow}</p>
        <h1 className={s.titel}>{club.mehr.headline}</h1>
      </header>

      <Link href="/club/profil/" className={s.statusKarte} style={{ display: "block", textDecoration: "none" }}>
        <p className={s.status}>{vorname.toUpperCase()}</p>
        <p className={s.statusText}>{sitzung.email}</p>
        <span className={s.verweis}>
          {club.mehr.profilAnsehen}
          <span aria-hidden="true"> →</span>
        </span>
      </Link>

      {club.mehr.gruppen.map((gruppe) => (
        <section key={gruppe.titel} className={s.block} aria-label={gruppe.titel}>
          <h2 className={s.blockTitel}>{gruppe.titel}</h2>
          <ul className={s.menue}>
            {gruppe.eintraege.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={s.menueEintrag}>
                  {e.label}
                  <svg viewBox="0 0 8 14" aria-hidden="true">
                    <path d="M1 1l6 6-6 6" fill="none" strokeWidth="1.4" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className={s.block}>
        <Abmelden />
      </div>
    </div>
  );
}
