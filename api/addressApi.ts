import { authFetch } from "@/api/authFetch";
import { API_BASE_URL } from "@/config/env";
import type { Address, CreateAddressRequest, UpdateAddressRequest } from "@/types/api";

const BASE_API = `${API_BASE_URL}/api/v1/addresses`;

export async function getAddresses(): Promise<Address[]> {
  const res = await authFetch(BASE_API, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to fetch addresses" }));
    throw new Error(err.message || "Failed to fetch addresses");
  }

  return res.json();
}

export async function createAddress(address: CreateAddressRequest): Promise<Address> {
  const res = await authFetch(BASE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to create address" }));
    throw new Error(err.message || "Failed to create address");
  }

  return res.json();
}

export async function updateAddress(addressId: string, address: UpdateAddressRequest): Promise<Address> {
  const res = await authFetch(`${BASE_API}/${addressId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to update address" }));
    throw new Error(err.message || "Failed to update address");
  }

  return res.json();
}

export async function deleteAddress(addressId: string): Promise<void> {
  const res = await authFetch(`${BASE_API}/${addressId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to delete address" }));
    throw new Error(err.message || "Failed to delete address");
  }
}