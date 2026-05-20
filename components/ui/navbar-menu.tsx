"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LiquidGlass } from "./LiquidGlass";

const Y = "#FFE034";
const B = "#0D0D0D";

const spring  = { type: "spring", mass: 0.4, damping: 15,  stiffness: 300, restDelta: 0.001, restSpeed: 0.001 };
const wobble  = { type: "spring", mass: 0.6, damping: 12,  stiffness: 400, restDelta: 0.001, restSpeed: 0.001 };
const bounce  = { type: "spring", mass: 0.3, damping: 20,  stiffness: 500, restDelta: 0.001, restSpeed: 0.001 };
const easeOut = [0.16, 1, 0.3, 1] as const;

/* ── MENU ITEM (dropdown trigger) ── */
export const MenuItem = ({
  setActive, active, item, children, isCurrentSection,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  isCurrentSection?: boolean;
  childSections?: string[];
}) => (
  <div onMouseEnter={() => setActive(item)} className="relative">
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05, transition: bounce }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      animate={{
        color: isCurrentSection ? Y : "rgba(240,234,214,0.75)",
        fontWeight: isCurrentSection ? 800 : 600,
      }}
      transition={spring}
      style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", position: "relative" }}
    >
      {/* Yellow glow behind active item */}
      {isCurrentSection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={wobble}
          style={{ position: "absolute", inset: 0, background: Y, borderRadius: 0, filter: "blur(8px)", zIndex: -1 }}
        />
      )}
      <motion.span className="relative z-10" whileHover={{ y: -1, transition: bounce }}>
        {item}
      </motion.span>
    </motion.div>

    {active === item && (
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 10, rotateX: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: -4, transition: { duration: 0.18, ease: easeOut } }}
        transition={wobble}
        style={{ transformPerspective: 1000 }}
      >
        <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 pt-2">
          <motion.div
            layoutId="active-y"
            style={{
              background: B,
              border: "1.5px solid rgba(255,224,52,0.22)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,224,52,0.05)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={spring}
              style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,224,52,0.04), transparent)", pointerEvents: "none" }}
            />
            <motion.div
              layout
              className="w-max h-full p-4 relative z-10"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={spring}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </div>
);

/* ── MENU WRAPPER ── */
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => (
  <LiquidGlass width={800} height={56} borderRadius={0} intensity={0.5}
    className="border border-yellow-brand/20 bg-ink/80"
  >
    <motion.nav
      onMouseLeave={() => setActive(null)}
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={wobble}
      whileHover={{ scale: 1.01, y: -1, transition: bounce }}
      className="relative z-50 flex justify-evenly items-center px-8 py-3"
    >
      {/* Yellow ambient glow */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={spring}
        style={{ position: "absolute", inset: 0, background: "rgba(255,224,52,0.02)", pointerEvents: "none" }}
      />
      <div className="relative z-10 flex justify-evenly items-center space-x-6 w-full">
        {children}
      </div>
    </motion.nav>
  </LiquidGlass>
);

/* ── HOVERED LINK ── */
export const HoveredLink = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: React.ReactNode | string | undefined;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -1, transition: bounce }}
    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
  >
    <Link
      href=""
      {...rest}
      className={cn("transition-all duration-200 relative inline-block", className)}
    >
      <motion.span className="relative">
        {children}
        {/* Yellow underline on hover for non-active items */}
        {!className?.includes("text-yellow") && !className?.includes("font-bold") && (
          <motion.div
            style={{ position: "absolute", bottom: 0, left: 0, height: "1.5px", background: Y, borderRadius: 0 }}
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: "100%", opacity: 1, transition: bounce }}
          />
        )}
      </motion.span>
    </Link>
  </motion.div>
);

/* ── MOBILE LINK ── */
export const MobileLink = ({
  href, children, className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02, x: 4, transition: bounce }}
    whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
  >
    <Link
      href={href}
      className={cn("text-sm transition-all duration-200 p-3 relative block", className)}
      style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
    >
      {!className?.includes("text-yellow") && (
        <motion.div
          style={{ position: "absolute", inset: 0, background: "rgba(255,224,52,0.06)", pointerEvents: "none" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileHover={{ opacity: 1, scale: 1, transition: spring }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  </motion.div>
);

/* ── MOBILE MENU ITEM (dropdown row) ── */
export const MobileMenuItem = ({
  title, children, isActive, onClick,
}: {
  title: string;
  children?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.div className="relative">
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01, transition: bounce }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      style={{
        width: "100%", textAlign: "left" as const,
        padding: "12px 16px",
        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "12px",
        letterSpacing: "0.1em", textTransform: "uppercase" as const,
        color: isActive ? Y : "rgba(240,234,214,0.7)",
        background: isActive ? "rgba(255,224,52,0.07)" : "transparent",
        border: "none", cursor: "pointer", position: "relative" as const,
        transition: "color 0.15s, background 0.15s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={wobble}
          style={{ position: "absolute", inset: 0, background: "rgba(255,224,52,0.06)", pointerEvents: "none" }}
        />
      )}
      <span className="relative z-10">{title}</span>
      <motion.span
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={wobble}
        style={{ color: isActive ? Y : "rgba(255,224,52,0.35)", display: "inline-block" }}
      >
        ▾
      </motion.span>
    </motion.button>

    <motion.div
      initial={false}
      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
      transition={wobble}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  </motion.div>
);

/* ── PRODUCT ITEM ── */
export const ProductItem = ({
  title, description, href, src,
}: {
  title: string; description: string; href: string; src: string;
}) => (
  <motion.div whileHover={{ scale: 1.02, y: -2, transition: bounce }} whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}>
    <Link href={href} className="flex space-x-3 group relative">
      <motion.div className="relative" whileHover={{ rotateY: 4, transition: spring }} style={{ transformPerspective: 1000 }}>
        <Image src={src} width={140} height={70} alt={title} className="flex-shrink-0" style={{ borderRadius: 0 }} />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, transition: spring }}
          style={{ position: "absolute", inset: 0, background: "rgba(255,224,52,0.12)", borderRadius: 0 }}
        />
      </motion.div>
      <div>
        <motion.h4
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px", color: "rgba(240,234,214,0.9)", marginBottom: "4px" }}
          whileHover={{ color: Y, x: 2, transition: bounce }}
        >
          {title}
        </motion.h4>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(240,234,214,0.4)", maxWidth: "10rem" }}>
          {description}
        </p>
      </div>
    </Link>
  </motion.div>
);