"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookingConfig } from "@/types/site";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

interface BookingSectionProps {
    booking: BookingConfig;
}

export function BookingSection({ booking }: BookingSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const bookingUrl = "https://www.vagaro.com/miamiwellnessmedspa/services";

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-book-content]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="book"
            className="anchor-offset relative"
            style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}
        >
            <div className="section-shell">
                <div
                    data-book-content
                    className="glass-card-gold relative mx-auto max-w-5xl overflow-hidden rounded-[2rem]"
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(201,169,110,0.12), rgba(7,7,11,0.92) 45%, rgba(7,7,11,0.98))",
                        border: "1px solid rgba(201,169,110,0.24)",
                    }}
                >
                    <div
                        className="pointer-events-none absolute -left-14 -top-14 h-56 w-56 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(201,169,110,0.32), rgba(201,169,110,0))",
                            filter: "blur(10px)",
                            animation: "float-slow 12s ease-in-out infinite",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(70,90,160,0.28), rgba(70,90,160,0))",
                            filter: "blur(8px)",
                            animation: "float-slow 16s ease-in-out infinite reverse",
                        }}
                    />

                    <div className="relative grid gap-8 p-7 md:grid-cols-[1.05fr_0.95fr] md:p-12">
                        <div className="flex flex-col justify-center text-center md:text-left">
                            <p className="eyebrow mb-4 justify-center md:justify-start">Ready to Begin</p>
                            <h2 className="section-title">
                                Your Transformation <span className="text-gradient-gold">Starts Here</span>
                            </h2>
                            <p className="section-subtitle mt-4 md:mx-0" style={{ maxWidth: "36rem" }}>
                                Book your consultation today and take the first step toward natural, lasting results.
                            </p>

                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
                                <a
                                    href={bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gold w-full justify-center sm:w-auto"
                                    style={{
                                        boxShadow: "0 0 40px rgba(201,169,110,0.28)",
                                        animation: "glow-pulse 2.8s ease-in-out infinite",
                                    }}
                                    onClick={() => {
                                        trackCtaClick({
                                            location: "booking_consult_card",
                                            ctaType: "booking",
                                            serviceContext: booking.serviceContext || "general",
                                        });
                                        trackBookingStart({
                                            entryPoint: "booking_consult_card",
                                            serviceContext: booking.serviceContext || "general",
                                        });
                                    }}
                                >
                                    Schedule Consultation
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                                <p className="text-center text-xs uppercase tracking-[0.12em] md:text-left" style={{ color: "var(--text-muted)" }}>
                                    Opens Vagaro services in a new tab
                                </p>
                            </div>

                            <p
                                className="mt-5 inline-flex w-fit self-center rounded-full px-4 py-2 text-[0.63rem] uppercase tracking-[0.12em] md:self-start"
                                style={{
                                    background: "rgba(201,169,110,0.08)",
                                    border: "1px solid rgba(201,169,110,0.22)",
                                    color: "var(--gold-300)",
                                }}
                            >
                                Same-week consultation availability
                            </p>
                        </div>

                        <div className="relative min-h-[240px] overflow-hidden rounded-3xl md:min-h-[360px]">
                            <div
                                className="absolute inset-0 transition-transform duration-700"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(160deg, rgba(7,7,11,0.22), rgba(7,7,11,0.74)), url('/consultation-card.svg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            <div
                                className="absolute left-4 top-4 rounded-full px-3 py-1 text-[0.58rem] uppercase tracking-[0.14em]"
                                style={{
                                    background: "rgba(7,7,11,0.62)",
                                    border: "1px solid rgba(201,169,110,0.24)",
                                    color: "var(--gold-300)",
                                }}
                            >
                                Personalized Treatment Planning
                            </div>
                            <div
                                className="absolute bottom-5 right-5 rounded-2xl p-4"
                                style={{
                                    background: "rgba(7,7,11,0.75)",
                                    border: "1px solid rgba(201,169,110,0.2)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <p className="text-xs uppercase tracking-[0.12em]" style={{ color: "var(--gold-400)" }}>
                                    New Client Path
                                </p>
                                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                    Consultation, treatment roadmap, and support guidance in one visit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
