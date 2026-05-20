"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useEffect, useRef, useCallback } from "react";
import Head from "next/head";

const Y = "#FFE034";
const B = "#0D0D0D";

const SEO = {
  title: "Iklash Ahamed | Full Stack Developer Portfolio",
  description: "Explore the portfolio of Iklash Ahamed — Full Stack Developer specializing in MERN Stack, Next.js, AI integrations, LangChain, PostgreSQL, and immersive modern web applications.",
  keywords: "Iklash Ahamed, Full Stack Developer, MERN Stack, Next.js, React, AI Projects, LangChain, TypeScript, PostgreSQL",
};

type MediaType = "image" | "youtube";
type Project = {
  id: number; title: string; description: string;
  media: { type: MediaType; src: string; thumbnail?: string };
  tags: string[]; link: string; github: string;
};

const extractYouTubeId = (url: string): string => {
  if (url.includes("youtu.be")) return url.split("/").pop() || "";
  const m = url.match(/[?&]v=([^&]+)/);
  if (m) return m[1];
  const em = url.match(/youtube\.com\/embed\/([^/?]+)/);
  if (em) return em[1];
  return url;
};

const projects: Project[] = [
  { id: 1, title: "Unitoids", description: "An AI-powered freelancing platform connecting clients and freelancers with smart recommendations, secure authentication, and intelligent chatbot assistance.", media: { type: "image", src: "/projects/unitoids.png" }, tags: ["MongoDB","Express.js","React.js","Node.js","Clerk","LangChain","FAISS"], link: "https://unitoids.vercel.app/", github: "https://github.com/Ahamedin/Unitoids.git" },
  { id: 2, title: "LinkED", description: "An AI-powered career platform that helps users generate resumes, cover letters, interview preparation content, and connect with mentors.", media: { type: "image", src: "/projects/linkED.png" }, tags: ["Next.js","React","Node.js","Clerk","PostgreSQL","Gemini AI"], link: "https://link-ed-nine.vercel.app", github: "https://github.com/Ahamedin/LinkED" },
  { id: 3, title: "Smart Bus Tracking", description: "A real-time smart bus management system that tracks student locations, monitors seat availability, and integrates IoT hardware sensors.", media: { type: "image", src: "/projects/busapp.png" }, tags: ["React.js","Node.js","IoT","GPS","REST API"], link: "", github: "https://github.com/Ahamedin/Bus-app" },
  { id: 4, title: "AR/VR Training Institute", description: "An immersive 3D AR/VR training institute website built with modern frontend technologies featuring interactive experiences and animated UI.", media: { type: "image", src: "/projects/arvrweb.png" }, tags: ["Next.js","Three.js","React Three Fiber","Framer Motion"], link: "https://arvr-web.vercel.app/", github: "https://github.com/Ahamedin/ARVR-Web.git" },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const cardVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } } };

