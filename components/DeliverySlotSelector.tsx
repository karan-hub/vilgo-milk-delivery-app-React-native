import { CheckCircle } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface DeliverySlotSelectorProps {
  selectedSlot: "MORNING" | "EVENING";
  onSlotChange: (slot: "MORNING" | "EVENING") => void;
}

export default function DeliverySlotSelector({ selectedSlot, onSlotChange }: DeliverySlotSelectorProps) {
  const slots = [
    {
      key: "MORNING" as const,
      label: "Morning",
      time: "9 AM - 12 PM",
      description: "Fresh morning delivery"
    },
    {
      key: "EVENING" as const,
      label: "Evening",
      time: "6 PM - 9 PM",
      description: "Convenient evening delivery"
    }
  ];

  return (
    <View className="mt-6">
      <Text className="text-lg font-semibold mb-3 text-[#0F0D23]">Delivery Slot</Text>

      {slots.map((slot) => (
        <Pressable
          key={slot.key}
          className={`flex-row items-center justify-between p-4 rounded-xl border mb-3 ${
            selectedSlot === slot.key ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"
          }`}
          onPress={() => onSlotChange(slot.key)}
        >
          <View className="flex-1">
            <Text className="text-base font-semibold text-[#0F0D23] mb-1">
              {slot.label}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              {slot.time}
            </Text>
            <Text className="text-xs text-gray-500">
              {slot.description}
            </Text>
          </View>

          {selectedSlot === slot.key && (
            <CheckCircle size={20} color="#0F80FF" />
          )}
        </Pressable>
      ))}
    </View>
  );
}