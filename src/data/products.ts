import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    slug: "industrial-chemicals",
    name: "Industrial Chemicals",
    category: "Industrial",
    shortDescription:
      "Bulk industrial-grade chemicals for manufacturing, textiles and processing units.",
    description:
      "Our industrial chemicals range is sourced and tested to consistent purity standards, supplying manufacturing, textile and processing units with dependable bulk quantities and on-time delivery.",
    image: "/images/products/industrial-chemicals.jpg",
    features: [
      "Consistent, lab-verified purity",
      "Bulk & drum quantities available",
      "Safety data sheets provided",
      "Pan-Gujarat logistics support",
    ],
  },
  {
    slug: "agro-chemicals",
    name: "Agro Chemicals",
    category: "Agriculture",
    shortDescription:
      "Fertilizer intermediates and crop-input chemicals for the agriculture sector.",
    description:
      "We supply agro-chemical intermediates and crop-input formulations used in fertilizer blending and crop protection, helping regional distributors and manufacturers maintain steady supply.",
    image: "/images/products/agro-chemicals.jpg",
    features: [
      "Fertilizer-grade intermediates",
      "Consistent seasonal supply",
      "Regulatory documentation included",
      "Competitive bulk pricing",
    ],
  },
  {
    slug: "specialty-chemicals",
    name: "Specialty Chemicals",
    category: "Specialty",
    shortDescription:
      "Custom and specialty formulations for niche industrial applications.",
    description:
      "For applications that need a specific grade or formulation, our specialty chemicals division sources and coordinates custom quantities with detailed technical support.",
    image: "/images/products/specialty-chemicals.jpg",
    features: [
      "Custom grade sourcing",
      "Small to mid-batch quantities",
      "Technical consultation included",
      "Strict quality control",
    ],
  },
  {
    slug: "water-treatment-chemicals",
    name: "Water Treatment Chemicals",
    category: "Water Treatment",
    shortDescription:
      "Coagulants, flocculants and treatment chemicals for water & effluent plants.",
    description:
      "Our water treatment range covers coagulants, flocculants and pH-correction chemicals used by municipal and industrial effluent treatment plants across the region.",
    image: "/images/products/water-treatment-chemicals.jpg",
    features: [
      "ETP & STP compatible grades",
      "Bulk supply contracts available",
      "Dosage guidance on request",
      "Reliable repeat-order supply",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
