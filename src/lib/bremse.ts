/**
 * Eine einfache Bremse fuer Formulare und Konto-Routen: hoechstens n
 * Versuche je Kennung in einem Zeitfenster. Zaehlt im Arbeitsspeicher —
 * nach einem Neustart ist der Zaehler leer, und mehrere Prozesse zaehlen
 * getrennt. Gegen Durchprobieren von Hand reicht das; gegen einen
 * ernsthaften Angriff hilft nur eine Sperre vor der Anwendung.
 */

const zaehler = new Map<string, number[]>();

export function gebremst(kennung: string, max: number, fensterMs: number): boolean {
  const jetzt = Date.now();
  const liste = (zaehler.get(kennung) ?? []).filter((t) => jetzt - t < fensterMs);
  if (liste.length >= max) {
    zaehler.set(kennung, liste);
    return true;
  }
  liste.push(jetzt);
  zaehler.set(kennung, liste);
  if (zaehler.size > 5000) {
    for (const [k, v] of zaehler) {
      if (v.every((t) => jetzt - t >= fensterMs)) zaehler.delete(k);
    }
  }
  return false;
}

/** Die Adresse hinter dem Proxy — fuer die Kennung. */
export function absender(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unbekannt"
  );
}
