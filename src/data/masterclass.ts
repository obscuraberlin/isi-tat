/* ==========================================================================
   MASTERCLASS — die 40 Videos
   ==========================================================================

   Quelle: das Kursmanuskript des Auftraggebers
   ("ISI BUSINESS CLUB MASTERCLASS — 40 Videos", Arbeitsfassung).
   Titel, Kernbotschaften, Hooks, Gliederungen, Aufgaben und Regeln stehen
   hier so, wie sie dort stehen — bis auf deutschen Satz (Gedankenstrich,
   Anfuehrungszeichen). Erfunden ist nichts.

   Diese Inhalte sind NICHT oeffentlich. Sie werden ausschliesslich hinter
   der Anmeldung ausgeliefert; die Startseite zeigt weiterhin nur die fuenf
   Kapitel und ihre Beispielthemen.

   Bewusst NICHT vorhanden, und das soll so bleiben:
   Lernpfade, vorgegebene Reihenfolgen, Lernkontrollen, Tests, Pruefungen,
   Zertifikate oder eine Bewertung der Umsetzung. Der Club gibt Material und
   Austausch — er beaufsichtigt keinen Lernerfolg. Kommt eines dieser Dinge
   dazu, ist das eine Entscheidung mit rechtlicher Tragweite (FernUSG) und
   keine Kleinigkeit im Vorbeigehen.

   Die Nummern 1–40 sind die Ordnung des Katalogs, kein Pflichtweg: jedes
   Video steht fuer sich, der Einstieg ist frei.
   ========================================================================== */

import { insideTheClub } from "./landingPage";

export interface Gliederungspunkt {
  /** Ueberschrift des Abschnitts im Video. */
  titel: string;
  /** Ein bis zwei Saetze, worum es darin geht. */
  text: string;
}

export interface KursVideo {
  /** Nummer im Katalog, 1–40. Danach heissen auch die Dateien: v07.mp4 */
  nr: number;
  /** Zu welchem der fuenf Kapitel es gehoert. */
  kapitelId: KapitelId;
  /** Kurzform fuer die Adresszeile. */
  slug: string;
  titel: string;
  /** Die Zeile unter dem Titel. */
  unter: string;
  /** Worum es im Kern geht — steht ueber dem Video. */
  kern: string;
  /** ISIs eigener Einstieg, als Zitat gesetzt. */
  hook: string;
  /** Abschnitte im Video. Orientierung, keine Kapitelmarken im Player: die
      Zeitpunkte kennt niemand, solange die Videos nicht geschnitten sind. */
  gliederung: Gliederungspunkt[];
  /** Was danach zu tun ist. Selbst gesteuert — nichts wird eingereicht. */
  aufgabe: string;
  /** Die Merksaetze am Ende. */
  regeln: string[];
}

export type KapitelId = "mindset" | "sales" | "business" | "geld" | "brand";

