import { useRouter } from "expo-router";
import { CheckCircle, Home, ShoppingBag } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-5 justify-center">
      <View className="bg-slate-50 p-8 rounded-3xl border border-slate-200 items-center">
        <CheckCircle size={64} color="#16a34a" className="mb-6" />

        <Text className="text-2xl font-bold text-center mb-2">
          Subscription Successful!
        </Text>

        <Text className="text-slate-600 text-center mb-8">
          Your milk subscription has been activated successfully.
          You will receive your first delivery as per the schedule.
        </Text>

        <View className="w-full gap-4">
          <Pressable
            onPress={() => router.replace("/home")}
            className="bg-blue-600 py-4 rounded-2xl flex-row items-center justify-center gap-2"
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
            <ShoppingBag size={20} color="#374151" />
            <Text className="text-slate-700 font-bold text-base">
              View Subscriptions
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
