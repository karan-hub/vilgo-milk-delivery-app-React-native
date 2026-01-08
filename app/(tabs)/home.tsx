import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Searchbar";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "expo-router";
import {
  Flower,
  MapPinCheckInside,
  ShoppingCart
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const { state } = useCart();
  const {
    products,
    loading,
    loadingMore,
    error,
    hasMorePages,
    reload,
    loadMore
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const items = state?.items || [];
  const totalItems = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const handleSearchFocus = () => {
    // Handle search focus if needed
  };

  const handleSearchBlur = () => {
    // Handle search blur if needed
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };



  if (loading && products.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#EAF6FF] items-center justify-center">
        <View className="bg-white rounded-2xl p-8 shadow-sm">
          <ActivityIndicator size="large" color="#0F80FF" />
          <Text className="text-gray-600 mt-4 font-medium">Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#EAF6FF] items-center justify-center px-6">
        <View className="bg-white rounded-2xl p-6 items-center shadow-sm">
          <Text className="text-base text-gray-600 mb-4 text-center">{error}</Text>
          <Pressable
            onPress={reload}
            className="bg-[#0F80FF] py-3 px-6 rounded-xl active:opacity-90"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }






  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView className="flex-1 bg-[#EAF6FF]">

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          {/* Location */}
          <Pressable
            onPress={() => router.push("/address")}
            className="flex-row items-center gap-2 flex-1"
          >
            <MapPinCheckInside size={22} color="#0F0D23" />
            <Text className="text-sm font-semibold text-[#0F0D23] flex-1" numberOfLines={1}>
              Nashik
            </Text>
          </Pressable>


          {/* Cart Icon */}
          <Pressable
            onPress={() => router.push("/order")}
            className="relative p-2"
          >
            <ShoppingCart size={26} color="#0F0D23" />

            {/* Cart Badge */}
            {totalItems > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-600 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                <Text className="text-[10px] font-bold text-white leading-none">
                  {totalItems > 99 ? '99+' : totalItems}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Searchbar */}
        <View className="px-4 pb-2">
          <Search
            placeholder="What are you looking for?"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </View>
      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-around",
          paddingHorizontal: 12,
          gap: 8,
        }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 20,
        }}
        ListHeaderComponent={
          <View>
            <Banner />
            <View className="flex-row mt-4 mb-2 mx-2 justify-center gap-2 items-center">
               <Flower size={16} color={"#3b82f6"} />
              <Text className="text-lg font-bold text-[#0F0D23] text-center" numberOfLines={1}>
                Exclusive Offers
              </Text>
               <Flower size={16} color={"#3b82f6"} />
            </View>
          </View>
        }
        ListFooterComponent={
          hasMorePages && filteredProducts.length > 0 ? (
            <View className="px-4 py-4">
              <Pressable
                onPress={loadMore}
                disabled={loadingMore}
                className={`py-3 px-6 rounded-xl items-center ${
                  loadingMore ? 'bg-gray-300' : 'bg-[#0F80FF] active:opacity-90'
                }`}
              >
                {loadingMore ? (
                  <View className="flex-row items-center gap-2">
                    <ActivityIndicator size="small" color="#fff" />
                    <Text className="text-white font-semibold">Loading...</Text>
                  </View>
                ) : (
                  <Text className="text-white font-semibold">Load More Products</Text>
                )}
              </Pressable>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
