"use client";

import { useMemo, useState } from "react";
import { backdrops, brand, screening } from "@/data/landingPage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Backdrop } from "@/components/Backdrop/Backdrop";
import styles from "./page.module.css";

type Antworten = Record<string, number>;

/**
 * Vorqualifizierung. Eine Frage pro Schritt, danach die Kontaktdaten,
 * am Ende ein Ergebnis.
 *
 * Eine Frage pro Bild statt eines langen Formulars: wer fünf Blöcke auf
 * einmal sieht, bricht ab. So ist jeder Schritt eine Entscheidung, die in
 * zwei Sekunden fällt — und der Fortschrittsbalken zeigt, dass es gleich
 * vorbei ist.
 *
 * Der Punktestand wird hier im Browser gerechnet. Das führt jemanden durch
 * den Ablauf, es sperrt niemanden aus: wer den Quelltext liest, sieht die
 * Gewichtung. Eine belastbare Prüfung gehört auf einen Server — an
 * derselben Stelle, an der auch das Abschicken andockt.
 */
export default function BewerbungPage() {
  const [schritt, setSchritt] = useState(0);
  const [antworten, setAntworten] = useState<Antworten>({});
  const [abgeschickt, setAbgeschickt] = useState(false);

  const fragen = screening.questions;
  /* Ein Schritt mehr als Fragen: der letzte ist das Kontaktformular. */
  const gesamt = fragen.length + 1;
  const aufKontakt = schritt === fragen.length;

  const punkte = useMemo(
    () => Object.values(antworten).reduce((summe, wert) => summe + wert, 0),
    [antworten],
  );

  const ergebnis = useMemo(() => {
    if (punkte >= screening.thresholds.direkt) return screening.results.direkt;
    if (punkte >= screening.thresholds.pruefen) return screening.results.pruefen;
    return screening.results.warten;
  }, [punkte]);

  /* Ergebnisbild */
  if (abgeschickt) {
    return (
      <main className={styles.page}>
        <Backdrop
          variant="glow"
          tone="dark"
          image={backdrops.ctaNachInhalten.src}
          imageOpacity={0.2}
          imagePosition="50% 45%"
          drift={0}
        />

        <div className={styles.inner}>
          <Marke />

          <div className={styles.center}>
            <div className={styles.result}>
              <p className={styles.kicker}>{ergebnis.eyebrow}</p>
              <h1 className={styles.headline}>
                {ergebnis.headline.map((zeile) => (
                  <span key={zeile} className={styles.headlineLine}>
                    {zeile}
                  </span>
                ))}
              </h1>
              <p className={styles.body}>{ergebnis.body}</p>

              {ergebnis.cta ? (
                <ButtonLink
                  href={ergebnis.cta.href}
                  variant="primaryOnDark"
                  className={styles.resultCta}
                >
                  {ergebnis.cta.label}
                </ButtonLink>
              ) : null}

              <p className={styles.preview}>{screening.preview}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const frage = aufKontakt ? null : fragen[schritt];

  return (
    <main className={styles.page}>
      <Backdrop
        variant="grain"
        tone="dark"
        image={backdrops.finalCta.src}
        imageOpacity={0.12}
        imagePosition="50% 40%"
      />

      <div className={styles.inner}>
        <Marke />

        <div className={styles.center}>
          <div className={styles.card}>
            <header className={styles.head}>
              <p className={styles.kicker}>{screening.eyebrow}</p>
              {/* Der Balken ist die einzige Stelle, die sagt, wie lang es
                  noch dauert. Ohne ihn fühlt sich jeder Schritt endlos an. */}
              <p className={styles.progressText}>
                {screening.progressLabel} {Math.min(schritt + 1, gesamt)} / {gesamt}
              </p>
              <span className={styles.progress} aria-hidden="true">
                <span
                  className={styles.progressBar}
                  style={{ width: `${((schritt + 1) / gesamt) * 100}%` }}
                />
              </span>
            </header>

            {schritt === 0 ? (
              <p className={styles.intro}>{screening.intro}</p>
            ) : null}

            {frage ? (
              <div className={styles.step} key={frage.id}>
                <h1 className={styles.question}>{frage.question}</h1>
                {"hint" in frage && frage.hint ? (
                  <p className={styles.hint}>{frage.hint}</p>
                ) : null}

                <div className={styles.options}>
                  {frage.options.map((option) => {
                    const aktiv = antworten[frage.id] === option.score;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        className={[
                          styles.option,
                          aktiv ? styles.optionActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => {
                          setAntworten((alt) => ({
                            ...alt,
                            [frage.id]: option.score,
                          }));
                          /* Direkt weiter: ein zusätzlicher Klick auf
                             "Weiter" bringt nichts, wenn die Antwort steht. */
                          setSchritt((s) => Math.min(s + 1, fragen.length));
                        }}
                      >
                        <span className={styles.optionLabel}>{option.label}</span>
                        <span className={styles.optionMark} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <form
                className={styles.step}
                onSubmit={(event) => {
                  event.preventDefault();
                  /* TODO_CONTENT: Ziel für die Bewerbung eintragen —
                     Postfach, Formulardienst oder CRM. Bis dahin bleibt
                     die Eingabe im Browser und wird nirgendwohin gesendet. */
                  setAbgeschickt(true);
                }}
              >
                <h1 className={styles.question}>
                  {screening.contact.headline}
                </h1>

                <div className={styles.fields}>
                  {screening.contact.fields.map((feld) => (
                    <div key={feld.name} className={styles.field}>
                      <label className={styles.label} htmlFor={feld.name}>
                        {feld.label}
                        {feld.required ? null : (
                          <span className={styles.optional}> — optional</span>
                        )}
                      </label>
                      <input
                        id={feld.name}
                        name={feld.name}
                        type={feld.type}
                        autoComplete={feld.autoComplete}
                        required={feld.required}
                        placeholder={feld.placeholder}
                        className={styles.input}
                      />
                    </div>
                  ))}
                </div>

                <p className={styles.note}>{screening.contact.note}</p>

                <Button
                  type="submit"
                  variant="primaryOnDark"
                  full
                  className={styles.submit}
                >
                  {screening.submitLabel}
                </Button>

                <p className={styles.preview}>{screening.preview}</p>
              </form>
            )}

            {schritt > 0 ? (
              <button
                type="button"
                className={styles.back}
                onClick={() => setSchritt((s) => Math.max(0, s - 1))}
              >
                <span aria-hidden="true">←</span> {screening.backLabel}
              </button>
            ) : (
              <a href="/" className={styles.back}>
                <span aria-hidden="true">←</span> Zurück zur Startseite
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Marke() {
  return (
    <a href="/" className={styles.logo} aria-label={brand.fullName}>
      {/* [LOGO_ISI_TAT] */}
      <span className={styles.logoMark}>{brand.name}</span>
      <span className={styles.logoSuffix}>{brand.suffix}</span>
    </a>
  );
}
