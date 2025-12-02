import OrderCard from "@/components/OrderCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { Home } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const { state } = useCart();
  const router = useRouter();

  const totalOnceItems = state.items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const totalSubscriptions = state.subscriptions.length;

  return (
    <SafeAreaView className="flex-1 bg-[#D9F2FF]">

      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-6">
        <View>
          <Text className="text-xl font-extrabold text-[#0F0D23]">
            My Cart
          </Text>
          <Text className="text-xs font-medium text-gray-500">
            {totalSubscriptions} plans • {totalOnceItems} items
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
      <View className="flex-1 bg-white rounded-t-3xl px-5 pt-6 pb-8 mt-4 shadow-lg">

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Subscription Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-[#0F0D23] mb-2">
              Subscriptions
            </Text>

            {totalSubscriptions === 0 ? (
              <Text className="text-sm text-gray-400">
                No subscription plans added yet.
              </Text>
            ) : (
              state.subscriptions.map((sub: any) => (
                <SubscriptionCard key={sub.id} sub={sub} />
              ))
            )}
          </View>

          {/* Divider */}
          <View className="h-[1px] bg-gray-200 my-3" />

          {/* Buy Once Section */}
          <View>
            <Text className="text-lg font-semibold text-[#0F0D23] mb-2">
              Buy Once
            </Text>

            {totalOnceItems === 0 ? (
              <Text className="text-sm text-gray-400">
                Cart is empty.
              </Text>
            ) : (
              state.items.map((item: any) => (
                <OrderCard key={item.id} id={item.id} />
              ))
            )}
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}
