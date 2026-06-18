"use client";

import { useRef, useCallback, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export function useCylinderScroll(totalCards: number) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollY } = useScroll();

  const scrollYProgress = useTransform(scrollY, () => {
    const el = sectionRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return rect.height > 0
      ? Math.max(0, Math.min(1, -rect.top / rect.height))
      : 0;
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const sectionHeight = `${totalCards * 100}vh`;
  const holdProgress = (totalCards - 1) / totalCards;

  const rawIndex = useTransform(
    smoothProgress,
    [0, holdProgress, 1],
    [0, totalCards - 1, totalCards - 1],
  );

  const CARD_SPACING = 50; // degrees between each card (< 60 = cards past ±90° are hidden by backface)

  const cylinderRotation = useTransform(
    smoothProgress,
    [0, holdProgress, 1],
    [0, (totalCards - 1) * CARD_SPACING, (totalCards - 1) * CARD_SPACING],
  );

  const [activeCard, setActiveCard] = useState(0);

  useMotionValueEvent(rawIndex, "change", (latest) => {
    const rounded = Math.round(latest);
    setActiveCard((prev) => (prev !== rounded ? rounded : prev));
  });

  const scrollToCard = useCallback(
    (index: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      window.scrollTo({ top: sectionTop + index * window.innerHeight, behavior: "smooth" });
    },
    [],
  );

  return {
    sectionRef,
    sectionHeight,
    cylinderRotation,
    activeCard,
    hoveredCard,
    setHoveredCard,
    scrollToCard,
  };
}
