import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/landingPage";
import { club } from "@/data/club";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import { ResetFormular } from "@/components/Club/Konto/ResetFormular";
import styles from "../konto.module.css";

export const metadata: Metadata = {
  title: "Passwort vergessen — ISI TAT BUSINESS CLUB",
  robots: { index: false, follow: false, nocache: true },
};

export default function PasswortVergessenSeite() {
  const t = club.passwortVergessen;
  return (
    <main className={styles.page}>
      <Backdrop variant="grain" tone="dark" />
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label={brand.fullName}>
          <span className={styles.logoMark}>{brand.name}</span>
          <span className={styles.logoSuffix}>{brand.suffix}</span>
        </a>
        <h1 className={styles.headline}>
          {t.headline[0]}
          <br />
          {t.headline[1]}
        </h1>
        <p className={styles.text}>{t.text}</p>
        <ResetFormular />
        <Link href="/login/" className={styles.zurueck}>
          <span aria-hidden="true">←</span> {t.zurueck}
        </Link>
      </div>
    </main>
  );
}
