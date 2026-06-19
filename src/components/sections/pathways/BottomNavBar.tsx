"use client";

import type { Section } from "@/types";

interface BottomNavBarProps {
  sections: Section[];
  activeCard: number;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
}

export function BottomNavBar({
  sections,
  activeCard,
  onHover,
  onClick,
}: BottomNavBarProps) {
  return (
    <nav className="flex items-center justify-center gap-3 overflow-x-auto px-4 py-3">
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick(index)}
          className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs transition-all duration-500 ${
            index === activeCard
              ? "border-burgundy bg-slate-900 text-white shadow-glow"
              : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:bg-white/[0.06]"
          }`}
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold transition-all duration-500 ${
              index === activeCard
                ? "border-burgundy bg-burgundy text-white"
                : "border-white/10 bg-slate-950/70 text-slate-500"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="truncate whitespace-nowrap">{section.title}</span>
        </button>
      ))}
    </nav>
  );
}
