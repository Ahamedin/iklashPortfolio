"use client";
import { motion } from "framer-motion";
import { FiBriefcase, FiBook, FiMapPin } from "react-icons/fi";

const Y = "#FFE034";
const B = "#0D0D0D";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

type TimelineItem = {
  date: string;
  icon: React.ReactNode;
  role: string;
  company: string;
  location: string;
  body: React.ReactNode;
};

const items: TimelineItem[] = [
  {
    date: "Present",
    icon: <FiBriefcase />,
    role: "Full-Stack Developer & SDE Aspirant",
    company: "Self Learning & Project Development",
    location: "Bengaluru, Tamil Nadu",
    body: (
      <ul className="space-y-2 mt-3">
        {[
          "Practicing DSA regularly to strengthen coding and interview skills",
          "Building full-stack apps using MERN Stack, Next.js, PostgreSQL, TypeScript",
          "Exploring AI integrations with LangChain, Gemini AI, and vector databases",
          "Learning modern frontend technologies, UI/UX design, and scalable backend architecture",
        ].map((t, i) => <BulletItem key={i}>{t}</BulletItem>)}
      </ul>
    ),
  },
  {
    date: "May 2025 – Jun 2025",
    icon: <FiBriefcase />,
    role: "Web Development Intern",
    company: "DrobospaceX Automation Pvt. Ltd.",
    location: "On-Site, Karaikudi",
    body: (
      <ul className="space-y-2 mt-3">
        {[
          "Developed responsive web applications using React.js, Next.js, and Node.js",
          "Worked on real-time AR/VR training institute website using Three.js and Next.js",
          "Implemented recommended products, admin panels, and authentication systems",
          "Improved teamwork, debugging, and scalable project development skills",
        ].map((t, i) => <BulletItem key={i}>{t}</BulletItem>)}
      </ul>
    ),
  },
  {
    date: "2023 – 2027",
    icon: <FiBook />,
    role: "B.Tech Information Technology",
    company: "Kalasalingam Academy of Research and Education",
    location: "Virudhunagar, Tamil Nadu",
    body: (
      <p style={{ fontFamily: "'Inter', system-ui", fontSize: "13px", lineHeight: 1.8, color: "rgba(240,234,214,0.6)", marginTop: "12px" }}>
        Pursuing B.Tech in Information Technology with focus on Blockchain, IoT, Data Science,
        Web Development, and Software Engineering fundamentals. Built multiple real-world
        projects using MERN Stack, Next.js, PostgreSQL, and AI technologies.
      </p>
    ),
  },
  {
    date: "Achievements",
    icon: <FiBriefcase />,
    role: "Hackathons & Projects",
    company: "Notable Milestones",
    location: "",
    body: (
      <ul className="space-y-2 mt-3">
        {[
          "Won Top 3 position in Web Innovate event for web design and innovation",
          "Built AI-powered Smart Assistant for Sustainable Living during hackathon",
          "Developed projects using LangChain, Gemini AI, React, Next.js, and PostgreSQL",
          "SIH Participant 2025 with a project focused on AI and sustainability",
          "IBM conducted Hackathon Participant 2024 with a project on AI-powered career guidance",
        ].map((t, i) => <BulletItem key={i}>{t}</BulletItem>)}
      </ul>
    ),
  },
];

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <span style={{ color: Y, flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>▹</span>
      <span style={{ fontFamily: "'Inter', system-ui", fontSize: "13px", lineHeight: 1.75, color: "rgba(240,234,214,0.65)" }}>
        {children}
      </span>
    </li>
  );
}

export default function ExperiencePage() {
  return (
    <div id="experience-page" className="min-h-screen w-full relative" style={{ background: "#111111" }}>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24">

        {/* Section label */}
        <motion.div {...fade(0)} className="mb-6">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,224,52,0.4)", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)", display: "inline-block" }} />
            Timeline
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.06)}
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: Y, marginBottom: "56px" }}
        >
          Experience
        </motion.h1>

        {/* Timeline */}
        <div className="relative max-w-4xl">
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "119px", top: 0, bottom: 0, width: "1px", background: "rgba(255,224,52,0.1)" }} className="hidden md:block" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div key={i} {...fade(0.08 + i * 0.07)} className="flex flex-col md:flex-row gap-4 md:gap-8">

                {/* Date col */}
                <div className="hidden md:flex flex-col items-end" style={{ minWidth: "112px", paddingTop: "4px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.06em", color: "rgba(255,224,52,0.45)", textAlign: "right" }}>
                    {item.date}
                  </span>
                </div>

                {/* Dot */}
                <div className="hidden md:flex flex-col items-center" style={{ width: "16px", flexShrink: 0, paddingTop: "6px" }}>
                  <div style={{ width: "10px", height: "10px", background: Y, flexShrink: 0 }} />
                </div>

                {/* Card */}
                <div
                  style={{
                    flex: 1,
                    background: "#181818",
                    border: "1.5px solid rgba(255,224,52,0.1)",
                    padding: "18px 18px",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,224,52,0.35)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,224,52,0.1)")}
                >
                  {/* Mobile date */}
                  <span className="md:hidden" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,224,52,0.45)" }}>
                    {item.date}
                  </span>

                  <div className="flex items-start gap-3 mt-1">
                    <div style={{ color: Y, marginTop: "2px", flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(14px, 3.6vw, 15px)", color: "rgba(240,234,214,0.95)", letterSpacing: "-0.01em" }}>
                        {item.role}
                      </h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginTop: "4px" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: Y, opacity: 0.7 }}>{item.company}</span>
                        {item.location && (
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(240,234,214,0.35)", display: "flex", alignItems: "center", gap: "4px" }}>
                            <FiMapPin size={10} /> {item.location}
                          </span>
                        )}
                      </div>
                      {item.body}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}