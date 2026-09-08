import type { Metadata } from "next";
import type { ReactNode } from "react";
import { angemeldet } from "@/lib/zugang";
import { ClubHeader } from "@/components/Club/ClubHeader";
import { MobilNav } from "@/components/Club/MobilNav";
import styles from "./layout.module.css";

/**
 * Rahmen des Mitgliederbereichs.
 *
 * Das Layout holt den Namen fuer die Kopfzeile — es entscheidet aber
 * nicht ueber den Zugang. Das tut jede Seite selbst ueber
 * `verlangeMitglied()`. Ein Layout wird bei einem Wechsel innerhalb des
 * Bereichs nicht neu gerendert, eine Pruefung hier liefe also nur beim
 * ersten Aufruf; und es haelt die Seite darunter ohnehin nicht auf.
 */

export const metadata: Metadata = {
  title: "Mitgliederbereich — ISI TAT BUSINESS CLUB",
  /* Nicht in den Suchmaschinen, auch nicht in deren Zwischenspeicher.
     Der Bereich ist ohnehin geschuetzt; das hier verhindert, dass eine
     Adresse daraus ueberhaupt irgendwo auftaucht. */
  robots: { index: false, follow: false, nocache: true },
};

export default async function ClubLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sitzung = await angemeldet();

  return (
    <div className={styles.club}>
      <ClubHeader name={sitzung?.name ?? ""} />
      <main className={styles.main}>{children}</main>
      <MobilNav />
    </div>
  );
}
