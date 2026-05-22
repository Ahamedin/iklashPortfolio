"use client";
import React, { useEffect, useMemo, useState } from "react";

interface GitHubContributionsProps {
  username: string;
}

type DailyCounts = Record<string, number>;

type TrackerCell = {
  date: string;
  count: number;
  week: number;
  day: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
};

type TrackerData = {
  daily: DailyCounts;
};

const CELL_SIZE = 11;
const CELL_GAP = 4;
const GRID_TOP = 24;
const GRID_LEFT = 8;
const DAY_MS = 24 * 60 * 60 * 1000;

function buildTrackerCells(daily: DailyCounts) {
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 364);

  const cells: TrackerCell[] = [];
  const activeCells: TrackerCell[] = [];

  for (let offset = 0; offset <= 364; offset += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + offset);

    const dateKey = date.toISOString().slice(0, 10);
    const count = daily[dateKey] ?? 0;
    const week = Math.floor(offset / 7);
    const day = date.getDay();
    const x = GRID_LEFT + week * (CELL_SIZE + CELL_GAP);
    const y = GRID_TOP + day * (CELL_SIZE + CELL_GAP);
    const cell = {
      date: dateKey,
      count,
      week,
      day,
      x,
      y,
      cx: x + CELL_SIZE / 2,
      cy: y + CELL_SIZE / 2,
    };

    cells.push(cell);
    if (count > 0) {
      activeCells.push(cell);
    }
  }

  const width = GRID_LEFT * 2 + Math.ceil(365 / 7) * (CELL_SIZE + CELL_GAP) - CELL_GAP;
  const height = GRID_TOP + 7 * (CELL_SIZE + CELL_GAP) + 12;

  return { cells, activeCells, width, height };
}

export const GitHubContributions: React.FC<GitHubContributionsProps> = ({
  username,
}) => {
  const [daily, setDaily] = useState<DailyCounts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snakeIndex, setSnakeIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadTracker() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/leetcode-tracker?username=${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error(`Failed to load tracker (${response.status})`);
        }

        const payload = (await response.json()) as TrackerData;
        if (!cancelled) {
          setDaily(payload.daily ?? {});
          setSnakeIndex(0);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load tracker");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTracker();

    return () => {
      cancelled = true;
    };
  }, [username]);

  const tracker = useMemo(() => buildTrackerCells(daily), [daily]);

  useEffect(() => {
    if (!tracker.activeCells.length) {
      return;
    }

    const interval = window.setInterval(() => {
      setSnakeIndex((current) => (current + 1) % tracker.activeCells.length);
    }, 360);

    return () => window.clearInterval(interval);
  }, [tracker.activeCells.length]);

  const trail = tracker.activeCells.length
    ? tracker.activeCells.slice(Math.max(0, snakeIndex - 14), snakeIndex + 1)
    : [];
  const head = trail[trail.length - 1];

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-full lg:max-w-6xl xl:max-w-7xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          {loading ? (
            <div className="h-[240px] w-full animate-pulse border border-[rgba(255,224,52,0.12)] bg-[#141414]" />
          ) : error ? (
            <div className="flex h-[240px] items-center justify-center border border-[rgba(255,224,52,0.12)] bg-[#141414] px-6 text-center text-sm text-[rgba(255,224,52,0.65)]">
              {error}
            </div>
          ) : (
            <svg
              role="img"
              aria-label="LeetCode daily submission snake tracker"
              viewBox={`0 0 ${tracker.width} ${tracker.height}`}
              className="block w-full min-w-[920px]"
              style={{ maxHeight: "400px" }}
            >
              <defs>
                <linearGradient id="snake-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE034" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FFE034" stopOpacity="1" />
                </linearGradient>
                <filter id="snake-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFE034" floodOpacity="0.45" />
                </filter>
              </defs>

              <rect x="0" y="0" width={tracker.width} height={tracker.height} fill="#141414" />

              {tracker.cells.map((cell) => {
                const intensity = cell.count <= 0 ? 0.1 : Math.min(0.2 + Math.log(cell.count + 1) * 0.22, 0.95);
                const isHead = head?.date === cell.date;
                const isTrail = trail.some((point) => point.date === cell.date);

                return (
                  <g key={cell.date}>
                    <rect
                      x={cell.x}
                      y={cell.y}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      rx="2"
                      fill={cell.count > 0 ? `rgba(255,224,52,${intensity})` : "rgba(255,224,52,0.06)"}
                      stroke={isTrail ? "rgba(255,224,52,0.5)" : "rgba(255,224,52,0.08)"}
                      strokeWidth={isTrail ? 1.2 : 0.7}
                      opacity={isHead ? 1 : 0.98}
                    />
                    {cell.count > 0 && (
                      <circle
                        cx={cell.cx}
                        cy={cell.cy}
                        r={isHead ? 3.4 : 1.8}
                        fill={isHead ? "url(#snake-glow)" : "rgba(255,224,52,0.95)"}
                        filter={isHead ? "url(#snake-shadow)" : undefined}
                      />
                    )}
                  </g>
                );
              })}

              {trail.length > 1 && (
                <polyline
                  points={trail.map((point) => `${point.cx},${point.cy}`).join(" ")}
                  fill="none"
                  stroke="url(#snake-glow)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#snake-shadow)"
                />
              )}

              {trail.map((point, index) => {
                const size = index === trail.length - 1 ? 6.5 : Math.max(2.4, 6.5 - (trail.length - index) * 0.35);
                return (
                  <circle
                    key={`${point.date}-${index}`}
                    cx={point.cx}
                    cy={point.cy}
                    r={size}
                    fill={index === trail.length - 1 ? "#FFE034" : "rgba(255,224,52,0.82)"}
                    opacity={index === trail.length - 1 ? 1 : 0.7}
                  />
                );
              })}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
