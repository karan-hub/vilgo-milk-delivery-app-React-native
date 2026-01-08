import { useRouter } from "expo-router";
import { Moon, Sun } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateInput from "./DateInpute";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    unit: string;
  };
  plan: {
    id: string;
    title: string;
    durationDays: number;
    price: number;
    offer?: string;
  };
}

export default function PredefinedPlanCard({ product, plan }: Props) {
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [deliverySlot, setDeliverySlot] =
    useState<"MORNING" | "EVENING">("MORNING");

  const canContinue = Boolean(startDate);

  return (
    <View className="bg-white rounded-lg p-5 mb-2 shadow-lg border border-blue-100">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-1">
        <View className="flex-1 pr-3">
          <Text className="text-base font-bold text-[#0F0D23]">
            {plan.title}
          </Text>

          <Text className="text-sm text-gray-600 mt-1">
            {plan.durationDays} days · ₹{plan.price}
          </Text>
        </View>

        {plan.offer && (
          <View className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <Text className="text-xs font-bold text-green-700">
              {plan.offer}
            </Text>
          </View>
        )}
      </View>

      {/* Start Date */}
      <View className="mt-3">
        <DateInput label="Start Date" value={startDate} onChange={setStartDate} />
      </View>

    {/* Delivery Slot */}
    <View>
      <Text className="text-sm font-semibold text-slate-700 mb-1 ">
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
          className={`flex-1 py-3 rounded-2xl border flex-row justify-center items-center gap-2 ${deliverySlot === "EVENING"
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

    {/* Action */}
    <Pressable
      disabled={!canContinue}
      onPress={() =>
        router.push({
          pathname: "/subscribe/payment",
          params: {
            type: "PREDEFINED",
            planId: plan.id,
            productId:product.id,
            startDate,
            deliverySlot,
            amount: plan.price,
          },
        })
      }
      className={`mt-5 py-4 rounded-xl shadow-lg ${canContinue
        ? "bg-blue-600 active:bg-blue-700"
        : "bg-slate-300"
      }`}
    >
      <Text className="text-white text-center font-bold text-base">
        Continue to Payment
      </Text>
    </Pressable>
    </View >
  );
}
