"use client";
import React from "react";
import { motion } from "framer-motion";

const Y = "#FFE034";
const B = "#0D0D0D";

interface AIChatAnimationProps {
  onAnimationComplete?: () => void;
  buttonPosition?: { x: number; y: number } | null;
}

export const AIChatAnimation: React.FC<AIChatAnimationProps> = ({
  onAnimationComplete,
  buttonPosition = null,
}) => {
  const startPos = buttonPosition || {
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ background: "rgba(13,13,13,0.75)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      />

      {/* Panel */}
      <motion.div
        style={{
          background: B,
          border: "1.5px solid rgba(255,224,52,0.25)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,224,52,0.04)",
          borderRadius: 0,
          overflow: "hidden",
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
        }}
        initial={{
          position: "fixed",
          top: startPos.y,
          left: startPos.x,
          width: "48px",
          height: "48px",
          opacity: 0.6,
        }}
        animate={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "100%",
          height: "auto",
          opacity: 1,
        }}
        transition={{ type: "spring", damping: 26, stiffness: 300, duration: 0.4 }}
        onAnimationComplete={onAnimationComplete}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="h-[480px] flex flex-col items-center justify-center"
        >
          {/* Icon */}
          <div
            style={{
              width: 56, height: 56,
              background: Y,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900, fontSize: "20px",
                color: B, letterSpacing: "-0.04em",
              }}
            >
              AI
            </motion.span>
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: "15px",
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: Y, marginBottom: "28px",
            }}
          >
            AI Assistant
          </motion.p>

          {/* Yellow loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ display: "flex", gap: "8px" }}
          >
            {[0, 150, 300].map((delay, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: 10, height: 10,
                  background: Y,
                  animation: `bounce 0.6s ${delay}ms infinite`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AIChatAnimation;