"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";
import {
  Send, Sparkles, Mail, FileText,
  LayoutTemplate, User, MessageSquare,
  CheckCircle, XCircle,
} from "lucide-react";
import { emailTemplates } from "@/components/tools/emailTemplates";
import { TextGenerationEffect } from "@/components/ui/TextGenerationEffect";
import { ChatHistory } from "@/components/contact/ChatHistory";

const Y = "#FFE034";
const B = "#0D0D0D";

interface EmailMessage {
  id: string; content: string; subject: string;
  senderName?: string; senderEmail?: string;
  timestamp: number; mode: "manual" | "ai";
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "#181818",
  border: "1.5px solid rgba(255,224,52,0.15)",
  borderRadius: 0,
  padding: "10px 14px",
  fontSize: "13px",
  color: "rgba(240,234,214,0.9)",
  fontFamily: "'JetBrains Mono', monospace",
  outline: "none",
  transition: "border-color 0.2s",
};

export default function Contact() {
  const [mode, setMode]                   = useState<"manual"|"ai">("ai");
  const [prompt, setPrompt]               = useState("");
  const [emailContent, setEmailContent]   = useState("");
  const [senderName, setSenderName]       = useState("");
  const [senderEmail, setSenderEmail]     = useState("");
  const [subject, setSubject]             = useState("");
  const [isGenerating, setIsGenerating]   = useState(false);
  const [isSending, setIsSending]         = useState(false);
  const [status, setStatus]               = useState<"idle"|"success"|"error">("idle");
  const [errorMessage, setErrorMessage]   = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number|null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen]       = useState(false);
  const [newEmail, setNewEmail]           = useState<EmailMessage|undefined>(undefined);
  const [messageCount, setMessageCount]   = useState(0);

  useEffect(() => {
    if (status === "error" || status === "success") {
      setIslandExpanded(true);
      const t = setTimeout(() => {
        setIslandExpanded(false);
        setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 500);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleGenerateEmail = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true); setEmailContent(""); setIsTextAnimating(false);
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Failed to generate email");
      const { generatedContent } = await res.json();
      setEmailContent(generatedContent); setIsTextAnimating(true);
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Failed to generate email");
    } finally { setIsGenerating(false); }
  };

  const handleSendEmail = async () => {
    if (!emailContent || isSending) return;
    if (mode === "manual") {
      if (!senderName.trim()) { setStatus("error"); setErrorMessage("Please enter your name"); return; }
      if (!senderEmail.trim()) { setStatus("error"); setErrorMessage("Please enter your email"); return; }
      if (!subject.trim()) { setStatus("error"); setErrorMessage("Please enter a subject"); return; }
    }
    setIsSending(true); setStatus("idle"); setErrorMessage("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: emailContent, prompt: mode === "ai" ? prompt : "Manual Email", senderName: mode === "manual" ? senderName : undefined, senderEmail: mode === "manual" ? senderEmail : undefined, subject }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      setNewEmail({ id: Date.now().toString(), content: emailContent, subject: subject || "No Subject", senderName: mode === "manual" ? senderName : undefined, senderEmail: mode === "manual" ? senderEmail : undefined, timestamp: Date.now(), mode });
      setIsChatOpen(true); setStatus("success");
      setPrompt(""); setEmailContent(""); setSenderName(""); setSenderEmail(""); setSubject("");
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Failed to send email");
    } finally { setIsSending(false); }
  };

  type BtnPrimaryProps = {
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
  };

  const BtnPrimary = ({ onClick, disabled, children }: BtnPrimaryProps) => (
    <button
      onClick={onClick} disabled={disabled}
      style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "11px",
        letterSpacing: "0.12em", textTransform: "uppercase",
        padding: "9px 20px",
        background: disabled ? "#222" : Y,
        color: disabled ? "#555" : B,
        border: "none", borderRadius: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex", alignItems: "center", gap: "6px",
        transition: "opacity 0.15s",
      }}
      onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen w-full relative" style={{ background: "#111111" }}>
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      {/* Toast island */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ width: "120px", height: "40px", y: -100, x: "-50%", borderRadius: "20px", opacity: 0 }}
            animate={{ width: islandExpanded ? "300px" : "120px", height: islandExpanded ? "56px" : "40px", y: islandExpanded ? 30 : 20, x: "-50%", borderRadius: 0, opacity: 1 }}
            exit={{ width: "120px", height: "40px", y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`fixed top-0 left-1/2 z-[60] flex items-center justify-center ${status === "success" ? "bg-[#0D0D0D]" : "bg-[#0D0D0D]"}`}
            style={{ border: `1.5px solid ${status === "success" ? "rgba(255,224,52,0.4)" : "rgba(220,38,38,0.5)"}` }}
          >
            <AnimatePresence>
              {islandExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 px-4">
                  {status === "success"
                    ? <><CheckCircle size={16} color={Y} /><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: Y }}>Email sent!</span></>
                    : <><XCircle size={16} color="#ef4444" /><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#ef4444" }}>{errorMessage}</span></>
                  }
                </motion.div>
              )}
              {!islandExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {status === "success" ? <CheckCircle size={16} color={Y} /> : <XCircle size={16} color="#ef4444" />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative z-10 transition-all duration-300 ${isChatOpen ? "md:mr-[400px]" : ""}`}>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,224,52,0.4)", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "32px", height: "1px", background: "rgba(255,224,52,0.3)", display: "inline-block" }} />
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: Y, marginBottom: "12px" }}
          >
            Let&apos;s Build<br />Something Amazing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
            style={{ fontFamily: "'Inter', system-ui", fontSize: "15px", color: "rgba(240,234,214,0.5)", marginBottom: "40px", maxWidth: "500px", lineHeight: 1.7 }}
          >
            Open to SDE internships, freelance projects, startup collaborations, and innovative tech opportunities.
          </motion.p>

          {/* Mode toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="flex gap-2 mb-10">
            {(["ai","manual"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setShowTemplates(false); }}
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "11px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "9px 20px", borderRadius: 0,
                  background: mode === m ? Y : "transparent",
                  color: mode === m ? B : "rgba(240,234,214,0.5)",
                  border: `1.5px solid ${mode === m ? Y : "rgba(255,224,52,0.15)"}`,
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  transition: "all 0.15s",
                }}
              >
                {m === "ai" ? <><Sparkles size={12} />AI Assistant</> : <><FileText size={12} />Manual</>}
              </button>
            ))}
          </motion.div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}>
              {mode === "ai" ? (
                <div style={{ background: "#181818", border: "1.5px solid rgba(255,224,52,0.12)", padding: "20px" }}>
                  <div className="flex justify-between items-center mb-4">
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(240,234,214,0.8)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: Y }}>💭</span> Prompt
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.08em", padding: "6px 12px", background: "rgba(255,224,52,0.06)", color: "rgba(255,224,52,0.7)", border: "1px solid rgba(255,224,52,0.15)", borderRadius: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        <LayoutTemplate size={11} /> Templates
                      </button>
                      <BtnPrimary onClick={handleGenerateEmail} disabled={isGenerating || !prompt.trim()}>
                        {isGenerating ? "…" : <><Sparkles size={11} />Generate</>}
                      </BtnPrimary>
                    </div>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your collaboration idea or opportunity…"
                    style={{ ...fieldStyle, height: "320px", resize: "none", display: "block" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,224,52,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,224,52,0.15)")}
                  />
                  {/* Templates overlay */}
                  <AnimatePresence>
                    {showTemplates && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 overflow-auto flex flex-col"
                        style={{ background: "#111", border: "1.5px solid rgba(255,224,52,0.18)", padding: "20px" }}
                      >
                        <div className="flex justify-between items-center mb-5">
                          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px", color: "rgba(240,234,214,0.9)" }}>Templates</span>
                          <button onClick={() => setShowTemplates(false)} style={{ color: "rgba(255,224,52,0.5)", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>✕</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {emailTemplates.map((t, i) => (
                            <button
                              key={i}
                              onClick={() => { setSelectedTemplate(i); setPrompt(t.prompt); setShowTemplates(false); }}
                              style={{
                                background: selectedTemplate === i ? "rgba(255,224,52,0.1)" : "#181818",
                                border: `1.5px solid ${selectedTemplate === i ? Y : "rgba(255,224,52,0.15)"}`,
                                padding: "16px", cursor: "pointer", textAlign: "center" as const,
                                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                              }}
                            >
                              <span style={{ fontSize: "24px" }}>{t.icon}</span>
                              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "12px", color: "rgba(240,234,214,0.9)" }}>{t.title}</span>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,224,52,0.5)", padding: "3px 8px", border: "1px solid rgba(255,224,52,0.15)" }}>{t.tags[0]}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div style={{ background: "#181818", border: "1.5px solid rgba(255,224,52,0.12)", padding: "20px" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(240,234,214,0.8)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <User size={14} style={{ color: Y }} /> Your Details
                  </span>
                  <div className="space-y-3">
                    {[
                      { id: "name",    label: "Your Name *",  value: senderName,  set: setSenderName,  type: "text",  placeholder: "Your Name" },
                      { id: "email",   label: "Your Email *", value: senderEmail, set: setSenderEmail, type: "email", placeholder: "your@email.com" },
                      { id: "subject", label: "Subject *",    value: subject,     set: setSubject,     type: "text",  placeholder: "Project Collaboration / Hiring" },
                    ].map((f) => (
                      <div key={f.id}>
                        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,224,52,0.45)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{f.label}</label>
                        <input type={f.type} value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} style={fieldStyle}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(255,224,52,0.4)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,224,52,0.15)")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 }}>
              <div style={{ background: "#181818", border: "1.5px solid rgba(255,224,52,0.12)", padding: "20px" }}>
                <div className="flex justify-between items-center mb-4">
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(240,234,214,0.8)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: Y }}>📧</span> {mode === "ai" ? "AI Generated" : "Compose"}
                  </span>
                  <div className="flex gap-2 items-center">
                    {messageCount > 0 && (
                      <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", padding: "6px 12px", background: "rgba(255,224,52,0.06)", color: "rgba(255,224,52,0.7)", border: "1px solid rgba(255,224,52,0.15)", borderRadius: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", position: "relative" }}
                      >
                        <MessageSquare size={11} />
                        History
                        <span style={{ position: "absolute", top: -6, right: -6, background: Y, color: B, borderRadius: 0, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{messageCount}</span>
                      </button>
                    )}
                    {(emailContent || (mode === "manual" && senderEmail)) && (
                      <BtnPrimary onClick={handleSendEmail} disabled={isSending}>
                        {isSending ? "…" : <><Send size={11} />Send</>}
                      </BtnPrimary>
                    )}
                  </div>
                </div>

                <div style={{ height: "320px", background: "#131313", border: "1px solid rgba(255,224,52,0.08)", position: "relative", overflow: "hidden" }}>
                  {mode === "ai" ? (
                    <div className="absolute inset-0 overflow-auto" style={{ padding: "12px" }}>
                      {emailContent ? (
                        isTextAnimating
                          ? <TextGenerationEffect text={emailContent} className="text-sm" speed="fast" onComplete={() => setIsTextAnimating(false)} />
                          : <textarea value={emailContent} onChange={(e) => setEmailContent(e.target.value)} className="absolute inset-0 w-full h-full bg-transparent resize-none border-none focus:ring-0" style={{ padding: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "rgba(240,234,214,0.8)", outline: "none" }} />
                      ) : (
                        <div className="flex items-center justify-center h-full flex-col gap-3" style={{ color: "rgba(255,224,52,0.25)" }}>
                          <Sparkles size={20} />
                          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", textAlign: "center", letterSpacing: "0.04em" }}>
                            Describe your idea and let AI draft the email
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <textarea value={emailContent} onChange={(e) => setEmailContent(e.target.value)} placeholder="Write your message…" className="absolute inset-0 w-full h-full bg-transparent resize-none border-none focus:ring-0" style={{ padding: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "rgba(240,234,214,0.8)", outline: "none" }} />
                  )}
                </div>
                {mode === "ai" && (
                  <div className="mt-2 flex justify-end">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,224,52,0.3)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Sparkles size={10} /> AI Powered
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ChatHistory isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} newEmail={newEmail} onMessageCountChange={setMessageCount} />
    </div>
  );
}