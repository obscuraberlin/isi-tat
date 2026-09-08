import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, sitzungLesen, type Sitzung } from "./sitzung";
import { fingerabdruck, mitgliedMit } from "./mitglieder";

/**
 * Die einzige Stelle, an der "ist jemand angemeldet?" beantwortet wird.
 *
 * Jede Seite im Club fragt hier, nicht im Layout. Das Layout wird bei
 * einem Wechsel innerhalb des Bereichs nicht neu gerendert — eine Pruefung
 * dort liefe also genau einmal, und danach nie wieder. Ausserdem
 * entscheidet ein Layout nicht darueber, ob die Seite darunter laeuft:
 * sie rendert trotzdem und landet in der Antwort.
 *
 * Geprueft werden zwei Dinge:
 *   1. Ist das Cookie echt und noch gueltig? (Unterschrift, Ablauf)
 *   2. Gibt es das Mitglied noch, mit demselben Passwort?
 *
 * Der zweite Punkt ist der Grund, warum ein Rauswurf sofort wirkt: wird
 * jemand aus der Liste entfernt oder sein Passwort geaendert, ist sein
 * Cookie beim naechsten Aufruf wertlos — obwohl die Unterschrift stimmt.
 */
export async function angemeldet(): Promise<Sitzung | null> {
  const keks = (await cookies()).get(COOKIE)?.value;
  const sitzung = sitzungLesen(keks);
  if (!sitzung) return null;

  const mitglied = mitgliedMit(sitzung.email);
  if (!mitglied) return null;
  if (fingerabdruck(mitglied.hash) !== sitzung.fp) return null;

  /* Der Name kommt aus der Liste, nicht aus dem Cookie: aendert ISI ihn,
     steht beim naechsten Aufruf der neue oben. */
  return { ...sitzung, name: mitglied.name };
}

/**
 * Wie `angemeldet()`, nur dass ohne gueltige Sitzung nichts weitergeht.
 *
 * `redirect()` wirft — der Code danach laeuft nicht mehr, die Seite wird
 * nicht gerendert und steht auch nicht in der Antwort.
 */
export async function verlangeMitglied(zurueck?: string): Promise<Sitzung> {
  const sitzung = await angemeldet();
  if (sitzung) return sitzung;

  /* Wohin es nach der Anmeldung weitergehen soll. Nur der Pfad, nie eine
     ganze Adresse: sonst waere das eine offene Weiterleitung, mit der
     jemand von unserer Domain auf seine eigene schicken koennte. */
  const ziel = zurueck && zurueck.startsWith("/") && !zurueck.startsWith("//")
    ? `?weiter=${encodeURIComponent(zurueck)}`
    : "";
  redirect(`/login/${ziel}`);
}
