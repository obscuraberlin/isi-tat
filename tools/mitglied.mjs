/**
 * Legt ein Mitgliedskonto an und schickt die Bestaetigung per Mail.
 *
 *   node tools/mitglied.mjs max@beispiel.de "Max Muster"
 *   node tools/mitglied.mjs max@beispiel.de "Max Muster" WunschPasswort
 *   node tools/mitglied.mjs --mail max@beispiel.de     Bestaetigung erneut
 *   node tools/mitglied.mjs --liste                     wer ist drin
 *   node tools/mitglied.mjs --geheimnis                 Schluessel fuer .env
 *
 * Was beim Anlegen passiert:
 *
 *   1. Das Passwort wird als scrypt-Hash in daten/mitglieder.json
 *      geschrieben (oder wohin CLUB_MITGLIEDER_DATEI zeigt). Die laufende
 *      Anwendung liest die Datei beim naechsten Aufruf neu — kein Deploy,
 *      kein Neustart.
 *   2. Das neue Mitglied bekommt eine Mail: Konto angelegt, hier geht es
 *      zur Anmeldung. Das Passwort steht NICHT in der Mail. Eine Mail
 *      liegt in Postfaechern, Sicherungen und auf Telefonen; wer sie
 *      spaeter findet, soll damit nichts anfangen koennen. Das Passwort
 *      wird getrennt uebergeben — muendlich, per Nachricht, wie auch immer.
 *
 * Ohne Passwort wuerfelt das Werkzeug eines aus. Das ist der bessere Weg:
 * ein selbst ausgedachtes ist fast immer schwaecher.
 *
 * Fuer die Mail gelten dieselben Zugangsdaten wie fuer das
 * Bewerbungsformular (BEWERBUNG_SMTP_*). Fehlen sie, wird das Konto
 * trotzdem angelegt — und das Werkzeug sagt deutlich, dass keine Mail
 * rausging.
 */
