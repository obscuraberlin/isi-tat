"use client";

import { useState } from "react";
import { brand, cta, login } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Button } from "@/components/ui/Button";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./page.module.css";

/* Platzhalter-Visual — Austausch wie überall nur über `src`. */
/**
 * Login-Oberfläche für den späteren Mitgliederbereich.
 * Noch ohne Anbindung: das Formular sendet nichts und legt nichts ab.
 * Der Submit-Handler ist die Stelle, an der die Authentifizierung andockt.
 */
export default function LoginPage() {
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <main className={styles.page}>
      <Backdrop variant="grain" tone="dark" />

      <div className={styles.formSide}>
        <a href="/" className={styles.logo} aria-label={brand.fullName}>
          {/* [LOGO_ISI_TAT] */}
          <span className={styles.logoMark}>{brand.name}</span>
          <span className={styles.logoSuffix}>{brand.suffix}</span>
        </a>

        <div className={styles.center}>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              setPending(true);
              /* TODO: Anbindung an die Mitgliederverwaltung. */
              setNotice(
                "Der Mitgliederbereich ist noch nicht angebunden. Die Anmeldung wird aktiviert, sobald er steht.",
              );
              setPending(false);
            }}
          >
            <p className={styles.kicker}>Du bist Mitglied?</p>
            <h1 className={styles.headline}>WILLKOMMEN ZURÜCK.</h1>
            <p className={styles.sub}>
              Melde dich an und mach da weiter, wo du aufgehört hast.
            </p>

            {/* Offen sagen, dass hier noch nichts vergeben wird — sonst
                probiert jemand minutenlang Zugangsdaten, die es nicht gibt. */}
            <p className={styles.preview}>
              Vorschau — Zugänge werden noch nicht vergeben.
            </p>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  E-Mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@beispiel.de"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Passwort
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.row}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  name="remember"
                  className={styles.checkbox}
                />
                Angemeldet bleiben
              </label>
              <span className={styles.link} aria-disabled="true">
                Passwort vergessen?
              </span>
            </div>

            <Button
              type="submit"
              variant="primaryOnDark"
              full
              className={styles.submit}
              disabled={pending}
            >
              ANMELDEN
            </Button>

            {notice ? (
              <p className={styles.hint} role="status">
                {notice}
              </p>
            ) : null}

            <p className={styles.footer}>
              Noch kein Mitglied?{" "}
              <a href={`/${cta.primary.href}`} className={styles.footerLink}>
                {cta.primary.label}
              </a>
            </p>
          </form>
        </div>

        <a href="/" className={styles.back}>
          <span aria-hidden="true">←</span> Zurück zur Startseite
        </a>
      </div>

      <div className={styles.visual}>
        <Media asset={login.visual} tone="dark" radius="0" />
        <span className={styles.visualScrim} aria-hidden="true" />
        <p className={styles.visualQuote}>
          {login.quote[0]} <span>{login.quote[1]}</span>
        </p>
      </div>
    </main>
  );
}
