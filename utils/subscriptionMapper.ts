import { DeliverySchedule, SubscriptionRequest } from "@/types/Subscription";

 

export function mapPlanToSubscriptionRequest(params: {
  productId: string;
  planId: string;
  startDate: string;
  durationDays: number;
  unitsPerDay: number;
  price: number;
}): SubscriptionRequest {
  const { productId, planId, startDate, durationDays, unitsPerDay, price } =
    params;

  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + durationDays - 1);

  // Daily delivery
  const deliverySchedule: DeliverySchedule[] = [
    { dayOfWeek: -1, units: unitsPerDay }, // -1 = every day
  ];

  return {
    type: "PREDEFINED",
    productId,
    planId,
    startDate,
    endDate: end.toISOString().split("T")[0],
    deliverySchedule,
    estimatedPrice: price,
  };
}
