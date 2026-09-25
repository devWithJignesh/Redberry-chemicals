/* ============================================
   MODULE DATA: Home Page Content & Configuration
   FILE: src/modules/website/home/data.js
   ============================================ */

export const HERO_DATA = {
  autoplayIntervalMs: 5000,
  slides: [
    {
      id: 1,
      image: "/images/hero/slide-1.jpg",
      headline: "Rooted in Science, Growing Trust",
      subtext:
        "Redberry Agri Sciences delivers research-driven crop protection and nutrition solutions built for the Indian farmer.",
      ctaLabel: "Explore Products",
      ctaHref: "/products",
    },
    {
      id: 2,
      image: "/images/hero/slide-2.jpg",
      headline: "Protecting Every Field, Every Season",
      subtext:
        "Insecticides and fungicides engineered for reliable performance across Gujarat's diverse cropping conditions.",
      ctaLabel: "View Insecticides",
      ctaHref: "/products/insecticides",
    },
    {
      id: 3,
      image: "/images/hero/slide-3.jpg",
      headline: "500+ Dealers. One Farmer-First Mission.",
      subtext:
        "Since 2020, Redberry has built a trusted distribution network delivering quality inputs directly to growers.",
      ctaLabel: "Get in Touch",
      ctaHref: "/contact",
    },
  ],
};

export const WHY_CHOOSE_US_DATA = {
  badge: "Why Redberry",
  title: "Empowering Farmers with Advanced Agrochemical Solutions",
  subtitle: "We combine chemical precision, extensive field trials, and deep agronomic insights to deliver uncompromised field performance.",
  features: [
    {
      id: "precision",
      title: "Precision Bio-Chemistry",
      description: "Advanced formulation technology ensuring higher bio-efficacy, superior rain-fastness, and prolonged residual control on target pests.",
      icon: "chemistry",
      colorTag: "green",
    },
    {
      id: "qa",
      title: "Strict Quality Assurance",
      description: "Rigorous batch-by-batch testing for purity, active ingredient potency, and emulsion stability meeting global standards.",
      icon: "certificate",
      colorTag: "amber",
    },
    {
      id: "farmer-first",
      title: "Farmer-Centric Economics",
      description: "Cost-effective crop protection packages that reduce cost per acre while maximizing marketable produce and farm profitability.",
      icon: "plant",
      colorTag: "lime",
    },
    {
      id: "pan-india",
      title: "Extensive Distribution",
      description: "A fast-growing pan-India logistics network ensuring timely product availability during critical crop infestation windows.",
      icon: "network",
      colorTag: "teal",
    },
  ],
};

export const PRODUCTS_PREVIEW_DATA = {
  badge: "Product Portfolio",
  title: "Targeted Solutions for Every Crop Stage",
  subtitle: "Browse our comprehensive range of high-performance agrochemicals formulated for Indian soil and climatic conditions.",
  categories: [
    {
      id: "insecticides",
      title: "Insecticides",
      subtitle: "Broad-spectrum & Sucking Pest Control",
      description: "Targeted pest control formulated for reliable knockdown without compromising crop safety.",
      image: "/images/products/redprid.jpg",
      tag: "Best Seller",
      path: "/products/insecticides",
      color: "var(--color-primary)",
    },
    {
      id: "fungicides",
      title: "Fungicides",
      subtitle: "Preventive & Curative Blight Defense",
      description: "Disease management solutions that keep crops healthier through every growth stage.",
      image: "/images/products/bioforce.jpg",
      tag: "High Potency",
      path: "/products/fungicides",
      color: "#0284c7",
    },
    {
      id: "herbicides",
      title: "Herbicides",
      subtitle: "Pre & Post-Emergent Weed Mastery",
      description: "Weed control built for clean fields and stronger, unobstructed crop growth.",
      image: "/images/products/aadhira.png",
      tag: "Targeted Action",
      path: "/products/herbicides",
      color: "#ea580c",
    },
    {
      id: "pgr-nutrition",
      title: "PGR & Plant Nutrition",
      subtitle: "Yield Maximizers & Bio-Stimulants",
      description: "Growth regulators and balanced nutrition for stronger roots, better flowering, and higher yield.",
      image: "/images/products/premium_dummy.jpg",
      tag: "Growth Boost",
      path: "/products/pgr-nutrition",
      color: "#16a34a",
    },
  ],
};

