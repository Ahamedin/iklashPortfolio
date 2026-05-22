"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiJavascript, SiMysql, SiPostgresql, SiGit,
  SiMongodb, SiNodedotjs, SiExpress, SiPostman,
  SiRedux, SiFirebase, SiPrisma, SiGithub, SiVercel, SiPython,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { RiJavaLine } from "react-icons/ri";
import { FiCode, FiDatabase, FiTool, FiCpu } from "react-icons/fi";
import { TbBrain } from "react-icons/tb";

const Y = "#FFE034";
const B = "#0D0D0D";

const skills = {
  "Frontend": [
    { name: "React.js",      icon: <SiReact       className="text-[#61DAFB]" /> },
    { name: "Next.js",       icon: <SiNextdotjs   style={{ color: Y }} /> },
    { name: "TypeScript",    icon: <SiTypescript  className="text-[#3178C6]" /> },
    { name: "JavaScript",    icon: <SiJavascript  className="text-[#F7DF1E]" /> },
    { name: "Tailwind CSS",  icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Redux Toolkit", icon: <SiRedux       className="text-[#764ABC]" /> },
  ],
  "Backend & DB": [
    { name: "Node.js",     icon: <SiNodedotjs  className="text-[#339933]" /> },
    { name: "Express.js",  icon: <SiExpress    style={{ color: Y, opacity: 0.8 }} /> },
    { name: "MongoDB",     icon: <SiMongodb    className="text-[#47A248]" /> },
    { name: "PostgreSQL",  icon: <SiPostgresql className="text-[#336791]" /> },
    { name: "MySQL",       icon: <SiMysql      className="text-[#4479A1]" /> },
    { name: "Prisma ORM",  icon: <SiPrisma     style={{ color: Y, opacity: 0.8 }} /> },
    { name: "Firebase",    icon: <SiFirebase   className="text-[#FFCA28]" /> },
  ],
  "Programming & AI": [
    { name: "Java",       icon: <RiJavaLine className="text-[#ED8B00]" /> },
    { name: "Python",     icon: <SiPython   className="text-[#3776AB]" /> },
    { name: "LangChain",  icon: <TbBrain    className="text-cyan-400" /> },
    { name: "Gemini AI",  icon: <TbBrain    className="text-purple-400" /> },
    { name: "REST APIs",  icon: <FiCpu      style={{ color: Y }} /> },
    { name: "DSA",        icon: <FiCode     className="text-orange-400" /> },
  ],
  "Tools": [
    { name: "Git",     icon: <SiGit     className="text-[#F05032]" /> },
    { name: "GitHub",  icon: <SiGithub  style={{ color: Y, opacity: 0.8 }} /> },
    { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
    { name: "VS Code", icon: <VscVscode className="text-[#007ACC]" /> },
    { name: "Vercel",  icon: <SiVercel  style={{ color: Y, opacity: 0.8 }} /> },
  ],
};

const catIcons: Record<string, React.ReactNode> = {
  "Frontend":         <FiCode    className="w-5 h-5" />,
  "Backend & DB":     <FiDatabase className="w-5 h-5" />,
  "Programming & AI": <TbBrain   className="w-5 h-5" />,
  "Tools":            <FiTool    className="w-5 h-5" />,
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div id="skills-page" className="min-h-screen w-full relative" style={{ background: B }}>
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24">

        {/* Section label */}
        <motion.div {...fade(0)} className="mb-6">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,224,52,0.4)", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)", display: "inline-block" }} />
            Tech Stack
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.06)}
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(38px, 6.5vw, 80px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: Y, marginBottom: "56px", maxWidth: "100%" }}
        >
          Skills &<br />Technologies
        </motion.h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl">
          {Object.entries(skills).map(([cat, list], ci) => (
            <motion.div
              key={cat}
              {...fade(0.1 + ci * 0.07)}
              style={{
                background: "#181818",
                border: "1.5px solid rgba(255,224,52,0.1)",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
              whileHover={{ borderColor: "rgba(255,224,52,0.3)" }}
            >
              {/* Category header */}
                <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,224,52,0.08)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ color: Y, opacity: 0.8 }}>{catIcons[cat]}</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "15px", color: "rgba(240,234,214,0.9)", letterSpacing: "-0.01em" }}>
                  {cat}
                </h2>
              </div>

              {/* Skills */}
              <div style={{ padding: "14px 16px" }}>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 + si * 0.04 }}
                      whileHover={{ scale: 1.04 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "7px 12px",
                        background: "rgba(255,224,52,0.04)",
                        border: "1px solid rgba(255,224,52,0.12)",
                        cursor: "default",
                        transition: "border-color 0.2s, background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,224,52,0.4)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,224,52,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,224,52,0.12)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,224,52,0.04)";
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>{skill.icon}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 500, color: "rgba(240,234,214,0.8)", letterSpacing: "0.03em" }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div {...fade(0.5)} className="mt-16 max-w-2xl">
          <div style={{ borderLeft: `3px solid ${Y}`, paddingLeft: "20px" }}>
            <p style={{ fontFamily: "'Inter', system-ui", fontSize: "14px", lineHeight: 1.8, color: "rgba(240,234,214,0.55)" }}>
              Passionate about building scalable full-stack applications, AI-powered solutions,
              and immersive digital experiences while continuously learning modern technologies
              and software engineering best practices.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}