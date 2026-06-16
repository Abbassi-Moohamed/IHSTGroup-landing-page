"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge, Button, Card } from "@/components/ui";
import {
  CTA_TEXT,
  HERO_CARD_DESCRIPTION,
  HERO_CARD_STATS,
  HERO_CARD_TAG,
  HERO_CARD_TITLE,
  HERO_COPY,
  HERO_FLOAT_CARDS,
  HERO_IDLE_OFFSET,
  HERO_STATS,
  HERO_TAGLINE,
  HERO_TITLE,
} from "@/constants/content";
import type { CardPosition, FloatCard, FloatCardId } from "@/types";
import { AnimatedText } from "./AnimatedText";

type FloatCardKey = FloatCardId["id"];
type HubStatCardKey = "fasterResults" | "supportAccess";
type HeroDraggableCardKey = FloatCardKey | "hub" | HubStatCardKey;

type HubStatCardConfig = {
  id: HubStatCardKey;
  stat: string;
  label: string;
  baseRotate: number;
  positionClass: string;
  idleOffset: {
    x: number[];
    y: number[];
    rotateZ: number[];
  };
};

const initialCardPositions: Record<HeroDraggableCardKey, CardPosition> = {
  one: { x: 0, y: 0 },
  two: { x: 0, y: 0 },
  three: { x: 0, y: 0 },
  hub: { x: 0, y: 0 },
  fasterResults: { x: 0, y: 0 },
  supportAccess: { x: 0, y: 0 },
};

const hubStatCards: HubStatCardConfig[] = [
  {
    id: "fasterResults",
    stat: HERO_CARD_STATS[0].stat,
    label: HERO_CARD_STATS[0].label,
    baseRotate: -1,
    positionClass: "left-[2rem] bottom-[3.5rem] w-28 sm:left-[3.5rem] sm:bottom-[4.5rem] sm:w-32 lg:left-[4.5rem] lg:bottom-[5.75rem] lg:w-36",
    idleOffset: {
      x: [0, 5, -5, 0],
      y: [0, -4, 4, 0],
      rotateZ: [-1, 0, -2, -1],
    },
  },
  {
    id: "supportAccess",
    stat: HERO_CARD_STATS[1].stat,
    label: HERO_CARD_STATS[1].label,
    baseRotate: 1,
    positionClass: "left-[7.5rem] bottom-[3.5rem] w-28 sm:left-[11rem] sm:bottom-[4.5rem] sm:w-32 lg:left-[14.25rem] lg:bottom-[5.75rem] lg:w-36",
    idleOffset: {
      x: [0, -5, 5, 0],
      y: [0, 4, -4, 0],
      rotateZ: [1, 2, 0, 1],
    },
  },
];

