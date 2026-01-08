import { placeOrder } from "@/api/orderApi";
import DeliverySlotSelector from "@/components/DeliverySlotSelector";
import OrderCard from "@/components/OrderCard";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { CheckCircle, Home } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const [payment, setPayment] = useState<"COD" | "UPI">("COD");
  const [deliverySlot, setDeliverySlot] = useState<"MORNING" | "EVENING">("EVENING");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Calculate delivery date (next day)
  const deliveryDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0] + 'T18:00:00'; // Default to evening
  }, []);

  const items = state?.items || [];
  const buyOnceTotal = useMemo(() =>
    items.reduce((sum: number, i: any) => sum + (i.price * i.count), 0)
  , [items]);

  const grandTotal = buyOnceTotal;

  const handlePlaceOrder = async () => {
    if (!payment) {
      Alert.alert("Select Payment Method", "Please choose how you want to pay.");
      return;
    }

    if (items.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart before placing an order.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Prepare order data
      const orderData = {
        deliverySlot,
        deliveryDate,
        items: items.map((item: any) => ({
          productId: item.id,
          quantity: item.count
        }))
      };

      // Call the API
      const response = await placeOrder(orderData);

      // Show success message with order details
      Alert.alert(
        "Order Placed Successfully! 🎉",
        `Order ID: ${response.orderId}\nTotal: ₹${response.totalAmount}\nDelivery: ${response.deliverySlot} (${new Date(response.deliveryDate).toLocaleDateString()})`,
        [
          {
            text: "OK",
            onPress: () => {
              dispatch({ type: "CLEAR_CART" });
              router.push("/home");
            },
          },
        ]
      );
    } catch (error: any) {
      console.error("Order placement failed:", error);
      Alert.alert(
        "Order Failed",
        error.message || "Failed to place order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EAF6FF]">
      <View className="flex-row items-center justify-between px-5 pt-6">
        <Text className="text-xl font-semibold text-[#0F0D23]">Checkout</Text>

        <Pressable
          className="flex-row gap-1 items-center"
          onPress={() => router.push("/address")}
        >
          <Home size={18} color="#0F80FF" />
          <Text className="text-sm font-semibold text-[#0F0D23]">
            Address
          </Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1 bg-white rounded-t-3xl mt-3 px-5 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Buy Once */}
        {items.length > 0 && (
          <>
            <Text className="text-lg font-semibold mt-4 mb-1">Buy Once</Text>
            {items.map((item: any, index: number) => (
              <OrderCard key={`${item.id}-${item.unit}-${index}`} id={item.id} unit={item.unit} />
            ))}
          </>
        )}

        {/* Delivery Slot */}
        <DeliverySlotSelector
          selectedSlot={deliverySlot}
          onSlotChange={setDeliverySlot}
        />

        {/* Payment */}
        <Text className="text-lg font-semibold mt-6 mb-1">Payment Method</Text>

        {["COD", "UPI"].map((pm) => (
          <Pressable
            key={pm}
            className={`flex-row items-center justify-between p-3 rounded-xl border mt-2 ${
              payment === pm ? "border-blue-600 bg-blue-50" : "border-gray-200"
            }`}
            onPress={() => setPayment(pm as any)}
          >
            <Text className="text-base text-[#0F0D23] font-semibold">
              {pm === "COD" ? "Cash On Delivery" : pm}
            </Text>

            {payment === pm && (
              <CheckCircle size={18} color="#0F80FF" />
            )}
          </Pressable>
        ))}

        {/* Bill Summary */}
        <View className="bg-blue-50 p-4 rounded-xl mt-6">
          <Text className="font-semibold text-base text-[#0F0D23] mb-3">
            Bill Summary
          </Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Buy Once</Text>
            <Text className="font-semibold text-gray-800">₹{buyOnceTotal}</Text>
          </View>

          <View className="border-t border-dashed mt-2 mb-3" />

          <View className="flex-row justify-between">
            <Text className="font-bold text-[#0F0D23]">Grand Total</Text>
            <Text className="font-bold text-blue-500 text-lg">₹{grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order */}
      <Pressable
        className={`absolute bottom-5 mx-5 left-0 right-0 py-4 rounded-2xl items-center shadow-sm ${
          isPlacingOrder ? 'bg-gray-400' : 'bg-[#0F80FF] active:opacity-90'
        }`}
        onPress={handlePlaceOrder}
        disabled={isPlacingOrder}
      >
        {isPlacingOrder ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#fff" />
            <Text className="text-white text-base font-bold">Placing Order...</Text>
          </View>
        ) : (
          <Text className="text-white text-base font-bold">Place Order</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}