export const CORE_VALUES_DATA = {
  badge: "Our Guiding Principles",
  title: "Core Values That Drive Redberry",
  subtitle: "Every formulation, relationship, and field trial is rooted in our foundational ethical pillars.",
  values: [
    {
      id: "innovation",
      title: "Innovation",
      description: "Constantly refining formulations to meet changing pest, disease and soil conditions.",
      icon: "lightbulb",
    },
    {
      id: "quality",
      title: "Quality",
      description: "Every batch tested for purity and consistency before distribution.",
      icon: "award",
    },
    {
      id: "trust",
      title: "Trust",
      description: "Long-term relationships with dealers built on products that perform, season after season.",
      icon: "handshake",
    },
    {
      id: "sustainability",
      title: "Sustainability",
      description: "Formulations and practices chosen with long-term soil and environmental health in mind.",
      icon: "eco",
    },
    {
      id: "farmer-first",
      title: "Farmer-First",
      description: "Every product decision starts with what actually helps the grower's yield.",
      icon: "farmer",
    },
    {
      id: "integrity",
      title: "Integrity",
      description: "Transparent sourcing, honest labelling, no shortcuts on registration or compliance.",
      icon: "shield-check",
    },
    {
      id: "collaboration",
      title: "Collaboration",
      description: "Working closely with dealers and distributors as partners, not just buyers.",
      icon: "users",
    },
    {
      id: "responsibility",
      title: "Responsibility",
      description: "Accountable for the impact of our products on land, water and community.",
      icon: "globe",
    },
    {
      id: "growth",
      title: "Growth",
      description: "Investing in our team and our network so both grow together, year on year.",
      icon: "trending-up",
    },
  ],
};

// Section 5: Stats / Counters (Home page trust strip)
export const STATS = [
  {
    id: "dealers",
    target: 500,
    suffix: "+",
    value: "500+",
    label: "Dealer Network",
    description: "Active distribution partners across rural markets",
  },
  {
    id: "acres",
    target: 10,
    suffix: "L+",
    value: "10L+",
    label: "Acres Covered",
    description: "Farmland enhanced with Redberry solutions",
  },
  {
    id: "products",
    target: 25,
    suffix: "+",
    value: "25+",
    label: "Products",
    description: "Registered crop protection & nutrition formulations",
  },
  {
    id: "founded",
    target: 2020,
    suffix: "",
    value: "2020",
    label: "Founded",
    description: "Delivering farmer-first science since inception",
  },
];

export const STATS_DATA = STATS;

// Section 4: Testimonials (TODO: replace with real dealer testimonials once collected - placeholder testimonials should not stay live on a production site)
export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Redberry's insecticide range has been consistent every season — that's what keeps me reordering.",
    author: "Dealer, Surendranagar",
    name: "Dealer",
    location: "Surendranagar, Gujarat",
    crop: "Cotton & Groundnut",
    rating: 5,
    avatarInitials: "SN",
  },
  {
    id: 2,
    quote: "Good support from their team whenever we need product information or field guidance.",
    author: "Distributor, Jamnagar",
    name: "Distributor",
    location: "Jamnagar, Gujarat",
    crop: "Cumin & Mustard",
    rating: 5,
    avatarInitials: "JM",
  },
  {
    id: 3,
    quote: "Their fungicide formulations have held up well across different crop cycles.",
    author: "Farmer, Morbi",
    name: "Farmer",
    location: "Morbi, Gujarat",
    crop: "Chilli & Vegetables",
    rating: 5,
    avatarInitials: "MB",
  },
];

export const TESTIMONIALS_DATA = {
  badge: "Real Farmer & Dealer Stories",
  title: "Trusted by Farmers Across India",
  subtitle: "Hear firsthand how Redberry products are transforming agricultural yields and protecting crops from deadly infestations.",
  testimonials: TESTIMONIALS,
};

export const CTA_DATA = {
  badge: "Growth Partnership",
  title: "Partner with Redberry — Let's Grow Together",
  description: "Whether you are a progressive farmer seeking higher crop yields or a distributor expanding your agrochemical portfolio, Redberry is your trusted partner in scientific agribusiness.",
  primaryCta: {
    label: "Become a Distributor",
    path: "/contact",
  },
  secondaryCta: {
    label: "View Product Catalog",
    path: "/products",
  },
};
