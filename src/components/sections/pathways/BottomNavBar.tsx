"use client";

import { type Section } from "@/types";

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
    <nav className="flex items-center justify-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
      {sections.map((section, index) => {
        const isActive = index === activeCard;

        return (
          <button
            key={section.id}
            type="button"
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(index)}
            className={`group relative flex shrink-0 items-center gap-2 rounded-xl border px-2.5 py-2 text-xs transition-all duration-300 ease-out sm:px-3 ${
              isActive
              ? "border-rosewood/50 bg-slate-900 text-white shadow-[0_0_30px_-8px_rgba(180,71,63,0.2)]"
              : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-slate-300"
            }`}
          >
            {isActive && (
              <span className="absolute -inset-0.5 rounded-xl bg-rosewood/5 blur-sm" />
            )}
            <span
              className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[8px] font-semibold transition-all duration-300 ${
                isActive
                  ? "border-rosewood/60 bg-rosewood/20 text-rosewood"
                  : "border-white/[0.08] bg-white/[0.03] text-slate-600 group-hover:border-white/[0.15]"
              }`}
            >
              {index + 1}
            </span>
            <span className="relative truncate whitespace-nowrap font-medium">
              {section.tag ?? section.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
