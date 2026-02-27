"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(el, {
                    clipPath: "inset(0 0 100% 0)",
                    duration: 0.9,
                    ease: "power3.inOut",
                    onComplete: () => setDone(true),
                });
            },
        });

        tl.from("[data-preload='line']", {
            scaleX: 0,
            duration: 1.2,
            ease: "power2.inOut",
        })
            .from(
                "[data-preload='brand']",
                {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.6"
            )
            .from(
                "[data-preload='tagline']",
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.3"
            )
            .to({}, { duration: 0.4 });

        return () => {
            tl.kill();
        };
    }, []);

    if (done) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: "#07070b", clipPath: "inset(0 0 0% 0)" }}
        >
            {/* Background gradient orbs */}
            <div className="gradient-orb gradient-orb-gold absolute left-1/4 top-1/4 h-[400px] w-[400px] opacity-30" />
            <div className="gradient-orb gradient-orb-blue absolute bottom-1/4 right-1/4 h-[350px] w-[350px] opacity-20" />

            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Gold accent line */}
                <div
                    data-preload="line"
                    className="h-[1px] w-16 origin-left"
                    style={{ background: "linear-gradient(90deg, #c9a96e, #d4af37)" }}
                />

                {/* Brand */}
                <div data-preload="brand" className="text-center">
                    <h1
                        className="font-display text-4xl font-light tracking-wide md:text-6xl"
                        style={{ color: "#f0ece4" }}
                    >
                        Miami Wellness
                    </h1>
                    <p
                        className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em]"
                        style={{ color: "#c9a96e" }}
                    >
                        Medspa
                    </p>
                </div>

                {/* Tagline */}
                <p
                    data-preload="tagline"
                    className="text-center text-sm tracking-wide"
                    style={{ color: "#9a9aad" }}
                >
                    Luxury Aesthetics &bull; Personalized Care
                </p>
            </div>
        </div>
    );
}
