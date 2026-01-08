import { getUserProfile, updateUserProfile } from "@/api/userApi";
import { ActionButton } from "@/components/profile/ActionButton";
import { MenuButton } from "@/components/profile/MenuButton";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileInfoCard } from "@/components/profile/ProfileInfoCard";
import type { User } from "@/types/api";
import { clearTokens, getUserId } from "@/utils/tokenStorage";
import { useRouter } from "expo-router";
import {
  Calendar,
  Edit,
  HelpCircle,
  LogOut,
  MapPin,
  Phone,
  RefreshCw,
  ShoppingBag,
  UserRound
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
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
  }, []);

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
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="flex-1 justify-center items-center px-8">
          <View className="bg-white rounded-3xl p-10 shadow-xl items-center">
            <ActivityIndicator size="large" color="#0F0D23" />
            <Text className="mt-6 text-slate-900 font-bold text-lg">
              Loading Profile
            </Text>
            <Text className="mt-2 text-slate-500 text-center">
              Please wait a moment
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-[#EAF6FF]">
        <View className="flex-1 justify-center items-center px-8">
          <View className="bg-white rounded-3xl p-10 shadow-xl items-center border border-blue-100">
            <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-6">
              <UserRound size={40} color="#DC2626" />
            </View>
            <Text className="text-[#0F0D23] font-bold text-xl mb-2">
              Profile Not Found
            </Text>
            <Text className="text-gray-600 text-center mb-8">
              We couldn&apos;t load your profile information
            </Text>
            <ActionButton
              label="Try Again"
              onPress={loadUserProfile}
              icon={RefreshCw}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#EAF6FF]">
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-black text-[#0F0D23] text-center">
            My Profile
          </Text>
          
        </View>

        {/* Profile Card */}
        <View className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <ProfileAvatar name={user.name} />

          {/* User Info */}
          <View className="mb-6">
            {editing ? (
              <View className="mb-4">
                <Text className="text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </Text>
                <TextInput
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter your name"
                  className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 text-slate-900 font-semibold text-base"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            ) : (
              <>
                <ProfileInfoCard
                  icon={UserRound}
                  iconColor="#0F0D23"
                  iconBgColor="#E0E7FF"
                  label="Full Name"
                  value={user.name}
                />
                <ProfileInfoCard
                  icon={Phone}
                  iconColor="#0F0D23"
                  iconBgColor="#DBEAFE"
                  label="Phone Number"
                  value={user.phone}
                />
              </>
            )}
          </View>

          {/* Edit/Save Button */}
          {editing ? (
            <View className="flex-row gap-3">
              <View className="flex-1">
                <ActionButton
                  label="Cancel"
                  onPress={() => {
                    setEditing(false);
                    setEditName(user.name);
                  }}
                  variant="secondary"
                  disabled={saving}
                />
              </View>
              <View className="flex-1">
                <ActionButton
                  label="Save"
                  onPress={handleSaveProfile}
                  loading={saving}
                />
              </View>
            </View>
          ) : (
            <ActionButton
              label="Edit Profile"
              onPress={() => setEditing(true)}
              icon={Edit}
            />
          )}
        </View>

        {/* Menu Section */}
        <View className="bg-white rounded-3xl shadow-xl mb-6 overflow-hidden">
          <View className="p-5 pb-2">
            <Text className="text-xl font-black text-slate-900">Quick Actions</Text>
          </View>

          <MenuButton
            icon={ShoppingBag}
            iconColor="#F59E0B"
            iconBgColor="#FEF3C7"
            label="My Orders"
            onPress={() => router.push("/order")}
          />

          <MenuButton
            icon={Calendar}
            iconColor="#3B82F6"
            iconBgColor="#DBEAFE"
            label="Subscriptions"
            onPress={() => router.push("/subscription")}
          />

          <MenuButton
            icon={MapPin}
            iconColor="#10B981"
            iconBgColor="#D1FAE5"
            label="My Addresses"
            onPress={() => router.push("/address")}
          />

          <MenuButton
            icon={HelpCircle}
            iconColor="#EC4899"
            iconBgColor="#FCE7F3"
            label="Help & Support"
            onPress={() => Alert.alert("Coming Soon", "Help & Support feature coming soon!")}
            showBorder={false}
          />
        </View>

        {/* Logout Button */}
        <View className="mb-8">
          <ActionButton
            label="Logout"
            onPress={handleLogout}
            icon={LogOut}
            variant="danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}