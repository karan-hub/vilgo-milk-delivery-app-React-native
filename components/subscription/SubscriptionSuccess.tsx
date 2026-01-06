import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle, Home, Repeat } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionSuccessScreen() {
  const router = useRouter();

  
  const {
    startDate,
    deliverySlot,
  } = useLocalSearchParams<{
    startDate?: string;
    deliverySlot?: "MORNING" | "EVENING";
  }>();

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="items-center">
        {/* Success Icon */}
        <View className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle size={64} color="#16a34a" />
        </View>

        {/* Title */}
        <Text className="text-2xl font-extrabold text-slate-900 text-center">
          Subscription Active
        </Text>

        {/* Subtitle */}
        <Text className="text-slate-600 text-center mt-3 text-base leading-6">
          Your milk subscription has been successfully created.
        </Text>

        {/* Details */}
        {(startDate || deliverySlot) && (
          <View className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full">
            {startDate && (
              <Text className="text-sm text-slate-700 mb-1">
                📅 Start Date:{" "}
                <Text className="font-semibold">{startDate}</Text>
              </Text>
            )}

            {deliverySlot && (
              <Text className="text-sm text-slate-700">
                🌅 Delivery Slot:{" "}
                <Text className="font-semibold">{deliverySlot}</Text>
              </Text>
            )}
          </View>
        )}

        {/* Actions */}
        <View className="w-full mt-10 gap-4">
          <Pressable
            onPress={() => router.replace("/home")}
            className="bg-blue-600 py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg"
          >
            <Home size={20} color="#fff" />
            <Text className="text-white font-bold text-base">
              Go to Home
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/subscription")}
            className="bg-slate-100 py-4 rounded-2xl flex-row items-center justify-center gap-2 border border-slate-200"
          >
            <Repeat size={20} color="#334155" />
            <Text className="text-slate-800 font-bold text-base">
              View My Subscriptions
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
