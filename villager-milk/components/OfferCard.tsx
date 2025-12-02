import { SubscriptionPlan } from "@/types/Subscriptions";
import { BadgePercent } from "lucide-react-native";
import { Text, View } from "react-native";
import StartFrom from "./DateInpute";

export default function OfferCard({ plan }: { plan: SubscriptionPlan }) {
  const formattedTitle =
    plan.title.charAt(0).toUpperCase() + plan.title.slice(1).toLowerCase();

  return (
    <View className="bg-white rounded-2xl p-3 mt-3 border border-[#E4F1FD] shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">

      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-[15px] font-semibold text-[#0A2533] tracking-tight">
          {formattedTitle}
        </Text>

        <View className="flex-row items-center gap-1 bg-[#E8FBEA] px-2 py-[2px] rounded-lg">
          <BadgePercent size={13} color="#0E8A47" />
          <Text className="text-[11px] font-medium text-[#0E8A47]">
            {plan.offer}
          </Text>
        </View>
      </View>

      {/* Price */}
      <Text className="text-lg font-semibold text-blue-400 mt-1 leading-tight">
        ₹{plan.price}
      </Text>

      <Text className="text-[11px] text-gray-500">
        incl. delivery & taxes
      </Text>

      {/* Divider line subtle */}
      <View className="h-[1px] bg-[#EAF2FB] my-2" />

      {/* Start Date UI */}
      <StartFrom lable={plan.startLabel ?? "Start date"} />
    </View>
  );
}
