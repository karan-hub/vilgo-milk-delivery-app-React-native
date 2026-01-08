import { DeliverySchedule } from "./Subscription";

export interface SubscriptionRequest {
  type: "PREDEFINED" | "CUSTOM";

  productId?: string;      
  planId?: string;   


  startDate: string;
  endDate: string;

 
  deliverySchedule?: DeliverySchedule[];

  estimatedPrice: number;
}
