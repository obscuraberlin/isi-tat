import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel, kursVideos, videoNr } from "@/data/masterclass";
import { club } from "@/data/club";
import { trust } from "@/data/landingPage";
import {
  kursBildAsset,
  kursHeroAsset,
  kursVideoAsset,
  type Kursbild,
} from "@/lib/kursMedien";
import { FolgenPlayer } from "@/components/Club/FolgenPlayer";
import { FolgenListe } from "@/components/Club/FolgenListe";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Eine Folge.
 *
 * Oben der Spieler, der auch entscheidet, ob die Folge schon dran ist.
 * Darunter drei Dinge: worum es geht, die Themen als Stichworte, die
 * Folgen der Serie. Umsetzung und ISI Rules zum Aufklappen.
 */
export default async function VideoSeite({
  params,
  searchParams,
}: {
  params: Promise<{ nr: string }>;
  searchParams: Promise<{ weiter?: string }>;
}) {
  const { nr } = await params;
  const { weiter } = await searchParams;
  const nummer = Number(nr);
  const video = Number.isInteger(nummer) ? videoNr(nummer) : undefined;
  if (!video) notFound();

  await verlangeMitglied(`/club/video/${video.nr}/`);

  const kapitel = kursKapitel.find((k) => k.id === video.kapitelId);
  if (!kapitel) notFound();

  const asset = kursVideoAsset(video, kapitel.still);
  const bilder: Record<number, Kursbild> = {};
  for (const v of kapitel.videos) bilder[v.nr] = kursBildAsset(v, kapitel.still);
  const folgeNr = kapitel.videos.findIndex((v) => v.nr === video.nr) + 1;

  /* Die naechste im Katalog — ueber die Seriengrenze hinweg. Nach der
     letzten Folge einer Serie kommt die erste der naechsten. */
  const i = kursVideos.findIndex((v) => v.nr === video.nr);
  const naechste = kursVideos[i + 1]?.nr ?? null;

  return (
    <article className={styles.seite}>
      <FolgenPlayer
        nr={video.nr}
        asset={asset}
        standbild={kursHeroAsset(video, trust.video)}
        naechsteNr={naechste}
        autoStart={weiter === "1"}
      />

      <div className={styles.inhalt}>
        <header className={styles.kopf}>
          <p className={styles.serie}>
            <Link href={`/club/kapitel/${kapitel.id}/`} className={styles.serieLink}>
              {kapitel.label}
            </Link>
            <span className={styles.serieFolge}>Folge {folgeNr}</span>
          </p>
          <h1 className={styles.titel}>{video.titel}</h1>
          <p className={styles.unter}>{video.unter}</p>
        </header>

        <section className={styles.block}>
          <h2 className={styles.blockTitel}>{club.video.kern}</h2>
          <p className={styles.kern}>{video.kern}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitel}>{club.video.themen}</h2>
          <ul className={styles.themen}>
            {video.gliederung.map((punkt) => (
              <li key={punkt.titel} className={styles.thema}>
                {punkt.titel}
              </li>
            ))}
          </ul>
        </section>

        <details className={styles.mehr}>
          <summary className={styles.mehrKopf}>
            {club.video.aufklappen}
            <span className={styles.mehrPfeil} aria-hidden="true" />
          </summary>
          <div className={styles.mehrInhalt}>
            <h3 className={styles.mehrTitel}>{club.video.aufgabe}</h3>
            <p className={styles.aufgabe}>{video.aufgabe}</p>
            <p className={styles.hinweis}>{club.video.aufgabeHinweis}</p>

            <h3 className={styles.mehrTitel}>{club.video.regeln}</h3>
            <ul className={styles.regeln}>
              {video.regeln.map((regel) => (
                <li key={regel} className={styles.regel}>
                  {regel}
                </li>
              ))}
            </ul>
          </div>
        </details>

        <section className={styles.block} aria-labelledby="weitere">
          <h2 id="weitere" className={styles.blockTitel}>
            {club.video.weitere}
          </h2>
          <FolgenListe folgen={kapitel.videos} bilder={bilder} aktuell={video.nr} />
        </section>
      </div>
    </article>
  );
}
