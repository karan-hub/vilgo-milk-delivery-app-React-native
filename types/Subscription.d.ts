export type SubscriptionType = "PREDEFINED" | "CUSTOM";

export interface DeliverySchedule {
  dayOfWeek: number;  
  units: number;
}

export interface SubscriptionRequest {
  type: SubscriptionType;

  productId: string;

  
  planId?: string;

  startDate: string;
  endDate: string;

  deliverySchedule: DeliverySchedule[];

  estimatedPrice: number;
}
