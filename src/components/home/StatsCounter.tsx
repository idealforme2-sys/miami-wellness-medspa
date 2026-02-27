"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StatItem } from "@/types/site";

gsap.registerPlugin(ScrollTrigger);

interface StatsCounterProps {
    stats: StatItem[];
    bullets: string[];
}

export function StatsCounter({ stats, bullets }: StatsCounterProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.from("[data-stats-head]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });

            // Bullets reveal
            gsap.from("[data-stats-bullet]", {
                opacity: 0,
                x: -30,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 75%", once: true },
            });

            // Counter animation
            el.querySelectorAll<HTMLElement>("[data-counter]").forEach((element) => {
                const target = Number(element.dataset.counter || "0");
                const suffix = element.dataset.suffix || "";
                if (!target) return;

                const counter = { value: 0 };
                gsap.to(counter, {
                    value: target,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: { trigger: element, start: "top 90%", once: true },
                    onUpdate: () => {
                        element.textContent = `${Math.round(counter.value)}${suffix}`;
                    },
                });
            });

            // Stat cards stagger
            gsap.from("[data-stat-card]", {
                opacity: 0,
                y: 40,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: "[data-stat-card]", start: "top 85%", once: true },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            <div className="section-shell">
                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Left: Why Us */}
                    <div>
                        <div data-stats-head>
                            <p className="eyebrow mb-4">Why Us</p>
                            <h2 className="section-title">
                                Clinical Clarity Meets{" "}
                                <span className="text-gradient-gold">Premium Experience</span>
                            </h2>
                            <p className="section-subtitle mt-4">
                                Our process is built for confidence: clear assessments, practical treatment
                                plans, and precise follow-through.
                            </p>
                        </div>

                        <ul className="mt-8 space-y-4">
                            {bullets.map((bullet) => (
                                <li
                                    key={bullet}
                                    data-stats-bullet
                                    className="flex gap-3 text-sm leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <span
                                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{ background: "var(--gold-400)" }}
                                    />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Stats */}
                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                data-stat-card
                                className="glass-card rounded-2xl p-6 text-center lg:text-left"
                            >
                                <p
                                    data-counter={stat.value}
                                    data-suffix={stat.suffix || ""}
                                    className="font-display text-4xl font-light"
                                    style={{ color: "var(--gold-300)" }}
                                >
                                    0{stat.suffix || ""}
                                </p>
                                <p
                                    className="mt-2 text-sm font-semibold"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {stat.label}
                                </p>
                                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
