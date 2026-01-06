import { API_BASE_URL } from "@/config/env";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export function useProductDetail(id?: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] =
        useState<"highlights" | "benefits" | "nutrition">("highlights");

    useEffect(() => {
        if (!id) {
            return;
        }

        const load = async () => {
            try {
                const res = await fetch(
                    `${API_BASE_URL}/api/v1/products?id=${id}`
                )
                if (!res.ok) throw new Error();
                setProduct(await res.json())

            } catch (error) {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }
        load()
    }, [id])
    
    return {
        product,
        loading,
        activeTab,
        setActiveTab,
    };

}