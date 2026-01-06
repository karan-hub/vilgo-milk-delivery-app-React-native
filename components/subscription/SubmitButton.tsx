import { Pressable, PressableStateCallbackType, Text } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`py-4 rounded-2xl items-center shadow-lg ${
        disabled ? "bg-slate-400" : "bg-blue-600"
      }`}
      style={({ pressed }: PressableStateCallbackType) =>
        !disabled
          ? {
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            }
          : {}
      }
    >
      <Text className="text-white font-bold text-base">
        {disabled ? "✓ Added to Cart" : "Add Custom Subscription"}
      </Text>
    </Pressable>
  );
};