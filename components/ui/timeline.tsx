"use client";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Y = "#FFE034";
const B = "#0D0D0D";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref          = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full relative overflow-hidden" ref={containerRef}>
      {/* Header */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: Y,
            lineHeight: 0.95,
            marginBottom: "12px",
          }}
        >
          Journey Through Time
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.06em",
            color: "rgba(255,224,52,0.4)",
            maxWidth: "400px",
            lineHeight: 1.75,
          }}
        >
          A chronicle of my professional evolution and key milestones.
        </motion.p>
      </div>

      {/* Items */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}

        {/* Progress line */}
        <div
          style={{ height: height + "px", background: "rgba(255,224,52,0.08)" }}
          className="absolute md:left-8 left-8 top-0 w-[2px]"
        >
          {/* Static rail */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent, rgba(255,224,52,0.08) 10%, rgba(255,224,52,0.08) 90%, transparent)",
            }}
          />
          {/* Animated progress fill */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background:
                "linear-gradient(to bottom, rgba(255,224,52,0.1), #FFE034, rgba(255,224,52,0.1))",
            }}
            className="absolute inset-x-0 top-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({
  item, index,
}: {
  item: TimelineEntry;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30% 0px -70% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      className="flex justify-start pt-10 md:pt-20 md:gap-10"
    >
      {/* Left: sticky dot + label */}
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="relative h-10 w-10">
          <div
            className="h-10 absolute left-3 md:left-3 w-10 flex items-center justify-center"
            style={{
              background: B,
              border: `1.5px solid rgba(255,224,52,${inView ? 0.5 : 0.15})`,
              transition: "border-color 0.3s",
            }}
          >
            <motion.div
              style={{ width: 10, height: 10, background: Y }}
              animate={{ scale: inView ? 1.4 : 1, opacity: inView ? 1 : 0.45 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <h3
          className="hidden md:block md:pl-6 text-base md:text-lg"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            color: inView ? Y : "rgba(255,224,52,0.35)",
            letterSpacing: "-0.02em",
            transition: "color 0.3s",
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Right: card */}
      <div className="relative pl-20 pr-4 md:pl-6 w-full">
        <h3
          className="md:hidden block text-xl mb-4 text-left"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: Y }}
        >
          {item.title}
        </h3>

        <motion.div
          style={{
            background: "#181818",
            border: "1.5px solid",
            borderColor: inView
              ? "rgba(255,224,52,0.3)"
              : "rgba(255,224,52,0.1)",
            padding: "20px 24px",
            boxShadow: inView
              ? "0 0 24px rgba(255,224,52,0.06)"
              : "none",
            transition: "border-color 0.35s, box-shadow 0.35s",
          }}
          animate={{}}
        >
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "14px",
              lineHeight: 1.75,
              color: "rgba(240,234,214,0.75)",
            }}
          >
            {item.content}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};