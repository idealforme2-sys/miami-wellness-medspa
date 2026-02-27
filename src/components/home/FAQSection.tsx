"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaqItem } from "@/types/site";

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
    items: FaqItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const sorted = [...items].sort((a, b) => a.order - b.order);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-faq-head]", {
                opacity: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });

            gsap.from("[data-faq-item]", {
                opacity: 0,
                y: 30,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: { trigger: "[data-faq-item]", start: "top 85%", once: true },
            });
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="anchor-offset relative"
            style={{ padding: "var(--section-padding) 0" }}
        >
            <div className="section-shell">
                <div data-faq-head className="mb-12">
                    <p className="eyebrow mb-4">FAQ</p>
                    <h2 className="section-title">
                        Common Questions{" "}
                        <span className="text-gradient-gold">Answered</span>
                    </h2>
                    <p className="section-subtitle mt-4">
                        Everything you need to know before your first visit.
                    </p>
                </div>

                <div className="mx-auto max-w-3xl space-y-4">
                    {sorted.map((item) => (
                        <FAQItem key={item.question} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ item }: { item: FaqItem }) {
    const [isOpen, setIsOpen] = useState(false);
    const answerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = answerRef.current;
        if (!el) return;

        if (isOpen) {
            gsap.fromTo(
                el,
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        } else {
            gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        }
    }, [isOpen]);

    return (
        <div
            data-faq-item
            className="overflow-hidden rounded-2xl"
            style={{
                background: "var(--glass-bg)",
                border: isOpen ? "1px solid rgba(201,169,110,0.15)" : "1px solid var(--glass-border)",
                transition: "border-color 0.3s",
            }}
        >
            <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                onClick={() => setIsOpen((o) => !o)}
                aria-expanded={isOpen}
            >
                <span
                    className="text-sm font-medium"
                    style={{ color: isOpen ? "var(--gold-300)" : "var(--text-primary)" }}
                >
                    {item.question}
                </span>
                <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition-all duration-300"
                    style={{
                        background: isOpen ? "rgba(201,169,110,0.15)" : "transparent",
                        border: "1px solid rgba(201,169,110,0.2)",
                        color: "var(--gold-400)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                >
                    +
                </span>
            </button>

            <div ref={answerRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
                <p
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {item.answer}
                </p>
            </div>
        </div>
    );
}
