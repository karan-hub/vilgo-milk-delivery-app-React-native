import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import QuantitySelector from "./subscription/QuantitySelector";

type OrderCardProps = {
  id: string;
  unit: string;
};


const OrderCard = ({ id, unit }: OrderCardProps) => {
  const { state, dispatch } = useCart();

  const items = state?.items || [];
  const cartItem = items.find(
    (item: CartItem) => item.id === id && item.unit === unit
  );

  if (!cartItem) return null;

  const quantity = cartItem.count;


  const handleIncrease = () => {
    dispatch({
      type: "INCREMENT",
      payload: { id, unit },
    });
  };

  const handleDecrease = () => {
    dispatch({
      type: "DECREMENT",
      payload: { id, unit },
    });
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id, unit },
    });
  };


  return (
    <View className="bg-white rounded-2xl p-4 mt-3 shadow-sm border border-blue-100 mx-1">

      {/* Product Info */}
      <View className="flex-row items-start gap-3">
        <View className="w-16 h-16 bg-blue-50 rounded-xl items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            source={
              typeof cartItem.image === "string"
                ? { uri: cartItem.image }
                : cartItem.image
            }
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 min-w-0">
          {/* Product Name */}
          <View className="flex-row  justify-between items-center">
            <Text className="text-base font-bold text-[#0F0D23] mb-2" numberOfLines={2}>
              {cartItem.name}
            </Text>
            <Text className="text-base text-gray-500    mb-2 rounded-md">
              {cartItem.unit}
            </Text>
          </View>



          {/* Quantity and Price Row */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              {/* <Text className="text-base text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                {cartItem.unit}
              </Text> */}
              <Text className="text-lg font-bold text-[#0F80FF]">
                ₹{cartItem.price}
              </Text>
            </View>

            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              width={90}
              height={33}
            />

          </View>



        </View>
      </View>
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100 gap-2">
        <View className="flex-row justify-between items-center gap-1 flex-1 min-w-0">
          <View className="flex-row gap-1 items-center justify-center">
            <ShoppingBag size={16} color="#0F80FF" />
            <Text className="text-xs text-gray-600 font-medium" numberOfLines={1}>
              One-time delivery
            </Text>
          </View>
          <Pressable
            onPress={handleRemove}
            className="flex-row items-center gap-1 bg-red-50 px-4 py-3 rounded-xl active:opacity-70 flex-shrink-0"
          >
            <Trash2 size={12} color="#DC2626" />
            <Text className="text-xs font-semibold text-red-600">
              Remove
            </Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
};

export default OrderCard;
