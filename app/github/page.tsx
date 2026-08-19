"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import { GitHubContributions } from "@/components/tools/githubcontribution";
import type { LeetCodeTrackerStats } from "@/components/tools/githubcontribution";

const Y = "#FFE034";
const B = "#0D0D0D";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function GitHub() {
  const [trackerStats, setTrackerStats] = useState<LeetCodeTrackerStats | null>(null);

  const stats = [
    {
      label: "Total submissions",
      val: trackerStats ? `${trackerStats.totalSubmissions}+` : "...",
    },
    {
      label: "Active days",
      val: trackerStats ? `${trackerStats.activeDays}+` : "...",
    },
    {
      label: "Peak day",
      val: trackerStats ? `${trackerStats.peakDay}+` : "...",
    },
    {
      label: "Longest streak",
      val: trackerStats ? `${trackerStats.longestStreak}d` : "...",
    },
  ];

  return (
    <div id="github-page" className="min-h-screen w-full relative" style={{ background: "#111111" }}>
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24">

        {/* Label */}
        <motion.div {...fade(0)} className="mb-6">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,224,52,0.4)", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)", display: "inline-block" }} />
            Activity
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.06)}
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: Y, marginBottom: "48px" }}
        >
          LeetCode<br />Daily Tracker
        </motion.h1>

        {/* Contribution card */}
        <motion.div
          {...fade(0.12)}
          className="p-5 sm:p-6 lg:p-7"
          style={{ background: "#181818", border: "1.5px solid rgba(255,224,52,0.12)", transition: "border-color 0.2s" }}
          whileHover={{ borderColor: "rgba(255,224,52,0.3)" }}
        >
          {/* Card header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: "rgba(240,234,214,0.9)", letterSpacing: "-0.02em" }}>
                Daily Submission Tracker
              </h2>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,224,52,0.4)", letterSpacing: "0.08em", marginTop: "4px" }}>
                leetcode.com/u/IklashAhamed/
              </p>
            </div>

            <a
              href="https://leetcode.com/u/IklashAhamed/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "11px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "9px 18px",
                background: Y, color: B,
                border: "none", borderRadius: 0,
                display: "inline-flex", alignItems: "center", gap: "7px",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <SiLeetcode size={13} />
              View Profile
            </a>
          </div>

          {/* Tracker */}
          <div style={{ overflowX: "auto" }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <GitHubContributions username="IklashAhamed" onStatsChange={setTrackerStats} />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div {...fade(0.2)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {stats.map(({ label, val }) => (
            <div
              key={label}
              style={{ background: "#181818", border: "1.5px solid rgba(255,224,52,0.1)", padding: "16px 20px" }}
            >
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "22px", color: Y, lineHeight: 1 }}>{val}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,224,52,0.4)", letterSpacing: "0.08em", marginTop: "4px", textTransform: "uppercase" }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}