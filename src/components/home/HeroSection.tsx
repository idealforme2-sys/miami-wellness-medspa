"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroBlock, SiteSettings } from "@/types/site";
import { trackBookingStart, trackCallClick, trackCtaClick } from "@/lib/analytics";

interface HeroSectionProps {
    hero: HeroBlock;
    settings: SiteSettings;
}

function SplitWords({ text, dataAttr }: { text: string; dataAttr: string }) {
    const words = text.split(" ");
    return (
        <>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span className="inline-block" data-split={dataAttr}>
                        {word}
                    </span>
                    {i < words.length - 1 && "\u00A0"}
                </span>
            ))}
        </>
    );
}

export function HeroSection({ hero, settings }: HeroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 2.2,
            });

            tl.from("[data-hero-anim='eyebrow']", {
                opacity: 0,
                y: 20,
                duration: 0.7,
            })
                .from(
                    "[data-split='heading']",
                    {
                        opacity: 0,
                        y: 60,
                        rotateX: 10,
                        stagger: 0.06,
                        duration: 0.9,
                    },
                    "-=0.3"
                )
                .from(
                    "[data-hero-anim='subtitle']",
                    {
                        opacity: 0,
                        y: 30,
                        duration: 0.7,
                    },
                    "-=0.4"
                )
                .from(
                    "[data-hero-anim='actions']",
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.6,
                    },
                    "-=0.3"
                )
                .from(
                    "[data-hero-anim='card']",
                    {
                        opacity: 0,
                        scale: 0.95,
                        y: 30,
                        duration: 0.8,
                    },
                    "-=0.4"
                )
                .from(
                    "[data-hero-anim='orb']",
                    {
                        opacity: 0,
                        scale: 0.5,
                        stagger: 0.15,
                        duration: 1.5,
                        ease: "power2.out",
                    },
                    "-=1.2"
                );
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="top"
            className="relative min-h-screen overflow-hidden"
            style={{ paddingTop: "clamp(7rem, 15vh, 10rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}
        >
            {/* Background gradient orbs */}
            <div
                data-hero-anim="orb"
                className="gradient-orb gradient-orb-gold absolute -left-32 top-20 h-[500px] w-[500px]"
            />
            <div
                data-hero-anim="orb"
                className="gradient-orb gradient-orb-blue absolute -right-40 top-[30%] h-[450px] w-[450px]"
            />
            <div
                data-hero-anim="orb"
                className="gradient-orb gradient-orb-gold absolute bottom-10 right-1/4 h-[300px] w-[300px] opacity-40"
            />

            {/* Grid pattern overlay */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="section-shell relative z-10">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                    {/* Left: Hero content */}
                    <div className="flex flex-col justify-center">
                        <div data-hero-anim="eyebrow" className="eyebrow mb-8">
                            {hero.eyebrow}
                        </div>

                        <h1
                            className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-[1.05] tracking-tight"
                            style={{ color: "var(--text-primary)" }}
                        >
                            <SplitWords text={hero.heading} dataAttr="heading" />
                        </h1>

                        <p
                            data-hero-anim="subtitle"
                            className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {hero.subheading}
                        </p>

                        <div data-hero-anim="actions" className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href={hero.primaryCtaHref}
                                className="btn-gold"
                                onClick={() => {
                                    trackCtaClick({ location: "hero_primary", ctaType: "booking", serviceContext: "consultation" });
                                    trackBookingStart({ entryPoint: "hero_primary", serviceContext: "consultation" });
                                }}
                            >
                                {hero.primaryCtaLabel}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href={hero.secondaryCtaHref}
                                className="btn-outline"
                                onClick={() => {
                                    trackCtaClick({ location: "hero_secondary", ctaType: "call", serviceContext: "general" });
                                    trackCallClick("hero_secondary");
                                }}
                            >
                                {hero.secondaryCtaLabel}
                            </a>
                        </div>

                        <p
                            data-hero-anim="subtitle"
                            className="mt-6 text-xs tracking-wide"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {settings.disclaimer}
                        </p>
                    </div>

                    {/* Right: Info Card */}
                    <div className="flex items-center">
                        <div
                            data-hero-anim="card"
                            className="glass-card-gold w-full rounded-3xl p-8 md:p-10"
                        >
                            <p className="eyebrow mb-6" style={{ fontSize: "0.6rem" }}>
                                Trusted Local Destination
                            </p>
                            <p className="text-gradient-gold font-display text-3xl font-light md:text-4xl">
                                {settings.siteName}
                            </p>
                            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                {settings.brandTagline}
                            </p>

                            <div className="divider-gold mt-6" />

                            <dl className="mt-6 space-y-5 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <div>
                                    <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                                        Location
                                    </dt>
                                    <dd className="mt-1">
                                        <a
                                            href={settings.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-colors hover:text-gold-400"
                                        >
                                            {settings.fullAddress}
                                        </a>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                                        Phone
                                    </dt>
                                    <dd className="mt-1">
                                        <a
                                            href={settings.phoneHref}
                                            className="transition-colors hover:text-gold-400"
                                            onClick={() => {
                                                trackCtaClick({ location: "hero_info_phone", ctaType: "call", serviceContext: "general" });
                                                trackCallClick("hero_info_phone");
                                            }}
                                        >
                                            {settings.phoneDisplay}
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
