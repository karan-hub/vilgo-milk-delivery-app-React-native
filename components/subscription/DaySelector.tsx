import React from "react";
import { Pressable, PressableStateCallbackType, Text, View } from "react-native";

interface DaySelectorProps {
  selectedDays: number[];
  onToggleDay: (dayIndex: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  onToggleDay,
}) => {
  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <View className="mb-6">
      <Text className="text-base font-semibold text-slate-800 mb-4">
        Select Delivery Days
      </Text>

      <View className="flex-row flex-wrap gap-3">
        {weekDays.map((day: string, index: number) => {
          const isActive: boolean = selectedDays.includes(index);

          return (
            <Pressable
              key={index}
              onPress={() => onToggleDay(index)}
              className={`
                flex-1 min-w-[80px] px-4 py-3.5 rounded-2xl
                ${
                  isActive
                    ? "bg-blue-600 shadow-lg shadow-blue-600/30"
                    : "bg-white border-2 border-slate-200 shadow-sm"
                }
              `}
              style={({ pressed }: PressableStateCallbackType) => ({
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              <Text
                className={`
                  text-center font-semibold text-sm
                  ${isActive ? "text-white" : "text-slate-700"}
                `}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {selectedDays.length > 0 && (
        <Text className="text-xs text-slate-500 mt-3">
          {selectedDays.length} {selectedDays.length === 1 ? "day" : "days"} selected
        </Text>
      )}
    </View>
  );
};