export const kursVideos: readonly KursVideo[] = [
  {
    nr: 1,
    kapitelId: "mindset",
    slug: "wer-ist-ismail-tatlisoez-und-warum-solltest-du-mir-zuhoeren",
    titel: "Wer ist Ismail Tatlisözlüler — und warum solltest du mir zuhören?",
    unter: "Wer ich bin, woher ich komme und warum es diesen Club gibt.",
    kern: "Ich erzähle hier nicht aus der Theorie. Über zwanzig Jahre Handel, Vertrieb, eigene Firmen, Beteiligungen, Gastronomie und Personal Brand, mit allem, was dabei schiefgegangen ist. Ich verspreche dir keinen Erfolg, ich zeige dir, wie es bei mir gelaufen ist.",
    hook: "Ich will euch hier nicht erzählen, dass ich immer alles richtig gemacht habe. Im Gegenteil: Einige meiner wichtigsten Lektionen haben mich viel Geld, Zeit und Nerven gekostet. Genau deshalb kann meine Erfahrung für euch eine Abkürzung sein.",
    gliederung: [
      { titel: "Wer ich zuerst bin", text: "Bevor Unternehmer, Investor oder Content Creator: Sohn und Familienvater. Erfolg ist für mich nicht nur materiell." },
      { titel: "Mein Weg", text: "Frühe eBay-Geschäfte, Felgenhandel, Promotion, Vertrieb, eigene Strukturen, Vermögensberatung, Beteiligungen, Gastronomie und Social Media." },
      { titel: "Warum dieser Club", text: "Nicht um mein Leben zu kopieren, sondern um Denkweisen, Fehler und praktische Muster weiterzugeben." },
      { titel: "Keine Erfolgsversprechen", text: "Gleiche Information führt bei verschiedenen Menschen zu unterschiedlichen Ergebnissen. Umsetzung, Ausgangslage und Disziplin entscheiden mit." },
      { titel: "Meine wichtigste Haltung", text: "Bleib korrekt. Reputation, Charakter und das eigene Wort sind langfristiges Kapital." },
    ],
    aufgabe: "Schreibe drei konkrete Ziele auf, die du im Club erreichen willst, und daneben, woran du in 90 Tagen erkennst, ob du wirklich umgesetzt hast.",
    regeln: [
      "Erfahrung ist wertvoll, wenn sie dir unnötige Umwege erspart.",
      "Erfolg ohne Charakter ist für mich kein vollständiger Erfolg.",
      "Je größer du wirst, desto kleiner solltest du werden.",
    ],
  },
  {
    nr: 2,
    kapitelId: "mindset",
    slug: "erfahrung-als-abkuerzung",
    titel: "Wie mir fremde Erfahrung Jahre erspart hätte",
    unter: "Was ich früher gern von jemandem gehört hätte, der es schon hinter sich hatte.",
    kern: "Ich habe die meisten Fehler selbst gemacht, weil niemand da war, der sie mir vorher erzählt hat. Mein Steuer-Lehrgeld im jungen Onlinehandel, später ein Investment, das ich zu wenig geprüft habe. Genau davon erzähle ich hier, damit du wenigstens die Wahl hast.",
    hook: "Manche Fehler kosten 500 Euro. Manche kosten 50.000. Manche kosten dich zwei Jahre. Wenn jemand diesen Fehler bereits gemacht hat und dir ehrlich sagt, woran es lag, wäre es ziemlich teuer, die Warnung zu ignorieren.",
    gliederung: [
      { titel: "Wissen ist nicht Erfahrung", text: "Googelbares Wissen sagt dir oft, was theoretisch funktioniert. Erfahrung zeigt dir, wo es in der Praxis schiefgeht." },
      { titel: "Mein frühes Steuer-Lehrgeld", text: "Beim jungen Onlinehandel dachte ich zuerst ans Geldverdienen, nicht an professionelle Struktur, Steuern und Rücklagen." },
      { titel: "Späteres Investment-Lehrgeld", text: "Ein Produkt und eine Location können großartig wirken, obwohl Zahlen, operative Führung und Kontrolle nicht stimmen." },
      { titel: "Abkürzung bedeutet nicht Abnahme", text: "Niemand kann dir Entscheidungen und Arbeit abnehmen. Eine Abkürzung spart Wege — sie geht sie nicht für dich." },
      { titel: "24-Stunden-Regel", text: "Jede wichtige Erkenntnis sollte möglichst schnell in eine konkrete Handlung übersetzt werden." },
    ],
    aufgabe: "Markiere nach jedem Video genau eine Sache, die du innerhalb von 24 bis 48 Stunden anwenden kannst.",
    regeln: [
      "Erfahrung wird erst dann zur Abkürzung, wenn du handelst.",
      "Ein guter Hinweis kann Jahre sparen — aber nur, wenn du ihn ernst nimmst.",
    ],
  },
  {
    nr: 3,
    kapitelId: "mindset",
    slug: "die-wo-kann-ich-geld-verdienen-mentalitaet",
    titel: "Wie ich angefangen habe, Geld zu verdienen",
    unter: "Sneaker auf eBay, Felgen, Promotion: meine ersten Geschäfte.",
    kern: "Ich bin nicht mit einem Businessplan gestartet, sondern mit einer einfachen Frage im Kopf: Wo kann ich Geld verdienen? Sneaker aus Restposten, meine eigenen Brabus-Felgen, Promotion-Jobs. Klein, aber aus jedem dieser Schritte ist der nächste entstanden.",
    hook: "Ich bin nicht als Jugendlicher aufgestanden und habe gesagt: Ich werde Unternehmer. Ich hatte eher eine simple Frage im Kopf: Wo kann ich Geld verdienen?",
    gliederung: [
      { titel: "Sneaker auf eBay", text: "Restposten und Mitarbeiterpreise trafen auf Käufer, die bestimmte Modelle vor Ort nicht bekommen konnten." },
      { titel: "Felgenhandel", text: "Beim Verkauf eigener Brabus-Felgen fiel mir auf, dass Auktionen und Festpreise unterschiedlich funktionierten. Beobachtung wurde Marktverständnis." },
      { titel: "Chancen sind oft klein", text: "Nicht jede Chance ist ein Start-up. Sie kann mit einem einzelnen Produkt oder einem einzelnen Kunden beginnen." },
      { titel: "Das Muster dahinter", text: "Nachfrage erkennen, Angebot verstehen, Preis- oder Verfügbarkeitslücke finden, klein handeln und lernen." },
      { titel: "Legal professionalisieren", text: "Sobald aus Probieren echtes Geschäft wird: Gewerbe, Buchhaltung, Steuern und Verträge sauber aufsetzen." },
    ],
    aufgabe: "Notiere heute drei Dinge in deinem Alltag, bei denen Menschen Geld ausgeben, obwohl Angebot, Service oder Verfügbarkeit offensichtlich schlecht gelöst sind.",
    regeln: [
      "Frag nicht nur: Was will ich machen? Frag: Wo ist gerade ein ungelöstes Problem?",
      "Chancen werden sichtbar, wenn du Märkte wirklich beobachtest.",
    ],
  },
  {
    nr: 4,
    kapitelId: "mindset",
    slug: "der-red-car-effekt",
    titel: "Warum ich Chancen erst sah, als ich danach gesucht habe",
    unter: "Wie sich meine Wahrnehmung verändert hat, sobald ich ein Ziel im Kopf hatte.",
    kern: "Der Red-Car-Effekt: Sobald ich wusste, was ich suche, habe ich es überall gesehen. Autos haben mich zum Handel gebracht, ein Auto-Rabatt zur Vermögensberatung, eine Beteiligung zur nächsten. Keine Magie, nur Fokus, und dann handeln.",
    hook: "Wenn du dir heute vornimmst, auf rote Autos zu achten, hast du plötzlich das Gefühl, überall rote Autos zu sehen. Sie waren vorher schon da — dein Gehirn hat sie nur nicht priorisiert.",
    gliederung: [
      { titel: "Fokus verändert Wahrnehmung", text: "Wer konkret nach Chancen in einer Branche sucht, bemerkt Gespräche, Preise und Probleme schneller." },
      { titel: "Mein Muster", text: "Autos führten zu Handel, ein Auto-Rabatt zu Vermögensberatung, eine Beteiligung zur nächsten Investmentanfrage." },
      { titel: "Keine Manifestations-Magie", text: "Fokus allein produziert keine Ergebnisse. Er erhöht nur die Wahrscheinlichkeit, relevante Signale zu sehen." },
      { titel: "Ziel klar formulieren", text: "Unscharf: Ich will mehr Geld. Scharf: Ich suche in den nächsten 30 Tagen drei neue B2B-Kunden für Angebot X." },
      { titel: "Handeln", text: "Fokus muss in Gespräche, Recherche, Angebote und Tests übersetzt werden." },
    ],
    aufgabe: "Wähle für sieben Tage genau ein unternehmerisches Thema. Notiere täglich mindestens drei Beobachtungen oder Chancen dazu.",
    regeln: [
      "Du siehst mehr von dem, worauf du deinen Fokus richtest.",
      "Fokus ohne Handlung bleibt Aufmerksamkeit — kein Ergebnis.",
    ],
  },
  {
    nr: 5,
    kapitelId: "mindset",
    slug: "warum-ich-entscheidungen-extrem-schnell-treffe",
    titel: "Warum ich Entscheidungen extrem schnell treffe",
    unter: "Bauchgefühl, Mensch, Business Case, Zahlen, Vertrag. In dieser Reihenfolge.",
    kern: "Ich entscheide schnell, weil ich mit 44 genug gesehen habe, um Signale früh zu lesen. Mein Bauch sagt Ja oder Nein zur Sache, danach schaue ich auf die Person, den Business Case und die Zahlen. Und bevor Geld fließt, kommt der Vertrag.",
    hook: "Ich entscheide oft schnell. Aber schnell entscheiden heißt für mich nicht: ungeprüft Geld überweisen.",
    gliederung: [
      { titel: "Bauchgefühl", text: "Erfahrung verdichtet viele kleine Signale. Das kann eine schnelle erste Einschätzung ermöglichen." },
      { titel: "Die Person", text: "Wie spricht sie? Wie verhält sie sich? Hat sie schon umgesetzt? Ist sie zuverlässig?" },
      { titel: "Business Case", text: "Ist das Angebot langfristig relevant? Gibt es Nachfrage? Ist die Idee ausführbar?" },
      { titel: "Zahlen", text: "Umsatzannahmen, Kosten, Kapitalbedarf, Zeit bis Rückfluss und Worst Case." },
      { titel: "Vertrag vor Geld", text: "Die finale Kette: Bauchgefühl -> Person -> Business Case -> Zahlen -> Vertrag -> Geld." },
    ],
    aufgabe: "Nutze bei deiner nächsten größeren Entscheidung die Sechs-Schritte-Kette und schreibe zu jedem Punkt mindestens einen Satz.",
    regeln: [
      "Schnell entscheiden heißt nicht ungeprüft entscheiden.",
      "Mein Bauch kann das Ob beschleunigen. Das Wie muss trotzdem sauber geprüft werden.",
    ],
  },
  {
    nr: 6,
    kapitelId: "mindset",
    slug: "zu-langsam-vs-zu-schnell",
    titel: "Wo ich zu langsam war und wo zu schnell",
    unter: "Corona-Testzentren und eine Gastro-Beteiligung: einmal zu spät, einmal zu früh.",
    kern: "Bei den Testzentren habe ich Potenzial gesehen und trotzdem gezögert, weil ich Hürden vermutet habe, die es nicht gab. Bei einer Gastro-Beteiligung war ich so begeistert, dass ich die Zahlen nicht tief genug geprüft habe. Beides hat mich Geld gekostet, auf verschiedene Art.",
    hook: "Ich habe Geld verloren, weil ich zu schnell war. Und ich habe Chancen verpasst, weil ich zu langsam war.",
    gliederung: [
      { titel: "Zu langsam", text: "Bei Corona-Testzentren sah ich früh Potenzial, stellte mir die Umsetzung aber komplizierter vor, als sie später teilweise wirkte." },
      { titel: "Lektion", text: "Vermutungen über Hürden müssen überprüft werden. Nicht an einer angenommenen Schwierigkeit stoppen." },
      { titel: "Zu schnell", text: "Bei einer Gastro-Beteiligung überzeugten mich Produkt, Lage und Atmosphäre stärker als die verifizierten Zahlen." },
      { titel: "Lektion", text: "Begeisterung ersetzt keine Due Diligence." },
      { titel: "Richtige Geschwindigkeit", text: "Schnell handeln — aber vorher die entscheidenden Punkte prüfen." },
    ],
    aufgabe: "Nimm eine aktuell offene Entscheidung und markiere: Zögere ich wegen einer echten Hürde oder wegen einer ungeprüften Annahme? Bin ich begeistert, ohne die kritischen Zahlen zu kennen?",
    regeln: [
      "Zu spät kann teuer sein. Zu früh ohne Prüfung auch.",
      "Schnelligkeit braucht einen Mindeststandard an Kontrolle.",
    ],
  },
  {
    nr: 7,
    kapitelId: "mindset",
    slug: "nicht-am-problem-aufhalten-an-der-loesung-arbeiten",
    titel: "Warum ich mich nie am Problem aufhalte",
    unter: "Was mir im Leben und im Vertrieb am meisten geholfen hat.",
    kern: "Ich habe gelernt, ein Problem nicht immer wieder zu erzählen, sondern es anzunehmen und zu fragen: Was kann ich beeinflussen, was war mein Anteil, was tue ich in den nächsten 24 Stunden? Für mich hilft dabei auch der Glaube, nicht an jedem Verlust festzuhalten.",
    hook: "Wenn etwas schiefläuft, kann ich mich tagelang darüber aufregen. Das Problem ist danach immer noch da.",
    gliederung: [
      { titel: "Realität zuerst", text: "Was ist tatsächlich passiert — ohne Drama und ohne Wunschdenken?" },
      { titel: "Kontrolle trennen", text: "Was kann ich beeinflussen, was nicht?" },
      { titel: "Eigene Fehler prüfen", text: "Akzeptieren heißt nicht, nichts daraus zu lernen." },
      { titel: "Nächste Handlung", text: "Welche eine Maßnahme verbessert die Situation heute?" },
      { titel: "Glaube und Akzeptanz", text: "Für mich hilft der Glaube, nicht an jedem Verlust festzuhalten. Vielleicht war etwas nicht für mich bestimmt — die praktische Lektion nehme ich trotzdem mit." },
    ],
    aufgabe: "Schreibe bei einem aktuellen Problem vier Antworten: Was ist Fakt? Was kann ich kontrollieren? Was war mein Anteil? Was tue ich innerhalb von 24 Stunden?",
    regeln: [
      "Nicht mit dem Problem aufhalten, sondern an der Lösung arbeiten.",
      "Akzeptieren heißt nicht, nichts daraus zu lernen.",
    ],
  },
  {
    nr: 9,
    kapitelId: "sales",
    slug: "verkaufen-kann-man-lernen",
    titel: "Wie ich verkaufen gelernt habe",
    unter: "Promotion-Jobs, Mobilfunk, Vermögensberatung: wo ich es gelernt habe.",
    kern: "Ich war kein geborener Verkäufer. Ich hatte viele Kundengespräche am Tag, habe Ablehnung kennengelernt und irgendwann gemerkt, dass sich mit jedem Gespräch meine Sprache verändert. Wer sein Produkt versteht, wirkt sicher. Der Rest kam durch Wiederholung.",
    hook: "Ich glaube nicht, dass gute Verkäufer fertig geboren werden. Ich habe Verkaufen vor allem durch Verkaufen gelernt.",
    gliederung: [
      { titel: "Promotion als Trainingslager", text: "Viele Kundengespräche pro Tag erzeugten schnell Lernkurven." },
      { titel: "Ablehnung normalisieren", text: "Ein Nein ist nicht automatisch eine persönliche Ablehnung." },
      { titel: "Wiederholung schafft Sprache", text: "Mit jedem Gespräch erkennst du Muster, Fragen und Einwände schneller." },
      { titel: "Wissen gibt Sicherheit", text: "Wer Produkt und Nutzen versteht, wirkt natürlicher." },
      { titel: "Lernen durch Praxis", text: "Theorie vorbereiten — dann schnell in echte Gespräche." },
    ],
    aufgabe: "Führe in den nächsten sieben Tagen bewusst mehr echte Verkaufsgespräche als sonst und notiere nach jedem Gespräch einen Lernpunkt.",
    regeln: [
      "Verkaufen lernt man vor allem durch Verkaufen.",
      "Ablehnung ist Feedback — nicht automatisch ein Urteil über dich.",
    ],
  },
  {
    nr: 10,
    kapitelId: "sales",
    slug: "schlagzahl-entscheidet",
    titel: "Warum bei mir die Schlagzahl entschieden hat",
    unter: "Warum ich lieber der Aktivste war als der Talentierteste.",
    kern: "In der Promotion hatte ich so viele Kundenkontakte am Tag, dass Talent zweitrangig wurde. Wer viel macht, sammelt schneller Erfahrung und Chancen. Das gilt bei mir bis heute, auch beim Content: viele gute Versuche schlagen den perfekten Moment.",
    hook: "Du musst nicht immer der talentierteste Verkäufer sein. Wenn du der Aktivste bist und lernst, kannst du sehr weit kommen.",
    gliederung: [
      { titel: "Hohe Aktivität", text: "In der Promotion waren sehr viele Kundenkontakte normal." },
      { titel: "Leistung sichtbar machen", text: "Ergebnisgruppen und Anerkennung können positiven Wettbewerb erzeugen." },
      { titel: "Qualität plus Masse", text: "Masse ohne Qualität nervt. Qualität ohne Sichtbarkeit wird nicht bemerkt." },
      { titel: "1-Prozent-Prinzip", text: "Jeden Tag minimal besser in Sprache, Produktwissen und Kundenverständnis." },
      { titel: "Schlagzahl auch bei Content", text: "Viele gute Versuche erhöhen die Chance, dass etwas funktioniert — ohne Garantie." },
    ],
    aufgabe: "Definiere deine persönliche Schlagzahl für die nächsten 14 Tage: Anrufe, Gespräche, Angebote oder Content-Pieces.",
    regeln: [
      "Schlagzahl entscheidet oft mehr als Talent.",
      "Qualität ohne Sichtbarkeit reicht nicht. Masse ohne Qualität auch nicht.",
    ],
  },
  {
    nr: 12,
    kapitelId: "sales",
    slug: "verkaufe-nichts-woran-du-nicht-glaubst",
    titel: "Warum ich nichts verkaufe, woran ich nicht glaube",
    unter: "Dyson, Mobilfunk, Vermögensberatung: was ich verkaufen konnte und was nicht.",
    kern: "Ich habe schnell gemerkt, dass ich nur dann gut verkaufe, wenn ich selbst überzeugt bin. Bei Dyson war das so, in der Vermögensberatung auch, je besser ich die Konzepte verstanden habe. Was nicht passt, verkaufe ich nicht. Ein gutes Produkt ist übrigens noch lange kein gutes Investment.",
    hook: "Wenn ich selbst innerlich denke, dass ein Angebot schlecht ist, warum soll ich den Kunden mit Begeisterung davon überzeugen?",
    gliederung: [
      { titel: "Dyson-Erfahrung", text: "Ein Produkt, an dessen Qualität und Nutzen du glaubst, lässt sich natürlicher erklären." },
      { titel: "Vermögensberatung", text: "Je besser ich Konzepte verstanden habe, desto überzeugter konnte ich Nutzen erklären." },
      { titel: "Keine blinde Loyalität", text: "Glauben heißt nicht, Nachteile zu verschweigen." },
      { titel: "Kunde statt Abschluss", text: "Wenn etwas nicht passt, sollte der Abschluss nicht wichtiger sein als die Beziehung." },
      { titel: "Unterschied Produkt/Investment", text: "Ein Produkt kann großartig sein und das Unternehmen dahinter trotzdem operative Probleme haben." },
    ],
    aufgabe: "Bewerte dein aktuelles Hauptangebot von 1 bis 10: Produktnutzen, Preis-Leistung, Service, ehrliche Begeisterung. Alles unter 8 bekommt eine konkrete Verbesserungsmaßnahme.",
    regeln: [
      "Überzeugung ist stärker als ein auswendig gelernter Pitch.",
      "Ein gutes Produkt ist noch kein Beweis für ein gutes Investment.",
    ],
  },
  {
    nr: 13,
    kapitelId: "sales",
    slug: "drei-kundentypen",
    titel: "Die drei Kundentypen, die mir immer wieder begegnen",
    unter: "Dominant, skeptisch, unentschlossen: wie ich mit jedem anders spreche.",
    kern: "Mir begegnen im Vertrieb immer wieder dieselben drei Typen. Dem Gesprächigen gebe ich Raum, beim Skeptischen werde ich langsamer und sachlicher, beim Unentschlossenen suche ich den echten offenen Punkt. Tempo und Ton passe ich an, die Fakten nie.",
    hook: "Der gleiche Satz kann bei einem Kunden Vertrauen schaffen und beim nächsten komplett falsch wirken.",
    gliederung: [
      { titel: "Dominant und gesprächig", text: "Raum geben, nicht in unnötige Ego-Konflikte gehen, klar bleiben." },
      { titel: "Ruhig und skeptisch", text: "Langsamer, sachlicher, Sicherheit durch nachvollziehbare Informationen." },
      { titel: "Interessiert, aber unentschlossen", text: "Den echten offenen Punkt herausarbeiten statt künstlich Druck zu erzeugen." },
      { titel: "Beobachten statt etikettieren", text: "Typen sind Orientierung, keine Schubladen." },
      { titel: "Sprache anpassen", text: "Tempo, Detailtiefe und Fragen variieren — Fakten bleiben gleich." },
    ],
    aufgabe: "Ordne deine letzten fünf Verkaufsgespräche grob einem Typ zu und notiere, wo du deine Kommunikation besser hättest anpassen können.",
    regeln: [
      "Passe die Kommunikation an — nicht die Wahrheit.",
      "Wer den Menschen versteht, muss weniger Druck erzeugen.",
    ],
  },
  {
    nr: 14,
    kapitelId: "sales",
    slug: "das-ist-mir-zu-teuer",
    titel: "Wie ich mit „zu teuer“ umgehe",
    unter: "Der Satz, den jeder Verkäufer kennt, und was ich daraus mache.",
    kern: "Wenn ein Kunde sagt, das ist zu teuer, frage ich mich zuerst: teuer im Vergleich zu was? Dann erkläre ich, was er bekommt, Service, Erreichbarkeit, Begleitung. Wenn ein Wettbewerber wirklich günstiger ist, sage ich das auch. Rabatt gebe ich nicht aus Nervosität.",
    hook: "Wenn ein Kunde sagt: Das ist teuer, ist meine erste Frage im Kopf: Teuer im Vergleich zu was?",
    gliederung: [
      { titel: "Bedeutung klären", text: "Budgetproblem, Wettbewerbsvergleich oder fehlender wahrgenommener Nutzen?" },
      { titel: "Ehrlich bleiben", text: "Wenn ein Wettbewerber günstiger ist, sage nicht so, als wäre er es nicht." },
      { titel: "Wert erklären", text: "Service, Begleitung, Fachwissen, Verfügbarkeit und tatsächlicher Leistungsumfang." },
      { titel: "Kein Zwang", text: "Wenn Nutzen und Preis für den Kunden nicht passen, ist nicht jeder Kunde der richtige Kunde." },
      { titel: "Rabatt erst mit Grund", text: "Nicht aus Nervosität den eigenen Preis zerstören." },
    ],
    aufgabe: "Schreibe für dein Angebot fünf konkrete Wertpunkte auf, die über den reinen Produktpreis hinausgehen.",
    regeln: [
      "„Zu teuer“ ist eine Frage, kein automatischer Rabattbefehl.",
      "Vergleiche Preis plus Leistung — nicht nur Preis.",
    ],
  },
  {
    nr: 15,
    kapitelId: "sales",
    slug: "warum-ich-kunden-gehen-lasse",
    titel: "Warum ich Kunden gehen lasse",
    unter: "Warum ich lieber einen Abschluss verliere als das Vertrauen.",
    kern: "Ich habe Kunden gehen lassen, die noch nicht so weit waren, und viele kamen zurück. Wer sich gedrängt fühlt, kauft vielleicht einmal und bereut es dann. Gerade in der Beratung lebt alles von Vertrauen über Jahre. Nachfragen ja, zwingen nie.",
    hook: "Ein guter Verkäufer muss selbstbewusst genug sein, einen Kunden gehen zu lassen.",
    gliederung: [
      { titel: "Kein künstlicher Druck", text: "Wenn jemand wirklich Zeit braucht, darf er Zeit bekommen." },
      { titel: "Echter Einwand vs. Ausrede", text: "Nachfragen ist legitim — Zwingen nicht." },
      { titel: "Langfristige Beziehung", text: "Gerade Beratung lebt von Vertrauen über Jahre." },
      { titel: "Buyer’s Remorse vermeiden", text: "Ein erzwungener Abschluss kann nachträglich mehr Probleme erzeugen als Nutzen." },
      { titel: "Selbstvertrauen", text: "Wer Wert liefert, muss nicht jeden Menschen festhalten." },
    ],
    aufgabe: "Formuliere eine saubere Abschlussfrage und eine ebenso saubere Exit-Formulierung, wenn der Kunde heute nicht entscheiden möchte.",
    regeln: [
      "Nicht jeder verlorene Abschluss ist ein verlorener Kunde.",
      "Vertrauen ist langfristig oft wertvoller als ein erzwungenes Ja.",
    ],
  },
  {
    nr: 16,
    kapitelId: "sales",
    slug: "wie-ich-einen-ferrari-um-ca-20-000-euro-runtergehandelt-habe",
    titel: "Wie ich einen Ferrari um ca. 20.000 Euro runtergehandelt habe",
    unter: "Verhandeln kann ich auch privat, und das hat sich gelohnt.",
    kern: "Bevor ich meinen ersten Ferrari gekauft habe, habe ich den Markt monatelang beobachtet. Ich kannte die Preise, die Alternativen, die Lage des Händlers und meine eigene Grenze. Am Ende waren es rund 20.000 Euro weniger, ohne einen einzigen Trick.",
    hook: "Der Ferrari stand nach meiner Erinnerung für ungefähr 270.000 Euro beim Händler. Gekauft habe ich ihn für etwa 250.000. Der wichtigste Teil der Verhandlung passierte aber vor dem ersten Gespräch.",
    gliederung: [
      { titel: "Markt beobachten", text: "Vergleichbare F8 lagen nach meiner damaligen Wahrnehmung häufig höher." },
      { titel: "Händlerlogik verstehen", text: "Markenfremdes Fahrzeug, Kapitalbindung, Marge und Standzeit als relevante Faktoren." },
      { titel: "Klare Zahl", text: "Ein nachvollziehbares Angebot mit Budget und Argumenten statt endlosem Feilschen." },
      { titel: "Kaufbereitschaft", text: "Ein Verkäufer bewertet ein sofort umsetzbares Angebot anders als unverbindliches Interesse." },
      { titel: "Walk-away", text: "Ich wollte das Auto — aber ich musste genau dieses Angebot nicht um jeden Preis haben." },
    ],
    aufgabe: "Bereite deine nächste Verhandlung auf einer Seite vor: Marktpreis, Verkäuferinteresse, dein Zielpreis, dein Maximalpreis, drei echte Argumente und deine Alternative.",
    regeln: [
      "Verhandeln beginnt mit Marktkenntnis.",
      "Ich will es haben — aber ich muss es nicht haben.",
    ],
  },
  {
    nr: 17,
    kapitelId: "business",
    slug: "superfoods-fuenfstelliges-lehrgeld",
    titel: "Superfoods: mein teuerstes Lehrgeld",
    unter: "Ein Café in der Schlüterstraße, 45 Prozent Anteil, ein paar Hunderttausend weg.",
    kern: "Ich mochte den Laden, die Straße, die Inhaberin. Also habe ich investiert, aus dem Bauch heraus, ohne Zahlen, ohne ins Tagesgeschäft zu schauen. Es gab Red Flags, ich habe sie ignoriert. Heute prüfe ich alles, egal wie gut etwas von außen aussieht.",
    hook: "Ich mochte das Produkt. Ich mochte die Location. Ich mochte die Atmosphäre. Genau das war ein Teil meines Problems: Ich war emotional schon überzeugt, bevor ich die Zahlen tief genug geprüft hatte.",
    gliederung: [
      { titel: "Einstieg", text: "Ich beteiligte mich mit 45 Prozent an einem Gastro-Konzept, das ich bereits als Kunde mochte." },
      { titel: "Annahmen", text: "Mir wurden nach meiner Erinnerung frühere Tagesumsätze im Bereich von etwa 3.000 bis 4.000 Euro genannt." },
      { titel: "Mein Fehler", text: "Ich verließ mich zu stark auf Aussagen und sichtbare Auslastung statt auf vollständige Verifikation." },
      { titel: "Spätere Probleme", text: "Nach meiner persönlichen Darstellung zeigten sich erhebliche operative und finanzielle Probleme. Die Details gehören juristisch sauber behandelt; für die Lektion reicht: mein Investment erlitt einen fünfstelligen Verlust." },
      { titel: "Due Diligence", text: "Bank, BWA/Jahreszahlen, Mietrückstände, Verträge, offene Verbindlichkeiten, Kasse, Personal, Steuern und Reporting prüfen." },
    ],
    aufgabe: "Baue für jedes zukünftige Investment eine Due-Diligence-Liste und hake nichts aufgrund von Sympathie oder mündlichen Aussagen ab.",
    regeln: [
      "Ein voller Laden ist kein Beweis für Profitabilität.",
      "Vertrauen und Kontrolle schließen sich nicht aus.",
    ],
  },
  {
    nr: 18,
    kapitelId: "business",
    slug: "250-000-euro-und-handschlag-warum-ein-vertrag-trotzdem-pflic",
    titel: "250.000 Euro per Handschlag — und was ich daraus gelernt habe",
    unter: "Ein Chicken-Konzept, ein Freund, kein Vertrag.",
    kern: "Ich habe 250.000 Euro in ein Projekt gegeben, das auf einer mündlichen Absprache beruhte, weil es sich wie Familie angefühlt hat. Die Gegenseite hat es sich anders überlegt, und ich stand fast ohne alles da. Seitdem gibt es bei mir keinen Deal ohne Vertrag, egal wie nah man sich steht.",
    hook: "Ich habe lange sehr stark nach meinem eigenen Prinzip gelebt: Mein Wort gilt — also gehe ich davon aus, dass das Wort des anderen auch gilt. Unternehmerisch reicht das nicht.",
    gliederung: [
      { titel: "Geplantes Projekt", text: "Bei einem größeren Gastro-Vorhaben war bereits eine Investitionssumme von ungefähr 250.000 Euro geflossen." },
      { titel: "Veränderung", text: "Später entwickelte sich das Projekt nicht so, wie es ursprünglich geplant war." },
      { titel: "Selbstkritik", text: "Ein früher, klarer Vertrag hätte meine Position und die Konsequenzen eines Meinungswechsels sauberer geregelt." },
      { titel: "Was geregelt werden muss", text: "Kapital, Eigentum, Pflichten, Entscheidungsrechte, Fristen, Exit, Rückzahlung, Vermögenswerte, Streitfall." },
      { titel: "Experten", text: "KI kann Verträge vorstrukturieren oder Fragen markieren. Bei hohen Summen ersetzt sie keinen qualifizierten Anwalt." },
    ],
    aufgabe: "Prüfe einen aktuellen Deal: Welche fünf Situationen würden euch heute in Streit bringen, weil sie nicht schriftlich geregelt sind?",
    regeln: [
      "Vertrauen ist gut für die Beziehung. Ein Vertrag ist gut für den Moment, in dem die Beziehung nicht mehr funktioniert.",
      "Bauchgefühl -> Person -> Business Case -> Zahlen -> Vertrag -> Geld.",
    ],
  },
  {
    nr: 19,
    kapitelId: "business",
    slug: "ferrari-gestohlen-was-ich-daraus-gelernt-habe",
    titel: "Ferrari gestohlen — was ich daraus gelernt habe",
    unter: "Mein erster Ferrari wurde vor meiner Haustür gestohlen, nach genau einem Jahr.",
    kern: "Alle hatten gesagt, hol dir eine Garage. Ich fand es zu umständlich. Eines Sonntags war der Wagen weg. Ich war vollkaskoversichert, und die Versicherung hat sogar auf Basis des gestiegenen Marktwerts reguliert. Vorher habe ich über die Beiträge gemeckert, danach nicht mehr.",
    hook: "Mein F8 wurde gestohlen. In meinem Fall zahlte die Versicherung nach meiner Erinnerung ungefähr 320.000 Euro — mehr als mein damaliger Kaufpreis. Aber das war keine Strategie, sondern ein Versicherungsfall.",
    gliederung: [
      { titel: "Kaufpreis und Markt", text: "Der Wagen war günstig eingekauft und der Markt hatte sich danach stark entwickelt." },
      { titel: "Versicherung ist Risikotransfer", text: "Sie soll einen Schaden abfedern, nicht Spekulation ermöglichen." },
      { titel: "Drei Risikofragen", text: "Was kann ich vermeiden? Was kann ich reduzieren? Was kann ich übertragen?" },
      { titel: "Schutz kostet Geld", text: "Versicherungsprämie, Rechtsberatung und Kontrollen wirken teuer — bis ein Schaden eintritt." },
      { titel: "Vermögen behalten", text: "Geld verdienen und Geld behalten sind zwei verschiedene Fähigkeiten." },
    ],
    aufgabe: "Führe für ein wichtiges Asset einen Risiko-Check durch: Diebstahl, Ausfall, Haftung, Vertrag, Versicherung, Reserve, Notfallplan.",
    regeln: [
      "Vermögen aufzubauen ist nur die Hälfte. Du musst es auch schützen.",
      "Versicherung ist Schutz — kein Geschäftsmodell.",
    ],
  },
  {
    nr: 20,
    kapitelId: "business",
    slug: "zeit-gegen-geld-oder-team",
    titel: "Warum ich aufgehört habe, nur meine Zeit zu verkaufen",
    unter: "Acht Stunden am Tag sind die Grenze, wenn du nur deine eigene Zeit verkaufst.",
    kern: "Im Job und in der Selbstständigkeit habe ich Zeit gegen Geld getauscht, und die Zeit war irgendwann voll. Was mich an der Vermögensberatung gereizt hat: Ich kann Leute ausbilden und werde für ihren Erfolg mitentlohnt. Das lässt sich ausbauen, meine Stunden nicht.",
    hook: "Meine eigene Zeit ist beschränkt. Mitarbeiter ausbilden kann man theoretisch unendlich.",
    gliederung: [
      { titel: "Die Grenze", text: "Acht Stunden am Tag, egal ob angestellt oder selbstständig. Mehr Zeit hast du nicht zu verkaufen." },
      { titel: "Der Hebel", text: "Ein Team aufbauen, Leute ausbilden und für deren Erfolg mitverdienen." },
      { titel: "Eigenleistung", text: "Selbst weiter etwas machen bleibt wichtig, aber nicht mehr mit Vollgas allein." },
      { titel: "Beide Seiten", text: "Für den Neuen gibt es jemanden, der zeigt, wie es läuft. Für dich wird Einkommen skalierbar." },
    ],
    aufgabe: "Rechne aus, wie viele Stunden du pro Woche selbst verkaufen kannst, und schreib auf, was sich davon an andere übergeben ließe.",
    regeln: [
      "Wer nur seine eigene Zeit verkauft, hat eine Obergrenze.",
      "Andere erfolgreich machen ist der einzige Weg, ohne Zeitlimit zu wachsen.",
    ],
  },
  {
    nr: 21,
    kapitelId: "business",
    slug: "nicht-jeder-ist-wie-er-am-anfang-wirkt",
    titel: "Wie ich Menschen im Team einschätze",
    unter: "Am Anfang sind alle heiß. Ich schaue, wer nach vier Wochen noch da ist.",
    kern: "Wenn jemand hört, dass einer im ersten Monat 20.000 Euro verdient hat, ist er erst mal Feuer und Flamme. Ich habe gelernt, das nicht zu verwechseln mit ernsthaftem Interesse. Und ich habe gelernt, dass es auch an mir liegt, Leute am Ball zu halten. Manche sind Slow-Starter.",
    hook: "Hier hält nur durch, wer langfristig am Ball bleibt. Die Anfangszeit ist immer ein bisschen holprig.",
    gliederung: [
      { titel: "Der Hype", text: "Verdienstmöglichkeiten klingen verrückt. Dieser Antrieb allein hält nicht." },
      { titel: "Ernsthaftes Interesse", text: "Wer nur kurzfristig heiß ist, kostet dich Ausbildungszeit, die du nie zurückbekommst." },
      { titel: "Deine Verantwortung", text: "Es hängt nicht nur am Neuen. Du musst Leute motivieren und am Ball halten können." },
      { titel: "Slow-Starter", text: "Nicht jeder bricht im ersten Monat Rekorde. Manche entwickeln sich über die Zeit." },
    ],
    aufgabe: "Denk an eine Person, die du gerade aufbauen willst. Woran machst du fest, dass ihr Interesse länger hält als die ersten vier Wochen?",
    regeln: [
      "Realistische Erwartungen wecken, nicht die Ausnahme verkaufen.",
      "Ausbildung ist eine Investition. Investiere sie in Leute, die bleiben.",
    ],
  },
  {
    nr: 22,
    kapitelId: "business",
    slug: "menschen-fuehren-ohne-hinterherzulaufen",
    titel: "Wie ich führe, ohne hinterherzulaufen",
    unter: "Ausbilden ja, hinterherlaufen nein. Wir sind Geschäftspartner, nicht Eltern.",
    kern: "Je größer mein Team wurde, desto weniger konnte ich jeden einzeln betreuen. Viele kamen aus dem Angestelltenverhältnis, waren plötzlich frei und haben weniger gearbeitet als vorher. Bei mir hat nur funktioniert, wer mindestens die gleiche Zeit investiert hat wie früher im Job.",
    hook: "Viele kommen aus acht Stunden am Tag, sind auf einmal selbstständig und arbeiten nur noch drei. Das ist ein Irrglaube.",
    gliederung: [
      { titel: "Die Rolle", text: "Ausbilden ja, hinterherlaufen nein. Bei einem großen Team geht das gar nicht anders." },
      { titel: "Eigeninitiative", text: "Selbst Wissen aneignen, zu jedem Meeting kommen. Das muss selbstverständlich sein." },
      { titel: "Die Zeitfalle", text: "Freie Zeiteinteilung ist ein Vorteil. Weniger arbeiten als vorher ist es nicht." },
      { titel: "Der Fokus", text: "Je mehr Zeit du investierst, desto schneller sitzt alles. Du machst es am Ende für dich selbst." },
    ],
    aufgabe: "Schreib deine Wochenstunden der letzten vier Wochen auf und vergleiche sie ehrlich mit deiner Zeit im Angestelltenverhältnis.",
    regeln: [
      "Du kannst Leute an die Hand nehmen, aber nicht für sie laufen.",
      "Mindestens so viel Zeit wie vorher. Sonst wird es nichts.",
    ],
  },
  {
    nr: 27,
    kapitelId: "geld",
    slug: "mehr-verdienen-statt-dich-kaputtzusparen",
    titel: "Warum ich lieber mehr verdiene, als mich kaputtzusparen",
    unter: "Ich frage nicht, wo ich 100 Euro sparen kann, sondern wie ich 1.000 mehr verdiene.",
    kern: "Sparen hat einen Boden, Einkommen nicht. Ich habe lieber Gas gegeben, mehr verdient und ein paar Jahre durchgezogen, als mich kleinzusparen. Das heißt nicht, dass ich Geld verschwende. Es heißt, dass ich meine Energie in den größeren Hebel stecke.",
    hook: "Du kannst jeden Tag überlegen, wo du noch vier Euro Kaffee sparst. Oder du fragst zusätzlich: Wie kann ich 1.000 Euro mehr verdienen?",
    gliederung: [
      { titel: "Sparen hat einen Boden", text: "Du kannst Ausgaben nicht unter null drücken." },
      { titel: "Einkommen hat mehr Spielraum", text: "Mehr Wert schaffen, mehr Menschen erreichen, besser monetarisieren." },
      { titel: "Kein Freifahrtschein für Verschwendung", text: "Hoher Umsatz rettet niemanden, der alles ausgibt." },
      { titel: "Drei Einkommenshebel", text: "Wert pro Kunde, Anzahl relevanter Kontakte, zusätzliche sinnvolle Angebote." },
      { titel: "Reihenfolge", text: "Verdienen -> behalten -> sinnvoll einsetzen -> wiederholen." },
    ],
    aufgabe: "Notiere drei unnötige Kosten und drei konkrete Hebel, mit denen du innerhalb von 30 Tagen dein Einkommen erhöhen könntest.",
    regeln: [
      "Ich frage nicht zuerst, wo ich noch 100 Euro sparen kann. Ich frage: Wie kann ich 1.000 Euro mehr verdienen?",
      "Mehr verdienen ersetzt nicht die Pflicht, Geld zu behalten.",
    ],
  },
  {
    nr: 28,
    kapitelId: "geld",
    slug: "umsatz-ist-nicht-dein-geld",
    titel: "Als ich gelernt habe, dass Umsatz nicht mein Geld ist",
    unter: "Meine erste Steuernachzahlung als junger Händler.",
    kern: "Das Geld kam aufs Konto, und ich dachte, es gehört mir. Dann kam das Finanzamt. Seitdem trenne ich im Kopf: Umsatz, Gewinn, das, was wirklich frei ist, und das, was schon jemand anderem gehört. Reserven zuerst, dann der Rest.",
    hook: "100.000 Euro auf deinem Geschäftskonto bedeuten nicht automatisch, dass du 100.000 Euro ausgeben kannst.",
    gliederung: [
      { titel: "Frühe Steuerlektion", text: "Als junger Händler dachte ich zu wenig an Rücklagen und spätere Steuerforderungen." },
      { titel: "Umsatz", text: "Alles, was reinkommt." },
      { titel: "Gewinn", text: "Was nach betrieblichen Kosten verbleibt — steuerlich trotzdem differenziert." },
      { titel: "Liquidität", text: "Was tatsächlich verfügbar ist, wenn Verpflichtungen fällig werden." },
      { titel: "Geldtöpfe im Kopf", text: "Steuern/Abgaben, Betrieb, Reserve, Reinvestition, wirklich frei verfügbar." },
    ],
    aufgabe: "Erstelle für deine Firma eine einfache Liquiditätsübersicht mit offenen Steuern, Fixkosten, Rücklagen und tatsächlich frei verfügbarem Geld.",
    regeln: [
      "Umsatz ist nicht Gewinn. Gewinn ist nicht automatisch frei verfügbares Geld.",
      "Der Kontostand ist keine Gewinn- und Verlustrechnung.",
    ],
  },
  {
    nr: 29,
    kapitelId: "geld",
    slug: "warum-ein-guter-steuerberater-geld-wert-ist",
    titel: "Warum ein guter Steuerberater Geld wert ist",
    unter: "Warum mein Steuerberater eine meiner wichtigsten Kostenpositionen ist.",
    kern: "Viele Gestaltungen sind zu spät, wenn man erst nach dem Jahr fragt. Ich habe gelernt, große Entscheidungen vorher zu besprechen und nicht am Berater zu sparen. Verstehen muss ich meine Zahlen trotzdem selbst, die Verantwortung bleibt bei mir.",
    hook: "Ich möchte keinen Steuerberater, der mir sechs Monate später nur sagt, was passiert ist. Ich möchte jemanden, der rechtzeitig mitdenkt.",
    gliederung: [
      { titel: "Zu spät ist teuer", text: "Viele steuerliche Gestaltungsmöglichkeiten müssen vor einer Entscheidung geprüft werden." },
      { titel: "Proaktive Beratung", text: "Nicht Tricks, sondern legale Struktur, Planung und Hinweise." },
      { titel: "Unternehmer bleibt verantwortlich", text: "Du solltest Umsatz, Kosten, Steuern und Liquidität grob verstehen." },
      { titel: "Qualität statt billig", text: "Ein guter Berater kann bei großen Entscheidungen mehr wert sein als die Honorardifferenz." },
      { titel: "Spezialisten", text: "Bei komplexen Themen Fachanwalt, Steuerberater oder weitere Experten hinzunehmen." },
    ],
    aufgabe: "Liste die drei größten Entscheidungen der nächsten sechs Monate auf und kläre, welche davon vorab steuerlich oder rechtlich geprüft werden sollten.",
    regeln: [
      "Gute Beratung beginnt vor der Entscheidung, nicht nach dem Schaden.",
      "Steueroptimierung bedeutet legal strukturieren — nicht Regeln umgehen.",
    ],
  },
  {
    nr: 31,
    kapitelId: "geld",
    slug: "warum-ich-trotzdem-gerne-geld-ausgebe",
    titel: "Warum ich trotzdem gerne Geld ausgebe",
    unter: "Geld ist auch da, um zu leben. Ich verschiebe nicht alles auf später.",
    kern: "Ich habe gerade erklärt, warum ich reinvestiere. Aber ich gönne mir auch etwas, ohne auf jeden Cent zu schauen, weil niemand weiß, wie lange er hat. Der Unterschied: bewusst ausgeben, nicht auf Kredit für Applaus. Und Konsum ist kein Investment.",
    hook: "Ich mag Autos. Ich mag gute Restaurants. Ich reise gerne. Ich werde euch nicht erzählen, dass jeder Euro, den ich ausgebe, ein Investment ist.",
    gliederung: [
      { titel: "Geld hat mehrere Aufgaben", text: "Sicherheit, Wachstum, Lebensqualität und Wirkung." },
      { titel: "Leben ist nicht unendlich aufschiebbar", text: "Ich möchte nicht alles für einen späteren Zeitpunkt sparen, an dem ich bestimmte Dinge vielleicht gar nicht mehr genießen kann." },
      { titel: "Kein Applaus auf Kredit", text: "Lifestyle ist problematisch, wenn er nur der Außenwirkung dient und die eigene finanzielle Stabilität zerstört." },
      { titel: "Lifestyle und Brand", text: "Bei mir wird echtes Leben zusätzlich Content — das macht die Ausgabe nicht automatisch zu einer wirtschaftlichen Investition." },
      { titel: "Balance", text: "Genießen, ohne Verpflichtungen, Rücklagen und Zukunft zu ignorieren." },
    ],
    aufgabe: "Prüfe deine drei größten freiwilligen Ausgaben des letzten Jahres: echter Nutzen, Statusdruck, finanzieller Stress, Wiederholungswert.",
    regeln: [
      "Geld soll dir auch Lebensqualität geben — aber nicht deine Freiheit zerstören.",
      "Kaufe keinen Applaus auf Kredit.",
    ],
  },
  {
    nr: 32,
    kapitelId: "geld",
    slug: "wenn-lifestyle-zu-content-wird",
    titel: "Wenn Lifestyle zu Content wird",
    unter: "Wie aus meinem Alltag auf Instagram echte Chancen wurden.",
    kern: "Autos, Reisen, Unternehmertum habe ich gepostet, lange bevor ich das Content genannt habe. Menschen haben gesehen, wie ich lebe und arbeite, und so kamen Kontakte zustande. Das funktioniert nur, wenn das Leben echt ist. Erzwungen merkt man es sofort.",
    hook: "Ich habe den Lifestyle nicht aufgebaut, um Content zu haben. Irgendwann hat jemand erkannt: Dein echtes Leben ist bereits Content.",
    gliederung: [
      { titel: "Vor professionellem Content", text: "Autos, Reisen und Unternehmertum waren schon da." },
      { titel: "Exklusiver Zugang", text: "Menschen interessieren sich für Prozesse, Käufe, Konfigurationen, Reisen und Erlebnisse, die sie selbst nicht täglich sehen." },
      { titel: "Zeig den Weg", text: "Nicht nur das fertige Auto, sondern Auswahl, Kauf, Probleme, Nutzung und Geschichte." },
      { titel: "Positionierung", text: "Nach meiner ersten Beteiligung schrieb ich „Investor“ in die Bio — eine echte neue Rolle wurde sichtbar und führte zu neuen Kontakten." },
      { titel: "Content-Asset", text: "Business -> Lifestyle -> Content -> Aufmerksamkeit -> mögliche Chancen." },
    ],
    aufgabe: "Liste zehn Dinge aus deiner normalen Woche, die für deine Zielgruppe interessant sein könnten. Produziere daraus innerhalb von sieben Tagen ein ehrliches Video.",
    regeln: [
      "Zeig nicht nur, was du hast — nimm Menschen in den Weg und die Geschichte mit.",
      "Ich kaufe keinen Lifestyle für Social Media. Ich lebe ihn — Social Media macht daraus zusätzlich Content.",
    ],
  },
  {
    nr: 33,
    kapitelId: "geld",
    slug: "kreditkarten-punkte-und-vorteile-richtig-nutzen",
    titel: "Wie ich Kreditkarten und Punkte für mich nutze",
    unter: "Bei allem schaue ich, wo für mich ein Vorteil drin ist. Auch bei der Karte.",
    kern: "Ich gebe viel Geld aus, also sammle ich Punkte darauf und tausche sie in Meilen, Flüge, Upgrades. Die Jahresgebühr rechne ich gegen das, was ich wirklich nutze. Punkte auf Ausgaben, die ich sowieso habe. Nie Ausgaben wegen der Punkte.",
    hook: "Wenn ich Geld sowieso ausgebe, möchte ich wenigstens einen zusätzlichen Vorteil aus dieser Ausgabe ziehen.",
    gliederung: [
      { titel: "Jahresgebühr rückwärts rechnen", text: "Nicht nur fragen, was die Karte kostet, sondern welche Leistungen du tatsächlich nutzt." },
      { titel: "Persönlicher Wert", text: "Ein beworbener Vorteil ist für dich nur so viel wert, wie du ihn wirklich nutzt." },
      { titel: "Punkte nur auf ohnehin geplante Ausgaben", text: "Wer unnötig 1.000 Euro ausgibt, um Punkte zu sammeln, hat kein Geld gespart." },
      { titel: "Reisen und Komfort", text: "Punkte, Flüge, Upgrades, Mietwagen- oder Lounge-Vorteile können für Vielreisende relevant sein; Bedingungen ändern sich." },
      { titel: "Zahlungszeit ist kein Vermögen", text: "Abrechnungszyklen können kurzfristig Liquidität erhalten. Die Rechnung bleibt trotzdem real." },
      { titel: "Business-Hinweis", text: "Kartenauszüge ersetzen keine Belege, Rechnungen und ordentliche Buchhaltung." },
    ],
    aufgabe: "Rechne die letzten zwölf Monate deiner Karte: Gebühr + Zuschläge + Zinsen minus realistisch genutzte Vorteile und Punkte. Ist der Netto-Nutzen positiv?",
    regeln: [
      "Punkte sind ein Bonus auf Ausgaben — kein Grund für Ausgaben.",
      "Liquidität auf Zeit ist kein zusätzliches Vermögen.",
      "Geplante Ausgabe -> passende Zahlungsmethode -> Zusatznutzen -> vollständig begleichen.",
    ],
  },
  {
    nr: 34,
    kapitelId: "geld",
    slug: "bar-bezahlen-ist-nicht-automatisch-schlau",
    titel: "Warum ich nicht alles bar bezahle",
    unter: "Warum ich mit einer Million auf dem Konto trotzdem finanziere.",
    kern: "Wenn ich alles bar bezahle, ist das Kapital gebunden und ich kann nicht mehr handeln. Finanzierung hält mich liquide, gerade bei Immobilien und Fahrzeugen. Der Hebel wirkt in beide Richtungen, das weiß ich. Deshalb vergleiche ich vorher: bar, finanziert oder gar nicht.",
    hook: "Nur weil du etwas bar bezahlen kannst, heißt das für mich nicht automatisch, dass du es bar bezahlen solltest.",
    gliederung: [
      { titel: "Liquidität ist Handlungsfähigkeit", text: "Gebundenes Kapital kann nicht gleichzeitig für Reserve oder neue Chancen eingesetzt werden." },
      { titel: "Immobilienbeispiel", text: "100.000 Euro können theoretisch vollständig in ein Objekt oder — wenn Finanzierung und Risiko passen — als Eigenkapital für mehrere Investments eingesetzt werden." },
      { titel: "Hebel wirkt in beide Richtungen", text: "Fremdkapital kann Eigenkapitalrendite verstärken, aber auch Verluste und Zahlungsdruck." },
      { titel: "Monatsrate ist nicht Gesamtkosten", text: "Anzahlung, Zins, Schlussrate, Wartung, Versicherung und Wertverlust mitrechnen." },
      { titel: "Alternative Verwendung", text: "Freies Kapital ist nur dann ein Vorteil, wenn es sinnvoll genutzt oder als Reserve gehalten wird." },
      { titel: "Sichere Kosten vs. erwartete Rendite", text: "Finanzierungskosten sind real; alternative Renditen sind häufig nur Prognosen." },
    ],
    aufgabe: "Vergleiche für eine große Anschaffung drei Szenarien: bar, finanziert, nicht kaufen. Prüfe Kosten, Restliquidität, Risiko und Worst Case.",
    regeln: [
      "Vermögen und Liquidität sind nicht dasselbe.",
      "Hebel verstärkt Gewinne — und Fehler.",
      "Finanzierung ist ein Werkzeug, keine Religion.",
    ],
  },
  {
    nr: 35,
    kapitelId: "geld",
    slug: "preise-recherchieren",
    titel: "Wie ich Preise recherchiere, bevor ich kaufe",
    unter: "Wenn mich etwas interessiert, analysiere ich es bis ins letzte Detail.",
    kern: "Beim Ferrari habe ich den ganzen Markt beobachtet, bevor ich gekauft habe. Der Angebotspreis ist nicht der Marktwert, das Billigste ist nicht das Beste. Bei 20 Euro recherchiere ich nicht zwei Stunden, bei großen Summen schon. Oder ich hole jemanden, der es kann.",
    hook: "Wenn mich etwas interessiert, recherchiere ich so lange, bis ich ein Gefühl dafür bekomme, was teuer, günstig und fair ist.",
    gliederung: [
      { titel: "Angebotspreis ist nicht Marktwert", text: "Mehrere Vergleichsangebote und Unterschiede analysieren." },
      { titel: "Ferrari-Beispiel", text: "Die Verhandlung beim F8 wurde durch vorherige Marktbeobachtung möglich." },
      { titel: "Verhandlung beginnt am Laptop", text: "Marktpreis, Alternativen, Standzeit, Verkäuferinteresse und eigenes Limit kennen." },
      { titel: "Preis ist nicht Wert", text: "Nicht automatisch das Billigste suchen — Preis-Leistung vergleichen." },
      { titel: "Reisen", text: "Öffentliche Preise, Vergleichsportale, lokale Agenturen und identische Leistungen gegeneinander prüfen." },
      { titel: "Aufwand skalieren", text: "Bei 20 Euro nicht zwei Stunden recherchieren; bei 250.000 Euro kann tiefe Recherche sehr wertvoll sein." },
    ],
    aufgabe: "Vergleiche bei deiner nächsten relevanten Anschaffung mindestens fünf echte Alternativen und definiere vor Kontakt deinen Ziel- und Maximalpreis.",
    regeln: [
      "Der angebotene Preis ist nicht automatisch der Marktwert.",
      "Gute Verhandlung beginnt mit Recherche.",
      "Ein guter Exit beginnt oft mit einem guten Entry. Personal Brand, Netzwerk &",
    ],
  },
  {
    nr: 36,
    kapitelId: "brand",
    slug: "deine-personal-brand-arbeitet-waehrend-du-schlaefst",
    titel: "Wie meine Personal Brand für mich arbeitet",
    unter: "Was Menschen über mich wissen, bevor ich den Raum betrete.",
    kern: "Jeder Geschäftspartner schaut heute zuerst auf Instagram, bevor er mich trifft. Bei mir war das ein Vorteil: Die Leute kannten meine Autos, meinen Humor, meine Werte, bevor wir gesprochen haben. Die Brand ist aus meinem echten Leben entstanden, nicht aus einer Rolle.",
    hook: "Stell dir vor, du gehst zu einem Geschäftstermin und dein Gegenüber weiß schon, wie du ungefähr tickst, wofür du stehst und was du machst — obwohl ihr nie gesprochen habt.",
    gliederung: [
      { titel: "Nicht nur Influencer", text: "Jeder Unternehmer, Verkäufer oder Experte kann eine Personal Brand haben." },
      { titel: "Aus echtem Leben entstanden", text: "Autos, Unternehmertum, Humor, Glaube, Familie und Werte waren vor der Content-Strategie da." },
      { titel: "Lifestyle zuerst sichtbar", text: "Viele kannten meine Autos, aber nicht meinen gesamten beruflichen Weg." },
      { titel: "Sichtbarer Erfolg", text: "Kann Aufmerksamkeit und einen ersten Vertrauensvorschuss erzeugen, beweist aber keine Kompetenz." },
      { titel: "Werte", text: "Glaube, Familie, Loyalität, Geradlinigkeit und Verhalten sind ebenso Teil der Brand." },
      { titel: "Positionierung", text: "Wenn niemand weiß, wofür du offen bist, kann dich niemand mit passenden Chancen verbinden." },
    ],
    aufgabe: "Schau dein Profil 60 Sekunden wie ein Fremder an: Was machst du? Wofür stehst du? Was kannst du? Was bleibt im Kopf?",
    regeln: [
      "Deine Personal Brand betritt den Raum vor dir.",
      "Du musst nicht von jedem gemocht werden. Du musst für die richtigen Menschen erkennbar sein.",
      "Lifestyle bringt vielleicht den ersten Blick. Kompetenz gibt einen Grund, länger zuzuhören.",
    ],
  },
  {
    nr: 37,
    kapitelId: "brand",
    slug: "wie-social-media-mir-echte-deals-gebracht-hat",
    titel: "Wie Social Media mir echte Deals gebracht hat",
    unter: "Eine Nachricht auf Instagram im Café, und daraus wurde ein Investment.",
    kern: "Jemand hat meine YouTube-Videos gesehen, mein Profil angeschaut und mich angeschrieben, weil sie einen Investor gesucht haben. Ich saß gerade beim Kaffee im KaDeWe. Seit „Investor“ in meiner Bio steht, kommen solche Anfragen. Die spannendsten Leute kommentieren nie, sie schauen nur zu.",
    hook: "Social Media hat mir nicht nur Likes gebracht. Es hat reale Geschäftsmöglichkeiten und Kontakte gebracht.",
    gliederung: [
      { titel: "Kürzere Kennenlernphase", text: "Menschen, die lange folgen, haben bereits ein Bild von Persönlichkeit und Werten." },
      { titel: "Investor in der Bio", text: "Nach meiner ersten Beteiligung machte ich diese Rolle sichtbar. Später kam eine weitere Investmentanfrage über Social Media." },
      { titel: "Umsetzung zieht Chancen an", text: "Eine umgesetzte Sache ist stärker als zehn angekündigte Projekte." },
      { titel: "Stille Zuschauer", text: "Die interessantesten Menschen kommentieren nicht zwingend. Manche beobachten Monate, bevor sie schreiben." },
      { titel: "Gastro und Netzwerk", text: "Online-Wahrnehmung kann reale Gespräche erleichtern, ersetzt aber keine Prüfung." },
      { titel: "Grenze der Brand", text: "Sympathie und Vertrauen ersetzen Business Case, Due Diligence und Vertrag nicht." },
    ],
    aufgabe: "Prüfe, ob ein potenzieller Geschäftspartner nach 60 Sekunden auf deinem Profil versteht, womit er dich ansprechen könnte.",
    regeln: [
      "Social Media kann die Distanz bis zum ersten Vertrauen verkürzen.",
      "Positionierung hilft Chancen, dich zu finden.",
      "Personal Brand öffnet Türen. Business Case und Vertrag entscheiden, ob du hindurchgehen solltest.",
    ],
  },
  {
    nr: 39,
    kapitelId: "brand",
    slug: "reichweite-ist-nicht-gleich-einfluss",
    titel: "Warum Reichweite bei mir nicht gleich Einfluss ist",
    unter: "Ich habe 12.000 Follower, und das reicht mir. Es kommt auf die richtigen an.",
    kern: "Viele haben große Zahlen, teils gekauft, teils mit Content, der nichts bringt. Mir ist wichtiger, wer mir folgt: Kunden, Partner, Leute, die etwas vorhaben. Vertrauen entsteht nicht durch einen viralen Hit, sondern dadurch, dass jemand mich immer wieder sieht.",
    hook: "Ich würde lieber ein paar tausend Menschen haben, von denen die richtigen wissen, wer ich bin und was ich kann, als hunderttausende, die mich wegen eines zufälligen viralen Videos kennen.",
    gliederung: [
      { titel: "Sichtbarkeit vs. Wirkung", text: "Reichweite sagt, wie viele dich sehen. Einfluss zeigt, ob Menschen reagieren." },
      { titel: "Virale Irrelevanz", text: "Ein riesiger themenfremder Hit kann wenig geschäftlichen Wert haben." },
      { titel: "Lifestyle als passende Eingangstür", text: "Bei mir kann Auto-Content zu Humor, Werten und Business weiterführen." },
      { titel: "Wer folgt dir?", text: "Potenzielle Kunden, Partner, Mitarbeiter und Branchenkontakte sind anders zu bewerten als Zufallspublikum." },
      { titel: "Vertrauen entsteht wiederholt", text: "Ein View ist ein Kontakt. Vertrauen entsteht durch viele gute Kontakte." },
      { titel: "Shortform und Longform", text: "Kurze Formate holen Aufmerksamkeit, längere Formate erklären Kompetenz und Geschichte." },
    ],
    aufgabe: "Analysiere deine letzten zehn Posts: Warum würde jemand folgen? Plane anschließend Content für Aufmerksamkeit, Vertrauen und Kompetenz.",
    regeln: [
      "Reichweite misst Sichtbarkeit. Einfluss misst Wirkung.",
      "Shortform holt Aufmerksamkeit. Longform vertieft Vertrauen und Kompetenz.",
      "Reichweite holt Menschen rein. Relevanz lässt sie bleiben.",
    ],
  },
];

