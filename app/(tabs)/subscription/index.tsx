import { getMySubscriptions, pauseSubscription, resumeSubscription } from "@/api/subscriptionApi";
import { Subscription, SubscriptionStatus } from "@/types/Subscription";
import { useRouter } from "expo-router";
import { Calendar, Clock, Package, Pause, Play, RefreshCw } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionScreen() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      const data = await getMySubscriptions();
      setSubscriptions(data);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load subscriptions");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handlePause = async (subscriptionId: string) => {
    try {
      setProcessingId(subscriptionId);
      await pauseSubscription(subscriptionId);
      await fetchSubscriptions();
      Alert.alert("Success", "Subscription paused successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to pause subscription");
    } finally {
      setProcessingId(null);
    }
  };

  const handleResume = async (subscriptionId: string) => {
    try {
      setProcessingId(subscriptionId);
      await resumeSubscription(subscriptionId);
      await fetchSubscriptions();
      Alert.alert("Success", "Subscription resumed successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to resume subscription");
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "PAUSED":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: SubscriptionStatus) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const getDaysLabel = (rules: any[]) => {
    if (!rules || rules.length === 0) return "All days";
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return rules.map((r) => dayNames[r.dayOfWeek]).join(", ");
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-slate-50 to-white justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-slate-600 mt-4">Loading subscriptions...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <View className="px-5 pt-4 pb-3 bg-white border-b border-slate-200">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-slate-900">My Subscriptions</Text>
            <Text className="text-sm text-slate-500 mt-1">
              {subscriptions.length} active subscription{subscriptions.length !== 1 ? "s" : ""}
            </Text>
          </View>
          <Pressable
            onPress={handleRefresh}
            disabled={refreshing}
            className="p-2 bg-blue-50 rounded-xl active:opacity-70"
          >
            <RefreshCw
              size={20}
              color="#2563eb"
              style={{ transform: [{ rotate: refreshing ? "180deg" : "0deg" }] }}
            />
          </Pressable>
        </View>
      </View>

      {subscriptions.length === 0 ? (
        <View className="flex-1 justify-center items-center px-5">
          <Package size={64} color="#94a3b8" />
          <Text className="text-xl font-semibold text-slate-700 mt-4">
            No Subscriptions
          </Text>
          <Text className="text-sm text-slate-500 text-center mt-2">
            You don't have any active subscriptions yet.
          </Text>
          <Pressable
            onPress={() => router.push("/subscribe")}
            className="mt-6 bg-blue-600 px-6 py-3 rounded-xl active:opacity-70"
          >
            <Text className="text-white font-semibold">Create Subscription</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {subscriptions.map((subscription) => {
            const isProcessing = processingId === subscription.subscriptionId;
            const isPaused = subscription.status === "PAUSED";
            const isActive = subscription.status === "ACTIVE";

            return (
              <View
                key={subscription.subscriptionId}
                className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-200"
              >
                {/* Header Row */}
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-slate-900 mb-1">
                      {subscription.productName}
                    </Text>
                    {subscription.planTitle && (
                      <Text className="text-sm text-slate-600">{subscription.planTitle}</Text>
                    )}
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${getStatusColor(subscription.status)}`}
                  >
                    <Text className="text-xs font-semibold">
                      {getStatusLabel(subscription.status)}
                    </Text>
                  </View>
                </View>

                {/* Dates */}
                <View className="flex-row items-center gap-2 mb-3">
                  <Calendar size={16} color="#64748b" />
                  <Text className="text-sm text-slate-600">
                    {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                  </Text>
                </View>

                {/* Delivery Slot */}
                <View className="flex-row items-center gap-2 mb-3">
                  <Clock size={16} color="#64748b" />
                  <Text className="text-sm text-slate-600 capitalize">
                    {subscription.deliverySlot.toLowerCase()} delivery
                  </Text>
                </View>

                {/* Delivery Days */}
                {subscription.deliveryRules && subscription.deliveryRules.length > 0 && (
                  <View className="flex-row items-center gap-2 mb-3">
                    <Package size={16} color="#64748b" />
                    <Text className="text-sm text-slate-600">
                      {getDaysLabel(subscription.deliveryRules)}
                      {subscription.deliveryRules.length > 0 && (
                        <Text className="text-slate-500">
                          {" "}
                          ({subscription.deliveryRules
                            .map((r) => `${r.units} unit${r.units > 1 ? "s" : ""}`)
                            .join(", ")})
                        </Text>
                      )}
                    </Text>
                  </View>
                )}

                {/* Units */}
                {subscription.units && (
                  <View className="mb-3">
                    <Text className="text-sm text-slate-600">
                      <Text className="font-semibold">{subscription.units}</Text> units per delivery
                    </Text>
                  </View>
                )}

                {/* Action Buttons */}
                {isActive && (
                  <Pressable
                    onPress={() => handlePause(subscription.subscriptionId)}
                    disabled={isProcessing}
                    className="flex-row items-center justify-center gap-2 bg-yellow-50 py-3 rounded-xl border border-yellow-200 active:opacity-70"
                  >
                    <Pause size={16} color="#ca8a04" />
                    <Text className="text-yellow-700 font-semibold">
                      {isProcessing ? "Processing..." : "Pause Subscription"}
                    </Text>
                  </Pressable>
                )}

                {isPaused && (
                  <Pressable
                    onPress={() => handleResume(subscription.subscriptionId)}
                    disabled={isProcessing}
                    className="flex-row items-center justify-center gap-2 bg-green-50 py-3 rounded-xl border border-green-200 active:opacity-70"
                  >
                    <Play size={16} color="#16a34a" />
                    <Text className="text-green-700 font-semibold">
                      {isProcessing ? "Processing..." : "Resume Subscription"}
                    </Text>
                  </Pressable>
                )}

                {/* Created Date */}
                <Text className="text-xs text-slate-400 mt-3">
                  Created on {formatDate(subscription.createdAt)}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
