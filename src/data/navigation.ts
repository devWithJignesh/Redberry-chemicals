import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Product",
    href: "/products/insecticides",
    children: [
      { label: "Insecticides", href: "/products/insecticides" },
      { label: "Fungicides", href: "/products/fungicides" },
      { label: "Herbicides", href: "/products/herbicides" },
      { label: "Pgr & Nutrition", href: "/products/pgr-nutrition" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
