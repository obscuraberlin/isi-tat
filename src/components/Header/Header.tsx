"use client";

import { useCallback, useEffect, useState } from "react";
import { brand, cta, nav } from "@/data/landingPage";
import {
  useActiveSection,
  useBackdropTone,
  useScrollLock,
  useScrolledPast,
} from "@/lib/hooks";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./Header.module.css";

const NAV_HREFS = nav.map((item) => item.href);

/** Grober Wert — dient nur als Messpunkt fuer die Untergrundfarbe. */
const HEADER_HEIGHT = 84;

function Logo() {
  return (
    <a href="#top" className={styles.logo} aria-label={brand.fullName}>
      {/* [LOGO_ISI_TAT] — Text-Platzhalter, wird spaeter durch das echte Logo ersetzt. */}
      <span className={styles.logoMark}>{brand.name}</span>
      <span className={styles.logoSuffix}>{brand.suffix}</span>
    </a>
  );
}

export function Header() {
  const scrolled = useScrolledPast(80);
  const tone = useBackdropTone(HEADER_HEIGHT);
  const active = useActiveSection(NAV_HREFS);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollLock(menuOpen);

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, close]);

  return (
    <>
      <header
        className={[
          styles.header,
          scrolled && !menuOpen ? styles.scrolled : "",
          scrolled && !menuOpen && tone === "dark" ? styles.scrolledDark : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.inner}>
          <Logo />

          <nav className={styles.nav} aria-label="Hauptnavigation">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={[
                  styles.navLink,
                  active === item.href ? styles.navLinkActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active === item.href ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a href={cta.login.href} className={styles.login}>
              {cta.login.label}
            </a>
            <ButtonLink
              href={cta.primary.href}
              variant="primary"
              className={styles.headerCta}
            >
              {cta.primary.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            className={[styles.burger, menuOpen ? styles.burgerOpen : ""]
              .filter(Boolean)
              .join(" ")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className={styles.burgerLine} aria-hidden="true" />
            <span className={styles.burgerLine} aria-hidden="true" />
            <span className={styles.burgerLine} aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div id="mobile-menu" className={styles.menu}>
          <nav className={styles.menuNav} aria-label="Mobile Navigation">
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.menuLink}
                style={{ ["--i" as string]: index }}
                onClick={close}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.menuFooter}>
            <a href={cta.login.href} className={styles.menuLogin} onClick={close}>
              {cta.login.label}
            </a>
            <ButtonLink
              href={cta.primary.href}
              variant="primaryOnDark"
              full
              onClick={close}
            >
              {cta.primary.label}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </>
  );
}
