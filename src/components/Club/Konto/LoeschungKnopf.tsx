"use client";

import { useState } from "react";
import { club } from "@/data/club";
import { useSenden } from "./senden";
import f from "../Formular.module.css";

/** Zwei Klicks: erst fragen, dann schicken. */
export function LoeschungKnopf() {
  const [sicher, setSicher] = useState(false);
  const { laeuft, fehler, ok, senden } = useSenden("/api/konto/loeschung/");
  const t = club.datenschutzKonto;

  if (ok) return <p className={`${f.meldung} ${f.meldungOk}`}>{t.loeschenGesendet}</p>;

  return (
    <div className={f.zeile}>
      {sicher ? (
        <>
          <button type="button" className={f.knopf} disabled={laeuft} onClick={() => senden({})}>
            Ja, Löschung anfragen
          </button>
          <button type="button" className={`${f.knopf} ${f.leise}`} onClick={() => setSicher(false)}>
            Abbrechen
          </button>
        </>
      ) : (
        <button type="button" className={`${f.knopf} ${f.leise}`} onClick={() => setSicher(true)}>
          {t.loeschen}
        </button>
      )}
      {fehler ? <span className={f.meldung}>{fehler}</span> : null}
    </div>
  );
}
