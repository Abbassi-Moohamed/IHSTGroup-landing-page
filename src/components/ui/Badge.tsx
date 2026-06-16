import type { BadgeProps } from "@/types";

const badgeVariants = {
  primary:
    "inline-flex max-w-full items-center justify-center rounded-full bg-rosewood/15 px-4 py-3 text-center text-sm uppercase leading-5 tracking-[0.35em] text-white shadow-soft sm:px-6 sm:py-4 sm:text-lg sm:leading-6",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <div className={`${badgeVariants[variant]} ${className}`.trim()}>
      {children}
    </div>
  );
}
