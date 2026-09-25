import { Product } from "@/types";

export const INSECTICIDES: Product[] = [
  {
    slug: "aadhira",
    name: "AADHIRA",
    category: "Insecticides",
    technicalName: "Thiamethoxam 25% WG",
    formulation: "Water Dispersible Granules (WG)",
    chemicalGroup: "Neonicotinoid",
    shortDescription:
      "Broad-spectrum systemic insecticide for rapid control of sucking and chewing insect pests.",
    description:
      "Aadhira is a modern second-generation neonicotinoid systemic insecticide with contact, stomach, and systemic activity. It is rapidly absorbed by the plant foliage and roots, translocating acropetally through the xylem to protect newly developing foliage and shoots. Delivers superior crop greening and robust yield protection.",
    image: "/images/products/aadhira.png",
    features: [
      "Excellent systemic and translaminar activity",
      "Fast action: pests cease feeding within a few hours of ingestion",
      "Provides long duration protection against destructive sucking pests",
      "Distinct 'Phytotonic' greening effect promotes vigorous crop growth",
      "Rain-fast within 2 hours of application",
      "Safe for natural predators when used as per label recommendations",
    ],
    targetPests: "Stem Borer, Gall Midge, Leaf Folder, Brown Planthopper (BPH), Whitebacked Planthopper (WBPH), Aphids, Jassids, Thrips, Whitefly, Mosquito Bug",
    recommendedCrops: "Paddy (Rice), Cotton, Okra, Mango, Wheat, Mustard, Tomato, Brinjal, Tea, Citrus",
    dosage: "80 - 100 gm per acre dissolved in 150 - 200 Litres of clean water",
    packagingSizes: ["100 gm", "250 gm", "500 gm", "1 Kg"],
    modeOfAction:
      "Acts by interfering with nicotinic acetylcholine receptors (nAChR) in the central nervous system of target insects, blocking neural transmission and causing immediate feeding stoppage and eventual death.",
    antidote: "No specific antidote is known. Treat symptomatically with gastric lavage and supportive therapy.",
    safetyPrecautions: [
      "Wear protective clothing, face shield, and rubber gloves during handling.",
      "Do not spray during peak honeybee foraging hours or windy conditions.",
      "Store in original tightly sealed containers away from food, feed, and children.",
      "Wash contaminated skin thoroughly with plenty of soap and running water.",
    ],
    specifications: [
      { label: "Active Ingredient", value: "Thiamethoxam 25% w/w" },
      { label: "Formulation Type", value: "Water Dispersible Granules (WG)" },
      { label: "Chemical Family", value: "Neonicotinoid (IRAC Group 4A)" },
      { label: "Physical Appearance", value: "Light brown free-flowing granules" },
      { label: "Standard Dilution", value: "0.5 gm / Litre of water" },
      { label: "Pre-Harvest Interval (PHI)", value: "14 - 21 Days depending on crop" },
    ],
  },
  {
    slug: "bitcoin",
    name: "BITCOIN",
    category: "Insecticides",
    technicalName: "Emamectin Benzoate 5% SG",
    formulation: "Soluble Granules (SG)",
    chemicalGroup: "Avermectin / Macrocyclic Lactone",
    shortDescription:
      "Modern biological-origin insecticide delivering high-potency control of destructive caterpillars and lepidopteran borers.",
    description:
      "Bitcoin is an advanced soluble granule insecticide derived from the natural soil microorganism Streptomyces avermitilis. It exhibits powerful stomach and contact activity with rapid translaminar leaf penetration. Targets caterpillars and worms inside foliage and fruits, paralyzing pests within hours and ending crop damage.",
    image: "/images/products/bitcoin.png",
    features: [
      "Naturally derived fermentation active with excellent safety profile",
      "Penetrates leaf cuticle forming a lethal reservoir within plant tissue",
      "Controls all instars of destructive caterpillars including resistant strains",
      "Low dosage requirement with zero residue concerns at harvest",
      "Rapid cessation of caterpillar feeding within 2 to 4 hours",
      "Compatible with integrated pest management (IPM) systems",
    ],
    targetPests: "Bollworms, Fruit & Shoot Borer, Diamondback Moth (DBM), Pod Borer, Spodoptera, Semilooper, Leaf Miner, Thrips",
    recommendedCrops: "Cotton, Cabbage, Chilli, Tomato, Brinjal, Okra, Chickpea, Pigeon Pea, Grapes",
    dosage: "80 - 100 gm per acre in 200 Litres of water",
    packagingSizes: ["50 gm", "100 gm", "250 gm", "500 gm", "1 Kg"],
    modeOfAction:
      "Stimulates the release of neurotransmitter GABA (gamma-aminobutyric acid), increasing membrane permeability to chloride ions. This induces irreversible muscular relaxation and neuromuscular paralysis in target larvae.",
    antidote: "Administer glutamate agonists or perform gastric lavage. Avoid administering barbiturates.",
    safetyPrecautions: [
      "Ensure uniform coverage on both upper and lower leaf surfaces.",
      "Do not apply when rain is imminent within 2 hours.",
      "Dispose of empty packaging responsibly according to local environmental regulations.",
    ],
    specifications: [
      { label: "Active Ingredient", value: "Emamectin Benzoate 5% w/w" },
      { label: "Formulation Type", value: "Soluble Granules (SG)" },
      { label: "Chemical Family", value: "Avermectin (IRAC Group 6)" },
      { label: "Solubility", value: "Readily soluble in water without residue" },
      { label: "Application Rate", value: "0.4 - 0.5 gm / Litre" },
      { label: "Pre-Harvest Interval (PHI)", value: "3 - 5 Days" },
    ],
  },
  {
    slug: "chlocyp",
    name: "CHLOCYP 505",
    category: "Insecticides",
    technicalName: "Chlorpyriphos 50% + Cypermethrin 5% EC",
    formulation: "Emulsifiable Concentrate (EC)",
    chemicalGroup: "Organophosphate + Synthetic Pyrethroid Combo",
    shortDescription:
      "Synergistic dual-active insecticide with lightning-fast knockdown punch and extended residual barrier.",
    description:
      "Chlocyp 505 combines the proven power of Chlorpyriphos and Cypermethrin in an optimal 10:1 ratio. The combination delivers immediate knockdown through multiple modes of entry: contact, ingestion, and vapour action. Extremely effective against complex insect complexes where single chemicals fall short.",
    image: "/images/products/chlocyp.png",
    features: [
      "Double power: Organophosphate plus Pyrethroid synergy",
      "Triple action: Contact, stomach poison, and vapour penetration",
      "Rapid knockdown of adults and nymphs with long-lasting residual film",
      "Ovicidal action kills insect eggs before hatching",
      "Breaks insect resistance developed against single active molecules",
      "Economical cost per acre with wide crop safety window",
    ],
    targetPests: "Spotted Bollworm, Pink Bollworm, American Bollworm, Aphids, Jassids, Thrips, Whitefly, Cutworms, Caterpillars",
    recommendedCrops: "Cotton, Paddy, Groundnut, Soybean, Mustard, Vegetable Crops",
    dosage: "350 - 400 ml per acre diluted in 200 Litres of water",
    packagingSizes: ["100 ml", "250 ml", "500 ml", "1 Litre", "5 Litres"],
    modeOfAction:
      "Chlorpyriphos irreversibly inhibits acetylcholinesterase (AChE) causing toxic acetylcholine accumulation. Cypermethrin keeps sodium channels open in nerve membranes. Together they cause violent nervous convulsions followed by rapid death.",
    antidote: "Atropine sulphate is the specific antidote for organophosphates. Administer PAM (Pralidoxime) under medical supervision.",
    safetyPrecautions: [
      "Avoid inhaling spray mist and skin contact.",
      "Never eat, drink, or smoke while spraying agrochemicals.",
      "Keep livestock and farm animals away from treated areas for at least 48 hours.",
    ],
    specifications: [
      { label: "Active Ingredients", value: "Chlorpyriphos 50% + Cypermethrin 5% EC" },
      { label: "Formulation Type", value: "Emulsifiable Concentrate (EC)" },
      { label: "Specific Gravity", value: "1.08 - 1.12 g/ml" },
      { label: "Flash Point", value: "> 38°C" },
      { label: "Dilution Rate", value: "2 ml / Litre of water" },
      { label: "Pre-Harvest Interval", value: "15 - 20 Days" },
    ],
  },
  {
    slug: "chlofos",
    name: "CHLOFOS 20",
    category: "Insecticides",
    technicalName: "Chlorpyrifos 20% EC",
    formulation: "Emulsifiable Concentrate (EC)",
    chemicalGroup: "Organophosphate",
    shortDescription:
      "Time-tested heavy-duty contact, stomach, and vapour action insecticide for crop protection and termite control.",
    description:
      "Chlofos 20 is a benchmark organophosphate pesticide widely respected for agricultural crop protection and non-crop pre/post-construction subterranean termite proofing. Its vapour action penetrates deep crevices, soil channels, and dense plant foliage to exterminate hidden destructive pests.",
    image: "/images/products/chlofos.png",
    features: [
      "Dominant vapour phase penetrates soil, cracks, and dense foliar canopies",
      "Outstanding efficacy against underground root grubs and termites",
      "Broad spectrum protection against foliar, stem, and soil insects",
      "Strong repellent and deterrent effect against invasive pests",
      "Cost-effective solution trusted by farmers for over 3 decades",
      "Suitable for soil drenching, broadcasting, and foliar spray",
    ],
    targetPests: "Termites (White Ants), Stem Borer, Green Leafhopper, Rice Hispa, Root Grub, Cutworms, Pyrilla, Ground Beetle",
    recommendedCrops: "Paddy, Sugarcane, Cotton, Groundnut, Citrus, Tea, Soil & Timber Protection",
    dosage: "500 - 1000 ml per acre for foliage / 50 ml per Litre for termite eradication",
    packagingSizes: ["250 ml", "500 ml", "1 Litre", "5 Litres", "20 Litres"],
    modeOfAction:
      "Inhibits acetylcholinesterase enzyme at neuromuscular junctions, disrupting nerve impulse transmission throughout the central and peripheral nervous system of the insect.",
    antidote: "Atropinize the patient immediately with 2-4 mg IV Atropine Sulphate. Repeat every 10-15 minutes until signs of atropinization appear.",
    safetyPrecautions: [
      "Do not apply near aquatic bodies or fish culture tanks.",
      "Wear full protective rubber suit, boots, and organic vapour mask during termite treatments.",
    ],
    specifications: [
      { label: "Active Ingredient", value: "Chlorpyrifos 20% w/w" },
      { label: "Formulation Type", value: "Emulsifiable Concentrate (EC)" },
      { label: "Odor", value: "Characteristic aromatic mercaptan odor" },
      { label: "Flash Point", value: "42°C" },
      { label: "Application Rate", value: "2.5 - 4 ml / Litre" },
      { label: "Shelf Life", value: "2 Years from manufacturing date" },
    ],
  },
  {
    slug: "redthrina",
    name: "REDTHRINA",
    category: "Insecticides",
    technicalName: "Lambda-Cyhalothrin 5% EC",
    formulation: "Emulsifiable Concentrate (EC)",
    chemicalGroup: "Synthetic Pyrethroid (Type II)",
    shortDescription:
      "High-potency pyrethroid delivering instantaneous knockdown and powerful anti-feeding protection against chewing and sucking insects.",
    description:
      "Redthrina is a modern Type II synthetic pyrethroid with rapid knockdown capability and extended residual efficacy. Formulated with premium adjuvant surfactants, it provides excellent leaf spread and cuticle penetration, resisting rain wash-off within an hour of application.",
    image: "/images/products/redthrina.jpg",
    features: [
      "Lightning knockdown action upon insect contact",
      "Strong anti-feeding and repellent action",
      "Rain-fast within 1 hour due to high lipophilicity",
      "Effective at remarkably low dosage rates per hectare",
      "Wide safety window on high-value fruit and vegetable crops",
    ],
    targetPests: "Bollworms, Jassids, Thrips, Stem Borer, Leaf Folder, Pod Borer, Fruit Borer",
    recommendedCrops: "Cotton, Paddy, Tomato, Brinjal, Chilli, Mango, Onion, Pulses",
    dosage: "150 - 200 ml per acre in 150 - 200 Litres of water",
    packagingSizes: ["100 ml", "250 ml", "500 ml", "1 Litre"],
    modeOfAction:
      "Disrupts voltage-gated sodium channels in nerve membranes, prolonging nerve cell depolarization and inducing paralysis.",
    antidote: "Symptomatic treatment. Administer anticonvulsants if convulsions occur. Vitamin E oil application relieves skin paresthesia.",
    safetyPrecautions: [
      "Avoid contact with skin, eyes, and clothing.",
      "Wash hands thoroughly after handling and spraying.",
    ],
    specifications: [
      { label: "Active Ingredient", value: "Lambda-Cyhalothrin 5% EC" },
      { label: "Formulation Type", value: "Emulsifiable Concentrate" },
      { label: "Concentration", value: "50 g/L active substance" },
      { label: "Pre-Harvest Interval", value: "7 - 14 Days" },
    ],
  },
  {
    slug: "redprid",
    name: "REDPRID PRO",
    category: "Insecticides",
    technicalName: "Imidacloprid 17.8% SL",
    formulation: "Soluble Liquid (SL)",
    chemicalGroup: "Chloronicotinyl (Neonicotinoid)",
    shortDescription:
      "World-class systemic specialist for relentless control of aphids, jassids, thrips, and sucking pest vectors.",
    description:
      "Redprid Pro is an ultra-reliable systemic soluble liquid insecticide engineered to combat invasive sap-sucking pests and prevent viral plant diseases transmitted by insect vectors. Its acropetal systemic mobility ensures uniform distribution to emerging leaves, buds, and shoots.",
    image: "/images/products/redprid.jpg",
    features: [
      "World-standard systemic chemistry for sucking pests",
      "Super-low dosage delivers high economic return to growers",
      "Prevents transmission of devastating viral diseases by sucking vectors",
      "Effective both as foliar spray and seed dressing / nursery drench",
      "Long-lasting residual protection against multiple insect generations",
    ],
    targetPests: "Aphids, Jassids, Whitefly, Thrips, Brown Planthopper, Termites, Hopper burn complex",
    recommendedCrops: "Cotton, Paddy, Chilli, Sugarcane, Sunflower, Okra, Mango, Groundnut",
    dosage: "40 - 50 ml per acre in 150 - 200 Litres of water",
    packagingSizes: ["50 ml", "100 ml", "250 ml", "500 ml", "1 Litre"],
    modeOfAction:
      "Irreversibly binds to post-synaptic nicotinic acetylcholine receptors, preventing normal cholinergic neurotransmission and resulting in insect death.",
    antidote: "No specific antidote. Treat symptomatically with gastric lavage.",
    safetyPrecautions: [
      "Apply during morning or late afternoon hours.",
      "Avoid drift to surrounding flowering flora.",
    ],
    specifications: [
      { label: "Active Ingredient", value: "Imidacloprid 17.8% SL" },
      { label: "Formulation", value: "Soluble Liquid Concentrate" },
      { label: "Application Rate", value: "0.25 - 0.3 ml / Litre" },
      { label: "Toxicity Class", value: "WHO Class II (Moderately Hazardous)" },
    ],
  },
  {
    slug: "bioforce",
    name: "BIOFORCE SUPER",
    category: "Insecticides",
    technicalName: "Acetamiprid 20% SP",
    formulation: "Soluble Powder (SP)",
    chemicalGroup: "Neonicotinoid (Chloropyridyl)",
    shortDescription:
      "Rapid translaminar soluble powder with exceptional speed of action against stubborn whiteflies, aphids, and leafminers.",
    description:
      "Bioforce Super is an advanced soluble powder insecticide renowned for outstanding penetration through waxy plant leaf cuticles. It protects both the upper and lower surfaces of leaves, exterminating secretive sap-sucking colonies hiding under leaf foliage.",
    image: "/images/products/bioforce.jpg",
    features: [
      "Rapid translaminar action controls pests sheltered on leaf undersides",
      "Unmatched performance against resilient Whitefly complexes",
      "Quick uptake prevents loss from sudden rainfall events",
      "Excellent compatibility with tank-mix partner fungicides",
      "Clean residue profile on edible vegetable and fruit produce",
    ],
    targetPests: "Whitefly, Aphids, Jassids, Thrips, Leafminers, Mealybugs, Psylla",
    recommendedCrops: "Cotton, Chilli, Tomato, Cabbage, Cauliflower, Citrus, Mustard",
    dosage: "40 - 80 gm per acre in 200 Litres of water",
    packagingSizes: ["50 gm", "100 gm", "250 gm", "500 gm", "1 Kg"],
    modeOfAction:
      "Systemic and translaminar activity blocks post-synaptic acetylcholine receptors, terminating nervous impulses and feeding.",
    antidote: "Symptomatic treatment. Provide artificial respiration if needed.",
    safetyPrecautions: [
      "Dissolve thoroughly in water before spraying.",
      "Store away from direct sunlight and moisture.",
    ],
    specifications: [
      { label: "Active Ingredient", value: "Acetamiprid 20% SP" },
      { label: "Formulation Type", value: "Water Soluble Powder" },
      { label: "Dilution Rate", value: "0.2 - 0.4 gm / Litre" },
      { label: "Pre-Harvest Interval", value: "7 Days" },
    ],
  },
];

export function getInsecticideBySlug(slug: string): Product | undefined {
  return INSECTICIDES.find((p) => p.slug === slug);
}
