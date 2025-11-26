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
      <Text className="text-sm font-medium text-slate-600 mb-1">{label}</Text>

      <View className="flex-row items-center bg-white py-3 px-4 rounded-2xl shadow-sm">
        {icon}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          className="flex-1 ml-2 text-base text-slate-700"
        />
      </View>
    </View>
  );
}
