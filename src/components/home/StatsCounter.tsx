"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

// Curated Unsplash images per stat section background
const BG_IMAGE = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop";

const stats = [
    { value: 2000, suffix: "+", label: "Treatments Performed", description: "Across all aesthetic services" },
    { value: 97, suffix: "%", label: "Client Satisfaction", description: "Based on verified reviews" },
    { value: 8, suffix: "+", label: "Years of Excellence", description: "Serving Miami since 2016" },
    { value: 15, suffix: "+", label: "Expert Providers", description: "Licensed and board-certified" },
];

const bullets = [
    "Personalized treatment plans designed around your goals",
    "Board-certified providers with advanced aesthetic training",
    "Medical-grade equipment and FDA-cleared technologies",
    "Discreet, private consultation rooms",
    "Natural-looking results — never overdone",
];

interface StatsCounterProps {
    stats?: Array<{ value: number; suffix?: string; label: string; description?: string }>;
    bullets?: string[];
}

export function StatsCounter({ stats: propStats, bullets: propBullets }: StatsCounterProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const countersRef = useRef<Array<HTMLSpanElement | null>>([]);

    const displayStats = propStats?.length ? propStats : stats;
    const displayBullets = propBullets?.length ? propBullets : bullets;

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-stats-head]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 75%", once: true },
            });

            gsap.from("[data-stats-bullet]", {
                opacity: 0,
                x: -20,
                stagger: 0.07,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: "[data-stats-bullet]", start: "top 85%", once: true },
            });

            // Counter animation
            displayStats.forEach((stat, i) => {
                const el = countersRef.current[i];
                if (!el) return;
                const proxy = { val: 0 };
                gsap.to(proxy, {
                    val: stat.value,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: { trigger: "[data-stats-grid]", start: "top 80%", once: true },
                    onUpdate: () => {
                        if (el) el.textContent = Math.round(proxy.val).toString();
                    },
                });
            });
        }, el);

        return () => ctx.revert();
    }, [displayStats]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="anchor-offset relative overflow-hidden"
            style={{ padding: "var(--section-padding) 0" }}
        >
            {/* Background image with overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${BG_IMAGE})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.12)",
                }}
            />
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(7,7,11,0.6) 0%, rgba(7,7,11,0) 60%), " +
                        "linear-gradient(to bottom, rgba(7,7,11,1) 0%, rgba(7,7,11,0) 15%, rgba(7,7,11,0) 85%, rgba(7,7,11,1) 100%)",
                }}
            />

            <div className="section-shell relative z-10">
                <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                    {/* Left: Why Us */}
                    <div>
                        <div data-stats-head>
                            <p className="eyebrow mb-4">Why Choose Us</p>
                            <h2 className="section-title">
                                Miami&rsquo;s Most Trusted{" "}
                                <span className="text-gradient-gold">Med Spa</span>
                            </h2>
                        </div>

                        <ul className="mt-10 space-y-4">
                            {displayBullets.map((b, i) => (
                                <li
                                    key={i}
                                    data-stats-bullet
                                    className="flex items-start gap-4 text-sm leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <span
                                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{ background: "var(--gold-400)" }}
                                    />
                                    {b}
                                </li>
                            ))}
                        </ul>

                        <a href="#book" className="btn-gold mt-10 self-start">
                            Book Consultation
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    {/* Right: Stats Grid */}
                    <div data-stats-grid className="grid grid-cols-2 gap-4">
                        {displayStats.map((stat, i) => (
                            <div
                                key={i}
                                className="glass-card rounded-2xl p-6"
                                style={{ borderColor: "rgba(201,169,110,0.1)" }}
                            >
                                <p
                                    className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-none"
                                    style={{ color: "var(--gold-300)" }}
                                >
                                    <span ref={(el) => { countersRef.current[i] = el; }}>0</span>
                                    {stat.suffix}
                                </p>
                                <p
                                    className="mt-3 text-sm font-semibold"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {stat.label}
                                </p>
                                {stat.description && (
                                    <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                                        {stat.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
