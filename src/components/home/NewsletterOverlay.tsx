"use client";

import { FormEvent, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type OverlayState = "idle" | "invalid" | "success";

const NEWSLETTER_STORAGE_KEY = "mwm_newsletter_interest";

export function NewsletterOverlay() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [state, setState] = useState<OverlayState>("idle");

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsVisible(true);
            trackEvent("newsletter_overlay_opened", { location: "global_overlay" });
        }, 2300);

        return () => window.clearTimeout(timer);
    }, []);

    const closeOverlay = () => {
        setIsVisible(false);
        trackEvent("newsletter_overlay_closed", { location: "global_overlay" });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const normalizedEmail = email.trim().toLowerCase();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
        if (!isValidEmail) {
            setState("invalid");
            return;
        }

        if (typeof window !== "undefined") {
            try {
                const stored = window.localStorage.getItem(NEWSLETTER_STORAGE_KEY);
                const parsed = stored ? (JSON.parse(stored) as string[]) : [];
                if (!parsed.includes(normalizedEmail)) {
                    window.localStorage.setItem(
                        NEWSLETTER_STORAGE_KEY,
                        JSON.stringify([...parsed, normalizedEmail])
                    );
                }
            } catch {
                // Ignore storage parsing errors and continue with UX feedback.
            }
        }

        setState("success");
        setEmail("");
        trackEvent("newsletter_signup", { location: "overlay" });
        window.setTimeout(() => closeOverlay(), 1400);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-[rgba(7,7,11,0.72)] px-4 pb-4 pt-20 backdrop-blur-[6px]"
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter signup"
        >
            <div
                className="relative h-[min(78vh,690px)] w-full max-w-6xl overflow-hidden rounded-3xl border"
                style={{
                    borderColor: "rgba(201,169,110,0.28)",
                    background: "rgba(7,7,11,0.95)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.52)",
                    animation: "fade-up 0.8s ease-out both",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(120deg, rgba(7,7,11,0.88), rgba(7,7,11,0.45) 44%, rgba(7,7,11,0.9)), url('/consultation-card.svg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div
                    className="pointer-events-none absolute -left-14 top-8 h-60 w-60 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(201,169,110,0.26), rgba(201,169,110,0))",
                        animation: "float-slow 11s ease-in-out infinite",
                    }}
                />
                <div
                    className="pointer-events-none absolute -right-16 bottom-6 h-72 w-72 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(70,90,160,0.28), rgba(70,90,160,0))",
                        animation: "float-slow 14s ease-in-out infinite reverse",
                    }}
                />

                <button
                    type="button"
                    onClick={closeOverlay}
                    className="absolute right-4 top-4 z-20 rounded-full px-3 py-2 text-[0.65rem] uppercase tracking-[0.14em]"
                    style={{
                        border: "1px solid rgba(201,169,110,0.24)",
                        background: "rgba(7,7,11,0.72)",
                        color: "var(--gold-300)",
                    }}
                    aria-label="Close newsletter popup"
                >
                    Close
                </button>

                <div className="relative z-10 grid h-full gap-8 p-6 md:grid-cols-[1.08fr_0.92fr] md:p-12">
                    <div className="flex flex-col justify-center">
                        <p className="eyebrow mb-5">Newsletter</p>
                        <h3 className="font-display text-4xl font-light leading-tight md:text-[3.6rem]">
                            Miami <span className="text-gradient-gold">Glow Updates</span>
                        </h3>
                        <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            Exclusive treatment drops, limited-time bundles, and wellness tips from our Miami team.
                        </p>
                        <p className="mt-4 text-xs uppercase tracking-[0.14em]" style={{ color: "var(--gold-300)" }}>
                            Slow reveal popup - closes anytime
                        </p>
                    </div>

                    <div
                        className="glass-card self-center rounded-3xl p-6 md:p-8"
                        style={{
                            border: "1px solid rgba(201,169,110,0.28)",
                            background: "rgba(7,7,11,0.76)",
                            backdropFilter: "blur(14px)",
                        }}
                    >
                        <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "var(--gold-400)" }}>
                            Join the list
                        </p>
                        <h4 className="mt-2 font-display text-2xl font-light">
                            Get first access to new offers
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            Enter your best email and we will send occasional updates.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    if (state !== "idle") setState("idle");
                                }}
                                placeholder="Enter your email"
                                className="h-12 w-full rounded-full px-5 text-sm outline-none"
                                style={{
                                    border: "1px solid rgba(201,169,110,0.3)",
                                    background: "rgba(7,7,11,0.86)",
                                    color: "var(--text-primary)",
                                }}
                            />
                            <button type="submit" className="btn-gold w-full justify-center">
                                Subscribe
                            </button>
                        </form>

                        <p className="mt-3 text-xs uppercase tracking-[0.11em]" style={{ color: "var(--text-muted)" }}>
                            {state === "success" && "Thanks, you're subscribed."}
                            {state === "invalid" && "Please enter a valid email address."}
                            {state === "idle" && "No spam. Unsubscribe anytime."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
