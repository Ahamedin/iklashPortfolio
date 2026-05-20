"use client";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useEffect, useState } from "react";

const YELLOW = "#FFE034";
const BLACK = "#0D0D0D";

const TECH = [
  "Java","DSA","React", "Next.js", "Node.js", "TypeScript",
  "PostgreSQL", "MongoDB", "LangChain","LLM","Vector DBs","AI Integrations",
];

const STATS = [
  { num: "6+", label: "Projects" },
  { num: "2+",  label: "Years Exp" },
  { num: "8+",  label: "Tech Stack" },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const fade = (delay: string): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
  });

  return (
    <main
      id="home"
      style={{ background: YELLOW, minHeight: "100vh", fontFamily: "'Syne', sans-serif" }}
      className="relative flex overflow-hidden"
    >
      {/* Dark right panel background for large screens */}
      <div
        className="absolute top-0 right-0 h-full hidden lg:block"
        style={{ width: "340px", background: BLACK, zIndex: 0 }}
      />
      <div
        className="absolute top-0 right-0 h-full hidden lg:block pointer-events-none"
        style={{
          width: "340px", zIndex: 1,
          backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,224,52,0.04) 39px,rgba(255,224,52,0.04) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,224,52,0.04) 39px,rgba(255,224,52,0.04) 40px)`,
        }}
      />

      {/* Layout */}
      <div className="relative w-full flex flex-col lg:flex-row min-h-screen" style={{ zIndex: 2 }}>

        {/* ── YELLOW / LEFT ── */}
        <div className="flex-1 flex flex-col justify-between px-8 md:px-12 lg:px-16 py-16 lg:py-20">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-10" style={fade("0s")}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase" as const,
                background: BLACK, color: YELLOW, padding: "5px 12px",
              }}>OPEN TO WORK</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: BLACK, opacity: 0.4 }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: BLACK }} />
              </span>
            </div>

            {/* Name */}
            <div className="mb-6" style={fade("0.08s")}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "0.08em", color: BLACK, opacity: 0.5, marginBottom: "8px" }}>
                {"full stack developer"}
              </p>
              <h1 style={{ fontSize: "clamp(52px, 9vw, 88px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: BLACK }}>
                Iklash<br />
                <span style={{ position: "relative", display: "inline-block" }}>
                  Ahamed
                  <span style={{ position: "absolute", bottom: "6px", left: 0, right: 0, height: "6px", background: BLACK }} />
                </span>
              </h1>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 mb-8" style={fade("0.14s")}>
              <div style={{ width: "40px", height: "2px", background: BLACK, flexShrink: 0 }} />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: BLACK, textTransform: "uppercase", fontWeight: 600 }}>
                M / PERN · Next.js · AI · LangChain
              </p>
            </div>

            {/* Bio */}
            <p style={{ ...fade("0.2s"), fontFamily: "'Inter', system-ui, sans-serif", fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.8, color: BLACK, opacity: 0.72, maxWidth: "500px", fontWeight: 500, marginBottom: "32px" }}>
              Building scalable full-stack applications and AI-powered platforms using React, Next.js, Node.js, PostgreSQL, MongoDB, and LangChain. Passionate about clean systems and impactful digital experiences.
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-10" style={fade("0.26s")}>
              {TECH.map((t) => (
                <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 600, padding: "4px 10px", border: `1.5px solid ${BLACK}`, color: BLACK, letterSpacing: "0.06em" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs + Socials */}
            <div className="flex flex-wrap items-center gap-3" style={fade("0.32s")}>
              <a
                href="/resume"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: YELLOW, background: BLACK, padding: "12px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                View Resume
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>

              <a
                href="/contact"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: BLACK, background: "transparent", padding: "11px 28px", border: `2px solid ${BLACK}`, textDecoration: "none", transition: "background 0.2s ease, color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BLACK; (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = BLACK; }}
              >
                Contact Me
              </a>

              <div className="flex gap-2 items-center ml-2">
                {[
                  { href: "https://github.com/Ahamedin", icon: <FaGithub size={18} />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/iklash", icon: <FaLinkedin size={18} />, label: "LinkedIn" },
                  { href: "https://leetcode.com/u/IklashAhamed/", icon: <SiLeetcode size={17} />, label: "LeetCode" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ color: BLACK, display: "flex", alignItems: "center", padding: "9px", border: `1.5px solid ${BLACK}`, textDecoration: "none", transition: "background 0.2s ease, color 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BLACK; (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = BLACK; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 mt-12" style={{ ...fade("0.4s"), borderTop: `2px solid rgba(13,13,13,0.2)` }}>
            {STATS.map(({ num, label }) => (
              <div key={label}>
                <p style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 900, color: BLACK, lineHeight: 1 }}>{num}</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: BLACK, opacity: 0.45, letterSpacing: "0.08em", marginTop: "4px", textTransform: "uppercase" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DARK / RIGHT ── */}
        <div
          className="lg:w-[340px] flex-shrink-0 flex flex-col justify-end relative"
          style={{ background: BLACK, padding: "32px 28px", minHeight: "300px" }}
        >
          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,224,52,0.04) 39px,rgba(255,224,52,0.04) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,224,52,0.04) 39px,rgba(255,224,52,0.04) 40px)` }} />

          {/* Top label */}
          <div className="absolute top-8 left-7 right-7 flex justify-between items-center" style={{ zIndex: 10 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,224,52,0.4)", textTransform: "uppercase" }}>PROFILE</span>
            {/* <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(255,224,52,0.3)" }}>01 / 01</span> */}
          </div>

          {/* Photo */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1, top: "60px", bottom: "200px" }}>
            <div style={{ position: "relative", width: "clamp(140px, 60%, 200px)", aspectRatio: "1", border: "1.5px solid rgba(255,224,52,0.15)" }}>
              {/* Corner brackets */}
              {([
                { top: -1, left: -1, borderTop: `2px solid ${YELLOW}`, borderLeft: `2px solid ${YELLOW}` },
                { top: -1, right: -1, borderTop: `2px solid ${YELLOW}`, borderRight: `2px solid ${YELLOW}` },
                { bottom: -1, left: -1, borderBottom: `2px solid ${YELLOW}`, borderLeft: `2px solid ${YELLOW}` },
                { bottom: -1, right: -1, borderBottom: `2px solid ${YELLOW}`, borderRight: `2px solid ${YELLOW}` },
              ] as React.CSSProperties[]).map((s, i) => (
                <div key={i} style={{ position: "absolute", width: "14px", height: "14px", zIndex: 10, ...s }} />
              ))}
              <Image
                src="/iklash1.PNG"
                alt="Iklash Ahamed — Full Stack Developer"
                fill
                priority
                className="object-cover"
                style={{ filter: "contrast(1.05) saturate(0.85)" }}
                sizes="200px"
              />
            </div>
          </div>

          {/* Info */}
          <div style={{ position: "relative", zIndex: 5 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,224,52,0.5)", textTransform: "uppercase", marginBottom: "6px" }}>IKLASH_AHAMED</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 900, color: YELLOW, lineHeight: 1.1, marginBottom: "4px" }}>
              Full Stack<br />Developer
            </h2>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,224,52,0.4)", letterSpacing: "0.08em" }}>Karaikudi, Tamil Nadu</p>
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255,224,52,0.12)" }}>
              {["iklashriz@gmail.com", "+91 86103 38487"].map((text) => (
                <div key={text} className="flex items-center gap-2 mb-2">
                  <div style={{ width: "6px", height: "6px", background: YELLOW, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,224,52,0.6)", letterSpacing: "0.04em" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');`}</style>
    </main>
  );
}