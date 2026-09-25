export const COMPANY = {
  name: "Redberry Agri Sciences Pvt Ltd",
  shortName: "Redberry Agri Sciences",
  legalName: "Redberry Agri Sciences Pvt Ltd",
  tagline: "Advanced Agro-Sciences & Crop Protection.",
  subtitle: "Agro-Chemicals & Crop Care Solutions",
  foundedYear: 2020,
  phone: "9624486111",
  phoneDisplay: "+91 96244 86111",
  phoneHref: "tel:+919624486111",
  email: "redberryinternationalahmedabad@gmail.com",
  address:
    "Shop No. G-7, Opp. Yash Xerox, Avishkar Complex, Near Grid, Anand & Ahmedabad, Gujarat, India",
  addressShort: "Ahmedabad & Anand, Gujarat, India",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Avishkar+Complex,+Anand,+Gujarat+388001&output=embed",
  hours: {
    weekdays: "9:30 AM – 7:00 PM",
    saturday: "9:30 AM – 3:00 PM",
    sunday: "Closed",
  },
  logo: "/images/logo/logo.png",
  logoEmblem: "/images/logo/logo-emblem.png",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    whatsapp: "https://wa.me/919624486111",
  },
};

export const OWNERS = [
  {
    name: "Khokhani Hardikbhai Kishorbhai",
    position: "CEO & Managing Director",
    phone: "1212211",
    phoneHref: "tel:1212211",
    address: "Ahmedabad & Anand, Gujarat, India",
    image: "/images/CEOImage/1_image.jpeg",
    bio: "Visionary founder driving strategic development, farmer-first innovations, and nationwide agribusiness partnerships since 2020.",
  },
  {
    name: "Maru Nileshkumar Markhibhai",
    position: "CEO & Director of Operations",
    phone: "1212211",
    phoneHref: "tel:1212211",
    address: "Ahmedabad & Anand, Gujarat, India",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    bio: "Head of supply chain, large-scale distributor relationships, seasonal planning, and pan-India logistics management.",
  },
  {
    name: "Kasundra Pankajbhai Chandubhai",
    position: "CEO & Director of Technical Formulations",
    phone: "1212211",
    phoneHref: "tel:1212211",
    address: "Ahmedabad & Anand, Gujarat, India",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Leading chemical purity testing, CIB documentation, advanced laboratory formulations, and quality assurance.",
  },
];

export const SITE_CONFIG = {
  title: `${COMPANY.name} — ${COMPANY.tagline}`,
  description:
    "Redberry Agri Sciences Pvt Ltd (Est. 2020) supplies certified agrochemicals, crop protection formulas, water-soluble fertilizers, and plant biostimulants engineered for maximum yield and soil vitality.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.redberrychemicals.com",
};

export const STATS = [
  { value: 2020, suffix: "", label: "Established & Growing" },
  { value: 300, suffix: "+", label: "Agri Dealers & Partners" },
  { value: 20, suffix: "+", label: "Certified Agro Solutions" },
  { value: 15, suffix: "+", label: "Farming States Served" },
];
