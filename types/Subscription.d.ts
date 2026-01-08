export type SubscriptionType = "PREDEFINED" | "CUSTOM";
export type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED" | "COMPLETED";
export type DeliverySlot = "MORNING" | "EVENING";

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

export interface Subscription {
  subscriptionId: string;
  planTitle: string | null;
  productName: string;
  units: number | null;
  startDate: string;
  endDate: string;
  deliverySlot: DeliverySlot;
  status: SubscriptionStatus;
  createdAt: string;
  userId: string;
  planId: string | null;
  deliveryRules: DeliverySchedule[];
}
