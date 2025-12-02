import { useState } from "react";
import { View } from "react-native";
import DateInput from "./DateInpute";
import UnitInput from "./UnitInput";

export default function DailySubscription() {
  const [unit, setUnit] = useState(1);


  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm gap-3 mt-3">

      {/* Quantity / Day */}
      <UnitInput
        lable="Units per day"
        unit={unit}

      />
      {/* Start Date */}
      <DateInput lable="Start Date" />

      {/* End Date */}
      <DateInput lable="End Date" />

      {/* Address */}


    </View>
  );
}
