"use client";

import { club } from "@/data/club";
import { useAbmelden } from "../abmelden";
import f from "../Formular.module.css";

export function Abmelden() {
  const abmelden = useAbmelden();
  return (
    <button type="button" className={`${f.knopf} ${f.leise}`} onClick={abmelden.los} disabled={abmelden.geht}>
      {club.konto.abmelden}
    </button>
  );
}
