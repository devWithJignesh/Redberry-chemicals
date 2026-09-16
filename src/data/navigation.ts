import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Industrial Chemicals", href: "/products/industrial-chemicals" },
      { label: "Agro Chemicals", href: "/products/agro-chemicals" },
      { label: "Specialty Chemicals", href: "/products/specialty-chemicals" },
      { label: "Water Treatment Chemicals", href: "/products/water-treatment-chemicals" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
