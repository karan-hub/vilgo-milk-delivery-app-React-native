import { Minus, Plus } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const QuantitySelector = ({
    quantity,
    onIncrease,
    onDecrease,
    width,
    height,
}: {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    width?: number;
    height?: number;
}) => {
    // Calculate responsive dimensions
    const defaultHeight = 40;
    const defaultWidth = 110;
    const componentHeight = height || defaultHeight;
    const componentWidth = width || defaultWidth;

    // Scale factors based on height
    const scaleFactor = componentHeight / defaultHeight;
    const buttonSize = Math.max(24, Math.min(32, 28 * scaleFactor)); // Between 24-32px
    const fontSize = Math.max(14, Math.min(18, 16 * scaleFactor)); // Between 14-18px
    const iconSize = Math.max(12, Math.min(18, 14 * scaleFactor)); // Between 12-18px
    const paddingHorizontal = Math.max(2, Math.min(6, 4 * scaleFactor));
    const marginHorizontal = Math.max(6, Math.min(12, 8 * scaleFactor));

    return (
        <View
            className="flex-row items-center bg-white rounded-xl border border-blue-100 shadow-sm"
            style={{
                width: componentWidth,
                height: componentHeight,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingHorizontal,
            }}
        >

            {/* Decrease */}
            <Pressable
                onPress={onDecrease}
                disabled={quantity <= 1}
                className={`rounded-lg items-center justify-center ${
                    quantity > 1 ? 'bg-gray-50 active:bg-gray-100' : 'bg-gray-100'
                }`}
                style={{
                    width: buttonSize,
                    height: buttonSize,
                }}
            >
                <Minus
                    size={iconSize}
                    color={quantity > 1 ? "#0F80FF" : "#9CA3AF"}
                />
            </Pressable>

            {/* Quantity Number */}
            <Text
                className="font-bold text-[#0F0D23] text-center"
                style={{
                    fontSize: fontSize,
                    marginHorizontal: marginHorizontal,
                    minWidth: Math.max(20, 24 * scaleFactor),
                }}
            >
                {quantity}
            </Text>

            {/* Increase */}
            <Pressable
                onPress={onIncrease}
                className="rounded-lg items-center justify-center bg-[#0F80FF] active:opacity-80"
                style={{
                    width: buttonSize,
                    height: buttonSize,
                }}
            >
                <Plus
                    size={iconSize}
                    color="#fff"
                />
            </Pressable>

        </View>
    );
};

export default QuantitySelector;
