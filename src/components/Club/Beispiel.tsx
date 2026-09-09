import { beispielMarke } from "@/data/beispiele";
import styles from "./Beispiel.module.css";

/**
 * Das kleine "Beispiel" an ausgedachten Eintraegen.
 *
 * Steht dran, damit niemand am 15. Oktober in Berlin vor einer Tuer
 * steht. Verschwindet mit den Beispielen — siehe beispiele.ts.
 */
export function Beispiel({ wenn }: { wenn?: boolean }) {
  if (!wenn) return null;
  return <span className={styles.marke}>{beispielMarke}</span>;
}
