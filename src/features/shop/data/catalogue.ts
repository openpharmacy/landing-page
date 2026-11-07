/**
 * Product catalogue — the single source of truth for shop products. The shop
 * grid/search, the product detail page, and the cart's prescription gate all
 * read from here, so a product's price, copy and Rx status never drift between
 * screens. No backend yet (see docs/api-gaps.md); this is realistic mock data.
 */

export type Faq = { q: string; a: string };

export type CatalogueProduct = {
  id: string;
  name: string;
  brand: string;
  /** Short blurb for cards. */
  desc: string;
  price: string;
  priceValue: number;
  img: string;
  category: string;
  /** Prescription-only medicines gate checkout until a script is on file. */
  requiresScript: boolean;
  popular: boolean;
  /** PBS applies to prescription medicines only; omit for over-the-counter. */
  pbsSave?: string;
  /** Card "Promoted" flag (set per shop slot, not intrinsic). */
  promoted?: boolean;
  overview: string[];
  dosage: string;
  warnings: string;
  pbsInfo: string;
  faqs: Faq[];
};

const OTC_PBS =
  "This is an over-the-counter product and is not subsidised under the Pharmaceutical Benefits Scheme (PBS).";

export const CATALOGUE: CatalogueProduct[] = [
  {
    id: "panadol-extra",
    name: "Panadol Extra",
    brand: "Panadol",
    desc: "Fast relief for headaches and fever",
    price: "$10.99",
    priceValue: 10.99,
    img: "/images/products/product-2.webp",
    category: "Fever & Pain Relief",
    requiresScript: false,
    popular: true,
    overview: [
      "Panadol Extra with Optizorb contains a clinically proven combination of paracetamol and caffeine, designed to fight tough pain: migraine and tension headache, period pain, muscular aches and pains, and dental pain.",
      "With advanced Optizorb technology, Panadol Extra is absorbed quickly to provide effective relief, and doesn't contain ibuprofen, gluten, lactose or sugar.",
    ],
    dosage:
      "Adults and children 12 years and over: 1–2 caplets every 4–6 hours as necessary. Do not exceed 8 caplets in 24 hours. Do not use for more than a few days at a time unless advised by a doctor.",
    warnings:
      "Contains paracetamol and caffeine. Do not take with any other paracetamol-containing products. Incorrect use can be harmful to the liver. Keep out of reach of children.",
    pbsInfo: OTC_PBS,
    faqs: [
      {
        q: "How quickly does Panadol Extra start working?",
        a: "With Optizorb technology it can begin to work in as little as 15 minutes.",
      },
      {
        q: "Can I take this with other medications?",
        a: "Check with your pharmacist before combining with other paracetamol-containing products.",
      },
      {
        q: "Who should avoid taking Panadol Extra?",
        a: "Avoid if you are allergic to paracetamol or caffeine, or have liver problems — ask your pharmacist.",
      },
    ],
  },
  {
    id: "panadol-tab",
    name: "Panadol Tab X 100",
    brand: "Panadol",
    desc: "Everyday paracetamol, 100-tablet value pack",
    price: "$10.99",
    priceValue: 10.99,
    img: "/images/products/panadol-tab.webp",
    category: "Fever & Pain Relief",
    requiresScript: false,
    popular: false,
    overview: [
      "Panadol Tablets provide temporary relief from pain and discomfort associated with headache, cold and flu symptoms, muscular aches, and reduce fever.",
      "Gentle on the stomach when used as directed, this 100-tablet pack is a convenient choice for the whole household's medicine cabinet.",
    ],
    dosage:
      "Adults and children 12 years and over: 1–2 tablets every 4–6 hours as necessary, to a maximum of 8 tablets in 24 hours.",
    warnings:
      "Contains paracetamol. Do not take with any other paracetamol-containing products. Incorrect use can be harmful to the liver.",
    pbsInfo: OTC_PBS,
    faqs: [
      {
        q: "Is this the same as Panadol Extra?",
        a: "Standard Panadol tablets contain paracetamol only, without the added caffeine found in Panadol Extra.",
      },
      {
        q: "Can children take these tablets?",
        a: "These are for adults and children 12 years and over. Use a children's paracetamol formulation for younger children.",
      },
    ],
  },
  {
    id: "panadol-rapid",
    name: "Panadol Rapid Caplets X 32",
    brand: "Panadol",
    desc: "Fast relief for headaches and fever",
    price: "$16.99",
    priceValue: 16.99,
    img: "/images/products/panadol-rapid.webp",
    category: "Fever & Pain Relief",
    requiresScript: false,
    popular: false,
    overview: [
      "Panadol Rapid is absorbed up to twice as fast as standard paracetamol tablets, providing fast, effective temporary relief of pain and fever.",
      "Ideal for headaches, migraine, period pain and the aches and pains of cold and flu when you want relief sooner.",
    ],
    dosage:
      "Adults and children 12 years and over: 1–2 caplets every 4–6 hours as necessary. Do not exceed 8 caplets in 24 hours.",
    warnings:
      "Contains paracetamol. Do not take with any other paracetamol-containing products. Incorrect use can be harmful to the liver.",
    pbsInfo: OTC_PBS,
    faqs: [
      {
        q: "How is Panadol Rapid different?",
        a: "It is formulated to dissolve and be absorbed faster than standard paracetamol, so relief can come sooner.",
      },
    ],
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    brand: "MyVitamins",
    desc: "Supports healthy bones and immunity",
    price: "$12.99",
    priceValue: 12.99,
    img: "/images/products/product-1.webp",
    category: "Vitamins & Supplements",
    requiresScript: false,
    popular: true,
    overview: [
      "Vitamin D3 (cholecalciferol) supports the maintenance of healthy bones and teeth, normal muscle function and a healthy immune system.",
      "An easy daily capsule to help maintain vitamin D levels, especially helpful for people with limited sun exposure.",
    ],
    dosage:
      "Adults: take 1 capsule daily with food, or as directed by your healthcare professional.",
    warnings:
      "Vitamin and mineral supplements should not replace a balanced diet. Do not exceed the recommended daily dose. If you are pregnant or have a medical condition, seek advice before use.",
    pbsInfo: OTC_PBS,
    faqs: [
      {
        q: "When is the best time to take Vitamin D3?",
        a: "Vitamin D is fat-soluble, so it's best taken with a meal that contains some fat.",
      },
      {
        q: "Do I still need this if I get sun?",
        a: "Many people maintain levels through sun exposure, but supplementation can help during winter or with limited sun. Ask your pharmacist.",
      },
    ],
  },
  {
    id: "dimetapp",
    name: "Dimetapp Nasal Spray",
    brand: "Dimetapp",
    desc: "Relief from nasal and sinus congestion",
    price: "$8.95",
    priceValue: 8.95,
    img: "/images/products/dimetapp.webp",
    category: "Pharmacist Advice Medicine",
    requiresScript: false,
    popular: false,
    overview: [
      "Dimetapp Nasal Spray provides fast, effective relief from nasal and sinus congestion caused by colds, flu, hay fever and other upper respiratory allergies.",
      "The metered spray helps decongest blocked noses so you can breathe more easily.",
    ],
    dosage:
      "Adults and children 12 years and over: 1–2 sprays into each nostril every 8–10 hours as needed. Do not use for more than 5 days in a row.",
    warnings:
      "Prolonged or excessive use may cause rebound congestion. Not recommended for children under 12 without medical advice. Use only as directed.",
    pbsInfo: OTC_PBS,
    faqs: [
      {
        q: "Why shouldn't I use it for more than 5 days?",
        a: "Decongestant nasal sprays can cause rebound congestion with prolonged use. If symptoms persist, see your pharmacist or doctor.",
      },
    ],
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    brand: "Nurofen",
    desc: "Anti-inflammatory for pain and fever relief",
    price: "$10.99",
    priceValue: 10.99,
    img: "/images/products/ibuprofen.webp",
    category: "Fever & Pain Relief",
    requiresScript: false,
    popular: false,
    overview: [
      "Ibuprofen is a non-steroidal anti-inflammatory (NSAID) that provides temporary relief of pain and inflammation associated with headache, dental pain, period pain, muscular aches, and helps reduce fever.",
      "It targets the source of inflammation, making it useful for aches and pains that come with swelling.",
    ],
    dosage:
      "Adults and children 12 years and over: 1 tablet every 4–6 hours with food as needed. Do not exceed the maximum daily dose stated on the pack.",
    warnings:
      "Take with food. Not suitable for people with stomach ulcers, severe heart or kidney problems, or in the last trimester of pregnancy. Avoid taking with other NSAIDs.",
    pbsInfo: OTC_PBS,
    faqs: [
      {
        q: "Can I take ibuprofen with paracetamol?",
        a: "They work differently and are sometimes used together for short periods — check with your pharmacist for the right approach.",
      },
      {
        q: "Why should I take it with food?",
        a: "Taking ibuprofen with food helps reduce the risk of stomach irritation.",
      },
    ],
  },
  {
    id: "metformin-500mg",
    name: "Metformin 500mg",
    brand: "Crescent",
    desc: "Helps manage blood sugar in type 2 diabetes",
    price: "$8.99",
    priceValue: 8.99,
    img: "/images/products/metformin.webp",
    category: "Pharmacist Advice Medicine",
    requiresScript: true,
    popular: true,
    pbsSave: "$15.60",
    overview: [
      "Metformin is a first-line medicine for type 2 diabetes. It helps lower blood glucose by reducing the amount of sugar your liver releases and improving how your body responds to insulin.",
      "Each film-coated tablet contains metformin hydrochloride 500mg. It is taken as part of a treatment plan that includes diet and exercise.",
    ],
    dosage:
      "Take exactly as prescribed, usually with or after meals to reduce stomach upset. Your doctor will increase the dose gradually — do not change your dose without medical advice.",
    warnings:
      "Prescription medicine. Tell your doctor if you have kidney problems or before any procedure using contrast dye. Seek urgent medical help for signs of lactic acidosis (unusual muscle pain, difficulty breathing, severe tiredness).",
    pbsInfo:
      "Metformin is listed on the Pharmaceutical Benefits Scheme (PBS). Eligible patients with a valid prescription pay the subsidised PBS price.",
    faqs: [
      {
        q: "When should I take Metformin?",
        a: "Usually with or just after meals to reduce stomach upset. Follow the schedule your doctor or pharmacist gives you.",
      },
      {
        q: "What if I miss a dose?",
        a: "Take it as soon as you remember unless it's almost time for the next dose — never double up. Ask your pharmacist if unsure.",
      },
      {
        q: "Why does this need a script?",
        a: "Metformin is a prescription-only medicine, so a valid script must be on file before it can be dispensed.",
      },
    ],
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    brand: "Milpharm",
    desc: "Broad-spectrum antibiotic for bacterial infections",
    price: "$10.99",
    priceValue: 10.99,
    img: "/images/products/amoxicillin.webp",
    category: "Pharmacist Advice Medicine",
    requiresScript: true,
    popular: true,
    pbsSave: "$12.40",
    overview: [
      "Amoxicillin is a broad-spectrum penicillin antibiotic used to treat a range of bacterial infections, including chest, ear, throat, sinus, urinary tract and skin infections.",
      "It works by stopping the growth of bacteria. Antibiotics do not work against viral infections such as colds or flu.",
    ],
    dosage:
      "Take exactly as prescribed and complete the full course, even if you feel better. A typical course is one capsule three times a day, spaced evenly — follow your prescription.",
    warnings:
      "Prescription antibiotic. Do not take if you are allergic to penicillin. Finishing the full course helps prevent antibiotic resistance. Tell your doctor about any rash or breathing difficulty.",
    pbsInfo:
      "Amoxicillin is listed on the PBS for eligible patients with a valid prescription.",
    faqs: [
      {
        q: "Can I stop when I feel better?",
        a: "No — finish the entire course as prescribed, otherwise the infection may return and resistance can develop.",
      },
      {
        q: "Why does this need a script?",
        a: "Antibiotics are prescription-only medicines, so a valid script is required before dispensing.",
      },
    ],
  },
  {
    id: "clarithromycin",
    name: "Clarithromycin",
    brand: "Crescent",
    desc: "Macrolide antibiotic for respiratory and gastric infections",
    price: "$12.99",
    priceValue: 12.99,
    img: "/images/products/clarithromycin.webp",
    category: "Pharmacist Advice Medicine",
    requiresScript: true,
    popular: false,
    pbsSave: "$11.20",
    overview: [
      "Clarithromycin is a macrolide antibiotic used for respiratory tract infections, skin and soft tissue infections, and as part of combination therapy to help eradicate Helicobacter pylori in the stomach.",
      "It works by stopping bacteria from growing. It is not effective against viral infections.",
    ],
    dosage:
      "Take exactly as prescribed, usually twice a day, and complete the full course. It can be taken with or without food unless your prescription says otherwise.",
    warnings:
      "Prescription antibiotic. Tell your doctor about other medicines you take, as clarithromycin can interact with several drugs. Complete the full course to prevent resistance.",
    pbsInfo:
      "Clarithromycin is listed on the PBS for eligible patients with a valid prescription.",
    faqs: [
      {
        q: "Can I take it with my other medicines?",
        a: "Clarithromycin interacts with a number of medicines — always check with your pharmacist or doctor first.",
      },
      {
        q: "Why does this need a script?",
        a: "It is a prescription-only antibiotic, so a valid script must be on file before dispensing.",
      },
    ],
  },
];

