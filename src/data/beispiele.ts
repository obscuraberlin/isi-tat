/* ==========================================================================
   BEISPIELE — damit man sieht, wie Live, Events und News aussehen
   ==========================================================================

   Alles hier ist ausgedacht und im Club als BEISPIEL gekennzeichnet.
   Es steht drin, weil eine leere Seite nicht zeigt, was sie kann: wie
   ein Termin mit Zusage aussieht, ein ausgebuchtes Event, ein vergangenes,
   eine Nachricht von ISI.

   Sobald die ersten echten Eintraege stehen, `beispieleAktiv` auf false
   setzen — dann verschwindet alles hier auf einen Schlag. Echte Eintraege
   gehoeren in live.ts, events.ts und club.ts (oder in die Dateien aus
   .env.example), nie hierher.
   ========================================================================== */

import type { LiveTermin } from "./live";
import type { ClubEvent } from "./events";
import type { Nachricht } from "./club";

export const beispieleAktiv = true;

/** Steht klein an jedem Beispiel-Eintrag. */
export const beispielMarke = "Beispiel";

export const beispielLive: readonly LiveTermin[] = [
  {
    id: "beispiel-live-09-22",
    titel: "Deine Fragen zu Preis, Angebot und Abschluss",
    datum: "2026-09-22",
    beginn: "19:00",
    ende: "20:30",
    beschreibung:
      "Bring eine konkrete Situation mit: ein Angebot, das hängt, ein Kunde, der zögert, ein Preis, den du nicht nennen traust. Wir gehen sie gemeinsam durch.",
    beispiel: true,
  },
  {
    id: "beispiel-live-10-13",
    titel: "Netzwerk: Wie du Kontakte hältst, ohne zu nerven",
    datum: "2026-10-13",
    beginn: "19:00",
    ende: "20:00",
    beispiel: true,
  },
  {
    id: "beispiel-live-08-25",
    titel: "Auftakt: Was dich im Club erwartet",
    datum: "2026-08-25",
    beginn: "19:00",
    ende: "20:00",
    beschreibung: "Die erste Runde: Wer ist da, was sind eure Themen, wie läuft der Club.",
    beispiel: true,
  },
];

export const beispielEvents: readonly ClubEvent[] = [
  {
    id: "beispiel-clubabend-berlin",
    titel: "Club-Abend Berlin",
    ort: "Berlin, Mitte",
    datum: "2026-10-15",
    beschreibung:
      "Ein Abend unter Mitgliedern: kurze Runde von ISI, dann Zeit füreinander. Kein Programm, das bis 23 Uhr durchgetaktet ist — die Gespräche am Tisch sind der Punkt.",
    erwartet: [
      "Begrüßung und eine Runde von ISI",
      "Zeit für Gespräche unter Mitgliedern",
      "Wer will, stellt in zwei Minuten vor, woran er gerade arbeitet",
      "Den genauen Ort bekommst du nach der Zusage",
    ],
    beispiel: true,
  },
  {
    id: "beispiel-wochenende-hamburg",
    titel: "Wochenende Hamburg",
    ort: "Hamburg",
    datum: "2026-11-14",
    ende: "2026-11-15",
    beschreibung:
      "Zwei Tage in kleiner Runde. Samstag Arbeit an euren Fällen, Sonntag Ausklang. Die Plätze sind begrenzt, damit jeder zu Wort kommt.",
    erwartet: [
      "Samstag: Fallarbeit in kleiner Runde",
      "Gemeinsames Abendessen",
      "Sonntag: offener Vormittag",
    ],
    ausgebucht: true,
    beispiel: true,
  },
  {
    id: "beispiel-sommertreffen",
    titel: "Sommertreffen",
    ort: "Berlin",
    datum: "2026-08-20",
    beschreibung:
      "Das erste Treffen des Clubs — ein Abend am Wasser, ohne Bühne, mit allen, die schon dabei waren.",
    beispiel: true,
  },
];

export const beispielNews: readonly Nachricht[] = [
  {
    datum: "2026-09-08",
    titel: "Nächste Live-Runde am 22. September",
    text: [
      "Am Dienstag, 22. September, 19 Uhr, gehen wir eure Fälle zu Preis, Angebot und Abschluss durch. Sag zu, dann steht der Termin in deinem Kalender.",
      "Wenn du eine konkrete Situation hast, schreib sie dir vorher in drei Sätzen auf. Das macht die Runde für alle besser.",
    ],
    beispiel: true,
  },
  {
    datum: "2026-09-05",
    titel: "Club-Abend in Berlin: Zusagen sind offen",
    text: [
      "Am 15. Oktober treffen wir uns in Berlin. Ort und Uhrzeit bekommst du nach der Zusage — unter Events kannst du dich eintragen.",
    ],
    beispiel: true,
  },
  {
    datum: "2026-09-01",
    titel: "Neue Folge in VERTRIEB",
    text: [
      "Die nächste Folge in der Serie VERTRIEB ist online. Wer der Reihe nach schaut, findet sie unter Inhalte an der Stelle, an der er aufgehört hat.",
    ],
    beispiel: true,
  },
];
