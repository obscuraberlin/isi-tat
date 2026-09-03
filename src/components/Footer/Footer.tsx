import { brand, footer, isPending } from "@/data/landingPage";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            {/* [LOGO_ISI_TAT] */}
            <span className={styles.logoMark}>
              {brand.name}
              <span className={styles.logoSuffix}>{brand.suffix}</span>
            </span>
          </div>

          <nav className={styles.links} aria-label="Rechtliches">
            {footer.links.map((item) =>
              isPending(item.href) ? (
                <span key={item.label} className={styles.linkPending}>
                  {item.label}
                </span>
              ) : (
                <a key={item.label} href={item.href} className={styles.link}>
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>

        <p className={styles.legal}>{footer.legalNote}</p>
      </div>
    </footer>
  );
}
