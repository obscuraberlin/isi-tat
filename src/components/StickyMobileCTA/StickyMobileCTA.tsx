"use client";

import { cta } from "@/data/landingPage";
import { useMediaQuery, useScrollProgress } from "@/lib/hooks";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./StickyMobileCTA.module.css";

/** Erscheint erst ab ~40 % Scrolltiefe — nicht direkt beim Seitenaufruf. */
export function StickyMobileCTA() {
  const progress = useScrollProgress();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!isMobile) return null;

  return (
    <div
      className={[styles.bar, progress > 0.4 ? styles.visible : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={progress <= 0.4}
    >
      <ButtonLink
        href={cta.primary.href}
        variant="primaryOnDark"
        full
        className={styles.cta}
        tabIndex={progress > 0.4 ? undefined : -1}
      >
        {cta.primary.label}
      </ButtonLink>
    </div>
  );
}
