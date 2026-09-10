import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { SupportFormular } from "@/components/Club/Konto/SupportFormular";
import s from "@/components/Club/Seite.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

export default async function SupportSeite() {
  await verlangeMitglied("/club/support/");
  const t = club.support;

  return (
    <div className={s.seite}>
      <header className={s.kopf}>
        <p className={s.eyebrow}>{t.eyebrow}</p>
        <h1 className={s.titel}>{t.headline}</h1>
        <p className={s.lead}>{t.lead}</p>
      </header>
      <SupportFormular />
    </div>
  );
}
