import { Text, TextInput, View } from "react-native";

export default function FormInput({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default"
}: any) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>

      <View className="flex-row items-center bg-white py-3 px-4 rounded-2xl border border-blue-100 shadow-sm">
        {icon}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          className="flex-1 ml-2 text-base text-[#0F0D23]"
          placeholderTextColor="#6B7B9E"
        />
      </View>
    </View>
  );
}
