"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { IoClose, IoSend } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { predefinedPrompts } from "@/data/prompt-data";
import {
  HeaderProps,
  MessageDisplayProps,
  InputAreaProps,
  Message,
  StructuredContent,
} from "./types";
import {
  SkillsCard,
  ProjectsCard,
  ExperienceCard,
  ContactCard,
  LinkCard,
} from "../ai-chat-cards";
import { IklashAvatar } from "../../ui/IklashAvatar";

const Y = "#FFE034";
const B = "#0D0D0D";

/* ── CHAT HEADER ── */
export const ChatHeader: React.FC<HeaderProps> = ({ onClose }) => (
  <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <IklashAvatar size={40} variant="default" badge="AI" />
      <div>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "13px", color: Y, letterSpacing: "-0.01em", lineHeight: 1 }}>
          Iklash AI
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(255,224,52,0.35)", textTransform: "uppercase", marginTop: "2px" }}>
          Ask me anything
        </p>
      </div>
    </div>
    {onClose && (
      <button
        onClick={onClose}
        style={{ color: "rgba(255,224,52,0.4)", background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", alignItems: "center", transition: "color 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = Y)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,224,52,0.4)")}
      >
        <IoClose size={18} />
      </button>
    )}
  </div>
);

/* ── MESSAGE DISPLAY ── */
export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  messages,
  isSearching,
  error,
  renderStructuredContent,
  messagesEndRef,
}) => (
  <div className="h-full overflow-y-auto overflow-x-hidden p-3 sm:p-4 pb-28 sm:pb-32 space-y-4 sm:space-y-5 scrollbar-hide touch-pan-y">
    <AnimatePresence initial={false}>
      {error ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)", padding: "12px 16px", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }}
        />
      ) : (
        messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} group`}
          >
            {/* Avatar — AI side */}
            {message.type === "assistant" && (
              <div className="mr-2 sm:mr-3 flex-shrink-0 mt-1">
                <IklashAvatar
                  size={28}
                  variant={
                    index === messages.length - 1 && message.content === "..."
                      ? isSearching ? "thinking" : "thinking"
                      : "default"
                  }
                  animated
                />
              </div>
            )}

            {/* Bubble */}
            <div
              className="max-w-[88%] sm:max-w-[84%] relative"
              style={{
                background:
                  message.type === "user"
                    ? "rgba(255,224,52,0.1)"
                    : "#1A1A1A",
                border: `1px solid ${message.type === "user" ? "rgba(255,224,52,0.25)" : "rgba(255,224,52,0.1)"}`,
                padding: "10px 14px",
                borderRadius: 0,
              }}
            >
              {message.type === "assistant" &&
              index === messages.length - 1 &&
              message.content === "..." ? (
                isSearching ? <SearchingIndicator /> : <ThinkingIndicator />
              ) : (
                <MessageContent message={message} renderStructuredContent={renderStructuredContent} />
              )}
              <div
                className="mt-1 text-right opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(255,224,52,0.25)", letterSpacing: "0.06em" }}
              >
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>

            {/* User avatar */}
            {message.type === "user" && (
              <div
                className="ml-2 sm:ml-3 flex-shrink-0 mt-1 flex items-center justify-center"
                style={{ width: 28, height: 28, background: Y, flexShrink: 0 }}
              >
                <FaUser size={13} color={B} />
              </div>
            )}
          </motion.div>
        ))
      )}
      {messagesEndRef && <div ref={messagesEndRef} />}
    </AnimatePresence>
  </div>
);

/* ── MESSAGE CONTENT ── */
const MessageContent: React.FC<{
  message: Message;
  renderStructuredContent: (c: StructuredContent) => React.ReactNode;
}> = ({ message, renderStructuredContent }) => (
  <>
    {message.content?.trim() && (
      <div
        className="prose prose-invert prose-sm max-w-none leading-relaxed"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "13px", color: "rgba(240,234,214,0.85)" }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(message.content).toString()),
        }}
      />
    )}
    {message.content?.trim() && message.structuredContent && (
      <div style={{ margin: "12px 0", borderTop: "1px solid rgba(255,224,52,0.1)" }} />
    )}
    {message.structuredContent && renderStructuredContent(message.structuredContent)}
  </>
);

/* ── SEARCHING INDICATOR ── */
const SearchingIndicator: React.FC = () => (
  <div
    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 12px", background: "rgba(255,224,52,0.06)", border: "1px solid rgba(255,224,52,0.18)" }}
  >
    <FiSearch size={12} style={{ color: Y, animation: "pulse 1.5s infinite" }} />
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,224,52,0.7)" }}>
      Searching…
    </span>
  </div>
);

/* ── THINKING INDICATOR ── */
const ThinkingIndicator: React.FC = () => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(255,224,52,0.04)", border: "1px solid rgba(255,224,52,0.12)" }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,224,52,0.55)", marginRight: "4px" }}>
      Thinking
    </span>
    {[0, 150, 300].map((d, i) => (
      <span
        key={i}
        style={{ display: "inline-block", width: 5, height: 5, background: Y, animation: `bounce 0.6s ${d}ms infinite` }}
      />
    ))}
  </div>
);

/* ── INPUT AREA ── */
export const InputArea: React.FC<InputAreaProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit,
  handleKeyDown,
  inputRef,
  isThemeRequest,
}) => {
  const [promptsOpen, setPromptsOpen] = useState(false);

  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const isTheme = isThemeRequest?.(input) ?? false;

  return (
    <div
      className="flex-shrink-0 flex justify-center items-end"
      style={{ padding: "16px 24px 20px" }}
    >
      <div className="w-full max-w-3xl relative flex items-center gap-3">

        {/* Prompt suggestions panel */}
        <AnimatePresence>
          {promptsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scaleY: 0.94 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: 8, scaleY: 0.96 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 12px)",
                left: 0,
                width: 300,
                background: B,
                border: "1.5px solid rgba(255,224,52,0.2)",
                padding: "16px",
                zIndex: 20,
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                transformOrigin: "bottom left",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,224,52,0.4)" }}>
                  Suggestions
                </span>
                <button onClick={() => setPromptsOpen(false)} style={{ color: "rgba(255,224,52,0.4)", background: "none", border: "none", cursor: "pointer" }}>
                  <IoClose size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {predefinedPrompts.slice(0, 8).map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(`${p.prefix} ${p.prompt}`); setPromptsOpen(false); inputRef.current?.focus(); }}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.04em",
                      padding: "5px 10px",
                      background: "rgba(255,224,52,0.05)",
                      color: "rgba(255,224,52,0.7)",
                      border: "1px solid rgba(255,224,52,0.14)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,224,52,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,224,52,0.05)")}
                  >
                    {p.prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side buttons */}
        <div className="flex flex-col gap-2">
          {/* Suggestions */}
          <button
            type="button"
            onClick={() => setPromptsOpen(!promptsOpen)}
            title="Suggestions"
            style={{
              width: 36, height: 36,
              background: promptsOpen ? Y : "rgba(255,224,52,0.07)",
              color: promptsOpen ? B : "rgba(255,224,52,0.55)",
              border: `1.5px solid ${promptsOpen ? Y : "rgba(255,224,52,0.18)"}`,
              borderRadius: 0,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="0" ry="0" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            title="Toggle Theme Mode"
            onClick={() => {
              const cleaned = input.replace(/^(theme:|search:)\s*/i, "").trim();
              setInput(isTheme ? cleaned : `Theme: ${cleaned}`);
              inputRef.current?.focus();
            }}
            style={{
              width: 36, height: 36,
              background: isTheme ? Y : "rgba(255,224,52,0.07)",
              color: isTheme ? B : "rgba(255,224,52,0.55)",
              border: `1.5px solid ${isTheme ? Y : "rgba(255,224,52,0.18)"}`,
              borderRadius: 0,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px",
              transition: "all 0.15s",
            }}
          >
            🎨
          </button>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <div
            style={{
              display: "flex", alignItems: "center",
              background: "#181818",
              border: `1.5px solid ${isTheme ? Y : "rgba(255,224,52,0.2)"}`,
              height: 52,
              transition: "border-color 0.2s",
            }}
          >
            {/* Avatar inside input */}
            <div className="flex-shrink-0 pl-3 pr-1">
              <IklashAvatar
                size={32}
                variant={isLoading ? "loading" : "default"}
                animated={isLoading}
              />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTheme ? "Describe theme changes…" : "Ask me anything about Iklash…"}
              disabled={isLoading}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.04em",
                color: "rgba(240,234,214,0.9)",
                padding: "0 12px",
                caretColor: Y,
                height: "100%",
              }}
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              style={{
                width: 52, height: "100%",
                flexShrink: 0,
                background: input.trim() && !isLoading ? Y : "transparent",
                color: input.trim() && !isLoading ? B : "rgba(255,224,52,0.2)",
                border: "none",
                borderLeft: "1.5px solid rgba(255,224,52,0.15)",
                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {isLoading
                ? <CgSpinner size={16} style={{ animation: "spin 1s linear infinite" }} />
                : <IoSend size={15} />
              }
            </button>
          </div>

          {/* Hint */}
          <div className="absolute top-full mt-2 left-0 right-0 text-center pointer-events-none">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", color: "rgba(255,224,52,0.2)" }}>
              Enter to send · Esc to close
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};