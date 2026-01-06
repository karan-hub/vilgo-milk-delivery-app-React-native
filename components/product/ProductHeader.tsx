import { useRouter } from 'expo-router';
import { ArrowLeft, Heart, Share2 } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

interface Props {
  product: {
    name: string;
  };
}

export default function ProductHeader({ product }: Props) {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
      className="flex-row items-center justify-between px-5 py-4"
    >
      <View className="flex-1 pr-3">
        <Text className="text-2xl font-bold text-slate-900" numberOfLines={2}>
          {product.name}
        </Text>
      </View>

      <View className="flex-row gap-2">
        <Pressable className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <Heart size={20} color="#64748b" />
        </Pressable>
        <Pressable className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <Share2 size={20} color="#64748b" />
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          className="bg-blue-600 p-3 rounded-2xl shadow-md"
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </Animated.View>
  );
}