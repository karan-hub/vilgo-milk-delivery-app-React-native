import { ChevronRight, LucideIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuButtonProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  label: string;
  onPress: () => void;
  showBorder?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  icon: Icon,
  iconColor,
  iconBgColor,
  label,
  onPress,
  showBorder = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between py-4 px-4 active:bg-blue-50 ${
        showBorder ? "border-b border-blue-100" : ""
      }`}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-11 h-11 rounded-2xl items-center justify-center mr-4"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon size={22} color={iconColor} strokeWidth={2.5} />
        </View>
        <Text className="text-[#0F0D23] text-base font-semibold">{label}</Text>
      </View>
      <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center">
        <ChevronRight size={18} color="#0F80FF" strokeWidth={2.5} />
      </View>
    </TouchableOpacity>
  );
};