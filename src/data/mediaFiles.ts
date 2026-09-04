/* Erzeugt von tools/medien-scan.mjs — nicht von Hand aendern.
   Dateien liegen in public/media und heissen nach ihrer Asset-Nummer. */

export interface MediaFile {
  src?: string;
  poster?: string;
}

export const mediaFiles: Record<number, MediaFile> = {
  1: {"poster":"/media/01-poster.jpg","src":"/media/01.mp4"},
  4: {"src":"/media/04.jpg"},
  5: {"src":"/media/05.jpg"},
  6: {"poster":"/media/06-poster.jpg","src":"/media/06.mp4"},
  7: {"src":"/media/07.jpg"},
  9: {"src":"/media/09.jpg"},
  11: {"src":"/media/11.jpg"},
  13: {"src":"/media/13.jpg"},
  15: {"src":"/media/15.jpg"},
  17: {"src":"/media/17.jpg"},
  19: {"src":"/media/19.jpg"},
  20: {"src":"/media/20.jpg"},
  21: {"src":"/media/21.jpg"},
  22: {"poster":"/media/22-poster.jpg","src":"/media/22.mp4"},
  23: {"src":"/media/23.jpg"},
  24: {"src":"/media/24.jpg"},
  25: {"src":"/media/25.jpg"},
  29: {"src":"/media/29.jpg"},
};
