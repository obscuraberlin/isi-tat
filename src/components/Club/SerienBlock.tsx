"use client";

import Link from "next/link";
import type { kursKapitel } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { club } from "@/data/club";
import { useFortschritt } from "@/lib/fortschritt";
import { Media } from "@/components/Media/Media";
import { FolgenListe } from "./FolgenListe";
import styles from "./SerienBlock.module.css";

/**
 * Eine Serie in der langen Liste auf INHALTE: Plakat klein, Name, Satz,
 * Stand — und darunter alle Folgen. Fuenfmal untereinander ergibt das
 * die ganze Bibliothek auf einer Seite, mit dem Stand an jeder Stelle.
 */
export function SerienBlock({
  kapitel,
  bilder,
}: {
  kapitel: (typeof kursKapitel)[number];
  bilder: Record<number, Kursbild>;
}) {
  const stand = useFortschritt();
  const serie = stand ? stand.serie(kapitel.videos.map((v) => v.nr)) : null;

  return (
    <section className={styles.block} id={`serie-${kapitel.id}`} aria-labelledby={`serie-${kapitel.id}-titel`}>
      <div className={styles.kopf}>
        <Link href={`/club/kapitel/${kapitel.id}/`} className={styles.plakat}>
          <Media asset={kapitel.cover} tone="dark" radius="inherit" ratio="2 / 3" />
        </Link>
        <div className={styles.text}>
          <p className={styles.eyebrow}>
            {club.inhalte.serie} · {kapitel.videos.length} Folgen
          </p>
          <h2 id={`serie-${kapitel.id}-titel`} className={styles.titel}>
            {kapitel.kurz}
          </h2>
          <p className={styles.tagline}>{kapitel.tagline}</p>
          <div className={styles.stand}>
            <span
              className={styles.balken}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={serie?.gesamt ?? kapitel.videos.length}
              aria-valuenow={serie?.gesehen ?? 0}
            >
              <span className={styles.balkenVoll} style={{ width: `${serie?.prozent ?? 0}%` }} />
            </span>
            <span className={styles.standText}>
              {serie ? club.kapitel.stand(serie.gesehen, serie.gesamt) : `${kapitel.videos.length} Folgen`}
              {serie && serie.prozent > 0 ? ` · ${serie.prozent} %` : ""}
            </span>
          </div>
          <Link href={`/club/kapitel/${kapitel.id}/`} className={styles.mehr}>
            {club.inhalte.zurSerie}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>

      <FolgenListe folgen={kapitel.videos} bilder={bilder} />
    </section>
  );
}
