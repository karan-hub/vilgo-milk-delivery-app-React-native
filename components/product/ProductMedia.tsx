 

import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  imageUrl: string;
}

export default function ProductMedia({ imageUrl }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }}
      className="items-center py-8 mb-4"
    >
      <View className="relative">
        <View
          className="absolute inset-0 bg-blue-100 rounded-full opacity-20"
          style={{
            width: width * 0.8,
            height: width * 0.8,
            transform: [{ scale: 0.9 }]
          }}
        />
        <Image
          source={{ uri: imageUrl }}
          style={{ width: width * 0.75, height: width * 0.75 }}
          className="rounded-3xl"
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}
