import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { confirmPayment, createPayment } from "@/api/paymentApi";

import { getAddresses } from "@/api/addressApi";
import { createCustomSubscription, createSubscription } from "@/api/subscriptionApi";
import { getAccessToken } from "@/utils/tokenStorage";


export default function SubscriptionPaymentScreen() {
    const router = useRouter();


    const {
        type,
        planId,
        productId,
        startDate,
        endDate,
        deliverySchedule,
        amount,
        deliverySlot
    } = useLocalSearchParams<{
        type: "CUSTOM" | "PREDEFINED";
        planId?: string;
        productId?: string;
        startDate: string;
        endDate?: string;
        deliverySchedule?: string;
        amount: string;
        deliverySlot?: "MORNING" | "EVENING";
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

            // Check   addresses
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

            if (type === "CUSTOM") {
                // Validate amount before proceeding
                const subscriptionAmount = Number(amount);
                if (!Number.isFinite(subscriptionAmount) || subscriptionAmount <= 0) {
                    throw new Error("Invalid subscription amount. Please try again.");
                }

                subscription = await createCustomSubscription({
                    productId: productId!,
                    startDate,
                    endDate: endDate!,
                    deliverySchedule: JSON.parse(deliverySchedule!),
                    deliverySlot: (deliverySlot as any) || "MORNING",
                    estimatedPrice: subscriptionAmount,
                });
            } else {
                subscription = await createSubscription({
                    planId: planId!,
                    productId: productId,
                    startDate,
                    deliverySlot: deliverySlot || "MORNING",
                });
            }
         
    

    // 2️⃣ Initiate payment
    const paymentAmount = Number(amount);
    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
        throw new Error("Invalid payment amount. Please try again.");
    }

    const payment = await createPayment({
        subscriptionId: subscription.subscriptionId,
        amount: paymentAmount,
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

                {type === "CUSTOM" ? (
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
