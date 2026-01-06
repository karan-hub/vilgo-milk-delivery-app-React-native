import ProductActions from "@/components/product/ProductActions";
import ProductHeader from "@/components/product/ProductHeader";
import ProductMedia from "@/components/product/ProductMedia";
import ProductPricing from "@/components/product/ProductPricing";
import ProductTabs from "@/components/product/ProductTabs";
import ProductTabSection from "@/components/product/ProductTabSection";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading, activeTab, setActiveTab } = useProductDetail(id);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-slate-50 to-white justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-slate-50 to-white justify-center items-center">
        <Text className="text-slate-600 text-base">Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-slate-50 to-white">
      <ProductHeader product={product} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ProductMedia imageUrl={product.imageUrl} />

        <ProductPricing
          price={product.price}
          unit={product.unit}
          inStock={product.inStock}
        />

        <ProductTabs activeTab={activeTab} onChange={setActiveTab} />

        <ProductTabSection product={product} activeTab={activeTab} />
      </ScrollView>

      <ProductActions product={product} />
    </SafeAreaView>
  );
}