import type { Metadata } from "next";
import { brand, datenschutz, isPending } from "@/data/landingPage";
import styles from "../rechtstext.module.css";

export const metadata: Metadata = {
  title: `Datenschutzerklärung — ${brand.fullName}`,
  robots: { index: false, follow: true },
};

export default function DatenschutzSeite() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label={brand.fullName}>
          <span className={styles.logoMark}>{brand.name}</span>
          <span className={styles.logoSuffix}>{brand.suffix}</span>
        </a>

        <h1 className={styles.title}>{datenschutz.title}</h1>
        {isPending(datenschutz.stand) ? null : (
          <p className={styles.stand}>Stand: {datenschutz.stand}</p>
        )}

        {datenschutz.abschnitte.map((abschnitt) => (
          <section key={abschnitt.head} className={styles.block}>
            <h2 className={styles.head}>{abschnitt.head}</h2>
            <div className={styles.body}>
              {abschnitt.body.map((absatz) =>
                isPending(absatz) ? (
                  <p key={absatz}>
                    <span className={styles.fehlt}>
                      {absatz.replace("OFFEN — ", "")}
                    </span>
                  </p>
                ) : (
                  <p key={absatz}>{absatz}</p>
                ),
              )}
            </div>
          </section>
        ))}

        <a href="/" className={styles.back}>
          <span aria-hidden="true">←</span> Zurück zur Startseite
        </a>
      </div>
    </main>
  );
}