export default function Projects() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  type AnimeLayout = {
    update: (callback: () => void) => void;
    revert: () => void;
  };
  const layoutRef = useRef<AnimeLayout | null>(null);

  useEffect(() => {
    let disposed = false;
    async function initLayout() {
      try {
        const { createLayout } = await import("animejs/layout");
        if (disposed || !dialogRef.current) return;
        layoutRef.current = createLayout(dialogRef.current, { children: [".item","h2",".item-tags",".item-media"], properties: ["--overlay-alpha"] });
      } catch (err) { console.warn("animejs layout init failed:", err); }
    }
    initLayout();
    return () => { disposed = true; layoutRef.current?.revert?.(); };
  }, []);

  useEffect(() => {
    const sd = { "@context": "https://schema.org", "@type": "ProfilePage", name: SEO.title, description: SEO.description, mainEntity: { "@type": "Person", name: "Iklash Ahamed", jobTitle: "Full Stack Developer", url: "https://github.com/Ahamedin" } };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.text = JSON.stringify(sd);
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  const closeModal = useCallback(() => {
    const dialog = dialogRef.current; if (!dialog) return;
    const openItem = document.querySelector("#projects-grid .item.is-open") as HTMLElement | null;
    if (layoutRef.current) { layoutRef.current.update(() => { dialog.close(); openItem?.classList.remove("is-open"); openItem?.focus(); }); }
    else { dialog.close(); openItem?.classList.remove("is-open"); }
    document.body.style.overflow = "auto";
  }, []);

  const openModal = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const dialog = dialogRef.current; if (!dialog) return;
    if ((e.target as HTMLElement).closest("a")) return;
    const item = (e.currentTarget as HTMLElement).closest(".item") as HTMLElement; if (!item) return;
    const clone = item.cloneNode(true) as HTMLElement;
    dialog.innerHTML = ""; dialog.appendChild(clone);
    const ytMedia = clone.querySelector(".item-media[data-youtube-id]") as HTMLElement | null;
    if (ytMedia) { const ytId = ytMedia.getAttribute("data-youtube-id"); if (ytId) { ytMedia.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0&loop=1&playlist=${ytId}" class="item-media-iframe" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`; } }
    if (layoutRef.current) { layoutRef.current.update(() => { dialog.showModal(); item.classList.add("is-open"); }); }
    else { dialog.showModal(); item.classList.add("is-open"); }
    document.body.style.overflow = "hidden";
  }, [closeModal]);

  useEffect(() => {
    const dialog = dialogRef.current; if (!dialog) return;
    const onCancel = (e: Event) => { e.preventDefault(); closeModal(); };
    const onClick = (e: MouseEvent) => { const t = e.target as HTMLElement; if (t === dialog || t.closest(".dialog-close-btn")) closeModal(); };
    dialog.addEventListener("cancel", onCancel); dialog.addEventListener("click", onClick);
    return () => { dialog.removeEventListener("cancel", onCancel); dialog.removeEventListener("click", onClick); };
  }, [closeModal]);

  return (
    <>
      <Head>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
      </Head>

      <div id="projects-page" className="min-h-screen w-full relative z-10" style={{ background: B }}>
        <div className="absolute inset-0 pointer-events-none grid-bg" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,224,52,0.4)", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)", display: "inline-block" }} />
              Selected Work
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: Y, marginBottom: "56px" }}>
            Projects
          </motion.h1>

          <motion.div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" variants={containerVariants} initial="hidden" animate="show">
            {projects.map((project) => {
              const ytId = project.media.type === "youtube" ? extractYouTubeId(project.media.src) : undefined;
              return (
                <motion.div key={project.id} variants={cardVariants}>
                  <button type="button" className="item" data-layout-id={`project-${project.id}`} onClick={openModal} style={{ width: "100%", textAlign: "left" }}>
                    <span className="dialog-close-btn" aria-label="Close">✕</span>
                    <div className="item-media" data-layout-id={`media-${project.id}`} {...(ytId ? { "data-youtube-id": ytId } : {})}>
                      <img src={project.media.type === "youtube" ? project.media.thumbnail : project.media.src} alt={project.title} className="item-media-img" loading="lazy" />
                    </div>
                    <div className="item-content">
                      <h2 data-layout-id={`title-${project.id}`}>{project.title}</h2>
                      <div className="item-tags" data-layout-id={`tags-${project.id}`}>
                        {project.tags.map((tag) => <span key={tag} className="item-tag">{tag}</span>)}
                      </div>
                      <p className="item-description">{project.description}</p>
                      <div className="item-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="item-link item-link-github" onClick={(e) => e.stopPropagation()}>
                          <FiGithub className="w-4 h-4" /> View Source
                        </a>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="item-link item-link-live" onClick={(e) => e.stopPropagation()}>
                            <FiExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-16 flex items-center gap-4">
            <div style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)" }} />
            <a href="https://github.com/Ahamedin" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,224,52,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = Y)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,224,52,0.5)")}>
              <FiGithub size={14} /> See more on GitHub
            </a>
          </motion.div>
        </div>
      </div>
      <dialog ref={dialogRef} id="layout-dialog" />
    </>
  );
}