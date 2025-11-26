import CustomSubscription from "@/components/CustomSubscription";
import DailySubscription from "@/components/DailySubscription";
import OfferCard from "@/components/OffeerCard";

import { products } from "@/Data/products";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function SubscribeScreen() {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id == Number(id));

    const [activeTab, setActiveTab] = useState<"daily" | "custom" | "forYou">("daily")

    if (!product) return <Text>Product not found</Text>;

    return (
        <View className="flex-1 bg-[#D9F2FF] h-full  pt-4">

            {/* Header */}
            <View className="flex-row justify-between items-center mb-2  px-5">
                <Text className="text-2xl font-semibold text-[#0F0D23]">Subscribe</Text>

                <Pressable
                    onPress={() => router.back()}
                    className="w-12 h-12 bg-[#6DD1EB] rounded-2xl items-center justify-center"
                >
                    <ArrowLeft size={20} color="#FFFFFF" />
                </Pressable>
            </View>


            {/* Product Card */}
            <View className="bg-white rounded-3xl p-4 shadow-md shadow-blue-200/40 h-full">
                <View className="flex-row items-center">

                    <Image
                        source={product.images[0]}
                        className="w-40 h-44 rounded-2xl bg-[#F3F8FF]"
                        resizeMode="contain"
                    />

                    <View className="ml-4 flex-col justify-evenly   h-48">
                        <Text className="text-lg font-semibold text-[#0F0D23]">
                            {product.name}
                        </Text>
                        <View className="flex-col">
                            <Text className="text-xs text-gray-400 font-semibold">Packaging</Text>
                            <Text className="text-sm text-slate-600">{product.volume || product.weight}</Text>
                        </View>
                        <View className="flex-col">
                            <Text className="text-xs text-gray-400 font-semibold">Price</Text>
                            <Text className="text-base font-bold text-[#0F0D23]">
                                ₹{product.price}
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Tabs */}
                <View className="flex-row   rounded-xl mt-2 mb-1  overflow-hidden border-y border-gray-200  ">
                    <Pressable
                        className="flex-1 py-3 items-center "
                        onPress={() => setActiveTab("daily")}>
                        <Text className={`  font-semibold ${activeTab === "daily" ? `text-black` : `text-slate-500`}`}>Daily</Text>
                    </Pressable>
                    <Pressable
                        className="flex-1 py-3 items-center"
                        onPress={() => setActiveTab("forYou")}>
                        <Text className={`  font-semibold ${activeTab === "forYou" ? `text-black` : `text-slate-500`}`}>For You</Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 py-3 items-center"
                        onPress={() => setActiveTab("custom")}>
                        <Text className={`  font-semibold ${activeTab === "custom" ? `text-black` : `text-slate-500`}`}>Custom</Text>
                    </Pressable>

                </View>

                {/* Arrow section (placeholder for your input UI) */}
                {
                    activeTab === "daily" &&
                    <ScrollView
                        className="mt-2 "
                        style={{ maxHeight: 220 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {<DailySubscription />}
                    </ScrollView>
                }

                {
                    activeTab === "forYou" && (
                        <ScrollView
                            className="mt-2 "
                            style={{ maxHeight: 220 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                product.subscriptions
                                    ? Object.entries(product.subscriptions).map(([key, val], idx) => (
                                        <View key={idx} className="mb-2">
                                            <OfferCard plan={{ ...val, title: key }} />
                                        </View>
                                    ))
                                    : <Text className="text-slate-500 mt-3">Offer Not Available</Text>
                            }
                        </ScrollView>
                    )
                }



                {
                    activeTab === "custom" && <CustomSubscription />
                }


                {/* Subscribe button */}
                <Pressable className="mt-8 bg-[#0F80FF] py-4 rounded-2xl items-center ">
                    <Text className="text-white text-lg font-semibold">
                        Subscribe
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
