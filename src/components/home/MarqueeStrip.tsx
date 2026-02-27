"use client";

export function MarqueeStrip() {
    const items = [
        "Luxury Aesthetics",
        "✦",
        "Advanced Treatments",
        "✦",
        "Personalized Care",
        "✦",
        "Miami Wellness",
        "✦",
        "Body Sculpting",
        "✦",
        "Skin Rejuvenation",
        "✦",
        "Premium Experience",
        "✦",
        "Natural Results",
        "✦",
    ];

    return (
        <div
            className="relative overflow-hidden border-y"
            style={{
                borderColor: "rgba(201,169,110,0.08)",
                background: "rgba(201,169,110,0.02)",
                padding: "1.25rem 0",
            }}
        >
            <div className="marquee-track">
                {[...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className={`mx-4 whitespace-nowrap font-display text-lg tracking-wider md:mx-8 md:text-xl ${item === "✦" ? "text-gold-300 text-sm" : ""
                            }`}
                        style={{ color: item === "✦" ? "var(--gold-300)" : "var(--text-muted)" }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
