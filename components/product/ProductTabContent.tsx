
import { Product } from "@/types/product";
import { ScrollView, Text, View } from "react-native";
 
type Tab = "highlights" | "benefits" | "nutrition";
interface Props {
    product: Product;
    activeTab: Tab;
}
export default function ProductTabContent({ product, activeTab }: Props) {
    return (
        <View className="flex-1 mb-4">
            {activeTab === "highlights" && (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 12 }}
                >
                    <View className="space-y-4">
                        {product.highlights.map((item, idx) => (
                            <View
                                key={idx}
                                className="flex-row mb-2 items-start bg-blue-50/50 p-3.5 rounded-xl border border-blue-100"
                            >
                                <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                                <Text className="text-slate-700 text-sm flex-1 leading-5">
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}

            {activeTab === "benefits" && (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 8 }}
                >
                    <View className="space-y-2">
                        {product.benefits.map((item, idx) => (
                            <View
                                key={idx}
                                className="flex-row mb-2 items-start bg-green-50/50 p-3.5 rounded-xl border border-green-100"
                            >
                                <View className="w-5 h-5 rounded-full bg-green-500 items-center justify-center mr-3 mt-0.5">
                                    <Text className="text-white text-xs font-bold">✓</Text>
                                </View>
                                <Text className="text-slate-700 text-sm flex-1 leading-5">
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}

            {activeTab === "nutrition" && (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 8 }}
                >
                    <View className="space-y-2">
                        {Object.entries(product.nutrition).map(([key, val], idx) => (
                            <View
                                key={idx}
                                className="flex-row mb-2 items-center justify-between bg-amber-50/50 p-3.5 rounded-xl border border-amber-100"
                            >
                                <Text className="text-slate-700 font-semibold text-sm capitalize flex-1">
                                    {key.replace(/_/g, " ")}
                                </Text>
                                <View className="bg-amber-500 px-3 py-1.5 rounded-full ml-2">
                                    <Text className="text-white font-bold text-xs">
                                        {val}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    )

}