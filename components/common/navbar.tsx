"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, X } from "lucide-react";

const Y = "#FFE034";
const B = "#0D0D0D";

const spring = { type: "spring", mass: 0.4, damping: 15, stiffness: 300 };

const NAV_ITEMS = [
  { href: "/#home",       label: "Home",     id: "home" },
  { href: "/#projects",   label: "Projects", id: "projects" },
  { href: "/#contact",    label: "Contact",  id: "contact" },
];

const ABOUT_SUB = [
  { href: "/#about",      label: "About Me",   id: "about" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#skills",     label: "Skills",     id: "skills" },
];

type NavMobileItem = (typeof NAV_ITEMS)[number] & { sub?: boolean };

export function Navbar() {
  const [currentSection, setCurrentSection] = useState("");
  const [isMobileOpen, setIsMobileOpen]     = useState(false);
  const [aboutOpen, setAboutOpen]           = useState(false);
  const [isVisible, setIsVisible]           = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("section[id], main[id]");
      const pos = window.scrollY + 100;
      let cur = "";
      sections.forEach((s) => {
        const el = s as HTMLElement;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.clientHeight)
          cur = el.getAttribute("id") || "";
      });
      setCurrentSection(cur);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent) => setIsVisible(e.detail.visible);
    window.addEventListener("toggleNavbar", handler as EventListener);
    return () => window.removeEventListener("toggleNavbar", handler as EventListener);
  }, []);

  const isAboutActive = ["about","experience","skills"].includes(currentSection);
  const isActive = (id: string) =>
    id === "home"
      ? !currentSection || currentSection === "home" || currentSection === "main-content"
      : currentSection === id;

  return (
    <>
      {/* ── DESKTOP ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={spring}
            className="fixed top-4 inset-x-0 max-w-xl mx-auto z-50 hidden md:flex items-center justify-center"
          >
            <div
              style={{
                background: B,
                border: "1.5px solid rgba(255,224,52,0.18)",
                fontFamily: "'Syne', sans-serif",
              }}
              className="flex items-center gap-1 px-2 py-1.5"
            >
              {/* Wordmark */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: Y,
                  padding: "4px 10px",
                  borderRight: "1px solid rgba(255,224,52,0.15)",
                  marginRight: "6px",
                }}
              >
                IK
              </span>

              {NAV_ITEMS.slice(0, 2).map((item) => (
                <NavLink key={item.id} href={item.href} active={isActive(item.id)}>
                  {item.label}
                </NavLink>
              ))}

              {/* About dropdown */}
              <div className="relative group">
                <NavLink href="/#about" active={isAboutActive}>
                  About
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1 inline-block">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </NavLink>
                <div
                  className="absolute top-full left-0 mt-1 hidden group-hover:flex flex-col min-w-[140px]"
                  style={{ background: B, border: "1.5px solid rgba(255,224,52,0.18)", zIndex: 99 }}
                >
                  {ABOUT_SUB.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                        padding: "10px 16px",
                        color: currentSection === s.id ? Y : "rgba(240,234,214,0.7)",
                        borderBottom: "1px solid rgba(255,224,52,0.08)",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = Y)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = currentSection === s.id ? Y : "rgba(240,234,214,0.7)")
                      }
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <NavLink href="/#contact" active={isActive("contact")}>
                Contact
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── MOBILE ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={spring}
            className="md:hidden fixed top-4 left-4 right-4 z-50"
          >
            <div className="flex items-center justify-between">
              {/* Hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                style={{ background: B, border: "1.5px solid rgba(255,224,52,0.2)" }}
                className="p-3"
              >
                <motion.div animate={{ rotate: isMobileOpen ? 180 : 0 }} transition={spring}>
                  {isMobileOpen
                    ? <X size={18} color={Y} />
                    : <MenuIcon size={18} color={Y} />
                  }
                </motion.div>
              </button>

              {/* Section indicator */}
              <div
                style={{
                  background: B,
                  border: "1.5px solid rgba(255,224,52,0.18)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: Y,
                  padding: "8px 16px",
                }}
              >
                {currentSection
                  ? currentSection.charAt(0).toUpperCase() + currentSection.slice(1)
                  : "Home"}
              </div>
            </div>

            <AnimatePresence>
              {isMobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scaleY: 0.9 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                  transition={spring}
                  style={{
                    background: B,
                    border: "1.5px solid rgba(255,224,52,0.18)",
                    transformOrigin: "top",
                  }}
                  className="mt-2 flex flex-col"
                >
                  {[...NAV_ITEMS.slice(0, 2), ...ABOUT_SUB.map((s) => ({ ...s, sub: true })), NAV_ITEMS[2]].map(
                    (item: NavMobileItem) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        style={{
                          fontFamily: item.sub ? "'JetBrains Mono', monospace" : "'Syne', sans-serif",
                          fontSize: item.sub ? "11px" : "13px",
                          fontWeight: item.sub ? 500 : 700,
                          letterSpacing: item.sub ? "0.06em" : "0.04em",
                          padding: item.sub ? "10px 28px" : "14px 20px",
                          color: (item.sub ? currentSection === item.id : isActive(item.id)) ? Y : "rgba(240,234,214,0.7)",
                          borderBottom: "1px solid rgba(255,224,52,0.07)",
                          textDecoration: "none",
                          textTransform: "uppercase",
                          background: (item.sub ? currentSection === item.id : isActive(item.id))
                            ? "rgba(255,224,52,0.05)" : "transparent",
                          transition: "color 0.15s, background 0.15s",
                        }}
                      >
                        {item.sub && "— "}{item.label}
                      </a>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href, children, active,
}: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "8px 16px",
        color: active ? "#0D0D0D" : "rgba(240,234,214,0.7)",
        background: active ? "#FFE034" : "transparent",
        textDecoration: "none",
        transition: "color 0.15s, background 0.15s",
        display: "inline-flex",
        alignItems: "center",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = "#FFE034";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = "rgba(240,234,214,0.7)";
      }}
    >
      {children}
    </a>
  );
}