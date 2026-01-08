import { getAddresses } from "@/api/addressApi";
import { login } from "@/api/authApi";
import FormInput from "@/components/FormInput";
import { saveAccessToken, saveRefreshToken, saveUserId } from "@/utils/tokenStorage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await login({ phone, password });
      await saveAccessToken(response.accessToken);
      await saveRefreshToken(response.refreshToken);
      await saveUserId(response.user.id);

      // Check if user has addresses (don't fail login if this fails)
      try {
        const addresses = await getAddresses();
        if (addresses && addresses.length > 0) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/address");
        }
      } catch (addressError) {
        console.warn("Address check failed, redirecting to address setup:", addressError);
        // Always redirect to address setup if we can't check addresses
        // This handles backend issues like duplicate address IDs
        router.replace("/address");
      }
    } catch (e: any) {
      Alert.alert("Login Failed", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EAF6FF] px-5 justify-center">
      <View className="bg-white p-6 rounded-3xl border border-blue-100 shadow-md">
        <Text className="text-2xl font-bold text-center mb-6 text-[#0F0D23]">Login</Text>

        <FormInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />

        <Pressable
          disabled={loading}
          onPress={handleLogin}
          className={`mt-5 py-4 rounded-2xl ${loading ? "bg-gray-400" : "bg-[#0F80FF]"}`}
        >
          <Text className="text-white font-bold text-center text-base">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/auth/register")}
          className="mt-4"
        >
          <Text className="text-center text-[#0F80FF]">Don&apos;t have an account? Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

