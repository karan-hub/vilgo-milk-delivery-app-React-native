import { products } from "@/Data/products";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Searchbar";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import {
  MapPinCheckInside,
  ShoppingCart,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const { state } = useCart();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = state.items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  return (
    <SafeAreaView className="flex-1 bg-[#EAF6FF]">
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        {/* Location */}
        <Pressable
          onPress={() => router.push("/address")}
          className="flex-row items-center gap-2"
        >
          <MapPinCheckInside size={22} color="#0F0D23" />
          <Text className="text-sm font-semibold text-[#0F0D23]">
            Nashik
          </Text>
        </Pressable>

        {/* Cart Icon */}
        <Pressable
          onPress={() => router.push("/(tabs)/order")}
          className="relative"
        >
          <ShoppingCart size={26} color="#0F0D23" />

          {/* Cart Badge */}
          {totalItems > 0 && (
            <View className="absolute -top-1 -right-2 bg-red-600 rounded-full px-1.5">
              <Text className="text-[10px] font-bold text-white">
                {totalItems}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Searchbar */}
      <View className="px-4">
        <Search
          placeholder="Search for Milk"
          onChangeText={setSearchQuery}
          value={searchQuery}
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
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 120,
        }}
        ListHeaderComponent={
          <View>
            <Banner />
            <Text className="text-lg font-bold text-[#0F0D23] mx-4 mt-3">
              Exclusive Offers 🥛
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
