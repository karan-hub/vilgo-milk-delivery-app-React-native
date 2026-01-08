
import { API_BASE_URL } from "@/config/env";
import { DeliverySchedule, Subscription } from "@/types/Subscription";
import { authFetch } from "./authFetch";

export async function createSubscription(payload: any) {
  const res = await authFetch(
    `${API_BASE_URL}/api/v1/subscriptions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Subscription failed");
  }

  return res.json();
}

export async function createCustomSubscription(payload: {
  productId: string;
  startDate: string;
  endDate: string;
  deliverySchedule: DeliverySchedule[];
  deliverySlot?: "MORNING" | "EVENING";
  estimatedPrice?: number;
}) {
  const res = await authFetch(
    `${API_BASE_URL}/api/v1/subscriptions/custom`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Custom subscription failed");
  }

  return res.json();
}

export async function getMySubscriptions(): Promise<Subscription[]> {
  const res = await authFetch(
    `${API_BASE_URL}/api/v1/subscriptions/my`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to fetch subscriptions" }));
    throw new Error(err.message || "Failed to fetch subscriptions");
  }

  return res.json();
}

export async function pauseSubscription(subscriptionId: string): Promise<void> {
  const res = await authFetch(
    `${API_BASE_URL}/api/v1/subscriptions/${subscriptionId}/pause`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to pause subscription" }));
    throw new Error(err.message || "Failed to pause subscription");
  }
}

export async function resumeSubscription(subscriptionId: string): Promise<void> {
  const res = await authFetch(
    `${API_BASE_URL}/api/v1/subscriptions/${subscriptionId}/resume`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to resume subscription" }));
    throw new Error(err.message || "Failed to resume subscription");
  }
}


