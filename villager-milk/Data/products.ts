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
  },

  // 🟫 Buffalo Milk 500ml
  {
    id: 3,
    name: "Buffalo Milk",
    type: "buffalo",
    volume: "500ml",
    price: 40,
    inStock: true,

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
  },

  // 🟫 Buffalo Milk 1L
  {
    id: 4,
    name: "Buffalo Milk",
    type: "buffalo",
    volume: "1L",
    price: 70,
    inStock: false,

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
  },

  // 🟡 Desi Cow Ghee 500g
  {
    id: 5,
    name: "Desi Cow Ghee",
    type: "ghee",
    weight: "500g",
    price: 550,
    inStock: true,
    subscriptions: null,
    images: [require("../assets/images/ghee_jar.png")],
  },

  // 🟡 Desi Cow Ghee 1kg
  {
    id: 6,
    name: "Desi Cow Ghee",
    type: "ghee",
    weight: "1kg",
    price: 900,
    inStock: true,
    subscriptions: null,
    images: [require("../assets/images/ghee_jar.png")],
  },
];
