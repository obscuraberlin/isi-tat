import type { Metadata } from "next";
import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { mitgliedMit } from "@/lib/mitglieder";
import { datumLang } from "@/lib/news";
import { club } from "@/data/club";
import s from "@/components/Club/Seite.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

/**
 * Die Mitgliedschaft: Status, seit wann, was enthalten ist. Laufzeit,
 * Preis und Rechnungen stehen hier erst, wenn es dafuer eine Quelle gibt
 * — eine erfundene Laufzeit auf dieser Seite waere eine Zusage.
 */
export default async function MitgliedschaftSeite() {
  const sitzung = await verlangeMitglied("/club/mitgliedschaft/");
  const mitglied = mitgliedMit(sitzung.email);
  const t = club.mitgliedschaft;

  return (
    <div className={s.seite}>
      <header className={s.kopf}>
        <p className={s.eyebrow}>{t.eyebrow}</p>
        <h1 className={s.titel}>{t.headline}</h1>
      </header>

      <div className={s.statusKarte}>
        <p className={s.status}>{t.status}</p>
        <p className={s.statusText}>{t.statusText}</p>
      </div>

      {mitglied?.angelegt ? (
        <ul className={`${s.zeilen} ${s.block}`}>
          <li className={s.zeile}>
            <span className={s.zeileName}>{t.seit}</span>
            <span className={s.zeileWert}>{datumLang(mitglied.angelegt)}</span>
          </li>
        </ul>
      ) : null}

      <section className={s.block} aria-labelledby="enthalten">
        <h2 id="enthalten" className={s.blockTitel}>
          {t.enthaltenTitel}
        </h2>
        <ul className={s.punkte}>
          {t.enthalten.map((p) => (
            <li key={p} className={s.punkt}>
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className={s.block} aria-labelledby="fragen">
        <h2 id="fragen" className={s.blockTitel}>
          {t.fragenTitel}
        </h2>
        <p className={s.text}>{t.fragenText}</p>
        <Link href="/club/support/" className={s.verweis}>
          {t.fragenKnopf}
          <span aria-hidden="true"> →</span>
        </Link>
      </section>
    </div>
  );
}
