"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiCopy, FiExternalLink } from "react-icons/fi";

const B = "#0D0D0D";

type Certification = {
  title: string;
  issuer: string;
  type: "Job Simulation" | "Digital Credential" | "Course Completion Certificate & Digital Badge";
  date: string;
  credentialId?: string;
  description: string;
  skills: string[];
  link: string;
};

const certifications: Certification[] = [
  {
    title: "Software Engineering Job Simulation",
    issuer: "Hewlett Packard Enterprise (via Forage)",
    type: "Job Simulation",
    date: "October 2026",
    credentialId: "6ac5f0d0623e37ae66706cbb",
    description:
      "Proposed a RESTful web service design, built a basic RESTful service with data upload functionality, and created unit tests.",
    skills: ["REST APIs", "Backend Development", "Unit Testing", "Problem Solving"],
    link: "/certificates/hpe-software-engineering.pdf",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    type: "Digital Credential",
    date: "October 2026",
    description:
      "Covered HTML and CSS, JavaScript, website development, the software development lifecycle, testing and deployment, version control, and DevOps.",
    skills: ["HTML/CSS", "JavaScript", "Version Control", "DevOps"],
    link: "https://www.credly.com/badges/12ca2a3b-cecf-4e95-b766-df087ee8571a",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    type: "Course Completion Certificate & Digital Badge",
    date: "October 2026",
    credentialId: "f92496c9-2f15-4b62-81a9-91b08bfae874",
    description:
      "Covered networking fundamentals, devices and media, data transmission, wireless technologies, and IP addressing.",
    skills: ["Networking Fundamentals", "IP Addressing", "Wireless Technologies"],
    link: "https://www.credly.com/badges/679b6796-b4ad-42e7-b9cc-a331e6ec2cde/accept",
  },
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
};

function typeColor(type: Certification["type"]) {
  if (type === "Job Simulation") return "#FFE034";
  if (type === "Digital Credential") return "#9ee7c0";
  return "#9ed5ff";
}

function CredentialId({ credentialId }: { credentialId: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copyCredentialId = async () => {
    try {
      await navigator.clipboard.writeText(credentialId);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError(true);
      setCopied(false);
    }
  };

  return (
    <div className="mt-5 flex items-center gap-2">
      <span className="font-mono-y min-w-0 truncate text-[10px] tracking-[0.04em] text-[rgba(240,234,214,0.48)]">
        ID: {credentialId}
      </span>
      <button
        type="button"
        onClick={copyCredentialId}
        aria-label={`Copy credential ID ${credentialId}`}
        className="shrink-0 border border-[rgba(255,224,52,0.2)] p-1.5 text-[rgba(255,224,52,0.7)] transition-colors hover:border-[rgba(255,224,52,0.55)] hover:text-[#FFE034] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE034]"
      >
        {copied ? <FiCheck size={12} aria-hidden="true" /> : <FiCopy size={12} aria-hidden="true" />}
      </button>
      {copyError && (
        <span className="font-mono-y text-[10px] text-[#ff9d9d]" role="status">
          Copy failed
        </span>
      )}
    </div>
  );
}

export default function Certifications() {
  return (
    <div id="certifications-page" className="relative min-h-screen w-full" style={{ background: B }}>
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="section-label flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-[rgba(255,224,52,0.3)]" />
            Professional Growth
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="mb-14 font-display text-[clamp(44px,7vw,80px)] font-black leading-[0.92] tracking-[-0.04em] text-[#FFE034]"
        >
          Certifications
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {certifications.map((certification) => (
            <motion.article
              key={certification.title}
              variants={cardVariants}
              className="group flex h-full flex-col border-[1.5px] border-[rgba(255,224,52,0.12)] bg-[#181818] p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(255,224,52,0.45)] hover:shadow-[0_8px_32px_rgba(255,224,52,0.07)]"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono-y text-[10px] uppercase tracking-[0.12em] text-[rgba(240,234,214,0.5)]">
                  {certification.date}
                </p>
                <span
                  className="border px-2 py-1 text-right font-mono-y text-[9px] leading-tight tracking-[0.04em]"
                  style={{ borderColor: `${typeColor(certification.type)}55`, color: typeColor(certification.type) }}
                >
                  {certification.type}
                </span>
              </div>

              <h2 className="mt-6 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#FFE034]">
                {certification.title}
              </h2>
              <p className="mt-2 font-display text-sm font-bold text-[rgba(240,234,214,0.82)]">
                {certification.issuer}
              </p>

              {certification.credentialId && <CredentialId credentialId={certification.credentialId} />}

              <p className="mt-5 font-sans text-sm leading-7 text-[rgba(240,234,214,0.62)]">
                {certification.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <span key={skill} className="tag-y">
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View credential for ${certification.title}`}
                className="mt-auto ml-auto inline-flex items-center gap-2 pt-8 font-mono-y text-[10px] uppercase tracking-[0.12em] text-[rgba(255,224,52,0.7)] transition-colors hover:text-[#FFE034] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFE034]"
              >
                View Credential <FiExternalLink size={13} aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
