import { memo } from "react";
import { cn } from "@/lib/utils";
import type { Section } from "@/types";

interface CylinderCardProps {
  section: Section;
  index: number;
  total: number;
  radius: number;
  isActive: boolean;
  cardWidth?: number;
  cardHeight?: number;
  onHover?: (index: number | null) => void;
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
  onHover,
}: CylinderCardProps) {
  const CARD_SPACING = 50;
  const angle = -(index * CARD_SPACING);
  const cardHalfW = cardWidth / 2;
  const isSmall = cardWidth < 350;

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        width: cardWidth,
        left: "50%",
        top: "50%",
        marginLeft: -cardHalfW,
        marginTop: -(cardHeight / 2),
        transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div
        className={cn(
          "flex gap-3 rounded-2xl border backdrop-blur-xl transition-all duration-500 ease-out",
          isActive
            ? "border-rosewood/50 bg-slate-950/85 shadow-[0_0_60px_-12px_rgba(180,71,63,0.15)]"
            : "border-white/[0.07] bg-slate-950/70 hover:border-white/[0.15]",
        )}
        style={{
          backfaceVisibility: "hidden",
          height: cardHeight,
          padding: isSmall ? "0.75rem" : "1.25rem",
          gap: isSmall ? "0.5rem" : "0.75rem",
          boxShadow: isActive
            ? "0 0 60px -12px rgba(180,71,63,0.15), var(--card-shadow-active)"
            : "var(--card-shadow)",
        }}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <div
            className={cn(
              "inline-block self-start rounded-full bg-rosewood/15 px-2.5 py-0.5 uppercase tracking-widest text-rosewood/80",
              isSmall ? "text-[8px]" : "text-[10px]",
            )}
          >
            {section.tag ?? section.id}
          </div>

          <h3
            className={cn(
              "font-semibold leading-tight transition-colors duration-300",
              isActive ? "text-white" : "text-white/70",
              isSmall ? "text-[11px]" : "text-sm",
            )}
          >
            {section.title}
          </h3>

          <p
            className={cn(
              "line-clamp-2 leading-relaxed text-white/50",
              isSmall ? "text-[10px]" : "text-[11px]",
            )}
          >
            {section.description}
          </p>
        </div>

        <div
          className={cn(
            "flex shrink-0 flex-col justify-center gap-1.5 border-l border-white/[0.06] pl-3",
            isSmall ? "w-24" : "w-32",
          )}
        >
          {section.highlights.slice(0, 3).map((h, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-1.5 text-white/45",
                isSmall ? "text-[8px]" : "text-[10px]",
              )}
            >
              <span
                className={cn(
                  "h-1 w-1 shrink-0 rounded-full transition-colors duration-300",
                  isActive ? "bg-rosewood" : "bg-white/30",
                )}
              />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
