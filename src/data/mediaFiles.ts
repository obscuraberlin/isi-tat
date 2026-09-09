/* Erzeugt von tools/medien-scan.mjs — nicht von Hand aendern.
   Dateien liegen in public/media und heissen nach ihrer Asset-Nummer. */

export interface MediaFile {
  src?: string;
  /** Dasselbe Bild als AVIF — erste Wahl im <picture>. */
  avif?: string;
  /** Dasselbe Bild als WebP — zweite Wahl. */
  webp?: string;
  poster?: string;
  klein?: string;
}

export const mediaFiles: Record<number, MediaFile> = {
  1: {"klein":"/media/01-klein.mp4","poster":"/media/01-poster.jpg","src":"/media/01.mp4"},
  3: {"klein":"/media/03-klein.mp4","poster":"/media/03-poster.jpg","src":"/media/03.mp4"},
  4: {"avif":"/media/04.avif","src":"/media/04.jpg","webp":"/media/04.webp"},
  5: {"avif":"/media/05.avif","src":"/media/05.jpg","webp":"/media/05.webp"},
  6: {"klein":"/media/06-klein.mp4","poster":"/media/06-poster.jpg","src":"/media/06.mp4"},
  7: {"avif":"/media/07.avif","src":"/media/07.jpg","webp":"/media/07.webp"},
  9: {"avif":"/media/09.avif","src":"/media/09.jpg","webp":"/media/09.webp"},
  11: {"avif":"/media/11.avif","src":"/media/11.jpg","webp":"/media/11.webp"},
  13: {"avif":"/media/13.avif","src":"/media/13.jpg","webp":"/media/13.webp"},
  15: {"avif":"/media/15.avif","src":"/media/15.jpg","webp":"/media/15.webp"},
  17: {"avif":"/media/17.avif","src":"/media/17.jpg","webp":"/media/17.webp"},
  19: {"avif":"/media/19.avif","src":"/media/19.jpg","webp":"/media/19.webp"},
  20: {"avif":"/media/20.avif","src":"/media/20.jpg","webp":"/media/20.webp"},
  21: {"avif":"/media/21.avif","src":"/media/21.jpg","webp":"/media/21.webp"},
  22: {"klein":"/media/22-klein.mp4","poster":"/media/22-poster.jpg","src":"/media/22.mp4"},
  23: {"avif":"/media/23.avif","src":"/media/23.jpg","webp":"/media/23.webp"},
  24: {"avif":"/media/24.avif","src":"/media/24.jpg","webp":"/media/24.webp"},
  25: {"avif":"/media/25.avif","src":"/media/25.jpg","webp":"/media/25.webp"},
  29: {"avif":"/media/29.avif","src":"/media/29.jpg","webp":"/media/29.webp"},
  33: {"avif":"/media/33.avif","src":"/media/33.jpg","webp":"/media/33.webp"},
  34: {"avif":"/media/34.avif","src":"/media/34.jpg","webp":"/media/34.webp"},
};

/* Die Masterclass-Videos, v01…v40. Liegt zu einer Nummer nichts, bleibt
   die Flaeche im Mitgliederbereich ein Platzhalter — genau wie auf der
   Startseite. */
export const kursDateien: Record<number, MediaFile> = {

};
