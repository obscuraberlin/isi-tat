import { appendFileSync } from "node:fs";
import nodemailer from "nodemailer";

/**
 * Mails aus dem Club: Bestaetigungen, Links, Hinweise.
 *
 * Dieselben Zugangsdaten wie das Bewerbungsformular (BEWERBUNG_SMTP_*),
 * derselbe Weg: vom eigenen Server ins eigene Postfach, kein Dienst
 * dazwischen. Fehlen die Zugangsdaten, sagt `postBereit()` nein — und
 * die Stelle, die schicken will, sagt dem Mitglied ehrlich, dass der
 * Versand auf diesem Server noch nicht eingerichtet ist.
 *
 * CLUB_POST_ABLAGE: nur zum Testen. Steht dort ein Dateipfad, wird jede
 * Mail als Zeile dorthin geschrieben statt verschickt.
 */

const MARKE = "ISI TAT BUSINESS CLUB";

export const clubAdresse = () => (process.env.CLUB_ADRESSE || "").replace(/\/+$/, "");

export function postBereit(): boolean {
  if (process.env.CLUB_POST_ABLAGE) return true;
  const { BEWERBUNG_SMTP_HOST, BEWERBUNG_SMTP_USER, BEWERBUNG_SMTP_PASS } = process.env;
  return Boolean(BEWERBUNG_SMTP_HOST && BEWERBUNG_SMTP_USER && BEWERBUNG_SMTP_PASS);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Text und HTML aus denselben Absaetzen — schlicht, ohne Bilder, ohne
 * Schrift von aussen. Der Knopf ist ein Link; in der Textfassung steht
 * die Adresse ausgeschrieben.
 */
export function mailRahmen(
  titel: string,
  absaetze: readonly string[],
  knopf?: { text: string; href: string },
  fuss = "Falls du das nicht warst, antworte kurz auf diese Mail. Dann sehen wir nach.",
) {
  const text = [
    ...absaetze,
    "",
    ...(knopf ? [`${knopf.text}: ${knopf.href}`, ""] : []),
    `${MARKE}`,
    "",
    "—",
    fuss,
  ].join("\n");

  const html = `<!doctype html>
<html lang="de">
<body style="margin:0;padding:0;background:#f4f2ee;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f2ee;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;">
        <tr><td style="padding:36px 40px 0 40px;">
          <div style="font-size:14px;font-weight:700;letter-spacing:0.04em;">ISI TAT</div>
          <div style="font-size:9px;letter-spacing:0.3em;color:#777777;margin-top:3px;">BUSINESS CLUB</div>
        </td></tr>
        <tr><td style="padding:32px 40px 0 40px;">
          <div style="font-size:26px;line-height:1.15;font-weight:700;letter-spacing:-0.02em;">${esc(titel)}</div>
        </td></tr>
        ${absaetze
          .map(
            (a) =>
              `<tr><td style="padding:18px 40px 0 40px;font-size:16px;line-height:1.6;">${esc(a)}</td></tr>`,
          )
          .join("")}
        ${
          knopf
            ? `<tr><td style="padding:26px 40px 0 40px;">
          <a href="${esc(knopf.href)}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.12em;padding:15px 28px;border-radius:6px;">${esc(knopf.text)}</a>
        </td></tr>
        <tr><td style="padding:14px 40px 0 40px;font-size:12px;line-height:1.6;color:#999999;word-break:break-all;">Falls der Knopf nicht geht: ${esc(knopf.href)}</td></tr>`
            : ""
        }
        <tr><td style="padding:26px 40px 0 40px;font-size:16px;line-height:1.6;"><strong>${MARKE}</strong></td></tr>
        <tr><td style="padding:30px 40px 36px 40px;font-size:12px;line-height:1.6;color:#999999;border-top:1px solid #eeeae2;">${esc(fuss)}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { text, html };
}

export async function postSenden(mail: {
  an: string;
  name?: string;
  betreff: string;
  text: string;
  html: string;
  /** Antworten sollen hierhin — z. B. an das Mitglied bei einer Support-Anfrage. */
  antwortAn?: string;
}) {
  const ablage = process.env.CLUB_POST_ABLAGE;
  if (ablage) {
    appendFileSync(
      ablage,
      JSON.stringify({ an: mail.an, betreff: mail.betreff, text: mail.text, zeit: Date.now() }) + "\n",
    );
    return;
  }

  const port = Number(process.env.BEWERBUNG_SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.BEWERBUNG_SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.BEWERBUNG_SMTP_USER, pass: process.env.BEWERBUNG_SMTP_PASS },
  });

  await transport.sendMail({
    from: process.env.BEWERBUNG_ABSENDER ?? process.env.BEWERBUNG_SMTP_USER,
    to: mail.name ? `${mail.name.replace(/[<>"]/g, "")} <${mail.an}>` : mail.an,
    replyTo: mail.antwortAn ?? process.env.BEWERBUNG_EMPFAENGER ?? undefined,
    subject: mail.betreff,
    text: mail.text,
    html: mail.html,
  });
}

/** Wohin Anfragen an ISI gehen — dasselbe Postfach wie die Bewerbungen. */
export const postfachIsi = () => process.env.BEWERBUNG_EMPFAENGER ?? null;
