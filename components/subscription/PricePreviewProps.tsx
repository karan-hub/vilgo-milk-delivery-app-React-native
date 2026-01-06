import { Text, View } from "react-native";

interface PricePreviewProps {
  price: number;
}

export const PricePreview: React.FC<PricePreviewProps> = ({ price }) => {
  if (!price || price <= 0) return null;

  const displayPrice = Math.round(price);

  return (
    <View className="bg-green-50 p-5 rounded-2xl mb-6 border border-green-100">
      <Text className="text-sm text-green-700 font-semibold mb-1">
        Estimated Total
      </Text>
      <Text className="text-4xl font-black text-green-600">
        ₹{displayPrice}
      </Text>
    </View>
  );
};
