export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  role: string;
  cropOrCategory: string;
  rate: number; // 0 to 5
  date: string;
  title: string;
  description: string;
  verified: boolean;
  image: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Rameshbhai Patel",
    location: "Anand, Gujarat",
    role: "Commercial Cotton & Tobacco Grower",
    cropOrCategory: "Cotton Protection & PGR",
    rate: 5,
    date: "August 2026",
    title: "Remarkable boll retention and zero pink bollworm issue",
    description:
      "We have been purchasing crop-protection formulas and nitrobenzene boosters from Redberry Agri Sciences since 2021. Their pesticide batches are consistently potent and lab-certified. My cotton harvest yield increased by over 28% this season.",
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-2",
    name: "Vikram Singh Chauhan",
    location: "Kota, Rajasthan",
    role: "Authorized Regional Agro Dealer",
    cropOrCategory: "Wholesale Distribution",
    rate: 5,
    date: "July 2026",
    title: "Fastest seasonal dispatch with 100% genuine COA",
    description:
      "As an agro-dealer supplying across 4 districts, reliable supply during peak sowing windows is critical. The Redberry management team always ensures on-time bulk delivery of 19:19:19 water-soluble fertilizers and Mancozeb fungicides. Farmers ask for Redberry products by name.",
    verified: true,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-3",
    name: "Pravinbhai Kasundra",
    location: "Rajkot, Saurashtra",
    role: "Groundnut & Sesame Farmer",
    cropOrCategory: "Oilseeds & Micronutrients",
    rate: 5,
    date: "September 2026",
    title: "Sulfur 80% WDG and Humic Flakes transformed our soil",
    description:
      "In Saurashtra's saline soil, Redberry’s Potassium Humate flakes and Sulfur WDG solved our root rot problems completely. Oil content in our groundnut harvest tested at an all-time high. Outstanding technical guidance from their agronomy team.",
    verified: true,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-4",
    name: "Suresh Deshmukh",
    location: "Nashik, Maharashtra",
    role: "Grape & Pomegranate Orchardist",
    cropOrCategory: "Fruit Care & Bio-Stimulants",
    rate: 5,
    date: "June 2026",
    title: "Zero residue issues for export-grade grapes",
    description:
      "Redberry’s bio-stimulants and seaweed formulations helped our grape vineyard weather severe climate fluctuations without blossom drop. Pure quality with no heavy-metal contaminants.",
    verified: true,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-5",
    name: "Gurpreet Singh Mann",
    location: "Ludhiana, Punjab",
    role: "Paddy & Basmati Producer",
    cropOrCategory: "Paddy Blast & Grain Nutrition",
    rate: 5,
    date: "August 2026",
    title: "Complete protection against neck blast and stem borers",
    description:
      "Their Tricyclazole and Cartap formulations gave total protection across 80 acres of Basmati rice. The grain lustre and weight at the mandi was exceptional. Truly dependable agricultural chemistry.",
    verified: true,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-6",
    name: "Hasmukhbhai Prajapati",
    location: "Mehsana, Gujarat",
    role: "Chilli & Vegetable Greenhouse Grower",
    cropOrCategory: "Vegetable Foliar & Drip NPK",
    rate: 5,
    date: "May 2026",
    title: "100% water-soluble NPK with zero drip nozzle clogging",
    description:
      "I have used several NPK brands in my polyhouse, but Redberry's 12:61:00 and 00:52:34 dissolve instantly without any residue. Emitters stay clean, and root uptake is rapid.",
    verified: true,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-7",
    name: "Mukesh Choudhary",
    location: "Indore, Madhya Pradesh",
    role: "Soybean & Wheat Progressive Farmer",
    cropOrCategory: "Herbicides & Weed Management",
    rate: 4.8,
    date: "July 2026",
    title: "Outstanding pre-emergence weed control",
    description:
      "Pendimethalin 30% EC from Redberry cleared all competitive weeds for 45 days straight. The crops grew with maximum vigor without nutrient competition. Highly recommended.",
    verified: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "rev-8",
    name: "Dilipbhai Maru",
    location: "Bhavnagar, Gujarat",
    role: "Onion & Garlic Cultivator",
    cropOrCategory: "Crop Yield Boosters",
    rate: 5,
    date: "August 2026",
    title: "Uniform bulb sizing and long storage life",
    description:
      "Redberry’s foliar micronutrient mix with Boron 20% prevented internal bulb decay and significantly boosted our onion storage endurance by 3 months.",
    verified: true,
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
  },
];
