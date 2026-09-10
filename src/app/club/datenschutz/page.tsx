import type { Metadata } from "next";
import Link from "next/link";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { LoeschungKnopf } from "@/components/Club/Konto/LoeschungKnopf";
import s from "@/components/Club/Seite.module.css";
import f from "@/components/Club/Formular.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

/**
 * Datenschutz & Account: was auf dem Server liegt, was nur im Browser,
 * was nicht passiert — und die zwei Knoepfe, die die DSGVO verlangt:
 * Auskunft und Loeschung.
 */
export default async function DatenschutzKontoSeite() {
  await verlangeMitglied("/club/datenschutz/");
  const t = club.datenschutzKonto;

  const Liste = ({ punkte }: { punkte: readonly string[] }) => (
    <ul className={s.punkte}>
      {punkte.map((p) => (
        <li key={p} className={s.punkt}>
          {p}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={s.seite}>
      <header className={s.kopf}>
        <p className={s.eyebrow}>{t.eyebrow}</p>
        <h1 className={s.titel}>{t.headline}</h1>
        <p className={s.lead}>{t.lead}</p>
      </header>

      <section className={s.block}>
        <h2 className={s.blockTitel}>{t.serverTitel}</h2>
        <Liste punkte={t.server} />
      </section>

      <section className={s.block}>
        <h2 className={s.blockTitel}>{t.browserTitel}</h2>
        <Liste punkte={t.browser} />
        <p className={s.text} style={{ marginTop: 14 }}>
          {t.browserHinweis}
        </p>
      </section>

      <section className={s.block}>
        <h2 className={s.blockTitel}>{t.aussenTitel}</h2>
        <Liste punkte={t.aussen} />
      </section>

      <section className={s.block}>
        <h2 className={s.blockTitel}>{t.rechteTitel}</h2>
        <p className={s.text}>{t.auskunftText}</p>
        <p style={{ marginTop: 14 }}>
          <a href="/api/konto/daten/" className={`${f.knopf} ${f.leise}`} download>
            {t.auskunft}
          </a>
        </p>
        <p className={s.text} style={{ marginTop: 28 }}>
          {t.loeschenText}
        </p>
        <div style={{ marginTop: 14 }}>
          <LoeschungKnopf />
        </div>
        <p style={{ marginTop: 28 }}>
          <Link href="/datenschutz/" className={s.verweis}>
            {t.erklaerung}
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </section>
    </div>
  );
}
