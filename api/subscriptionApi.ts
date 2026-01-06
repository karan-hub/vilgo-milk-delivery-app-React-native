 
import { API_BASE_URL } from "@/config/env";
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
