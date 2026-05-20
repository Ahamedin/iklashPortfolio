"use client";
import { useEffect, useRef } from "react";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}

export const SparklesCore = ({
  id = "tsparticles",
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 80,
  /* default to semi-transparent yellow */
  particleColor = "rgba(255,224,52,0.65)",
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const particles = useRef<Particle[]>([]);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        if (e.target === canvas) {
          canvas.width = e.contentRect.width;
          canvas.height = e.contentRect.height;
        }
      }
    });
    ro.observe(canvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const create = () => {
      const density =
        particleDensity * ((canvas.width * canvas.height) / (1920 * 1080));
      particles.current = Array.from(
        { length: density },
        () =>
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            minSize + Math.random() * (maxSize - minSize),
            particleColor
          )
      );
    };
    create();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.update(canvas.width, canvas.height, mousePosition);
        p.draw(ctx);
      });
      animFrame.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animFrame.current);
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("opacity-60", className)}
      style={{ background }}
    />
  );
};

class Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  /* each particle drifts at a subtly randomised opacity */
  baseAlpha: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 0.28;
    this.speedY = (Math.random() - 0.5) * 0.28;
    this.baseAlpha = 0.3 + Math.random() * 0.5;
  }

  update(
    width: number,
    height: number,
    mouse: { x: number; y: number }
  ) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > width)  this.x = 0;
    if (this.x < 0)      this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0)      this.y = height;

    /* mouse repulsion */
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 90) {
      this.x -= dx * 0.012;
      this.y -= dy * 0.012;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.baseAlpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}