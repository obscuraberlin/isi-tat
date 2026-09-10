"use client";

import { useState } from "react";
import Link from "next/link";
import { club } from "@/data/club";
import { useSenden } from "./senden";
import f from "../Formular.module.css";

export function NeuesPasswortFormular({ token }: { token: string }) {
  const [neu, setNeu] = useState("");
  const [nochmal, setNochmal] = useState("");
  const [ungleich, setUngleich] = useState(false);
  const { laeuft, fehler, ok, senden } = useSenden("/api/konto/neues-passwort/");
  const t = club.neuesPasswort;

  if (ok) {
    return (
      <div className={f.form}>
        <p className={`${f.meldung} ${f.meldungOk}`}>
          <strong>{t.fertig}</strong> {t.fertigText}
        </p>
        <Link href="/login/" className={f.knopf}>
          {t.zumLogin}
        </Link>
      </div>
    );
  }

  return (
    <form
      className={f.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (neu !== nochmal) {
          setUngleich(true);
          return;
        }
        setUngleich(false);
        senden({ token, neu });
      }}
    >
      <div className={f.feld}>
        <label className={f.label} htmlFor="neu">
          {t.neu}
        </label>
        <input
          id="neu"
          type="password"
          className={f.eingabe}
          value={neu}
          onChange={(e) => setNeu(e.target.value)}
          autoComplete="new-password"
          minLength={10}
          required
        />
        <p className={f.regel}>{club.einstellungen.passwortRegel}</p>
      </div>
      <div className={f.feld}>
        <label className={f.label} htmlFor="nochmal">
          {t.wiederholen}
        </label>
        <input
          id="nochmal"
          type="password"
          className={f.eingabe}
          value={nochmal}
          onChange={(e) => setNochmal(e.target.value)}
          autoComplete="new-password"
          minLength={10}
          required
        />
      </div>
      <div className={f.zeile}>
        <button type="submit" className={f.knopf} disabled={laeuft}>
          {t.knopf}
        </button>
        {ungleich ? <span className={f.meldung}>{club.einstellungen.passwortUngleich}</span> : null}
        {fehler ? <span className={f.meldung}>{fehler}</span> : null}
      </div>
    </form>
  );
}
