"use client";

import { kursKapitel } from "@/data/masterclass";
import { club } from "@/data/club";
import { useFortschritt } from "@/lib/fortschritt";
import { SerienKarte } from "./SerienKarte";

/**
 * Die fuenf Serien mit Stand.
 *
 * Unter jedem Plakat "3 von 8 gesehen"; Serien, in denen noch keine Folge
 * offen ist, stehen gedaempft mit Schloss. Bis der Stand aus dem Browser
 * da ist, stehen die Plakate ohne — dann springt hoechstens die
 * Beschriftung, nicht das Bild.
 */
export function SerienUebersicht({ anker = false }: {
  /** Auf INHALTE: die Kacheln springen zur Liste auf derselben Seite. */
  anker?: boolean;
}) {
  const stand = useFortschritt();

  return (
    <>
      {kursKapitel.map((kapitel) => {
        const serie = stand ? stand.serie(kapitel.videos.map((v) => v.nr)) : null;
        const erste = kapitel.videos[0];
        const gesperrt = Boolean(stand && erste && !stand.frei(erste.nr));

        return (
          <SerienKarte
            key={kapitel.id}
            href={anker ? `#serie-${kapitel.id}` : `/club/kapitel/${kapitel.id}/`}
            label={kapitel.kurz}
            tagline={kapitel.tagline}
            anzahl={kapitel.videos.length}
            cover={kapitel.cover}
            stand={serie ? club.kapitel.stand(serie.gesehen, serie.gesamt) : undefined}
            prozent={serie?.prozent}
            gesperrt={gesperrt}
          />
        );
      })}
    </>
  );
}
