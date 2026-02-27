"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GalleryItem } from "@/types/site";

gsap.registerPlugin(ScrollTrigger);

interface ResultsGalleryProps {
    items: GalleryItem[];
}

export function ResultsGallery({ items }: ResultsGalleryProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-gallery-head]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });

            gsap.from("[data-gallery-card]", {
                opacity: 0,
                y: 40,
                scale: 0.95,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: "[data-gallery-card]", start: "top 85%", once: true },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    const sorted = [...items].sort((a, b) => a.order - b.order);

    return (
        <section
            ref={sectionRef}
            id="results"
            className="anchor-offset relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            {/* Bg orb */}
            <div className="gradient-orb gradient-orb-blue absolute -right-32 top-0 h-[400px] w-[400px] opacity-20" />

            <div className="section-shell">
                <div data-gallery-head className="mb-12">
                    <p className="eyebrow mb-4">Before &amp; After</p>
                    <h2 className="section-title">
                        Real Results,{" "}
                        <span className="text-gradient-gold">Real Confidence</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Client-consented outcomes showcasing the quality and precision of our treatments.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {sorted.map((item) => (
                        <div
                            key={item.title}
                            data-gallery-card
                            className="glass-card group overflow-hidden rounded-2xl"
                        >
                            <div className="p-5">
                                <h3 className="font-display text-xl font-light" style={{ color: "var(--text-primary)" }}>
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--gold-400)" }}>
                                    {item.treatmentType}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 px-5">
                                <div
                                    className="flex h-36 items-center justify-center rounded-xl text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-transform duration-500 group-hover:scale-[1.02]"
                                    style={{
                                        background: item.beforeImageUrl
                                            ? `linear-gradient(to bottom, rgba(7,7,11,0.2), rgba(7,7,11,0.6)), url(${item.beforeImageUrl})`
                                            : "rgba(201,169,110,0.04)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        border: "1px solid rgba(201,169,110,0.08)",
                                        color: item.beforeImageUrl ? "var(--gold-100)" : "var(--text-muted)",
                                    }}
                                >
                                    Before
                                </div>
                                <div
                                    className="flex h-36 items-center justify-center rounded-xl text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-transform duration-500 group-hover:scale-[1.02]"
                                    style={{
                                        background: item.afterImageUrl
                                            ? `linear-gradient(to bottom, rgba(7,7,11,0.2), rgba(7,7,11,0.6)), url(${item.afterImageUrl})`
                                            : "rgba(201,169,110,0.04)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        border: "1px solid rgba(201,169,110,0.08)",
                                        color: item.afterImageUrl ? "var(--gold-100)" : "var(--text-muted)",
                                    }}
                                >
                                    After
                                </div>
                            </div>

                            <p className="p-5 text-[0.6rem] tracking-wide" style={{ color: "var(--text-muted)" }}>
                                {item.disclaimer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
