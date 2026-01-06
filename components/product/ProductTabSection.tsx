import { CheckCircle, Sparkles } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

type Tab = 'highlights' | 'benefits' | 'nutrition';

interface Props {
  product: {
    highlights: string[];
    benefits: string[];
    nutrition: Record<string, string>;
  };
  activeTab: Tab;
}

export default function ProductTabSection({ product, activeTab }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [activeTab, fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }} className="mx-5 mb-6">
      {activeTab === 'highlights' && (
        <View>
          {product.highlights.map((item, idx) => (
            <View
              key={idx}
              className="flex-row gap-1 items-start bg-blue-50 p-4 rounded-2xl border border-blue-100 shadow-sm mb-3"
            >
              
              <Sparkles color="#006eff" strokeWidth={1.5}  size={24} />
              <Text className="text-slate-700 text-sm flex-1 leading-6 font-medium">
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'benefits' && (
        <View>
          {product.benefits.map((item, idx) => (
            <View
              key={idx}
              className="flex-row items-start bg-green-50 p-4 rounded-2xl border border-green-100 shadow-sm mb-3"
            >
              <View className="w-6 h-6 rounded-full bg-green-600 items-center justify-center mr-3 shadow-md">
                <CheckCircle size={14} color="white" />
              </View>
              <Text className="text-slate-700 text-sm flex-1 leading-6 font-medium">
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'nutrition' && (
        <View>
          {Object.entries(product.nutrition).map(([key, val], idx) => (
            <View
              key={idx}
              className="flex-row items-center justify-between bg-amber-50 p-4 rounded-2xl border border-amber-100 shadow-sm mb-3"
            >
             
              <Text className="text-slate-800 font-bold text-sm capitalize flex-1">
                {key.replace(/_/g, ' ')}
              </Text>
              <View className="bg-amber-600 px-4 py-2 rounded-xl ml-2 shadow-md">
                <Text className="text-white font-bold text-sm">
                  {val}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
}
