"use client";
import type { Section } from "@/types";

interface TitleCardProps {
  activeCard: number;
  totalCards: number;
  section: Section;
}

export function TitleCard({ activeCard, totalCards, section }: TitleCardProps) {
  return (
    <div className="rounded-2xl bg-slate-950/80 px-8 pt-4 text-center pb-6 backdrop-blur-2xl">
      <p className="text-2xl font-bold uppercase tracking-[0.3em] text-rosewood/90 sm:text-3xl">
        Our pathways
      </p>
      <h2 className="mt-2 text-lg text-white sm:text-xl">
        {section?.title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {String(activeCard + 1).padStart(2, "0")} /{" "}
        {String(totalCards).padStart(2, "0")}
      </p>
      <div className="mx-auto mt-3 h-1 w-56 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rosewood to-rosewood/60 transition-all duration-500 ease-out"
          style={{ width: `${((activeCard + 1) / totalCards) * 100}%` }}
        />
      </div>
    </div>
  );
}
