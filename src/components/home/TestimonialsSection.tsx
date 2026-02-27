"use client";

import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Testimonial } from "@/types/site";
import { trackCtaClick, trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    googleReviewsUrl: string;
    classpassUrl: string;
}

export function TestimonialsSection({
    testimonials,
    googleReviewsUrl,
    classpassUrl,
}: TestimonialsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const sorted = useMemo(
        () => [...testimonials].sort((a, b) => a.order - b.order),
        [testimonials]
    );

    const next = useCallback(() => {
        setActiveIndex((i) => (i + 1) % sorted.length);
    }, [sorted.length]);

    const prev = useCallback(() => {
        setActiveIndex((i) => (i - 1 + sorted.length) % sorted.length);
    }, [sorted.length]);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-reviews-head]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    // Animate card changes
    useEffect(() => {
        gsap.fromTo(
            "[data-review-active]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }, [activeIndex]);

    const current = sorted[activeIndex];
    if (!current) return null;

    return (
        <section
            ref={sectionRef}
            id="reviews"
            className="anchor-offset relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            <div className="gradient-orb gradient-orb-gold absolute left-1/4 top-1/3 h-[400px] w-[400px] opacity-15" />

            <div className="section-shell">
                <div data-reviews-head className="mb-12">
                    <p className="eyebrow mb-4">Testimonials</p>
                    <h2 className="section-title">
                        What Our Clients{" "}
                        <span className="text-gradient-gold">Say</span>
                    </h2>
                </div>

                {/* Main testimonial display */}
                <div className="mx-auto max-w-3xl">
                    <div data-review-active className="glass-card-gold rounded-3xl p-8 md:p-12">
                        {/* Stars */}
                        <div className="mb-6 flex gap-1.5">
                            {Array.from({ length: Math.min(5, current.rating) }).map((_, i) => (
                                <svg
                                    key={i}
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="var(--gold-300)"
                                    stroke="none"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote
                            className="font-display text-xl leading-relaxed md:text-2xl"
                            style={{ color: "var(--text-primary)" }}
                        >
                            &ldquo;{current.quote}&rdquo;
                        </blockquote>

                        <div className="divider-gold mt-6" />

                        {/* Attribution */}
                        <div className="mt-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                                    {current.reviewerName}
                                </p>
                                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                                    via {current.source} &bull;{" "}
                                    {new Date(current.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <span
                                className="rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em]"
                                style={{
                                    background: "rgba(201,169,110,0.1)",
                                    border: "1px solid rgba(201,169,110,0.2)",
                                    color: "var(--gold-400)",
                                }}
                            >
                                {current.source}
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={prev}
                            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                            style={{ border: "1px solid rgba(201,169,110,0.2)", color: "var(--gold-400)" }}
                            aria-label="Previous review"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {sorted.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveIndex(i)}
                                    className="h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: i === activeIndex ? "1.5rem" : "0.5rem",
                                        background: i === activeIndex ? "var(--gold-300)" : "rgba(201,169,110,0.2)",
                                    }}
                                    aria-label={`Go to review ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={next}
                            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                            style={{ border: "1px solid rgba(201,169,110,0.2)", color: "var(--gold-400)" }}
                            aria-label="Next review"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* External links */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <a
                        href={googleReviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold !text-[0.6rem]"
                        onClick={() => {
                            trackEvent("review_outbound_click", { source: "Google" });
                            trackCtaClick({ location: "reviews_google_outbound", ctaType: "external", serviceContext: "reviews" });
                        }}
                    >
                        Read Google Reviews
                    </a>
                    <a
                        href={classpassUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline !text-[0.6rem]"
                        onClick={() => {
                            trackEvent("review_outbound_click", { source: "ClassPass" });
                        }}
                    >
                        View ClassPass Profile
                    </a>
                </div>
            </div>
        </section>
    );
}
