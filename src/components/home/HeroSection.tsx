"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroBlock, SiteSettings } from "@/types/site";
import { trackBookingStart, trackCallClick, trackCtaClick } from "@/lib/analytics";

// High-quality Unsplash medspa treatment image
const HERO_IMAGE = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=85&w=2940&auto=format&fit=crop";

interface HeroSectionProps {
    hero: HeroBlock;
    settings: SiteSettings;
}

function SplitWords({ text, dataAttr }: { text: string; dataAttr: string }) {
    return (
        <>
            {text.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span className="inline-block" data-split={dataAttr}>{word}</span>
                    {i < text.split(" ").length - 1 && "\u00A0"}
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
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 2.0 });
            tl
                .from("[data-hero-anim='eyebrow']", { opacity: 0, y: 24, duration: 0.7 })
                .from("[data-split='heading']", { opacity: 0, y: 70, rotateX: 8, stagger: 0.055, duration: 1.0 }, "-=0.3")
                .from("[data-hero-anim='subtitle']", { opacity: 0, y: 30, duration: 0.7 }, "-=0.4")
                .from("[data-hero-anim='actions']", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
                .from("[data-hero-anim='badge']", { opacity: 0, scale: 0.9, y: 20, duration: 0.7 }, "-=0.4")
                .from("[data-hero-anim='scroll']", { opacity: 0, duration: 0.6 }, "-=0.2");
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="top"
            className="relative min-h-screen overflow-hidden"
            style={{ minHeight: "100svh" }}
        >
            {/* Full-bleed background image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${HERO_IMAGE})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                    filter: "brightness(0.45)",
                    transform: "scale(1.05)",
                    willChange: "transform",
                }}
            />

            {/* Multi-layer dark gradient overlay */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(to right, rgba(7,7,11,0.75) 0%, rgba(7,7,11,0.2) 60%, rgba(7,7,11,0.1) 100%), " +
                        "linear-gradient(to top, rgba(7,7,11,0.9) 0%, rgba(7,7,11,0.1) 50%, transparent 100%)",
                }}
            />

            {/* Subtle gold glow behind text */}
            <div
                className="gradient-orb gradient-orb-gold absolute -left-48 top-1/4 z-[1] h-[600px] w-[600px] opacity-20"
            />

            <div
                className="relative z-10 flex min-h-screen flex-col justify-end section-shell"
                style={{ paddingBottom: "clamp(3rem, 6vh, 5rem)", paddingTop: "8.5rem" }}
            >
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <div data-hero-anim="eyebrow" className="eyebrow mb-8" style={{ color: "var(--gold-300)" }}>
                        {hero.eyebrow}
                    </div>

                    {/* Heading — large cinematic */}
                    <h1
                        className="font-display font-light leading-[1.05] tracking-tight"
                        style={{
                            fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
                            color: "var(--text-primary)",
                        }}
                    >
                        <SplitWords text={hero.heading} dataAttr="heading" />
                    </h1>

                    {/* Subtitle */}
                    <p
                        data-hero-anim="subtitle"
                        className="mt-6 max-w-xl leading-relaxed"
                        style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", color: "rgba(240,236,228,0.75)" }}
                    >
                        {hero.subheading}
                    </p>

                    {/* Actions */}
                    <div data-hero-anim="actions" className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                            href={hero.primaryCtaHref}
                            className="btn-gold"
                            style={{ boxShadow: "0 0 40px rgba(201,169,110,0.25)" }}
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
                            style={{ borderColor: "rgba(240,236,228,0.3)", color: "var(--text-primary)" }}
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
                        className="mt-5 text-xs tracking-wide"
                        style={{ color: "rgba(240,236,228,0.35)" }}
                    >
                        {settings.disclaimer}
                    </p>
                </div>

                {/* Floating badge — bottom right */}
                <div
                    data-hero-anim="badge"
                    className="absolute bottom-[clamp(4rem,8vh,7rem)] right-6 md:right-10"
                >
                    <div
                        className="rounded-2xl p-4 md:p-5 text-right w-[140px] md:w-auto md:min-w-[180px]"
                        style={{
                            background: "rgba(7,7,11,0.7)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(201,169,110,0.15)",
                        }}
                    >
                        <p className="text-[0.5rem] md:text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--gold-400)" }}>
                            Miami&rsquo;s Premier
                        </p>
                        <p className="mt-1 font-display text-base md:text-lg font-light" style={{ color: "var(--text-primary)" }}>
                            Med Spa
                        </p>
                        <div className="mt-2" style={{ width: "30px", height: "1px", background: "var(--gold-400)", marginLeft: "auto" }} />
                        <p className="mt-2 text-[0.6rem] md:text-xs" style={{ color: "var(--text-muted)" }}>
                            {settings.cityStateZip}
                        </p>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div
                    data-hero-anim="scroll"
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(201,169,110,0.5)" }}>
                        Scroll
                    </span>
                    <div
                        className="h-10 w-[1px]"
                        style={{
                            background: "linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)",
                            animation: "fade-up 2s ease-in-out infinite alternate",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
