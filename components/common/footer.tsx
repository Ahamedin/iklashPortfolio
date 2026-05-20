"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Y = "#FFE034";
const B = "#0D0D0D";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: B,
        borderTop: "1.5px solid rgba(255,224,52,0.15)",
        fontFamily: "'Syne', sans-serif",
      }}
      className="relative z-10 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Wordmark */}
          <div>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: Y,
                lineHeight: 1,
              }}
            >
              Iklash Ahamed
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(255,224,52,0.4)",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Full Stack Developer
            </p>
          </div>

          {/* Nav links */}
          <div className="flex gap-6 flex-wrap justify-center">
            {[
              ["/#home", "Home"],
              ["/#about", "About"],
              ["/#projects", "Projects"],
              ["/#contact", "Contact"],
              ["/resume", "Resume"],
            ].map(([href, label]) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,224,52,0.5)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = Y)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,224,52,0.5)")}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              { href: "https://github.com/Ahamedin",              icon: <FaGithub size={17} />,  label: "GitHub" },
              { href: "https://www.linkedin.com/in/iklash",        icon: <FaLinkedin size={17} />, label: "LinkedIn" },
              { href: "https://leetcode.com/u/IklashAhamed/",      icon: <SiLeetcode size={16} />, label: "LeetCode" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "rgba(255,224,52,0.5)",
                  padding: "9px",
                  border: "1.5px solid rgba(255,224,52,0.14)",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  transition: "color 0.15s, border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = B;
                  (e.currentTarget as HTMLElement).style.background = Y;
                  (e.currentTarget as HTMLElement).style.borderColor = Y;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,224,52,0.5)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,224,52,0.14)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div
          style={{ borderTop: "1px solid rgba(255,224,52,0.08)", marginTop: "32px", paddingTop: "20px" }}
          className="flex flex-col md:flex-row items-center justify-between gap-2"
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "rgba(255,224,52,0.28)",
              textTransform: "uppercase",
            }}
          >
            © {year} Iklash Ahamed · All rights reserved
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "rgba(255,224,52,0.2)",
            }}
          >
            Built with Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}