export function HeroSection() {
  const [activeCard, setActiveCard] = useState<HeroDraggableCardKey | null>(
    null,
  );
  const [cardPositions, setCardPositions] =
    useState<Record<HeroDraggableCardKey, CardPosition>>(initialCardPositions);
  const [isResetting, setIsResetting] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const resetCardPositions = (event?: ReactMouseEvent) => {
    const target = event?.target as Element | null;

    if (target?.closest("a,button,input,textarea,select,[role='button']")) {
      return;
    }

    setIsResetting(true);
    setCardPositions(initialCardPositions);
    setActiveCard(null);
    window.setTimeout(() => setIsResetting(false), 180);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const hero = heroRef.current;
    if (!hero) {
      return;
    }

    let frame = 0;
    const updateHero = (x: number, y: number) => {
      hero.style.setProperty("--hero-offset-x", `${x}`);
      hero.style.setProperty("--hero-offset-y", `${y}`);
      hero.style.setProperty("--hero-light-x", `${50 + x * 1.4}%`);
      hero.style.setProperty("--hero-light-y", `${40 + y * 1.6}%`);
    };

    const handlePointerMove = (event: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in event
          ? (event.touches[0]?.clientX ?? window.innerWidth / 2)
          : event.clientX;
      const clientY =
        "touches" in event
          ? (event.touches[0]?.clientY ?? window.innerHeight / 2)
          : event.clientY;
      const rect = hero.getBoundingClientRect();
      const offsetX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const offsetY = ((clientY - rect.top) / rect.height - 0.5) * 2;

      if (!frame) {
        frame = requestAnimationFrame(() => {
          updateHero(offsetX * 9, offsetY * -9);
          frame = 0;
        });
      }
    };

    hero.addEventListener("mousemove", handlePointerMove);
    hero.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      hero.style.removeProperty("--hero-offset-x");
      hero.style.removeProperty("--hero-offset-y");
      hero.style.removeProperty("--hero-light-x");
      hero.style.removeProperty("--hero-light-y");
      hero.removeEventListener("mousemove", handlePointerMove);
      hero.removeEventListener("touchmove", handlePointerMove as EventListener);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [prefersReducedMotion]);

  const renderFloatCard = (card: FloatCard) => {
    const position = cardPositions[card.id];
    const isActive = activeCard === card.id;

    return (
      <motion.div
        key={card.id}
        className={`hero-float-card ${card.positionClass} absolute z-10 cursor-grab rounded-[1.8rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur-xl`}
        drag={isActive}
        dragElastic={0.12}
        dragMomentum={false}
        onHoverStart={() => setActiveCard(card.id)}
        onHoverEnd={() => setActiveCard(null)}
        onDragStart={() => setActiveCard(card.id)}
        onDragEnd={(_, info) =>
          setCardPositions((current) => ({
            ...current,
            [card.id]: {
              x: current[card.id].x + info.offset.x,
              y: current[card.id].y + info.offset.y,
            },
          }))
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
  };

  const renderHubStatCard = (card: HubStatCardConfig) => {
    const position = cardPositions[card.id];
    const isActive = activeCard === card.id;

    return (
      <motion.div
        key={card.id}
        className={`hero-float-card ${card.positionClass} absolute z-20 cursor-grab rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-soft backdrop-blur-xl`}
        drag={isActive}
        dragElastic={0.12}
        dragMomentum={false}
        onHoverStart={() => setActiveCard(card.id)}
        onHoverEnd={() => setActiveCard(null)}
        onDragStart={() => setActiveCard(card.id)}
        onDragEnd={(_, info) =>
          setCardPositions((current) => ({
            ...current,
            [card.id]: {
              x: current[card.id].x + info.offset.x,
              y: current[card.id].y + info.offset.y,
            },
          }))
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
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-400">
          {card.label}
        </p>
      </motion.div>
    );
  };

  return (
    <section
      id="hero"
      data-id="hero"
      className="hero-section relative overflow-hidden px-4 pb-20 pt-8 sm:px-10 sm:pb-24 sm:pt-10 lg:px-14"
    >
      <div className="absolute inset-0 -z-10 bg-page" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_15%_10%,_rgba(255,255,255,0.16),_transparent_18%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-ghost-light" />

      <div className="mx-auto max-w-7xl px-0">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <Badge variant="primary">{HERO_TAGLINE}</Badge>
        </motion.div>

        <div className="grid gap-8 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="relative z-10 min-w-0 space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              }}
              className="hero-headline text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {HERO_TITLE}
            </motion.h1>

            <AnimatedText text={HERO_COPY} />

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.75,
              }}
              className="flex flex-wrap gap-4"
            >
              <Button href="#contact" variant="primary" size="md">
                {CTA_TEXT.primaryTour}
              </Button>
              <Button href="#cambridge" variant="secondary" size="md">
                {CTA_TEXT.secondaryPathways}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
            >
              {HERO_STATS.map((item) => (
                <Card key={item.label} variant="stat">
                  <p className="text-xl font-semibold text-white sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-300 sm:mt-2 sm:text-sm">{item.label}</p>
                </Card>
              ))}
            </motion.div>
          </div>

          <motion.div
            ref={heroRef}
            className="hero-scene relative z-10 aspect-[4/5] min-h-[350px] transform-gpu overflow-visible rounded-[2.5rem] border border-white/10 bg-white/5 p-4 pt-6 shadow-soft backdrop-blur-xl sm:min-h-[450px] sm:p-6 sm:pt-10 lg:min-h-[560px]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            onClick={resetCardPositions}
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-white/10 shadow-[0_0_120px_rgba(255,255,255,0.06)]" />
            <div className="absolute inset-x-6 top-6 h-28 rounded-[2rem] bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_55%)] blur-3xl" />
            <div className="absolute -left-4 top-8 h-20 w-20 rounded-3xl border border-white/10 bg-white/10 shadow-soft blur-[1px]" />
            <div className="absolute bottom-12 right-8 h-24 w-24 rounded-full bg-burgundy/15 blur-3xl" />

            <motion.div
              className="hero-card relative mx-auto mr-4 mt-12 h-[200px] max-w-[260px] cursor-grab rounded-[2.2rem] border border-white/10 bg-slate-950/85 p-5 pb-6 shadow-[0_35px_80px_rgba(8,20,39,0.35)] backdrop-blur-xl sm:mr-16 sm:mt-20 sm:h-[260px] sm:max-w-[320px] sm:p-6 sm:pb-8 lg:mr-36 lg:mt-28 lg:h-[320px] lg:max-w-[380px]"
              drag={activeCard === "hub"}
              dragElastic={0.12}
              dragMomentum={false}
              onHoverStart={() => setActiveCard("hub")}
              onHoverEnd={() => setActiveCard(null)}
              onDragStart={() => setActiveCard("hub")}
              onDragEnd={(_, info) => {
                setCardPositions((current) => ({
                  ...current,
                  hub: {
                    x: current.hub.x + info.offset.x,
                    y: current.hub.y + info.offset.y,
                  },
                }));
              }}
              style={{
                x: cardPositions.hub.x,
                y: cardPositions.hub.y,
              }}
              animate={
                isResetting
                  ? { x: 0, y: 0, rotateZ: 0 }
                  : activeCard === "hub"
                    ? {
                        x: cardPositions.hub.x,
                        y: cardPositions.hub.y,
                        rotateZ: 0,
                      }
                    : {
                        x: HERO_IDLE_OFFSET.x.map(
                          (value) => cardPositions.hub.x + value,
                        ),
                        y: HERO_IDLE_OFFSET.y.map(
                          (value) => cardPositions.hub.y + value,
                        ),
                        rotateZ: HERO_IDLE_OFFSET.rotateZ,
                      }
              }
              whileTap={{ cursor: "grabbing", scale: 0.98 }}
              transition={
                isResetting
                  ? { duration: 0.18, ease: "easeOut" }
                  : activeCard === "hub"
                    ? { duration: 0.22, ease: "easeOut" }
                    : prefersReducedMotion
                      ? { duration: 0.25, ease: "easeOut" }
                      : {
                          duration: 3,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "mirror",
                        }
              }
            >
              <div className="absolute -left-5 top-5 h-24 w-24 rounded-full bg-gradient-to-br from-rosewood/20 to-transparent blur-3xl" />
              <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rosewood">
                  {HERO_CARD_TAG}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:mt-3 sm:text-2xl lg:mt-4 lg:text-3xl">
                  {HERO_CARD_TITLE}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 sm:mt-3 sm:text-sm sm:leading-7 lg:mt-4">
                  {HERO_CARD_DESCRIPTION}
                </p>
              </div>
            </motion.div>

            {hubStatCards.map(renderHubStatCard)}
            {HERO_FLOAT_CARDS.map(renderFloatCard)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
