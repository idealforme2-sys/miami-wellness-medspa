"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
    {
        title: "Jawline Refinement",
        treatmentType: "Dermal Fillers",
        image: "/images/results/Jawline Refinement.png",
        result: "Defined contour, balanced profile",
    },
    {
        title: "Skin Rejuvenation",
        treatmentType: "Microneedling + PRP",
        image: "/images/results/Skin Rejuvenation.png",
        result: "Smoother texture, reduced pigmentation",
    },
    {
        title: "Forehead Lines",
        treatmentType: "Neuromodulators",
        image: "/images/results/Forehead Lines.png",
        result: "Natural smoothing, expression preserved",
    },
    {
        title: "HydraFacial Glow",
        treatmentType: "Medical Facial",
        image: "/images/results/HydraFacial Glow.png",
        result: "Immediate radiance, clear pores",
    },
    {
        title: "Body Contouring",
        treatmentType: "EmSculpt NEO",
        image: "/images/results/Body Contouring.png",
        result: "Toned muscle, reduced fat",
    },
    {
        title: "IV Radiance",
        treatmentType: "IV Therapy",
        image: "/images/results/IV Radiance.png",
        result: "Glowing skin, renewed energy",
    },
];

export function ResultsGallery() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo("[data-gallery-head]",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 80%", once: true },
                }
            );
            gsap.fromTo("[data-gallery-card]",
                { opacity: 0, y: 40, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.1,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%", once: true },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="results"
            className="anchor-offset relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            <div className="gradient-orb gradient-orb-blue absolute -right-32 top-0 h-[400px] w-[400px] opacity-20" />

            <div className="section-shell">
                <div data-gallery-head className="mb-14 text-center">
                    <p className="eyebrow mb-4 justify-center">Before &amp; After</p>
                    <h2 className="section-title">
                        Real Results, <span className="text-gradient-gold">Real Confidence</span>
                    </h2>
                    <p className="section-subtitle mx-auto mt-4 text-center">
                        Client-consented outcomes showcasing the quality and precision of our treatments.
                        Individual results may vary.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {galleryItems.map((item) => (
                        <div
                            key={item.title}
                            data-gallery-card
                            className="glass-card group overflow-hidden rounded-3xl"
                        >
                            <div className="relative overflow-hidden">
                                <div
                                    className="h-56 w-full transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url('${item.image}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: "#1b1b28",
                                    }}
                                />
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-2">
                                    <h3
                                        className="font-display text-lg font-light"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <span
                                        className="shrink-0 rounded-full px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em]"
                                        style={{
                                            background: "rgba(201,169,110,0.08)",
                                            border: "1px solid rgba(201,169,110,0.15)",
                                            color: "var(--gold-400)",
                                        }}
                                    >
                                        {item.treatmentType}
                                    </span>
                                </div>
                                <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                    * {item.result}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-center text-[0.6rem] tracking-wide" style={{ color: "var(--text-muted)" }}>
                    Results shown are representative of typical outcomes. Individual results vary based on treatment plan, skin type, and compliance.
                </p>
            </div>
        </section>
    );
}
