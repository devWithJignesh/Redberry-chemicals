export const COMPANY = {
  name: "Redberry Chemicals",
  tagline: "Purity in Every Reaction.",
  phone: "9624486111",
  phoneDisplay: "+91 96244 86111",
  phoneHref: "tel:+919624486111",
  email: "info@redberrychemicals.com",
  address:
    "Shop No. G-7, Opp. Yash Xerox, Avishkar Complex, Near Grid, Anand, Gujarat 388001, India",
  addressShort: "Anand, Gujarat, India",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Avishkar+Complex,+Anand,+Gujarat+388001&output=embed",
  hours: {
    weekdays: "9:30 AM – 7:00 PM",
    saturday: "9:30 AM – 3:00 PM",
    sunday: "Closed",
  },
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    whatsapp: "https://wa.me/919624486111",
  },
};

export const SITE_CONFIG = {
  title: `${COMPANY.name} — ${COMPANY.tagline}`,
  description:
    "Redberry Chemicals supplies industrial, agro and specialty chemicals with a focus on purity, consistency and reliable bulk distribution across Gujarat and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.redberrychemicals.com",
};

export const STATS = [
  { value: 12, suffix: "+", label: "Years in Business" },
  { value: 300, suffix: "+", label: "Business Partners" },
  { value: 60, suffix: "+", label: "Chemical Products" },
  { value: 15, suffix: "+", label: "States Served" },
];
