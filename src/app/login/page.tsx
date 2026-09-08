import { nurTestbetrieb } from "@/lib/sitzung";
import { Formular } from "./Formular";

/**
 * Die Anmeldeseite.
 *
 * Server-Komponente, damit sie nachsehen kann, ob der Club noch im
 * Testbetrieb laeuft — das haengt an Umgebungsvariablen, und die gehoeren
 * nicht in den Browser. Das Formular selbst laeuft dort, es braucht
 * Eingaben und einen Wechsel nach dem Absenden.
 *
 * Bewusst dynamisch: waere die Seite vorgebaut, staende der Testhinweis
 * noch dort, wenn die Zugaenge laengst vergeben sind.
 */
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <Formular testbetrieb={nurTestbetrieb()} />;
}
