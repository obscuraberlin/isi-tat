"use client";

import { useState } from "react";
import Link from "next/link";
import { club } from "@/data/club";
import { useSenden } from "./senden";
import f from "../Formular.module.css";
import s from "../Seite.module.css";

export function SupportFormular() {
  const t = club.support;
  const [kategorie, setKategorie] = useState<string>(t.kategorien[0]);
  const [betreff, setBetreff] = useState("");
  const [text, setText] = useState("");
  const { laeuft, fehler, ok, senden } = useSenden("/api/konto/support/");

  if (ok) {
    return (
      <div className={s.statusKarte}>
        <p className={s.status}>{t.danke}</p>
        <p className={s.statusText}>{t.dankeText}</p>
        <Link href="/club/" className={s.verweis}>
          {t.zurueck}
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    );
  }

  return (
    <form
      className={f.form}
      onSubmit={(e) => {
        e.preventDefault();
        senden({ kategorie, betreff, text });
      }}
    >
      <div className={f.feld}>
        <span className={f.label}>{t.kategorieTitel}</span>
        <div className={f.chips} role="radiogroup" aria-label={t.kategorieTitel}>
          {t.kategorien.map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={k === kategorie}
              className={[f.chip, k === kategorie ? f.chipAktiv : ""].filter(Boolean).join(" ")}
              onClick={() => setKategorie(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
      <div className={f.feld}>
        <label className={f.label} htmlFor="betreff">
          {t.betreff}
        </label>
        <input
          id="betreff"
          className={f.eingabe}
          value={betreff}
          onChange={(e) => setBetreff(e.target.value)}
          maxLength={120}
          required
        />
      </div>
      <div className={f.feld}>
        <label className={f.label} htmlFor="nachricht">
          {t.nachricht}
        </label>
        <textarea
          id="nachricht"
          className={f.eingabe}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={4000}
          required
        />
      </div>
      <div className={f.zeile}>
        <button type="submit" className={f.knopf} disabled={laeuft}>
          {t.knopf}
        </button>
        {fehler ? <span className={f.meldung}>{fehler}</span> : null}
      </div>
    </form>
  );
}
