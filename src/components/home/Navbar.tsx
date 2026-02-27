"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteSettings } from "@/types/site";
import { trackBookingStart, trackCallClick, trackCtaClick } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const sectionLinks = [
    { label: "Treatments", href: "#treatments" },
    { label: "Results", href: "#results" },
    { label: "Reviews", href: "#reviews" },
    { label: "Book", href: "#book" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
];

interface NavbarProps {
    settings: SiteSettings;
}

export function Navbar({ settings }: NavbarProps) {
    const navRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!isMobileOpen || !mobileMenuRef.current) return;
        const links = mobileMenuRef.current.querySelectorAll("a");
        gsap.from(links, {
            opacity: 0,
            y: 20,
            stagger: 0.06,
            duration: 0.4,
            ease: "power2.out",
        });
    }, [isMobileOpen]);

    return (
        <header
            ref={navRef}
            className="fixed top-0 z-50 w-full transition-all duration-500"
            style={{
                background: isScrolled ? "rgba(7,7,11,0.85)" : "transparent",
                backdropFilter: isScrolled ? "blur(20px)" : "none",
                borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
            }}
        >
            <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-4 md:px-10">
                {/* Logo */}
                <a href="#top" className="group" aria-label="Miami Wellness Medspa home">
                    <p
                        className="font-display text-xl font-light tracking-wide text-text-primary transition-colors group-hover:text-gold-400 md:text-2xl"
                    >
                        Miami Wellness
                    </p>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gold-400">
                        Medspa
                    </p>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {sectionLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative text-[0.8rem] font-medium tracking-wide text-text-secondary transition-colors hover:text-text-primary"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 sm:flex">
                    <a
                        href={settings.phoneHref}
                        className="btn-outline !px-4 !py-2 !text-[0.65rem]"
                        onClick={() => {
                            trackCtaClick({ location: "header", ctaType: "call", serviceContext: "general" });
                            trackCallClick("header");
                        }}
                    >
                        Call
                    </a>
                    <a
                        href="#book"
                        className="btn-gold !px-5 !py-2 !text-[0.65rem]"
                        onClick={() => {
                            trackCtaClick({ location: "header", ctaType: "booking", serviceContext: "general" });
                            trackBookingStart({ entryPoint: "header", serviceContext: "general" });
                        }}
                    >
                        {settings.booking.ctaLabel}
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
                    onClick={() => setIsMobileOpen((c) => !c)}
                    aria-expanded={isMobileOpen}
                    aria-controls="mobile-nav"
                    aria-label="Toggle menu"
                >
                    <span
                        className="block h-[1px] w-5 transition-all duration-300"
                        style={{
                            background: "#c9a96e",
                            transform: isMobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
                        }}
                    />
                    <span
                        className="block h-[1px] w-5 transition-all duration-300"
                        style={{
                            background: "#c9a96e",
                            opacity: isMobileOpen ? 0 : 1,
                        }}
                    />
                    <span
                        className="block h-[1px] w-5 transition-all duration-300"
                        style={{
                            background: "#c9a96e",
                            transform: isMobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
                        }}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div
                    id="mobile-nav"
                    ref={mobileMenuRef}
                    className="border-t border-white/5 px-6 py-8 lg:hidden"
                    style={{ background: "rgba(7,7,11,0.97)", backdropFilter: "blur(20px)" }}
                >
                    <div className="flex flex-col gap-4">
                        {sectionLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-display text-2xl font-light text-text-primary transition-colors hover:text-gold-400"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-4 flex gap-3">
                            <a href={settings.phoneHref} className="btn-outline flex-1 justify-center !text-[0.65rem]">
                                Call
                            </a>
                            <a href="#book" className="btn-gold flex-1 justify-center !text-[0.65rem]" onClick={() => setIsMobileOpen(false)}>
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
