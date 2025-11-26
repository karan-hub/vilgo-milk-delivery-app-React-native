import { Minus, Plus } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const QuantitySelector = ({
    quantity,
    onIncrease,
    onDecrease,
}: {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}) => {
    return (
        <View className="flex-row items-center bg-white rounded-xl px-2 py-1 border border-gray-200 shadow-sm">

            {/* Decrease */}
            <Pressable
                onPress={onDecrease}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full items-center justify-center
                   bg-gray-100 active:opacity-60"
            >
                <Minus
                    size={14}
                    color={quantity > 1 ? "#0E7490" : "#9CA3AF"}
                />
            </Pressable>

            {/* Quantity Number */}
            <Text className="mx-4 text-base font-semibold text-[#0F0D23]">
                {quantity}
            </Text>

            {/* Increase */}
            <Pressable
                onPress={onIncrease}
                className="w-8 h-8 rounded-full items-center justify-center
                   bg-[#6DD1EB] active:opacity-70"
            >
                <Plus size={14} color="#fff" />
            </Pressable>

        </View>
    );
};

export default QuantitySelector;
