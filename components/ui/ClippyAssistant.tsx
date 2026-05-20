"use client";

import { useEffect, useRef } from "react";
import { IklashAvatar } from "./IklashAvatar";

interface ClippyAssistantProps {
    onClick: () => void;
    isChatOpen: boolean;
    isInputVisible: boolean;
    isLoading: boolean;
}

/**
 * Loads an ES module from a URL using `new Function` to completely
 * bypass webpack's static analysis of `import()` expressions.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dynamicImportFromCDN(url: string): Promise<any> {
    const importFn = new Function("url", "return import(url)");
    return importFn(url);
}

const CDN_BASE = "https://cdn.jsdelivr.net/npm/clippyjs/dist";

// Animations Clippy plays when clicked (randomly picked)
const CLICK_ANIMATIONS = [
    "Wave",
    "GetAttention",
    "Congratulate",
    "Explain",
    "GestureUp",
    "GetTechy",
    "LookRight",
];

// Phrases Clippy says when opening the chat
const OPEN_CHAT_PHRASES = [
    "Let's chat! Ask me anything about Iklash! 💬",
    "I'm here to help! What would you like to know? 🤔",
    "Ready to assist! Fire away with your questions! 🔥",
    "Hey there! Let's explore Iklash's work together! 🚀",
    "At your service! What's on your mind? 📎",
];

// Phrases Clippy says when closing the chat
const CLOSE_CHAT_PHRASES = [
    "See you later! Click me anytime! 👋",
    "Come back soon! I'll be waiting right here 📎",
    "Bye for now! I'll keep animating while you scroll 😄",
];

// Phrases for idle clicks (when chat is neither opening nor closing)
const IDLE_CLICK_PHRASES = [
    "Click me to open the AI chat! 💬",
    "Want to know something? Let's chat! 🧠",
    "I know a lot about Iklash! Try me! 😎",
    "Psst... I can answer questions about this portfolio! 📎",
    "Need help? That's literally what I'm here for! 🎯",
];

// Idle animations that play periodically
const IDLE_ANIMATIONS = [
    "IdleRopePile",
    "IdleAtom",
    "Idle1_1",
    "IdleEyeBrowRaise",
    "IdleFingerTap",
    "IdleHeadScratch",
    "IdleSideToSide",
    "IdleSnooze",
    "Thinking",
    "LookRight",
    "LookLeft",
    "LookUp",
    "LookDown",
    "Explain",
    "Writing",
    "CheckingSomething",
    "GetArtsy",
    "GetWizardy",
    "Hearing_1",
    "Wave",
    "GestureRight",
];

function randomPick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const ClippyAssistant: React.FC<ClippyAssistantProps> = ({
    onClick,
    isChatOpen,
    isInputVisible,
    isLoading,
}) => {
    // Render a simple clickable avatar positioned bottom-right.
    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 60 }}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                aria-label="Open AI chat"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
                <IklashAvatar size={68} variant={isLoading ? "loading" : isChatOpen ? "speaking" : "default"} badge="ME" animated />
            </button>
        </div>
    );
};

export default ClippyAssistant;
