"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FloatCard as FloatCardType, CardPosition } from "@/types";

interface FloatCardProps {
  card: FloatCardType;
  position: CardPosition;
  isActive: boolean;
  isResetting: boolean;
  onActivate: (id: string | null) => void;
  onDragEnd: (id: string, offset: { x: number; y: number }) => void;
}

export const FloatCard = memo(function FloatCard({
  card,
  position,
  isActive,
  isResetting,
  onActivate,
  onDragEnd,
}: FloatCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`hero-float-card ${card.positionClass} absolute z-10 cursor-grab rounded-[1.8rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur-xl`}
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
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rosewood">
        {card.tag}
      </p>
      <p className="mt-3 text-sm font-semibold text-white">{card.title}</p>
    </motion.div>
  );
});
