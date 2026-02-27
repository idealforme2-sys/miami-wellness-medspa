"use client";

export function MarqueeStrip() {
    const items = [
        "Luxury Aesthetics", "✦",
        "Advanced Treatments", "✦",
        "Personalized Care", "✦",
        "Miami Wellness", "✦",
        "Body Sculpting", "✦",
        "Skin Rejuvenation", "✦",
        "Premium Experience", "✦",
        "Natural Results", "✦",
    ];

    return (
        <div
            className="relative overflow-hidden border-y"
            style={{
                borderColor: "rgba(201,169,110,0.2)",
                background: "linear-gradient(90deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.08) 50%, rgba(201,169,110,0.12) 100%)",
                padding: "1rem 0",
            }}
        >
            <div className="marquee-track">
                {[...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className="mx-5 whitespace-nowrap md:mx-8"
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: item === "✦" ? "0.7rem" : "0.8rem",
                            fontWeight: 500,
                            letterSpacing: item === "✦" ? "0" : "0.2em",
                            textTransform: "uppercase",
                            color: item === "✦" ? "var(--gold-300)" : "var(--gold-500)",
                        }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
