import { getUserProfile, updateUserProfile } from "@/api/userApi";
import FormInput from "@/components/FormInput";
import type { User } from "@/types/api";
import { clearTokens, getUserId } from "@/utils/tokenStorage";
import { useRouter } from "expo-router";
import {
  Calendar,
  Camera,
  Edit,
  HelpCircle,
  LogOut,
  MapPin,
  Phone,
  ShoppingBag,
  UserRound
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editName, setEditName] = useState("");

  const loadUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await getUserId();
      if (!userId) {
        Alert.alert("Error", "User not found. Please login again.");
        router.replace("/auth/login");
        return;
      }

      const userData = await getUserProfile(userId);
      setUser(userData);
      setEditName(userData.name);
    } catch (error) {
      console.error("Failed to load profile:", error);
      Alert.alert("Error", "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const handleSaveProfile = async () => {
    if (!user || !editName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      const updatedUser = await updateUserProfile(user.id, { name: editName.trim() });
      setUser(updatedUser);
      setEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await clearTokens();
            router.replace("/auth/login");
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-br from-[#F3F6FF] to-[#E8F0FF]">
        <View className="flex-1 justify-center items-center px-8">
          <View className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <ActivityIndicator size="large" color="#0F0D23" />
            <Text className="mt-4 text-[#0F0D23] font-semibold text-lg text-center">
              Loading your profile...
            </Text>
            <Text className="mt-2 text-[#6B7280] text-center">
              Please wait while we fetch your information
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-br from-[#F3F6FF] to-[#E8F0FF]">
        <View className="flex-1 justify-center items-center px-8">
          <View className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <UserRound size={48} color="#EF4444" className="mx-auto mb-4" />
            <Text className="text-[#EF4444] font-semibold text-lg text-center mb-2">
              Profile Not Found
            </Text>
            <Text className="text-[#6B7280] text-center mb-6">
              We couldn&apos;t load your profile information
            </Text>
            <TouchableOpacity
              onPress={loadUserProfile}
              className="bg-[#0F0D23] px-8 py-4 rounded-2xl shadow-md"
            >
              <Text className="text-white font-semibold text-center">Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-[#F3F6FF] to-[#E8F0FF]">
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-[#0F0D23] text-center">
            My Profile
          </Text>
          <Text className="text-[#6B7280] text-center mt-1">
            Manage your account and preferences
          </Text>
        </View>

        {/* Profile Card */}
        <View className="bg-white rounded-3xl p-6 shadow-lg mb-6">

          {/* Profile Picture Section */}
          <View className="items-center mb-6">
            <View className="relative">
              <View className="w-28 h-28 rounded-full bg-gradient-to-br from-[#0F0D23] to-[#1E1B4B] items-center justify-center shadow-lg">
                <UserRound size={56} color="white" strokeWidth={2} />
              </View>
              <TouchableOpacity
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#0F0D23] rounded-full items-center justify-center shadow-md"
                onPress={() => Alert.alert("Coming Soon", "Profile picture upload coming soon!")}
              >
                <Camera size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* User Info */}
          <View className="mb-6">
            {editing ? (
              <View className="space-y-4">
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={editName}
                  onChangeText={setEditName}
                  icon={<UserRound size={20} color="#6B7280" />}
                />
              </View>
            ) : (
              <View className="space-y-3">
                <View className="flex-row items-center p-4 bg-[#F8FAFC] rounded-2xl">
                  <View className="w-10 h-10 bg-[#E8F0FF] rounded-full items-center justify-center mr-3">
                    <UserRound size={20} color="#0F0D23" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-[#6B7280] uppercase tracking-wide font-medium">
                      Full Name
                    </Text>
                    <Text className="text-lg font-semibold text-[#0F0D23]">
                      {user.name}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center p-4 bg-[#F8FAFC] rounded-2xl">
                  <View className="w-10 h-10 bg-[#E8F0FF] rounded-full items-center justify-center mr-3">
                    <Phone size={20} color="#0F0D23" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-[#6B7280] uppercase tracking-wide font-medium">
                      Phone Number
                    </Text>
                    <Text className="text-lg font-semibold text-[#0F0D23]">
                      {user.phone}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Edit/Save Button */}
          {editing ? (
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  setEditing(false);
                  setEditName(user.name);
                }}
                className="flex-1 bg-[#F3F4F6] py-4 rounded-2xl border border-[#E5E7EB]"
                disabled={saving}
              >
                <Text className="text-[#6B7280] text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveProfile}
                className="flex-1 bg-gradient-to-r from-[#0F0D23] to-[#1E1B4B] py-4 rounded-2xl shadow-md"
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white text-center font-semibold">Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setEditing(true)}
              className="bg-gradient-to-r from-[#0F0D23] to-[#1E1B4B] py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-md"
            >
              <Edit size={18} color="white" />
              <Text className="text-white font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Menu Section */}
        <View className="bg-white rounded-3xl p-2 shadow-lg mb-6">
          <View className="p-4 pb-2">
            <Text className="text-lg font-semibold text-[#0F0D23]">Account</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/order")}
            className="flex-row items-center justify-between py-4 px-4 border-b border-[#F1F5F9]"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-[#FEF3C7] rounded-full items-center justify-center mr-3">
                <ShoppingBag size={20} color="#F59E0B" />
              </View>
              <Text className="text-[#0F0D23] text-base font-medium">My Orders</Text>
            </View>
            <View className="w-8 h-8 bg-[#F8FAFC] rounded-full items-center justify-center">
              <Text className="text-[#94A3B8] text-sm">→</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/subscription")}
            className="flex-row items-center justify-between py-4 px-4 border-b border-[#F1F5F9]"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-[#DBEAFE] rounded-full items-center justify-center mr-3">
                <Calendar size={20} color="#3B82F6" />
              </View>
              <Text className="text-[#0F0D23] text-base font-medium">Subscriptions</Text>
            </View>
            <View className="w-8 h-8 bg-[#F8FAFC] rounded-full items-center justify-center">
              <Text className="text-[#94A3B8] text-sm">→</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/address")}
            className="flex-row items-center justify-between py-4 px-4 border-b border-[#F1F5F9]"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-[#D1FAE5] rounded-full items-center justify-center mr-3">
                <MapPin size={20} color="#10B981" />
              </View>
              <Text className="text-[#0F0D23] text-base font-medium">My Addresses</Text>
            </View>
            <View className="w-8 h-8 bg-[#F8FAFC] rounded-full items-center justify-center">
              <Text className="text-[#94A3B8] text-sm">→</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Alert.alert("Coming Soon", "Help & Support feature coming soon!")}
            className="flex-row items-center justify-between py-4 px-4"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-[#FCE7F3] rounded-full items-center justify-center mr-3">
                <HelpCircle size={20} color="#EC4899" />
              </View>
              <Text className="text-[#0F0D23] text-base font-medium">Help & Support</Text>
            </View>
            <View className="w-8 h-8 bg-[#F8FAFC] rounded-full items-center justify-center">
              <Text className="text-[#94A3B8] text-sm">→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 py-4 rounded-2xl shadow-lg flex-row items-center justify-center gap-2"
          >
            <LogOut size={18} color="white" />
            <Text className="text-white text-center font-semibold text-base">
              Logout
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


