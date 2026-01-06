import { authFetch } from "@/api/authFetch";
import { API_BASE_URL } from "@/config/env";

const BASE_API = `${API_BASE_URL}/api/v1/payments`;

export async function createPayment(
  payload: {
    subscriptionId: string;
    amount: number;
    paymentMethod: "UPI" | "CASH";
  }
) {
  const res = await authFetch(`${BASE_API}/initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMessage = "Payment initiation failed";
    try {
      const contentLength = res.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 0) {
        const err = await res.json();
        errorMessage = err.message || errorMessage;
      }
    } catch (e) {
      // If we can't parse error response, use default message
    }
    throw new Error(errorMessage);
  }

  try {
    const data = await res.json();
    // Backend returns: { paymentId: "uuid", status: "PENDING" }
    return {
      paymentId: data.paymentId,
      status: data.status || "INITIATED",
      amount: payload.amount,
      paymentMethod: payload.paymentMethod,
      subscriptionId: payload.subscriptionId,
    };
  } catch (e) {
    throw new Error("Invalid response from payment service");
  }
}

export async function confirmPayment(
  payload: { paymentId: string }
) {
  const res = await authFetch(`${BASE_API}/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMessage = "Payment confirmation failed";
    try {
      const contentLength = res.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 0) {
        const err = await res.json();
        errorMessage = err.message || errorMessage;
      }
    } catch (e) {
  
    }
    throw new Error(errorMessage);
  }

  try {
    const contentLength = res.headers.get('content-length');
    if (!contentLength || parseInt(contentLength) === 0) {
      
      return {
        paymentId: payload.paymentId,
        status: "SUCCESS",
        confirmedAt: new Date().toISOString(),
      };
    }
    return await res.json();
  } catch (e) {
   
    return {
      paymentId: payload.paymentId,
      status: "SUCCESS",
      confirmedAt: new Date().toISOString(),
    };
  }
}
