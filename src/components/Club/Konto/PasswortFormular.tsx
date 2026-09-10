"use client";

import { useState } from "react";
import { club } from "@/data/club";
import { useSenden } from "./senden";
import f from "../Formular.module.css";

export function PasswortFormular() {
  const [aktuell, setAktuell] = useState("");
  const [neu, setNeu] = useState("");
  const [nochmal, setNochmal] = useState("");
  const [ungleich, setUngleich] = useState(false);
  const { laeuft, fehler, ok, senden } = useSenden("/api/konto/passwort/");
  const t = club.einstellungen;

  return (
    <form
      className={f.form}
      onSubmit={async (e) => {
        e.preventDefault();
        if (neu !== nochmal) {
          setUngleich(true);
          return;
        }
        setUngleich(false);
        if (await senden({ aktuell, neu })) {
          setAktuell("");
          setNeu("");
          setNochmal("");
        }
      }}
    >
      <div className={f.feld}>
        <label className={f.label} htmlFor="pw-aktuell">
          {t.passwortAktuell}
        </label>
        <input
          id="pw-aktuell"
          type="password"
          className={f.eingabe}
          value={aktuell}
          onChange={(e) => setAktuell(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <div className={f.feld}>
        <label className={f.label} htmlFor="pw-neu">
          {t.passwortNeu}
        </label>
        <input
          id="pw-neu"
          type="password"
          className={f.eingabe}
          value={neu}
          onChange={(e) => setNeu(e.target.value)}
          autoComplete="new-password"
          minLength={10}
          required
        />
        <p className={f.regel}>{t.passwortRegel}</p>
      </div>
      <div className={f.feld}>
        <label className={f.label} htmlFor="pw-nochmal">
          {t.passwortWiederholen}
        </label>
        <input
          id="pw-nochmal"
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
          {t.passwortKnopf}
        </button>
        {ok ? <span className={`${f.meldung} ${f.meldungOk}`}>{t.passwortOk}</span> : null}
        {ungleich ? <span className={f.meldung}>{t.passwortUngleich}</span> : null}
        {fehler ? <span className={f.meldung}>{fehler}</span> : null}
      </div>
    </form>
  );
}
