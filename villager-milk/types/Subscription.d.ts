interface Subscription {
  id: string;                // unique ID for each plan
  productId: number;         // product reference
  type: "daily" | "custom" | "offer";
  price:number;
  unitsPerDay: number;
  startDate: string;
  endDate: string | null;
  selectedDays?: number[];   // only for custom plan
  durationDays?: number;     // only for offer plan
  createdAt: string;
}
