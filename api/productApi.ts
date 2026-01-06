import { API_BASE_URL } from "../config/env";
import { Product } from "../types/product";

export interface ProductPageResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export async function fetchProducts(
  page = 0,
  size = 4
): Promise<ProductPageResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/products?page=${page}&size=${size}`
  );

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  return res.json();
}

