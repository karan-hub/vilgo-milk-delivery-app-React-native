import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import { Product } from "../types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const loadProducts = async (page = 0, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchProducts(page, 10);

      if (append) {
        setProducts(prev => [...prev, ...data.content]);
      } else {
        setProducts(data.content);
      }

      setCurrentPage(data.number);
      setHasMorePages(!data.last);
      setTotalPages(data.totalPages);
    } catch (e) {
      setError("Unable to load products");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!loadingMore && hasMorePages) {
      await loadProducts(currentPage + 1, true);
    }
  };

  useEffect(() => {
    loadProducts(0, false);
  }, []);

  return {
    products,
    loading,
    loadingMore,
    error,
    hasMorePages,
    currentPage,
    totalPages,
    reload: () => loadProducts(0, false),
    loadMore: loadMoreProducts,
  };
}

