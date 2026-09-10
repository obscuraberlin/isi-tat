import { NextResponse } from "next/server";
import { angemeldet } from "@/lib/zugang";
import { mitgliedMit } from "@/lib/mitglieder";
import { zusagenVon } from "@/lib/zusagen";

/**
 * Auskunft nach Art. 15 DSGVO — alles, was der Server ueber ein Mitglied
 * hat, als Datei. Das ist bewusst kurz: Konto und Zusagen. Der Stand in
 * den Folgen liegt nur im Browser und steht deshalb nicht hier.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const sitzung = await angemeldet();
  if (!sitzung) return new NextResponse(null, { status: 401 });
  const m = mitgliedMit(sitzung.email);

  const daten = {
    stand: new Date().toISOString(),
    konto: {
      email: m?.email ?? sitzung.email,
      name: m?.name ?? sitzung.name,
      angelegt: m?.angelegt ?? null,
      passwort: "nur als scrypt-Hash gespeichert, nicht rückrechenbar",
    },
    zusagen: zusagenVon(sitzung.email),
    nichtAufDemServer: [
      "Welche Folgen du gesehen hast und wo du stehen geblieben bist — das liegt nur in deinem Browser.",
      "Ob du den Gruß beim ersten Mal schon gesehen hast — nur in deinem Browser.",
    ],
  };

  return new NextResponse(JSON.stringify(daten, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": `attachment; filename="isi-tat-club-meine-daten.json"`,
      "cache-control": "private, no-store",
    },
  });
}
