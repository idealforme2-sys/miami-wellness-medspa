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

export function ContactSection({ settings }: ContactSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-contact-reveal]", {
                opacity: 0,
                y: 40,
                stagger: 0.1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="anchor-offset relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            <div className="section-shell">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
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
                            className="glass-card mt-8 rounded-2xl p-6 space-y-5"
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
                            className="glass-card mt-5 rounded-2xl p-6"
                        >
                            <p
                                className="text-xs font-semibold uppercase tracking-[0.14em]"
                                style={{ color: "var(--gold-400)" }}
                            >
                                Hours
                            </p>
                            <ul className="mt-4 space-y-2">
                                {settings.hours.map((hour) => (
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
                    <div
                        data-contact-reveal
                        className="overflow-hidden rounded-3xl"
                        style={{
                            border: "1px solid rgba(201,169,110,0.1)",
                            minHeight: "480px",
                        }}
                    >
                        <iframe
                            title="Miami Wellness Medspa map"
                            src={settings.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            loading="lazy"
                            className="min-h-[480px] w-full border-0"
                            style={{ filter: "invert(0.9) hue-rotate(180deg) brightness(0.9)" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
