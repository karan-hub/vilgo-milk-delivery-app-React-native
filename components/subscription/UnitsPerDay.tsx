import { DeliverySchedule } from "@/types/Subscription";
import { Package } from "lucide-react-native";
import { Text, View } from "react-native";
import QuantitySelector from "../QuantitySelector";
 
interface UnitsPerDayProps {
  schedule: DeliverySchedule[];
  dayUnits: Record<number, number>;
  onUpdateUnit: (day: number, value: number) => void;
}

export const UnitsPerDay: React.FC<UnitsPerDayProps> = ({
  schedule,
  dayUnits,
  onUpdateUnit,
}) => {
  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (schedule.length === 0) return null;

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        <View className="bg-purple-50 p-2.5 rounded-xl mr-2">
          <Package size={18} color="#9333ea" />
        </View>
        <Text className="text-base font-semibold text-slate-800">
          Units per Day
        </Text>
      </View>

      {schedule.map(({ dayOfWeek }) => (
        <View
          key={dayOfWeek}
          className="flex-row justify-between items-center mb-3 bg-slate-50 p-4 rounded-2xl border border-slate-100"
        >
          <Text className="font-semibold text-slate-700 text-base">
            {weekDays[dayOfWeek]}
          </Text>
          <QuantitySelector
            quantity={dayUnits[dayOfWeek]}
            onIncrease={() => onUpdateUnit(dayOfWeek, dayUnits[dayOfWeek] + 1)}
            onDecrease={() => onUpdateUnit(dayOfWeek, dayUnits[dayOfWeek] - 1)}
          />
        </View>
      ))}
    </View>
  );
};