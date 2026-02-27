import { SiteContent } from "@/types/site";

export const defaultSiteContent: SiteContent = {
  siteSettings: {
    locale: "en",
    siteName: "Miami Wellness Medspa",
    brandTagline: "Modern aesthetic medicine with personalized care in Miami",
    phoneDisplay: "+1 786 624 7723",
    phoneHref: "tel:+17866247723",
    smsHref: "sms:+17866247723",
    fullAddress: "9560 Southwest 107th Avenue, STE 108A, Miami, FL 33176",
    cityStateZip: "Miami, FL 33176",
    mapEmbedUrl:
      "https://www.google.com/maps?q=9560+Southwest+107th+Avenue+STE+108A,+Miami,+FL+33176&output=embed",
    mapUrl:
      "https://www.google.com/maps/place/Miami+Wellness+Medspa/data=!4m2!3m1!1s0x88d9c765c54d996d:0x7709e20532400a37?sa=X&ved=1t:242&ictx=111",
    instagramUrl: "https://www.instagram.com/miamiwellnessmedspa/",
    googleReviewsUrl:
      "https://www.google.com/maps/place/Miami+Wellness+Medspa/data=!4m2!3m1!1s0x88d9c765c54d996d:0x7709e20532400a37?sa=X&ved=1t:242&ictx=111",
    classpassUrl: "https://classpass.com/studios/miami-wellness-medspa",
    vagaroUrl: "https://www.vagaro.com/miamiwellnessmedspa",
    hours: [
      { day: "Monday", hours: "9:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
      { day: "Friday", hours: "9:00 AM - 6:00 PM" },
      { day: "Saturday", hours: "By appointment" },
      { day: "Sunday", hours: "Closed" },
    ],
    disclaimer:
      "All treatments require clinical consultation to confirm candidacy, pricing, and expected outcomes.",
    booking: {
      embedCode: process.env.NEXT_PUBLIC_VAGARO_EMBED_CODE,
      fallbackUrl: process.env.NEXT_PUBLIC_VAGARO_BOOKING_URL || "https://www.vagaro.com/miamiwellnessmedspa",
      iframeUrl:
        process.env.NEXT_PUBLIC_VAGARO_IFRAME_URL ||
        "https://www.vagaro.com/booking/miamiwellnessmedspa",
      ctaLabel: "Book Now",
      serviceContext: "general_consult",
    },
  },
  heroBlock: {
    eyebrow: "Miami Wellness Medspa",
    heading: "Refined Results. Advanced Aesthetics. Personalized Plans.",
    subheading:
      "A modern medspa experience focused on natural-looking outcomes with treatment plans tailored to your goals.",
    primaryCtaLabel: "Book Consultation",
    primaryCtaHref: "#book",
    secondaryCtaLabel: "Call Now",
    secondaryCtaHref: "tel:+17866247723",
  },
  serviceCategories: [
    {
      title: "Face",
      slug: "face",
      order: 1,
      icon: "Sparkles",
      seoIntro: "Targeted facial treatments that support smoother texture and brighter tone.",
    },
    {
      title: "Body Sculpting",
      slug: "body-sculpting",
      order: 2,
      icon: "Waves",
      seoIntro: "Non-surgical body contouring protocols designed around your goals.",
    },
    {
      title: "Advanced Devices",
      slug: "advanced-devices",
      order: 3,
      icon: "Cpu",
      seoIntro: "Technology-led modalities that enhance precision and consistency.",
    },
  ],
  serviceItems: [
    {
      name: "Signature Glow Facial",
      slug: "signature-glow-facial",
      categorySlug: "face",
      duration: "60 min",
      startingPrice: "From $149",
      bestFor: "Dull tone, congestion, uneven texture",
      shortDescription:
        "A customized medical-grade facial designed to refresh, hydrate, and smooth skin.",
      benefits: ["Deep cleanse", "Gentle exfoliation", "Immediate radiance"],
      contraindicationNote: "Consultation required for active skin conditions.",
      order: 1,
    },
    {
      name: "Injectables Consultation",
      slug: "injectables-consultation",
      categorySlug: "face",
      duration: "30 min",
      startingPrice: "Consult required",
      bestFor: "Expression lines and facial balancing",
      shortDescription:
        "Personalized injectable planning with a conservative, natural-first approach.",
      benefits: ["Facial assessment", "Custom dosage planning", "Maintenance roadmap"],
      order: 2,
    },
    {
      name: "Fat Dissolve Program",
      slug: "fat-dissolve-program",
      categorySlug: "body-sculpting",
      duration: "45 min",
      startingPrice: "From $299",
      bestFor: "Localized stubborn fat pockets",
      shortDescription:
        "Targeted treatment plan to support contour improvement in select areas.",
      benefits: ["Zone targeting", "Series planning", "Progress tracking"],
      contraindicationNote: "Medical screening required.",
      order: 3,
    },
    {
      name: "Body Contouring Consultation",
      slug: "body-contouring-consultation",
      categorySlug: "body-sculpting",
      duration: "30 min",
      startingPrice: "Complimentary with package",
      bestFor: "Waistline, abdomen, and contour refinement",
      shortDescription:
        "Assessment-led protocol selection for non-invasive body contouring treatments.",
      benefits: ["Goal-based planning", "Timeline estimates", "Package guidance"],
      order: 4,
    },
    {
      name: "Device-Based Skin Tightening",
      slug: "device-based-skin-tightening",
      categorySlug: "advanced-devices",
      duration: "50 min",
      startingPrice: "From $249",
      bestFor: "Laxity and texture support",
      shortDescription:
        "High-performance technology approach to support firmer, smoother skin over time.",
      benefits: ["Precision settings", "Progressive outcomes", "Minimal downtime"],
      contraindicationNote: "Suitability confirmed during consultation.",
      order: 5,
    },
    {
      name: "Microneedling Refresh",
      slug: "microneedling-refresh",
      categorySlug: "advanced-devices",
      duration: "60 min",
      startingPrice: "From $275",
      bestFor: "Texture, pores, and tone support",
      shortDescription:
        "Controlled collagen stimulation treatment for smoother, healthier-looking skin.",
      benefits: ["Collagen support", "Texture refinement", "Recovery protocol guidance"],
      order: 6,
    },
  ],
  testimonials: [
    {
      quote:
        "Super professional team and a very clean, calming clinic. My treatment plan was explained clearly and results felt natural.",
      source: "Google",
      reviewerName: "Verified Google Reviewer",
      date: "2025-11-14",
      rating: 5,
      sourceUrl:
        "https://www.google.com/maps/place/Miami+Wellness+Medspa/data=!4m2!3m1!1s0x88d9c765c54d996d:0x7709e20532400a37?sa=X&ved=1t:242&ictx=111",
      order: 1,
    },
    {
      quote:
        "I booked through ClassPass and had a great first visit. Staff were attentive and made me feel comfortable the whole time.",
      source: "ClassPass",
      reviewerName: "ClassPass Client",
      date: "2025-09-09",
      rating: 5,
      sourceUrl: "https://classpass.com/studios/miami-wellness-medspa",
      order: 2,
    },
    {
      quote:
        "Easy booking process, beautiful office, and thoughtful follow-up. Great experience from start to finish.",
      source: "Vagaro",
      reviewerName: "Vagaro Guest",
      date: "2025-10-03",
      rating: 5,
      sourceUrl: "https://www.vagaro.com/miamiwellnessmedspa",
      order: 3,
    },
  ],
  faqItems: [
    {
      question: "How do I know which treatment is right for me?",
      answer:
        "Every treatment starts with a consultation so we can assess your goals, timeline, and candidacy before recommending a plan.",
      order: 1,
    },
    {
      question: "Do your treatments have downtime?",
      answer:
        "Downtime varies by treatment. We explain expected recovery, aftercare, and timing during consultation so you can plan confidently.",
      order: 2,
    },
    {
      question: "How do I book an appointment?",
      answer:
        "Use the in-page booking widget or tap Book Now to open Vagaro in a new tab. You can also call us directly for assistance.",
      order: 3,
    },
    {
      question: "Where are you located?",
      answer:
        "We are located at 9560 Southwest 107th Avenue, STE 108A, Miami, FL 33176.",
      order: 4,
    },
  ],
  galleryItems: [
    {
      title: "Jawline Refinement",
      treatmentType: "Injectables",
      disclaimer: "Client-consented results. Individual outcomes vary.",
      altText: "Before and after placeholder for jawline refinement",
      order: 1,
    },
    {
      title: "Texture Improvement",
      treatmentType: "Microneedling",
      disclaimer: "Client-consented results. Individual outcomes vary.",
      altText: "Before and after placeholder for texture improvement",
      order: 2,
    },
    {
      title: "Body Contour Progress",
      treatmentType: "Body Sculpting",
      disclaimer: "Client-consented results. Individual outcomes vary.",
      altText: "Before and after placeholder for body contour progress",
      order: 3,
    },
  ],
  announcements: [
    {
      message: "Now accepting new clients in Miami. Same-week consultations available.",
      label: "Reserve Spot",
      href: "#book",
      active: true,
      order: 1,
    },
  ],
  stats: [
    {
      label: "Consults Completed",
      value: 1200,
      suffix: "+",
      description: "Personalized treatment planning sessions",
    },
    {
      label: "Average Rating",
      value: 5,
      suffix: "/5",
      description: "Across highlighted review platforms",
    },
    {
      label: "Experience Promise",
      value: 100,
      suffix: "%",
      description: "Focus on comfort, clarity, and natural outcomes",
    },
  ],
  whyChooseUsBullets: [
    "Personalized treatment plans designed around your goals and timeline.",
    "Advanced, technology-led treatments selected for precision and consistency.",
    "Clear consultation process with transparent next steps and realistic expectations.",
    "Convenient Miami location with direct booking, call, and SMS support.",
  ],
};
