import greenTeaImage from "@/assets/OGT.jpeg";
import blackTeaImage from "@/assets/OBT.jpeg";
import whiteTeaImage from "@/assets/white-tea-closeup.jpg";
import oolongTeaImage from "@/assets/oolong-tea-closeup.jpg";
import masalaChaiImage from "@/assets/masala-chai-closeup.jpg";
import jasmineTeaImage from "@/assets/jasmine-tea-closeup.jpg";

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  fullDescription: string;
  tastingNotes: string[];
  steepTemp: string;
  steepTime: string;
  origin: string;
  price: number;
  priceUnit: string;
  brewingInstructions: {
    step: number;
    title: string;
    description: string;
  }[];
  ingredients: string[];
  benefits: string[];
  status?: "available" | "coming_soon";
  pricingOptions?: { weight: string; price: number }[];
  shopifyVariants?: Record<string, string>; // weight -> shopify variant URL
}

export const products: Product[] = [
  {
    id: 1,
    name: "Taju Premium Orthodox Green tea",
    slug: "himalayan-green-tea",
    image: greenTeaImage,
    description: "Ethereal jade liquor with delicate vegetal sweetness. First flush leaves hand-rolled at dawn from our high-altitude estate, delivering floral complexity and a lingering umami finish.",
    fullDescription: "Our signature Himalayan Green Tea is a testament to the pristine environment of Taju Estate. Grown at an altitude of 2000 meters, where cool mountain mists nurture each leaf to perfection, this tea captures the essence of the Himalayas in every cup. The first flush leaves are hand-plucked at dawn when the morning dew still glistens, preserving their delicate flavors and natural antioxidants. Orthodox processing ensures minimal oxidation, resulting in a jade-green liquor with remarkable clarity and depth.",
    tastingNotes: ["Jade Green", "Spring Floral", "Sweet Umami"],
    steepTemp: "75-80°C",
    steepTime: "2-3 min",
    origin: "Taju Estate, Assam",
    price: 50,
    priceUnit: "25gm",
    status: "available",
    pricingOptions: [
      { weight: "25gm", price: 50 },
      { weight: "50gm", price: 100 },
      { weight: "250gm", price: 500 },
      { weight: "500gm", price: 1000 },
      { weight: "1kg", price: 2000 },
    ],
    shopifyVariants: {
      "25gm":  "https://kaziranga-tea-factory-2.myshopify.com/products/taju-tea-premium-orthodox-red-tea?variant=48737792524531",
      "50gm":  "https://kaziranga-tea-factory-2.myshopify.com/products/taju-tea-premium-orthodox-red-tea?variant=48737790918899",
      "250gm": "https://kaziranga-tea-factory-2.myshopify.com/products/taju-tea-premium-orthodox-red-tea?variant=48737790951667",
      "500gm": "https://kaziranga-tea-factory-2.myshopify.com/products/taju-tea-premium-orthodox-red-tea?variant=48737790984435",
      "1kg":   "https://kaziranga-tea-factory-2.myshopify.com/products/taju-tea-premium-orthodox-red-tea?variant=48737791017203",
    },
    brewingInstructions: [
      {
        step: 1,
        title: "Heat Water",
        description: "Heat fresh, filtered water to 75-80°C (167-176°F). Avoid boiling water as it can scorch the delicate leaves."
      },
      {
        step: 2,
        title: "Measure Tea",
        description: "Use 2-3 grams (about 1 teaspoon) of tea leaves per 200ml cup."
      },
      {
        step: 3,
        title: "Steep",
        description: "Pour water over leaves and steep for 2-3 minutes. For a stronger brew, add more leaves rather than steeping longer."
      },
      {
        step: 4,
        title: "Enjoy",
        description: "Strain and savor. This tea can be re-steeped 2-3 times, with each infusion revealing new flavor notes."
      }
    ],
    ingredients: ["100% Organic Orthodox Green Tea Leaves"],
    benefits: [
      "Rich in antioxidants and catechins",
      "Supports metabolism and energy",
      "Promotes mental clarity and focus",
      "Natural source of L-theanine for calm alertness"
    ]
  },
  {
    id: 2,
    name: "Taju Premium Orthodox Black tea",
    slug: "heritage-black-tea",
    image: blackTeaImage,
    description: "Deep amber nectar with robust malty character. Orthodox-processed from mature leaves, revealing notes of dark chocolate, dried stone fruit, and warm spice. A testament to traditional craftsmanship.",
    fullDescription: "The Heritage Black Tea represents generations of tea-making expertise passed down through our family. Crafted from mature leaves harvested from century-old tea bushes in our Heritage Block, this tea embodies the soul of Taju. The orthodox rolling and fermentation process develops complex flavor compounds, creating a full-bodied cup with remarkable depth. Each sip reveals layers of dark chocolate, dried apricots, and subtle hints of cinnamon, finishing with a smooth, malty sweetness.",
    tastingNotes: ["Dark Chocolate", "Malty", "Stone Fruit"],
    steepTemp: "95-100°C",
    steepTime: "3-5 min",
    origin: "Taju Estate, Assam",
    price: 50,
    priceUnit: "25gm",
    status: "available",
    pricingOptions: [
      { weight: "25gm", price: 50 },
      { weight: "50gm", price: 100 },
      { weight: "250gm", price: 500 },
      { weight: "500gm", price: 1000 },
      { weight: "1kg", price: 2000 },
    ],
    shopifyVariants: {
      "25gm":  "https://kaziranga-tea-factory-2.myshopify.com/products/kaziranga-orthodox-black-tea?variant=48737792622835",
      "50gm":  "https://kaziranga-tea-factory-2.myshopify.com/products/kaziranga-orthodox-black-tea?variant=48737791377651",
      "250gm": "https://kaziranga-tea-factory-2.myshopify.com/products/kaziranga-orthodox-black-tea?variant=48737791410419",
      "500gm": "https://kaziranga-tea-factory-2.myshopify.com/products/kaziranga-orthodox-black-tea?variant=48737791443187",
      "1kg":   "https://kaziranga-tea-factory-2.myshopify.com/products/kaziranga-orthodox-black-tea?variant=48737791475955",
    },
    brewingInstructions: [
      {
        step: 1,
        title: "Boil Water",
        description: "Bring fresh, filtered water to a rolling boil (95-100°C / 203-212°F)."
      },
      {
        step: 2,
        title: "Warm Your Vessel",
        description: "Rinse your teapot or cup with hot water to maintain brewing temperature."
      },
      {
        step: 3,
        title: "Measure Tea",
        description: "Use 2-3 grams (about 1 teaspoon) of tea leaves per 200ml cup."
      },
      {
        step: 4,
        title: "Steep",
        description: "Pour boiling water over leaves and steep for 3-5 minutes depending on desired strength."
      },
      {
        step: 5,
        title: "Serve",
        description: "Strain and enjoy black, or add a splash of milk for a creamier cup. Pairs beautifully with breakfast."
      }
    ],
    ingredients: ["100% Organic Orthodox Black Tea Leaves"],
    benefits: [
      "Natural energy boost from caffeine",
      "Supports heart health",
      "Rich in theaflavins and antioxidants",
      "Aids digestion after meals"
    ]
  },
  {
    id: 3,
    name: "Taju Silver Needle White Tea",
    slug: "silver-needle-white-tea",
    image: whiteTeaImage,
    description: "Rare, delicate buds hand-picked at dawn, offering a subtle honey sweetness with whispers of melon and a silky, ethereal finish. The pinnacle of tea craftsmanship.",
    fullDescription: "Our Silver Needle White Tea represents the most prized harvest from Taju Estate. Only the unopened buds, covered in fine silvery down, are carefully hand-selected during the brief spring harvest window. These precious buds undergo minimal processing—simply withered and dried—preserving their natural character and maximum health benefits. The result is an extraordinarily delicate tea with a pale golden liquor that captivates with its subtle complexity.",
    tastingNotes: ["Honey", "Melon", "Sweet Hay"],
    steepTemp: "70-75°C",
    steepTime: "3-4 min",
    origin: "Taju Estate, Premium Block",
    price: 45.99,
    priceUnit: "50g",
    status: "coming_soon",
    brewingInstructions: [
      {
        step: 1,
        title: "Cool Water",
        description: "Heat fresh, filtered water to 70-75°C (158-167°F). This delicate tea requires cooler water to prevent bitterness."
      },
      {
        step: 2,
        title: "Generous Measure",
        description: "Use 3-4 grams (about 2 teaspoons) of tea buds per 200ml cup due to the light density of the leaves."
      },
      {
        step: 3,
        title: "Patient Steep",
        description: "Pour water gently over the buds and steep for 3-4 minutes. Watch the buds dance and unfurl."
      },
      {
        step: 4,
        title: "Savor",
        description: "Strain and enjoy the delicate, honeyed liquor. Can be re-steeped 3-4 times with slightly longer steep times."
      }
    ],
    ingredients: ["100% Organic White Tea Buds (Silver Tips)"],
    benefits: [
      "Highest antioxidant content of all tea types",
      "Supports skin health and anti-aging",
      "Gentle caffeine for sustained energy",
      "Promotes cardiovascular wellness"
    ]
  },
  {
    id: 4,
    name: "Taju Mountain Oolong",
    slug: "mountain-oolong",
    image: oolongTeaImage,
    description: "Artfully oxidized leaves revealing layers of toasted almond, orchid nectar, and caramelized sugar. A complex tea that bridges the gap between green and black.",
    fullDescription: "Our Mountain Oolong is a masterpiece of controlled oxidation, crafted by our most experienced tea masters. Harvested from terraced gardens at elevation, these leaves undergo a precise 40% oxidation process, followed by traditional hand-rolling and gentle roasting. The result is a tea of remarkable complexity—beginning with bright floral notes that evolve into toasty, nutty depths with each subsequent infusion.",
    tastingNotes: ["Toasted Almond", "Orchid", "Caramel"],
    steepTemp: "85-90°C",
    steepTime: "2-4 min",
    origin: "Taju Estate, Mountain Terraces",
    price: 38.99,
    priceUnit: "100g",
    status: "coming_soon",
    brewingInstructions: [
      {
        step: 1,
        title: "Heat Water",
        description: "Bring fresh water to 85-90°C (185-194°F). Slightly cooler than boiling preserves the delicate aromatics."
      },
      {
        step: 2,
        title: "Warm Vessel",
        description: "Preheat your teapot or gaiwan with hot water to maintain optimal brewing temperature."
      },
      {
        step: 3,
        title: "Measure Tea",
        description: "Use 4-5 grams per 200ml for gongfu style, or 2-3 grams for Western brewing."
      },
      {
        step: 4,
        title: "Multiple Infusions",
        description: "First steep 2 minutes, then add 30 seconds for each subsequent infusion. This tea rewards up to 6 steeps."
      },
      {
        step: 5,
        title: "Discover",
        description: "Notice how flavors evolve—floral in early steeps, nutty and sweet in later ones."
      }
    ],
    ingredients: ["100% Organic Semi-Oxidized Oolong Tea Leaves"],
    benefits: [
      "Supports healthy metabolism",
      "Rich in polyphenols and antioxidants",
      "Promotes mental alertness",
      "Aids in stress reduction"
    ]
  },
  {
    id: 5,
    name: "Taju Masala Chai Blend",
    slug: "masala-chai-blend",
    image: masalaChaiImage,
    description: "Bold Assam black tea married with warming spices—cardamom, cinnamon, ginger, and cloves. An authentic Indian chai experience that invigorates the senses.",
    fullDescription: "Our Masala Chai Blend pays homage to India's beloved spiced tea tradition. We start with our robust Heritage Black Tea as the base, then blend it with freshly ground spices sourced from Kerala's spice gardens. Each batch is hand-mixed to ensure perfect balance—the tea's malty strength standing up to the aromatic intensity of green cardamom, Ceylon cinnamon, fresh ginger, and hand-picked cloves.",
    tastingNotes: ["Cardamom", "Cinnamon", "Ginger Warmth"],
    steepTemp: "100°C",
    steepTime: "4-5 min",
    origin: "Taju Estate + Kerala Spices",
    price: 26.99,
    priceUnit: "100g",
    status: "coming_soon",
    brewingInstructions: [
      {
        step: 1,
        title: "Boiling Water",
        description: "Use freshly boiled water at 100°C (212°F). The robust tea and spices need high heat to release their full character."
      },
      {
        step: 2,
        title: "Generous Portion",
        description: "Use 3-4 grams (heaping teaspoon) per 200ml cup. For stronger chai, increase the amount."
      },
      {
        step: 3,
        title: "Steep Well",
        description: "Steep for 4-5 minutes to fully extract the spice flavors. This tea benefits from longer steeping."
      },
      {
        step: 4,
        title: "Traditional Style",
        description: "For authentic chai, simmer with equal parts water and milk, sweeten to taste with jaggery or honey."
      },
      {
        step: 5,
        title: "Enjoy",
        description: "Strain through a fine mesh and serve hot. Perfect with breakfast or as an afternoon pick-me-up."
      }
    ],
    ingredients: ["Organic Black Tea", "Green Cardamom", "Ceylon Cinnamon", "Dried Ginger", "Whole Cloves", "Black Pepper"],
    benefits: [
      "Aids digestion and reduces bloating",
      "Natural energy boost",
      "Anti-inflammatory properties from spices",
      "Supports immune system health"
    ]
  },
  {
    id: 6,
    name: "Taju Jasmine Pearl Green Tea",
    slug: "jasmine-pearl-green-tea",
    image: jasmineTeaImage,
    description: "Hand-rolled green tea pearls scented with fresh jasmine blossoms over seven nights. Unfurls to reveal an intoxicating floral aroma with a clean, sweet finish.",
    fullDescription: "Our Jasmine Pearl Green Tea is a labor of love spanning many moonlit nights. Premium spring green tea leaves are carefully hand-rolled into tight pearls, then layered with freshly picked jasmine flowers each evening for seven consecutive nights. As dawn breaks, the spent flowers are removed, and fresh blooms are added. This traditional scenting process infuses the tea with an ethereal jasmine fragrance that lingers long after the cup is empty.",
    tastingNotes: ["Jasmine Blossom", "Sweet Green", "Honeysuckle"],
    steepTemp: "80-85°C",
    steepTime: "2-3 min",
    origin: "Taju Estate, Artisan Collection",
    price: 36.99,
    priceUnit: "75g",
    status: "coming_soon",
    brewingInstructions: [
      {
        step: 1,
        title: "Gentle Heat",
        description: "Heat water to 80-85°C (176-185°F). Too hot water will overwhelm the delicate jasmine notes."
      },
      {
        step: 2,
        title: "Watch the Pearls",
        description: "Use 4-5 pearls (about 3 grams) per 200ml cup. Use a glass vessel to watch them unfurl beautifully."
      },
      {
        step: 3,
        title: "Brief Steep",
        description: "Steep for 2-3 minutes for the first infusion. The pearls will slowly open, releasing fragrance."
      },
      {
        step: 4,
        title: "Re-steep",
        description: "These pearls offer 3-4 wonderful infusions. Increase steep time by 30 seconds each round."
      }
    ],
    ingredients: ["100% Organic Green Tea Pearls", "Natural Jasmine Flower Essence"],
    benefits: [
      "Calming aromatherapy effects",
      "Rich in catechins and antioxidants",
      "Supports relaxation and stress relief",
      "Natural mood enhancer"
    ]
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};
