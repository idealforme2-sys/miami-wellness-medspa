"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackBookingStart, trackEvent } from "@/lib/analytics";
import { BookingConfig } from "@/types/site";

interface BookingWidgetProps {
  booking: BookingConfig;
}

type WidgetState = "loading" | "ready" | "failed";

export function BookingWidget({ booking }: BookingWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [widgetState, setWidgetState] = useState<WidgetState>("loading");

  const hasEmbedCode = Boolean(booking.embedCode?.trim());

  const fallbackLink = useMemo(() => {
    return booking.fallbackUrl || "https://www.vagaro.com/miamiwellnessmedspa";
  }, [booking.fallbackUrl]);

  useEffect(() => {
    if (!hasEmbedCode || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = booking.embedCode || "";

    const timer = window.setTimeout(() => {
      const isLoaded = Boolean(container.children.length);
      const status = isLoaded ? "ready" : "failed";
      setWidgetState(status);
      trackEvent("booking_widget_loaded", { status });
    }, 2400);

    return () => {
      window.clearTimeout(timer);
      container.innerHTML = "";
    };
  }, [booking.embedCode, hasEmbedCode]);

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-3xl p-3 md:p-5"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        {!hasEmbedCode ? (
          <iframe
            title="Miami Wellness Medspa booking"
            src={booking.iframeUrl}
            className="h-[640px] w-full rounded-2xl border-0"
            style={{ background: "#fff" }}
            loading="lazy"
            onLoad={() => {
              if (widgetState !== "ready") {
                setWidgetState("ready");
                trackEvent("booking_widget_loaded", { status: "ready" });
              }
            }}
            onError={() => {
              setWidgetState("failed");
              trackEvent("booking_widget_loaded", { status: "failed" });
            }}
          />
        ) : (
          <div ref={containerRef} className="min-h-[560px] rounded-2xl bg-white" />
        )}

        {widgetState === "loading" && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl text-sm font-medium"
            style={{
              background: "rgba(7,7,11,0.8)",
              color: "var(--gold-400)",
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent"
                style={{
                  borderColor: "rgba(201,169,110,0.3)",
                  borderTopColor: "transparent",
                  animation: "spin-slow 1s linear infinite",
                }}
              />
              Loading secure booking widget...
            </span>
          </div>
        )}
      </div>

      <div
        className="rounded-2xl p-4 text-sm"
        style={{
          background: "rgba(201,169,110,0.03)",
          border: "1px solid rgba(201,169,110,0.08)",
          color: "var(--text-secondary)",
        }}
      >
        <p>
          If the embedded booking does not load on your device, use the direct booking link
          below.
        </p>
        <a
          href={fallbackLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-3 !text-[0.65rem]"
          onClick={() => {
            trackBookingStart({ entryPoint: "booking_fallback_button", serviceContext: booking.serviceContext });
            trackEvent("booking_fallback_opened", { reason: "manual_user_open" });
          }}
        >
          Open booking in new tab
        </a>
      </div>
    </div>
  );
}
