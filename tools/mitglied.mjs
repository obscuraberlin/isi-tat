/**
 * Legt einen Zugang fuer den Mitgliederbereich an.
 *
 *   node tools/mitglied.mjs max@beispiel.de "Max Muster"
 *   node tools/mitglied.mjs max@beispiel.de "Max Muster" WunschPasswort
 *   node tools/mitglied.mjs --geheimnis
 *
 * Ohne Passwort wuerfelt das Werkzeug eines aus — das ist der bessere Weg,
 * weil ein selbst ausgedachtes Passwort fast immer schwaecher ist.
 *
 * Ausgegeben wird beides: die Zeile fuer die Mitgliederdatei und die Zeile
 * fuer die Umgebungsvariable. Das Passwort steht nur hier im Fenster —
 * danach ist es aus dem Hash nicht mehr zu holen. Weitergeben ueber einen
 * anderen Kanal als die E-Mail-Adresse selbst.
 */
import { scryptSync, randomBytes } from "node:crypto";

/* Dieselbe Kostenstufe, die src/lib/mitglieder.ts erwartet. Hoeher heisst
   sicherer und langsamer; 16384 braucht auf einem kleinen Server rund
   100 ms und ist fuer eine Anmeldung eine vernuenftige Groesse. */
const N = 16384;

if (process.argv.includes("--geheimnis")) {
  console.log(
    "\nCLUB_SITZUNG_GEHEIMNIS=" + randomBytes(32).toString("base64url"),
  );
  console.log(
    "\nDiesen Wert in die Umgebungsvariablen des Hosters eintragen.\n" +
      "Aendert er sich, sind alle laufenden Anmeldungen sofort ungueltig.\n",
  );
  process.exit(0);
}

const [email, name, gewuenscht] = process.argv.slice(2);

if (!email || !name) {
  console.error(
    "\nAufruf: node tools/mitglied.mjs <e-mail> <name> [passwort]\n" +
      "        node tools/mitglied.mjs --geheimnis\n",
  );
  process.exit(1);
}

if (!email.includes("@")) {
  console.error(`\n"${email}" sieht nicht wie eine E-Mail-Adresse aus.\n`);
  process.exit(1);
}

/* Ohne mehrdeutige Zeichen: kein O gegen 0, kein l gegen 1 gegen I. Wer das
   Passwort abtippt oder am Telefon durchgibt, soll sich nicht vertun. */
const ZEICHEN = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function gewuerfelt(laenge = 16) {
  const bytes = randomBytes(laenge * 2);
  let wort = "";
  /* Werte am Rand ueberspringen, sonst kaemen die ersten Zeichen des
     Alphabets haeufiger vor als die letzten. */
  const grenze = 256 - (256 % ZEICHEN.length);
  for (const b of bytes) {
    if (b >= grenze) continue;
    wort += ZEICHEN[b % ZEICHEN.length];
    if (wort.length === laenge) break;
  }
  return wort.length === laenge ? wort : gewuerfelt(laenge);
}

const passwort = gewuerfelt();
const genutzt = gewuenscht || passwort;

if (gewuenscht && gewuenscht.length < 10) {
  console.error("\nDas Passwort ist zu kurz. Mindestens 10 Zeichen.\n");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(genutzt, salt, 32, { N, maxmem: 256 * N * 8 });
/* Punkt als Trenner und base64url statt base64: mit "$" im Hash frisst
   Nexts .env-Leser Teile davon auf (er ersetzt "$name" durch den Wert
   einer Variablen, die es nicht gibt). Der Hash kaeme dann verstuemmelt
   an und niemand koennte sich anmelden. */
const abdruck = `scrypt.${N}.${salt.toString("base64url")}.${hash.toString("base64url")}`;

const eintrag = {
  email: email.trim().toLowerCase(),
  name: name.trim(),
  hash: abdruck,
};

console.log("\n──────────────────────────────────────────────");
console.log("  E-Mail:    " + eintrag.email);
console.log("  Name:      " + eintrag.name);
console.log("  Passwort:  " + genutzt);
console.log("──────────────────────────────────────────────");
console.log(
  "\nDas Passwort steht nur hier. Aus dem Hash unten kommt es nicht zurueck.",
);

console.log("\n\n1) Fuer die Mitgliederdatei (CLUB_MITGLIEDER_DATEI):\n");
console.log("   " + JSON.stringify(eintrag));

console.log("\n\n2) Oder als Teil von CLUB_MITGLIEDER (mit ; aneinanderhaengen):\n");
console.log(`   ${eintrag.email}|${eintrag.name}|${eintrag.hash}`);
console.log("");
