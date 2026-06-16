import type { ReactNode, MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 py-2 text-sm sm:h-9",
  md: "h-12 px-5 py-3 text-sm sm:h-11 sm:px-6",
  lg: "h-13 px-7 py-3 text-base",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-burgundy text-white hover:bg-[#9b2d26]",
  secondary:
    "border border-white/15 bg-white/5 text-slate-100 transition hover:border-burgundy hover:text-white",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full font-semibold shadow-glow transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
    buttonSizes[size],
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
