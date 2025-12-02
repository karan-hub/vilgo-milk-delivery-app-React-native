import OrderCard from "@/components/OrderCard";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import { Home } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProductDetails() {
  const { state } = useCart();
  const router = useRouter();

  const totalItems = state.items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  return (
    <SafeAreaView className="flex-1 bg-[#D9F2FF]">
      <View className="flex-col items-start justify-center px-5 pt-6">
        <Text className="text-xl font-semibold text-[#0F0D23]">
          My Cart ({totalItems})
        </Text>

        <Pressable
          className="flex-row gap-1 items-center mt-1"
          onPress={() => router.push("/address")}
        >
          <Home size={18} color="#6DD1EB" />
          <Text className="text-sm font-semibold text-[#0F0D23]">
            Address
          </Text>
        </Pressable>
      </View>

      <View className="bg-slate-100 flex-1  rounded-t-3xl mt-2 px-5 pb-10">
        <Text className="text-lg mt-3 font-semibold">Subscription</Text>

        <Text className="text-lg mt-3 font-semibold">Buy Once</Text>
        <ScrollView>
          {
            state.items.map((item: Product) => (
              <OrderCard key={item.id} id={item.id} />
            ))
          }
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}
