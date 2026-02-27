"use client";

import { SiteSettings } from "@/types/site";
import { trackBookingStart, trackCtaClick } from "@/lib/analytics";

interface FooterProps {
    settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
    return (
        <footer
            className="relative"
            style={{
                borderTop: "1px solid rgba(201,169,110,0.08)",
                background: "linear-gradient(180deg, rgba(7,7,11,0) 0%, rgba(7,7,11,1) 100%)",
            }}
        >
            <div className="mx-auto max-w-[1380px] px-6 py-16 md:px-10">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    {/* Brand */}
                    <div>
                        <p className="text-gradient-gold font-display text-3xl font-light">
                            {settings.siteName}
                        </p>
                        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                            {settings.cityStateZip}
                        </p>
                        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                            {settings.brandTagline}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="#book"
                            className="btn-gold !text-[0.6rem]"
                            onClick={() => {
                                trackCtaClick({ location: "footer", ctaType: "booking", serviceContext: "general" });
                                trackBookingStart({ entryPoint: "footer", serviceContext: "general" });
                            }}
                        >
                            {settings.booking.ctaLabel}
                        </a>
                        <a
                            href={settings.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline !text-[0.6rem]"
                        >
                            Instagram
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 text-xs md:flex-row"
                    style={{
                        borderTop: "1px solid rgba(201,169,110,0.06)",
                        color: "var(--text-muted)",
                    }}
                >
                    <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
                    <p className="tracking-wide">
                        Luxury Aesthetics &bull; Miami, Florida
                    </p>
                </div>
            </div>
        </footer>
    );
}
