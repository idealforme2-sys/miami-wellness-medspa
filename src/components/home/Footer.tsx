"use client";

import { FormEvent, useState } from "react";
import { SiteSettings } from "@/types/site";
import { trackBookingStart, trackCtaClick, trackEvent } from "@/lib/analytics";

interface FooterProps {
    settings: SiteSettings;
}

type NewsletterState = "idle" | "invalid" | "success";

export function Footer({ settings }: FooterProps) {
    const [email, setEmail] = useState("");
    const [newsletterState, setNewsletterState] = useState<NewsletterState>("idle");
    const facebookUrl =
        settings.facebookUrl ||
        "https://web.facebook.com/people/MIAMI-Wellness-MedSpa/100091332498347/";

    const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const normalizedEmail = email.trim().toLowerCase();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

        if (!isValidEmail) {
            setNewsletterState("invalid");
            return;
        }

        if (typeof window !== "undefined") {
            try {
                const key = "mwm_newsletter_interest";
                const stored = window.localStorage.getItem(key);
                const parsed = stored ? (JSON.parse(stored) as string[]) : [];
                if (!parsed.includes(normalizedEmail)) {
                    window.localStorage.setItem(key, JSON.stringify([...parsed, normalizedEmail]));
                }
            } catch {
                // Ignore storage errors; we still show success feedback to the visitor.
            }
        }

        setNewsletterState("success");
        setEmail("");
        trackEvent("newsletter_signup", { location: "footer" });
    };

    return (
        <footer
            className="relative -mt-4 md:-mt-6"
            style={{
                borderTop: "1px solid rgba(201,169,110,0.08)",
                background: "linear-gradient(180deg, rgba(7,7,11,0) 0%, rgba(7,7,11,1) 100%)",
            }}
        >
            <div className="mx-auto max-w-[1380px] px-6 pb-7 pt-5 md:px-10 md:pb-8 md:pt-5">
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <p className="text-gradient-gold font-display text-3xl font-light">
                                {settings.siteName}
                            </p>
                            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                                {settings.cityStateZip}
                            </p>
                            <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                                {settings.brandTagline}
                            </p>
                        </div>

                        <div className="flex w-full flex-wrap gap-3 md:w-auto">
                            <a
                                href="#book"
                                className="btn-gold w-full justify-center !text-[0.6rem] sm:w-auto"
                                onClick={() => {
                                    trackCtaClick({ location: "footer", ctaType: "booking", serviceContext: "general" });
                                    trackBookingStart({ entryPoint: "footer", serviceContext: "general" });
                                }}
                            >
                                {settings.booking.ctaLabel}
                            </a>
                            <a
                                href={settings.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline w-full justify-center !text-[0.6rem] sm:w-auto"
                                onClick={() => {
                                    trackCtaClick({ location: "footer", ctaType: "social", serviceContext: "instagram" });
                                }}
                            >
                                Instagram
                            </a>
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline w-full justify-center !text-[0.6rem] sm:w-auto"
                                onClick={() => {
                                    trackCtaClick({ location: "footer", ctaType: "social", serviceContext: "facebook" });
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M13.5 8.7V6.9c0-.8.5-1.1 1.2-1.1h1.8V3h-2.5c-2.7 0-3.8 1.5-3.8 3.9v1.8H8v2.9h2.2V21h3.3v-9.4h2.4l.4-2.9h-2.8z" />
                                </svg>
                                Facebook
                            </a>
                        </div>
                    </div>

                    <div
                        className="glass-card rounded-3xl p-6"
                        style={{
                            border: "1px solid rgba(201,169,110,0.16)",
                            background:
                                "linear-gradient(130deg, rgba(201,169,110,0.14), rgba(255,255,255,0.03) 45%, rgba(7,7,11,0.82) 100%)",
                        }}
                    >
                        <p className="eyebrow mb-3">Newsletter</p>
                        <h3 className="font-display text-3xl font-light leading-tight md:text-[2.2rem]">
                            Miami <span className="text-gradient-gold">Glow Updates</span>
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            Get monthly treatment drops, limited offers, and skin or wellness tips from our team.
                        </p>

                        <form onSubmit={handleNewsletterSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    if (newsletterState !== "idle") {
                                        setNewsletterState("idle");
                                    }
                                }}
                                placeholder="Enter your email"
                                className="h-12 flex-1 rounded-full px-5 text-sm outline-none"
                                style={{
                                    border: "1px solid rgba(201,169,110,0.25)",
                                    background: "rgba(7,7,11,0.78)",
                                    color: "var(--text-primary)",
                                }}
                                aria-label="Email address"
                            />
                            <button type="submit" className="btn-gold h-12 justify-center !px-6 !text-[0.62rem]">
                                Subscribe
                            </button>
                        </form>

                        <p className="mt-3 text-xs uppercase tracking-[0.11em]" style={{ color: "var(--text-muted)" }}>
                            {newsletterState === "success" && "Thanks, you are on the list."}
                            {newsletterState === "invalid" && "Please enter a valid email."}
                            {newsletterState === "idle" && "No spam. Unsubscribe anytime."}
                        </p>
                    </div>
                </div>

                <div
                    className="mt-5 flex flex-col items-center justify-between gap-4 pt-4 text-xs md:flex-row"
                    style={{
                        borderTop: "1px solid rgba(201,169,110,0.06)",
                        color: "var(--text-muted)",
                    }}
                >
                    <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
                    <p className="tracking-wide">
                        Luxury Aesthetics &bull; Miami, Florida
                    </p>
                </div>
            </div>
        </footer>
    );
}
