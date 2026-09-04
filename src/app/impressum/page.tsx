import type { Metadata } from "next";
import { brand, impressum, isPending } from "@/data/landingPage";
import styles from "../rechtstext.module.css";

export const metadata: Metadata = {
  title: `Impressum — ${brand.fullName}`,
  /* Rechtsseiten gehören nicht in den Index einer Suchmaschine. */
  robots: { index: false, follow: true },
};

/** Zeigt einen Wert an — oder sichtbar, dass er noch fehlt. */
function Wert({ text }: { text: string }) {
  if (isPending(text)) {
    return <span className={styles.fehlt}>{text.replace("OFFEN — ", "")}</span>;
  }
  return <>{text}</>;
}

export default function ImpressumSeite() {
  const i = impressum;

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label={brand.fullName}>
          <span className={styles.logoMark}>{brand.name}</span>
          <span className={styles.logoSuffix}>{brand.suffix}</span>
        </a>

        <h1 className={styles.title}>{i.title}</h1>
        <p className={styles.stand}>{i.intro}</p>

        <section className={styles.block}>
          <h2 className={styles.head}>Anbieter</h2>
          <div className={styles.body}>
            <p>
              {i.anbieter.map((zeile) => (
                <span key={zeile} style={{ display: "block" }}>
                  <Wert text={zeile} />
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.head}>Vertreten durch</h2>
          <div className={styles.body}>
            <p>
              <Wert text={i.vertreten} />
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.head}>Registereintrag</h2>
          <div className={styles.body}>
            <p>
              Registergericht: <Wert text={i.register.gericht} />
              <br />
              Registernummer: <Wert text={i.register.nummer} />
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.head}>Umsatzsteuer-Identifikationsnummer</h2>
          <div className={styles.body}>
            <p>
              Gemäß § 27a Umsatzsteuergesetz: <Wert text={i.ustId} />
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.head}>Kontakt</h2>
          <div className={styles.body}>
            <p>
              E-Mail: <Wert text={i.kontakt.mail} />
              <br />
              Telefon: <Wert text={i.kontakt.telefon} />
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.head}>
            Verantwortlich nach § 18 Abs. 2 MStV
          </h2>
          <div className={styles.body}>
            <p>
              {i.verantwortlich.map((zeile) => (
                <span key={zeile} style={{ display: "block" }}>
                  <Wert text={zeile} />
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.head}>{i.streit.head}</h2>
          <div className={styles.body}>
            <p>
              {i.streit.text}{" "}
              <a href={i.streit.href} target="_blank" rel="noreferrer noopener">
                {i.streit.label}
              </a>
            </p>
            <p>{i.streit.hinweis}</p>
          </div>
        </section>

        <a href="/" className={styles.back}>
          <span aria-hidden="true">←</span> Zurück zur Startseite
        </a>
      </div>
    </main>
  );
}
