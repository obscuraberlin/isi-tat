"use client";

import { useEffect } from "react";
import { brand } from "@/data/landingPage";

/* Kurze Auswahlen bleiben unangetastet: wer eine E-Mail-Adresse, eine
   Telefonnummer oder ein einzelnes Wort kopiert, soll genau das im
   Zwischenspeicher haben und nicht drei Zeilen Anhang. */
const AB_ZEICHEN = 60;

/**
 * Haengt an laengere kopierte Passagen eine Herkunftszeile.
 *
 * Das ist kein Kopierschutz — den gibt es im Web nicht. Was ein Browser
 * anzeigt, kann er auch herausgeben: Quelltext, Entwicklerwerkzeuge,
 * `curl`, Vorlesefunktion, Bildschirmfoto. Wer Text auswaehlen oder das
 * Kontextmenue sperrt, hindert nur die eigenen Besucher — und bricht
 * dabei Vorlesegeraete und die Lesemodi der Telefone.
 *
 * Was funktioniert, ist Nachweisbarkeit: wandert der Text weiter, wandert
 * die Quelle mit. Taucht er woanders auf, steht dort, woher er kommt.
 *
 * Gesetzt werden beide Fassungen — reiner Text und HTML. Sonst faellt die
 * Zeile weg, sobald jemand in ein Programm einfuegt, das Formatierung
 * uebernimmt.
 */
export function Kopierstempel() {
  useEffect(() => {
    const beim = (e: ClipboardEvent) => {
      const auswahl = window.getSelection();
      const text = auswahl?.toString() ?? "";
      if (text.trim().length < AB_ZEICHEN) return;
      if (!e.clipboardData) return;

      const quelle = `${brand.name} ${brand.suffix} — ${window.location.origin}${window.location.pathname}`;

      e.clipboardData.setData("text/plain", `${text}\n\n${quelle}`);
      e.clipboardData.setData(
        "text/html",
        `${htmlAusAuswahl(auswahl)}<p>${escape(quelle)}</p>`,
      );
      e.preventDefault();
    };

    document.addEventListener("copy", beim);
    return () => document.removeEventListener("copy", beim);
  }, []);

  return null;
}

/** Die Auswahl als HTML — behaelt Absaetze und Auszeichnungen. */
function htmlAusAuswahl(auswahl: Selection | null) {
  if (!auswahl || auswahl.rangeCount === 0) return "";
  const huelle = document.createElement("div");
  huelle.appendChild(auswahl.getRangeAt(0).cloneContents());
  return huelle.innerHTML;
}

function escape(wert: string) {
  return wert
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
