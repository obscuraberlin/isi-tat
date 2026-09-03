import { lifestyle } from "@/data/landingPage";
import { Media } from "@/components/Media/Media";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Lifestyle.module.css";

export function Lifestyle() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headWrap}>
          <SectionHead
            eyebrow={lifestyle.eyebrow}
            lines={lifestyle.headline}
            accentLines={lifestyle.headlineAccent}
          />

          <Reveal delay={140}>
            <div className={styles.body}>
              {lifestyle.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className={styles.gallery}>
          {lifestyle.gallery.map((asset, index) => (
            <Reveal key={asset.id} className={styles.tile} delay={index * 80}>
              <Media asset={asset} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.disclaimer}>{lifestyle.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
