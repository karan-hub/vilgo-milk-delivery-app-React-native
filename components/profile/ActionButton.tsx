import { LucideIcon } from "lucide-react-native";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onPress,
  icon: Icon,
  variant = "primary",
  loading = false,
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return "bg-red-600 active:bg-red-500";
      case "secondary":
        return "bg-gray-200 active:bg-gray-300";
      default:
        return "bg-[#0F80FF] active:bg-blue-600";
    }
  };

  const getTextColor = () => {
    return variant === "secondary" ? "text-[#0F0D23]" : "text-white";
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`py-4 rounded-2xl shadow-lg flex-row items-center justify-center gap-2 ${
        disabled ? "bg-gray-400" : getVariantStyles()
      }`}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          {Icon && <Icon size={20} color={variant === "secondary" ? "#0F0D23" : "white"} />}
          <Text className={`font-bold text-base ${getTextColor()}`}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};