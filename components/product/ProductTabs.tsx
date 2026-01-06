import { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Pressable, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

type Tab = 'highlights' | 'benefits' | 'nutrition';

interface Props {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export default function ProductTabs({ activeTab, onChange }: Props) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const tabs: Tab[] = useMemo(() => ['highlights', 'benefits', 'nutrition'], []);

  useEffect(() => {
    const index = tabs.indexOf(activeTab);
    Animated.spring(slideAnim, {
      toValue: index,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [activeTab, slideAnim, tabs]);

  const tabWidth = (width - 40 - 12) / tabs.length;

  return (
    <View className="mx-5 mb-5 relative">
      <View className="bg-white rounded-xl p-1.5 shadow-md border border-slate-100 flex-row">
        <Animated.View
          className="absolute top-1.5 bottom-1.5 bg-blue-600 rounded-xl shadow-lg"
          style={{
            width: tabWidth,
            left: 6,
            transform: [{
              translateX: slideAnim.interpolate({
                inputRange: [0, tabs.length - 1],
                outputRange: [0, tabWidth * (tabs.length - 1)]
              })
            }]
          }}
        />
        
        {tabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => onChange(tab)}
              className="flex-1 py-3.5 rounded-full z-10"
            >
              <Text className={`text-center text-xs font-bold ${active ? 'text-white' : 'text-slate-600'}`}>
                {tab.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}