 
import CustomSubscription from "@/components/subscription/CustomSubscription";
import PredefinedPlanCard from "@/components/subscription/PredefinedPlanCard";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscribeScreen() {
  const router = useRouter();
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [activeTab, setActiveTab] = useState<"PREDEFINED" | "CUSTOM">("PREDEFINED");
  
  const slideAnim = useRef(new Animated.Value(0)).current;

  const { product, loading: productLoading } = useProductDetail(productId);
  const { plans, loading: plansLoading } = useSubscriptionPlans(productId);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: activeTab === "PREDEFINED" ? 0 : 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [activeTab, slideAnim]);

  if (productLoading || plansLoading) {
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
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 py-4">
        <Text className="text-2xl font-bold text-slate-900">
          Subscribe & Save
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="bg-blue-600 p-3 rounded-2xl shadow-md"
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Product Summary Card */}
      <View className="mx-5 mb-5 bg-white rounded-lg p-5 shadow-lg border border-slate-100">
        <View className="flex-row items-center">
          <View className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3">
            <Image
              source={{ uri: product.imageUrl }}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View>

          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-slate-900" numberOfLines={2}>
              {product.name}
            </Text>

            <Text className="text-sm text-slate-500 mt-1">
              per {product.unit}
            </Text>

            <View className="mt-2">
              <Text className="text-2xl font-black text-blue-600">
                ₹{product.price}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="mx-5 mb-5 relative">
        <View className="bg-white rounded-lg p-1.5 shadow-md border border-slate-100 flex-row">
          <Animated.View
            className="absolute top-1.5 bottom-1.5 bg-blue-600 rounded-xl shadow-lg"
            style={{
              width: '50%',
              left: 6,
              transform: [{
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1.3],
                  outputRange: [1, (390 - 40 - 12) / 2]  
                })
              }]
            }}
          />
          
          <Pressable
            onPress={() => setActiveTab("PREDEFINED")}
            className="flex-1 py-3.5 rounded-full z-10"
          >
            <Text className={`text-center text-xs font-bold ${activeTab === "PREDEFINED" ? 'text-white' : 'text-slate-600'}`}>
              RECOMMENDED PLANS
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("CUSTOM")}
            className="flex-1 py-3.5 rounded-full z-10"
          >
            <Text className={`text-center text-xs font-bold ${activeTab === "CUSTOM" ? 'text-white' : 'text-slate-600'}`}>
              CUSTOM PLAN
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {activeTab === "PREDEFINED" ? (
          <View className="mx-5 space-y-3">
            {plans?.length === 0 ? (
              <View className="items-center py-10">
                <Text className="text-slate-400 text-center">
                  No subscription plans available
                </Text>
              </View>
            ) : (
              plans?.map(plan => (
                <PredefinedPlanCard
                  key={plan.id}
                  product={product}
                  plan={plan}
                />
              ))
            )}
          </View>
        ) : (
          <View className="mx-5">
            <CustomSubscription product={product} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}