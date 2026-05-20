"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setMaskPosition({
        cx: `${((cursor.x - rect.left) / rect.width) * 100}%`,
        cy: `${((cursor.y - rect.top) / rect.height) * 100}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        {/* Yellow-family gradient on hover */}
        <linearGradient
          id="textGradientY"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%"   stopColor="#FFE034" />
              <stop offset="33%"  stopColor="#F5A623" />
              <stop offset="66%"  stopColor="#FFE034" />
              <stop offset="100%" stopColor="#FFF59D" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMaskY"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMaskY">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMaskY)" />
        </mask>
      </defs>

      {/* Base outline — dark when idle */}
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="font-[helvetica] font-bold fill-transparent text-7xl"
        stroke="rgba(255,224,52,0.18)"
        style={{ opacity: hovered ? 0.7 : 0.25 }}
      >
        {text}
      </text>

      {/* Animated stroke draw-on */}
      <motion.text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="font-[helvetica] font-bold fill-transparent text-7xl"
        stroke="rgba(255,224,52,0.4)"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Revealed yellow gradient text under cursor */}
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        stroke="url(#textGradientY)"
        strokeWidth="0.3"
        mask="url(#textMaskY)"
        className="font-[helvetica] font-bold fill-transparent text-7xl"
        style={{ opacity: hovered ? 1 : 0.12 }}
      >
        {text}
      </text>
    </svg>
  );
};