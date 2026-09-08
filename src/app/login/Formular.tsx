"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brand, cta, login } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { Button } from "@/components/ui/Button";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./page.module.css";

/**
 * Anmeldung zum Mitgliederbereich.
 *
 * Schickt E-Mail und Passwort an /api/anmeldung. Stimmt beides, setzt die
 * Route ein signiertes Cookie und hier geht es weiter in den Club.
 *
 * Das Ziel steht als ?weiter=/club/... in der Adresse — wer ein einzelnes
 * Video aufruft und dabei abgemeldet ist, landet nach der Anmeldung genau
 * dort und nicht auf der Uebersicht.
 *
 * `testbetrieb` kommt von der Serverseite: die Umgebungsvariablen, an
 * denen das haengt, gehoeren nicht in den Browser.
 */
export function Formular({ testbetrieb }: { testbetrieb: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  /**
   * Wohin nach der Anmeldung.
   *
   * Nur Pfade im eigenen Haus. Ohne diese Pruefung koennte jemand einen
   * Link mit ?weiter=https://... verschicken: die Anmeldung sieht echt
   * aus, weil sie es ist — und wirft den Angemeldeten danach auf eine
   * fremde Seite. Das doppelte "//" ist derselbe Fall in kurz.
   */
  function ziel(): string {
    if (typeof window === "undefined") return "/club/";
    const wunsch = new URLSearchParams(window.location.search).get("weiter");
    if (wunsch && wunsch.startsWith("/") && !wunsch.startsWith("//")) {
      return wunsch;
    }
    return "/club/";
  }

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
            onSubmit={async (event) => {
              event.preventDefault();
              if (pending) return;

              const formular = event.currentTarget;
              const felder = new FormData(formular);
              setNotice(null);
              setPending(true);

              try {
                const antwort = await fetch("/api/anmeldung/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: felder.get("email"),
                    passwort: felder.get("passwort"),
                    bleiben: felder.get("bleiben") === "on",
                  }),
                });

                const daten = await antwort.json().catch(() => ({}));

                if (antwort.ok && daten.ok) {
                  /* refresh() vor push(): der Router haelt die Seiten des
                     Clubs zwischengespeichert, und die stammen von vor der
                     Anmeldung. Ohne das steht dort kurz die Weiterleitung
                     zur Anmeldung. */
                  router.refresh();
                  router.push(ziel());
                  return;
                }

                setNotice(
                  typeof daten.meldung === "string"
                    ? daten.meldung
                    : "Anmeldung nicht möglich. Bitte versuch es später noch einmal.",
                );
              } catch {
                setNotice(
                  "Keine Verbindung. Prüf deine Internetverbindung und versuch es noch einmal.",
                );
              } finally {
                setPending(false);
              }
            }}
          >
            {/* §6: sehr minimal. Wer hier landet, weiss warum — ein
                Vorspann waere Fuellmaterial vor einem Formular mit zwei
                Feldern. */}
            <h1 className={styles.headline}>
              WILLKOMMEN
              <br />
              ZURÜCK.
            </h1>

            {/* Solange der Club mit dem oeffentlichen Ersatzschluessel
                laeuft, steht das hier. Ein Testzustand, den niemand sieht,
                wird irgendwann versehentlich zum Dauerzustand — und dieser
                hier laesst jeden herein, der den Quelltext kennt. */}
            {testbetrieb ? (
              <div className={styles.testkasten}>
                <p className={styles.testTitel}>Testbetrieb</p>
                <p className={styles.testText}>
                  <span>mancicmarcel@gmail.com</span>
                  <span>Oggy123</span>
                </p>
                <p className={styles.testWarnung}>
                  Dieser Zugang steht im Quelltext und gilt für jeden, der
                  ihn kennt. Vor dem Start für zahlende Mitglieder abschalten.
                </p>
              </div>
            ) : null}

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
                  name="passwort"
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
                  name="bleiben"
                  className={styles.checkbox}
                />
                Angemeldet bleiben
              </label>
              {/* Kein Selbstbedienungs-Weg zurueck: dafuer braeuchte es
                  Mailversand mit Einmal-Links und eine Stelle, die sie
                  ablegt. Solange die Zugaenge von Hand vergeben werden,
                  ist ein neues Passwort eine kurze Nachricht. */}
              <span className={styles.link}>Passwort vergessen? Melde dich.</span>
            </div>

            <Button
              type="submit"
              variant="primaryOnDark"
              full
              className={styles.submit}
              disabled={pending}
            >
              EINLOGGEN
            </Button>

            {notice ? (
              <p className={styles.hint} role="status">
                {notice}
              </p>
            ) : null}

            <p className={styles.footer}>
              Noch kein Mitglied?{" "}
              <a href={`/${cta.primary.href}`} className={styles.footerLink}>
                ZUGANG ANFRAGEN
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
