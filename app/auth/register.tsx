import { register } from "@/api/authApi";
import FormInput from "@/components/FormInput";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await register({ name, phone, password });
      Alert.alert("Registration Successful", "Please login with your credentials");
      router.replace("/auth/login");
    } catch (e: any) {
      Alert.alert("Registration Failed", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 justify-center">
      <View className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
        <Text className="text-2xl font-bold text-center mb-6">Register</Text>

        <FormInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

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
          onPress={handleRegister}
          className={`mt-5 py-4 rounded-2xl ${loading ? "bg-slate-400" : "bg-blue-600"}`}
        >
          <Text className="text-white font-bold text-center text-base">
            {loading ? "Registering..." : "Register"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/auth/login")}
          className="mt-4"
        >
          <Text className="text-center text-blue-600">Already have an account? Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}