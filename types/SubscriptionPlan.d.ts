
export interface SubscriptionPlan {
  id: string;
  planKey: "weekly" | "fortnight" | "monthly";
  title: string;
  durationDays: number;
  units: number;
  price: number;
  offer?: string;
  productName:string;
}

