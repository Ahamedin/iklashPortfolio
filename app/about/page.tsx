"use client";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";

const Y = "#FFE034";
const B = "#0D0D0D";

const words = [
  "watching Sci-Fi Movies",
  "building AI projects",
  "exploring new technologies",
  "designing immersive websites",
  "learning new frameworks",
  "listening to music",
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

export default function About() {
  return (
    <div
      id="about-page"
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: B }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none grid-bg"
        style={{ zIndex: 0 }}
      />

      {/* Yellow glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", right: "-5%",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,224,52,0.06) 0%, transparent 70%)",
          filter: "blur(40px)", zIndex: 0,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24">

        {/* Section label */}
        <motion.div {...fade(0)} className="mb-6">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,224,52,0.4)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)", display: "inline-block" }} />
            About Me
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fade(0.06)}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(44px, 7vw, 80px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: Y,
            marginBottom: "48px",
          }}
        >
          Who I Am
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl">

          {/* Left — intro block */}
          <div className="space-y-8">
            <motion.p
              {...fade(0.12)}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontWeight: 700,
                lineHeight: 1.55,
                color: "rgba(240,234,214,0.92)",
              }}
            >
              I&apos;m a passionate Full-Stack Developer who enjoys building
              modern web applications, AI-powered platforms, and immersive
              digital experiences.
            </motion.p>

            <motion.p
              {...fade(0.18)}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(240,234,214,0.6)",
              }}
            >
              I primarily work with React.js, Next.js, TypeScript, Node.js,
              PostgreSQL, and modern frontend technologies. I love creating
              scalable, responsive, and visually engaging applications with
              clean architecture and smooth user experiences.
            </motion.p>

            <motion.p
              {...fade(0.24)}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "rgba(240,234,214,0.6)",
              }}
            >
              Currently focused on improving problem-solving through DSA
              while exploring AI, System Design, CS-Core subjects.
            </motion.p>

            {/* Hobbies */}
            <motion.div {...fade(0.3)} style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", color: "rgba(240,234,214,0.7)" }}>
              When I&apos;m not coding, I&apos;m usually{" "}
              <FlipWords words={words} className="text-yellow-brand font-bold" />
            </motion.div>
          </div>

          {/* Right — stat cards */}
          <div className="space-y-4">
            {[
              { num: "6+", label: "Projects Shipped", desc: "Full-stack and AI-powered applications" },
              { num: "2+",  label: "Years of Building", desc: "Hands-on development and learning" },
              { num: "8+",  label: "Technologies", desc: "React, Next.js, Node, Postgres, LangChain…" },
              { num: "1",   label: "Internship", desc: "DrobospaceX Automation Pvt. Ltd." },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fade(0.14 + i * 0.06)}
                style={{
                  background: "#181818",
                  border: "1.5px solid rgba(255,224,52,0.12)",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  transition: "border-color 0.2s",
                }}
                whileHover={{ borderColor: "rgba(255,224,52,0.4)" } as any}
              >
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "36px",
                    fontWeight: 900,
                    color: Y,
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "60px",
                  }}
                >
                  {stat.num}
                </p>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px", color: "rgba(240,234,214,0.9)", letterSpacing: "-0.01em" }}>
                    {stat.label}
                  </p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(255,224,52,0.4)", marginTop: "2px", letterSpacing: "0.04em" }}>
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}