"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteSettings } from "@/types/site";
import { trackCallClick, trackCtaClick, trackSmsClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
    settings: SiteSettings;
}

const MIAMI_BUSINESS_HOURS = [
    { day: "Sunday", hours: "Closed" },
    { day: "Monday", hours: "11:00 AM - 6:30 PM" },
    { day: "Tuesday", hours: "11:00 AM - 6:30 PM" },
    { day: "Wednesday", hours: "11:00 AM - 6:30 PM" },
    { day: "Thursday", hours: "10:00 AM - 5:00 PM" },
    { day: "Friday", hours: "10:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
] as const;

export function ContactSection({ settings }: ContactSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const facebookUrl =
        settings.facebookUrl ||
        "https://web.facebook.com/people/MIAMI-Wellness-MedSpa/100091332498347/";

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo("[data-contact-reveal]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 95%", once: true } });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="anchor-offset relative"
            style={{
                paddingTop: "clamp(2rem, 4vw, 3.2rem)",
                paddingBottom: "0",
            }}
        >
            <div className="section-shell">
                <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                    {/* Left: Contact Info */}
                    <div>
                        <div data-contact-reveal>
                            <p className="eyebrow mb-4">Visit Us</p>
                            <h2 className="section-title">
                                Find Us in{" "}
                                <span className="text-gradient-gold">Miami</span>
                            </h2>
                            <p className="section-subtitle mt-4">
                                Visit our modern clinic for a personalized consultation experience.
                            </p>
                        </div>

                        {/* Info Card */}
                        <div
                            data-contact-reveal
                            className="glass-card mt-5 space-y-5 rounded-2xl p-6"
                        >
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--gold-400)" }}>
                                    Address
                                </p>
                                <a
                                    href={settings.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 block text-sm transition-colors hover:text-gold-400"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {settings.fullAddress}
                                </a>
                            </div>

                            <div className="divider-gold" />

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--gold-400)" }}>
                                    Phone
                                </p>
                                <a
                                    href={settings.phoneHref}
                                    className="mt-1 block text-sm transition-colors hover:text-gold-400"
                                    style={{ color: "var(--text-secondary)" }}
                                    onClick={() => {
                                        trackCtaClick({ location: "contact_phone", ctaType: "call", serviceContext: "general" });
                                        trackCallClick("contact_phone");
                                    }}
                                >
                                    {settings.phoneDisplay}
                                </a>
                            </div>

                            <div className="divider-gold" />

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--gold-400)" }}>
                                    Connect
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                    <a
                                        href={settings.instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                                        style={{
                                            border: "1px solid rgba(201,169,110,0.24)",
                                            color: "var(--gold-300)",
                                        }}
                                        aria-label="Visit Instagram"
                                        onClick={() => {
                                            trackCtaClick({
                                                location: "contact_social_instagram",
                                                ctaType: "social",
                                                serviceContext: "general",
                                            });
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <rect x="3" y="3" width="18" height="18" rx="5" />
                                            <circle cx="12" cy="12" r="4" />
                                            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                                        </svg>
                                    </a>
                                    <a
                                        href={facebookUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                                        style={{
                                            border: "1px solid rgba(201,169,110,0.24)",
                                            color: "var(--gold-300)",
                                        }}
                                        aria-label="Visit Facebook"
                                        onClick={() => {
                                            trackCtaClick({
                                                location: "contact_social_facebook",
                                                ctaType: "social",
                                                serviceContext: "general",
                                            });
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M13.5 8.7V6.9c0-.8.5-1.1 1.2-1.1h1.8V3h-2.5c-2.7 0-3.8 1.5-3.8 3.9v1.8H8v2.9h2.2V21h3.3v-9.4h2.4l.4-2.9h-2.8z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="divider-gold" />

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={settings.phoneHref}
                                    className="btn-gold !text-[0.6rem]"
                                    onClick={() => {
                                        trackCtaClick({ location: "contact_buttons", ctaType: "call", serviceContext: "general" });
                                        trackCallClick("contact_buttons");
                                    }}
                                >
                                    Call Now
                                </a>
                                <a
                                    href={settings.smsHref}
                                    className="btn-outline !text-[0.6rem]"
                                    onClick={() => {
                                        trackCtaClick({ location: "contact_buttons", ctaType: "sms", serviceContext: "general" });
                                        trackSmsClick("contact_buttons");
                                    }}
                                >
                                    Text Us
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div
                            data-contact-reveal
                            className="glass-card mt-3 rounded-2xl p-6"
                        >
                            <p
                                className="text-xs font-semibold uppercase tracking-[0.14em]"
                                style={{ color: "var(--gold-400)" }}
                            >
                                Business Hours
                            </p>
                            <ul className="mt-4 space-y-2">
                                {MIAMI_BUSINESS_HOURS.map((hour) => (
                                    <li
                                        key={hour.day}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span style={{ color: "var(--text-secondary)" }}>{hour.day}</span>
                                        <span style={{ color: "var(--text-primary)" }}>{hour.hours}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: Map */}
                    <div data-contact-reveal className="hidden flex-col gap-4 lg:flex">
                        {/* Compact map embed */}
                        <div
                            className="overflow-hidden rounded-3xl"
                            style={{ border: "1px solid rgba(201,169,110,0.1)", height: "220px" }}
                        >
                            <iframe
                                title="Miami Wellness Medspa map"
                                src={settings.mapEmbedUrl}
                                width="100%"
                                height="220"
                                loading="lazy"
                                className="block w-full border-0"
                                style={{ filter: "invert(0.9) hue-rotate(180deg) brightness(0.9)", height: "220px" }}
                            />
                        </div>
                        {/* Directions card */}
                        <a
                            href={settings.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card group flex items-center gap-4 rounded-2xl p-5 transition-colors"
                        >
                            <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                                style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--gold-400)" }}>
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--gold-400)" }}>Get Directions</p>
                                <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>{settings.fullAddress}</p>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--text-muted)" }}>
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
