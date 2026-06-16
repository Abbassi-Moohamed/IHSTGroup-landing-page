"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
}

export function AnimatedText({ text }: AnimatedTextProps) {
  const characters = Array.from(text);

  return (
    <div className="relative w-full max-w-xl lg:max-w-2xl">
      <motion.p
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.55,
        }}
        className="hero-copy whitespace-normal text-lg leading-8 text-white sm:text-xl"
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}-out`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: 0.8 + index * 0.06,
              duration: 0.08,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-0 left-0 top-0 whitespace-normal text-lg leading-8 text-burgundy sm:text-xl"
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}-in`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.95 + index * 0.06,
              duration: 0.08,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
