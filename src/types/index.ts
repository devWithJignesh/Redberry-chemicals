export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  // Agrochemical specifications
  technicalName?: string;
  formulation?: string;
  chemicalGroup?: string;
  targetPests?: string;
  recommendedCrops?: string;
  dosage?: string;
  packagingSizes?: string[];
  modeOfAction?: string;
  antidote?: string;
  safetyPrecautions?: string[];
  specifications?: { label: string; value: string }[];
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export interface HeroSlide {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}
