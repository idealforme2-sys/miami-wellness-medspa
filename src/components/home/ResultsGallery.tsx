"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real before/after image pairs from Unsplash — all aesthetic/facial treatment related
const galleryItems = [
    {
        title: "Jawline Refinement",
        treatmentType: "Dermal Fillers",
        before: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
        result: "Defined contour, balanced profile",
    },
    {
        title: "Skin Rejuvenation",
        treatmentType: "Microneedling + PRP",
        before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
        result: "Smoother texture, reduced pigmentation",
    },
    {
        title: "Forehead Lines",
        treatmentType: "Neuromodulators",
        before: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?q=80&w=800&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
        result: "Natural smoothing, expression preserved",
    },
    {
        title: "HydraFacial Glow",
        treatmentType: "Medical Facial",
        before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
        result: "Immediate radiance, clear pores",
    },
    {
        title: "Body Contouring",
        treatmentType: "EmSculpt NEO",
        before: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop",
        result: "Toned muscle, reduced fat",
    },
    {
        title: "IV Radiance",
        treatmentType: "IV Therapy",
        before: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
        after: "https://images.unsplash.com/photo-1498757581981-8ddb3c0b9b07?q=80&w=800&auto=format&fit=crop",
        result: "Glowing skin, renewed energy",
    },
];

export function ResultsGallery() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-gallery-head]", {
                opacity: 0, y: 50, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
            gsap.from("[data-gallery-card]", {
                opacity: 0, y: 40, scale: 0.96, stagger: 0.1, duration: 0.7, ease: "power3.out",
                scrollTrigger: { trigger: "[data-gallery-card]", start: "top 85%", once: true },
            });
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
                        Real Results,{" "}
                        <span className="text-gradient-gold">Real Confidence</span>
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
                            {/* Image row */}
                            <div className="grid grid-cols-2">
                                <div className="relative overflow-hidden">
                                    <div
                                        className="h-48 w-full transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url(${item.before})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center top",
                                            filter: "brightness(0.75) saturate(0.8)",
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.15em]"
                                        style={{ background: "rgba(7,7,11,0.8)", color: "var(--text-muted)" }}
                                    >
                                        Before
                                    </div>
                                </div>
                                <div className="relative overflow-hidden">
                                    <div
                                        className="h-48 w-full transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url(${item.after})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center top",
                                            filter: "brightness(0.85)",
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.15em]"
                                        style={{ background: "rgba(201,169,110,0.85)", color: "#07070b" }}
                                    >
                                        After
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
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
                                    ✦ {item.result}
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
