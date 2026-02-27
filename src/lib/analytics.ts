interface TrackingParams {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: string, params: TrackingParams = {}): void {
  if (typeof window === "undefined") {
    return;
  }

  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...safeParams });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParams);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, safeParams);
  }
}

export function trackCtaClick(params: {
  location: string;
  ctaType: string;
  serviceContext?: string;
}): void {
  trackEvent("cta_click", {
    location: params.location,
    cta_type: params.ctaType,
    service_context: params.serviceContext ?? "general",
  });
}

export function trackBookingStart(params: {
  entryPoint: string;
  serviceContext?: string;
}): void {
  trackEvent("booking_start", {
    entry_point: params.entryPoint,
    service_context: params.serviceContext ?? "general",
  });
}

export function trackCallClick(location: string): void {
  trackEvent("call_click", { location });
}

export function trackSmsClick(location: string): void {
  trackEvent("sms_click", { location });
}
