"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCategory, ServiceItem } from "@/types/site";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";
import {
    detailedTreatmentMenu,
    DetailedTreatmentService,
    VAGARO_SERVICES_URL,
} from "@/lib/detailed-treatment-menu";

gsap.registerPlugin(ScrollTrigger);

// Background images per category
const CATEGORY_IMAGES: Record<string, string> = {
    "face": "/images/services/face_treatment.png",
    "body-sculpting": "/images/services/body_sculpting.png",
    "advanced-devices": "/images/services/advanced_devices.png",
};

// Per-service card background images
const SERVICE_IMAGES: Record<string, string> = {
    // Unique service images
    "signature-glow-facial": "/images/services/signature_glow_facial.png",
    "injectables-consultation": "/images/services/injectables_consultation.png",
    "fat-dissolve-program": "/images/services/fat_dissolve_program.png",
    "body-contouring-consultation": "/images/services/body_contouring_consultation.png",
    "device-based-skin-tightening": "/images/services/device_based_skin_tightening.png",
    "microneedling-refresh": "/images/services/microneedling_refresh.png",

    // Fallbacks
    "hydrafacial": "/images/services/face_treatment.png",
    "chemical-peel": "/images/services/face_treatment.png",
    "body-contouring": "/images/services/body_sculpting.png",
    "kybella": "/images/services/body_sculpting.png",
    "laser": "/images/services/advanced_devices.png",
    "default": "/images/services/face_treatment.png",
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

function toAnalyticsSlug(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function TreatmentsSection({ categories, services }: TreatmentsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || "");
    const [activeDetailedCategory, setActiveDetailedCategory] = useState(detailedTreatmentMenu[0]?.slug || "");

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
    const activeDetailedMenu = useMemo(
        () => detailedTreatmentMenu.find((group) => group.slug === activeDetailedCategory) || detailedTreatmentMenu[0],
        [activeDetailedCategory]
    );

    return (
        <section
            ref={sectionRef}
            id="treatments"
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
                <div
                    className="grid justify-center gap-6"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 390px))" }}
                >
                    {filteredServices.map((service) => (
                        <ServiceCard key={service.slug} service={service} />
                    ))}
                </div>

                {/* Expanded treatment menu requested by client */}
                <div className="mt-16 border-t pt-16" style={{ borderColor: "rgba(201,169,110,0.14)" }}>
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="eyebrow mb-4 justify-center">Complete Service Catalog</p>
                        <h3 className="font-display text-3xl font-light md:text-4xl" style={{ color: "var(--text-primary)" }}>
                            Explore Every <span className="text-gradient-gold">Available Treatment</span>
                        </h3>
                        <p className="section-subtitle mx-auto mt-4 text-center">
                            Browse by category and book directly through Vagaro.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {detailedTreatmentMenu.map((group) => (
                            <button
                                key={group.slug}
                                type="button"
                                onClick={() => setActiveDetailedCategory(group.slug)}
                                className="rounded-full px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] transition-colors"
                                style={{
                                    border:
                                        activeDetailedCategory === group.slug
                                            ? "1px solid rgba(201,169,110,0.34)"
                                            : "1px solid rgba(255,255,255,0.08)",
                                    background:
                                        activeDetailedCategory === group.slug
                                            ? "rgba(201,169,110,0.14)"
                                            : "rgba(7,7,11,0.35)",
                                    color:
                                        activeDetailedCategory === group.slug
                                            ? "var(--gold-300)"
                                            : "var(--text-secondary)",
                                }}
                            >
                                {group.title}
                            </button>
                        ))}
                    </div>

                    <div
                        className="mx-auto mt-8 max-w-6xl rounded-3xl p-6 md:p-8"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(201,169,110,0.14)",
                        }}
                    >
                        <p className="text-center text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            {activeDetailedMenu.intro}
                        </p>
                        <div
                            className="mt-8 grid justify-center gap-5"
                            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 380px))" }}
                        >
                            {activeDetailedMenu.services.map((service) => (
                                <DetailedServiceCard
                                    key={`${activeDetailedMenu.slug}-${service.name}`}
                                    service={service}
                                    categorySlug={activeDetailedMenu.slug}
                                />
                            ))}
                        </div>
                    </div>
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
            className="glass-card group relative flex w-full max-w-[390px] flex-col overflow-hidden rounded-2xl"
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

function DetailedServiceCard({
    service,
    categorySlug,
}: {
    service: DetailedTreatmentService;
    categorySlug: string;
}) {
    const serviceSlug = toAnalyticsSlug(service.name);

    return (
        <article
            className="glass-card flex h-full w-full max-w-[380px] flex-col justify-between rounded-2xl p-5"
            style={{ borderColor: "rgba(201,169,110,0.15)" }}
        >
            <div>
                <h4 className="font-display text-xl font-light leading-tight" style={{ color: "var(--text-primary)" }}>
                    {service.name}
                </h4>
                {service.duration && (
                    <p className="mt-1 text-xs uppercase tracking-[0.12em]" style={{ color: "var(--gold-400)" }}>
                        {service.duration}
                    </p>
                )}

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {service.description}
                </p>

                {service.financingNote && (
                    <p className="mt-3 text-[0.68rem] uppercase tracking-[0.1em]" style={{ color: "var(--text-muted)" }}>
                        {service.financingNote}
                    </p>
                )}

                {service.highlights && service.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                        {service.highlights.map((line) => (
                            <li key={line} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold-400)" }} />
                                {line}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
                <p className="font-semibold" style={{ color: "var(--gold-300)" }}>
                    {service.price || "Consult required"}
                </p>
                <a
                    href={VAGARO_SERVICES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-4 py-2 text-[0.6rem]!"
                    onClick={() => {
                        const location = `detailed_service_${categorySlug}_${serviceSlug}`;
                        trackCtaClick({ location, ctaType: "booking", serviceContext: categorySlug });
                        trackBookingStart({ entryPoint: location, serviceContext: categorySlug });
                    }}
                >
                    Book Now
                </a>
            </div>
        </article>
    );
}
