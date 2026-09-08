"use client";

import type { KursVideo } from "@/data/masterclass";
import type { Kursbild } from "@/lib/kursMedien";
import { club } from "@/data/club";
import { useMerkliste } from "@/lib/merker";
import { Reihe } from "./Reihe";

/**
 * "Weiter ansehen" — die zuletzt geoeffneten Folgen.
 *
 * Steht im Browser des Mitglieds, nicht auf dem Server, und kann deshalb
 * erst nach dem Einhaengen entstehen. Solange nichts drin ist, rendert
 * die Reihe nichts: beim ersten Besuch ist sie leer, und eine
 * Ueberschrift ueber einer leeren Flaeche sieht kaputt aus.
 *
 * Kein Fortschrittsbalken. Ein "73 %" ueber einem Video ist der Punkt,
 * an dem aus einer Navigationshilfe eine Lernstandsanzeige wird.
 */
export function MerkReihen({
  videos,
  bilder,
}: {
  videos: readonly KursVideo[];
  bilder: Record<number, Kursbild>;
}) {
  const zuletzt = useMerkliste("zuletzt");

  const folgen = (zuletzt ?? [])
    .map((nr) => videos.find((v) => v.nr === nr))
    .filter((v): v is KursVideo => Boolean(v))
    .slice(0, 8);

  return (
    <Reihe titel={club.start.weitersehen} videos={folgen} bilder={bilder} />
  );
}
