import type { Metadata } from "next";
import { verlangeMitglied } from "@/lib/zugang";
import { club } from "@/data/club";
import { clubDateien } from "@/data/mediaFiles";
import s from "@/components/Club/Seite.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

/** ISIs Begruessung zum Nochmal-Ansehen. Ohne Datei gibt es die Seite nicht. */
export default async function WillkommenSeite() {
  await verlangeMitglied("/club/willkommen/");
  const video = clubDateien.willkommen;
  const t = club.willkommen.seite;

  return (
    <div className={s.seite}>
      <header className={s.kopf}>
        <p className={s.eyebrow}>{t.eyebrow}</p>
        <h1 className={s.titel}>{t.headline}</h1>
        <p className={s.lead}>{t.lead}</p>
      </header>
      {video?.src ? (
        <div className={styles.rahmen}>
          <video
            className={styles.video}
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={club.willkommen.videoLabel}
          />
        </div>
      ) : null}
    </div>
  );
}
