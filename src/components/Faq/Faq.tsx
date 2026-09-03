"use client";

import { useState } from "react";
import { faq, isPending } from "@/data/landingPage";
import { SectionHead } from "@/components/ui/SectionHead";
import styles from "./Faq.module.css";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <SectionHead
          eyebrow={faq.eyebrow}
          lines={faq.headline}
          className={styles.head}
        />

        <div className={styles.list}>
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.q} className={styles.item}>
                <h3>
                  <button
                    type="button"
                    className={[styles.trigger, open ? styles.open : ""]
                      .filter(Boolean)
                      .join(" ")}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    {item.q}
                    <span className={styles.icon} aria-hidden="true" />
                  </button>
                </h3>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={[styles.panel, open ? styles.panelOpen : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles.panelInner}>
                    <p
                      className={[
                        styles.answer,
                        isPending(item.a) ? styles.answerPending : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {isPending(item.a)
                        ? "Diese Angabe wird ergänzt, sobald sie feststeht."
                        : item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
