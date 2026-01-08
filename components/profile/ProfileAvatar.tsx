import React from "react";
import { Text, View } from "react-native";

interface ProfileAvatarProps {
  name?: string;
  size?: number;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  name, 
  size = 112 
}) => {
  const initial = name?.charAt(0).toUpperCase() || "U";
  const iconSize = size * 0.42;

  return (
    <View className="items-center mb-6">
      <View className="relative">
        <View 
          className="rounded-full items-center justify-center shadow-2xl"
          style={{
            width: size,
            height: size,
            backgroundColor: '#877df2',
          }}
        >
          <Text className="text-white font-black" style={{ fontSize: size * 0.4 }}>
            {initial}
          </Text>
        </View>
         
      </View>
    </View>
  );
};