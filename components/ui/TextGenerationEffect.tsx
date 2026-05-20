"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TextGenerationEffectProps {
  text: string;
  className?: string;
  once?: boolean;
  interval?: number;
  onComplete?: () => void;
  speed?: "slow" | "normal" | "fast" | "instant";
}

export const TextGenerationEffect: React.FC<TextGenerationEffectProps> = ({
  text,
  className = "",
  once = false,
  interval = 0.03,
  onComplete,
  speed = "normal",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const actualInterval =
    speed === "instant"
      ? 0
      : speed === "fast"
      ? 0.005
      : speed === "slow"
      ? 0.05
      : interval;

  const chunkSize =
    speed === "instant" ? text.length : speed === "fast" ? 5 : 1;

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsGenerating(true);
    setHasStarted(false);
  }, [text]);

  useEffect(() => {
    if (!text || (once && hasStarted)) return;
    setHasStarted(true);

    if (speed === "instant") {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      setIsGenerating(false);
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      if (currentIndex < text.length) {
        const next = text.slice(
          currentIndex,
          Math.min(currentIndex + chunkSize, text.length)
        );
        setDisplayedText((p) => p + next);
        setCurrentIndex((p) => Math.min(p + chunkSize, text.length));
      } else {
        setIsGenerating(false);
        onComplete?.();
      }
    }, actualInterval * 1000);

    return () => clearTimeout(t);
  }, [currentIndex, text, actualInterval, once, hasStarted, onComplete, speed, chunkSize]);

  const paragraphs = displayedText.split("\n").filter(Boolean);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "rgba(240,234,214,0.85)" }}
    >
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {paragraphs.map((para, i) => (
          <motion.p
            key={`p-${i}`}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              delay: i * 0.08,
            }}
            className="mb-2 leading-relaxed"
          >
            {para}
          </motion.p>
        ))}

        {/* Yellow blinking cursor */}
        {isGenerating && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.1em",
              background: "#FFE034",
              marginLeft: "2px",
              verticalAlign: "middle",
            }}
          />
        )}
      </motion.div>

      {/* Bottom reflection — subtle yellow */}
      {isGenerating && speed !== "instant" && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.08, scaleY: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-8 origin-bottom blur-sm"
          style={{
            background: "linear-gradient(to bottom, rgba(255,224,52,0.4), transparent)",
            maskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
          }}
        />
      )}

      {/* Completion bounce guard */}
      <AnimatePresence>
        {!isGenerating && currentIndex === text.length && speed !== "instant" && (
          <motion.div
            initial={{ scaleY: 1.08, y: -4 }}
            animate={{ scaleY: 1, y: 0 }}
            exit={{ scaleY: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute inset-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Yellow ambient glow while generating */}
      {isGenerating && speed !== "instant" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.06, 0.14, 0.06] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,224,52,0.18), transparent 70%)",
          }}
        />
      )}
    </div>
  );
};