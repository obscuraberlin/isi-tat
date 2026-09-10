import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { EmailFormular } from "@/components/Club/Konto/EmailFormular";
import { PasswortFormular } from "@/components/Club/Konto/PasswortFormular";
import s from "@/components/Club/Seite.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

/**
 * Sicherheit: E-Mail-Adresse und Passwort. Nach dem Klick auf den
 * Bestaetigungslink landet man hier mit ?email=ok — oder mit dem Grund,
 * warum es nicht geklappt hat.
 */
export default async function EinstellungenSeite({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const sitzung = await verlangeMitglied("/club/einstellungen/");
  const { email } = await searchParams;
  const t = club.einstellungen;
  const meldung =
    email === "ok" ? t.emailOk : email === "ungueltig" ? t.emailUngueltig : email === "vergeben" ? t.emailVergeben : null;

  return (
    <div className={s.seite}>
      <header className={s.kopf}>
        <p className={s.eyebrow}>{t.eyebrow}</p>
        <h1 className={s.titel}>{t.headline}</h1>
        <p className={s.lead}>{t.lead}</p>
        {meldung ? (
          <p className={s.hinweis} role="status">
            {meldung}
          </p>
        ) : null}
      </header>

      <section className={s.block} aria-labelledby="email">
        <h2 id="email" className={s.blockTitel}>
          {t.emailTitel}
        </h2>
        <EmailFormular aktuell={sitzung.email} />
      </section>

      <section className={s.block} aria-labelledby="passwort">
        <h2 id="passwort" className={s.blockTitel}>
          {t.passwortTitel}
        </h2>
        <PasswortFormular />
      </section>

      <section className={s.block} aria-labelledby="geraete">
        <h2 id="geraete" className={s.blockTitel}>
          {t.geraeteTitel}
        </h2>
        <p className={s.text}>{t.geraeteText}</p>
      </section>
    </div>
  );
}
