"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const next =
      words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(next);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const t = setTimeout(startAnimation, duration);
      return () => clearTimeout(t);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -32,
          x: 32,
          filter: "blur(6px)",
          scale: 1.8,
          position: "absolute",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        /* Yellow, bold, inline so it sits inline in prose */
        className={cn(
          "inline-block relative px-1 font-bold",
          /* default yellow if no className override */
          !className?.includes("text-") && "text-yellow-brand",
          className
        )}
        style={{ color: "var(--y, #FFE034)" }}
      >
        {currentWord.split(" ").map((word, wi) => (
          <motion.span key={word + wi} className="inline-block whitespace-nowrap">
            {word.split("").map((letter, li) => (
              <motion.span
                key={word + li}
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wi * 0.25 + li * 0.04,
                  duration: 0.18,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};