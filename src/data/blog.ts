import { BlogPost } from "@/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "choosing-the-right-industrial-chemical-supplier",
    title: "Choosing the Right Industrial Chemical Supplier",
    excerpt:
      "Purity, documentation and delivery reliability — what to check before you commit to a bulk chemical supplier.",
    content:
      "Purity, documentation and delivery reliability — what to check before you commit to a bulk chemical supplier. A good supplier provides lab-verified certificates of analysis, transparent safety data sheets, and a track record of on-time delivery even during seasonal demand spikes.",
    date: "2026-06-12",
    author: "Redberry Team",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "water-treatment-chemical-basics",
    title: "Water Treatment Chemicals: A Quick Primer",
    excerpt:
      "Coagulants, flocculants and pH correction — an overview of the chemicals behind clean water processing.",
    content:
      "Coagulants, flocculants and pH correction — an overview of the chemicals behind clean water processing. Choosing the right dosage and grade for your ETP or STP setup makes a measurable difference in treatment efficiency and operating cost.",
    date: "2026-05-03",
    author: "Redberry Team",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "seasonal-planning-for-agro-chemical-supply",
    title: "Seasonal Planning for Agro-Chemical Supply",
    excerpt:
      "Why forward planning your fertilizer intermediate orders saves cost and avoids stock-outs during peak season.",
    content:
      "Why forward planning your fertilizer intermediate orders saves cost and avoids stock-outs during peak season. Booking ahead of the sowing season locks in pricing and guarantees allocation before regional demand peaks.",
    date: "2026-03-21",
    author: "Redberry Team",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
