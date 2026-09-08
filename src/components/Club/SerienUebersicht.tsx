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
export function SerienUebersicht() {
  const stand = useFortschritt();

  return (
    <>
      {kursKapitel.map((kapitel) => {
        const gesehen = stand
          ? kapitel.videos.filter((v) => stand.gesehen.has(v.nr)).length
          : 0;
        const erste = kapitel.videos[0];
        const gesperrt = Boolean(stand && erste && !stand.frei(erste.nr));

        return (
          <SerienKarte
            key={kapitel.id}
            href={`/club/kapitel/${kapitel.id}/`}
            label={kapitel.label}
            tagline={kapitel.tagline}
            anzahl={kapitel.videos.length}
            cover={kapitel.cover}
            stand={
              stand
                ? club.kapitel.stand(gesehen, kapitel.videos.length)
                : undefined
            }
            gesperrt={gesperrt}
          />
        );
      })}
    </>
  );
}
