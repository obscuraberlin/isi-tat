"use client";

import { useState } from "react";
import { club } from "@/data/club";
import { useSenden } from "./senden";
import f from "../Formular.module.css";

export function EmailFormular({ aktuell }: { aktuell: string }) {
  const [neu, setNeu] = useState("");
  const [passwort, setPasswort] = useState("");
  const { laeuft, fehler, ok, senden } = useSenden("/api/konto/email/");
  const t = club.einstellungen;

  if (ok) {
    return <p className={`${f.meldung} ${f.meldungOk}`}>{t.emailGesendet}</p>;
  }

  return (
    <form
      className={f.form}
      onSubmit={async (e) => {
        e.preventDefault();
        if (await senden({ neu, passwort })) setPasswort("");
      }}
    >
      <div className={f.feld}>
        <span className={f.label}>{t.emailAktuell}</span>
        <span className={f.wert}>{aktuell}</span>
      </div>
      <div className={f.feld}>
        <label className={f.label} htmlFor="email-neu">
          {t.emailNeu}
        </label>
        <input
          id="email-neu"
          type="email"
          className={f.eingabe}
          value={neu}
          onChange={(e) => setNeu(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div className={f.feld}>
        <label className={f.label} htmlFor="email-passwort">
          {t.emailPasswort}
        </label>
        <input
          id="email-passwort"
          type="password"
          className={f.eingabe}
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <p className={f.regel}>{t.emailHinweis}</p>
      <div className={f.zeile}>
        <button type="submit" className={f.knopf} disabled={laeuft}>
          {t.emailKnopf}
        </button>
        {fehler ? <span className={f.meldung}>{fehler}</span> : null}
      </div>
    </form>
  );
}
