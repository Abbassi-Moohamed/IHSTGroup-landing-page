import type { BadgeProps } from "@/types";

const badgeVariants = {
  primary:
    "inline-flex max-w-full items-center justify-center rounded-full bg-rosewood/15 px-6 py-4 text-center text-lg uppercase leading-6 tracking-[0.35em] text-white shadow-soft",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <div className={`${badgeVariants[variant]} ${className}`.trim()}>
      {children}
    </div>
  );
}
