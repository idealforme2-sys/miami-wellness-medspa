"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const offerings = [
    {
        num: "01",
        code: "INJECT IT",
        title: "Neuromodulators & Fillers",
        desc: "Restore youthful volume and smooth dynamic wrinkles with premium injectables including Botox, Dysport, Xeomin, and dermal fillers like Radiesse and Juvederm. Precision micro-dosing for natural, refreshed results.",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2000&auto=format&fit=crop",
        serviceContext: "neurotoxins",
    },
    {
        num: "02",
        code: "FACE IT",
        title: "Advanced Skin Treatments",
        desc: "Specializing in melasma and hyperpigmentation. Featuring SkinPen® Microneedling, medical-grade chemical peels, HydraFacials, and IPL photofacials. Science-backed protocols for visibly radiant skin.",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2000&auto=format&fit=crop",
        serviceContext: "skin",
    },
    {
        num: "03",
        code: "SCULPT IT",
        title: "Body Contouring",
        desc: "Non-surgical body sculpting with EmSculpt NEO, CoolSculpting, and Kybella. Targeted fat reduction and muscle toning with zero downtime — results that last.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop",
        serviceContext: "body",
    },
    {
        num: "04",
        code: "RESTORE IT",
        title: "Regenerative IV Therapy",
        desc: "Boost your immune system, enhance athletic recovery, and achieve a radiant glow from the inside out with our custom-formulated IV cocktails — designed by medical professionals for maximum bioavailability.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
        serviceContext: "iv",
    },
];

export function CuratedOfferingsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Header reveal
            gsap.from("[data-curated-header]", {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });

            // Each row reveal
            gsap.utils.toArray<HTMLElement>("[data-offering-row]").forEach((row, i) => {
                const image = row.querySelector("[data-offering-image]");
                const content = row.querySelector("[data-offering-content]");

                gsap.from(image, {
                    opacity: 0,
                    scale: 1.08,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: { trigger: row, start: "top 75%", once: true },
                });
                gsap.from(content, {
                    opacity: 0,
                    x: i % 2 === 0 ? 50 : -50,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: row, start: "top 75%", once: true },
                });
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="treatments"
            className="anchor-offset relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            {/* Bg orb */}
            <div className="gradient-orb gradient-orb-gold absolute left-1/3 top-0 h-[500px] w-[500px] opacity-10" />

            {/* Section Header */}
            <div data-curated-header className="section-shell mb-20 text-center">
                <p className="eyebrow mb-6 justify-center">Curated Offerings</p>
                <h2
                    className="font-display font-light leading-[1.05]"
                    style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "var(--text-primary)" }}
                >
                    The Art of{" "}
                    <span className="text-gradient-gold italic">Excellence.</span>
                </h2>
                <p className="section-subtitle mx-auto mt-6 text-center">
                    Scroll to explore our signature treatments — each one designed to deliver meaningful,
                    lasting results with clinical precision.
                </p>
            </div>

            {/* Treatment Rows */}
            <div className="space-y-0">
                {offerings.map((item, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div
                            key={item.num}
                            data-offering-row
                            className="grid min-h-[480px] items-stretch lg:grid-cols-2"
                            style={{
                                borderTop: "1px solid rgba(201,169,110,0.06)",
                            }}
                        >
                            {/* Image */}
                            <div
                                data-offering-image
                                className={`relative overflow-hidden ${isEven ? "order-last lg:order-first" : "order-last"}`}
                                style={{ minHeight: "320px" }}
                            >
                                <div
                                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        filter: "brightness(0.65)",
                                    }}
                                />
                                {/* Number overlay */}
                                <div
                                    className="absolute bottom-6 left-6 font-display font-light"
                                    style={{
                                        fontSize: "7rem",
                                        lineHeight: 1,
                                        color: "rgba(201,169,110,0.12)",
                                        userSelect: "none",
                                    }}
                                >
                                    {item.num}
                                </div>
                            </div>

                            {/* Content */}
                            <div
                                data-offering-content
                                className={`flex flex-col justify-center px-10 py-14 md:px-16 ${isEven ? "order-first lg:order-last" : ""}`}
                                style={{ background: "rgba(255,255,255,0.015)" }}
                            >
                                {/* Code label */}
                                <p
                                    className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.3em]"
                                    style={{ color: "var(--gold-400)" }}
                                >
                                    {item.num} / {item.code}
                                </p>

                                {/* Title */}
                                <h3
                                    className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-tight"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {item.title}
                                </h3>

                                {/* Divider */}
                                <div
                                    className="my-6"
                                    style={{ width: "50px", height: "1px", background: "linear-gradient(90deg, var(--gold-400), transparent)" }}
                                />

                                {/* Description */}
                                <p
                                    className="leading-relaxed"
                                    style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)", color: "var(--text-secondary)" }}
                                >
                                    {item.desc}
                                </p>

                                {/* CTA */}
                                <a
                                    href="#book"
                                    className="group mt-8 inline-flex items-center gap-3 self-start text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                                    style={{ color: "var(--gold-400)" }}
                                    onClick={() => {
                                        trackCtaClick({ location: `offerings_${item.num}`, ctaType: "booking", serviceContext: item.serviceContext });
                                        trackBookingStart({ entryPoint: `offerings_row_${item.num}`, serviceContext: item.serviceContext });
                                    }}
                                >
                                    Book Treatment
                                    <span
                                        className="block h-[1px] w-8 transition-all duration-300 group-hover:w-14"
                                        style={{ background: "var(--gold-400)" }}
                                    />
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom label */}
            <div className="section-shell mt-16 text-center">
                <p
                    className="font-display text-[clamp(1.2rem,2vw,1.8rem)] font-light italic"
                    style={{ color: "var(--text-muted)" }}
                >
                    The Experts
                </p>
            </div>
        </section>
    );
}
