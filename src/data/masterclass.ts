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
    titel: "Wer ist Ismail Tatlisöz — und warum solltest du mir zuhören?",
    unter: "Die Geschichte hinter der Masterclass",
    kern: "Diese Masterclass basiert nicht auf Theorie, sondern auf über zwei Jahrzehnten praktischer Erfahrung in Handel, Vertrieb, Unternehmertum, Investments, Gastronomie und Personal Brand.",
    hook: "Ich will euch hier nicht erzählen, dass ich immer alles richtig gemacht habe. Im Gegenteil: Einige meiner wichtigsten Lektionen haben mich viel Geld, Zeit und Nerven gekostet. Genau deshalb kann meine Erfahrung für euch eine Abkürzung sein.",
    gliederung: [
      { titel: "Wer ich zuerst bin", text: "Bevor Unternehmer, Investor oder Content Creator: Sohn und Familienvater. Erfolg ist für mich nicht nur materiell." },
      { titel: "Mein Weg", text: "Frühe eBay-Geschäfte, Felgenhandel, Promotion, Vertrieb, eigene Strukturen, Vermögensberatung, Beteiligungen, Gastronomie und Social Media." },
      { titel: "Warum diese Masterclass", text: "Nicht um mein Leben zu kopieren, sondern um Denkweisen, Fehler und praktische Muster weiterzugeben." },
      { titel: "Keine Erfolgsversprechen", text: "Gleiche Information führt bei verschiedenen Menschen zu unterschiedlichen Ergebnissen. Umsetzung, Ausgangslage und Disziplin entscheiden mit." },
      { titel: "Meine wichtigste Haltung", text: "Bleib korrekt. Reputation, Charakter und das eigene Wort sind langfristiges Kapital." },
    ],
    aufgabe: "Schreibe drei konkrete Ziele auf, die du mit dieser Masterclass erreichen willst, und daneben, woran du in 90 Tagen erkennst, ob du wirklich umgesetzt hast.",
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
    titel: "Erfahrung als Abkürzung",
    unter: "Warum fremdes Lehrgeld dir Jahre sparen kann",
    kern: "Du musst nicht jeden Fehler selbst machen. Gute Mentoren, Unternehmer und Praktiker können dir Entscheidungswege verkürzen — wenn du nicht nur zuhörst, sondern umsetzt.",
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
    titel: "Die „Wo kann ich Geld verdienen?“-Mentalität",
    unter: "Chancen sehen, bevor sie wie ein Business aussehen",
    kern: "Unternehmerisches Denken beginnt oft nicht mit einem Businessplan, sondern mit Aufmerksamkeit: Wo gibt es Nachfrage, Preisunterschiede oder unnötige Reibung?",
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
    titel: "Der Red-Car-Effekt",
    unter: "Warum dein Fokus bestimmt, welche Chancen du überhaupt siehst",
    kern: "Wenn du deinen Fokus schärfst, erkennst du plötzlich häufiger relevante Informationen und Möglichkeiten. Das ist kein Zauber, sondern selektive Aufmerksamkeit.",
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
    unter: "Bauchgefühl nutzen, ohne blind zu werden",
    kern: "Schnelligkeit ist ein Vorteil, wenn sie auf Erfahrung und einem klaren Prüfprozess basiert. Bauchgefühl darf das „Ob“ beschleunigen; Zahlen und Verträge müssen das „Wie“ absichern.",
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
    titel: "Zu langsam vs. zu schnell",
    unter: "Meine zwei teuersten Denkfehler",
    kern: "Unternehmerische Fehler entstehen an beiden Enden: zu langes Zögern kann Chancen kosten, zu schnelles Vertrauen kann Kapital kosten.",
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
    titel: "Nicht am Problem aufhalten — an der Lösung arbeiten",
    unter: "Wie ich mit Rückschlägen umgehe",
    kern: "Probleme werden nicht kleiner, wenn man sie emotional immer wieder erzählt. Akzeptiere die Realität, finde die beeinflussbaren Punkte und baue eine Lösung.",
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
    nr: 8,
    kapitelId: "mindset",
    slug: "visualisiere-dein-ziel-und-arbeite-dafuer",
    titel: "Visualisiere dein Ziel — und arbeite dafür",
    unter: "Warum Vorstellungskraft ohne Handlung wertlos bleibt",
    kern: "Visualisierung kann Fokus und Motivation stärken. Sie ist kein Ersatz für Arbeit und keine Garantie für ein bestimmtes Ergebnis.",
    hook: "Ich visualisiere Ziele gerne abends. Aber morgens beginnt die Arbeit.",
    gliederung: [
      { titel: "Emotionale Ziele", text: "Mein erster Ferrari war für mich nicht nur ein Auto, sondern ein konkretes emotionales Ziel." },
      { titel: "Warum Bilder helfen", text: "Ein klares Ziel kann Entscheidungen filtern und Aufmerksamkeit ausrichten." },
      { titel: "Keine Magie", text: "Visualisierung hat mir keinen Ferrari auf den Hof gestellt. Dazwischen lagen Vertrieb, Arbeit, Chancen und Entscheidungen." },
      { titel: "Vom Bild zum Plan", text: "Ziel -> nächste Fähigkeit -> nächste Handlung -> messbarer Fortschritt." },
      { titel: "Dankbarkeit", text: "Ziele verfolgen, ohne so zu leben, als wäre das heutige Leben wertlos." },
    ],
    aufgabe: "Visualisiere heute ein konkretes Ziel und schreibe direkt darunter die drei Handlungen, die dich realistisch näherbringen.",
    regeln: [
      "Visualisierung kann Fokus erzeugen. Arbeit erzeugt Umsetzung.",
      "Ich visualisiere meine Ziele abends. Aber morgens beginnt die Arbeit.",
    ],
  },
  {
    nr: 9,
    kapitelId: "sales",
    slug: "verkaufen-kann-man-lernen",
    titel: "Verkaufen kann man lernen",
    unter: "Warum Sales keine angeborene Gabe sein muss",
    kern: "Verkaufen wird durch Gespräche, Beobachtung, Wiederholung und ehrliches Feedback besser.",
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
    titel: "Schlagzahl entscheidet",
    unter: "Warum Aktivität Talent oft schlägt",
    kern: "Wer konstant viele hochwertige Versuche produziert, sammelt mehr Daten, Erfahrung und Chancen als jemand, der auf den perfekten Moment wartet.",
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
    nr: 11,
    kapitelId: "sales",
    slug: "warum-menschen-bei-menschen-kaufen",
    titel: "Warum Menschen bei Menschen kaufen",
    unter: "Vertrauen als Teil des Produkts",
    kern: "Bei beratungsintensiven Produkten kaufen Menschen nicht nur Leistung und Preis, sondern auch Vertrauen in die Person, die sie begleitet.",
    hook: "Zwei Menschen können dasselbe Produkt anbieten — und der Kunde entscheidet sich trotzdem ganz klar für einen von beiden.",
    gliederung: [
      { titel: "Sympathie", text: "Freundlichkeit, Humor und Augenhöhe erleichtern Gespräche." },
      { titel: "Kompetenz", text: "Sympathie ohne Substanz reicht langfristig nicht." },
      { titel: "Zuverlässigkeit", text: "Versprechen einhalten, erreichbar im vereinbarten Rahmen, Probleme lösen." },
      { titel: "Integrität", text: "Nicht verkaufen, was nicht passt. Fehler zugeben. Keine falschen Versprechen." },
      { titel: "Status als Türöffner", text: "Sichtbarer Erfolg kann Interesse erzeugen — muss aber durch Verhalten bestätigt werden." },
    ],
    aufgabe: "Frage drei Kunden oder Kollegen, warum sie gerne mit dir arbeiten. Suche nach wiederkehrenden Eigenschaften, nicht nach Produktmerkmalen.",
    regeln: [
      "Menschen kaufen nicht nur Produkte. Sie kaufen Vertrauen in Menschen.",
      "Sympathie öffnet die Tür. Kompetenz und Zuverlässigkeit halten sie offen.",
    ],
  },
  {
    nr: 12,
    kapitelId: "sales",
    slug: "verkaufe-nichts-woran-du-nicht-glaubst",
    titel: "Verkaufe nichts, woran du nicht glaubst",
    unter: "Überzeugung ist schwer zu faken",
    kern: "Echte Produktüberzeugung verbessert Kommunikation und schützt langfristiges Vertrauen. Ein gutes Produkt allein macht allerdings noch kein gutes Investment.",
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
    titel: "Drei Kundentypen",
    unter: "Warum du nicht mit jedem Menschen gleich sprechen solltest",
    kern: "Gute Verkäufer passen Tempo und Kommunikationsstil an den Kunden an, ohne Wahrheit oder Angebot zu verbiegen.",
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
    titel: "„Das ist mir zu teuer.“",
    unter: "Wie ich Preise erkläre, ohne reflexartig Rabatt zu geben",
    kern: "Ein Preiseinwand muss erst verstanden werden. Danach wird Wert verglichen — nicht einfach der Preis gesenkt.",
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
    unter: "Langfristiges Vertrauen statt erzwungenem Abschluss",
    kern: "Ein Kunde, der sich gedrängt fühlt, kann kurzfristig Umsatz bringen und langfristig Vertrauen, Empfehlungen und Storno kosten.",
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
    unter: "Verhandeln beginnt vor dem Gespräch",
    kern: "Marktbeobachtung, Verkäuferlogik, ein klares Limit und echte Abschlussbereitschaft können stärker sein als rhetorische Tricks.",
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
    slug: "eine-gute-idee-reicht-nicht",
    titel: "Eine gute Idee reicht nicht",
    unter: "Die Umsetzung entscheidet",
    kern: "Ideen sind billig. Entscheidend sind Zahlen, Markt, operative Kompetenz, Wiederholbarkeit und jemand, der täglich Verantwortung übernimmt.",
    hook: "Ich habe sehr viele gute Ideen gesehen. Gute Ideen gehen nicht automatisch pleite — schlechte Umsetzung kann sie pleite machen.",
    gliederung: [
      { titel: "Nachfrage", text: "Gibt es ein echtes Problem oder nur unsere Begeisterung?" },
      { titel: "Zahlen", text: "Kosten, Margen, Kapitalbedarf und plausible Umsatzannahmen." },
      { titel: "Operator", text: "Wer macht das Geschäft Dienstag um 14 Uhr, wenn gerade nichts glamourös ist?" },
      { titel: "Wiederholbarkeit", text: "Kann das Modell stabil funktionieren und eventuell skalieren?" },
      { titel: "Wow plus Handwerk", text: "Innovativ ist interessant. Langfristig tragfähig ist wichtiger." },
    ],
    aufgabe: "Bewerte eine Geschäftsidee nach fünf Punkten: Nachfrage, Marge, Operator, Kapitalbedarf, Wiederholbarkeit. Jeweils 1 bis 10.",
    regeln: [
      "Eine Idee ist erst der Anfang. Umsetzung ist das Geschäft.",
      "Frag nicht nur, ob es am Samstag voll ist. Frag, ob es am schlechten Dienstag funktioniert.",
    ],
  },
  {
    nr: 18,
    kapitelId: "business",
    slug: "investiere-in-menschen",
    titel: "Investiere in Menschen",
    unter: "Warum der Partner oft wichtiger ist als die Idee",
    kern: "Kapital allein löst wenig. Ein starker Partner bringt Verlässlichkeit, Kompetenz, Energie und tägliche Verantwortung mit.",
    hook: "Wenn ich 100.000 Euro investiere, schaue ich nicht nur auf die Idee. Ich schaue sehr genau auf den Menschen, der jeden Tag dafür verantwortlich sein soll.",
    gliederung: [
      { titel: "Taten statt Worte", text: "Viele Menschen sind in der Pitch-Phase begeistert. Entscheidend ist, wer auch nach Monaten liefert." },
      { titel: "Verhalten", text: "Pünktlichkeit, Umgang mit Servicepersonal, Verlässlichkeit und Kommunikation zeigen viel." },
      { titel: "Track Record", text: "Was hat die Person bisher wirklich umgesetzt?" },
      { titel: "Rollen", text: "Kapital, Strategie, Netzwerk und operative Verantwortung müssen klar verteilt sein." },
      { titel: "Gegenseitiger Nutzen", text: "Gute Partnerschaften funktionieren, wenn beide Seiten etwas Reales beitragen." },
    ],
    aufgabe: "Erstelle für einen bestehenden oder potenziellen Partner einen Partner-Check: Können, Wollen, Charakter, Zuverlässigkeit, Kapital, Zeit, klare Rolle.",
    regeln: [
      "Dein Charakter ist nicht die Summe deiner Worte, sondern deiner Taten.",
      "Ein Partner sollte nicht nur begeistert sein — er sollte Verantwortung tragen können.",
    ],
  },
  {
    nr: 19,
    kapitelId: "business",
    slug: "superfoods-fuenfstelliges-lehrgeld",
    titel: "Superfoods: fünfstelliges Lehrgeld",
    unter: "Warum volle Läden keine Due Diligence ersetzen",
    kern: "Produkt, Lage und Atmosphäre können täuschen. Vor einem Investment müssen Umsätze, Kosten, Verbindlichkeiten, Verträge und operative Prozesse verifiziert werden.",
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
    nr: 20,
    kapitelId: "business",
    slug: "250-000-euro-und-handschlag-warum-ein-vertrag-trotzdem-pflic",
    titel: "250.000 Euro und Handschlag — warum ein Vertrag trotzdem Pflicht ist",
    unter: "Vertrauen schützt Beziehungen, Verträge schützen den Konfliktfall",
    kern: "Gute persönliche Beziehungen sind kein Ersatz für klare schriftliche Regeln zu Kapital, Pflichten, Exit, Rückzahlung und Entscheidungsrechten.",
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
    nr: 21,
    kapitelId: "business",
    slug: "geld-wird-beim-einkauf-verdient",
    titel: "Geld wird beim Einkauf verdient",
    unter: "Warum dein Entry die halbe Rendite bestimmt",
    kern: "Ein guter Einkauf reduziert Risiko, Wertverlust und nötigen Verkaufsdruck. „Günstig“ bedeutet aber nur dann gut, wenn Qualität und Exit stimmen.",
    hook: "Viele denken erst beim Verkauf darüber nach, Geld zu verdienen. Ich denke oft schon beim Einkauf darüber nach.",
    gliederung: [
      { titel: "G-Klasse-Beispiel", text: "Durch damalige Sonderkonditionen im beruflichen Umfeld kaufte ich eine G-Klasse nach meiner Erinnerung für etwa 151.000 Euro." },
      { titel: "Späterer Verkauf", text: "Später wurde das Fahrzeug in einem außergewöhnlich starken Markt knapp unter 250.000 Euro verkauft. Das war historisch und nicht garantiert wiederholbar." },
      { titel: "Was wirklich dahinter steckt", text: "Guter Einkauf, starke Nachfrage, Marktbedingungen und auch Glück." },
      { titel: "Nicht billig um jeden Preis", text: "Ein schlechter Vermögenswert wird nicht automatisch gut, nur weil du Rabatt bekommst." },
      { titel: "Exit vorher denken", text: "Wer könnte später kaufen, wie liquide ist der Markt, welche Kosten entstehen?" },
    ],
    aufgabe: "Nimm eine größere geplante Anschaffung und recherchiere vor dem Kauf Marktwert, typische Abschläge, Exit-Markt und Gesamtkosten.",
    regeln: [
      "Das Geld wird oft schon beim Einkauf verdient.",
      "Ein guter Preis ist nur gut, wenn das Asset dahinter gut genug ist.",
    ],
  },
  {
    nr: 22,
    kapitelId: "business",
    slug: "ferrari-gestohlen-was-ich-daraus-gelernt-habe",
    titel: "Ferrari gestohlen — was ich daraus gelernt habe",
    unter: "Vermögen aufbauen reicht nicht — du musst es schützen",
    kern: "Risiken gehören zu Vermögenswerten und Unternehmen. Schutz durch Versicherung, Verträge, Reserven und Prozesse ist Teil der Rendite.",
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
    nr: 23,
    kapitelId: "business",
    slug: "warum-ich-nicht-alles-alleine-mache",
    titel: "Warum ich nicht alles alleine mache",
    unter: "Delegation als unternehmerischer Hebel",
    kern: "Unternehmer sollten Aufgaben nach Wert, Wiederholbarkeit und persönlicher Stärke verteilen. Kernkompetenz und Stimme bleiben bei dir; Routine und Spezialarbeit können delegiert werden.",
    hook: "Nur weil ich etwas selbst machen könnte, heißt das nicht, dass ich es selbst machen sollte.",
    gliederung: [
      { titel: "Buchhaltung", text: "Administrative Arbeit stresst mich — deshalb gehört sie in professionelle Hände." },
      { titel: "Operative Partner", text: "Bei Beteiligungen brauche ich Menschen, die tägliche Verantwortung übernehmen." },
      { titel: "Social Media", text: "Persönliche Stimme und Story bleiben bei mir; Posting, Distribution und Wiederholung können stärker ausgelagert werden." },
      { titel: "KI als Unterstützung", text: "Analyse, Struktur und erste Entwürfe beschleunigen Arbeit — Verantwortung bleibt beim Unternehmer." },
      { titel: "Delegation braucht Ergebnisdefinition", text: "Nicht „mach mal Social Media“, sondern klare Outputs, Standards und Kontrollen." },
    ],
    aufgabe: "Sortiere deine Aufgaben in vier Spalten: eliminieren, automatisieren, delegieren, selbst machen.",
    regeln: [
      "Delegiere Aufgaben — nicht dein unternehmerisches Denken.",
      "Deine persönliche Stimme ist schwer auszulagern. Wiederholbare Arbeit nicht.",
    ],
  },
  {
    nr: 24,
    kapitelId: "business",
    slug: "zeit-gegen-geld-hat-eine-grenze",
    titel: "Zeit gegen Geld hat eine Grenze",
    unter: "Wie Systeme und Teams Skalierung ermöglichen",
    kern: "Persönliche Arbeitszeit ist begrenzt. Skalierung entsteht, wenn Wissen, Prozesse, Menschen, Technologie oder Kapital Ergebnisse vervielfachen.",
    hook: "Wenn dein Einkommen nur steigt, wenn du persönlich noch eine Stunde arbeitest, stößt du irgendwann an eine natürliche Grenze.",
    gliederung: [
      { titel: "Eigene Produktion", text: "Persönliche Leistung ist wichtig, aber zeitlich gedeckelt." },
      { titel: "Teamhebel", text: "Gut ausgebildete Menschen können parallel Wert schaffen. Führung muss Training, Standards und Verantwortung liefern." },
      { titel: "Kein „Menschen unter dir“-Automatismus", text: "Teamvergütung entsteht nur in legitimen Modellen und durch echte Produktivität." },
      { titel: "Weitere Hebel", text: "Systeme, Technologie, Wissen, Kapital, Inhalte." },
      { titel: "Reihenfolge", text: "Beweisen -> verstehen -> standardisieren -> lehren -> kontrollieren -> skalieren." },
    ],
    aufgabe: "Wähle eine wiederkehrende Tätigkeit und schreibe sie so auf, dass eine andere qualifizierte Person sie nach einem Standard ausführen könnte.",
    regeln: [
      "Skalierung heißt nicht, nichts mehr zu tun. Sie heißt, nicht alles selbst tun zu müssen.",
      "Skaliere keinen Prozess, den du selbst noch nicht verstanden hast.",
    ],
  },
  {
    nr: 25,
    kapitelId: "business",
    slug: "menschen-erkennen",
    titel: "Menschen erkennen",
    unter: "Worauf ich bei Partnern und Mitarbeitern achte",
    kern: "Fähigkeiten lassen sich entwickeln. Zuverlässigkeit, Charakter, Lernfähigkeit und echte Arbeitsbereitschaft sind für langfristige Zusammenarbeit oft entscheidender.",
    hook: "Jemand kann im ersten Gespräch extrem motiviert wirken. Mich interessiert, wie er sich nach vier Wochen verhält.",
    gliederung: [
      { titel: "Kommunikation", text: "Kann die Person klar denken und sich verständlich ausdrücken?" },
      { titel: "Auffassungsgabe", text: "Wie schnell versteht sie neue Zusammenhänge?" },
      { titel: "Zuverlässigkeit", text: "Pünktlichkeit und Absprachen sind einfache, aber starke Signale." },
      { titel: "Charakter", text: "Ehrlichkeit, Loyalität und Umgang mit Menschen." },
      { titel: "Hunger", text: "Will die Person wirklich — und zeigt sich das in Verhalten?" },
    ],
    aufgabe: "Bewerte dich selbst ehrlich in fünf Bereichen von 1 bis 10: Kommunikation, Auffassungsgabe, Zuverlässigkeit, Charakter/Integrität, Umsetzungshunger.",
    regeln: [
      "Motivation wird in Verhalten gemessen.",
      "Fachwissen kann man oft trainieren. Charakter ist schwieriger.",
    ],
  },
  {
    nr: 26,
    kapitelId: "business",
    slug: "menschen-fuehren-ohne-ihnen-hinterherzulaufen",
    titel: "Menschen führen, ohne ihnen hinterherzulaufen",
    unter: "Unterstützen statt tragen",
    kern: "Führung schafft Klarheit, Training, Feedback und Standards. Sie ersetzt nicht die Eigenverantwortung des Mitarbeiters.",
    hook: "Ich kann mehr an dich glauben als du selbst — aber ich kann nicht dauerhaft mehr wollen als du.",
    gliederung: [
      { titel: "Diagnose", text: "Kann die Person nicht, will sie nicht oder fehlt der Rahmen?" },
      { titel: "Klarheit", text: "Ziele und tatsächliches Verhalten offen gegenüberstellen." },
      { titel: "Unterstützung", text: "Training, Vorbild, Feedback und Anerkennung." },
      { titel: "Grenzen", text: "Nicht täglich erwachsene Menschen an ihre eigenen Ziele erinnern." },
      { titel: "Skalierbare Führung", text: "Gruppentrainings, klare Rollen und Standards statt Founder als Dauer-Flaschenhals." },
    ],
    aufgabe: "Führe mit einem Teammitglied ein klares Gespräch: Ziel, aktuelles Verhalten, Hindernis, konkrete nächste Verpflichtung, Termin zur Kontrolle.",
    regeln: [
      "Ich kann dir den Weg zeigen und dir helfen, ihn zu gehen. Aber ich werde dir nicht jeden Tag hinterherlaufen.",
      "Freiheit funktioniert nur mit Selbstdisziplin.",
    ],
  },
  {
    nr: 27,
    kapitelId: "geld",
    slug: "mehr-verdienen-statt-dich-kaputtzusparen",
    titel: "Mehr verdienen statt dich kaputtzusparen",
    unter: "Warum Einkommen einen größeren Hebel haben kann als Kleinsparen",
    kern: "Kostenkontrolle ist wichtig, aber sie hat eine Untergrenze. Einkommen, Wertschöpfung und Reichweite können deutlich größere Hebel bieten.",
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
    titel: "Umsatz ist nicht dein Geld",
    unter: "Der Kontostand kann dich anlügen",
    kern: "Unternehmer müssen Umsatz, Gewinn, Liquidität und Steuerverpflichtungen unterscheiden. Geld auf dem Konto kann bereits jemand anderem gehören.",
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
    unter: "Unternehmer brauchen mehr als jemanden, der Formulare abgibt",
    kern: "Ein guter Steuerberater hilft, Entscheidungen rechtzeitig legal zu strukturieren und Risiken zu erkennen. Der Unternehmer bleibt trotzdem verantwortlich, seine Zahlen zu verstehen.",
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
    nr: 30,
    kapitelId: "geld",
    slug: "warum-ich-geld-lieber-reinvestiere",
    titel: "Warum ich Geld lieber reinvestiere",
    unter: "Kapital als zweiter Motor",
    kern: "Geld kann Sicherheit, Konsum oder Wachstum finanzieren. Reinvestition ist sinnvoll, wenn das Ziel verstanden, geprüft und gegenüber Alternativen attraktiv ist.",
    hook: "Für mich ist Geld nicht nur etwas, das auf dem Konto liegen soll. Es ist auch ein Werkzeug.",
    gliederung: [
      { titel: "Reinvestitionsfelder", text: "Eigenes Geschäft, Menschen, Technik, Marketing, Weiterbildung, Beteiligungen." },
      { titel: "Verstehen, was du kaufst", text: "Ich bevorzuge Bereiche, deren Logik ich nachvollziehen kann." },
      { titel: "Nicht jedem glänzenden Projekt folgen", text: "Eine neue Idee ist nicht automatisch besser als ein bewährtes bestehendes Geschäft." },
      { titel: "Liquidität ist ebenfalls Investment", text: "Nicht jeder Euro muss beschäftigt sein. Reserve gibt Handlungsfähigkeit." },
      { titel: "Due Diligence bleibt", text: "Kapitalbereitschaft ersetzt nie Kontrolle." },
    ],
    aufgabe: "Bewerte drei mögliche Verwendungen für deinen nächsten freien Euro: bestehendes Geschäft, Reserve, neues Investment. Was ist Rendite, Risiko, Kontrolle und Liquidität?",
    regeln: [
      "Kapital ist ein Werkzeug — kein Spielzeug.",
      "Reinvestieren heißt nicht, jeden Euro in die nächste Idee zu werfen.",
    ],
  },
  {
    nr: 31,
    kapitelId: "geld",
    slug: "warum-ich-trotzdem-gerne-geld-ausgebe",
    titel: "Warum ich trotzdem gerne Geld ausgebe",
    unter: "Vermögen aufbauen, ohne das Leben auf später zu verschieben",
    kern: "Finanzielle Verantwortung und Lebensqualität dürfen gleichzeitig existieren. Konsum muss bewusst sein und darf nicht mit Investieren verwechselt werden.",
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
    unter: "Wie echtes Leben zum Marketing-Asset werden kann",
    kern: "Content funktioniert besonders stark, wenn er Zugang zu einem echten, interessanten Leben gibt. Der Content sollte das Leben dokumentieren — nicht ein künstliches Leben erzwingen.",
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
    titel: "Kreditkarten, Punkte und Vorteile richtig nutzen",
    unter: "Aus ohnehin geplanten Ausgaben zusätzlichen Nutzen ziehen",
    kern: "Bonusprogramme sind sinnvoll, wenn Ausgaben ohnehin anfallen, die Vorteile real genutzt werden und die Rechnung vollständig bezahlt werden kann.",
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
    titel: "Bar bezahlen ist nicht automatisch schlau",
    unter: "Warum Liquidität manchmal wertvoller ist als maximale Eigenkapitalquote",
    kern: "Finanzierung ist ein Werkzeug. Sie kann Kapital freihalten, erhöht aber gleichzeitig Risiko und fixe Verpflichtungen.",
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
    titel: "Preise recherchieren",
    unter: "Warum Marktkenntnis bares Geld wert ist",
    kern: "Wer einen Markt regelmäßig beobachtet, erkennt faire Preise, echte Schnäppchen und schlechte Angebote schneller. Recherche ist die Grundlage guter Verhandlung.",
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
    titel: "Deine Personal Brand arbeitet, während du schläfst",
    unter: "Was Menschen über dich wissen, bevor du den Raum betrittst",
    kern: "Personal Brand ist der Eindruck, der von dir entsteht, wenn du nicht selbst erklären kannst, wer du bist. Social Media skaliert diesen Eindruck.",
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
    unter: "Warum Reichweite für mich nie nur Likes bedeutet hat",
    kern: "Eine glaubwürdige Personal Brand kann Kontakte, Beteiligungen und Kooperationen wahrscheinlicher machen, weil Menschen dich bereits kennen, bevor der erste persönliche Kontakt stattfindet.",
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
    nr: 38,
    kapitelId: "brand",
    slug: "warum-ich-lifestyle-wirklich-zeige",
    titel: "Warum ich Lifestyle wirklich zeige",
    unter: "Authentizität ist kein Stilmittel",
    kern: "Lifestyle-Content ist langfristig stark, wenn er tatsächliches Leben dokumentiert. Authentizität heißt nicht, alles privat zu zeigen, sondern nichts Wesentliches vorzutäuschen.",
    hook: "Für mich war nie der Ansatz: Wie baue ich für Instagram ein luxuriöses Leben? Die Autos und Reisen waren vorher da — Content hat sie sichtbar gemacht.",
    gliederung: [
      { titel: "Authentisch heißt nicht gläsern", text: "Du darfst Privates schützen und trotzdem glaubwürdig sein." },
      { titel: "Kunstfigur kostet Energie", text: "Wer eine erfundene Rolle baut, muss sie dauerhaft weiterführen." },
      { titel: "Lifestyle war vorher da", text: "Autoleidenschaft reicht bis in Kindheit, Brabus und G-Klasse-Träume zurück." },
      { titel: "Zeigen ohne Abwerten", text: "Lifestyle kann unterhalten und inspirieren, ohne andere kleiner zu machen." },
      { titel: "Werte machen die Brand tiefer", text: "Autos können Aufmerksamkeit bringen; Charakter, Glaube und Haltung schaffen Tiefe." },
      { titel: "Fake it till you make it richtig", text: "Professioneller auftreten und in Fähigkeiten hineinwachsen — keine erfundenen Vermögen oder Ergebnisse." },
    ],
    aufgabe: "Sortiere deine letzten 20 Posts in echtes Leben, Positionierung, Unterhaltung und Show. Reduziere alles, was nur größer wirken soll als die Wahrheit.",
    regeln: [
      "Authentizität heißt nicht, alles zu zeigen. Sie heißt, nichts vorzutäuschen.",
      "Eine starke Brand darf größer werden als deine Reichweite — aber niemals größer als die Wahrheit.",
      "Die stärkste Personal Brand ist die klarste Version deiner echten Person.",
    ],
  },
  {
    nr: 39,
    kapitelId: "brand",
    slug: "reichweite-ist-nicht-gleich-einfluss",
    titel: "Reichweite ist nicht gleich Einfluss",
    unter: "Warum 5.000 richtige Follower wertvoller sein können als 500.000 beliebige",
    kern: "Followerzahl allein misst Sichtbarkeit. Geschäftlicher Einfluss entsteht durch Relevanz, Vertrauen, Zielgruppenfit und wiederholte glaubwürdige Kontakte.",
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
  {
    nr: 40,
    kapitelId: "brand",
    slug: "vom-zuschauer-zum-geschaeftspartner",
    titel: "Vom Zuschauer zum Geschäftspartner",
    unter: "Warum diese Masterclass nicht das Ende, sondern der Anfang sein kann",
    kern: "Wissen allein verändert nichts. Umsetzung macht Teilnehmer sichtbar und kann neue Kontakte oder Möglichkeiten schaffen. Zusammenarbeit bleibt immer freiwillig, selektiv und ohne Anspruch.",
    hook: "Wenn ihr alle 40 Videos gesehen habt, ist die wichtigste Frage nicht, was ihr jetzt wisst — sondern was ihr ab morgen damit macht.",
    gliederung: [
      { titel: "Warum diese Masterclass", text: "Jahre an praktischer Erfahrung so verdichten, dass Teilnehmer Fehler vermeiden und schneller lernen können." },
      { titel: "Wissen nimmt Arbeit nicht ab", text: "Zwei Menschen sehen denselben Kurs und erzielen unterschiedliche Ergebnisse, weil Umsetzung unterschiedlich ist." },
      { titel: "Taten zeigen Charakter", text: "Nicht „Ich bin hungrig“, sondern: Was machst du Montagmorgen?" },
      { titel: "Masterclass als Filter", text: "Umsetzung, Entwicklung, Zuverlässigkeit und Fähigkeiten können sichtbar werden. Es gibt keinerlei Anspruch auf Job, Partnerschaft oder Einkommen." },
      { titel: "Netzwerk als System", text: "Ein gutes Umfeld verbindet Menschen, die gegenseitig echten Wert beitragen." },
      { titel: "Business Club", text: "Wissen, Austausch, Live-Formate, Kontakte, Umsetzung und Entwicklung." },
      { titel: "Der Kreis schließt sich", text: "Von „Wo kann ich Geld verdienen?“ über Vertrieb und Investments bis zur Personal Brand." },
      { titel: "Finale Haltung", text: "Chancen sehen, verkaufen lernen, Geld verstehen, Probleme lösen, korrekt bleiben und dankbar sein." },
    ],
    aufgabe: "Schreibe genau eine konkrete Handlung auf, die du innerhalb der nächsten 24 Stunden wegen dieser Masterclass umsetzt — und tue sie.",
    regeln: [
      "Wissen ohne Umsetzung verändert nichts.",
      "Ein starkes Netzwerk entsteht, wenn du selbst für andere wertvoll wirst.",
      "Je größer du wirst, desto kleiner solltest du werden.",
    ],
  },
];

/* Die fuenf Kapitel stehen schon in landingPage.ts — Titel, Beschreibung
   und Bilder. Sie hier ein zweites Mal zu tippen hiesse, sie beim naechsten
   Wortwechsel an zwei Stellen zu aendern und eine zu vergessen. */
export const kursKapitel = insideTheClub.series.map((serie) => ({
  id: serie.id as KapitelId,
  label: serie.label,
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
