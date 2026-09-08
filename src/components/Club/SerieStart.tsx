"use client";

import Link from "next/link";
import type { KursVideo } from "@/data/masterclass";
import { club } from "@/data/club";
import { useFortschritt } from "@/lib/fortschritt";
import styles from "./SerieStart.module.css";

/**
 * Der Knopf auf der Serienseite.
 *
 * Fuehrt dorthin, wo es in dieser Serie weitergeht: zur ersten Folge, die
 * offen und noch nicht gesehen ist. Ist die Serie noch nicht dran, zur
 * Folge, die im Ganzen dran ist — mit Ansage, welche das ist.
 */
export function SerieStart({ folgen }: { folgen: readonly KursVideo[] }) {
  const stand = useFortschritt();
  const erste = folgen[0];
  if (!erste) return null;

  let ziel = erste.nr;
  let label: string = club.kapitel.abspielen;

  if (stand) {
    const naechsteHier = folgen.find((f) => stand.frei(f.nr) && !stand.gesehen.has(f.nr));
    const alleHier = folgen.every((f) => stand.gesehen.has(f.nr));
    if (alleHier) {
      ziel = erste.nr;
      label = club.naechste.nochmal;
    } else if (naechsteHier) {
      ziel = naechsteHier.nr;
      label = stand.gesehen.size === 0 || naechsteHier.nr === erste.nr
        ? club.kapitel.abspielen
        : club.kapitel.weiter;
    } else {
      /* Serie noch nicht dran: dorthin, wo es im Ganzen weitergeht — und
         das auch sagen, sonst wundert sich, wer in einer anderen Serie
         landet. */
      ziel = stand.naechste;
      label = club.kapitel.naechsteOffene;
    }
  }

  return (
    <Link href={`/club/video/${ziel}/`} className={styles.knopf}>
      <svg className={styles.play} viewBox="0 0 12 14" aria-hidden="true">
        <path d="M0 0v14l12-7z" />
      </svg>
      {label}
    </Link>
  );
}
