import CustomSubscription from "@/components/CustomSubscription";
import DailySubscription from "@/components/DailySubscription";
import OfferCard from "@/components/OfferCard";

import { products } from "@/Data/products";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function SubscribeScreen() {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id == Number(id));

    const [activeTab, setActiveTab] = useState<"daily" | "custom" | "forYou">("daily");
    const router = useRouter();

    if (!product) return <Text>Product not found</Text>;

    return (
        <View className="flex-1 bg-[#D9F2FF] pt-4">

            {/* Header */}
            <View className="flex-row justify-between items-center px-5 mb-2">
                <Text className="text-2xl font-semibold text-[#0F0D23]">Subscribe</Text>

                <Pressable
                    onPress={() => router.back()}
                    className="w-12 h-12 bg-[#6DD1EB] rounded-2xl items-center justify-center"
                >
                    <ArrowLeft size={20} color="#FFFFFF" />
                </Pressable>
            </View>

            {/* Product Card */}
            <View className="bg-white rounded-3xl p-4 shadow-md shadow-blue-200/40 flex-1">

                {/* Product Info */}
                <View className="flex-row items-center mb-2">
                    <Image
                        source={product.images[0]}
                        className="w-40 h-44 rounded-2xl bg-[#F3F8FF]"
                        resizeMode="contain"
                    />

                    <View className="ml-4 justify-between h-44">
                        <Text className="text-lg font-semibold text-[#0F0D23]">
                            {product.name}
                        </Text>

                        <View>
                            <Text className="text-xs text-gray-400 font-semibold">Packaging</Text>
                            <Text className="text-sm text-slate-600">
                                {product.volume || product.weight}
                            </Text>
                        </View>

                        <View>
                            <Text className="text-xs text-gray-400 font-semibold">Price</Text>
                            <Text className="text-base font-bold text-[#0F0D23]">
                                ₹{product.price}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Tabs */}
                <View className="flex-row rounded-xl mt-2 mb-2 overflow-hidden border-y border-gray-200">
                    {[
                        { key: "daily", title: "Daily" },
                        { key: "forYou", title: "For You" },
                        { key: "custom", title: "Custom" },
                    ].map(({ key, title }) => (
                        <Pressable
                            key={key}
                            className="flex-1 py-3 items-center"
                            onPress={() => setActiveTab(key as any)}
                        >
                            <Text
                                className={`font-semibold ${activeTab === key
                                    ? "text-black"
                                    : "text-slate-500"
                                    }`}
                            >
                                {title}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Content Scroll */}
                {activeTab !== "custom" && <ScrollView
                    className="mt-1"
                    style={{ maxHeight: 230  }}
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === "daily" && <DailySubscription />}

                    {activeTab === "forYou" && (
                        product.subscriptions ? (
                            Object.entries(product.subscriptions).map(([key, val], idx) => (
                                <OfferCard key={idx} plan={{ ...val, title: key }} />
                            ))
                        ) : (
                            <Text className="text-slate-500 mt-3">Offer Not Available</Text>
                        )
                    )}


                </ScrollView>
                }
                {activeTab === "custom" && <CustomSubscription />}

                {/* Subscribe button → FIXED position */}
                <Pressable className="bg-[#0F80FF] py-3 rounded-2xl items-center mt-10">
                    <Text className="text-white text-lg font-semibold">
                        Subscribe
                    </Text>
                </Pressable>

            </View>
        </View>
    );
}
