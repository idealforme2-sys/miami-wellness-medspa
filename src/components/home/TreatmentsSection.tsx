"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCategory, ServiceItem } from "@/types/site";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

// Background images per category
const CATEGORY_IMAGES: Record<string, string> = {
    "face": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop",
    "body-sculpting": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop",
    "advanced-devices": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1600&auto=format&fit=crop",
};

// Per-service card background images
const SERVICE_IMAGES: Record<string, string> = {
    "signature-glow-facial": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop",
    "injectables-consultation": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
    "hydrafacial": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
    "chemical-peel": "https://images.unsplash.com/photo-1498757581981-8ddb3c0b9b07?q=80&w=800&auto=format&fit=crop",
    "body-contouring": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
    "kybella": "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop",
    "laser": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    "default": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
};

function getServiceImage(slug: string): string {
    // Try exact match first, then partial match
    if (SERVICE_IMAGES[slug]) return SERVICE_IMAGES[slug];
    const key = Object.keys(SERVICE_IMAGES).find(k => slug.includes(k) || k.includes(slug));
    return key ? SERVICE_IMAGES[key] : SERVICE_IMAGES["default"];
}

interface TreatmentsSectionProps {
    categories: ServiceCategory[];
    services: ServiceItem[];
}

export function TreatmentsSection({ categories, services }: TreatmentsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || "");

    const sortedCategories = useMemo(
        () => [...categories].sort((a, b) => a.order - b.order),
        [categories]
    );

    const sortedServices = useMemo(
        () => [...services].sort((a, b) => a.order - b.order),
        [services]
    );

    const filteredServices = useMemo(
        () => sortedServices.filter((s) => s.categorySlug === activeCategory),
        [sortedServices, activeCategory]
    );

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-treat-head]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
            gsap.from("[data-treat-tabs]", {
                opacity: 0,
                y: 30,
                duration: 0.7,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const cards = el.querySelectorAll("[data-treat-card]");
        gsap.fromTo(cards,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }
        );
    }, [activeCategory]);

    const activeCatImage = CATEGORY_IMAGES[activeCategory] || CATEGORY_IMAGES["face"];

    return (
        <section
            ref={sectionRef}
            id="services"
            className="anchor-offset relative overflow-hidden"
            style={{ padding: "var(--section-padding) 0" }}
        >
            {/* Large category bg image — very subtle */}
            <div
                className="absolute inset-0 z-0 transition-all duration-700"
                style={{
                    backgroundImage: `url(${activeCatImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.06) saturate(0.3)",
                    opacity: 0.8,
                }}
            />
            <div className="absolute inset-0 z-[1]" style={{
                background: "linear-gradient(to bottom, var(--bg-primary) 0%, rgba(7,7,11,0.5) 40%, rgba(7,7,11,0.5) 80%, var(--bg-primary) 100%)",
            }} />

            <div className="section-shell relative z-10">
                {/* Centered heading */}
                <div data-treat-head className="mb-12 text-center">
                    <p className="eyebrow mb-4 justify-center">Treatment Menu</p>
                    <h2 className="section-title">
                        Services Designed Around{" "}
                        <span className="text-gradient-gold">Your Vision</span>
                    </h2>
                    <p className="section-subtitle mx-auto mt-4 text-center">
                        Choose from facial rejuvenation, body contouring, and advanced-device options.
                        Every service includes consultation-backed planning.
                    </p>
                </div>

                {/* Category Tabs — centered */}
                <div data-treat-tabs className="mb-10 flex flex-wrap justify-center gap-3">
                    {sortedCategories.map((cat) => (
                        <button
                            key={cat.slug}
                            type="button"
                            onClick={() => setActiveCategory(cat.slug)}
                            className="relative rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-400"
                            style={{
                                background:
                                    activeCategory === cat.slug
                                        ? "linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.06))"
                                        : "transparent",
                                border:
                                    activeCategory === cat.slug
                                        ? "1px solid rgba(201,169,110,0.35)"
                                        : "1px solid rgba(255,255,255,0.06)",
                                color:
                                    activeCategory === cat.slug ? "var(--gold-300)" : "var(--text-secondary)",
                                boxShadow: activeCategory === cat.slug ? "0 0 20px rgba(201,169,110,0.08)" : "none",
                            }}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>

                {/* Service Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredServices.map((service) => (
                        <ServiceCard key={service.slug} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service }: { service: ServiceItem }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgUrl = getServiceImage(service.slug);

    useEffect(() => {
        const card = cardRef.current;
        if (!card || window.matchMedia("(hover: none)").matches) return;

        const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / rect.height) * -4;
            const rotateY = ((x - rect.width / 2) / rect.width) * 4;
            gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
        };
        const handleLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        return () => {
            card.removeEventListener("mousemove", handleMove);
            card.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            data-treat-card
            className="glass-card group relative flex flex-col overflow-hidden rounded-2xl"
            style={{ transformStyle: "preserve-3d", minHeight: "420px" }}
        >
            {/* Card background image */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.25) saturate(0.6)",
                }}
            />
            {/* Gradient overlay */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: "linear-gradient(to top, rgba(7,7,11,0.97) 0%, rgba(7,7,11,0.7) 55%, rgba(7,7,11,0.2) 100%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                        <h4
                            className="font-display text-xl font-light leading-tight"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {service.name}
                        </h4>
                        <span
                            className="shrink-0 rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em]"
                            style={{
                                background: "rgba(201,169,110,0.12)",
                                border: "1px solid rgba(201,169,110,0.2)",
                                color: "var(--gold-300)",
                            }}
                        >
                            {service.duration}
                        </span>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: "rgba(154,154,173,0.85)" }}>
                        {service.shortDescription}
                    </p>

                    <div
                        className="rounded-xl p-3"
                        style={{
                            background: "rgba(201,169,110,0.05)",
                            border: "1px solid rgba(201,169,110,0.1)",
                        }}
                    >
                        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--gold-400)" }}>
                            Best for
                        </p>
                        <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                            {service.bestFor}
                        </p>
                    </div>

                    <ul className="space-y-1.5">
                        {service.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                                <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--gold-400)" }} />
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    {service.contraindicationNote && (
                        <p className="text-[0.6rem] tracking-wide" style={{ color: "var(--text-muted)" }}>
                            {service.contraindicationNote}
                        </p>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                    <p className="font-semibold" style={{ color: "var(--gold-300)" }}>
                        {service.startingPrice}
                    </p>
                    <a
                        href="#book"
                        className="btn-outline px-4 py-2 text-[0.6rem]!"
                        onClick={() => {
                            trackCtaClick({ location: `service_card_${service.slug}`, ctaType: "booking", serviceContext: service.slug });
                            trackBookingStart({ entryPoint: `service_card_${service.slug}`, serviceContext: service.slug });
                        }}
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </div>
    );
}
