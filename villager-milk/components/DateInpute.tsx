import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import {
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

interface Props {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

export default function DateInput({ label, value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];  
      onChange(formatted);
    }
  };

  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-base font-semibold text-[#0F0D23] w-1/2">
        {label}
      </Text>

      <Pressable
        onPress={() => setShowPicker(true)}
        className="flex-row items-center bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm gap-2"
      >
        <Text className="text-slate-600 w-24">
          {value || "Select date"}
        </Text>
        <Calendar size={18} color="#6DD1EB" />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={new Date()}  
          onChange={handleChange}
        />
      )}
    </View>
  );
}
