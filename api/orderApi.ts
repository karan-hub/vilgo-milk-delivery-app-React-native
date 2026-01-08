import { API_BASE_URL } from "@/config/env";
import { CreateOrderRequest, CreateOrderResponce } from "@/types/api";
import { authFetch } from "./authFetch";

const BASE_API = `${API_BASE_URL}/api/v1/orders`;

export async function placeOrder(orderItems: CreateOrderRequest): Promise<CreateOrderResponce> {
    const res = await authFetch(BASE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderItems)
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Order failed" }))
        throw new Error(err.message || "Order failed")
    }
    return res.json();
}