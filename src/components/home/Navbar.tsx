"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Announcement, SiteSettings } from "@/types/site";
import { trackBookingStart, trackCallClick, trackCtaClick } from "@/lib/analytics";
import { MusicPlayer } from "./MusicPlayer";

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
    announcement?: Announcement;
}

const FALLBACK_ANNOUNCEMENT: Announcement = {
    message: "Now accepting new clients in Miami. Same-week consultations available.",
    label: "Reserve Spot",
    href: "#book",
    active: true,
    order: 0,
};

export function Navbar({ settings, announcement }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const activeAnnouncement = announcement?.active ? announcement : FALLBACK_ANNOUNCEMENT;

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!isMobileOpen || !mobileMenuRef.current) return;
        const links = mobileMenuRef.current.querySelectorAll("a, button");
        gsap.from(links, {
            opacity: 0,
            y: 16,
            stagger: 0.07,
            duration: 0.45,
            ease: "power2.out",
        });
    }, [isMobileOpen]);

    const navBg = isScrolled
        ? "rgba(7,7,11,0.96)"
        : "transparent";
    const navBorder = isScrolled
        ? "1px solid rgba(201,169,110,0.08)"
        : "1px solid transparent";
    const linkColor = "var(--text-secondary)";

    return (
        <header
            className="fixed top-0 z-50 w-full transition-all duration-500"
            style={{
                background: navBg,
                backdropFilter: isScrolled ? "blur(24px)" : "none",
                WebkitBackdropFilter: isScrolled ? "blur(24px)" : "none",
                borderBottom: navBorder,
            }}
        >
            <div
                className="px-4 py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.66rem]"
                style={{
                    background: "linear-gradient(90deg, rgba(201,169,110,0.16), rgba(7,7,11,0.9), rgba(201,169,110,0.16))",
                    borderBottom: "1px solid rgba(201,169,110,0.14)",
                    color: "var(--gold-300)",
                }}
            >
                <span>{activeAnnouncement.message}</span>
                {activeAnnouncement.href && activeAnnouncement.label && (
                    <a
                        href={activeAnnouncement.href}
                        className="ml-3 inline-flex items-center rounded-full px-3 py-1 text-[0.56rem] uppercase tracking-[0.14em]"
                        style={{
                            border: "1px solid rgba(201,169,110,0.25)",
                            color: "var(--gold-200)",
                        }}
                        onClick={() => {
                            trackCtaClick({
                                location: "announcement_bar",
                                ctaType: "booking",
                                serviceContext: "general",
                            });
                        }}
                    >
                        {activeAnnouncement.label}
                    </a>
                )}
            </div>

            <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-5 md:px-10">
                {/* Logo & Music Player */}
                <div className="flex shrink-0 items-center gap-3">
                    <a href="#top" className="group" aria-label="Miami Wellness Medspa home">
                        <p className="font-display text-xl font-light tracking-wide transition-colors"
                            style={{ color: "var(--text-primary)" }}>
                            Miami Wellness
                        </p>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.3em]"
                            style={{ color: "var(--gold-400)" }}>
                            Medspa
                        </p>
                    </a>
                    <MusicPlayer />
                </div>

                {/* Desktop Nav — centered */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {sectionLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="group relative text-[0.8rem] font-medium tracking-wide transition-colors hover:text-text-primary"
                            style={{ color: linkColor }}
                        >
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-gold-400 transition-all duration-300 group-hover:w-full"
                                style={{ background: "var(--gold-400)" }} />
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-3 sm:flex">
                    <a
                        href={settings.phoneHref}
                        className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-gold-400"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => {
                            trackCtaClick({ location: "header", ctaType: "call", serviceContext: "general" });
                            trackCallClick("header");
                        }}
                    >
                        {settings.phoneDisplay}
                    </a>
                    <a
                        href="#book"
                        className="btn-gold !px-5 !py-2.5 !text-[0.65rem]"
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
                    className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] lg:hidden"
                    onClick={() => setIsMobileOpen((c) => !c)}
                    aria-expanded={isMobileOpen}
                    aria-label="Toggle menu"
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="block h-[1px] w-5 transition-all duration-300"
                            style={{
                                background: "var(--gold-400)",
                                transform: isMobileOpen
                                    ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                                        : i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                                            : "none"
                                    : "none",
                                opacity: isMobileOpen && i === 1 ? 0 : 1,
                            }}
                        />
                    ))}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div
                    ref={mobileMenuRef}
                    className="px-6 py-10 lg:hidden"
                    style={{
                        background: "rgba(7,7,11,0.98)",
                        backdropFilter: "blur(24px)",
                        borderTop: "1px solid rgba(201,169,110,0.08)",
                    }}
                >
                    <div className="flex flex-col gap-5">
                        {sectionLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-display text-3xl font-light transition-colors"
                                style={{ color: "var(--text-primary)" }}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div
                            className="mt-6"
                            style={{ borderTop: "1px solid rgba(201,169,110,0.08)", paddingTop: "1.5rem" }}
                        >
                            <a href="#book" className="btn-gold w-full justify-center !text-[0.65rem]"
                                onClick={() => setIsMobileOpen(false)}>
                                {settings.booking.ctaLabel}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
