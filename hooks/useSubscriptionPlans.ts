import { API_BASE_URL } from "@/config/env";
import { SubscriptionPlan } from "@/types/SubscriptionPlan";
import { useEffect, useState } from "react";

export function useSubscriptionPlans(productId: String) {
    const [plans, setPlans] = useState<SubscriptionPlan[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null)
    useEffect(() => {
        if (!productId)
            return;
        const loadPlans = async () => {
            try {

                const res = await fetch(
                    `${API_BASE_URL}/api/v1/subscription-plans/product/${productId}`
                );

                if (!res.ok) {
                    const body = await res.json();
                    if (res.status === 500 && body?.message?.includes("No subscription plans")) {
                        setPlans([]);
                        return;
                    }
                    throw new Error(body?.message || "Failed to load plans");
                }
                setPlans(await res.json());

            } catch (error: any) {
                setPlans([])
                setError(error.message)

            } finally {
                setLoading(false)
            }
        }
        loadPlans();
    }, [productId])
    return { plans, loading , error }
}