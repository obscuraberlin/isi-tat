import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  tone?: "default" | "onDark" | "accent";
  /** Kurzer Strich vor dem Label. */
  rule?: boolean;
  className?: string;
}

export function Eyebrow({
  children,
  tone = "default",
  rule = false,
  className,
}: EyebrowProps) {
  return (
    <p
      className={[
        styles.eyebrow,
        tone !== "default" ? styles[tone] : "",
        rule ? styles.rule : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
