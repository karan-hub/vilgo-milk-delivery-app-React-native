
import { useCart } from "@/context/CartContext";
import { BadgePercent, CheckCircle } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import DateInput from "./DateInpute";

export default function OfferCard(
  { productId, plan, }: {
    productId: number;
    plan: OfferPlan;
  }) {



  const [startDate, setStartDate] = useState<string>("")
  const { dispatch } = useCart();

  const formattedTitle =
    plan.title.charAt(0).toUpperCase() + plan.title.slice(1).toLowerCase();


  const handleAddPlan = () => {
    if (!startDate) {
      Alert.alert(
        "Start Date Required",
        "Please select your subscription start date."
      );
      return;
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationDays);

    const subscription = {
      id: Date.now().toString(),
      productId,
      type: "offer",
      unitsPerDay: plan.units,
      durationDays: plan.durationDays,
      startDate,
      endDate: endDate.toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: "ADD_SUBSCRIPTION",
      payload: subscription,
    });

    Alert.alert("Added!", `${formattedTitle} plan added successfully.`);
  };


  return (
    <View className="bg-white rounded-2xl p-4 border border-[#E4F1FD] shadow-sm">

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
      <Text className="text-xl font-bold text-blue-500 mt-1">₹{plan.price}</Text>
      <Text className="text-[11px] text-gray-500">incl. delivery & taxes</Text>

      {/* Offer Info */}
      <View className="flex-row items-center mt-2 gap-1 ">
        <CheckCircle size={14} color="#0F80FF" className="mr-1" />
        <Text className="text-xs text-gray-600">
          {plan.units} Unit/day — {plan.durationDays} Days Plan
        </Text>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-[#EAF2FB] my-3" />

      {/* Date Picker */}
      <DateInput
        label="Start Date"
        value={startDate}
        onChange={setStartDate}
      />

      {/* Add Plan Button */}
      <Pressable
        onPress={handleAddPlan}
        className="bg-[#0F80FF] py-3 rounded-xl items-center mt-4 active:opacity-80 shadow-sm"
      >
        <Text className="text-white font-semibold text-sm tracking-tight">
          Add Plan
        </Text>
      </Pressable>

    </View>
  );
}
