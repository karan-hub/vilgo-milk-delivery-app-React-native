import { useCart } from "@/context/CartContext";
import { products } from "@/Data/products";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import DateInput from "./DateInpute";
import UnitInput from "./UnitInput";

export default function DailySubscription({ productId }: { productId: Number }) {


  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { state, dispatch } = useCart();

  const cartItem = state.items.find((item: any) => item.id === productId);
  const quantity = cartItem?.count || 1;
  const [unit, setUnit] = useState(1);

  const product = products.find((p) => p.id === productId);
  if (!product) return null;



  const handleSavePlan = () => {
    if (!startDate) {
      Alert.alert(
        "Start Date Required",
        "Please select when you want your subscription to begin."
      );
      return
    }

    if (unit <= 0) {
      Alert.alert(
        "Invalid Units",
        "Units per day must be at least 1."
      );
      return;
    }

    const subscriptions = {
      id: Date.now().toString(),
      productId,
      type: "daily",
      unitsPerDay: unit,
      startDate,
      endDate: endDate || null,
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: "ADD_SUBSCRIPTION", payload: subscriptions });

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      unit,
      count: 1,
    };

    dispatch({
      type: "ADD_ITEM",
      payload: cartItem
    })

    Alert.alert("Added!", `plan added successfully.`);
  }

  const handleIncrease = () => {
    setUnit(prev => prev + 1);
    dispatch({
      type: "INCREMENT",
      payload: {
        id: productId,
      }
    })

    // console.log(state);

  }

  const handleDecrease = () => {
    if (unit > 1) {
      setUnit(prev => prev - 1);

      dispatch({
        type: "DECREMENT",
        payload: {
          id: productId,
        }
      });
    }
  };



  return (
    <View
      className="flex-1 flex-col justify-between     ">
      <View className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm gap-3 mt-3">

        {/* Quantity / Day */}
        <UnitInput
          label="Units per day"
          unit={unit}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}

        />
        {/* Start Date */}
        <DateInput label="Start Date" value={startDate} onChange={setStartDate} />

        {/* End Date */}
        <DateInput label="End Date" value={endDate} onChange={setEndDate} />


      </View>


      <Pressable
        onPress={handleSavePlan}
        className="bg-[#0F80FF] py-4 rounded-2xl items-center mt-5 shadow-sm active:opacity-90"
      >
        <Text className="text-white font-semibold">Add Daily Plan</Text>
      </Pressable>
    </View>
  );
}