const BY_ID = new Map(CATALOGUE.map((p) => [p.id, p]));
const BY_NAME = new Map(CATALOGUE.map((p) => [p.name.toLowerCase(), p]));

export function getProduct(id: string): CatalogueProduct | undefined {
  return BY_ID.get(id);
}

export function findProductByName(name: string): CatalogueProduct | undefined {
  return BY_NAME.get(name.trim().toLowerCase());
}

/** Whether a product (by name) is a prescription medicine. Default: false. */
export function requiresScript(name: string): boolean {
  return findProductByName(name)?.requiresScript ?? false;
}

/** Prescription products surfaced in "Available for Your Scripts". */
export const RX_PRODUCTS = CATALOGUE.filter((p) => p.requiresScript);

/** Related products: same category first, then others. */
export function relatedProducts(id: string, count = 3): CatalogueProduct[] {
  const current = getProduct(id);
  const others = CATALOGUE.filter((p) => p.id !== id);
  if (!current) return others.slice(0, count);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}

/**
 * Resolve a product from product-page query params: by id, then by name, then a
 * synthesized fallback so unknown/legacy links still render something sensible.
 */
export function resolveProduct(params: {
  id?: string;
  name?: string;
  price?: string;
  img?: string;
  brand?: string;
}): CatalogueProduct {
  const byId = params.id ? getProduct(params.id) : undefined;
  if (byId) return byId;
  const byName = params.name ? findProductByName(params.name) : undefined;
  if (byName) return byName;

  const name = params.name ?? "Product";
  return {
    id: "unknown",
    name,
    brand: params.brand ?? "OpenPharmacy",
    desc: "",
    price: params.price ?? "",
    priceValue: Number((params.price ?? "").replace(/[^0-9.]/g, "")) || 0,
    img: params.img ?? "/images/products/product-2.webp",
    category: "",
    requiresScript: requiresScript(name),
    popular: false,
    overview: [
      "Detailed product information isn't available for this item yet.",
    ],
    dosage:
      "Follow the directions on the pack, or ask your pharmacist for advice.",
    warnings:
      "Always read the label and use only as directed. If symptoms persist, talk to your health professional.",
    pbsInfo: "PBS information isn't available for this item.",
    faqs: [],
  };
}
