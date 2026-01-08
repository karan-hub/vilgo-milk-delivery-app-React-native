import { DeliverySchedule } from "@/types/Subscription";
import { calculateCustomPrice } from "@/utils/calculateCustomPrice";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import { Calendar, Moon, Package, Sun } from "lucide-react-native";
import DateInput from "./DateInpute";
import QuantitySelector from "./QuantitySelector";

interface Props {
  product: {
    id: string;
    price: number;
  };
}

export default function CustomSubscription({ product }: Props) {
  const router = useRouter();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [dayUnits, setDayUnits] = useState<Record<number, number>>({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deliverySlot, setDeliverySlot] =
    useState<"MORNING" | "EVENING">("MORNING");

  const toggleDay = (day: number) => {
    setSelectedDays(prev => {
      const included = prev.includes(day);
      const next = included ? prev.filter(d => d !== day) : [...prev, day];

      setDayUnits(prevUnits => {
        if (included) {
          const copy = { ...prevUnits };
          delete copy[day];
          return copy;
        }

        // ensure we always have a finite default value for a newly added day
        if (prevUnits[day] != null && Number.isFinite(prevUnits[day])) {
          return prevUnits;
        }

        return { ...prevUnits, [day]: 1 };
      });

      return next;
    });
  };

  const updateUnit = (day: number, value: number) => {
    if (!Number.isFinite(value)) return;
    const v = Math.max(1, Math.min(10, Math.floor(value)));
    setDayUnits(prev => ({ ...prev, [day]: v }));
  };


  const schedule: DeliverySchedule[] = useMemo(
    () =>
      selectedDays.map(day => ({
        dayOfWeek: day,
        units: dayUnits[day] || 1,
      })),
    [selectedDays, dayUnits]
  );

  const estimatedPrice = useMemo(() => {
    if (!startDate || !endDate || schedule.length === 0) return 0;

    return calculateCustomPrice(
      startDate,
      endDate,
      schedule,
      product.price
    );
  }, [startDate, endDate, schedule, product.price]);

  const handleAddCustom = () => {
    if (!startDate || !endDate) {
      Alert.alert("Dates required", "Please select start and end date.");
      return;
    }

    if (schedule.length === 0) {
      Alert.alert("Select days", "Select at least one delivery day.");
      return;
    }

    // Validate product price
    const productPrice = Number(product.price);
    if (!Number.isFinite(productPrice) || productPrice <= 0) {
      Alert.alert("Invalid product", "Product price is invalid.");
      return;
    }

    // Parse dates consistently (local timezone)
    const parseLocalDate = (dateStr: string): Date => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const start = parseLocalDate(startDate);
    const end = parseLocalDate(endDate);

    // Validate parsed dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      Alert.alert("Invalid dates", "Please select valid dates.");
      return;
    }

    if (end <= start) {
      Alert.alert("Invalid dates", "End date must be after start date.");
      return;
    }

    const diffDays =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays > 90) {
      Alert.alert(
        "Too long",
        "Custom subscriptions can be up to 90 days only."
      );
      return;
    }

    // Recalculate price to ensure it's valid before submission
    const finalPrice = calculateCustomPrice(
      startDate,
      endDate,
      schedule,
      productPrice
    );

    if (finalPrice <= 0 || !Number.isFinite(finalPrice)) {
      Alert.alert("Invalid subscription", "Price calculation failed. Please check your selections.");
      return;
    }

    // Navigate to payment with custom subscription details
 
    router.push({
      pathname: "/subscribe/payment",
      params: {
        type: "CUSTOM",
        productId: product.id,
        startDate,
        endDate,
        deliverySlot,
        deliverySchedule: JSON.stringify(schedule),
        amount: finalPrice.toString(),
      },
    });

  };

  return (
    <View className="bg-white rounded-xl p-5 shadow-lg border border-slate-100">
      {/* Header */}
      <View className="flex-row items-center mb-5">
        <View className="bg-blue-50 p-3 rounded-2xl mr-3">
          <Calendar size={20} color="#2563eb" />
        </View>
        <Text className="text-lg font-semibold text-slate-900">
          Custom Delivery Schedule
        </Text>
      </View>

      {/* Day Selector */}
      <Text className="text-sm font-semibold text-slate-700 mb-3">
        Select Delivery Days
      </Text>
      <View className="flex-row flex-wrap gap-2 mb-5">
        {weekDays.map((day, i) => {
          const active = selectedDays.includes(i);
          return (
            <Pressable
              key={i}
              onPress={() => toggleDay(i)}
              className={`px-5 py-3 rounded-xl shadow-sm ${active
                ? "bg-blue-600 border border-slate-200"
                : "bg-white border border-slate-200"
                }`}
            >
              <Text className={`font-bold text-sm ${active ? "text-white" : "text-slate-600"}`}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Units per Day */}
      {schedule.length > 0 && (
        <View className="mb-5">
          <View className="flex-row items-center mb-3">
            <View className="bg-purple-50 p-2 rounded-xl mr-2">
              <Package size={16} color="#9333ea" />
            </View>
            <Text className="text-sm font-semibold text-slate-700">
              Units per Day
            </Text>
          </View>

          {schedule.map(({ dayOfWeek }) => (
            <View
              key={dayOfWeek}
              className="flex-row justify-between items-center mb-3 bg-slate-50 p-4 rounded-2xl"
            >
              <Text className="font-semibold text-slate-700">
                {weekDays[dayOfWeek]}
              </Text>
              <QuantitySelector
                quantity={dayUnits[dayOfWeek] ?? 1}
                onIncrease={() =>
                  updateUnit(dayOfWeek, dayUnits[dayOfWeek] + 1)
                }
                onDecrease={() =>
                  updateUnit(dayOfWeek, (dayUnits[dayOfWeek] ?? 1) - 1)
                }
              />
            </View>
          ))}
        </View>
      )}

      {/* Date Inputs */}
      <DateInput label="Start Date" value={startDate} onChange={setStartDate} />
      <DateInput label="End Date" value={endDate} onChange={setEndDate} />
      {/* Delivery Slot */}
      <View className="mb-5">
        <Text className="text-sm font-semibold text-slate-700 mb-2">
          Delivery Slot
        </Text>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setDeliverySlot("MORNING")}
            className={`flex-1 py-3 rounded-xl border flex-row justify-center items-center gap-2 ${deliverySlot === "MORNING"
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-slate-200"
              }`}
          >
            <Sun
              size={16}
              color={deliverySlot === "MORNING" ? "#fff" : "#334155"}
            />
            <Text
              className={`font-bold ${deliverySlot === "MORNING"
                  ? "text-white"
                  : "text-slate-700"
                }`}
            >
              Morning
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setDeliverySlot("EVENING")}
            className={`flex-1 py-3 rounded-xl border flex-row justify-center items-center gap-2 ${deliverySlot === "EVENING"
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-slate-200"
              }`}
          >
            <Moon
              size={16}
              color={deliverySlot === "EVENING" ? "#fff" : "#334155"}
            />
            <Text
              className={`font-bold ${deliverySlot === "EVENING"
                  ? "text-white"
                  : "text-slate-700"
                }`}
            >
              Evening
            </Text>
          </Pressable>
        </View>
      </View>


      {/* Price Preview */}
      {estimatedPrice > 0 && (
        <View className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl mb-5 border border-green-100">
          <Text className="text-sm text-green-700 font-medium mb-1">
            Estimated Total
          </Text>
          <Text className="text-3xl font-black text-green-600">
            ₹{estimatedPrice}
          </Text>
        </View>
      )}

      {/* Submit Button */}
      <Pressable
        disabled={submitted}
        onPress={handleAddCustom}
        className={`py-4 rounded-2xl items-center shadow-lg ${submitted ? "bg-slate-400" : "bg-blue-600 active:bg-blue-700"
          }`}
      >
        <Text className="text-white font-bold text-base">
          {submitted ? "✓ Added to Cart" : "Add Custom Subscription"}
        </Text>
      </Pressable>
    </View>
  );
}