/* Die fuenf Kapitel stehen schon in landingPage.ts — Titel, Beschreibung
   und Bilder. Sie hier ein zweites Mal zu tippen hiesse, sie beim naechsten
   Wortwechsel an zwei Stellen zu aendern und eine zu vergessen. */
/* Die kurzen Namen fuer den Club. Draussen verkaufen die langen Titel
   ("MINDSET, CHANCEN & UNTERNEHMERISCHES DENKEN"); drinnen, wo sie in
   Pillen, Karten und Zeilen stehen, brechen sie dreizeilig. Ein Wort
   reicht — man weiss, wo man ist. */
export const serienKurz: Record<KapitelId, string> = {
  mindset: "MINDSET",
  sales: "VERTRIEB",
  business: "BUSINESS",
  geld: "GELD",
  brand: "NETZWERK",
};

export const kursKapitel = insideTheClub.series.map((serie) => ({
  id: serie.id as KapitelId,
  label: serie.label,
  kurz: serienKurz[serie.id as KapitelId],
  tagline: serie.tagline,
  description: serie.description,
  cover: serie.cover,
  still: serie.still,
  videos: kursVideos.filter((v) => v.kapitelId === serie.id),
}));

/** Ein Video ueber seine Nummer. */
export const videoNr = (nr: number) => kursVideos.find((v) => v.nr === nr);

/** Was im Katalog davor und danach liegt — fuer die Zeile unter dem Player. */
export function nachbarn(nr: number) {
  const i = kursVideos.findIndex((v) => v.nr === nr);
  return {
    davor: i > 0 ? kursVideos[i - 1] : null,
    danach: i >= 0 && i < kursVideos.length - 1 ? kursVideos[i + 1] : null,
  };
}
