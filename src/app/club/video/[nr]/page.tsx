import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { kursKapitel, nachbarn, videoNr } from "@/data/masterclass";
import { club } from "@/data/club";
import { kursHeroAsset, kursNr, kursVideoAsset } from "@/lib/kursMedien";
import { trust } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { MerkeVideo } from "@/components/Club/MerkeVideo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Ein Video, gross, mit allem was dazugehoert.
 *
 * Reihenfolge auf der Seite ist Absicht: erst das Video, dann worum es
 * geht, dann die Gliederung, dann die Umsetzung. Wer nur sehen will,
 * scrollt nicht; wer danach arbeiten will, findet alles darunter.
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

  /* Jedes Video gehoert zu einem der fuenf Kapitel — steht es zu keinem,
     ist die Datenlage kaputt und die Seite hat nichts zu zeigen. */
  const kapitel = kursKapitel.find((k) => k.id === video.kapitelId);
  if (!kapitel) notFound();

  const asset = kursVideoAsset(video, kapitel.still);
  const { davor, danach } = nachbarn(video.nr);
  const laeuft = Boolean(asset.src);

  return (
    <article className={styles.seite}>
      <MerkeVideo nr={video.nr} />

      <nav className={styles.pfad} aria-label="Wo du bist">
        <Link href="/club/inhalte/" className={styles.pfadLink}>
          {club.video.zurueck}
        </Link>
        <span className={styles.pfadTrenner} aria-hidden="true">
          /
        </span>
        <Link href={`/club/kapitel/${kapitel.id}/`} className={styles.pfadLink}>
          {kapitel.label}
        </Link>
      </nav>

      {/* Liegt noch keine Datei vor, steht hier ein Standbild statt eines
          leeren Kastens. Eine grosse graue Flaeche auf der Seite eines
          Videos, fuer das jemand vierstellig bezahlt hat, sieht aus wie
          ein Fehler — und ein Abspielknopf, der nichts tut, waere
          schlimmer. Also ein Bild, gedaempft, und ein Satz darunter. */}
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

      {laeuft ? null : (
        <p className={styles.fehlt}>
          <strong>{club.video.nochNicht}</strong> {club.video.nochNichtText}
        </p>
      )}

      <header className={styles.kopf}>
        <p className={styles.nummer}>
          {kursNr(video.nr)}
          <span className={styles.trenner} aria-hidden="true" />
          {kapitel.label}
        </p>
        <h1 className={styles.titel}>{video.titel}</h1>
        <p className={styles.unter}>{video.unter}</p>
      </header>

      <blockquote className={styles.hook}>
        <p>{video.hook}</p>
      </blockquote>

      <section className={styles.block}>
        <h2 className={styles.blockTitel}>{club.video.kern}</h2>
        <p className={styles.kern}>{video.kern}</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitel}>{club.video.gliederung}</h2>
        {/* Eine Aufzaehlung, keine Sprungmarken: die Zeitpunkte im Video
            kennt niemand, solange nichts geschnitten ist. Falsche Marken
            waeren schlimmer als keine. */}
        <ol className={styles.gliederung}>
          {video.gliederung.map((punkt, i) => (
            <li key={punkt.titel} className={styles.punkt}>
              <span className={styles.punktNr} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.punktTitel}>{punkt.titel}</h3>
                <p className={styles.punktText}>{punkt.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${styles.block} ${styles.aufgabe}`}>
        <h2 className={styles.blockTitel}>{club.video.aufgabe}</h2>
        <p className={styles.aufgabeText}>{video.aufgabe}</p>
        <p className={styles.aufgabeHinweis}>{club.video.aufgabeHinweis}</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitel}>{club.video.regeln}</h2>
        <ul className={styles.regeln}>
          {video.regeln.map((regel) => (
            <li key={regel} className={styles.regel}>
              {regel}
            </li>
          ))}
        </ul>
      </section>

      <nav className={styles.weiter} aria-label="Weitere Videos">
        {davor ? (
          <Link href={`/club/video/${davor.nr}/`} className={styles.nachbar}>
            <span className={styles.nachbarLabel}>
              <span aria-hidden="true">← </span>
              {club.video.davor}
            </span>
            <span className={styles.nachbarTitel}>{davor.titel}</span>
          </Link>
        ) : (
          <span />
        )}

        {danach ? (
          <Link
            href={`/club/video/${danach.nr}/`}
            className={`${styles.nachbar} ${styles.rechts}`}
          >
            <span className={styles.nachbarLabel}>
              {club.video.danach}
              <span aria-hidden="true"> →</span>
            </span>
            <span className={styles.nachbarTitel}>{danach.titel}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
