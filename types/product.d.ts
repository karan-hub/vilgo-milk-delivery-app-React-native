// /types/product.d.ts

import { ImageSourcePropType } from "react-native";

export interface Product {
  id: number;
  name: string;
  type: string;

  volume?: string;
  weight?: string;

  price: number;
  inStock: boolean;

  tags?: string[];

  rating: number;
  reviewsCount: number;

  subscriptionPrice?: {
    weekly: number;
    monthly: number;
  } | null;

  images: (ImageSourcePropType | string)[];

  highlights: string[];
  benefits: string[];

  nutrition: {
    calories: string;
    protein?: string;
    fat?: string;
    calcium?: string;
    vitaminA?: string;
    preservatives?: string;
  };
}
