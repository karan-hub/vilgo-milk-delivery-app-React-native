
export interface UiProduct {
  id: string;
  name: string;
  type: "cow" | "buffolw";
  volume: string;
  price: number;
  inStock: boolean;

  tags: string[];
  images: string[];

  highlights: string[];
  benefits: string[];

  nutrition: {
    calories: string;
    protein: string;
    fat: string;
  };

  rating: number;
  reviewsCount: number;

  subscriptions: {
    weekly: Plan;
    fortnight: Plan;
    monthly: Plan;
  };
}

interface Plan {
  id: string;
  title: string;
  durationDays: number;
  units: number;
  price: number;
  offer: string;
}
