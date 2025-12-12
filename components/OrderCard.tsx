import { useCart } from "@/context/CartContext";
import { products } from "@/Data/products";
import { ShoppingBag, Trash2 } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import QuantitySelector from "./QuantitySelector";

const OrderCard = ({ id }: { id: number }) => {
  const product = products.find((x) => x.id === id);
  const { state, dispatch } = useCart();

  if (!product) return null;

  const cartItem = state.items.find((item: any) => item.id === id);
  const quantity = cartItem?.count || 1;

  const handleIncrease = () => {
    dispatch({
      type: "INCREMENT",
      payload: { id: product.id }, 
    });
  };

  const handleDecrease = () => {
    dispatch({
      type: "DECREMENT",
      payload: { id: product.id },
    });
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id: product.id },
    });
  };

  return (
    <View className="bg-white rounded-xl p-3 mt-3 shadow-sm border border-gray-100">

      {/* Product Info */}
      <View className="flex-row items-center gap-3">
        <Image
          source={
            typeof product.images[0] === "string"
              ? { uri: product.images[0] }
              : product.images[0]
          }
          className="w-14 h-14 rounded-lg"
          resizeMode="contain"
        />

        <View className="flex-1 flex-row justify-between">
          <View className="flex-col gap-1">
            <Text className="text-[15px] font-semibold text-[#0F0D23]">
              {product.name}
            </Text>

            <View className="flex-row gap-3 items-center">
              <Text className="text-xs text-gray-500">
                {product.volume || product.weight}
              </Text>
              <Text className="text-sm font-bold text-[#19a6cd]">
                ₹{product.price}
              </Text>
            </View>
          </View>

          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </View>
      </View>

      {/* Divider */}
      <View className="border-t border-gray-200 border-dashed mt-3 mb-2" />

      {/* Replace Start/End Date with Buy Once info */}
      <View className="flex-row justify-between px-1">
        <View className="flex-row items-center gap-1">
          <ShoppingBag size={14} color="#6DD1EB" />
          <Text className="text-[11px] text-gray-600">
            Delivery: Buy Once
          </Text>
        </View>

        {/* Remove Button */}
        <Pressable
          onPress={handleRemove}
          className="flex-row items-center gap-1 bg-red-50 px-2 py-1 rounded-md active:opacity-70"
        >
          <Trash2 size={14} color="#DC2626" />
          <Text className="text-[11px] font-semibold text-red-600">
            Remove
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OrderCard;
