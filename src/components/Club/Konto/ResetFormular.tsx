"use client";

import { useState } from "react";
import { club } from "@/data/club";
import { useSenden } from "./senden";
import f from "../Formular.module.css";

export function ResetFormular() {
  const [email, setEmail] = useState("");
  const { laeuft, fehler, ok, senden } = useSenden("/api/konto/reset/");
  const t = club.passwortVergessen;

  if (ok) return <p className={`${f.meldung} ${f.meldungOk}`}>{t.gesendet}</p>;

  return (
    <form
      className={f.form}
      onSubmit={(e) => {
        e.preventDefault();
        senden({ email });
      }}
    >
      <div className={f.feld}>
        <label className={f.label} htmlFor="email">
          {t.email}
        </label>
        <input
          id="email"
          type="email"
          className={f.eingabe}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
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
