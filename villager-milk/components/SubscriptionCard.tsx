import { useCart } from "@/context/CartContext";
import { Calendar, Droplet, Trash2 } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function SubscriptionCard({ sub }: { sub: any }) {
  const { dispatch } = useCart();

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_SUBSCRIPTION",
      payload: { id: sub.id },
    });
  };

  const formatDate = (date?: string) => {
    if (!date) return "No End";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const planTitle =
    sub.type === "daily"
      ? "Daily Plan"
      : sub.type === "offer"
      ? "Offer Plan"
      : "Custom Plan";

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mb-3">

      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-bold text-[#0F0D23]">
          {planTitle}
        </Text>

        <Pressable
          className="p-2 bg-red-100 rounded-xl active:opacity-70"
          onPress={handleRemove}
        >
          <Trash2 size={16} color="#E11D48" />
        </Pressable>
      </View>

      {/* Units Row */}
      <View className="flex-row items-center gap-2 mt-2">
        <Droplet size={16} color="#0F80FF" />
        <Text className="text-sm font-semibold text-gray-700">
          {sub.unitsPerDay
            ? `${sub.unitsPerDay} units/day`
            : Object.keys(sub.dayUnits).length + " days selected"}
        </Text>
      </View>

      {/* Dates */}
      <View className="flex-row items-center gap-2 mt-1">
        <Calendar size={16} color="#0F80FF" />
        <Text className="text-sm text-gray-600">
          {formatDate(sub.startDate)} 
          {"  →  "}
          {sub.endDate ? formatDate(sub.endDate) : "∞"}
        </Text>
      </View>

      {/* Custom Plan Day List */}
      {sub.type === "custom" && (
        <View className="ml-7 mt-1">
          <Text className="text-xs font-medium text-gray-500">
            Days:{" "}
            {Object.keys(sub.dayUnits)
              .map((d) =>
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][Number(d)]
              )
              .join(", ")}
          </Text>
        </View>
      )}

    </View>
  );
}
