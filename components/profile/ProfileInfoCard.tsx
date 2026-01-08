import { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";

interface ProfileInfoCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  label: string;
  value: string;
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  icon: Icon,
  iconColor,
  iconBgColor,
  label,
  value,
}) => {
  return (
    <View className="flex-row items-center p-4 bg-white rounded-2xl mb-3 border border-blue-100 shadow-sm">
      <View 
        className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={22} color={iconColor} strokeWidth={2.5} />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
          {label}
        </Text>
        <Text className="text-base font-bold text-[#0F0D23]">
          {value}
        </Text>
      </View>
    </View>
  );
};