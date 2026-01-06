export interface SubscriptionRequest {
  type: "PREDEFINED" | "CUSTOM";

  productId: string;

  startDate: string;
  endDate: string;

  deliverySchedule: {
    dayOfWeek: number; 
    units: number;
  }[];

  estimatedPrice: number;
}
