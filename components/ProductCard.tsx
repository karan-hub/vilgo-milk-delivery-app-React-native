import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';


interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: string, count: number) => void;
}



export default function ProductCard({ product, onAddToCart }: ProductCardProps) {

  
  const { dispatch } = useCart();

  const router = useRouter();

  const handleAddToCart = () => {
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
  };


  return (

     <Pressable
      className="w-[48%] bg-[#BBE0EF] rounded-2xl p-3 mb-4 shadow-sm"
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: product.id },
        })
      }
    >
      {/* Image */}
      <View className="w-full h-36 rounded-2xl items-center justify-center relative mb-3">
        <Image
          source={{ uri: product.imageUrl }} 
          className="w-full h-full"
          resizeMode="contain"
        />

        {/* Add / Stock indicator */}
        {product.inStock ? (
          <TouchableOpacity
            className="absolute top-2 right-2 bg-blue-500 p-1.5 rounded-full shadow"
            onPress={handleAddToCart}
          >
            <Plus size={16} color="#fff" strokeWidth={3} />
          </TouchableOpacity>
        ) : (
          <View className="absolute top-2 right-2">
            <Text className="px-2 py-1 text-xs font-semibold rounded-lg bg-red-500 text-white">
              Out of Stock
            </Text>
          </View>
        )}
      </View>

      {/* Product Name */}
      <Text className="text-md font-semibold text-slate-800">
        {product.name}
      </Text>

      {/* Bottom Row */}
      <View className="flex-row items-center justify-between mt-2">
        <View className="bg-gray-600 py-1 px-3 rounded-xl">
          <Text className="text-xs text-white" numberOfLines={1}>
            {product.unit}
          </Text>
        </View>

        <Text className="text-sm font-semibold text-slate-800">
          ₹{product.price}
        </Text>
      </View>
    </Pressable>
  );
}        