export interface DetailedTreatmentService {
  name: string;
  price?: string;
  duration?: string;
  description: string;
  financingNote?: string;
  highlights?: string[];
}

export interface DetailedTreatmentCategory {
  title: string;
  slug: string;
  intro: string;
  services: DetailedTreatmentService[];
}

export const VAGARO_SERVICES_URL =
  "https://www.vagaro.com/miamiwellnessmedspa/services";

export const detailedTreatmentMenu: DetailedTreatmentCategory[] = [
  {
    title: "Consultations",
    slug: "consultations",
    intro: "Personalized planning sessions to build your next treatment plan.",
    services: [
      {
        name: "New Client Consultation",
        price: "$0.00",
        description:
          "In-depth assessment of your goals and needs to build a tailored treatment approach and clear next steps.",
      },
      {
        name: "Follow Up Consultation",
        price: "$0.00",
        description:
          "Progress review session to refine strategy, answer questions, and keep your plan effective over time.",
      },
    ],
  },
  {
    title: "Medical Weight Loss Program",
    slug: "medical-weight-loss",
    intro: "Medical peptide-guided options designed for sustainable weight support.",
    services: [
      {
        name: "Skinny Shot",
        price: "$99.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Single injection of semaglutide or tirzepatide to support appetite regulation and metabolic wellness.",
      },
      {
        name: "Tirzepatide",
        price: "$0.00",
        description:
          "Advanced medication option for appetite and glucose pathway support as part of medical weight management.",
        highlights: [
          "10 mg/ml (4 injections)",
          "FREE Bioboost Plus (4 injections)",
          "0-25u $350",
          "26u-50u $400",
          "51u-75u $450",
          "76u-100u $500",
        ],
      },
      {
        name: "Semaglutide",
        price: "$0.00",
        description:
          "Injectable treatment that supports fullness and appetite control when paired with lifestyle changes.",
        highlights: [
          "2.5 mg/ml (4 injections)",
          "FREE Bioboost Plus (4 injections)",
          "0-25u $250",
          "26u-50u $300",
          "51u-100u $350",
        ],
      },
    ],
  },
  {
    title: "Functional Medicine - Peptides & Hormone Balance",
    slug: "functional-medicine",
    intro: "Precision wellness support for hormones, recovery, and long-term vitality.",
    services: [
      {
        name: "Hormone Therapy",
        description:
          "Therapy to support hormonal balance and improve symptoms linked to menopause, andropause, and deficiency states.",
      },
      {
        name: "Peptide Therapy",
        description:
          "Targeted peptide protocols to support healing, performance, hormonal health, and age-related optimization.",
      },
      {
        name: "Functional Lab Testing",
        description:
          "Comprehensive biomarker testing to identify root imbalances and guide personalized care strategies.",
      },
      {
        name: "Sport Injury Treatments",
        description:
          "Joint injections with stem cells and natural growth factors to support tissue regeneration and mobility.",
      },
    ],
  },
  {
    title: "IV Drip",
    slug: "iv-drip",
    intro: "Hydration, recovery, energy, and longevity infusions tailored to your goals.",
    services: [
      {
        name: "Pure Hydration",
        price: "$149.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Simple, fast hydration support after heat exposure, travel, or hangovers.",
        highlights: [
          "Rehydration and electrolyte balance",
          "Ingredients: Normal Saline + Sodium, Potassium, Magnesium",
        ],
      },
      {
        name: "Iron ReCharge",
        price: "$299.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Iron-support infusion designed to help improve oxygen transport and reduce fatigue linked to low iron.",
      },
      {
        name: "Methylene Blue Boost",
        price: "$289.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Cognitive and mitochondrial support protocol; often stacked with NAD+ for biohacking-focused plans.",
        highlights: ["Methylene Blue: 0.5-1 mg", "Add-on: NAD+ +$150"],
      },
      {
        name: "Metabolic Burn",
        price: "$309.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Weight and metabolism support blend to optimize fat metabolism and energy usage.",
        highlights: [
          "B12: 1,000 mcg",
          "L-Carnitine: 500 mg",
          "Amino blend: ~500 mg",
        ],
      },
      {
        name: "NAD+",
        description:
          "Longevity and cognitive support infusion for cellular repair, focus, and anti-aging goals.",
        highlights: [
          "NAD+ 250 mg - $389 (1.5 hr)",
          "NAD+ 500 mg - $599 (2-2.5 hr)",
          "NAD+ 750 mg - $749 (3 hr)",
          "NAD+ 1000 mg - $899 (4+ hr)",
        ],
      },
      {
        name: "Powerhouse Drip",
        price: "$289.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Daily energy and metabolism infusion with B-complex, amino blend, B12, and vitamin C.",
      },
      {
        name: "Vitamin C Infusion",
        price: "$289.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "High-dose antioxidant support for immune and skin health.",
        highlights: ["Vitamin C 10g: $229", "Vitamin C 15g: $289"],
      },
      {
        name: "The Classic Myers",
        price: "$279.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Our full-body wellness cocktail for energy, immunity, and stress support.",
      },
      {
        name: "Performance Fuel",
        price: "$299.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Endurance and recovery formula with amino acids, taurine, magnesium, and B vitamins.",
      },
      {
        name: "Libido Lift",
        price: "$279.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Circulation and mood support infusion with arginine and glutathione-based ingredients.",
      },
      {
        name: "Migraine Relief Drip",
        price: "$259.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "For migraine flare or recovery to help reduce tension, nausea, and light sensitivity.",
      },
      {
        name: "Mental Edge",
        price: "$269.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Focus and brain-fog support blend with taurine, ALA, and B vitamins.",
      },
      {
        name: "Radiance Drip",
        price: "$299.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Skin glow and hair or nail support with biotin, vitamin C, and glutathione.",
      },
      {
        name: "Deep Detox",
        price: "$289.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Liver and lymphatic support formula for detox pathway and cellular health.",
      },
      {
        name: "Hormone Harmony Drip",
        price: "$269.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Adrenal, thyroid, PMS, and perimenopause support with restorative minerals and vitamins.",
      },
      {
        name: "Inflammation Reset",
        price: "$289.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Joint and inflammation support formula focused on oxidative stress and pain recovery.",
      },
      {
        name: "Immune Armor",
        price: "$279.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Cold and flu defense infusion with high-dose vitamin C, zinc, and B12.",
      },
    ],
  },
  {
    title: "Injectables",
    slug: "injectables",
    intro: "Aesthetic injectables for contouring, smoothing, and skin quality support.",
    services: [
      {
        name: "Neurotoxin",
        price: "$495.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Wrinkle-softening treatment that relaxes targeted facial muscles for a smoother look.",
      },
      {
        name: "Dermal Fillers",
        price: "$750.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Customizable filler treatment to restore volume and smooth facial lines.",
      },
      {
        name: "Collagen Biostimulators (Sculptra & Radiesse)",
        price: "$850.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Longer-term collagen stimulation to improve skin elasticity and facial structure.",
      },
      {
        name: "Platelet-Rich Plasma (PRP)",
        description:
          "PRP treatment uses concentrated platelets from your blood to support skin and tissue regeneration.",
      },
      {
        name: "Filler Dissolving - Hylenex",
        price: "$150.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Hyaluronidase treatment to dissolve hyaluronic acid-based filler where adjustment is needed.",
      },
      {
        name: "Kybella",
        price: "$600.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "FDA-approved injectable to reduce submental fat under the chin across a series of sessions.",
        highlights: ["Priced per vial", "Treatment performed over multiple sessions"],
      },
    ],
  },
  {
    title: "Booster Injections",
    slug: "booster-injections",
    intro: "Targeted injections for energy, recovery, immunity, and symptom support.",
    services: [
      {
        name: "Zofran Injection",
        price: "$35.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Nausea support for migraines, gut upset, or motion sickness. Ingredient: Ondansetron 4-8 mg (IM).",
      },
      {
        name: "Toradol Injection",
        price: "$35.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Fast pain support for headaches or inflammation. Ingredient: Ketorolac 30 mg (IM).",
      },
      {
        name: "Bioboost+ Shot",
        price: "$45.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Nine amino acids plus B12 to support metabolism, strength, and wellness (SQ).",
      },
      {
        name: "NAD+ Shot",
        price: "$45.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Cellular energy and cognitive support. Ingredient: NAD+ 50 mg (SQ).",
      },
      {
        name: "Immune Boost Shot",
        price: "$50.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Cold or flu support blend with Vitamin C 500 mg, Zinc 10 mg, and Glutathione 200 mg (IM).",
      },
      {
        name: "Taurine Focus Shot",
        price: "$35.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Mental clarity, hydration, and stress support. Ingredient: Taurine 150 mg (IM).",
      },
      {
        name: "Vitamin D3 Sunshine Shot",
        price: "$35.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Mood, bone, and immune support with Vitamin D3 50,000 IU (IM).",
      },
      {
        name: "Glutathione Antioxidant Shot",
        price: "$50.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Detoxification, immune support, and skin-brightening focused injection (IM).",
      },
      {
        name: "Biotin Beauty Shot",
        price: "$40.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Supports stronger hair, clearer skin, and healthier nails.",
      },
      {
        name: "L-Carnitine Solo Shot",
        price: "$35.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "500 mg L-Carnitine injection for fat metabolism and workout recovery support.",
      },
      {
        name: "GAC Metabolic Booster",
        price: "$35.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Glutamine, Arginine, and L-Carnitine blend for metabolic and performance support.",
      },
      {
        name: "B12 Energy Shot",
        price: "$25.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Methylcobalamin 1,000 mcg to support mood, energy, and cognitive performance (IM).",
      },
    ],
  },
  {
    title: "Hydrafacials",
    slug: "hydrafacials",
    intro: "Hydration-forward facial protocols for clear, bright, and balanced skin.",
    services: [
      {
        name: "Signature Hydrafacial",
        price: "$175.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Deep cleansing, exfoliation, and hydration to improve tone, texture, and glow.",
      },
      {
        name: "Deluxe Hydrafacial",
        price: "$225.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Enhanced Hydrafacial protocol for deeper rejuvenation and age-support benefits.",
      },
      {
        name: "Platinum Hydrafacial",
        price: "$275.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Comprehensive treatment targeting acne, pigmentation, and visible aging concerns.",
      },
      {
        name: "Clarifying Back Hydrafacial",
        price: "$300.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Back-focused cleansing and exfoliation to support clearer skin and reduced congestion.",
      },
      {
        name: "LED Light Therapy",
        price: "$50.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Non-invasive light treatment to support collagen activity, healing, and acne or inflammation reduction.",
      },
      {
        name: "Facial With Extractions",
        price: "$150.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Targeted cleansing facial with extractions for clogged pores and congested skin.",
      },
    ],
  },
  {
    title: "Chemical Peels",
    slug: "chemical-peels",
    intro: "Advanced exfoliation treatments to renew tone and texture.",
    services: [
      {
        name: "Advanced Exfoliation - TCA Peels",
        price: "$150.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "TCA peel protocol for acne, pigmentation, fine lines, and smoother skin renewal.",
      },
      {
        name: "The Perfect Derma Peel",
        price: "$300.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Transformative peel treatment to lift dull or damaged layers and reveal brighter skin.",
      },
    ],
  },
  {
    title: "Microneedling",
    slug: "microneedling",
    intro: "Collagen-focused resurfacing treatments for firmer, smoother skin.",
    services: [
      {
        name: "PDRN Microneedling",
        price: "$300.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Salmon DNA-supported microneedling protocol for repair, elasticity, and skin rejuvenation.",
      },
      {
        name: "Stem Cell Microneedling",
        description:
          "Microneedling paired with stem cell support to improve texture, tone, and visible aging signs.",
      },
      {
        name: "Exosome Microneedling",
        price: "$750.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Advanced exosome-enhanced microneedling to boost healing and collagen response.",
      },
      {
        name: "PRP (Plasma) Microneedling",
        price: "$300.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "PRP + microneedling protocol to support collagen production and smoother skin texture.",
      },
    ],
  },
  {
    title: "Endolaser",
    slug: "endolaser",
    intro: "Non-surgical skin-tightening support with advanced laser technology.",
    services: [
      {
        name: "Endolaser Skin Tightening",
        price: "$1200.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Collagen-stimulating laser treatment to improve firmness and skin laxity with minimal downtime.",
      },
    ],
  },
  {
    title: "Morpheus RF Microneedling",
    slug: "morpheus-rf-microneedling",
    intro: "Deep remodeling support by combining microneedling with radiofrequency energy.",
    services: [
      {
        name: "Morpheus8 RF Microneedling",
        price: "$1200.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Minimally invasive RF microneedling to target deep tissue for firmer, smoother skin.",
      },
    ],
  },
  {
    title: "Recovery & Body Sculpting",
    slug: "recovery-and-body-sculpting",
    intro: "Recovery-focused therapies and non-invasive contour support.",
    services: [
      {
        name: "Compression Therapy",
        price: "$29.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Controlled pressure treatment that supports circulation, reduced swelling, and recovery.",
      },
      {
        name: "Hyperbaric Oxygen Therapy (HBOT)",
        price: "$150.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Pressurized oxygen environment to support wound recovery and healing pathways.",
      },
      {
        name: "Infrared Sauna (mPulse)",
        price: "$40.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Infrared sauna session focused on detox support, circulation, and relaxation.",
      },
      {
        name: "Emsculpt Body Sculpting",
        description:
          "Non-invasive body sculpting technology to build muscle while reducing fat.",
      },
    ],
  },
  {
    title: "Laser & Hair Removal",
    slug: "laser-and-hair-removal",
    intro: "Package-based laser sessions for long-term smooth skin results.",
    services: [
      {
        name: "Small Area Package (10 sessions)",
        price: "$500.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Targets upper lip, chin, sideburns, fingers, toes, jawline, and similar small zones.",
      },
      {
        name: "Medium Area Package (10 sessions)",
        price: "$800.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Targets medium zones such as full arms, bikini, full face, neck, lower back, and more.",
      },
      {
        name: "Full Body Package (10 sessions)",
        price: "$1200.00",
        financingNote: "Pay over time for orders of $50.00+.",
        description:
          "Comprehensive package for full legs, Brazilian, full back, chest, and full abdomen.",
      },
    ],
  },
  {
    title: "Permanent Makeup & Aesthetic Enhancements",
    slug: "permanent-makeup",
    intro: "Long-wear beauty enhancements tailored to your natural features.",
    services: [
      {
        name: "Powder Brows",
        description: "Semi-permanent brow enhancement for fuller, softly defined brows.",
      },
      {
        name: "Lip Blush",
        description: "Tinted lip enhancement for balanced shape and natural color boost.",
      },
      {
        name: "Eyeliner Tattoo",
        description: "Long-wear liner definition for everyday eye enhancement.",
      },
      {
        name: "PMU Touch-Up",
        description: "Refinement session to refresh and optimize previous PMU work.",
      },
      {
        name: "PMU Correction",
        description: "Corrective PMU treatment to adjust previous pigment outcomes.",
      },
    ],
  },
  {
    title: "Hair Restoration",
    slug: "hair-restoration",
    intro: "Regenerative approaches to improve scalp health and support fuller hair.",
    services: [
      {
        name: "Stem Cell Hair Restoration",
        description:
          "Regenerative treatment approach that targets follicles to support stronger hair growth.",
      },
      {
        name: "Exosome Hair Therapy",
        description:
          "Exosome-based protocol to revitalize follicles and improve scalp and hair quality.",
      },
    ],
  },
];
