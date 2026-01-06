import { authFetch } from "@/api/authFetch";
import { API_BASE_URL } from "@/config/env";
import type { User } from "@/types/api";

const BASE_API = `${API_BASE_URL}/api/v1/user`;

export async function getUserProfile(userId: string): Promise<User> {
  const res = await authFetch(`${BASE_API}/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to fetch user profile" }));
    throw new Error(err.message || "Failed to fetch user profile");
  }

  return res.json();
}

export async function updateUserProfile(userId: string, data: { name: string }): Promise<User> {
  const res = await authFetch(`${BASE_API}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to update user profile" }));
    throw new Error(err.message || "Failed to update user profile");
  }

  return res.json();
}