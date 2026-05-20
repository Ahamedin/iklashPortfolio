"use client";
import React, { useRef, useEffect, useId, useCallback } from "react";

function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
function len(x: number, y: number) { return Math.sqrt(x * x + y * y); }
function roundedRectSDF(
  x: number, y: number, w: number, h: number, r: number
): number {
  const qx = Math.abs(x) - w + r;
  const qy = Math.abs(y) - h + r;
  return Math.min(Math.max(qx, qy), 0) + len(Math.max(qx, 0), Math.max(qy, 0)) - r;
}

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  intensity?: number;
}

export function LiquidGlass({
  children,
  className = "",
  width = 300,
  height = 50,
  borderRadius = 9999,
  intensity = 0.8,
}: LiquidGlassProps) {
  const uid = useId().replace(/:/g, "");
  const filterId    = `lg-filter-${uid}`;
  const feImageId   = `lg-map-${uid}`;

  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const feImageRef     = useRef<SVGFEImageElement>(null);
  const feDispRef      = useRef<SVGFEDisplacementMapElement>(null);
  const containerRef   = useRef<HTMLDivElement>(null);

  const updateShader = useCallback(() => {
    const canvas    = canvasRef.current;
    const feImage   = feImageRef.current;
    const feDisp    = feDispRef.current;
    if (!canvas || !feImage || !feDisp) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width, h = canvas.height;
    const data = new Uint8ClampedArray(w * h * 4);
    let maxScale = 0;
    const raw: number[] = [];

    const ar = w / h, sw = 0.4, sh = 0.4 / ar;

    for (let i = 0; i < data.length; i += 4) {
      const px = (i / 4) % w, py = Math.floor(i / 4 / w);
      const ix = px / w - 0.5, iy = py / h - 0.5;
      const dist = roundedRectSDF(ix, iy, sw, sh, 0.5);
      const disp = smoothStep(intensity, 0, dist - 0.1);
      const sc   = smoothStep(0, 1, disp);
      const nx = ix * sc + 0.5, ny = iy * sc + 0.5;
      const dx = nx * w - px, dy = ny * h - py;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      raw.push(dx, dy);
    }
    maxScale *= 0.5;
    let idx = 0;
    for (let i = 0; i < data.length; i += 4) {
      data[i]     = (raw[idx++] / maxScale + 0.5) * 255;
      data[i + 1] = (raw[idx++] / maxScale + 0.5) * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }
    ctx.putImageData(new ImageData(data, w, h), 0, 0);
    feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL());
    feDisp.setAttribute("scale", maxScale.toString());
  }, [intensity]);

  useEffect(() => { updateShader(); }, [updateShader, width, height]);

  return (
    <>
      <svg width="0" height="0" style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: -1 }}>
        <defs>
          <filter id={filterId} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"
            x="0" y="0" width={width.toString()} height={height.toString()}>
            <feImage ref={feImageRef} id={feImageId} width={width.toString()} height={height.toString()} />
            <feDisplacementMap ref={feDispRef} in="SourceGraphic" in2={feImageId}
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <canvas ref={canvasRef} width={width} height={height} style={{ display: "none" }} />

      <div
        ref={containerRef}
        className={className}
        style={{
          /* Warm yellow-tinted glass backdrop */
          backdropFilter:
            `url(#${filterId}) blur(1px) contrast(1.08) brightness(1.04) saturate(1.15) sepia(0.06)`,
          WebkitBackdropFilter:
            `url(#${filterId}) blur(1px) contrast(1.08) brightness(1.04) saturate(1.15) sepia(0.06)`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        {children}
      </div>
    </>
  );
}