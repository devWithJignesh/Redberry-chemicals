/* ============================================
   MODULE DATA: Contact Page Content & Config
   FILE: src/modules/website/contact/data.js
   ============================================ */

export const CONTACT_PAGE_HEADER = {
  badge: "Get in Touch",
  title: "Connect with Our Agricultural Experts",
  subtitle: "Have questions about crop protection, dealership inquiries, bulk orders, or product dosages? Our technical team is here to assist you.",
};

export const CONTACT_CARDS_DATA = [
  {
    id: "headquarters",
    title: "Registered Office",
    description: "Shop No, G-7, Opp-Yash Zerox, Aviskar Complex, Near Grid, Anand, Gujarat 388001",
    icon: "location",
    actionLabel: "View on Map",
    actionHref: "https://maps.google.com/?q=Aviskar+Complex+Near+Grid+Anand+Gujarat+388001",
  },
  {
    id: "phone",
    title: "Customer & Technical Support",
    description: "+91 96244 86111",
    subtext: "Mon - Sat: 9:00 AM - 6:30 PM",
    icon: "phone",
    actionLabel: "Call Directly",
    actionHref: "tel:+919624486111",
  },
  {
    id: "email",
    title: "Official Email Correspondence",
    description: "redberryinternationalahmedabad@gmail.com",
    subtext: "Fast email turnaround within 24 hours",
    icon: "email",
    actionLabel: "Send Email",
    actionHref: "mailto:redberryinternationalahmedabad@gmail.com",
  },
];

export const INQUIRY_TYPES = [
  "Dealership & Distribution Inquiry",
  "Product Advisory & Technical Dosage",
  "Bulk Commercial Farming Order",
  "Institutional / Export Tie-up",
  "General Feedback & Support",
];
