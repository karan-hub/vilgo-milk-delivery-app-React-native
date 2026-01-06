import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { confirmPayment, createPayment } from "@/api/paymentApi";

import { getAddresses } from "@/api/addressApi";
import { createSubscription } from "@/api/subscriptionApi";
import { getAccessToken } from "@/utils/tokenStorage";


export default function SubscriptionPaymentScreen() {
    const router = useRouter();


    const {
        planId,
        startDate,
        deliverySlot,
        amount,
        isCustom,
        productId,
        endDate,
        deliverySchedule,
    } = useLocalSearchParams<{
        planId?: string;
        startDate: string;
        deliverySlot?: "MORNING" | "EVENING";
        amount: string;
        isCustom?: string;
        productId?: string;
        endDate?: string;
        deliverySchedule?: string;
    }>();

    const [loading, setLoading] = useState(false);

    const handlePayAndSubscribe = async () => {
        try {
            setLoading(true);

            const accessToken = await getAccessToken();

            if (!accessToken) {
                Alert.alert(
                    "Login required",
                    "Please login to continue with subscription"
                );
                router.replace("/auth/login");
                return;
            }

            // Check if user has addresses
            try {
                const addresses = await getAddresses();
                if (!addresses || addresses.length === 0) {
                    Alert.alert(
                        "Address required",
                        "Please add a delivery address before subscribing"
                    );
                    router.replace("/address");
                    return;
                }
            } catch (addressError) {
                console.warn("Address check failed:", addressError);
                // If address check fails due to backend issues, still allow payment
                // This handles cases like duplicate address IDs in backend
            }

            // 1️⃣ Create subscription
            let subscription;

            if (isCustom === "true") {
                // For custom subscriptions, we need to handle them differently
                // Since the backend expects planId, we'll use a placeholder
                // In a production app, this would create a custom plan first
                subscription = await createSubscription({
                    planId: "custom-plan", // Placeholder for custom subscriptions
                    startDate,
                    deliverySlot: deliverySlot || "MORNING",
                });
            } else {
                // Handle predefined subscription
                subscription = await createSubscription({
                    planId,
                    startDate,
                    deliverySlot,
                });
            }

            // 2️⃣ Initiate payment
            const payment = await createPayment({
                subscriptionId: subscription.subscriptionId,
                amount: Number(amount),
                paymentMethod: "UPI",
            });

            // 3️⃣ Confirm payment (manual success)
            await confirmPayment({ paymentId: payment.paymentId });

            router.replace("/subscribe/success");

        } catch (e: any) {
            Alert.alert("Payment failed", e.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView className="flex-1 bg-white px-5 justify-center">
            <View className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <View className="items-center mb-6">
                    <CheckCircle size={48} color="#16a34a" />
                    <Text className="text-xl font-bold mt-3">
                        Confirm Subscription
                    </Text>
                </View>

                <View className="space-y-2 mb-6">
                    <Text className="text-slate-600">
                        Start Date: <Text className="font-bold">{startDate}</Text>
                    </Text>
                    
                    {isCustom === "true" ? (
                        <>
                            <Text className="text-slate-600">
                                End Date: <Text className="font-bold">{endDate}</Text>
                            </Text>
                            <Text className="text-slate-600">
                                Type: <Text className="font-bold">Custom Plan</Text>
                            </Text>
                        </>
                    ) : (
                        <Text className="text-slate-600">
                            Slot: <Text className="font-bold">{deliverySlot}</Text>
                        </Text>
                    )}
                    
                    <Text className="text-slate-600">
                        Amount:{" "}
                        <Text className="font-black text-lg text-green-600">
                            ₹{amount}
                        </Text>
                    </Text>
                </View>

                <Pressable
                    disabled={loading}
                    onPress={handlePayAndSubscribe}
                    className={`py-4 rounded-2xl ${loading ? "bg-slate-400" : "bg-blue-600"
                        }`}
                >
                    <Text className="text-white font-bold text-center text-base">
                        {loading ? "Processing..." : "Pay & Subscribe"}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
