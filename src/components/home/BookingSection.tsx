"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookingWidget } from "./BookingWidget";
import { BookingConfig } from "@/types/site";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

interface BookingSectionProps {
    booking: BookingConfig;
}

export function BookingSection({ booking }: BookingSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

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
            style={{ padding: "var(--section-padding) 0" }}
        >
            {/* CTA Banner */}
            <div
                className="relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(201,169,110,0.06) 0%, rgba(7,7,11,0) 50%, rgba(70,90,160,0.04) 100%)",
                    borderTop: "1px solid rgba(201,169,110,0.08)",
                    borderBottom: "1px solid rgba(201,169,110,0.08)",
                    padding: "clamp(3rem, 6vw, 5rem) 0",
                    marginBottom: "clamp(2rem, 4vw, 4rem)",
                }}
            >
                <div className="gradient-orb gradient-orb-gold absolute left-0 top-0 h-[300px] w-[300px] opacity-20" />
                <div className="gradient-orb gradient-orb-blue absolute bottom-0 right-0 h-[250px] w-[250px] opacity-15" />

                <div data-book-content className="section-shell relative z-10 text-center">
                    <p className="eyebrow mb-4 justify-center">Ready to Begin</p>
                    <h2 className="section-title mx-auto">
                        Your Transformation{" "}
                        <span className="text-gradient-gold">Starts Here</span>
                    </h2>
                    <p
                        className="section-subtitle mx-auto mt-4 text-center"
                        style={{ maxWidth: "32rem" }}
                    >
                        Book your consultation today and take the first step toward natural, lasting results.
                    </p>
                    <div className="mt-8">
                        <a
                            href="#book-widget"
                            className="btn-gold"
                            style={{ boxShadow: "0 0 40px rgba(201,169,110,0.2)" }}
                            onClick={() => {
                                trackCtaClick({ location: "booking_cta_banner", ctaType: "booking", serviceContext: "general" });
                                trackBookingStart({ entryPoint: "booking_cta_banner", serviceContext: "general" });
                            }}
                        >
                            Schedule Consultation
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Booking Widget */}
            <div id="book-widget" className="section-shell">
                <div data-book-content>
                    <BookingWidget booking={booking} />
                </div>
            </div>
        </section>
    );
}
