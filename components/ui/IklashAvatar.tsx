"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import lottie, { type AnimationItem } from "lottie-web";

type AvatarVariant = "default" | "thinking" | "speaking" | "success" | "loading";

interface IklashAvatarProps {
  size?: number;
  animated?: boolean;
  variant?: AvatarVariant;
  className?: string;
  badge?: string;
}

const Y = "#FFE034";
const B = "#0D0D0D";

export const IklashAvatar: React.FC<IklashAvatarProps> = ({
  size = 44,
  animated = true,
  variant = "default",
  className = "",
  badge,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [loadError, setLoadError] = useState(false);

  const animationSpeed = useMemo(() => {
    switch (variant) {
      case "loading":
        return 1.25;
      case "speaking":
        return 1.05;
      case "thinking":
        return 0.9;
      case "success":
        return 1.15;
      default:
        return 1;
    }
  }, [variant]);

  useEffect(() => {
    if (!animated || !containerRef.current || loadError) {
      return;
    }

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/codework.json",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    animation.setSpeed(animationSpeed);
    animationRef.current = animation;

    animation.addEventListener("data_failed", () => {
      setLoadError(true);
    });

    return () => {
      animation.destroy();
      animationRef.current = null;
    };
  }, [animated, animationSpeed, loadError]);

  useEffect(() => {
    if (!animationRef.current) {
      return;
    }

    animationRef.current.setSpeed(animationSpeed);
  }, [animationSpeed]);

  return (
    <div
      className={`relative inline-grid flex-shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-label="Chatbot logo"
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {loadError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: Y,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: Math.max(11, size * 0.2),
            fontWeight: 700,
          }}
        >
          &lt;/&gt;
        </div>
      )}

      {badge && (
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: Math.max(8, size * 0.22),
            fontWeight: 700,
            letterSpacing: "0.04em",
            background: Y,
            color: B,
            padding: "1px 4px",
            lineHeight: 1.2,
            userSelect: "none",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default IklashAvatar;
