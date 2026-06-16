import type { CardProps } from "@/types";

const cardVariants = {
  stat: "rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-100 shadow-soft backdrop-blur",
  benefit:
    "rounded-3xl border border-burgundy/15 bg-navy/80 px-6 py-5 text-sm text-slate-200 shadow-soft",
  feature:
    "overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft transition duration-500 hover:-translate-y-2 hover:border-burgundy/30",
};

export function Card({ variant, className = "", children }: CardProps) {
  return (
    <div className={`${cardVariants[variant]} ${className}`.trim()}>
      {children}
    </div>
  );
}
