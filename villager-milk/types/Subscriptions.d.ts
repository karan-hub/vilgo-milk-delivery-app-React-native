export interface SubscriptionPlan {
    id: string;                // unique key
    title: string;             // e.g., "Weekly Plan"
    duration: string;          // e.g., "7 Days", "30 Days"
    price: number;             // actual price
    offer?: string;            // e.g. "Save 10%"
    startLabel?: string;       // e.g., "Start From"
    startDate?: string;        // selected start date
  }
  