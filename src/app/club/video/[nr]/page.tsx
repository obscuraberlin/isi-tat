import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel, videoNr } from "@/data/masterclass";
import { club } from "@/data/club";
import { trust } from "@/data/landingPage";
import {
  kursBildAsset,
  kursHeroAsset,
  kursVideoAsset,
  type Kursbild,
} from "@/lib/kursMedien";
import { Media } from "@/components/Media/Media";
import { MerkeVideo } from "@/components/Club/MerkeVideo";
import { FolgenListe } from "@/components/Club/FolgenListe";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Eine Folge.
 *
 * Oben das Video, darunter drei Dinge: worum es geht, die Themen als
 * Stichworte, die weiteren Folgen der Serie. Die Umsetzungsaufgabe und
 * die ISI Rules stehen zum Aufklappen bereit — sie gehoeren dazu, aber
 * nicht als Textwand unter jedem Video.
 */
export default async function VideoSeite({
  params,
}: {
  params: Promise<{ nr: string }>;
}) {
  const { nr } = await params;
  const nummer = Number(nr);
  const video = Number.isInteger(nummer) ? videoNr(nummer) : undefined;
  if (!video) notFound();

  await verlangeMitglied(`/club/video/${video.nr}/`);

  const kapitel = kursKapitel.find((k) => k.id === video.kapitelId);
  if (!kapitel) notFound();

  const asset = kursVideoAsset(video, kapitel.still);
  const laeuft = Boolean(asset.src);

  const bilder: Record<number, Kursbild> = {};
  for (const v of kapitel.videos) bilder[v.nr] = kursBildAsset(v, kapitel.still);
  const folgeNr = kapitel.videos.findIndex((v) => v.nr === video.nr) + 1;

  return (
    <article className={styles.seite}>
      <MerkeVideo nr={video.nr} />

      {/* Ohne Datei ein gedaempftes Standbild statt eines leeren Kastens —
          und ein Satz darunter. */}
      <div
        className={[styles.spieler, laeuft ? "" : styles.ruht]
          .filter(Boolean)
          .join(" ")}
      >
        <Media
          asset={laeuft ? asset : kursHeroAsset(video, trust.video)}
          tone="dark"
          controls={laeuft}
          priority
        />
      </div>

      <div className={styles.inhalt}>
        {laeuft ? null : (
          <p className={styles.fehlt}>
            <strong>{club.video.nochNicht}</strong> {club.video.nochNichtText}
          </p>
        )}

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

        {/* Zum Aufklappen: gehoert dazu, muss aber niemanden erschlagen. */}
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
