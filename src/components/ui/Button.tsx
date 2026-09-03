import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant =
  | "primary"
  | "primaryOnDark"
  | "accent"
  | "ghost"
  | "ghostOnDark";

interface BaseProps {
  variant?: Variant;
  full?: boolean;
  /** Play-Dreieck vor dem Label (Trailer-CTAs). */
  withPlayIcon?: boolean;
  children: ReactNode;
  className?: string;
}

const PlayIcon = () => (
  <svg className={styles.icon} viewBox="0 0 12 14" aria-hidden="true">
    <path d="M0 0v14l12-7z" />
  </svg>
);

function classes(variant: Variant, full?: boolean, className?: string) {
  return [styles.btn, styles[variant], full ? styles.full : "", className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  full,
  withPlayIcon,
  children,
  className,
  type = "button",
  ...rest
}: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      className={classes(variant, full, className)}
      {...rest}
    >
      {withPlayIcon ? <PlayIcon /> : null}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  full,
  withPlayIcon,
  children,
  className,
  ...rest
}: BaseProps & ComponentPropsWithoutRef<"a">) {
  return (
    <a className={classes(variant, full, className)} {...rest}>
      {withPlayIcon ? <PlayIcon /> : null}
      {children}
    </a>
  );
}
