import React from "react";
import { ScrollView, Text, View } from "react-native";
import UnitInput from "./UnitInput";

export default function CustomSubscription() {
    const week = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday",
        "Friday", "Saturday",
    ];

    return (
        <View className="bg-white rounded-xl px-3 py-3 border border-gray-200 shadow-sm mt-1 h-auto">
            <Text className="text-[13px] font-semibold text-[#0F0D23] mb-1">
                Custom delivery schedule
            </Text>

            <ScrollView
                style={{ maxHeight: "auto" }}
                showsVerticalScrollIndicator={false}
            >
                {week.map((day, i) => (
                    <UnitInput key={i} lable={day} unit={1} />
                ))}
            </ScrollView>
        </View>
    );
}
