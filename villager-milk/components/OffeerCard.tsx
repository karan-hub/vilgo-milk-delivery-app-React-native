
import { SubscriptionPlan } from "@/types/Subscriptions";
import { BadgePercent } from "lucide-react-native";
import { Text, View } from "react-native";
import StartFrom from "./StartFrom";

export default function OfferCard({ plan }: { plan: SubscriptionPlan }) {
    console.log(plan);

    return (
        <View className="bg-white px-4 py-2 rounded-2xl shadow">
            <View className="flex-row   justify-between px-1 items-center">
                <View className=" ">
                    <Text className="text-lg uppercase font-semibold text-[#0F0D23]">{plan.title}</Text>

                </View>
                <View className="flex-row gap-2 border border-indigo-600 rounded-lg p-1">
                    <BadgePercent color={"green"} size={22} />
                    <Text className="text-base font-semibold text-green-600">{plan.offer}</Text>
                </View>
            </View>

            <View className="flex-row justify-between mt-2 border-b border-gray-100 ">
                <Text className="text-2xl font-bold text-blue-600">₹{plan.price}</Text>
            </View>

            <View className="mt-1">
                <StartFrom lable={plan.startLabel ? plan.startLabel : "Start from"} />
            </View>
        </View>
    );
}
