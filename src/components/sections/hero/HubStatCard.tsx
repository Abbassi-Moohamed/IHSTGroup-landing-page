"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CardPosition } from "@/types";

interface HubStatCardConfig {
  id: string;
  stat: string;
  label: string;
  baseRotate: number;
  positionClass: string;
  idleOffset: {
    x: number[];
    y: number[];
    rotateZ: number[];
  };
}

interface HubStatCardProps {
  card: HubStatCardConfig;
  position: CardPosition;
  isActive: boolean;
  isResetting: boolean;
  onActivate: (id: string | null) => void;
  onDragEnd: (id: string, offset: { x: number; y: number }) => void;
}

export const HubStatCard = memo(function HubStatCard({
  card,
  position,
  isActive,
  isResetting,
  onActivate,
  onDragEnd,
}: HubStatCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`hero-float-card ${card.positionClass} absolute z-20 cursor-grab rounded-3xl border border-white/10 bg-slate-950/85 px-4 py-3 shadow-soft backdrop-blur-xl`}
      drag={isActive}
      dragElastic={0.12}
      dragMomentum={false}
      onHoverStart={() => onActivate(card.id)}
      onHoverEnd={() => onActivate(null)}
      onDragStart={() => onActivate(card.id)}
      onDragEnd={(_, info) =>
        onDragEnd(card.id, { x: info.offset.x, y: info.offset.y })
      }
      style={{ x: position.x, y: position.y }}
      animate={
        isActive
          ? { x: position.x, y: position.y, rotateZ: card.baseRotate }
          : isResetting
            ? { x: 0, y: 0, rotateZ: card.baseRotate }
            : {
                x: card.idleOffset.x.map((value) => position.x + value),
                y: card.idleOffset.y.map((value) => position.y + value),
                rotateZ: card.idleOffset.rotateZ,
              }
      }
      transition={
        isActive
          ? { duration: 0.22, ease: "easeOut" }
          : isResetting
            ? { duration: 0.18, ease: "easeOut" }
            : prefersReducedMotion
              ? { duration: 0.25, ease: "easeOut" }
              : {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
      }
      whileTap={{ cursor: "grabbing", scale: 0.98 }}
    >
      <p className="text-lg font-semibold text-white">{card.stat}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-rosewood">
        {card.label}
      </p>
    </motion.div>
  );
});
