"use client";
import { motion } from "framer-motion";
import PDFViewer from "@/components/resume/pdf-viewer";
import { FiCode, FiBookOpen, FiAward, FiGlobe } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Y = "#FFE034";
const B = "#0D0D0D";

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 700); }, []);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: B }}>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      {!mounted ? (
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: Y, letterSpacing: "-0.04em" }}>
              Iklash Ahamed
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.18em", color: "rgba(255,224,52,0.4)", marginTop: "8px", textTransform: "uppercase" }}>
              Loading Resume…
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[0, 0.15, 0.3].map((d, i) => (
                <span key={i} style={{ width: 6, height: 6, background: Y, display: "inline-block", animation: `bounce 0.6s ${d}s infinite` }} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,224,52,0.4)", display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)", display: "inline-block" }} />
              Document
            </span>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px, 7vw, 72px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: Y, marginBottom: "10px" }}>
              Resume
            </h1>
            <p style={{ fontFamily: "'Inter', system-ui", fontSize: "14px", color: "rgba(240,234,214,0.45)", maxWidth: "480px", lineHeight: 1.7 }}>
              My qualifications, experience, and skills presented in a comprehensive document.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ border: "1.5px solid rgba(255,224,52,0.15)", overflow: "hidden" }}
          >
            <div className="flex flex-col lg:grid lg:grid-cols-12">

              {/* Sidebar */}
              <div
                className="lg:col-span-3 p-4 sm:p-6"
                style={{ background: "#181818", borderRight: "1px solid rgba(255,224,52,0.1)" }}
              >
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px", color: "rgba(240,234,214,0.9)", marginBottom: "4px" }}>
                  About This Resume
                </h2>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,224,52,0.4)", marginBottom: "24px" }}>
                  Interactive Guide
                </p>

                <div className="space-y-6">
                  {[
                    { icon: <FiCode />, label: "Technical Focus", text: "Expertise in full-stack development with React, Node.js, and modern web technologies — responsive, accessible, and performant." },
                    { icon: <FiBookOpen />, label: "Resume Tips", bullets: ["Check Experience for my professional journey", "Skills section outlines my technical capabilities", "Education covers my academic background"] },
                    { icon: <FiAward />, label: "Why Hire Me", text: "I bring technical expertise, problem-solving, and collaborative skills. Passionate about clean code and user-centric design." },
                  ].map(({ icon, label, text, bullets }) => (
                    <div key={label}>
                      <div className="flex items-center gap-2 mb-2">
                        <div style={{ color: Y, opacity: 0.7 }}>{icon}</div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,224,52,0.4)" }}>{label}</span>
                      </div>
                      {text && <p style={{ fontFamily: "'Inter', system-ui", fontSize: "12px", color: "rgba(240,234,214,0.45)", lineHeight: 1.75 }}>{text}</p>}
                      {bullets && (
                        <ul className="space-y-1">
                          {bullets.map((b, i) => (
                            <li key={i} style={{ display: "flex", gap: "8px", fontFamily: "'Inter', system-ui", fontSize: "12px", color: "rgba(240,234,214,0.45)", lineHeight: 1.7 }}>
                              <span style={{ color: Y, flexShrink: 0 }}>▹</span>{b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Connect */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,224,52,0.08)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,224,52,0.4)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <FiGlobe size={11} style={{ color: Y }} /> Connect
                  </span>
                  <div className="flex gap-2">
                    {[
                      { href: "https://github.com/Ahamedin", icon: <FaGithub size={15} /> },
                      { href: "https://www.linkedin.com/in/iklash", icon: <FaLinkedin size={15} /> },
                      { href: "https://leetcode.com/u/IklashAhamed/", icon: <SiLeetcode size={14} /> },
                    ].map(({ href, icon }, i) => (
                      <a
                        key={i} href={href} target="_blank" rel="noopener noreferrer"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, border: "1.5px solid rgba(255,224,52,0.15)", color: "rgba(255,224,52,0.45)", transition: "all 0.15s", textDecoration: "none" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = Y; (e.currentTarget as HTMLElement).style.color = B; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,224,52,0.45)"; }}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="lg:col-span-9 min-h-[calc(100vh-220px)]">
                <PDFViewer />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}