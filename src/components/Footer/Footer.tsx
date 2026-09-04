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

          <div className={styles.navs}>
            <nav className={styles.social} aria-label="Kanäle">
              {footer.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.label}
                  <span className={styles.handle}>{item.handle}</span>
                </a>
              ))}
            </nav>

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
        </div>

        <p className={styles.legal}>{footer.legalNote}</p>
      </div>
    </footer>
  );
}
