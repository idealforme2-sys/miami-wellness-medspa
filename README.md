# Miami Wellness Medspa Website

Flagship single-page medspa site built with Next.js App Router, Tailwind CSS v4, GSAP animations, Sanity CMS schemas, and Vagaro hybrid booking.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 with custom design tokens
- GSAP + ScrollTrigger for premium, performance-safe motion
- Sanity CMS schemas + CLI workflow
- Analytics-ready event contract for GA4 / GTM / Meta Pixel

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Run the site:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Sanity CMS

- Configure these env vars:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
- Run Sanity Studio standalone:

```bash
npm run sanity:dev
```

## Booking Integration

Hybrid Vagaro implementation:

- Primary: in-page iframe/embed widget
- Fallback: direct booking link in new tab

Relevant env vars:

- `NEXT_PUBLIC_VAGARO_BOOKING_URL`
- `NEXT_PUBLIC_VAGARO_IFRAME_URL`
- `NEXT_PUBLIC_VAGARO_EMBED_CODE` (optional custom widget snippet)

## Analytics Event Contract

The site emits these events through `window.dataLayer`, and mirrors to `gtag` / `fbq` when present:

- `cta_click`
- `booking_widget_loaded`
- `booking_start`
- `booking_fallback_opened`
- `call_click`
- `sms_click`
- `review_outbound_click`

## SEO

- Metadata + OpenGraph + Twitter tags
- `robots.ts` and `sitemap.ts` metadata routes
- LocalBusiness / HealthAndBeautyBusiness JSON-LD

## Content Fallback

If Sanity env vars are missing, the site uses typed local fallback data from `src/lib/site-defaults.ts` so the page remains fully functional.
