import type { Metadata } from "next";
import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { mitgliedMit } from "@/lib/mitglieder";
import { datumLang } from "@/lib/news";
import { club } from "@/data/club";
import { NameFormular } from "@/components/Club/Konto/NameFormular";
import s from "@/components/Club/Seite.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

/**
 * Das Profil: Name, E-Mail, seit wann. Sichtbar nur fuer das Mitglied
 * und ISI. Ein Profil, das andere Mitglieder sehen, gibt es erst mit der
 * Community — und dann als eigene Entscheidung, nicht als Voreinstellung.
 */
export default async function ProfilSeite() {
  const sitzung = await verlangeMitglied("/club/profil/");
  const mitglied = mitgliedMit(sitzung.email);
  const t = club.profil;

  return (
    <div className={s.seite}>
      <header className={s.kopf}>
        <p className={s.eyebrow}>{t.eyebrow}</p>
        <h1 className={s.titel}>{t.headline}</h1>
        <p className={s.lead}>{t.lead}</p>
      </header>

      <section className={s.block}>
        <NameFormular name={sitzung.name} />
      </section>

      <section className={s.block}>
        <ul className={s.zeilen}>
          <li className={s.zeile}>
            <span className={s.zeileName}>{t.email}</span>
            <span className={s.zeileWert}>
              {sitzung.email}{" "}
              <Link href="/club/einstellungen/" className={s.verweis} style={{ marginTop: 0, marginLeft: 12 }}>
                {t.emailAendern}
              </Link>
            </span>
          </li>
          {mitglied?.angelegt ? (
            <li className={s.zeile}>
              <span className={s.zeileName}>{t.seit}</span>
              <span className={s.zeileWert}>{datumLang(mitglied.angelegt)}</span>
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
