"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01",
        title: "Consultation",
        desc: "We assess your goals, skin condition, and lifestyle to build a personalized treatment blueprint.",
        icon: "💎",
    },
    {
        num: "02",
        title: "Custom Plan",
        desc: "Your provider designs a phased plan with timeline, expected outcomes, and transparent pricing.",
        icon: "✨",
    },
    {
        num: "03",
        title: "Treatment",
        desc: "Advanced technology meets clinical precision. Every session is calibrated for your comfort and results.",
        icon: "🌟",
    },
    {
        num: "04",
        title: "Follow-Up",
        desc: "Progress tracking, maintenance plans, and ongoing care ensure lasting, natural-looking results.",
        icon: "🏆",
    },
];

export function HorizontalScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-hscroll-head]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: container, start: "top 80%", once: true },
            });

            const totalWidth = track.scrollWidth - container.offsetWidth;

            gsap.to(track, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top 15%",
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            gsap.utils.toArray<HTMLElement>("[data-step-card]").forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    scale: 0.9,
                    y: 30,
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: container, start: "top 70%", once: true },
                });
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ padding: "var(--section-padding) 0" }}
        >
            {/* Bg orb */}
            <div className="gradient-orb gradient-orb-gold absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20" />

            <div className="section-shell mb-12">
                <div data-hscroll-head>
                    <p className="eyebrow mb-4">How It Works</p>
                    <h2 className="section-title">
                        Your Journey to{" "}
                        <span className="text-gradient-gold">Radiance</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        A streamlined, four-step process designed for clarity, comfort, and confidence.
                    </p>
                </div>
            </div>

            <div ref={trackRef} className="flex gap-8 pl-[max(1.5rem,calc((100vw-1380px)/2+1.5rem))]">
                {steps.map((step) => (
                    <div
                        key={step.num}
                        data-step-card
                        className="glass-card group flex w-[min(85vw,420px)] shrink-0 flex-col rounded-3xl p-8 md:p-10"
                    >
                        {/* Number */}
                        <span
                            className="font-display text-6xl font-light"
                            style={{ color: "rgba(201,169,110,0.15)" }}
                        >
                            {step.num}
                        </span>

                        {/* Icon */}
                        <span className="mt-4 text-3xl">{step.icon}</span>

                        {/* Title */}
                        <h3
                            className="mt-4 font-display text-2xl font-light"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {step.title}
                        </h3>

                        {/* Divider */}
                        <div className="divider-gold mt-4" />

                        {/* Description */}
                        <p
                            className="mt-4 text-sm leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {step.desc}
                        </p>
                    </div>
                ))}

                {/* End spacer */}
                <div className="w-[20vw] shrink-0" />
            </div>
        </div>
    );
}
