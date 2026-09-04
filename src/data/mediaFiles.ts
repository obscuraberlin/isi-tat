/* Erzeugt von tools/medien-scan.mjs — nicht von Hand aendern.
   Dateien liegen in public/media und heissen nach ihrer Asset-Nummer. */

export interface MediaFile {
  src?: string;
  poster?: string;
}

export const mediaFiles: Record<number, MediaFile> = {
  1: {"poster":"/media/01-poster.jpg","src":"/media/01.mp4"},
  4: {"src":"/media/04.jpg"},
  6: {"poster":"/media/06-poster.jpg","src":"/media/06.mp4"},
};
