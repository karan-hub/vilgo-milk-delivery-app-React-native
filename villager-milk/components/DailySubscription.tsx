import { MapPinHouse } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import StartFrom from "./StartFrom";
import UnitInput from "./UnitInput";

export default function DailySubscription() {
  const [unit, setUnit] = useState(1);

  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm shadow-blue-200/50 space-y-4">
      

      {/* Unit / Day */}
      <View className="mb-3">
        <UnitInput lable={"Unit / Day"} unit={unit} />
      </View>

      {/* Start From */}
      <View className="mb-3">
        <StartFrom lable="Start From" />
      </View>

      {/* To End */}
      <View className="mb-3">
        <StartFrom lable="To End" />
      </View>

      {/* Address */}
      <View className="flex-row items-center justify-between mb-3 ">
        <Text className="text-base font-semibold text-[#0F0D23] w-1/2">
          Delivery Address
        </Text>

        <Pressable className="flex-row items-center justify-between px-4 py-3  bg-[#F3F8FF] rounded-xl w-1/2">
          <Text className="text-slate-600">Select Address</Text>
          <MapPinHouse size={18} color="#6DD1EB" />
        </Pressable>
      </View>
    </View>
  );
}