import { scryptSync, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import nodemailer from "nodemailer";

/* .env.local lesen, wie es die Anwendung auch tut — sonst muesste man die
   SMTP-Zugangsdaten beim Aufruf jedes Mal mitgeben. */
for (const datei of [".env.local", ".env"]) {
  if (existsSync(datei)) {
    try {
      process.loadEnvFile(datei);
    } catch {
      /* aeltere Node-Version ohne loadEnvFile — dann eben ohne */
    }
  }
}

/* Dieselbe Kostenstufe, die src/lib/mitglieder.ts erwartet. */
const N = 16384;

const DATEI =
  process.env.CLUB_MITGLIEDER_DATEI ||
  resolve(process.cwd(), "daten", "mitglieder.json");

const MARKE = "ISI TAT BUSINESS CLUB";

/* ---------- Datei ---------- */

function lesen() {
  if (!existsSync(DATEI)) return [];
  const roh = JSON.parse(readFileSync(DATEI, "utf8"));
  if (!Array.isArray(roh)) {
    throw new Error(`${DATEI} enthaelt keine Liste.`);
  }
  return roh;
}

function schreiben(liste) {
  mkdirSync(dirname(DATEI), { recursive: true });
  writeFileSync(DATEI, JSON.stringify(liste, null, 2) + "\n", { mode: 0o600 });
}

/* ---------- Passwort ---------- */

/* Ohne mehrdeutige Zeichen: kein O gegen 0, kein l gegen 1 gegen I. Wer das
   Passwort abtippt oder am Telefon durchgibt, soll sich nicht vertun. */
const ZEICHEN = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function gewuerfelt(laenge = 16) {
  const bytes = randomBytes(laenge * 2);
  let wort = "";
  const grenze = 256 - (256 % ZEICHEN.length);
  for (const b of bytes) {
    if (b >= grenze) continue;
    wort += ZEICHEN[b % ZEICHEN.length];
    if (wort.length === laenge) break;
  }
  return wort.length === laenge ? wort : gewuerfelt(laenge);
}

function hashen(passwort) {
  const salt = randomBytes(16);
  const hash = scryptSync(passwort, salt, 32, { N, maxmem: 256 * N * 8 });
  /* Punkt als Trenner und base64url: mit "$" im Hash frisst Nexts
     .env-Leser Teile davon auf. */
  return `scrypt.${N}.${salt.toString("base64url")}.${hash.toString("base64url")}`;
}

/* ---------- Mail ---------- */

function mailBereit() {
  const { BEWERBUNG_SMTP_HOST, BEWERBUNG_SMTP_USER, BEWERBUNG_SMTP_PASS } =
    process.env;
  return Boolean(BEWERBUNG_SMTP_HOST && BEWERBUNG_SMTP_USER && BEWERBUNG_SMTP_PASS);
}

/**
 * Die Bestaetigung.
 *
 * Schlicht und in beiden Fassungen — reiner Text fuer alles, was HTML
 * nicht anzeigt, und HTML fuer den Rest. Kein Bild, keine Schrift von
 * aussen: beides laden viele Postfaecher nicht, und eine Mail, die aus
 * grauen Kaesten besteht, wirkt nicht wie ein Club.
 */
function willkommensmail(mitglied) {
  const adresse = (process.env.CLUB_ADRESSE || "").replace(/\/+$/, "");
  const anmeldung = adresse ? `${adresse}/login/` : null;
  const vorname = mitglied.name.trim().split(/\s+/)[0] || mitglied.name;

  const text = [
    `Hallo ${vorname},`,
    ``,
    `dein Zugang zum ${MARKE} ist angelegt.`,
    ``,
    anmeldung ? `Anmelden:  ${anmeldung}` : `Anmelden: auf der Website unter „Login“`,
    `E-Mail:    ${mitglied.email}`,
    ``,
    `Dein Passwort bekommst du getrennt von dieser Mail. Es steht hier`,
    `mit Absicht nicht — eine Mail liegt an zu vielen Orten.`,
    ``,
    `Im Club findest du die Inhalte, die Live-Termine und den Kanal.`,
    ``,
    `Bis gleich im Club.`,
    `ISI TAT`,
    ``,
    `—`,
    `Falls du diesen Zugang nicht erwartet hast, antworte kurz auf diese`,
    `Mail. Dann sehen wir nach.`,
  ].join("\n");

  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `<!doctype html>
<html lang="de">
<body style="margin:0;padding:0;background:#f4f2ee;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f2ee;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;">
        <tr><td style="padding:36px 40px 0 40px;">
          <div style="font-size:14px;font-weight:700;letter-spacing:0.04em;color:#111111;">ISI TAT</div>
          <div style="font-size:9px;letter-spacing:0.3em;color:#777777;margin-top:3px;">BUSINESS CLUB</div>
        </td></tr>
        <tr><td style="padding:32px 40px 0 40px;">
          <div style="font-size:26px;line-height:1.15;font-weight:700;letter-spacing:-0.02em;">Dein Zugang ist angelegt.</div>
        </td></tr>
        <tr><td style="padding:20px 40px 0 40px;font-size:16px;line-height:1.6;">
          Hallo ${esc(vorname)},<br><br>
          dein Zugang zum ${MARKE} ist eingerichtet. Melde dich mit deiner E-Mail-Adresse an:
        </td></tr>
        <tr><td style="padding:22px 40px 0 40px;">
          <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;background:#f4f2ee;border-radius:10px;">
            <tr><td style="padding:16px 20px;font-size:15px;line-height:1.7;">
              <span style="color:#777777;">E-Mail</span>&nbsp;&nbsp;<strong>${esc(mitglied.email)}</strong>
            </td></tr>
          </table>
        </td></tr>
        ${
          anmeldung
            ? `<tr><td style="padding:26px 40px 0 40px;">
          <a href="${esc(anmeldung)}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.12em;padding:15px 28px;border-radius:6px;">ZUM CLUB</a>
        </td></tr>`
            : ``
        }
        <tr><td style="padding:26px 40px 0 40px;font-size:14px;line-height:1.6;color:#555555;">
          Dein Passwort bekommst du getrennt von dieser Mail. Es steht hier mit Absicht nicht — eine Mail liegt an zu vielen Orten.
        </td></tr>
        <tr><td style="padding:22px 40px 0 40px;font-size:16px;line-height:1.6;">
          Im Club findest du die Inhalte, die Live-Termine und den Kanal.<br><br>
          Bis gleich im Club.<br>
          <strong>ISI TAT</strong>
        </td></tr>
        <tr><td style="padding:30px 40px 36px 40px;font-size:12px;line-height:1.6;color:#999999;border-top:1px solid #eeeae2;margin-top:30px;">
          Falls du diesen Zugang nicht erwartet hast, antworte kurz auf diese Mail. Dann sehen wir nach.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: `Dein Zugang zum ${MARKE}`, text, html };
}

async function senden(mitglied) {
  if (!mailBereit()) {
    console.log(
      "\n  Keine Mail verschickt: BEWERBUNG_SMTP_HOST/USER/PASS sind nicht gesetzt.\n" +
        "  Nachholen mit:  node tools/mitglied.mjs --mail " + mitglied.email + "\n",
    );
    return false;
  }

  const port = Number(process.env.BEWERBUNG_SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.BEWERBUNG_SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.BEWERBUNG_SMTP_USER,
      pass: process.env.BEWERBUNG_SMTP_PASS,
    },
  });

  const mail = willkommensmail(mitglied);
  await transport.sendMail({
    from: process.env.BEWERBUNG_ABSENDER ?? process.env.BEWERBUNG_SMTP_USER,
    to: `${mitglied.name} <${mitglied.email}>`,
    /* Antworten landen dort, wo auch die Bewerbungen ankommen. */
    replyTo: process.env.BEWERBUNG_EMPFAENGER ?? undefined,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
  console.log(`\n  Bestaetigung an ${mitglied.email} verschickt.\n`);
  return true;
}

/* ---------- Befehle ---------- */

const args = process.argv.slice(2);

if (args.includes("--geheimnis")) {
  console.log("\nCLUB_SITZUNG_GEHEIMNIS=" + randomBytes(32).toString("base64url"));
  console.log(
    "\nOptional. Ohne diesen Wert legt der Server beim ersten Start selbst\n" +
      "einen in daten/geheimnis an. Wird der Wert geaendert, sind alle\n" +
      "laufenden Anmeldungen sofort ungueltig.\n",
  );
  process.exit(0);
}

if (args.includes("--liste")) {
  const liste = lesen();
  if (liste.length === 0) {
    console.log(`\nNoch kein Konto in ${DATEI}\n`);
  } else {
    console.log(`\n${liste.length} Konto${liste.length === 1 ? "" : "s"} in ${DATEI}\n`);
    for (const m of liste) {
      console.log(`  ${m.email.padEnd(34)} ${m.name.padEnd(24)} ${m.angelegt ?? ""}`);
    }
    console.log("");
  }
  process.exit(0);
}

if (args[0] === "--mail") {
  const gesucht = (args[1] ?? "").trim().toLowerCase();
  const mitglied = lesen().find((m) => m.email.toLowerCase() === gesucht);
  if (!mitglied) {
    console.error(`\nKein Konto fuer "${gesucht}" in ${DATEI}\n`);
    process.exit(1);
  }
  await senden(mitglied);
  process.exit(0);
}

const [emailRoh, name, gewuenscht] = args;

if (!emailRoh || !name) {
  console.error(
    "\nAufruf: node tools/mitglied.mjs <e-mail> \"<name>\" [passwort]\n" +
      "        node tools/mitglied.mjs --mail <e-mail>\n" +
      "        node tools/mitglied.mjs --liste\n" +
      "        node tools/mitglied.mjs --geheimnis\n",
  );
  process.exit(1);
}

const email = emailRoh.trim().toLowerCase();

if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
  console.error(`\n"${email}" sieht nicht wie eine E-Mail-Adresse aus.\n`);
  process.exit(1);
}

if (gewuenscht !== undefined && gewuenscht.length < 6) {
  console.error("\nDas Passwort ist zu kurz. Mindestens 6 Zeichen.\n");
  process.exit(1);
}

const liste = lesen();
const vorhanden = liste.findIndex((m) => m.email.toLowerCase() === email);

const passwort = gewuenscht ?? gewuerfelt();
const eintrag = {
  email,
  name: name.trim(),
  hash: hashen(passwort),
  angelegt: new Date().toISOString().slice(0, 10),
};

if (vorhanden >= 0) {
  /* Dasselbe Konto noch einmal anlegen heisst: neues Passwort. Der Tag des
     Anlegens bleibt, wie er war. */
  eintrag.angelegt = liste[vorhanden].angelegt ?? eintrag.angelegt;
  liste[vorhanden] = eintrag;
} else {
  liste.push(eintrag);
}
schreiben(liste);

console.log("\n──────────────────────────────────────────────");
console.log(`  ${vorhanden >= 0 ? "Passwort erneuert" : "Konto angelegt"}`);
console.log("──────────────────────────────────────────────");
console.log("  E-Mail:    " + eintrag.email);
console.log("  Name:      " + eintrag.name);
console.log("  Passwort:  " + passwort);
console.log("  Datei:     " + DATEI);
console.log("──────────────────────────────────────────────");
console.log(
  "\n  Das Passwort steht nur hier. Aus dem Hash in der Datei kommt es nicht\n" +
    "  zurueck, und in der Mail steht es nicht. Getrennt uebergeben.",
);

/* Beim Erneuern eines Passworts keine Mail — die sagt "Konto angelegt",
   und das stimmt dann nicht. */
if (vorhanden < 0) {
  try {
    await senden(eintrag);
  } catch (fehler) {
    console.error(
      "\n  Konto ist angelegt, aber die Mail kam nicht raus:\n  " +
        (fehler?.message ?? fehler) +
        "\n  Nachholen mit:  node tools/mitglied.mjs --mail " + eintrag.email + "\n",
    );
    process.exit(2);
  }
}
