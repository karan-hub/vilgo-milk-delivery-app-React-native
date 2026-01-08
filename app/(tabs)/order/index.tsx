import OrderCard from "@/components/OrderCard";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { Home, ShoppingCart } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Order() {
  const { state } = useCart();
  const router = useRouter();
  
  const items = state?.items || [];
  const totalItems = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );
 
  return (
    <View className="flex-1 bg-[#D9F2FF]">

      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-6">
        <View>
          <Text className="text-xl font-extrabold text-[#0F0D23]">
            My Cart
          </Text>
          <Text className="text-xs font-medium text-gray-500">
             {totalItems} items
          </Text>
        </View>

        <Pressable
          className="flex-row gap-1 items-center"
          onPress={() => router.push("/address")}
        >
          <Home size={20} color="#0F80FF" />
          <Text className="text-sm font-semibold text-[#0F0D23]">
            Address
          </Text>
        </Pressable>
      </View>

      {/* Main Sheet */}
      <View className="flex-1 bg-white rounded-t-2xl px-5 pt-6 pb-8 mt-4 shadow-lg">
        {/* Buy Once Section */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-xl font-black text-slate-900">
              Buy Once
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              One-time delivery items
            </Text>
          </View>
          {totalItems > 0 && (
            <View className="bg-[#0F80FF] px-4 py-2 rounded-full">
              <Text className="text-sm font-bold text-white">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </Text>
            </View>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {totalItems === 0 ? (
            <View className="items-center py-16">
              <View className="w-24 h-24 bg-blue-50 rounded-2xl items-center justify-center mb-6">
                <ShoppingCart size={40} color="#0F80FF" />
              </View>
              <Text className="text-xl font-bold text-[#0F0D23] mb-2">
                Your cart is empty
              </Text>
              <Text className="text-base text-gray-500 text-center max-w-[250px]">
                Add some fresh milk products to get started with your order
              </Text>
            </View>
          ) : (
            <View className="space-y-3">
              {items.map((item: CartItem, index: number) => (
                <OrderCard 
                  key={`${item.id}-${item.unit}-${index}`} 
                  id={item.id}
                  unit={item.unit}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {(items.length > 0  ) && (
          <Pressable
            className="mt-4 bg-[#0F80FF] py-4 rounded-2xl items-center shadow-sm active:opacity-90"
            onPress={() => router.push("/checkout")}
          >
            <Text className="text-white text-base font-bold">
              Checkout
            </Text>
          </Pressable>
        )}
      </View>


    </View>
  );
}
