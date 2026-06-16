import { memo } from "react";
import type { Section } from "@/types";

interface CylinderCardProps {
  section: Section;
  index: number;
  total: number;
  radius: number;
  isActive: boolean;
}

const CARD_WIDTH = 460;
const CARD_HALF_W = CARD_WIDTH / 2;
const CARD_HEIGHT = 190;

export const CylinderCard = memo(function CylinderCard({
  section,
  index,
  total,
  radius,
  isActive,
}: CylinderCardProps) {
  const CARD_SPACING = 50;
  const angle = -(index * CARD_SPACING);

  return (
    <div
      className="absolute"
      style={{
        width: CARD_WIDTH,
        left: "50%",
        top: "44%",
        marginLeft: -CARD_HALF_W,
        marginTop: -(CARD_HEIGHT / 2),
        transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className={`
          flex gap-3 rounded-2xl border p-4 shadow-lg transition-all duration-700
          ${isActive
            ? "border-burgundy/60 bg-white/10 shadow-[0_0_50px_rgba(139,39,32,0.12)]"
            : "border-white/10 bg-white/[0.04]"
          }
        `}
        style={{
          backfaceVisibility: "hidden",
          height: CARD_HEIGHT,
        }}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <div className="inline-block self-start rounded-full bg-rosewood/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-rosewood/90">
            {section.id}
          </div>

          <h3
            className={`font-semibold leading-tight transition-colors duration-300 text-sm ${
              isActive ? "text-white" : "text-white/70"
            }`}
          >
            {section.title}
          </h3>

          <p className="line-clamp-2 text-[11px] leading-relaxed text-white/60">
            {section.description}
          </p>
        </div>

        <div className="flex w-32 shrink-0 flex-col justify-center gap-1">
          {section.highlights.slice(0, 3).map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-1 text-[10px] text-white/50"
            >
              <span
                className={`h-1 w-1 shrink-0 rounded-full ${
                  isActive ? "bg-burgundy" : "bg-white/40"
                }`}
              />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
