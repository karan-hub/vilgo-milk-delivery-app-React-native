import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import { CheckLine, ShoppingCart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  product: Product
}

export default function ProductActions({ product }: Props) {
  const { dispatch } = useCart();
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: { uri: product.imageUrl },
        unit: product.unit,
        count: 1,
      },
    });

    setShowToast(true);
  };

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <>
      {/* Toast */}
      {showToast && (
        <View className="absolute bottom-32 left-0 right-0 items-center z-50">
          <View className="bg-green-600 px-4 py-3 rounded-xl shadow-lg flex-row  gap-2 items-center">
            <CheckLine color="#ffffff" strokeWidth={1.5} />
            <Text className="text-white font-semibold text-sm">
              {product.name} added to cart
            </Text>
          </View>
        </View>
      )}

      {/* Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-5 py-5 shadow-2xl">
        {product.inStock ? (
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Pressable
                className="bg-blue-600 py-4 rounded-2xl shadow-lg active:bg-blue-700"
                onPress={addToCart}
              >
                <View className="flex-row items-center justify-center gap-2">
                  <ShoppingCart size={20} color="white" />
                  <Text className="text-white font-bold text-base">
                    Buy Once
                  </Text>
                </View>
              </Pressable>
            </View>

            <View className="flex-1">
              <Pressable
                className="border-2 border-blue-600 py-4 rounded-2xl bg-blue-50 active:bg-blue-100"
                onPress={() =>
                  router.push({
                    pathname: "/subscribe",
                    params: { productId: product.id },
                  })
                }
              >
                <Text className="text-blue-600 text-center font-bold text-base">
                  Subscribe
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View className="bg-red-100 py-4 rounded-2xl border-2 border-red-200">
            <Text className="text-red-600 text-center font-bold text-base">
              Out of Stock
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
