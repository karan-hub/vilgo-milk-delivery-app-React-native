export const products = [
  // ✅ COW MILK 500ML
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
        duration: "7 Days",
        price: 190,
        offer: "Save 10%",
        startLabel: "Start From",
      },
      monthly: {
        id: "cow500-monthly",
        title: "Monthly Plan",
        duration: "30 Days",
        price: 720,
        offer: "Save 15%",
        startLabel: "Start From",
      },
      ondays: {
        id: "cow500-monthly",
        title: "On Days Plan",
        duration: "15 Days",
        price: 420,
        offer: "Save 10%",
        startLabel: "Start From",
      }
    },

    images: [ require("../assets/images/cowMilk.png") ],

    highlights: [
      "100% Pure & Fresh",
      "Sourced from village farms",
      "Ideal for daily consumption"
    ],

    benefits: [
      "Supports bone strength",
      "Easy to digest",
      "Excellent source of calcium"
    ],

    nutrition: {
      calories: "62 kcal",
      protein: "3.2g",
      fat: "3.5g",
      calcium: "120mg"
    }
  },

  // ✅ COW MILK 1L
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
        duration: "7 Days",
        price: 360,
        offer: "Save 10%",
        startLabel: "Start From",
      },
      monthly: {
        id: "cow1l-monthly",
        title: "Monthly Plan",
        duration: "30 Days",
        price: 1380,
        offer: "Save 15%",
        startLabel: "Start From",
      }
    },

    images: [ require("../assets/images/cowMilk.png") ],

    highlights: [
      "Fresh and preservative-free",
      "Perfect for families",
      "Naturally nutritious"
    ],

    benefits: [
      "Boosts energy levels",
      "Improves immunity",
      "Great for kids & adults"
    ],

    nutrition: {
      calories: "124 kcal",
      protein: "6.4g",
      fat: "3.5g",
      calcium: "240mg"
    }
  },

  // ✅ BUFFALO MILK 500ML
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
        duration: "7 Days",
        price: 120,
        offer: "Save 10%",
        startLabel: "Start From",
      },
      monthly: {
        id: "buff500-monthly",
        title: "Monthly Plan",
        duration: "30 Days",
        price: 450,
        offer: "Save 15%",
        startLabel: "Start From",
      }
    },

    images: [ require("../assets/images/BuffaloMilk.png") ],

    highlights: [
      "Extra creamy texture",
      "High in nutrients",
      "Perfect for tea & sweets"
    ],

    benefits: [
      "Rich energy source",
      "Improves muscle strength",
      "Ideal for traditional cooking"
    ],

    nutrition: {
      calories: "97 kcal",
      protein: "3.8g",
      fat: "6.5g",
      calcium: "210mg"
    }
  },

  // ✅ BUFFALO MILK 1L
  {
    id: 4,
    name: "Buffalo Milk",
    type: "buffalo",
    volume: "1L",
    price: 70,
    inStock: false, // example out-of-stock
    tags: ["high-fat", "premium"],
    rating: 4.9,
    reviewsCount: 410,

    subscriptions: {
      weekly: {
        id: "buff1l-weekly",
        title: "Weekly Plan",
        duration: "7 Days",
        price: 480,
        offer: "Save 10%",
        startLabel: "Start From",
      },
      monthly: {
        id: "buff1l-monthly",
        title: "Monthly Plan",
        duration: "30 Days",
        price: 1850,
        offer: "Save 15%",
        startLabel: "Start From",
      }
    },

    images: [ require("../assets/images/BuffaloMilk.png") ],

    highlights: [
      "Thick & creamy",
      "Nutrient-rich",
      "Perfect for sweets & coffee"
    ],

    benefits: [
      "Supports muscle recovery",
      "Great for weight gain",
      "Long-lasting freshness"
    ],

    nutrition: {
      calories: "194 kcal",
      protein: "7.6g",
      fat: "6.5g",
      calcium: "420mg"
    }
  },

  // ✅ DESI GHEE 500ML
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
    subscriptions: null, // no subscription for ghee

    images: [ require("../assets/images/ghee_jar.png") ],

    highlights: [
      "Made from A2 cow milk",
      "Traditional bilona method",
      "Golden aroma & rich taste"
    ],

    benefits: [
      "Boosts digestion",
      "Improves immunity",
      "Good for skin & brain"
    ],

    nutrition: {
      calories: "112 kcal (per tbsp)",
      fat: "12.7g",
      vitaminA: "108mcg",
      preservatives: "0%"
    }
  },

  // ✅ DESI GHEE 1KG
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

    images: [ require("../assets/images/ghee_jar.png") ],

    highlights: [
      "Made from A2 cow milk",
      "Traditional bilona method",
      "Golden aroma & rich taste"
    ],

    benefits: [
      "Boosts digestion",
      "Improves immunity",
      "Good for skin & brain"
    ],

    nutrition: {
      calories: "112 kcal (per tbsp)",
      fat: "12.7g",
      vitaminA: "108mcg",
      preservatives: "0%"
    }
  }
];
