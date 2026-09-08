"use client";

import type { KursVideo } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { club } from "@/data/club";
import { useMerkliste } from "@/lib/merker";
import { Reihe } from "./Reihe";

/**
 * Die beiden persoenlichen Reihen: "Weiter ansehen" und "Gespeichert".
 *
 * Beide stehen im Browser des Mitglieds, nicht auf dem Server — deshalb
 * koennen sie erst nach dem Einhaengen entstehen. Solange nichts drin
 * ist, rendert die Reihe nichts: eine Ueberschrift ueber einer leeren
 * Flaeche sieht kaputt aus, und beim ersten Besuch ist beides leer.
 *
 * Der Fortschritt, den ein Streamingdienst hier zeigen wuerde, fehlt mit
 * Absicht. Ein Balken "73 %" ueber einem Video ist der Punkt, an dem aus
 * einer Navigationshilfe eine Lernstandsanzeige wird.
 */
export function MerkReihen({
  videos,
  bilder,
}: {
  videos: readonly KursVideo[];
  bilder: Record<number, Kursbild>;
}) {
  const zuletzt = useMerkliste("zuletzt");
  const spaeter = useMerkliste("spaeter");

  const zu = (nummern: number[] | null, wieViele: number) =>
    (nummern ?? [])
      .map((nr) => videos.find((v) => v.nr === nr))
      .filter((v): v is KursVideo => Boolean(v))
      .slice(0, wieViele);

  return (
    <>
      <Reihe
        titel={club.start.weitersehen}
        videos={zu(zuletzt, 12)}
        bilder={bilder}
      />
      <Reihe
        titel={club.start.spaeter}
        videos={zu(spaeter, 12)}
        bilder={bilder}
      />
    </>
  );
}
