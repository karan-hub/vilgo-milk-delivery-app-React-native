import { useCart } from "@/context/CartContext";
import { Text, View } from "react-native";

export default function ProductDetails() {
  const { state } = useCart();

  const totalItems = state.items.reduce((sum: any, item: any) => sum + item.count, 0);


  return (
    <View className="w-full bg-[#E7F6ff] flex-1 items-center  justify-center">
      <Text>{state.items.length}</Text>
      <Text>{totalItems}</Text>
    </View>
  );
}
