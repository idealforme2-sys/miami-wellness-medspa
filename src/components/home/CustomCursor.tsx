"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Check for touch device
        if (window.matchMedia("(hover: none)").matches) return;

        const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
        const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
        const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power2.out" });
        const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power2.out" });

        const onMove = (e: MouseEvent) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xRing(e.clientX);
            yRing(e.clientY);
        };

        const onEnterInteractive = () => document.body.classList.add("cursor-hover");
        const onLeaveInteractive = () => document.body.classList.remove("cursor-hover");

        const addInteractiveListeners = () => {
            document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
                el.addEventListener("mouseenter", onEnterInteractive);
                el.addEventListener("mouseleave", onLeaveInteractive);
            });
        };

        window.addEventListener("mousemove", onMove);
        addInteractiveListeners();

        const observer = new MutationObserver(addInteractiveListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            observer.disconnect();
            document.body.classList.remove("cursor-hover");
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}
