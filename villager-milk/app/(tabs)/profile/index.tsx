import MenuItem from "@/components/MenuItem";
import { useRouter } from "expo-router";
import { UserRound } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#F3F6FF] px-5 pt-6 ">

      {/* Profile Card */}
      <View className="bg-white rounded-3xl p-6 shadow-sm mb-6 items-center">

        {/* Profile Icon */}
        <View className="w-24 h-24 rounded-full bg-[#E8F0FF] items-center justify-center mb-4">
          <UserRound size={46} color="#0F0D23" strokeWidth={2.5} />
        </View>

        {/* User Name */}
        <Text className="text-xl font-bold text-[#0F0D23]">
          Karan Chavan
        </Text>

        <Text className="text-sm text-[#6B7280] mt-1">
          karan@example.com
        </Text>

        <TouchableOpacity className="mt-4 bg-[#0F0D23] px-6 py-2 rounded-xl">
          <Text className="text-white font-semibold text-sm">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu Section */}
      <View className="bg-white rounded-3xl p-4 shadow-sm mb-6">

        <MenuItem title="My Orders" action={() => router.push("/(tabs)/order")} />
        <MenuItem title="Subscriptions" action={() => router.push("/(tabs)/subscription")} />
        <MenuItem title="Edit Addresses" action={()=> router.push("/address")} />
        <MenuItem title="Help & Support" action={function (): void {
          throw new Error("Function not implemented.");
        }} />
      </View>

      {/* Logout Button */}
    <View className="flex-1 justify-end">
    <TouchableOpacity className="bg-red-500 py-3 rounded-2xl mb-10   ">
        <Text className="text-white text-center font-semibold text-base">
          Logout
        </Text>
      </TouchableOpacity>
    </View>

    </SafeAreaView>
  );
}


