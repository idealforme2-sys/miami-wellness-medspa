"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCategory, ServiceItem } from "@/types/site";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

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
        gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
            }
        );
    }, [activeCategory]);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="anchor-offset relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            <div className="section-shell">
                <div data-treat-head className="mb-12">
                    <p className="eyebrow mb-4">Treatment Menu</p>
                    <h2 className="section-title">
                        Services Designed Around<br />
                        <span className="text-gradient-gold">Your Vision</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Choose from facial rejuvenation, body contouring, and advanced-device options.
                        Every service includes consultation-backed planning.
                    </p>
                </div>

                {/* Category Tabs */}
                <div data-treat-tabs className="mb-10 flex flex-wrap gap-3">
                    {sortedCategories.map((cat) => (
                        <button
                            key={cat.slug}
                            type="button"
                            onClick={() => setActiveCategory(cat.slug)}
                            className="relative rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-400"
                            style={{
                                background:
                                    activeCategory === cat.slug
                                        ? "linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))"
                                        : "transparent",
                                border:
                                    activeCategory === cat.slug
                                        ? "1px solid rgba(201,169,110,0.3)"
                                        : "1px solid rgba(255,255,255,0.06)",
                                color:
                                    activeCategory === cat.slug ? "var(--gold-300)" : "var(--text-secondary)",
                            }}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>

                {/* Service Cards Grid */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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

    useEffect(() => {
        const card = cardRef.current;
        if (!card || window.matchMedia("(hover: none)").matches) return;

        const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            gsap.to(card, {
                rotateX,
                rotateY,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 800,
            });
        };

        const handleLeave = () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
        };

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
            className="glass-card group flex h-full flex-col justify-between rounded-2xl p-6"
            style={{ transformStyle: "preserve-3d" }}
        >
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
                            background: "rgba(201,169,110,0.1)",
                            border: "1px solid rgba(201,169,110,0.15)",
                            color: "var(--gold-400)",
                        }}
                    >
                        {service.duration}
                    </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {service.shortDescription}
                </p>

                <div
                    className="rounded-xl p-3"
                    style={{
                        background: "rgba(201,169,110,0.04)",
                        border: "1px solid rgba(201,169,110,0.08)",
                    }}
                >
                    <p
                        className="text-[0.625rem] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--gold-400)" }}
                    >
                        Best for
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                        {service.bestFor}
                    </p>
                </div>

                <ul className="space-y-2">
                    {service.benefits.map((benefit) => (
                        <li
                            key={benefit}
                            className="flex items-center gap-2 text-xs"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <span
                                className="h-1 w-1 rounded-full"
                                style={{ background: "var(--gold-400)" }}
                            />
                            {benefit}
                        </li>
                    ))}
                </ul>

                {service.contraindicationNote && (
                    <p className="text-[0.625rem] tracking-wide" style={{ color: "var(--text-muted)" }}>
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
                    className="btn-outline !px-4 !py-2 !text-[0.6rem]"
                    onClick={() => {
                        trackCtaClick({
                            location: `service_card_${service.slug}`,
                            ctaType: "booking",
                            serviceContext: service.slug,
                        });
                        trackBookingStart({ entryPoint: `service_card_${service.slug}`, serviceContext: service.slug });
                    }}
                >
                    Book Now
                </a>
            </div>
        </div>
    );
}
