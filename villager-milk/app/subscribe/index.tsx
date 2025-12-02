import CustomSubscription from "@/components/CustomSubscription";
import DailySubscription from "@/components/DailySubscription";
import OfferCard from "@/components/OfferCard";
import { products } from "@/Data/products";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscribeScreen() {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id == Number(id));

    const [activeTab, setActiveTab] = useState<"daily" | "custom" | "forYou">("daily");
    const router = useRouter();

    if (!product) return <Text>Product not found</Text>;

    return (
        <SafeAreaView className="flex-1 bg-[#D9F2FF]">
            {/* Header */}
            <View className="flex-row justify-between items-center px-5 py-4">
                <Text className="text-2xl font-bold text-[#0F0D23]">Subscribe</Text>

                <Pressable
                    onPress={() => router.back()}
                    className="bg-[#6DD1EB] p-3 rounded-2xl shadow-sm active:opacity-80"
                >
                    <ArrowLeft size={20} color="#FFFFFF" />
                </Pressable>
            </View>

            {/* Product Card Container */}
            <View className="flex-1 mx-5 mb-5">
                <View className="bg-white rounded-3xl p-5 shadow-lg shadow-blue-200/50 flex-1">
                    
                    {/* Product Info */}
                    <View className="flex-row items-center mb-5">
                        <View className="bg-[#F3F8FF] rounded-2xl p-2">
                            <Image
                                source={product.images[0]}
                                className="w-32 h-36"
                                resizeMode="contain"
                            />
                        </View>

                        <View className="ml-4 flex-1 justify-between py-2" style={{ height: 144 }}>
                            <Text 
                                className="text-lg font-bold text-[#0F0D23]"
                                numberOfLines={2}
                            >
                                {product.name}
                            </Text>

                            <View className="gap-3">
                                <View>
                                    <Text className="text-xs text-gray-400 font-semibold mb-1">
                                        Packaging
                                    </Text>
                                    <Text className="text-sm font-semibold text-slate-700">
                                        {product.volume || product.weight}
                                    </Text>
                                </View>

                                <View>
                                    <Text className="text-xs text-gray-400 font-semibold mb-1">
                                        Price
                                    </Text>
                                    <Text className="text-lg font-bold text-[#0F0D23]">
                                        ₹{product.price}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Tabs */}
                    <View className="flex-row rounded-xl mb-4 overflow-hidden border border-gray-200 bg-gray-50">
                        {[
                            { key: "daily", title: "Daily" },
                            { key: "forYou", title: "For You" },
                            { key: "custom", title: "Custom" },
                        ].map(({ key, title }) => (
                            <Pressable
                                key={key}
                                className={`flex-1 py-3 items-center ${
                                    activeTab === key ? "bg-white" : ""
                                }`}
                                onPress={() => setActiveTab(key as any)}
                            >
                                <Text
                                    className={`font-semibold text-sm ${
                                        activeTab === key
                                            ? "text-[#0F0D23]"
                                            : "text-slate-400"
                                    }`}
                                >
                                    {title}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* Content Area */}
                    <View className="flex-1">
                        {activeTab !== "custom" ? (
                            <ScrollView
                                className="flex-1"
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 16 }}
                            >
                                {activeTab === "daily" && <DailySubscription />}

                                {activeTab === "forYou" && (
                                    product.subscriptions ? (
                                        <View className="gap-3">
                                            {Object.entries(product.subscriptions).map(([key, val], idx) => (
                                                <OfferCard key={idx} plan={{ ...val, title: key }} />
                                            ))}
                                        </View>
                                    ) : (
                                        <View className="items-center justify-center py-8">
                                            <Text className="text-slate-400 text-sm">
                                                No offers available
                                            </Text>
                                        </View>
                                    )
                                )}
                            </ScrollView>
                        ) : (
                            <CustomSubscription />
                        )}
                    </View>

                    {/* Subscribe Button */}
                    <Pressable 
                        className="bg-[#0F80FF] py-4 rounded-2xl items-center mt-5 shadow-sm active:opacity-90"
                    >
                        <Text className="text-white text-base font-bold">
                            Subscribe Now
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}