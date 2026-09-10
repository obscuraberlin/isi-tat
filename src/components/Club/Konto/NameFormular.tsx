"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { club } from "@/data/club";
import { useSenden } from "./senden";
import f from "../Formular.module.css";

export function NameFormular({ name }: { name: string }) {
  const router = useRouter();
  const [wert, setWert] = useState(name);
  const { laeuft, fehler, ok, senden } = useSenden("/api/konto/name/");
  const t = club.profil;

  return (
    <form
      className={f.form}
      onSubmit={async (e) => {
        e.preventDefault();
        if (await senden({ name: wert })) router.refresh();
      }}
    >
      <div className={f.feld}>
        <label className={f.label} htmlFor="name">
          {t.name}
        </label>
        <input
          id="name"
          className={f.eingabe}
          value={wert}
          onChange={(e) => setWert(e.target.value)}
          autoComplete="name"
          maxLength={80}
          required
        />
      </div>
      <div className={f.zeile}>
        <button type="submit" className={f.knopf} disabled={laeuft || wert.trim() === name}>
          {t.speichern}
        </button>
        {ok ? <span className={`${f.meldung} ${f.meldungOk}`}>{t.gespeichert}</span> : null}
        {fehler ? <span className={f.meldung}>{fehler}</span> : null}
      </div>
    </form>
  );
}
