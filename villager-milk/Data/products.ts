export const products = [
  // 🟩 Cow Milk 500ml
  {
    id: 1,
    name: "Cow Milk",
    type: "cow",
    volume: "500ml",
    price: 30,
    inStock: true,
    tags: ["organic", "fresh", "farm-delivered"],
    rating: 4.7,
    reviewsCount: 312,

    subscriptions: {
      weekly: {
        id: "cow500-weekly",
        title: "Weekly Plan",
        durationDays: 7,
        units: 1,
        price: 190,
        offer: "10% OFF",
      },
      monthly: {
        id: "cow500-monthly",
        title: "Monthly Plan",
        durationDays: 30,
        units: 1,
        price: 720,
        offer: "15% OFF",
      },
      fortnight: {
        id: "cow500-fortnight",
        title: "15 Days Plan",
        durationDays: 15,
        units: 1,
        price: 420,
        offer: "10% OFF",
      },
    },

    images: [require("../assets/images/cowMilk.png")],

    highlights: [
      "100% Pure & Fresh",
      "Sourced from village farms",
      "Ideal for daily consumption",
    ],
    benefits: [
      "Supports bone strength",
      "Easy to digest",
      "Excellent source of calcium",
    ],
    nutrition: {
      calories: "62 kcal",
      protein: "3.2g",
      fat: "3.5g",
      calcium: "120mg",
    },
  },

  // 🟩 Cow Milk 1L
  {
    id: 2,
    name: "Cow Milk",
    type: "cow",
    volume: "1L",
    price: 55,
    inStock: true,
    tags: ["family-pack", "natural"],
    rating: 4.8,
    reviewsCount: 529,

    subscriptions: {
      weekly: {
        id: "cow1l-weekly",
        title: "Weekly Plan",
        durationDays: 7,
        units: 1,
        price: 360,
        offer: "10% OFF",
      },
      monthly: {
        id: "cow1l-monthly",
        title: "Monthly Plan",
        durationDays: 30,
        units: 1,
        price: 1380,
        offer: "15% OFF",
      },
    },

    images: [require("../assets/images/cowMilk.png")],

    highlights: [
      "Fresh and preservative-free",
      "Perfect for families",
      "Naturally nutritious",
    ],
    benefits: [
      "Boosts energy levels",
      "Improves immunity",
      "Great for kids & adults",
    ],
    nutrition: {
      calories: "124 kcal",
      protein: "6.4g",
      fat: "3.5g",
      calcium: "240mg",
    },
  },

  // 🟫 Buffalo Milk 500ml
  {
    id: 3,
    name: "Buffalo Milk",
    type: "buffalo",
    volume: "500ml",
    price: 40,
    inStock: true,
    tags: ["creamy", "rich"],
    rating: 4.6,
    reviewsCount: 221,

    subscriptions: {
      weekly: {
        id: "buff500-weekly",
        title: "Weekly Plan",
        durationDays: 7,
        units: 1,
        price: 120,
        offer: "10% OFF",
      },
      monthly: {
        id: "buff500-monthly",
        title: "Monthly Plan",
        durationDays: 30,
        units: 1,
        price: 450,
        offer: "15% OFF",
      },
    },

    images: [require("../assets/images/BuffaloMilk.png")],

    highlights: [
      "Extra creamy texture",
      "High in nutrients",
      "Perfect for tea & sweets",
    ],
    benefits: [
      "Rich energy source",
      "Improves muscle strength",
      "Ideal for traditional cooking",
    ],
    nutrition: {
      calories: "97 kcal",
      protein: "3.8g",
      fat: "6.5g",
      calcium: "210mg",
    },
  },

  // 🟫 Buffalo Milk 1L
  {
    id: 4,
    name: "Buffalo Milk",
    type: "buffalo",
    volume: "1L",
    price: 70,
    inStock: false,
    tags: ["high-fat", "premium"],
    rating: 4.9,
    reviewsCount: 410,

    subscriptions: {
      weekly: {
        id: "buff1l-weekly",
        title: "Weekly Plan",
        durationDays: 7,
        units: 1,
        price: 480,
        offer: "10% OFF",
      },
      monthly: {
        id: "buff1l-monthly",
        title: "Monthly Plan",
        durationDays: 30,
        units: 1,
        price: 1850,
        offer: "15% OFF",
      },
    },

    images: [require("../assets/images/BuffaloMilk.png")],

    highlights: [
      "Thick & creamy",
      "Nutrient-rich",
      "Perfect for sweets & coffee",
    ],
    benefits: [
      "Supports muscle recovery",
      "Great for weight gain",
      "Long-lasting freshness",
    ],
    nutrition: {
      calories: "194 kcal",
      protein: "7.6g",
      fat: "6.5g",
      calcium: "420mg",
    },
  },

  // 🟡 Desi Cow Ghee 500g
  {
    id: 5,
    name: "Desi Cow Ghee",
    type: "ghee",
    weight: "500g",
    price: 550,
    inStock: true,
    tags: ["A2", "bilona", "premium"],
    rating: 4.9,
    reviewsCount: 178,
    subscriptions: null,

    images: [require("../assets/images/ghee_jar.png")],

    highlights: [
      "Made from A2 cow milk",
      "Traditional bilona method",
      "Golden aroma & rich taste",
    ],
    benefits: [
      "Boosts digestion",
      "Improves immunity",
      "Good for skin & brain",
    ],
    nutrition: {
      calories: "112 kcal (per tbsp)",
      fat: "12.7g",
      vitaminA: "108mcg",
      preservatives: "0%",
    },
  },

  // 🟡 Desi Cow Ghee 1kg
  {
    id: 6,
    name: "Desi Cow Ghee",
    type: "ghee",
    weight: "1kg",
    price: 900,
    inStock: true,
    tags: ["A2", "bilona", "premium"],
    rating: 4.9,
    reviewsCount: 178,
    subscriptions: null,

    images: [require("../assets/images/ghee_jar.png")],

    highlights: [
      "Made from A2 cow milk",
      "Traditional bilona method",
      "Golden aroma & rich taste",
    ],
    benefits: [
      "Boosts digestion",
      "Improves immunity",
      "Good for skin & brain",
    ],
    nutrition: {
      calories: "112 kcal (per tbsp)",
      fat: "12.7g",
      vitaminA: "108mcg",
      preservatives: "0%",
    },
  },
];
