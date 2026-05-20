"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let timer: ReturnType<typeof setInterval>;

    const start = () => {
      timer = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        if (iteration >= text.length) {
          clearInterval(timer);
          setIsComplete(true);
        }
        iteration += 1 / 3;
      }, 30);
    };

    const d = setTimeout(start, delay * 1000);
    return () => {
      clearTimeout(d);
      clearInterval(timer);
    };
  }, [text, delay]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {displayText}
      {!isComplete && (
        /* Yellow blinking cursor */
        <span
          className="inline-block w-[2px] h-[1em] ml-[2px] align-middle animate-pulse"
          style={{ background: "#FFE034", verticalAlign: "middle" }}
        />
      )}
    </motion.span>
  );
};