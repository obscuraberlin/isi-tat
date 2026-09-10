import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/landingPage";
import { club } from "@/data/club";
import { tokenGueltig } from "@/lib/token";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import { NeuesPasswortFormular } from "@/components/Club/Konto/NeuesPasswortFormular";
import styles from "../../konto.module.css";

export const metadata: Metadata = {
  title: "Neues Passwort — ISI TAT BUSINESS CLUB",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

/**
 * Der Link aus der Mail. Ist der Token abgelaufen oder verbraucht, steht
 * das hier — und nicht erst nach dem Ausfuellen des Formulars.
 */
export default async function NeuesPasswortSeite({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const t = club.neuesPasswort;
  const gueltig = tokenGueltig(token, "reset");

  return (
    <main className={styles.page}>
      <Backdrop variant="grain" tone="dark" />
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label={brand.fullName}>
          <span className={styles.logoMark}>{brand.name}</span>
          <span className={styles.logoSuffix}>{brand.suffix}</span>
        </a>
        {gueltig ? (
          <>
            <h1 className={styles.headline}>
              {t.headline[0]}
              <br />
              {t.headline[1]}
            </h1>
            <p className={styles.text}>{t.text}</p>
            <NeuesPasswortFormular token={token} />
          </>
        ) : (
          <>
            <h1 className={styles.headline}>{t.ungueltig}</h1>
            <p className={styles.text}>{t.ungueltigText}</p>
            <Link href="/login/passwort-vergessen/" className={styles.knopf}>
              {t.neuAnfordern}
            </Link>
          </>
        )}
        <Link href="/login/" className={styles.zurueck}>
          <span aria-hidden="true">←</span> {club.passwortVergessen.zurueck}
        </Link>
      </div>
    </main>
  );
}
