import { memo } from "react";
import type { Section } from "@/types";

interface CylinderCardProps {
  section: Section;
  index: number;
  total: number;
  radius: number;
  isActive: boolean;
  cardWidth?: number;
  cardHeight?: number;
}

const DEFAULT_WIDTH = 460;
const DEFAULT_HEIGHT = 190;

export const CylinderCard = memo(function CylinderCard({
  section,
  index,
  total,
  radius,
  isActive,
  cardWidth = DEFAULT_WIDTH,
  cardHeight = DEFAULT_HEIGHT,
}: CylinderCardProps) {
  const CARD_SPACING = 50;
  const angle = -(index * CARD_SPACING);
  const cardHalfW = cardWidth / 2;

  return (
    <div
      className="absolute"
      style={{
        width: cardWidth,
        left: "50%",
        top: "44%",
        marginLeft: -cardHalfW,
        marginTop: -(cardHeight / 2),
        transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className={`
          flex gap-2 rounded-2xl border shadow-lg transition-all duration-700
          ${isActive
            ? "border-burgundy/60 bg-white/10 shadow-[0_0_50px_rgba(139,39,32,0.12)]"
            : "border-white/10 bg-white/[0.04]"
          }
        `}
        style={{
          backfaceVisibility: "hidden",
          height: cardHeight,
          padding: cardWidth < 350 ? "0.625rem" : "1rem",
          gap: cardWidth < 350 ? "0.5rem" : "0.75rem",
        }}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <div className={`inline-block self-start rounded-full bg-rosewood/20 px-2 py-0.5 uppercase tracking-widest text-rosewood/90 ${cardWidth < 350 ? 'text-[8px]' : 'text-[10px]'}`}>
            {section.id}
          </div>

          <h3
            className={`font-semibold leading-tight transition-colors duration-300 ${
              isActive ? "text-white" : "text-white/70"
            } ${cardWidth < 350 ? 'text-[11px]' : 'text-sm'}`}
          >
            {section.title}
          </h3>

          <p className={`line-clamp-2 leading-relaxed text-white/60 ${cardWidth < 350 ? 'text-[10px]' : 'text-[11px]'}`}>
            {section.description}
          </p>
        </div>

        <div className={`flex shrink-0 flex-col justify-center gap-1 ${cardWidth < 350 ? 'w-24' : 'w-32'}`}>
          {section.highlights.slice(0, 3).map((h, i) => (
            <div
              key={i}
              className={`flex items-center gap-1 text-white/50 ${cardWidth < 350 ? 'text-[8px]' : 'text-[10px]'}`}
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
