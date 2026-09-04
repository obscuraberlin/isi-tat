import styles from "./Netzgrafik.module.css";

interface NetzgrafikProps {
  className?: string;
}

/* Feste Knoten statt Zufall: eine Grafik, die bei jedem Aufruf anders
   aussieht, ist keine Gestaltung. Die Werte sind Prozent im 100er-Raster,
   damit das SVG in jeder Größe gleich liegt. */
const KNOTEN = [
  { x: 50, y: 50, r: 3.4 },
  { x: 18, y: 26, r: 1.8 },
  { x: 78, y: 20, r: 2.1 },
  { x: 88, y: 58, r: 1.6 },
  { x: 66, y: 84, r: 2.3 },
  { x: 28, y: 78, r: 1.7 },
  { x: 8, y: 58, r: 1.4 },
  { x: 46, y: 14, r: 1.5 },
] as const;

/* Vom Mittelpunkt nach außen, plus zwei Verbindungen am Rand — ein Netz
   ist keine Sonne. */
const KANTEN: readonly [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [1, 7],
  [2, 3],
  [4, 5],
  [5, 6],
];

/**
 * Kleines Netz aus Linien und Punkten, golden und halb durchsichtig.
 *
 * Füllt eine Fläche, die sonst leer bliebe, ohne eine Aussage zu machen —
 * es ist Ornament, kein Inhalt, und deshalb für Screenreader unsichtbar.
 * Die Bewegung ist ein langsames Pulsieren der Punkte; wer Bewegung
 * reduziert haben will, sieht es still.
 */
export function Netzgrafik({ className }: NetzgrafikProps) {
  return (
    <svg
      className={[styles.netz, className].filter(Boolean).join(" ")}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.kanten}>
        {KANTEN.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={KNOTEN[a].x}
            y1={KNOTEN[a].y}
            x2={KNOTEN[b].x}
            y2={KNOTEN[b].y}
          />
        ))}
      </g>

      <g className={styles.knoten}>
        {KNOTEN.map((k, i) => (
          <circle
            key={`${k.x}-${k.y}`}
            cx={k.x}
            cy={k.y}
            r={k.r}
            style={{ ["--i" as string]: i }}
          />
        ))}
      </g>
    </svg>
  );
}
