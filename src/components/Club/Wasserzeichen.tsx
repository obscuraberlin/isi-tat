import { club } from "@/data/club";
import styles from "./Wasserzeichen.module.css";

/**
 * Die Marke oben rechts im Bild: klein, halbdurchsichtig, ohne Klickflaeche.
 *
 * Sie liegt als Ebene ueber dem Player, nicht in der Datei. Deshalb kostet
 * sie keinen neuen Schnitt, laesst sich jederzeit aendern und ist auf
 * jeder Folge gleich. Wer den Bildschirm abfilmt, hat sie mit im Bild.
 * Wer die Datei selbst zieht, hat sie nicht — das faengt erst DRM ab.
 *
 * Nur dort, wo die Datei laeuft, nie auf der Startseite: die Trailer sind
 * oeffentlich und brauchen keinen Hinweis auf Mitglieder.
 */
export function Wasserzeichen() {
  return (
    <span className={styles.marke} aria-hidden="true">
      {club.wasserzeichen}
    </span>
  );
}
