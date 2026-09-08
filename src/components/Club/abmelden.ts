"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Abmelden — an zwei Stellen gebraucht (Kopfzeile und "Mehr" auf dem
 * Telefon), deshalb hier und nicht zweimal getippt.
 *
 * `refresh()` vor `push()`: der Router haelt die Seiten des Clubs im
 * Speicher, und die stammen von vor dem Abmelden. Ohne das blitzt beim
 * Zurueckgehen noch einmal der angemeldete Zustand auf.
 */
export function useAbmelden() {
  const router = useRouter();
  const [geht, setGeht] = useState(false);

  return {
    geht,
    los: async () => {
      setGeht(true);
      try {
        await fetch("/api/anmeldung/", { method: "DELETE" });
      } finally {
        router.refresh();
        router.push("/");
      }
    },
  };
}
